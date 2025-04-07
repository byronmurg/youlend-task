import React from "react"

// Basic type for loans returned from the server

type Loan = {
	id: string
	repaymentAmount: number
	fundingAmount: number
	reason: string
}

// Input type for creating a new loan

type LoanInputData = {
	requestedAmount: number
	reason: string
}

// A basic approximation of the error type
// that fastapi returns. Only needed to show
// the reqsulting error

export type ApiError = {
	detail: { msg: string }[]
}

// Assumed api endpoint of our server
const apiUrl = "/api"

// Build a fqdn from a request path
function apiPath(path: string) {
	return apiUrl + path
}

// Call fetch using only the request path
function fetchPath(path: string, options?: Parameters<typeof fetch>[1]) {
	const fullPath = apiPath(path)
	return fetch(fullPath, options)
}

// Get all loans
function getAll() {
	return fetchPath("/loan")
}

// LoanResultSet
//
// This is a very basic resultset class used to manage the
// currently viewed results
export class LoanResultSet {
	constructor(public loans: Loan[], private refreshSet: () => void) {}

	delete(id: string) {
		return fetchPath(`/loan/${id}`, { method: "DELETE" }).then(this.refreshSet)
	}

	async create(inputData: LoanInputData) {
		const res = await fetchPath(`/loan`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(inputData),
			})

		if (res.ok) {
			this.refreshSet()
		} else {
			throw res
		}
	}
}

// useLoans
//
// A simple React hook to get all loans as a resultset
export function useLoans() {
	const [loans, setLoans] = React.useState<Loan[]>([])

	const refresh = React.useCallback(() => {
		getAll()
			.then((res) => res.json())
			.then(setLoans)
	}, [setLoans])

	React.useEffect(refresh, [refresh])

	return new LoanResultSet(loans, refresh)
}

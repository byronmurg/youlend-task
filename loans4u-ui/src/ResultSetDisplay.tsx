import React from "react"
import * as Api from "./Api"

type ResultSetDisplayProps = {
	resultSet: Api.LoanResultSet
}

export default
function ResultSetDisplay({resultSet}:ResultSetDisplayProps) {
	if (! resultSet.loans.length) {
		// Avoid showing an empty table if there are no loans
		return <></>
	}
	
	return (
		<table className="striped" >
			<thead>
				<tr>
					<th>reason</th>
					<th>repayment amount</th>
					<th>funding amount</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{resultSet.loans.map((loan) => (
					<tr key={loan.id} >
						<td>{loan.reason}</td>
						<td>{loan.repaymentAmount}</td>
						<td>{loan.fundingAmount}</td>
						<td><button onClick={() => resultSet.delete(loan.id)} >delete</button></td>
					</tr>
				))}
			</tbody>
		</table>
	)
}


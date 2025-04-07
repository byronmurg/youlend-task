import React from "react"
import * as Api from "./Api"
import ResultSetDisplay from "./ResultSetDisplay"
import ApiErrorDisplay from "./ApiErrorDisplay"

function App() {
	const resultSet = Api.useLoans()

	const [newRequestAmount, setNewRequestAmount] = React.useState(0);
	const [newRequestReason, setNewRequestReason] = React.useState("");
	const [errors, setErrors] = React.useState<Api.ApiError|null>(null)

	function onCreateFormSubmit(e:React.SyntheticEvent) {
		e.preventDefault()
		resultSet.create({ reason:newRequestReason, requestedAmount:newRequestAmount })
			.catch((e) => e.json())
			.then(setErrors)
		setNewRequestReason("")
		setNewRequestAmount(0)
	}

	return (
		<>
		<header className="container" >
			<nav>
				<ul><li></li></ul>
				<ul>
					<li>
						<h3>Loans4U</h3>
					</li>
				</ul>
				<ul><li></li></ul>
			</nav>
		</header>
		<main className="container" >
			{errors ? <ApiErrorDisplay error={errors} /> : <></>}

			<ResultSetDisplay resultSet={resultSet} />

			<article>
				<header>
					<h5>Add a new loan</h5>
				</header>
				<form onSubmit={onCreateFormSubmit} >
					<fieldset>
						<label> Reason
							<input value={newRequestReason} type="text" onChange={(e) => setNewRequestReason(e.target.value)} />
						</label>
						<label> Amount
							<input value={newRequestAmount} type="number" onChange={(e) => setNewRequestAmount(parseFloat(e.target.value))} />
						</label>
						<button type="submit" >Create</button>
					</fieldset>
				</form>
			</article>

		</main>
		</>
	)
}

export default App

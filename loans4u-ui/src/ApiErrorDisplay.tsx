import React from "react"
import * as Api from "./Api"

type ApiErrorDisplayProps = {
	error: Api.ApiError
}

export default
function ApiErrorDisplay({error}:ApiErrorDisplayProps) {
	return (
		<article style={{backgroundColor:"var(--pico-color-red-500)"}} >
			Error:
			<ul>
				{error.detail.map((err) => <li>{err.msg}</li>)}
			</ul>
		</article>
	)
}

import React from 'react';
import './log-style.css';

const Log = (props) => {
	return (
		<tr className="inventory">
			<td className="col">{props.log.user_name} </td>
			<td className="col">{props.log.actions} </td>
			<td className="col">{props.log.quantity} </td>
			<td className="col">{props.log.price} </td>
			<td className="col">{props.log.productId} </td>
			<td className="col unImportant">{new Date(props.log.date_created).toDateString()} </td>
		</tr>
	);
};

export default Log;

import React from 'react';
import './log-style.css';

const Log = (props) => {
	return (
		<tr className="inventory">
			<td className="col">{props.log.user_name} </td>
			<td className="col">{props.log.actions} </td>
			<td className="col">{props.log.quantity} </td>
			<td className="col">{Number(props.log.price).toFixed(2)} </td>
			<td className="col">{props.log.productId} </td>
			<td className="col unImportant">{new Date(props.log.date_created).toDateString()} </td>
		</tr>
	);
};

Log.defaultProps={
	log:{
		user_name:"",
		actions:"",
		quantity:"",
		price:"",
		productId:""
	}
}

export default Log;

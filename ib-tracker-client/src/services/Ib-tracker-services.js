import config from '../config';
import axios from 'axios';
import tokenServices from '../services/tokenServices';
const services = {
	async getProducts() {
		const product = await axios.get(`${config.API_ENDPOINT}/api/product`, {
			headers: {
				Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
			}
		});
		return product;
	},
	async getUsers() {
	const users =	await axios.get(`${config.API_ENDPOINT}/api/users`, {
			headers: {
				Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
			}
		});

		return users;
	},
	async postLog(logInfo) {
	console.log(tokenServices.getAuthToken(config.TOKEN_KEY));
		const log =	await axios.post(`${config.API_ENDPOINT}/api/logs`,logInfo, {
				headers: {
					Authorization: `bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}`
				}
			});
	
			return log;
		}
};

export default services;

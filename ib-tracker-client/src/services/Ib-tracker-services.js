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
	const users =	axios.get('http://localhost:8000/api/users', {
			headers: {
				Authorization: tokenServices.getAuthToken()
			}
		});

		return users;
	}
};

export default services;

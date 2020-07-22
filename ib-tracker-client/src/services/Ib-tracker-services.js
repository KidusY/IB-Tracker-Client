import config from '../config';
import axios from 'axios';
import tokenServices from '../services/tokenServices';
const services = {
    
	async getProducts() {
        console.log(tokenServices.getAuthToken(config.TOKEN_KEY));
		const product = await axios.get(`${config.API_ENDPOINT}/product`, {
			headers: {
				Authorization:`bearer ${tokenServices.getAuthToken(config.TOKEN_KEY)}` 
			}
		});
		return product;
	}
};

export default services;

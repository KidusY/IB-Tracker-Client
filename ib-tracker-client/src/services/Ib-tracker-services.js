import config from '../config';
import axios from 'axios';
const services = {
   async getProducts(){
    const product = await  axios.get(`${config.API_ENDPOINT}/product`)
    return product;
    }




}

export default services;
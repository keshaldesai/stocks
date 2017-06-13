import { GET_DATA } from './types';
import axios from 'axios';

const API = 'http://localhost:8000/api';

export function getData(stock) {
	const request = axios.get(`${API}/stock/${stock}`)
	return {
		type: GET_DATA,
		payload: request
	}
}
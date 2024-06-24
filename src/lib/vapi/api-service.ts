import { VAPI_AUTH_TOKEN } from '$env/static/private';
const BASE_URL = 'https://api.vapi.ai';

class Vapi {
	private baseUrl: string;
	private endpoint: string;

	constructor(endpoint: string) {
		this.baseUrl = BASE_URL;
		this.endpoint = endpoint;
	}

	private async request(endpoint: string, method: string = 'GET', body: any = null): Promise<any> {
		const options: RequestInit = {
			method: method,
			headers: {
				Authorization: `Bearer ${VAPI_AUTH_TOKEN}`,
				'Content-Type': 'application/json'
			}
		};

		if (body) {
			options.body = JSON.stringify(body);
		}

		const response = await fetch(`${this.baseUrl}${endpoint}`, options);
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'An error occurred');
		}
		return response.json();
	}

	async get() {
		return this.request(`/${this.endpoint}`);
	}

	async getByID(id: string) {
		return this.request(`/${this.endpoint}/${id}`);
	}

	async post(data: any) {
		return this.request(`/${this.endpoint}`, 'POST', data);
	}

	async put(id: string, data: any) {
		return this.request(`/${this.endpoint}/${id}`, 'PUT', data);
	}

	async delete(id: string) {
		return this.request(`/${this.endpoint}/${id}`);
	}
}

export default Vapi;

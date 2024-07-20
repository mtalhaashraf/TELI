export enum Rights {
	ADMIN = 'Admin',
	SALES_MANAGER = 'Sales Manager',
	SALES_PERSON = 'Sales Person',
	DEFAULT = 'Default'
}

export interface RightPermissions {
	rights: Rights;
	users?: {
		access_rights: Rights;
		client?: number;
		actions?: {
			add?: {
				client: boolean;
				rights: boolean;
				status: boolean;
			};
			delete?: boolean;
			update?: {
				client: boolean;
				rights: boolean;
				status: boolean;
			};
		};
	};
	campaigns?: {
		client?: number;
		actions?: {
			add?: boolean;
			update?: boolean;
			delete?: boolean;
			upload_file?: boolean;
			start_pause?: boolean;
		};
	};
	settings?: {
		profile?: {
			actions: {
				client: boolean;
				rights: boolean;
				status: boolean;
			};
		};
	};
	billing?: boolean;
	statistics?: boolean;
	clients?: boolean;
	assistants?: boolean;
}

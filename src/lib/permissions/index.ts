import { Rights, type RightPermissions } from '../../types/right-permissions.type';

const default_permissions: RightPermissions = {
	rights: Rights.SALES_PERSON,
	statistics: true
};

const admin_permissions: RightPermissions = {
	rights: Rights.ADMIN,
	users: {
		access_rights: Rights.ADMIN,
		actions: {
			add: {
				client: true,
				rights: true,
				status: true
			},
			delete: true,
			update: {
				rights: true,
				status: true,
				client: true
			}
		}
	},
	settings: {
		profile: {
			actions: {
				client: false,
				rights: false,
				status: false
			}
		}
	},
	billing: true,
	statistics: true,
	clients: true,
	assistants: true,
	campaigns: {
		actions: {
			add: true,
			update: true,
			delete: false
		}
	}
};

const sales_manager_permissions: RightPermissions = {
	rights: Rights.SALES_MANAGER,
	users: {
		client: 'sales_manager_client_id',
		access_rights: Rights.SALES_PERSON,
		actions: {
			add: {
				client: false,
				rights: false,
				status: true
			},
			delete: true,
			update: {
				rights: false,
				status: true,
				client: false
			}
		}
	},
	settings: {
		profile: {
			actions: {
				client: false,
				rights: false,
				status: false
			}
		}
	},
	billing: true,
	statistics: true,
	clients: false,
	campaigns: {
		client: 'sales_manager_client_id',
		actions: {
			add: true,
			update: true,
			delete: false
		}
	}
};

const sales_person_permissions: RightPermissions = {
	rights: Rights.SALES_PERSON,
	settings: {
		profile: {
			actions: {
				client: false,
				rights: false,
				status: false
			}
		}
	},
	statistics: true,
	campaigns: {
		client: 'sales_person_client_id'
	}
};

export {
	sales_manager_permissions,
	sales_person_permissions,
	default_permissions,
	admin_permissions
};

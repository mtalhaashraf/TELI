export interface Assistant {
	id: string;
	name: string;
	firstMessage: string;
	model: {
		messages: {
			content: string;
			role: string;
		}[];
	};
}

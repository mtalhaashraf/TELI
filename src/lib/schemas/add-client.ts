import { z } from 'zod';

export const addClientFormSchema = z.object({
	full_name: z.string(),
	company_name: z.string(),
	website: z.string(),
	phone: z.string(),
	cell: z.string(),
	status: z.string(),
	email: z.string(),
});

export type AddClientFormType = typeof addClientFormSchema;

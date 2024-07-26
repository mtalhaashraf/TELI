import { z } from 'zod';

export const addClientFormSchema = z.object({
	full_name: z.string().min(3,"Full name is required"),
	company_name: z.string(),
	website: z.string(),
	phone: z.string(),
	cell: z.string(),
	email: z.string(),
	status: z.object({
		label: z.string(),
		value: z.string()
	})
});

export type AddClientFormType = typeof addClientFormSchema;


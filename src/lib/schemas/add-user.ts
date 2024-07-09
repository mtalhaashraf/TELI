import { z } from 'zod';

export const addUserFormSchema = z.object({
	full_name: z.string().min(5, 'Enter minimum 5 letters name'),
	company_email: z.string(),
	phone: z.string(),
	cell: z.string(),
	email2: z.string(),
	status: z.object({
		label: z.string(),
		value: z.string()
	}),
	rights: z.object({
		label: z.string(),
		value: z.string()
	}),
	client: z.object({
		label: z.string(),
		value: z.string()
	}),
	password: z.string()
});

export type AddUserFormType = typeof addUserFormSchema;

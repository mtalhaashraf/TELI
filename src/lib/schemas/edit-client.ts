import { z } from 'zod';

export const editClientFormSchema = z.object({
	full_name: z.string(),
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

export type EditClientFormType = typeof editClientFormSchema;

import { string, z } from 'zod';

export const editClientFormSchema = z.object({
	full_name: z.string().min(3,"Full name is required"),
	company_name: z.string().min(3, "Company name is required"),
	website: z.string().url("Website is required, format like (http://www.name.com)"),
	phone: z.string().min(10, 'Number must contain at least 10 digits'),
	cell: z.string().min(10, 'Number must contain at least 10 digits'),
	email: z.string().email('Email is required'),
	status: z.object({
		label: z.string(),
		value: z.string()
	}).refine((status) => status.label.length > 0 && status.value.length > 0, {
		message: "At least one option must be selected",
	  })
});

export type EditClientFormType = typeof editClientFormSchema;


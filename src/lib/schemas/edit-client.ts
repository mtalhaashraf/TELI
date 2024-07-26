import { string, z } from 'zod';

export const editClientFormSchema = z.object({
	full_name: z.string().min(3,"Full name is required"),
	company_name: z.string().min(3, "Company name is required"),
	website: z.string().min(5, "Website is required").url("Invalid website format, format should be like (http://www.name.com)"),
	phone: z.string().min(10).regex(/^[0-9]+$/).min(10, "Phone number must be at least 10 digits long"),
	cell: z.string().min(10).regex(/^[0-9]+$/).min(10, "Phone number must be at least 10 digits long"),
	email: z.string().min(3, "Email is required").email('Invalid email address'),
	status: z.object({
		label: z.string(),
		value: z.string()
	}).refine((status) => status.label.length > 0 && status.value.length > 0, {
		message: "At least one option must be selected",
	  })
});

export type EditClientFormType = typeof editClientFormSchema;


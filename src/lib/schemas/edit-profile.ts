import { z } from 'zod';

export const editProfileFormSchema = z.object({
	full_name: z.string(),
	company_name: z.string(),
	website: z.string(),
	phone: z.string(),
	cell: z.string(),
	email2: z.string(),
	status: z.string()
});

export type EditProfileFormType = typeof editProfileFormSchema;

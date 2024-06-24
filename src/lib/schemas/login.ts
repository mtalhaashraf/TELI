import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5, 'Atleast 6 characters required').max(25, 'Atmost 25 characters')
});

export type LoginFormType = typeof loginFormSchema;

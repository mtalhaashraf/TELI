import { z } from 'zod';

export const addCampaignFormSchema = z.object({
	campaignname: z.string(),
	startdate: z.string(),
	enddate: z.string(),
	Assistant: z.object({
		value: z.string(),
		label: z.string()
	}),
	Client: z.object({
		value: z.number(),
		label: z.string()
	}),
	script: z.string(),
	desiredoutcome: z.string(),
	prompt: z.string(),
	description: z.string()
});

export type AddCampaignFormType = typeof addCampaignFormSchema;

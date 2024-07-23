import { z } from 'zod';

export const editCampaignFormSchema = z.object({
	campaignname: z
		.string({ required_error: 'Campaign Name is required' })
		.min(5, 'Enter minimum 5 letters name'),
	startdate: z.string(),
	enddate: z.string(),
	Assistant: z.object({
		value: z.string(),
		label: z.string()
	}),
	Client: z.object({
		value: z.string(),
		label: z.string()
	}),
	script: z.string(),
	desiredoutcome: z.string(),
	description: z.string()
});

export type EditCampaignFormType = typeof editCampaignFormSchema;

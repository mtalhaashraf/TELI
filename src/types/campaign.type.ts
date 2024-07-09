export interface Campaign {
	assistant: string | null
	assistID: string | null
	campaignid: number
	campaignname: string
	clientid: number
	createdate: string | null
	description: string | null
	desiredoutcome: string | null
	enddate: string | null
	last_start_date: string | null
	max_calls: number | null
	prompt: string | null
	script: string | null
	startdate: string
	status: number | null
	status_date: string | null
  }

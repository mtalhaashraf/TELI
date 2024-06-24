import Vapi from './api-service';

class Assistant extends Vapi {
	constructor() {
		super('assistant');
	}
}

class CallLog extends Vapi {
	constructor() {
		super('log');
	}
}

const assistant = new Assistant();
const callLog = new CallLog();

export { assistant, callLog };

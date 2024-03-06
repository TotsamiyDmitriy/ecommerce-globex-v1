
interface ValidationTypes {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string] : any,
	name:RulesType,
	email: RulesType,
	phone : RulesType
	file : {
		required? : string,
	}
}


type RulesType = {
	required?:string,
	minLength?: {
		value:number,
		message:string,
	},
	maxLength?: {
		value:number,
		message:string,
	},
	pattern: {
		value:RegExp,
		message:string,
	}
}



export const validationRules:ValidationTypes = {
	name: {
		required: 'Name is required',
		minLength: {
			value: 3,
			message: 'Name must have at least 3 characters',
	},
		maxLength: {
			value: 60,
			message: 'Name must contain no more than 60 characters',
	},
		pattern: {
			value: /^(?=[a-z])[a-z\s]{2,60}[a-z]$/i,
			message: 'Invalid Name',
	},
	},
  
	email: {
		required: 'Email is required',
		minLength: {
			value: 10,
			message: 'Email must have at least 10 characters',
	},
		maxLength: {
			value: 100,
			message:"Email must contain no more than 100 characters"
	},
		pattern: {
			// eslint-disable-next-line no-control-regex
			value: /^(?:[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
			message: 'Invalid Email',
	},
	},
  
	phone: {
		required: 'Phone is required',
		minLength: {
			value: 13,
			message: 'Phone  must have 13 characters',
	},
		maxLength: {
			value: 13,
			message: 'Phone must have 13 characters',
	},
		pattern: {
			value: /^[+]{0,1}380([0-9]{9})$/,
			message: 'Invalid Phone',
	},
	},
	file: {
		required: 'Avatar is required',
		}
  };
export interface ProductType {
	[x:string]: unknown;
	_id: number;
	authorRef : string;
	name: string;
	brandName: string;
	soldBy: string;
	rating: number;
	reviewsCount: number;
	price: number;
	offers: string[];
	photos: string[];
	sizes: string[];
	colors: string[];
	category: number;
}

export interface UserType {
	[x:string] : unknown;
	_id : string;
	username : string;
	email : string;
	photoURL : string;
	isAuthor:boolean,
    isAdmin:boolean
}

export enum StatusTypes {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
  }
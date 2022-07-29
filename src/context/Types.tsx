/** @format */

export interface IRegister {
	email: string;
	password: string;
}

export interface ILogin {
	email: string;
	password: string;
}

export interface IQuestion {
	question: {
		status: boolean;
		answer: string;
		question: string;
		id: number;
	}[];
}

export type TQuestion = {
	question: {
		status: boolean;
		answer: string;
		question: string;
		id: number;
	}[];
};



export type AuthContextState = {
	currentUser: any | null;
	questionData: IQuestion["question"];
	allQuestions: IQuestion["question"];
	register: (email: string, password: string) => void;
	login: (email: string, password: string) => void;
	logout: () => void;
	getFilteredCards: (e: any) => void;
	markDone: (questionId: number, cardStat: boolean) => void;
	deleteQuestion: (questionId: number) => void;
};

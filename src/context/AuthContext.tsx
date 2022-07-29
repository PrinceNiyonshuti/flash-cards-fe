/** @format */

import { createContext, useEffect, useState } from "react";
import { AuthContextState, IQuestion} from "./Types";
import { auth } from "../firebase";

const contextDefaultValue: AuthContextState = {
	currentUser: "",
	register: () => {},
	login: () => {},
	logout: () => {},
	getFilteredCards: () => {},
	questionData: [],
	allQuestions: [],
	markDone: () => {},
	deleteQuestion: () => {},
};

export const AuthContext = createContext(contextDefaultValue);

type AuthContextProviderProps = {
	children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthContextProviderProps) => {
	// state data
	const [currentUser, setCurrentUser] = useState<any | null>();
	const [questionData, setQuestionData] = useState<IQuestion["question"]>([]);
	const [allQuestions, setAllQuestions] = useState<IQuestion["question"]>([]);

	// Create Account
	const register = async (email: string, password: string) => {
		return auth.createUserWithEmailAndPassword(email, password);
	};

	// Sign Into Your Account
	const login = async (email: string, password: string) => {
		return auth.signInWithEmailAndPassword(email, password);
	};

	// Sign Out
	const logout = () => {
		return auth.signOut();
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	// Retrieve uncompleted questions
	const getQuestions = () => {
		fetch(`http://localhost:8000/questions?status=false&_sort=id&_order=ASC`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setQuestionData(data);
			});
	};

	// Retrieve all questions
	const getAllQuestions = () => {
		fetch(`http://localhost:8000/questions?_sort=id&_order=ASC`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setAllQuestions(data);
			});
	};

	// Filter Cards
	const getFilteredCards = (e: React.SyntheticEvent<EventTarget>) => {
		let search = (e.target as HTMLSelectElement).value;
		if (search === "all") {
			getQuestions();
		} else {
			fetch(`http://localhost:8000/questions?_sort=id&_order=${search}`)
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					setQuestionData(data);
				});
		}
	};

	// Handle Next Question
	const markDone = (questionId: number, cardStat: boolean) => {
		let status = true;
		if (cardStat) {
			status = false;
		} else {
			status = true;
		}
		const stat = { status };
		fetch(`http://localhost:8000/questions/` + questionId, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(stat),
		}).then(() => {
			//action done
			getQuestions();
		});
	};

	// Delete Question
	const deleteQuestion = (questionId: number) => {
		fetch(`http://localhost:8000/questions/` + questionId, {
			method: "DELETE",
		}).then(() => {
			//action done
			getAllQuestions();
		});
	};

	useEffect(() => {
		getQuestions();
		getAllQuestions();
	}, []);

	const value = {
		currentUser,
		questionData,
		allQuestions,
		register,
		login,
		logout,
		getFilteredCards,
		markDone,
		deleteQuestion,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

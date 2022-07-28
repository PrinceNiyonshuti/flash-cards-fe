/** @format */

import { createContext, useEffect, useState } from "react";
import { AuthContextState, IQuestion} from "./Types";
import { auth } from "../firebase";
import Swal from "sweetalert2";

const contextDefaultValue: AuthContextState = {
	currentUser: "",
	register: () => {},
	login: () => {},
	logout: () => {},
	getFilteredCards: () => {},
	questionData: [],
	handleNext: () => {},
	handlePrevious: () => {},
};

export const AuthContext = createContext(contextDefaultValue);

type AuthContextProviderProps = {
	children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthContextProviderProps) => {
	// state data
	const [currentUser, setCurrentUser] = useState<any | null>();
	const [questionData, setQuestionData] = useState<IQuestion["question"]>([]);

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

	// Retrieve all Cards
	const getQuestions = () => {
		fetch(`http://localhost:8000/questions?_sort=id&_order=ASC`)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setQuestionData(data);
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
	const handleNext = (questionId: number, cardStat: boolean) => {
		let status = false;
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
			Swal.fire({
				title: "Next Question",
				icon: "success",
				timer: 2000,
				showConfirmButton: false,
			}).then(function () {
				getQuestions();
			});
		});
	};

	// Handle Previous Question
	const handlePrevious = (questionId: number, cardStat: boolean) => {
		let status = false;
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
			Swal.fire({
				title: "Previous Question",
				icon: "success",
				timer: 2000,
				showConfirmButton: false,
			}).then(function () {
				getQuestions();
			});
		});
	};

	useEffect(() => {
		getQuestions();
	}, []);

	const value = {
		currentUser,
		questionData,
		register,
		login,
		logout,
		getFilteredCards,
		handleNext,
		handlePrevious,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

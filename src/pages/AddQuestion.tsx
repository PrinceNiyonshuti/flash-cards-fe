/** @format */

import { useContext, useRef } from "react";
import Swal from "sweetalert2";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";

const AddMovie = () => {
	const { currentUser } = useContext(AuthContext);
	// Form variables
	const cardQuestion = useRef<HTMLInputElement>(null);
	const cardAnswer = useRef<HTMLInputElement>(null);
	const movieForm = useRef<HTMLFormElement>(null);

	// Save Question
	const newMovie = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const question = cardQuestion.current?.value;
		const answer = cardAnswer.current?.value;
		const status = false;

		const questionData = {
			question,
			answer,
			status,
		};

		fetch("http://localhost:8000/questions", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(questionData),
		}).then(() => {
			Swal.fire({
				title: "Question Successfully Created",
				text: `${question} Saved`,
				icon: "success",
				confirmButtonText: "Done",
			}).then(function () {
				window.location.reload();
			});
		});
	};
	return (
		<div className="h-screen bg-gray-100">
			<NavBar />

			<div className="flex items-center justify-center bg-gray-100">
				<div className="bg-white py-6 mt-4 shadow-lg flex items-center justify-center p-6 sm:p-12 md:w-1/2">
					<div className="w-full">
						<div className="flex justify-center">
							<h3 className="text-2xl font-bold text-center">
								New Question Details
							</h3>
						</div>
						<form onSubmit={newMovie} ref={movieForm}>
							<div>
								<label className="block font-medium ">Question Title</label>
								<input
									type="text"
									ref={cardQuestion}
									className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
									placeholder="Question title"
									required
								/>
							</div>
							<div>
								<label className="block font-medium mt-2">
									Question Answer
								</label>
								<input
									type="text"
									ref={cardAnswer}
									className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
									placeholder="Question Answer"
									required
								/>
							</div>
							<button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
								AddQuestion
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddMovie;

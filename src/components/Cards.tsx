/** @format */

import React from "react";
import { IQuestion } from "../context/Types";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

function Cards(props: IQuestion) {
	const { markDone } = useContext(AuthContext);
	const cards = props.question.length;

	const [index, setIndex] = useState<number>(0);
	const [showResults, setShowResults] = React.useState(false);

	function goToNext(questionId: number, cardStat: boolean) {
		setIndex((index + 1) % cards);
		setShowResults(false);
	}

	function goToPrevious(questionId: number, cardStat: boolean) {
		setIndex((index - 1) % cards);
		setShowResults(false);
	}

	return (
		<div className="flex flex-wrap -mx-2 ">
			<div className="flip">
				<div className="flip-content">
					<div className="flip-front">
						<div className="flex flex-wrap -mx-2 ">
							<div className="w-full mx-auto my-auto p-4 text-center">
								<div className="card block  hover:shadow-xl rounded-lg overflow-hidden">
									<div className="p-4 text-center">
										<span className="inline-block px-2 py-1 leading-none bg-blue-900 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
											Question {index + 1}
										</span>
										<h1 className="mt-2 mb-2 text-3xl font-bold">
											{props.question[index].question}
										</h1>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flip-back">
						<span className="inline-block px-2 py-1 leading-none bg-blue-900 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
							Answer {index + 1}
						</span>
						<h1 className="mt-2 mb-2 text-3xl font-bold">
							<b> {props.question[index].answer}</b>
						</h1>
					</div>
				</div>
			</div>
			<div className="w-full">
				<div className="flex justify-between items-center w-full">
					<div className="text-center">
						<button
							onClick={() =>
								markDone(props.question[index].id, props.question[index].status)
							}
							className="group flex items-center rounded-md py-2 border border-gray-300 hover:border-blue-700 p-2 hover:no-underline select-none transition-color duration-100 ease-in pr-4"
							id="previous"
							data-behavior="previous">
							<i className="ri-arrow-left-s-line text-gray-700 text-2xl leading-none group-hover:text-blue-700 transition-color duration-100 ease-in"></i>
							<div className="flex flex-col ml-1">
								<div className="text-gray-700 leading-tight text-base md:text-lg font-medium group-hover:text-blue-700 transition-color duration-100 ease-in">
									Marks As Done
								</div>
							</div>
						</button>
					</div>
				</div>
				<div
					className="pagination flex flex-row justify-between text-lg text-gray-700 mt-16 mb-32"
					data-behavior="page-navigation">
					{index < 1 ? (
						<div className="w-1/2 pr-5 flex"></div>
					) : (
						<div className="w-1/2 pr-5 flex">
							<button
								onClick={() =>
									goToPrevious(
										props.question[index].id,
										props.question[index].status
									)
								}
								className="group flex items-center rounded-md py-2 border border-gray-300 hover:border-blue-700 p-2 hover:no-underline select-none transition-color duration-100 ease-in pr-4"
								id="previous"
								data-behavior="previous">
								<i className="ri-arrow-left-s-line text-gray-700 text-2xl leading-none group-hover:text-blue-700 transition-color duration-100 ease-in"></i>
								<div className="flex flex-col ml-1">
									<div className="text-gray-700 leading-tight text-base md:text-lg font-medium group-hover:text-blue-700 transition-color duration-100 ease-in">
										Previous
									</div>
								</div>
							</button>
						</div>
					)}
					<div>
						{index + 1}/{cards}
					</div>
					{index + 1 === cards ? (
						<div className="w-1/2 pl-5 flex justify-end">
							<button
								onClick={() =>
									goToNext(
										props.question[index].id,
										props.question[index].status
									)
								}
								className="group flex items-center rounded-md py-2 border border-gray-300 hover:border-blue-700 p-2 hover:no-underline select-none transition-color duration-100 ease-in justify-end pl-4">
								<div className="flex flex-col mr-1">
									<div className="text-gray-700 leading-tight text-base md:text-lg font-medium group-hover:text-blue-700 transition-color duration-100 ease-in">
										Complete
									</div>
								</div>
								<i className="ri-arrow-right-s-line text-gray-700 text-2xl leading-none group-hover:text-blue-700 transition-color duration-100 ease-in"></i>
							</button>
						</div>
					) : (
						<div className="w-1/2 pl-5 flex justify-end">
							<button
								onClick={() =>
									goToNext(
										props.question[index].id,
										props.question[index].status
									)
								}
								className="group flex items-center rounded-md py-2 border border-gray-300 hover:border-blue-700 p-2 hover:no-underline select-none transition-color duration-100 ease-in justify-end pl-4">
								<div className="flex flex-col mr-1">
									<div className="text-gray-700 leading-tight text-base md:text-lg font-medium group-hover:text-blue-700 transition-color duration-100 ease-in">
										Next
									</div>
								</div>
								<i className="ri-arrow-right-s-line text-gray-700 text-2xl leading-none group-hover:text-blue-700 transition-color duration-100 ease-in"></i>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Cards;

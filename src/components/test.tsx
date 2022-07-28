/** @format */

import React from "react";
import { IQuestion } from "../context/Types";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Cards(props: IQuestion) {
	const { handleNext, handlePrevious } = useContext(AuthContext);
	const cards = props.question.length;
	return (
		<div className="flex flex-wrap -mx-2 ">
			{props.question.map((card) => (
				<div className="w-full mx-auto my-auto p-4" key={card.id}>
					<div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
						<div className="p-4">
							<span className="inline-block px-2 py-1 leading-none bg-blue-300 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
								Card {card.status}
								{index}
							</span>
							<h2 className="mt-2 mb-2 text-xl font-bold">{card.question}</h2>
						</div>
						<div className="p-1 border-t border-b text-xs text-gray-700">
							<div className="button-container flex justify-between mb-2">
								<div className="pr-4 flex items-center text-sm text-gray-600"></div>
							</div>
						</div>
					</div>
					<div className="w-full">
						<div
							className="pagination flex flex-row justify-between text-lg text-gray-700 mt-16 mb-32"
							data-behavior="page-navigation">
							<div className="w-1/2 pr-5 flex">
								<button
									onClick={() => handlePrevious(card.id, card.status)}
									className="group flex items-center rounded-md py-2 border border-gray-300 hover:border-blue-700
                        p-2 hover:no-underline select-none transition-color duration-100 ease-in pr-4"
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
							<div>13/{cards}</div>
							<div className="w-1/2 pl-5 flex justify-end">
								<button
									onClick={() => handleNext(card.id, card.status)}
									className="group flex items-center rounded-md py-2 border border-gray-300 hover:border-blue-700
                        p-2 hover:no-underline select-none transition-color duration-100 ease-in justify-end pl-4">
									<div className="flex flex-col mr-1">
										<div className="text-gray-700 leading-tight text-base md:text-lg font-medium group-hover:text-blue-700 transition-color duration-100 ease-in">
											Next
										</div>
									</div>
									<i className="ri-arrow-right-s-line text-gray-700 text-2xl leading-none group-hover:text-blue-700 transition-color duration-100 ease-in"></i>
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Cards;

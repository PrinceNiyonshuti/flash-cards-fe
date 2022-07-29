/** @format */
import { useContext } from "react";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";

function QuestionList() {
	const { allQuestions } = useContext(AuthContext);
	return (
		<div className="h-screen bg-gray-100">
			<NavBar />
			<div className=" px-2">
				<div className="container mx-auto">
					<div className="button-container flex flex-wrap justify-between mb-2">
						<div className="p-2 flex items-center text-sm">
							<div className="flex flex-wrap -mx-2 ">
								<h1 className="text-2xl font-bold text-center mt-4 ml-8">
									QUestions List
								</h1>
							</div>
						</div>
					</div>

					<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
							<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
								<tr>
									<th scope="col" className="py-3 px-6">
										Question
									</th>
									<th scope="col" className="py-3 px-6">
										Answer
									</th>
									<th scope="col" className="py-3 px-6">
										Status
									</th>
									<th scope="col" className="py-3 px-6">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{allQuestions.map((question) => (
									<tr
										className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
										key={question.id}>
										<th
											scope="row"
											className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
											{question.question}
										</th>
										<td className="py-4 px-6">{question.answer}</td>
										<td className="py-4 px-6">
											{question.status ? (
												<span className="inline-block px-2 py-1 leading-none bg-green-700 text-white rounded-full font-semibold uppercase tracking-wide text-xs">
													Completed
												</span>
											) : (
												<span className="inline-block px-2 py-1 leading-none bg-yellow-500 text-white rounded-full font-semibold uppercase tracking-wide text-xs">
													Pending
												</span>
											)}
										</td>
										<td className="py-4 px-6">
											<div className="button-container flex justify-between mb-2">
												<div className="p-2 flex items-center text-sm text-gray-600">
													<button
														type="button"
														className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
														Edit
													</button>
												</div>
												<div className="pr-4 flex items-center text-sm text-gray-600">
													<button
														type="button"
														className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
														Delete
													</button>
												</div>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default QuestionList;

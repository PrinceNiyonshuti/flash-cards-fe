/** @format */

import { useContext } from "react";
import Cards from "../components/Cards";
import NavBar from "../components/NavBar";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
	// Context Api Data
	const { questionData, getFilteredCards } = useContext(AuthContext);

	return (
		<div className="h-screen bg-gray-100">
			<NavBar />
			<div className=" px-2">
				<div className="container mx-auto">
					<div className="button-container flex flex-wrap justify-between mb-2">
						<div className="p-2 flex items-center text-sm">
							<div className="flex flex-wrap -mx-2 ">
								<h1 className="text-2xl font-bold text-center mt-4 ml-8">
									Flash Cards
								</h1>
							</div>
						</div>
						<div className="p-2 pr-4 flex items-center text-sm">
							<div className="float-right mt-2">
								<select
									onChange={getFilteredCards}
									className=" float-right px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
									placeholder="Movie Genre"
									required>
									<option value="all">-- Sort Cards --</option>
									<option value="ASC">Ascending</option>
									<option value="DESC">Descending</option>
								</select>
							</div>
						</div>
					</div>
					<div>
						<Cards question={questionData} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;

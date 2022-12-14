/** @format */

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
	// Context data
	const { currentUser, logout } = useContext(AuthContext);
	const history = useNavigate();

	// Menu toggle
	const [settings, setSettings] = useState<null | boolean>(false);
	const showMenu = () => {
		setSettings(!settings);
	};

	// Logging Out
	const handleLogOut = async () => {
		try {
			await logout();
			history("/");
		} catch {
			Swal.fire({
				title: "Failed To Log Out",
				text: ``,
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};
	return (
		<nav className="bg-gray-800">
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex items-center justify-between h-16">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						<button
							type="button"
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
							aria-controls="mobile-menu"
							aria-expanded="false">
							<span className="sr-only">Open main menu</span>
						</button>
					</div>
					<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex-shrink-0 flex items-center">
							<Link to="/Dashboard">
								<h1 className="block lg:hidden h-8 w-auto text-2xl font-bold text-white text-center mt-4 ml-8">
									Dashboard
								</h1>
								<h1 className="hidden lg:block h-8 w-auto text-2xl font-bold text-white text-center  ml-8">
									Dashboard
								</h1>
							</Link>
						</div>
						<div className="hidden sm:block sm:ml-6">
							<div className="flex space-x-4">
								<Link
									to="/AddQuestion"
									className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
									Add Question
								</Link>
								<Link
									to="/QuestionList"
									className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
									Questions List
								</Link>
							</div>
						</div>
					</div>
					{/* clicked */}
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<div className="ml-3 relative">
							<div>
								<button
									type="button"
									className="bg-gray-800 flex text-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 "
									id="user-menu-button"
									onClick={showMenu}>
									<span className="sr-only">Open user menu</span>
									<p className="text-sm text-white">
										{currentUser && currentUser.email}
									</p>
								</button>
							</div>

							{settings ? (
								<div
									className="origin-top-right absolute right-0 mt-2  w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
									role="menu"
									aria-orientation="vertical"
									aria-labelledby="user-menu-button">
									<Link
										onClick={showMenu}
										to="/AddQuestion"
										className="block px-4 py-1 text-sm text-gray-700">
										Add Question
									</Link>
									<Link
										to="/Dashboard"
										onClick={handleLogOut}
										className="block px-4 py-2 text-sm text-gray-700">
										Sign out
									</Link>
								</div>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="sm:hidden" id="mobile-menu">
				<div className="px-2 pt-2 pb-3 space-y-1">
					<Link
						to="/Dashboard"
						className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
						All Cards
					</Link>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;

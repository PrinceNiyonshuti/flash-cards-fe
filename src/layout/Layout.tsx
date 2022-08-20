/** @format */

import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AddQuestion from "../pages/AddQuestion";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register"
import { AuthContext } from "../context/AuthContext";
import PrivateRoutes from "../PrivateRoutes";
import QuestionList from "../pages/QuestionList";
import EditQuestion from "../pages/EditQuestion";

function Layout() {
	// Context data Authentication Data
	const { currentUser } = useContext(AuthContext);
	return (
		<div>
			<Routes>
				<Route path="/" element={currentUser ? <Dashboard /> : <Login />} />
				<Route
					path="/Register"
					element={currentUser ? <Dashboard /> : <Register />}
				/>
				<Route
					path="/Dashboard"
					element={<PrivateRoutes component={Dashboard} />}
				/>
				<Route
					path="/AddQuestion"
					element={<PrivateRoutes component={AddQuestion} />}
				/>
				<Route
					path="/QuestionList"
					element={<PrivateRoutes component={QuestionList} />}
				/>
				<Route
					path="/Update/:id"
					element={<PrivateRoutes component={EditQuestion} />}
				/>
			</Routes>
		</div>
	);
}

export default Layout;

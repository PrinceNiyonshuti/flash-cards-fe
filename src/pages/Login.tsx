/** @format */
import { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

function Login() {
	// context data
	const { login, currentUser } = useContext(AuthContext);
	const history = useNavigate();

	// Form data
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		try {
			await login(`${email}`, `${password}`);
			Swal.fire({
				title: "Logged In",
				icon: "success",
				timer: 2000,
				showConfirmButton: false,
			});
			history("/Dashboard");
		} catch {
			Swal.fire({
				title: "Invalid Credentials",
				text: ``,
				icon: "error",
				timer: 2000,
				showConfirmButton: false,
			});
		}
	};
	return (
		<div className="flex items-center min-h-screen bg-gray-50">
			<div className="flex-1 h-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
				<div className="flex flex-col md:flex-row">
					<div className="h-32 md:h-auto md:w-1/2">
						<img
							className="object-cover w-full h-full"
							src="/bg.jpeg"
							alt="Flash Card Background"
						/>
					</div>
					<div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
						<div className="w-full">
							
							<h1 className="mb-4 text-2xl font-bold text-center text-gray-700">
								Login {currentUser && currentUser.email}
							</h1>
							<form onSubmit={handleLogin}>
								<div>
									<label className="block text-sm">Email</label>
									<input
										type="email"
										id="email"
										ref={emailRef}
										className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
										placeholder="Enter your E-mail"
										required
									/>
								</div>
								<div>
									<label className="block mt-4 text-sm">Password</label>
									<input
										className="w-full px-4 py-2 text-sm border rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
										placeholder=" **************** "
										type="password"
										id="password"
										ref={passwordRef}
										required
									/>
								</div>
								<button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
									Log in
								</button>
							</form>
							<p className="mt-4">
								Need an account ? &nbsp;
								<Link
									to="Register"
									className="text-sm text-blue-600 hover:underline">
									Register
								</Link>
							</p>
							<hr className="my-8" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;

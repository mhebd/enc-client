import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* Home Page */}
				<Route
					path="/"
					element={
						<PublicLayout>
							<Home />
						</PublicLayout>
					}
				/>

				{/* Register Page */}
				<Route
					path="/signup"
					element={
						<PublicLayout>
							<Register />
						</PublicLayout>
					}
				/>

				{/* Login Page */}
				<Route
					path="/login"
					element={
						<PublicLayout>
							<Login />
						</PublicLayout>
					}
				/>

				{/* Profile Page */}
				<Route
					path="/profile"
					element={
						<ProtectedLayout>
							<Profile />
						</ProtectedLayout>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;

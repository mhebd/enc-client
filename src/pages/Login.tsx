import { useState, useTransition } from "react";
import API from "../utility/axiosInstance";
import decrypt from "../utility/decryptor";
import { validator } from "../utility/validator";
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import ErrorMsg from "../components/ui/ErrorMsg";
import Loader from "../components/ui/Loader";

type ValidationErrors = {
	email?: string;
	password?: string;
	serverError?: string;
};

export default function Login() {
	const navigate = useNavigate();
	const [isPending, startTransition] = useTransition();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<ValidationErrors>({});

	// handle form submission
	const handleSubmit = async () => {
		const errors: ValidationErrors = {} as ValidationErrors;

		errors.email = validator(formData.email, "email")
			.required()
			.email()
			.validate();
		errors.password = validator(formData.password, "password")
			.required()
			.minLength(6)
			.validate();

		if (errors.email || errors.password) {
			setErrors(errors);
			return;
		}
		setErrors({});

		startTransition(async () => {
			try {
				const res = await API.post("/user/login", formData);
				const { user, ivHex, token } = res?.data?.data || {};

				// Save token and user data to localStorage
				const userData = await decrypt(
					user,
					ivHex,
				);
				localStorage.setItem("token", token);
				localStorage.setItem("user", userData);

				// Redirect to the profile page
				navigate("/profile");
			} catch (error: any) {
				console.log(error?.response?.data);
				setErrors({ serverError: error?.response?.data?.message ?? "Something went wrong" });
			}
		});
	};

	return (
		    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center">
          <Link to="/" className="text-xl font-bold">
            MyApp
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
							{errors.email && <ErrorMsg message={errors.email} />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
							{errors.password && <ErrorMsg message={errors.password} />}
              <div className="text-right text-sm">
                <Link to="#" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
							{errors.serverError && <ErrorMsg message={errors.serverError} />}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button onClick={handleSubmit} className="w-full gap-3">Login {isPending && <Loader color="#fff" />}</Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-medium text-primary hover:underline">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
	);
}

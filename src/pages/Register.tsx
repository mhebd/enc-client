/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useTransition } from "react";
import API from "../utility/axiosInstance";
import { validator } from "../utility/validator";
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import ErrorMsg from "../components/ui/ErrorMsg";
import Loader from "../components/ui/Loader";

type ValidationErrors = {
	name?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	serverError?: string;
};

export default function Register() {
	const navigate = useNavigate();
	const [isPending, startTransition] = useTransition();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState<ValidationErrors>({});

	// handle form submission
	const handleSubmit = async () => {
		// validate form data
		const errors: ValidationErrors = {} as ValidationErrors;

		errors.name = validator(formData.name, "name")
			.required()
			.alpha()
			.minLength(3)
			.maxLength(20)
			.validate();
		errors.email = validator(formData.email, "email")
			.required()
			.email()
			.validate();
		errors.password = validator(formData.password, "password")
			.required()
			.minLength(6)
			.validate();
		errors.confirmPassword = validator(
			formData.confirmPassword,
			"confirmPassword",
		)
			.required()
			.equals(formData.password, "password")
			.validate();

		if (errors.email || errors.password || errors.confirmPassword) {
			setErrors(errors);
			return;
		}
		setErrors({});

		// submit form data to server
		startTransition(async () => {
			try {
				const response = await API.post("/user/signup", {
					name: formData.name,
					email: formData.email,
					password: formData.password,
				});
				console.log(response.data);

				if(response?.data?.success) {
					navigate("/login");
				}

				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Enter your information to create an account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} value={formData.name} />
							{errors.name && <ErrorMsg message={errors.name} />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} />
							{errors.email && <ErrorMsg message={errors.email} />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="Create a password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} />
							{errors.password && <ErrorMsg message={errors.password} />}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm your password" onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} value={formData.confirmPassword} />
							{errors.confirmPassword && <ErrorMsg message={errors.confirmPassword} />}
							{errors.serverError && <ErrorMsg message={errors.serverError} />}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button onClick={handleSubmit} className="w-full gap-3">Sign Up {isPending && <Loader color="#fff" />}</Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
	);
}

import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/Button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { Separator } from "../components/ui/Separator";
import { useEffect, useState } from "react";

type TUser = {
	name: string;
	email: string;
};

export default function ProfilePage() {
	const navigate = useNavigate();
	const [user, setUser] = useState<TUser>();

	// get user data from local storage
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			setUser(JSON.parse(user));
		}
	}, []);

	// handle logout
	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");

		navigate("/");
	};
	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b">
				<div className="container flex h-16 items-center justify-between">
					<Link to="/" className="text-xl font-bold">
						MyApp
					</Link>
					<Button onClick={handleLogout} variant="ghost">
						Logout
					</Button>
				</div>
			</header>
			<main className="flex-1 container py-8">
				<div className="mx-auto max-w-3xl">
					<div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
						<Avatar className="h-32 w-32">
							<AvatarImage
								src="https://avatar.iran.liara.run/public"
								alt="User"
							/>
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
						<div className="flex-1 space-y-2 text-center md:text-left">
							<h1 className="text-3xl font-bold">{user?.name}</h1>
							<div className="flex flex-col gap-2 md:flex-row md:gap-4">
								<div className="flex items-center justify-center gap-1 md:justify-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-muted-foreground"
									>
										<title>Email</title>
										<rect width="20" height="16" x="2" y="4" rx="2" />
										<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
									</svg>
									<span className="text-sm text-muted-foreground">
										{user?.email}
									</span>
								</div>
								<div className="flex items-center justify-center gap-1 md:justify-start">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-muted-foreground"
									>
										<title>Map Marker</title>
										<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
										<circle cx="12" cy="10" r="3" />
									</svg>
									<span className="text-sm text-muted-foreground">
										Dhaka, Bangladesh
									</span>
								</div>
							</div>
							<div className="flex justify-center gap-2 md:justify-start">
								<Button size="sm" variant="outline">
									Edit Profile
								</Button>
								<Button size="sm" variant="outline">
									Settings
								</Button>
							</div>
						</div>
					</div>

					<Separator className="my-8" />

					<div className="grid gap-8">
						<Card>
							<CardHeader>
								<CardTitle>About Me</CardTitle>
								<CardDescription>
									Personal information and fun facts
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div>
									<h3 className="font-medium">Bio</h3>
									<p className="text-muted-foreground">
										Frontend developer passionate about creating beautiful and
										functional user interfaces. When I'm not coding, you can
										find me hiking or reading science fiction novels.
									</p>
								</div>

								<div>
									<h3 className="font-medium">Fun Facts</h3>
									<ul className="list-disc pl-5 text-muted-foreground">
										<li>Can solve a Rubik's cube in under 2 minutes</li>
										<li>Visited 15 countries and counting</li>
										<li>Makes the best homemade pizza according to friends</li>
										<li>
											Once won a karaoke competition with zero singing ability
										</li>
									</ul>
								</div>

								<div>
									<h3 className="font-medium">Interests</h3>
									<div className="flex flex-wrap gap-2">
										{[
											"Coding",
											"Hiking",
											"Reading",
											"Photography",
											"Travel",
											"Music",
										].map((interest) => (
											<div
												key={interest}
												className="rounded-full bg-muted px-3 py-1 text-sm"
											>
												{interest}
											</div>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
			<footer className="border-t py-6">
				<div className="container text-center text-sm text-muted-foreground">
					&copy; {new Date().getFullYear()} MyApp. All rights reserved.
				</div>
			</footer>
		</div>
	);
}

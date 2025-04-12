import { type ReactNode, useEffect, useState } from "react";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			setIsLoading(false);
		} else {
			window.location.href = "/login";
		}
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return <>{children}</>;
}

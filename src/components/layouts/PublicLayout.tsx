import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export default function PublicLayout({ children }: { children: ReactNode }) {
	const navigate = useNavigate();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			navigate("/profile");
		}
	}, []);
	return <>{children}</>;
}

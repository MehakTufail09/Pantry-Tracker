"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "@/firebase";

export default function SignUp() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSignUp = async () => {
		const auth = getAuth();
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			await setDoc(doc(firestore, "users", user.uid), {
				email: user.email,
				createdAt: new Date(),
			});
			router.push("/profile");
		} catch (error) {
			console.error("Error signing up: ", error);
			setError("Failed to create account. Please try again.");
		}
	};
	const handleSignin = async () => {
		router.push("/Signin");
	};

	return (
		<Box
			width="100vw"
			height="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			//bgcolor="#021526"
			color="white"
			sx={{
				background: "linear-gradient(to right, #021526, #092639, #021526)",
			}}
		>
			<Stack
				width="400px"
				spacing={3}
				alignItems="center"
				sx={{
					backgroundColor: "rgba(0, 0, 0, 0.3)",
					padding: 4,
					borderRadius: 2,
					mb: 2,
					mt: 2,
				}}
			>
				<Typography variant="h4" color="white" alignItems="center">
					Sign Up
				</Typography>

				<TextField
					label="Email"
					variant="outlined"
					fullWidth
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					sx={{
						mb: 2,
						mt: 2,
						color: "white",
						"& .MuiOutlinedInput-root": {
							color: "white",
							"& fieldset": {
								borderColor: "white",
							},
						},
						"& .MuiInputLabel-root": {
							color: "white", // Label color
						},
						"&:hover fieldset": {
							borderColor: "white",
						},
					}}
				/>
				<TextField
					label="Password"
					type="password"
					variant="outlined"
					fullWidth
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					sx={{
						mb: 2,
						mt: 2,
						color: "white",
						"& .MuiOutlinedInput-root": {
							color: "white",
							"& fieldset": {
								borderColor: "white",
							},
						},
						"& .MuiInputLabel-root": {
							color: "white", // Label color
						},
						"&:hover fieldset": {
							borderColor: "white",
						},
					}}
				/>
				<Button variant="contained" onClick={handleSignUp}>
					Sign Up
				</Button>
				<Typography>
					Already a member?
					<Button
						variant="plain"
						sx={{ color: "lightblue", textDecoration: "underline" }}
						onClick={handleSignin}
					>
						Sign In
					</Button>
				</Typography>
			</Stack>
		</Box>
	);
}

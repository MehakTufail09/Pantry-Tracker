"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	const handleSignIn = async () => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.push("/profile");
		} catch (error) {
			console.error("Error signing up: ", error);
		}
	};
	const handleSignup = async () => {
		router.push("/Signup");
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
					Sign In
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
				<Button variant="contained" onClick={handleSignIn}>
					Sign In
				</Button>
				<Typography>
					Don&apos;t have an account?
					<Button
						variant="plain"
						sx={{ color: "lightblue", textDecoration: "underline" }}
						onClick={handleSignup}
					>
						Sign up
					</Button>
				</Typography>
			</Stack>
		</Box>
	);
}

"use client";
//import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Welcome() {
	const router = useRouter();

	return (
		<Box
			width="100vw"
			height="100vh"
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			color="white"
			sx={{
				background: "linear-gradient(to right, #021526, #092635, #021526)",
			}}
		>
			<Typography variant="h2">Welcome to Pantry Tracker</Typography>
			<Typography variant="h5">
				Join us today and take control of your pantry inventory!&quot;
			</Typography>
			<Typography variant="h5">
				&quot;tay Stocked, Stay Prepared.&quot;
			</Typography>
			<Button
				variant="contained"
				onClick={() => router.push("/Signup")}
				sx={{ mt: 2 }}
			>
				Get Started
			</Button>
		</Box>
	);
}

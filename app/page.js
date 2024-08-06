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
			padding="16px"
			sx={{
				background: "linear-gradient(to right, #021526, #092635, #021526)",
				"@media (max-width: 300px)": {
					fontSize: "0.8rem",
					padding: "8px",
				},
				"@media (min-width: 301px) and (max-width: 500px)": {
					width: "100%",
					p: 2,
				},
				"@media (min-width: 501px) and (max-width: 960px)": {
					width: "100%",
					p: 3,
				},
				"@media (min-width: 961px)": {
					width: "100%",
					p: 4,
				},
			}}
		>
			<Typography
				variant="h2"
				padding="5px"
				sx={{
					"@media (max-width: 500px)": {
						fontSize: "1.5rem",
					},
					"@media (min-width: 501px) and (max-width: 960px)": {
						fontSize: "2rem",
					},
					"@media (min-width: 961px)": {
						fontSize: "2.5rem",
					},
				}}
			>
				Welcome to Pantry Tracker
			</Typography>
			<Typography
				variant="h5"
				sx={{
					"@media (max-width: 500px)": {
						fontSize: "1rem",
					},
					"@media (min-width: 501px) and (max-width: 960px)": {
						fontSize: "1.2rem",
					},
					"@media (min-width: 961px)": {
						fontSize: "1.5rem",
					},
				}}
			>
				Join us today and take control of your pantry inventory!&quot;
			</Typography>
			<Typography
				variant="h5"
				sx={{
					"@media (max-width: 500px)": {
						fontSize: "1rem",
					},
					"@media (min-width: 501px) and (max-width: 960px)": {
						fontSize: "1.2rem",
					},
					"@media (min-width: 961px)": {
						fontSize: "1.5rem",
					},
				}}
			>
				&quot;Stay Stocked, Stay Prepared.&quot;
			</Typography>
			<Button
				variant="contained"
				onClick={() => router.push("/Signup")}
				sx={{
					mt: 2,
					"@media (max-width: 500px)": {
						fontSize: "0.8rem",
					},
					"@media (min-width: 501px) and (max-width: 960px)": {
						fontSize: "1rem",
					},
					"@media (min-width: 961px)": {
						fontSize: "1.2rem",
					},
				}}
			>
				Get Started
			</Button>
		</Box>
	);
}

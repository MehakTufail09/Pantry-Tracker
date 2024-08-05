"use client";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { auth } from "@/firebase";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { firestore } from "@/firebase";
import { where } from "firebase/firestore";

import {
	collection,
	getDocs,
	query,
	doc,
	deleteDoc,
	getDoc,
	setDoc,
} from "firebase/firestore";
import {
	Box,
	Modal,
	ModalManager,
	TextField,
	Typography,
	Stack,
	Button,
	theme,
	breakpoints,
} from "@mui/material";

import ProtectedRoute from "../protectedRoute";

export default function Profile() {
	const [pantry, setPantry] = useState([]);

	const [open, setOpen] = useState(false);
	const [itemName, setItemName] = useState("");
	const [category, setCategory] = useState("");
	const [quantity, setQuantity] = useState(1);

	const updateInventory = async () => {
		const auth = getAuth();
		const user = auth.currentUser;

		if (user) {
			const snapshot = query(
				collection(firestore, "pantry"),
				where("uid", "==", user.uid)
			);
			const docs = await getDocs(snapshot);
			const inventoryList = [];
			docs.forEach((doc) => {
				const data = doc.data();
				inventoryList.push({
					name: doc.id.split("_")[1],
					category: data.category,
					quantity: data.quantity,
					...data,
				});
			});
			setPantry(inventoryList);
		} else {
			console.error("User not authenticated");
		}
	};

	const removeItem = async (item) => {
		const docRef = doc(collection(firestore, "pantry"), item);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const { quantity } = docSnap.data();
			if (quantity === 1) {
				await deleteDoc(docRef);
			} else {
				await setDoc(docRef, { quantity: quantity - 1 });
			}
		}
		await updateInventory();
	};

	//add
	const addItem = async (item, category, quantity) => {
		const auth = getAuth();
		const user = auth.currentUser;
		if (user) {
			const docRef = doc(
				collection(firestore, "pantry"),
				`${user.uid}_${item}`
			);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				//const { quantity } = docSnap.data();
				const existingData = docSnap.data();
				await setDoc(docRef, {
					...existingData,
					quantity: existingData.quantity + quantity,
				});
			} else {
				await setDoc(docRef, {
					name: item,
					category: category,
					quantity: quantity,
					uid: user.uid,
				});
			}
		} else {
			console.error("User not authenticated");
		}
		await updateInventory();
	};
	useEffect(() => {
		updateInventory();
	}, []);

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			router.push("page1");
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<ProtectedRoute>
			<Box
				width="100vw"
				height="100vh"
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				bgcolor="#021526"
				color="white"
				padding="16px"
			>
				<Button
					variant="contained"
					onClick={handleSignOut}
					sx={{
						position: "absolute",
						top: "25px",
						right: "25px",
					}}
					alignSelf="flex-end"
					textAlign="right"
				>
					Sign Out
				</Button>

				<Button
					variant="contained"
					onClick={handleOpen}
					justifyContent="center"
					alignItems="center"
					display="flex"
					flexDirection="column"
					sx={{
						mb: 2,
						mt: 2,
					}}
				>
					Add New Item
				</Button>

				<Modal open={open} onClose={handleClose}>
					<Box
						display="flex"
						position="fixed"
						top="15%"
						left="30%"
						maxWidth="600px"
						//height="80vh"
						bgcolor="#092635"
						color="white"
						border="2px solid white"
						boxShadow={24}
						width="90%"
						transform="translate (-50%, -50%)"
						p={4}
						padding="16px"
						flexDirection="column"
						gap={2}
						sx={{
							"@media (max-width: 600px)": {
								width: "95%",
								p: 2,
							},
							"@media (min-width: 601px) and (max-width: 960px)": {
								width: "80%",
								p: 3,
							},
							"@media (min-width: 961px)": {
								width: "70%",
								p: 4,
							},
						}}
						//sx={{ transform: "translate (-50%, -50%)" }}
					>
						<Typography variant="h6">Add Item</Typography>
						<Stack
							width="100%"
							height="100%"
							spacing={2}
							sx={{
								"@media (max-width: 500px)": {
									width: "75%",
									p: 2,
								},
								"@media (max-width: 600px)": {
									width: "95%",
									p: 2,
								},
								"@media (min-width: 601px) and (max-width: 960px)": {
									width: "80%",
									p: 3,
								},
								"@media (min-width: 961px)": {
									width: "100%",
									p: 4,
								},
							}}
						>
							<TextField
								label="Item"
								variant="outlined"
								fullwidth
								value={itemName}
								onChange={(e) => {
									setItemName(e.target.value);
								}}
								sx={{
									mb: 2,
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
								label="Category"
								variant="outlined"
								fullWidth
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								sx={{
									mb: 2,
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
								label="Quantity"
								type="number"
								variant="outlined"
								fullWidth
								value={quantity}
								onChange={(e) => setQuantity(Number(e.target.value))}
								sx={{
									mb: 2,
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
							<Button
								gap={2}
								variant="contained"
								onClick={() => {
									addItem(itemName, category, quantity);
									setItemName("");
									setCategory("");
									setQuantity(1);
									handleClose();
								}}
							>
								Add Item
							</Button>
						</Stack>
					</Box>
				</Modal>
				<Stack
					width="90%"
					maxWidth="800px"
					height="300px"
					spacing={3}
					overflow="auto"
				>
					<Typography
						variant="h4"
						textAlign="center"
						backgroundColor="#0F67B1"
						padding="15px"
					>
						Pantry Items
					</Typography>
					{pantry.map(({ name, category, quantity }) => (
						<Box
							key={name}
							width="100%"
							minHeight="20px"
							display="flex"
							alignItems="center"
							justifyContent="space-between"
							bgcolor="#092635"
							padding={3}
						>
							<Typography
								variant="h5"
								color="#ffff"
								textAlign="center"
								justifyContent="center"
								display="flex"
							>
								{name.charAt(0).toUpperCase() + name.slice(1)}
							</Typography>
							<Typography
								variant="h5"
								color="#ffff"
								textAlign="center"
								display="flex"
								justifyContent="center"
							>
								{category}
							</Typography>

							<Typography
								variant="h5"
								color="#ffff"
								textAlign="center"
								alignContent="center"
								display="flex"
								justifyContent="center"
							>
								{quantity}
							</Typography>
						</Box>
					))}
				</Stack>
			</Box>
		</ProtectedRoute>
	);
}

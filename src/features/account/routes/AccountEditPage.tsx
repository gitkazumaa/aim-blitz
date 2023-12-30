import { useState, useRef, useEffect, ChangeEvent } from "react"
import { Stack, Avatar, Button, TextField, IconButton } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { queryClient } from "@/libs/reactQuery"
import { useGetAccount } from ".."
import { updateAccount } from "../api/updateAccount"
import { enqueueSnackbar } from "notistack"

export const AccountEditPage = () => {
	const { data: getAccountResponse } = useGetAccount()
	const [selectedImage, setSelectedImage] = useState<File | undefined>(
		undefined
	)
	const [username, setUsername] = useState(
		getAccountResponse?.data.account.username || ""
	)
	const [isEditingUsername, setIsEditingUsername] = useState(false)
	const usernameTextfieldRef = useRef<HTMLInputElement | null>(null)

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		setSelectedImage(file)
	}

	const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value)
	}

	const handleEditIconClick = () => {
		setIsEditingUsername(true)
	}

	const handleSaveChanges = async () => {
		if (getAccountResponse?.data.account) {
			const response = await updateAccount({
				username: username,
				image: selectedImage,
			})

			if (response.success) {
				enqueueSnackbar(response.message, { variant: "success" })
				queryClient.invalidateQueries({ queryKey: ["api", "accounts"] })
			} else {
				enqueueSnackbar(response.message, { variant: "error" })
			}
		}
	}

	const handleUsernameTextfieldBlur = () => {
		setIsEditingUsername(false)
		if (username === "") {
			if (getAccountResponse?.data.account) {
				setUsername(getAccountResponse?.data.account.username)
			}
		}
	}

	useEffect(() => {
		if (getAccountResponse?.data.account) {
			setUsername(getAccountResponse?.data.account.username)
		}
	}, [getAccountResponse?.data.account])

	useEffect(() => {
		if (isEditingUsername) {
			usernameTextfieldRef.current?.focus()
		} else {
			usernameTextfieldRef.current?.blur()
		}
	}, [isEditingUsername])

	return (
		<>
			{getAccountResponse?.data.account && (
				<Stack paddingX={4} height="100%" width="100%">
					<Stack>
						{/* Header with account image and username */}
						<Stack
							flexDirection={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							gap={4}
							my={1}
							py={1}
						>
							<Avatar
								alt={
									selectedImage
										? URL.createObjectURL(selectedImage)
										: getAccountResponse?.data.account.image
								}
								src={
									selectedImage
										? URL.createObjectURL(selectedImage)
										: getAccountResponse?.data.account.image
								}
								sx={{ width: 96, height: 96, alignSelf: "end" }}
							/>
							<Avatar
								alt={
									selectedImage
										? URL.createObjectURL(selectedImage)
										: getAccountResponse?.data.account.image
								}
								src={
									selectedImage
										? URL.createObjectURL(selectedImage)
										: getAccountResponse?.data.account.image
								}
								sx={{ width: 40, height: 40, alignSelf: "end" }}
							/>
							<Avatar
								alt={
									selectedImage
										? URL.createObjectURL(selectedImage)
										: getAccountResponse?.data.account.image
								}
								src={
									selectedImage
										? URL.createObjectURL(selectedImage)
										: getAccountResponse?.data.account.image
								}
								sx={{ width: 24, height: 24, alignSelf: "end" }}
							/>
							<input
								type="file"
								accept="image/*"
								onChange={handleImageChange}
								style={{ display: "none" }}
								id="image-input"
							/>
							<label htmlFor="image-input">
								<Button variant="contained" component="span">
									Change
								</Button>
							</label>
						</Stack>
						<Stack
							flexDirection={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							gap={4}
							my={1}
							py={1}
						>
							<TextField
								value={username}
								variant="filled"
								onChange={handleUsernameChange}
								disabled={!isEditingUsername}
								inputRef={usernameTextfieldRef}
								onBlur={handleUsernameTextfieldBlur}
								label="Username"
							/>
							<IconButton
								sx={{ width: 56, height: 56 }}
								onClick={handleEditIconClick}
							>
								<EditOutlinedIcon />
							</IconButton>
						</Stack>
						<Stack
							flexDirection={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							gap={4}
							my={1}
							py={1}
						>
							<Button variant="contained" onClick={handleSaveChanges}>
								Save Changes
							</Button>
						</Stack>
					</Stack>
				</Stack>
			)}
		</>
	)
}

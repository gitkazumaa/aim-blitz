interface Error {
	code: string
	details: string
}

export interface ApiResponse<T = any> {
	success: boolean
	message: string
	data: T extends undefined | null ? T : any
	error: T extends undefined | null ? null : Error
}

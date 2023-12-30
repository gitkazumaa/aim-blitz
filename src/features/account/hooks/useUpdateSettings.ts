import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/libs/reactQuery"
import { updateSettings } from "../api/updateSettings"

export const useUpdateSettings = () => {
	return useMutation({
		mutationFn: updateSettings,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["api", "accounts"],
			})
		},
	})
}

import { useQuery } from "@tanstack/react-query"
import { getAccount } from "../api/getAccount"

export const useGetAccount = () => {
	return useQuery({
		queryKey: ["api", "accounts"],
		queryFn: getAccount,
	})
}

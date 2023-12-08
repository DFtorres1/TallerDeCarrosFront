import { useQuery } from "react-query"
import api from "src/utils/api"
import { reportInQueryKeys } from "src/utils/queryKeys"

const getReportsIn = async (): Promise<ReportIn[]> => {
    const { data } = await api.get("/reportin")
    return data
}

const useListReportsIn = () => {
    return useQuery<ReportIn[]>(
        reportInQueryKeys.detail(),
        async () => getReportsIn(),
        {
            staleTime: Infinity,
            notifyOnChangeProps: ["data", "error"]
        }
    )
}

export default useListReportsIn
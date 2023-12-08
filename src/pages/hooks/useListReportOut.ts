import { useQuery } from "react-query"
import api from "src/utils/api"
import { reportOutQueryKeys } from "src/utils/queryKeys"

const getReportsOut = async (): Promise<ReportOut[]> => {
    const { data } = await api.get("/reportout")
    return data
}

const useListReportsOut = () => {
    return useQuery<ReportOut[]>(
        reportOutQueryKeys.detail(),
        async () => getReportsOut(),
        {
            staleTime: Infinity,
            notifyOnChangeProps: ["data", "error"]
        }
    )
}

export default useListReportsOut
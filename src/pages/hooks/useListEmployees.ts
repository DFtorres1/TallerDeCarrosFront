import { useQuery } from "react-query"
import api from "src/utils/api"
import { employeeQueryKeys } from "src/utils/queryKeys"

const getEmployees = async (): Promise<Employee[]> => {
    const { data } = await api.get("/mechanic")
    return data
}

const useListEmployees = () => {
    return useQuery<Employee[]>(
        employeeQueryKeys.detail(),
        async () => getEmployees(),
        {
            staleTime: Infinity,
            notifyOnChangeProps: ["data", "error"]
        }
    )
}

export default useListEmployees
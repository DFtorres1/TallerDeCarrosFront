import { useQuery } from "react-query"
import api from "src/utils/api"
import { brandQueryKeys } from "src/utils/queryKeys"

const getBrands = async (): Promise<Brand[]> => {
    const { data } = await api.get("/brand")
    return data
}

const useListBrands = () => {
    return useQuery<Brand[]>(
        brandQueryKeys.detail(),
        async () => getBrands(),
        {
            staleTime: Infinity,
            notifyOnChangeProps: ["data", "error"]
        }
    )
}

export default useListBrands
import { useQuery } from "react-query";
import api from "src/utils/api";
import { modelQueryKeys } from "src/utils/queryKeys";

const getModels = async (idbrand: number | undefined): Promise<Model[]> => {
  if (idbrand != undefined) {
    const { data } = await api.get(`/model/${idbrand}`);
    return data;
  } else {
    const model: Model[] = [];
    return model;
  }
};

const useListModels = (idbrand: number | undefined) => {
  return useQuery<Model[]>(
    modelQueryKeys.detail(),
    async () => getModels(idbrand),
    {
      staleTime: Infinity,
      notifyOnChangeProps: ["data", "error"],
      enabled: !!idbrand,
    }
  );
};

export default useListModels;

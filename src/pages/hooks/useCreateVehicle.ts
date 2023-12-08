import { useMutation } from "react-query";
import api from "src/utils/api";

const postVehicle = async (vehicle: Vehicle) => {
  const { data } = await api.post("/vehicles", vehicle);
  return data;
};

const useCreateCar = () => {
  return useMutation((vehicle: Vehicle) => postVehicle(vehicle), {
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export default useCreateCar
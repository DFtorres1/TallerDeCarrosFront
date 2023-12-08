import { useMutation } from "react-query";
import api from "src/utils/api";

const postReportOut = async (report: ReportOut | undefined) => {
  const { data } = await api.post("/reportout", report);
  return data;
};

const useCreateReportOut = () => {
  return useMutation((report: ReportOut | undefined) => postReportOut(report), {
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export default useCreateReportOut;

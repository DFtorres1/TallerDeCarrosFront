import { useMutation } from "react-query";
import api from "src/utils/api";

const postReportIn = async (report: ReportIn | undefined) => {
  const { data } = await api.post("/reportin", report);
  return data;
};

const useCreateReportIn = () => {
  return useMutation((report: ReportIn | undefined) => postReportIn(report), {
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export default useCreateReportIn;

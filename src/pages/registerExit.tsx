import { List } from "antd";
import useListReportsOut from "./hooks/useListReportOut";

const RegisterExit = () => {
  const { data: reportsOutData } = useListReportsOut();

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={reportsOutData}
        header={<h2>Registro de reportes de salida</h2>}
        renderItem={(reportout, reportoutKey) => (
          <List.Item key={reportoutKey}>
            <List.Item.Meta
              title={
                reportout.reportIn?.plate +
                "\u00a0\u00a0\u00a0\u00a0" +
                reportout.reportIn?.vehicle.brand +
                "\u00a0 - \u00a0" +
                reportout.reportIn?.vehicle.model
              }
              description={reportout.reportIn?.vehicle.owner}
            />
            <strong>{"Fecha de Entrada: "}</strong>  {reportout.reportIn?.inhour}
            <br/>
            <strong>{"Fecha de salida: "}</strong>  {reportout.exithour}
            <br/>
            <strong>{"Motivo"}</strong> + {reportout.reportIn?.reason}
          </List.Item>
        )}
      />
    </div>
  );
};

export default RegisterExit;

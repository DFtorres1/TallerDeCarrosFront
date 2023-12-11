import {
  Button,
  Form,
  FormInstance,
  List,
  Modal,
  Select,
  Space,
  TimePicker,
} from "antd";
import useListReportsIn from "./hooks/useListReportsIn";
import { useEffect, useState } from "react";
import useListEmployees from "./hooks/useListEmployees";
import useCreateReportOut from "./hooks/useCreateReportOut";

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      }
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Agregar
    </Button>
  );
};

const WaitList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentReportIn, setCurretReportIn] = useState<number | undefined>();
  const [reportout, setReportout] = useState<ReportOut>();

  const [form] = Form.useForm();

  let formValues = Form.useWatch([], form);

  const { data: reportsData, refetch: reportRefetch } = useListReportsIn();
  const { data: employeeData, isSuccess: employeeSuccess } = useListEmployees();
  const { mutate: createReportOut, isSuccess: reportoutSuccess } =
    useCreateReportOut();

  const handleChangeModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  const handleChancheCurrentReportIn = (idrepin: number | undefined) => {
    handleChangeModalVisibility();
    setCurretReportIn(idrepin);
    console.log(currentReportIn);
  };

  useEffect(() => {
    reportout?.dni ? createReportOut(reportout) : null;
  }, [reportout]);

  useEffect(() => {
    setModalVisible(false);
    reportoutSuccess ? form.resetFields() : null;
    reportRefetch();
  }, [reportoutSuccess]);

  const handleReportOut = () => {
    setReportout({
      dni: formValues.worker,
      exithour: formValues.exithour,
      idrepin: currentReportIn,
    });
  };

  return (
    <div>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={reportsData}
        header={<h2>Lista de espera</h2>}
        renderItem={(report) => (
          <List.Item
            key={report.idrepin}
            actions={[
              <Button
                onClick={() => handleChancheCurrentReportIn(report.idrepin)}
              >
                Reportar salida
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                report.plate +
                "\u00a0\u00a0\u00a0\u00a0" +
                report.vehicle.brand +
                "\u00a0 - \u00a0" +
                report.vehicle.model
              }
              description={report.vehicle.owner}
            />
            {report.reason}
          </List.Item>
        )}
      />
      <Modal
        title="Registrar salida"
        open={modalVisible}
        onOk={handleReportOut}
        onCancel={handleChangeModalVisibility}
        footer={(_, { CancelBtn }) => {
          return (
            <>
              <CancelBtn />
              <Space onClick={handleReportOut}>
                <SubmitButton form={form} />
              </Space>
            </>
          );
        }}
      >
        <Form form={form}>
          <Form.Item name="worker" label="Salida a nombre de:" required={true}>
            <Select style={{ width: "100%" }}>
              {employeeSuccess ? (
                employeeData?.map((employee, employeeKey) => (
                  <Select.Option key={employeeKey} value={employee.dni}>
                    {employee.name}
                  </Select.Option>
                ))
              ) : (
                <Select.Option value="No value">
                  No options to show
                </Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item name="exithour" label="Hora de salida" required={true}>
            <TimePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WaitList;

import { Button, Form, Input, Select, Space, TimePicker } from "antd";
import useListBrands from "./hooks/useListBrands";
import useListModels from "./hooks/useListModels";
import { useEffect, useState } from "react";
import useListEmployees from "./hooks/useListEmployees";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import type { FormInstance } from "antd";
import useCreateCar from "./hooks/useCreateVehicle";
import useCreateReportIn from "./hooks/useCreateReportsIn";

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

const RegisterEntrace = () => {
  const [currentBrand, setCurretBrand] = useState<number>();

  const [reportin, setReportin] = useState<ReportIn>();
  const [vehicle, setVehicle] = useState<Vehicle>();

  const [form] = Form.useForm();

  let formValues = Form.useWatch([], form);

  const { data: workerData, isSuccess: workerSuccess } = useListEmployees();
  const { data: brandData, isSuccess: brandSuccess } = useListBrands();
  const {
    data: modelData,
    isSuccess: modelSuccess,
    refetch: modelRefetch,
  } = useListModels(currentBrand);
  const {
    mutate: createCar,
    data: carData,
    //isError: carError,
    isSuccess: carSuccess,
  } = useCreateCar();
  const {
    mutate: createReportIn,
    //isError: reportError,
    isSuccess: reportSuccess,
  } = useCreateReportIn();

  useEffect(() => {
    modelRefetch();
  }, [currentBrand]);

  useEffect(() => {
    handlesetReportIn();
    createReportIn(reportin)
    if (reportSuccess){
      form.resetFields()
    }
  }, [carSuccess]);

  useEffect(() => {
    if (vehicle?.plate) {
      createCar(vehicle);
    }
  }, [vehicle]);

  const handleCurrentBrand = (value: number) => {
    setCurretBrand(value);
  };

  const handlesetCarIn = () => {
    setVehicle({
      plate: formValues.plate,
      owner: formValues.owner,
      color: formValues.color,
      idbrand: formValues.brand,
      idmodel: formValues.model,
    });
  };

  const handlesetReportIn = () => {
    carData?
    setReportin({
      plate: carData[0]?.plate,
      dni: formValues.worker,
      inhour: formValues.inhour,
      reason: formValues.reason,
    }): null
  };

  return (
    <>
      <Form form={form} name="validateOnly">
        <Form.Item name="plate" label="Placa" required={true}>
          <Input />
        </Form.Item>
        <Form.Item name="brand" label="Marca" required={true}>
          <Select onChange={handleCurrentBrand}>
            {brandSuccess ? (
              brandData?.map((brand) => (
                <Select.Option key={brand.idbrand} value={brand.idbrand}>
                  {brand.brandName}
                </Select.Option>
              ))
            ) : (
              <Select.Option value="No value">No options to show</Select.Option>
            )}
          </Select>
        </Form.Item>
        <Form.Item name="model" label="Modelo" required={true}>
          <Select>
            {modelSuccess ? (
              modelData?.map((model) => (
                <Select.Option key={model.idmodel} value={model.idmodel}>
                  {model.modelname}
                </Select.Option>
              ))
            ) : (
              <Select.Option value="No value">No options to show</Select.Option>
            )}
          </Select>
        </Form.Item>
        <FormItem name="color" label="Color" required={true}>
          <Input name="color" />
        </FormItem>
        <FormItem name="owner" label="Propietario" required={true}>
          <Input />
        </FormItem>
        <Form.Item name="inhour" label="Hora de entrada" required={true}>
          <TimePicker />
        </Form.Item>
        <Form.Item name="worker" label="Encargado" required={true}>
          <Select>
            {workerSuccess ? (
              workerData?.map((worker, workerkey) => (
                <Select.Option key={workerkey} value={worker.dni}>
                  {worker.name}
                </Select.Option>
              ))
            ) : (
              <Select.Option value="No value">No options to show</Select.Option>
            )}
          </Select>
        </Form.Item>
        <FormItem name="reason" label="Motivo" required={true}>
          <TextArea rows={4} />
        </FormItem>
        <Form.Item>
          <Space onClick={handlesetCarIn}>
            <SubmitButton form={form} />
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterEntrace;

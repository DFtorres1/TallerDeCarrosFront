import useListEmployees from "./hooks/useListEmployees";

const EmployeeManager = () => {
  const { data, isSuccess } = useListEmployees();

  return (
    <div>
      {isSuccess ? (
        data.map((employee, employeeKey) => (
          <h1 key={employeeKey}>{employee.name}</h1>
        ))
      ) : (
        <div>No Employees to show</div>
      )}
    </div>
  );
};

export default EmployeeManager;

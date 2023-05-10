import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import crud from "../Utils/Crud";

export default function Employee(props) {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(props.data);
  const [employeesShifts, setEmployeesShifts] = useState([]);

  const getEmpShifts = async () => {
    const { data } = await crud.getItem(
      "http://localhost:5000/employeesshifts",
      employee.id
    );
    setEmployeesShifts(data);
  };

  useEffect(() => {
    getEmpShifts();
  }, []);

  const editEmployee = () => {
    navigate(`/edit_employee/${employee.id}`);
  };

  const addShift = () => {
    navigate(`/add_shift/${employee.id}`);
  };

  const deleteEmployee = async () => {
    await crud.deleteItem("http://localhost:5000/employees", employee.id);
    await crud.deleteItem("http://localhost:5000/employeesshifts", employee.id);
    window.location.href = "http://localhost:5173/employees";
  };
  return (
    <tr key={employee.id}>
      <td>{employee.id}</td>
      <td>{employee.first_name}</td>
      <td>{employee.last_name}</td>
      <td>{employee.start_work_year}</td>
      <td>{employee.department_name}</td>
      <td>
        <ul>
          {employeesShifts.length > 0
            ? employeesShifts.map((shift, index) => (
                <li
                  key={index}
                >{`${shift?.date} ${shift?.start_time}-${shift?.end_time}`}</li>
              ))
            : null}
        </ul>
      </td>
      <td>
        <button onClick={editEmployee}>Edit</button>
        <button onClick={deleteEmployee}>Delete</button>
        <button onClick={addShift}>Add Shift</button>
      </td>
    </tr>
  );
}

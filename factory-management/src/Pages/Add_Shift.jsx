import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import crud from "../Utils/Crud";

export default function Add_Shift() {
  const params = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    department_id: -1,
    first_name: "",
    last_name: "",
    start_work_year: -1,
  });
  const [employeesShifts, setEmployeesShifts] = useState([]);
  const [newShift, setNewShift] = useState({
    employee_id: +params.id,
    shift_id: -1,
  });

  const getEmployee = async () => {
    const resp = await crud.getItem(
      `http://localhost:5000/employees`,
      params.id
    );
    setEmployee(resp.data);
  };

  const getEmpShifts = async () => {
    const { data } = await crud.getItem(
      "http://localhost:5000/employeesshifts/add_shift",
      params.id
    );
    setEmployeesShifts(data);
  };

  const getAllEmpsShifts = async () => {
    const resp = await crud.getAllItems(
      "http://localhost:5000/employeesshifts/"
    );
    setNewShift({ ...newShift, id: resp.data.length + 1 });
  };

  useEffect(() => {
    getEmployee();
    getEmpShifts();
    getAllEmpsShifts();
  }, []);

  const addShift = async () => {
    switch (newShift.shift_id) {
      case -1:
        console.log("shift not selected");
        alert("shift not selected");
        break;
      case -2:
        console.log("This employee is on all shifts");
        alert("This employee is on all shifts");
        break;
      default:
        await crud.createItem(
          "http://localhost:5000/employeesshifts/",
          newShift
        );
        navigate(`/employees`);
        break;
    }
  };
  return (
    <div>
      <h3>Add Shift To {employee.first_name}</h3>
      <select
        defaultValue={-1}
        onChange={(e) =>
          setNewShift({ ...newShift, shift_id: +e.target.value })
        }
      >
        <option value={-1}></option>
        {employeesShifts.map((shift) => (
          <option value={shift.id} key={shift.id}>
            {shift.date} {shift.start_time}-{shift.end_time}
          </option>
        ))}
      </select>
      <br />
      <button onClick={addShift}>Add Shit</button>
    </div>
  );
}

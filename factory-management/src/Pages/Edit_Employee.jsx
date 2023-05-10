import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import crud from "../Utils/Crud";

export default function Edit_Employee() {
  const params = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [employee, setEmployee] = useState({
    department_id: -1,
    first_name: "",
    last_name: "",
    start_work_year: -1,
  });

  const getEmployee = async () => {
    const resp = await crud.getItem(
      `http://localhost:5000/employees`,
      params.id
    );
    setEmployee(resp.data);
  };

  const getDepartments = async () => {
    const resp = await crud.getAllItems("http://localhost:5000/departments/");
    setDepartments(resp.data);
  };

  useEffect(() => {
    getEmployee();
    getDepartments();
  }, []);

  const updateEmployee = async () => {
    await crud.updateItem(
      "http://localhost:5000/employees",
      params.id,
      employee
    );
    navigate(`/employees`);
  };
  return (
    <div>
      <h3>Edit Employee</h3>
      First Name:{" "}
      <input
        type="text"
        value={employee.first_name}
        onChange={(e) =>
          setEmployee({ ...employee, first_name: e.target.value })
        }
      />
      <br />
      Last Name:{" "}
      <input
        type="text"
        value={employee.last_name}
        onChange={(e) =>
          setEmployee({ ...employee, last_name: e.target.value })
        }
      />
      <br />
      Start Work Year:{" "}
      <input
        type="text"
        value={employee.start_work_year}
        onChange={(e) =>
          setEmployee({ ...employee, start_work_year: e.target.value })
        }
      />
      <br />
      Department:
      <select
        value={employee.department_id}
        onChange={(e) =>
          setEmployee({ ...employee, department_id: e.target.value })
        }
      >
        {departments.map((department) => (
          <option value={department.id} key={department.id}>
            {department.name}
          </option>
        ))}
      </select>
      <br />
      <button onClick={updateEmployee}>Save</button>
    </div>
  );
}

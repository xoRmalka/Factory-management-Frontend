import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import crud from "../Utils/Crud";
import Department from "../Components/Department";

export default function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    const resp = await crud.getAllItems("http://localhost:5000/departments/");
    setDepartments(resp.data);
  };

  const navigate = useNavigate();

  const newDepartment = () => {
    navigate(`/new_department`);
  };

  return (
    <div>
      <h1>Departments</h1>
      <button onClick={newDepartment}>Add Department</button>
      <br />
      <br />

      {departments.map((department) => (
        <Department
          data={department}
          key={department.id}
          callback={getDepartments}
        />
      ))}
    </div>
  );
}

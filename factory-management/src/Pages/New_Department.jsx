import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import crud from "../Utils/Crud";

export default function New_Department() {
  const [department, setDepartment] = useState({
    id: -1,
    manger_name: "",
    name: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    const resp = await crud.getAllItems("http://localhost:5000/departments/");
    const id = resp.data.length + 1;
    setDepartment({ ...department, id: id });
  };

  const createDepartment = async () => {
    await crud.createItem("http://localhost:5000/departments/", department);
    navigate(`/departments`);
  };

  return (
    <div>
      <h3>Create New Department</h3>
      Name:{" "}
      <input
        type="text"
        onChange={(e) => setDepartment({ ...department, name: e.target.value })}
      />
      <br />
      Manger Name:{" "}
      <input
        type="text"
        onChange={(e) =>
          setDepartment({ ...department, manger_name: e.target.value })
        }
      />
      <br />
      <button onClick={createDepartment}>Create Department</button>
    </div>
  );
}

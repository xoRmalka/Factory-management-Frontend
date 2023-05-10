import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import crud from "../Utils/Crud";

export default function Edit_Department() {
  const [department, setDepartment] = useState({
    manger_name: "",
    name: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  const getDepartment = async () => {
    const resp = await crud.getItem(
      `http://localhost:5000/departments`,
      params.id
    );
    setDepartment(resp.data);
  };

  useEffect(() => {
    getDepartment();
  }, []);

  const updateDepartment = async () => {
    await crud.updateItem(
      "http://localhost:5000/departments",
      params.id,
      department
    );
    navigate(`/departments`);
  };

  return (
    <div>
      <h3>Edit {department.name} Department</h3>
      Name:{" "}
      <input
        type="text"
        value={department.name}
        onChange={(e) => setDepartment({ ...department, name: e.target.value })}
      />
      <br />
      Manger Name:{" "}
      <input
        type="text"
        value={department.manger_name}
        onChange={(e) =>
          setDepartment({ ...department, manger_name: e.target.value })
        }
      />
      <br />
      <button onClick={updateDepartment}>Save</button>
    </div>
  );
}

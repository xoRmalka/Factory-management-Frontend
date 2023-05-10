import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import crud from "../Utils/Crud";

export default function Department(props) {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(props.data);

  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const { data } = await crud.getAllItems("http://localhost:5000/employees/");
    data.map((employee) => {
      employee.department_id == props.data.id ? setIsEmpty(false) : null;
    });
  };

  const deleteDepartment = async () => {
    await crud.deleteItem(`http://localhost:5000/departments`, employee.id);
    props.callback();
  };

  const editDepartment = () => {
    navigate(`/edit_department/${employee.id}`);
  };

  return (
    <div style={{ border: "1px solid purple" }}>
      {" "}
      <h3>
        {props.data.id}. {props.data.name} department
      </h3>
      Manger: {props.data.manger_name}
      <br />
      <button onClick={editDepartment}>Edit</button>
      {isEmpty ? <button onClick={deleteDepartment}>Delete</button> : null}
      <br />
    </div>
  );
}

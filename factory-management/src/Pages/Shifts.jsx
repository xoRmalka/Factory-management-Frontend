import React from "react";
import crud from "../Utils/Crud";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Shift from "../Components/Shift";

export default function Shifts() {
  const navigate = useNavigate();
  const [shifts, setShifts] = useState([]);

  const getShifts = async () => {
    const { data } = await crud.getAllItems(
      "http://127.0.0.1:5000/shifts/get_shifts_with_employees"
    );
    setShifts(data);
  };

  useEffect(() => {
    getShifts();
  }, []);

  return (
    <div>
      <h1>Shifts</h1>
      <button
        onClick={() =>
          navigate("/new_shift", { state: { id: +shifts.length + 1 } })
        }
      >
        New Shift
      </button>
      <br /> <br />
      <table border={"1"}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Registered Employees</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <Shift data={shift} key={shift.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import crud from "../Utils/Crud";

export default function New_Shift() {
  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;

  const [shift, setShift] = useState({
    id: id,
    date: "",
    start_time: "",
    end_time: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await crud.createItem("http://127.0.0.1:5000/shifts/", shift);
    navigate("/shifts");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShift({ ...shift, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={shift.date}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Start Time:
        <input
          type="text"
          name="start_time"
          value={shift.start_time}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        End Time:
        <input
          type="text"
          name="end_time"
          value={shift.end_time}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Create Shift</button>
    </form>
  );
}

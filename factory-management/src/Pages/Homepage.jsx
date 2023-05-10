import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Departments from "./Departments";
import Edit_Department from "./Edit_Department";
import Employees from "./Employees";
import New_Department from "./New_Department";
import Shifts from "./Shifts";
import Edit_Employee from "./Edit_Employee";
import Add_Shift from "./Add_Shift";
import SearchResults from "./SearchResults";
import New_Shift from "./New_Shift";
import Empty from "./Empty";
export default function Homepage() {
  return (
    <div>
      <h1>Factory Management</h1>
      <Link to="/">Home</Link> <br />
      <Link to="/employees"> Employees </Link>
      <br />
      <Link to="/departments">Departments</Link> <br />
      <Link to="/shifts">Shifts</Link>
      <br />
      <Routes>
        <Route path="/" element={<Empty />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/edit_employee/:id" element={<Edit_Employee />} />
        <Route path="/add_shift/:id" element={<Add_Shift />} />

        <Route path="/shifts" element={<Shifts />} />
        <Route path="/new_shift" element={<New_Shift />} />
        <Route path="/edit_department/:id" element={<Edit_Department />} />
        <Route path="/new_department" element={<New_Department />} />
      </Routes>
    </div>
  );
}

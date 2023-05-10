import React from "react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import crud from "../Utils/Crud";
import Employee from "../Components/Employee";

export default function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getEmployees = async () => {
    const { data } = await crud.getAllItems("http://localhost:5000/employees/");

    const newdata = data.map(async (employee) => {
      const departmentName = await crud.getItem(
        "http://localhost:5000/departments",
        employee.department_id
      );
      return { ...employee, department_name: departmentName?.data?.name };
    });

    const employeesWithDepartmentNames = await Promise.all(newdata);
    setEmployees(employeesWithDepartmentNames);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleSearch = () => {
    const results = employees.filter(
      (employee) =>
        employee.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

    console.log(results);
    navigate(`/search-results?q=${searchTerm}`, { state: { results } });
  };

  return (
    <div>
      <h1>Employees</h1>

      <input
        type="text"
        placeholder="Search by first name, last name, or department"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <table border={"1"}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Work Year</th>
            <th>Department </th>
            <th>Shifts</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <Employee data={employee} key={employee.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

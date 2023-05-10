import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Employee from "../Components/Employee";

export default function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state.results;

  return (
    <div>
      <h1>Search Results</h1>
      {results.length > 0 ? (
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
            {results.map((employee) => (
              <Employee data={employee} key={employee.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found</p>
      )}
      <button onClick={() => navigate("/employees")}>Back</button>
    </div>
  );
}

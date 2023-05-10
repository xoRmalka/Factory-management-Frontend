import React from "react";
import { useState, useEffect } from "react";

export default function shift(props) {
  const [shift, setShift] = useState(props.data);

  return (
    <tr key={shift.id}>
      <td>{shift.id}</td>
      <td>{shift.date}</td>
      <td>
        {shift.start_time}-{shift.end_time}
      </td>
      <td>
        <ul>
          {shift.empsinshift.map((emp) => (
            <li key={emp.employee_id}>
              <a
                href={`http://localhost:5173/edit_employee/${emp.employee_id}`}
              >{`${emp.first_name} ${emp.last_name}`}</a>
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

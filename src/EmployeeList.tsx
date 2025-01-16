import { useState } from "react";

type Employee = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  id: string;
  createdAt: string;
  lastModifiedAt: string;
};

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null); // Reset error state before a new fetch.
    try {
      const response = await fetch("https://localhost:7231/api/Employee");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Employee[] = await response.json();
      setEmployees(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Employee List</h1>
      <button onClick={fetchEmployees}>Fetch Employees</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && employees.length > 0 && (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <h2>
                {employee.firstName} {employee.lastName}
              </h2>
              <p>Email: {employee.email}</p>
              <p>Phone: {employee.phoneNumber}</p>
              <p>
                Birthday: {new Date(employee.birthday).toLocaleDateString()}
              </p>
              <p>Created At: {new Date(employee.createdAt).toLocaleString()}</p>
              <p>
                Last Modified At:{" "}
                {new Date(employee.lastModifiedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && employees.length === 0 && (
        <p>No employees to display. Click the button to fetch data.</p>
      )}
    </div>
  );
}

export default EmployeeList;

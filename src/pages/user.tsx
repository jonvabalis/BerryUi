import { useGetByIdEmployee } from "../api/employees/useGetByIdEmployee";

export default function user() {
  const { data, isLoading } = useGetByIdEmployee(
    "D7F36CEF-860F-4533-A3FA-057AB79F7354"
  );

  if (!data) {
    return <div>No employee data is available</div>;
  }

  return (
    <>
      <h1>Employee</h1>

      {isLoading
        ? "Data is being fetched"
        : !isLoading && (
            <div>
              <h2>
                {data.firstName} {data.lastName}
              </h2>
              <p>Email: {data.email}</p>
              <p>Phone: {data.phoneNumber}</p>
              <p>Birthday: {new Date(data.birthday).toLocaleDateString()}</p>
              <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
              <p>
                Last Modified At:{" "}
                {new Date(data.lastModifiedAt).toLocaleString()}
              </p>
            </div>
          )}
    </>
  );
}

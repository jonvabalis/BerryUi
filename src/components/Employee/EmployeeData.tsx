import { Box, Container, Paper, Typography } from "@mui/material";
import type { EmployeeData } from "../../api/employees/useGetByIdEmployee";

export default function EmployeeData(data: EmployeeData) {
  return (
    <Container sx={{ display: "flex" }}>
      <Typography
        variant="h1"
        sx={{ my: 4, textAlign: "center", color: "primary.main" }}
      >
        Employee overview
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Paper elevation={3}>
          <Box sx={{ m: 3, "& .MuiTypography-root": { mt: 2 } }}>
            <Typography>
              {data.firstName} {data.lastName}
            </Typography>
            <Typography>Email: {data.email}</Typography>
            <Typography>Phone: {data.phoneNumber}</Typography>
            <Typography>
              Birthday: {new Date(data.birthday).toLocaleDateString()}
            </Typography>
            <Typography>
              Created At: {new Date(data.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              Last Modified At: {new Date(data.lastModifiedAt).toLocaleString()}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

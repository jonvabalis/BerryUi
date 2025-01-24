import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import type { EmployeeData } from "../../api/employees/useGetByIdEmployee";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function EmployeeData(data: EmployeeData) {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="100px"
      gap="10px"
    >
      <Box
        gridColumn="span 12"
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Typography
          variant="h1"
          sx={{ my: 4, textAlign: "center", color: "primary.contrastText" }}
        >
          Employee overview
        </Typography>
      </Box>
      <Box
        gridColumn="span 4"
        gridRow="span 2"
        display="flex"
        justifyContent="space-between"
      >
        <AccountCircleIcon
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: "250px",
            maxHeight: "250px",
            color: "primary.contrastText",
          }}
        />
      </Box>
      <Box
        gridColumn="span 8"
        gridRow="span 2"
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <TableContainer
            component={Paper}
            sx={{
              bgcolor: "transparent",
              boxShadow: "none",
              width: "100%",
            }}
          >
            <Table>
              <TableBody>
                {[
                  {
                    label: "Name:",
                    value: `${data.firstName} ${data.lastName}`,
                  },
                  { label: "Email:", value: data.email },
                  { label: "Phone:", value: data.phoneNumber },
                  {
                    label: "Birthday:",
                    value: new Date(data.birthday).toLocaleDateString(),
                  },
                  {
                    label: "Created At:",
                    value: new Date(data.createdAt).toLocaleString(),
                  },
                  {
                    label: "Last Modified At:",
                    value: new Date(data.lastModifiedAt).toLocaleString(),
                  },
                ].map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="right"
                      sx={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        fontWeight: "bold",
                        color: "primary.contrastText",
                      }}
                    >
                      {row.label}
                    </TableCell>
                    <TableCell
                      sx={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        color: "primary.contrastText",
                      }}
                    >
                      {row.value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}

import {
  Box,
  Fade,
  Grid2,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import type { EmployeeData } from "../../api/employees/useGetByIdEmployee";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function EmployeeBox({ data }: { data: EmployeeData }) {
  return (
    <Box sx={{ width: "100%", maxWidth: "1000px", mx: "auto" }}>
      <Fade in={true} timeout={500}>
        <Paper
          elevation={5}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "white",
          }}
        >
          <Grid2
            container
            spacing={4}
            size={12}
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Grid2 container spacing={1} size={5}>
              <AccountCircleIcon
                sx={{
                  width: "100%",
                  height: "100%",

                  color: "secondary.main",
                }}
              />
            </Grid2>
            <Grid2 container spacing={1} size={7}>
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
                      <TableRow
                        key={index}
                        sx={(theme) => ({
                          "& .MuiTableCell-root": {
                            borderBottom: `2px solid ${theme.palette.primary.main}`,
                          },
                        })}
                      >
                        <TableCell
                          align="right"
                          sx={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                            fontWeight: "bold",
                          }}
                        >
                          {row.label}
                        </TableCell>
                        <TableCell
                          sx={{
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                          }}
                        >
                          {row.value}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid2>
          </Grid2>
        </Paper>
      </Fade>
    </Box>
  );
}

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Box from "@mui/material/Box/Box";
import IconButton from "@mui/material/IconButton/IconButton";
import Typography from "@mui/material/Typography/Typography";

interface ViewTablesToggleProps {
  handleViewTableChange: () => void;
  isTableOpen: boolean;
}

export default function ViewTablesToggle({
  handleViewTableChange,
  isTableOpen,
}: ViewTablesToggleProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          width: "100%",
          maxWidth: "400px",
          padding: "8px",
          borderRadius: "8px",
          border: "2px solid rgb(211, 211, 211)",
          "&:hover": { backgroundColor: "#f9f9f9" },
        }}
        onClick={handleViewTableChange}
      >
        <Typography variant="h6" sx={{ ml: 2 }}>
          View tables
        </Typography>
        <IconButton size="small" color="primary">
          {isTableOpen ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>
    </Box>
  );
}

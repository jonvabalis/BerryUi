import { Box } from "@mui/material";
import { ReactNode } from "react";

interface GridContainerProps {
  children: ReactNode;
  span: number;
  gap?: number;
  justifyContent?: string;
}

export const GridContainer = ({
  children,
  span,
  gap = 2,
  justifyContent = "flex-start",
}: GridContainerProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={gap}
      justifyContent={justifyContent}
      gridColumn={`span ${span}`}
    >
      {children}
    </Box>
  );
};

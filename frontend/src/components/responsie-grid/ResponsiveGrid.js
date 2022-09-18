import { Box, Grid } from "@mui/material";
import React from "react";

export default function ResponsiveGrid({ children }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 8, lg: 12 }}
        alignItems="stretch"
        justifyContent="center"
      >
        {children}
      </Grid>
    </Box>
  );
}

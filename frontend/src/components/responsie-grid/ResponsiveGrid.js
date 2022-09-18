import {Box, Grid } from '@mui/material'
import React from 'react'

export default function ResponsiveGrid({children}) {
  return (
<Box sx={{ flexGrow: 1 }}>
<Grid
  container
  spacing={{ xs: 2, md: 3 }}
  columns={{ xs: 4, sm: 8, md: 12 }}
  alignItems="stretch"
>

   {children}
</Grid>
</Box>
  )
}




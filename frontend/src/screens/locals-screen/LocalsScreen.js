import { Container, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react';
const ourLocal = require(`./../../assets/our-local.jpg`)

const LocalsScreen = () => {
  return (


    <Container maxWidth="xs" sx={{ mt: 5 }}>
    <Stack flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Our location
      </Typography>
      <Typography variant="body1" gutterBottom color="primary">
        You can find us at Vasagatan 13, Isafjordur. We are waiting for you between 10am and 23pm. Come and try our delicious food :)!
      </Typography>
      <Box
        component="img"
        src={ourLocal}
        alt="Kebabomb Local"
        sx={{m:3}}
      ></Box>
    </Stack>
  </Container>


  )
}

export default LocalsScreen

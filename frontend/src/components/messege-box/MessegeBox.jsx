import { Alert } from '@mui/material';
import React from 'react'
import { MdError } from "react-icons/md";

export default function MessegeBox({children}) {
  return (

    <Alert severity="error">{children}</Alert>

  )        
}

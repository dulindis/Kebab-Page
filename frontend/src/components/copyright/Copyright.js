import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export default function Copyright() {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"Copyright © "}
      <Link coponent={RouterLink} color="primary" href="/">
        <strong>KebaBomb</strong>
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

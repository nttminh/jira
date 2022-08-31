import { Box, CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";

interface Props {
  color?:
    | "inherit"
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning";
  size?: number;
}

export default function LoadingScreen({ color = "primary", size = 40 }: Props) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <CircularProgress color={color} size={size} />
    </Box>
  );
}

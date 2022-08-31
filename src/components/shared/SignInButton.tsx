import { Button, CircularProgress } from "@mui/material";
import React from "react";
const SpinnerAdornment = () => (
  <CircularProgress className="mr-4" color="inherit" size={20} />
);
const SignInButton = (props: any) => {
  const { children, loading, ...rest } = props;
  return (
    <Button {...rest}>
      {loading && <SpinnerAdornment {...rest} />}
      {children}
    </Button>
  );
};
export default SignInButton;

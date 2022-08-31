import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import * as yup from "yup";
import React, { ReactNode, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActionType } from "../../../../pages/signin";
import SignInButton from "../../../shared/SignInButton";
import { toast } from "react-toastify";
import { delay } from "../../../../helpers/delay";

type Props = {
  setPageType: React.Dispatch<React.SetStateAction<ActionType>>;
};

const ForgotPasswordForm = ({ setPageType }: Props) => {
  const schema = yup
    .object({
      Email: yup.string().email().required(),
    })
    .required();
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setIsDone(true);

    await delay(2000);
    setIsLoading(false);
    toast.success(
      "Request password reset successfully. Please check your email"
    );
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", width: "100%" }}
    >
      <Typography align="center" className="font-bold">
        Reset your password
      </Typography>
      <Controller
        name="Email"
        defaultValue=""
        control={control}
        render={({ field }) => (
          <TextField
            error={!!errors?.Email}
            label="Email"
            helperText={errors?.Email?.message as ReactNode}
            type="email"
            autoComplete="email"
            fullWidth
            required
            margin="normal"
            {...field}
          />
        )}
      />

      <SignInButton
        type="submit"
        variant="contained"
        fullWidth
        loading={isLoading}
        disabled={isDone}
      >
        Send reset link
      </SignInButton>
      <Link
        className="mt-3 cursor-pointer"
        onClick={() => setPageType(ActionType.SIGN_IN)}
      >
        Back to Sign in
      </Link>
    </Box>
  );
};

export default ForgotPasswordForm;

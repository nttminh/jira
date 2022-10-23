import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ReactNode, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useAuth } from '../../../../context/auth/auth.context';
import { ActionType } from '../../../../pages/signin';
import userAPI from '../../../../services/userAPI';
import LoadingScreen from '../../../shared/LoadingScreen';

interface Props {
  setPageType: React.Dispatch<React.SetStateAction<ActionType>>;
}

export default function SignUpForm({ setPageType }: Props) {
  const schema = yup
    .object({
      Name: yup.string().required(),
      PhoneNumber: yup
        .string()
        .required()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits'),
      Email: yup.string().email().required(),
      Password: yup.string().required(),
      ConfirmedPassword: yup
        .string()
        .oneOf([yup.ref('Password'), null], 'Password is not the same'),
    })
    .required();

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const { authDispatch } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSignIn = async (data: any) => {
    setLoading(true);
    // const res = await getAuthClient().login(data);
    // if (res?.data?.message === 'OK') {
    // 	authDispatch({
    // 		type: 'LOGIN',
    // 		payload: res.data.data,
    // 	});
    // 	setLoading(false);
    // 	window.location.reload();
    // 	return;
    // }
    // toast.error(
    // 	res?.data?.message
    // 		? `Có lỗi xảy ra: ${res.data.message}`
    // 		: 'Email hoặc mật khẩu không đúng!'
    // );
    setLoading(false);
  };

  const handleSignUp = async (data: any) => {
    const { Name, PhoneNumber, Email, Password } = data;
    setLoading(true);
    try {
      const data = await userAPI.register({
        email: Email,
        name: Name,
        passWord: Password,
        phoneNumber: PhoneNumber,
      });
      if (data.statusCode === 200) {
        const { email, passWord: password } = data.content;
        const user = await userAPI.signIn({
          email,
          passWord: password,
        });
        authDispatch({
          type: 'UPDATE_USER',
          payload: { ...user.content, passWord: password },
        });
        authDispatch({
          type: 'STORE_TOKEN',
          payload: user.content.accessToken,
        });
        return;
      }
      if (data.statusCode === 400) {
        toast.error(
          data?.message
            ? `Có lỗi xảy ra: ${data.message}`
            : 'Email đã được đăng kí!'
        );
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit((data) => handleSignUp(data))}
    >
      {loading && <LoadingScreen />}
      <Typography align="center" className="font-bold">
        Create your account
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Controller
          name="Name"
          defaultValue=""
          control={control}
          render={({ field }: any) => (
            <TextField
              error={!!errors?.Name}
              label="Full name"
              helperText={errors?.Name?.message as ReactNode}
              variant="standard"
              type="text"
              fullWidth
              sx={{ mb: 2 }}
              {...field}
            />
          )}
        />
        <Controller
          name="PhoneNumber"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors?.PhoneNumber}
              label="Phone Number"
              helperText={errors?.PhoneNumber?.message as ReactNode}
              variant="standard"
              type="text"
              fullWidth
              inputProps={{ maxLength: 10 }}
              sx={{ mb: 2 }}
              {...field}
            />
          )}
        />
        <Controller
          name="Email"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors?.Email}
              label="Email"
              helperText={errors?.Email?.message as ReactNode}
              variant="standard"
              type="email"
              fullWidth
              sx={{ mb: 2 }}
              {...field}
            />
          )}
        />

        <Controller
          name="Password"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors?.Password}
              label="Password"
              helperText={errors?.Password?.message as ReactNode}
              variant="standard"
              type="password"
              autoComplete="current-password"
              fullWidth
              sx={{ mb: 2 }}
              {...field}
            />
          )}
        />
        <Controller
          name="ConfirmedPassword"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              error={!!errors?.ConfirmedPassword}
              label="Confirm password"
              helperText={errors?.ConfirmedPassword?.message as ReactNode}
              fullWidth
              variant="standard"
              type="password"
              autoComplete="confirm-current-password"
              {...field}
            />
          )}
        />
      </Box>
      <Box mb={2} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          className="btnPrimary"
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
        >
          Register
        </Button>
      </Box>
      <Link
        className="cursor-pointer"
        onClick={() => setPageType(ActionType.SIGN_IN)}
      >
        Already had an account? Sign In
      </Link>
    </Box>
  );
}

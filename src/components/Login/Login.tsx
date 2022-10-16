import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { PATHS } from '../../staticData/routes';
import * as sx from './styles';
import { useAuthContext } from '../../contexts/AuthContext';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuthContext();
  const history = useHistory();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await login(email, password);

      history.push(PATHS.calendar);
    } catch (error: any) {
      if ([401, 403].includes(error?.response?.status)) {
        setErrorMessage('The provided credentails are invalid.');
      } else {
        setErrorMessage('Internal error occurred. Please try again later.');
      }
      setHasLoginFailed(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={sx.paper}>
        <Avatar sx={sx.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Box component="form" sx={sx.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
            error={hasLoginFailed}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
            error={hasLoginFailed}
          />
          <Button type="submit" fullWidth variant="contained" color="primary" sx={sx.submit}>
            Log In
          </Button>
        </Box>
      </Box>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {`Copyright © Booking System ${new Date().getFullYear()}.`}
        </Typography>
      </Box>
    </Container>
  );
}

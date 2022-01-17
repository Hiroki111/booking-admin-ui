import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { ROUTES } from '../../routes';
import restApi from '../../network/restApi';
import { useStyles } from './useStyles';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const classes = useStyles();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await restApi.authenticate(email, password);
      history.push(ROUTES.calendar);
    } catch (error: any) {
      if ([401, 404].includes(error?.response?.status)) {
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
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit}>
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
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Log In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {`Copyright © Booking System ${new Date().getFullYear()}.`}
        </Typography>
      </Box>
    </Container>
  );
}

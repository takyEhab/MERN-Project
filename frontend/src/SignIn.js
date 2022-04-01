import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from './App';

import { useSnackbar } from 'notistack';
// import { useDispatch } from 'react-redux';
// import { logIn } from './store/actions';

const theme = createTheme();

export default function SignIn() {
  const { setProfile } = useContext(UserContext)

  const [error, setError] = React.useState({
    message: '',
    close: false,
    isError: false
  })

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      // let res = await api.post('login/', { username, password });
      // let res = ''
      // const config = { headers: { Authorization: `Token ${res.data.token}` } }
      // localStorage.setItem('CONFIG', JSON.stringify(config))
      // dispatch(logIn(res.data.user, config));

      let res = await axios.post('http://localhost:8000/user/login', { username, password });
      console.log(res.data)
      setProfile(res.data.user)
      localStorage.setItem('token', res.data.token)
      enqueueSnackbar('you are logged in successfully!', { variant: 'success' });
      navigate('/home');
    } catch (err) {
      // if (err.response) {
      // setError({ close: false, isError: true, message: err.response.data['non_field_errors'][0] })
      // console.log(err.response)
      setError({ close: false, isError: true, message: err.response.data })

      // }
    }
  }

  const handleSubmit = (event) => {
    setError({ isError: false, message: '', close: true });
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    login(data.get('username'), data.get('password'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Slide direction="up" in={error.isError} mountOnEnter unmountOnExit>
              <Alert severity="error">{error.message}</Alert>
            </Slide>

            <Button
              disabled={error.close}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent="flex-end">

              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

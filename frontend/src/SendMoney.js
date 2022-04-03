import React, { useState, useContext } from 'react'
import { TextField, Button } from '@mui/material';
import NumberFormat from 'react-number-format';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { UserContext } from './App';
import { useSnackbar } from 'notistack';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
});

const SendMoney = () => {
  const [values, setValues] = useState({ name: '', cash: '' })
  const { setProfile } = useContext(UserContext)
  const { enqueueSnackbar } = useSnackbar();

  const [error, setError] = React.useState({
    message: '',
    close: false,
    isError: false
  })
  const sendMony = async (name, cash) => {
    try {
      let res = await axios.post(`http://localhost:8000/money/send/${name}?amount=${cash}`, {},
        { headers: { 'x-access-token': localStorage.getItem('token') } });
      setProfile(res.data.me)
      // console.log(res.data.me.notifications.at(-1))
      enqueueSnackbar(res.data.me.notifications.at(-1).message, { variant: 'info' });

      setError(prev => ({ ...prev.error, close: false }));
    } catch (err) {
      // console.error(error.response.data)
      setError({ close: false, isError: true, message: err.response.data.message })

    }
  }
  const handleSubmit = (event) => {
    setError({ isError: false, message: '', close: true });

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const name = data.get('name')
    // parseFloat(str.replaceAll(',', ''));

    const cash = data.get('cash').replace(/\$|,/g, '')
    console.log(name)
    console.log(cash)
    sendMony(name, cash)
  }
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <form
      style={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}

      onSubmit={handleSubmit}
      autoComplete="off"
    >

      <TextField
        id="outlined-name"
        label="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        inputProps={{
          autoComplete: 'off'
        }}
        required
      />
      <TextField
        label="Cash"
        value={values.cash}
        onChange={handleChange}
        name="cash"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
          autoComplete: 'off'

        }}
        required
        // variant="standard"
        sx={{ margin: 1.5 }}
      />

      <Slide direction="up" in={error.isError} mountOnEnter unmountOnExit>
        <Alert severity="error">{error.message}</Alert>
      </Slide>
      <Button
        disabled={error.close}
        type="submit" variant="contained">Send</Button>

    </form>
  )
}

export default SendMoney;
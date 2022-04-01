import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';
import NumberFormat from 'react-number-format';
import axios from 'axios';

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

  const sendMony = async (name, cash) => {
    try {
      let res = await axios.post(`http://localhost:8000/money/send/${name}?amount=${cash}`,{},
        { headers: { 'x-access-token': localStorage.getItem('token') }}
      );
      console.log(res.data)
    } catch (error) {
      console.error(error.response.data)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const name = data.get('name')
    const cash = data.get('cash').slice(1)
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
      <Button type="submit" variant="contained">Send</Button>

    </form>
  )
}

export default SendMoney;
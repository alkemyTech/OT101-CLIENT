import React from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

export default function Register() {
  return (
    <div>
      <h2>Register</h2>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& > :not(style)': { m: 1 },
        }}
      >
        <TextField
          helperText="Please enter your name"
          id="demo-helper-text-aligned"
          label="Name"
        />
        <TextField
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label="Name"
        />
      </Box>
    </div>
  )
}

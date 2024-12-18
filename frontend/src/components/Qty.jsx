import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Qty({qty, values, handleChange}) {
  

  return (
    <FormControl sx={{ my:1, minWidth: 80 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={qty}
        placeholder=''
        onChange={handleChange}
      >
        
        {[...Array(values).keys()].map(v => <MenuItem key={v} value={v + 1}>{v + 1}</MenuItem>)}
        
      </Select>
    </FormControl>
  )
}

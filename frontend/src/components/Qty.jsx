import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Qty({qty, values, handleChange}) {
  

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Qty</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={qty}
        label="Qty"
        onChange={handleChange}
      >
        
        {[...Array(values).keys()].map(v => <MenuItem key={v} value={v + 1}>{v + 1}</MenuItem>)}
        
      </Select>
    </FormControl>
  )
}

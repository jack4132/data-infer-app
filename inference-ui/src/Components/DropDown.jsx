import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  selectedValue,
  values,
  handleChange,
  index,
  dataConversion,
  originalVal,
  getKey,
}) {
  console.log(originalVal);
  return (
    <Box sx={{minWidth: 120}}>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Data Type</InputLabel> */}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label=""
          onChange={e => handleChange(e, index)}
        >
          {Object.values(values).map(val => (
            <MenuItem
              value={val}
              key={val}
              disabled={!dataConversion[originalVal][getKey(val)]}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

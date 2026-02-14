import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `$${value}`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([100, 300]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        min={0}
        max={500}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        sx={{
          color:"#878A92",
          height: 4,
          '& .MuiSlider-thumb': {
            width: 16,
            height: 16,
            backgroundColor:"#0E1422"
          },
          '& .MuiSlider-valueLabel': {
              backgroundColor:"#0E1422"
          },
          '& .MuiSlider-rail': {
            opacity: 1,
            backgroundColor:"#E6E7E8"
          },
          '& .MuiSlider-track': {
              backgroundColor:"#878A92",
              border:"none"
          }
        }}
      />
    </Box>
  );
}

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useFilterStore } from '../../../store';

function valuetext(value) {
  return `${value} EGP`;
}

export default function RangeSlider() {

  const { priceRange, setPriceRange } = useFilterStore();

  const handleChange = (event, newValue) => {
    setPriceRange(newValue)
  };

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={priceRange}
        onChange={handleChange}
        min={600}
        max={3000}
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
      <div className="flex justify-between mt-2 text-sm text-gray-500 font-medium">
        <span>Price: {priceRange[0]} EGP — {priceRange[1]} EGP</span>
      </div>
    </Box>
  );
}

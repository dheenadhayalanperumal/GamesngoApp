import { Box, Typography } from '@mui/material';
import CoinBox from './CoinBox';


const DailyCheckin: React.FC = () => {
    const days = [1, 2, 3, 4, 5, 6, 7];
    return (
        <Box sx={{display:'flex',flexDirection:'column',gap:'20px'}}>
             <Typography variant='h6' color='black'>Daily Check In</Typography>
       <Box sx={{display:'flex', flexWrap: 'wrap',justifyItems:'flex-start',gap:'6px' }}>
       {days.map((day, index) => (
           <Box key={index}sx={{display:'flex',flexDirection:'column',justifyItems:'center', gap:'10px'}}> {/* Added a parent Box element */}
                <CoinBox coinCount={day * 5} /> 
                <Typography variant='body2' color='black' sx={{
  fontWeight: 'bold',
    fontSize: '12px',
    textAlign: 'center',
  }}
  >Day {index+1}</Typography>
           </Box>
       ))}
       </Box>
       </Box>
    );
};

export default DailyCheckin;



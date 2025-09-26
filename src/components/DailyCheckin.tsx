import { Box, Typography } from '@mui/material';
import CoinBox from './CoinBox';


const DailyCheckin: React.FC = () => {
    const days = [1, 2, 3, 4, 5, 6, 7];
    return (
       <Box sx={{display:'flex', flexDirection:'row', gap:'6%', alignItems:'start', justifyItems:'center'}}>
       {days.map((day, index) => (
           <Box key={index}> {/* Added a parent Box element */}
                <CoinBox coinCount={day * 5} /> 
                <Typography>day {index}</Typography>
           </Box>
       ))}
       </Box>
    );
};

export default DailyCheckin;

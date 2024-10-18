import NoProfileCard from "./Cards/NoProfileCard";
import {Box} from '@mui/material'
import './Styles/ProfileForm.css'
function NotFound() {
  return (
    <Box className='root'>
      <NoProfileCard value={false}/>
    </Box>
  );
}

export default NotFound;

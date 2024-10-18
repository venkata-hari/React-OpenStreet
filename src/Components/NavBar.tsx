import { Avatar,Chip,Typography,Box,Toolbar,AppBar } from '@mui/material';
import { useProfile } from '../ContextApi/GobalState';
import {LocalStorage,Api} from './Assets/index'
import { deepPurple } from '@mui/material/colors';
export default function NavBar() {
const {profileData,display}=useProfile()
const userid = localStorage.getItem('userid');
const profiledata = localStorage.getItem('profileData');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Avatar sx={{height: '30px', width: '30px',marginRight:'8px', bgcolor: deepPurple[500] }}>
                    {profileData?.name?.charAt(0)}
                </Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>       
              {profileData?.name}
          </Typography>
         {(userid || profiledata )&&<Chip 
         avatar={<Avatar src={display?LocalStorage:Api} />}
         label={display ? "LocalStorage Data" : "Api Data"} sx={{
          background:'white',
          whiteSpace: 'nowrap' 
          }} />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

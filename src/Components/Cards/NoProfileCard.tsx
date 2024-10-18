import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import {Card,Box} from '@mui/material';
import Chip from '@mui/material/Chip';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../ContextApi/GobalState';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import './Styles.css'
type IProps={
  value:boolean
}
export default function NoProfileCard({value}:IProps) {
    const { setMessage} = useProfile();
    const navigate = useNavigate();
    const handleNavigate = () => {
        setMessage({ name: '', email: '', age: '' });
        navigate('/profile-form');
    };
  return (
    <Card
      variant="outlined"
      
      sx={{
        width: 320,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <Box className='rootcontainer'>
      <Box className='card_RightImage'>
      {value?<NoAccountsIcon sx={{fontSize:'90px'}}/>:<SentimentVeryDissatisfiedIcon sx={{fontSize:'90px'}}/>}
      </Box>
      <CardContent>
        <Typography level="title-lg" id="card-description">
        {value?"No user profile found" :"404 - Page Not Found"}
        </Typography>
        <Typography
          level="body-sm"
          aria-describedby="card-description"
          sx={{ mb: 1 }}
        >
          <span style={{fontSize:'13px'}}>
          {value?"Please create a new one":"Sorry, the page you're looking for doesn't exist"}
          </span>
        </Typography>
      <Chip
         label={value?"Create":"Go Back"}
          variant="outlined"
     
          size="small"
          sx={{width:'50%'}}
          onClick={handleNavigate}
        />
          
      </CardContent>
      </Box>
    </Card>
  );
}

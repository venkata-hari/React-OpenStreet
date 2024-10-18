import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { useProfile } from '../../ContextApi/GobalState';
import { Avatar} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { deepOrange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import {Box} from '@mui/material'
export default function CardCard() {
  const { profileData,display, setMessage,setOpen} = useProfile();
  const userid = localStorage.getItem('userid');
const profiledata = localStorage.getItem('profileData');
  const navigate=useNavigate()
  const handleEdit = () => {
    setMessage({ name: '', email: '', age: '' });
    navigate('/profile-form');
};
const handleDelete = () => {
  setOpen(true);
};
  return (
    <Card
      data-resizable
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        width: 343,
        overflow: 'auto',
        resize: 'horizontal',
        '--icon-size': '100px',
      }}
    >
      <CardOverflow variant="solid" color="warning">
        <AspectRatio
          variant="outlined"
          color="warning"
          ratio="1"
          sx={{
            m: 'auto',
            transform: 'translateY(50%)',
            borderRadius: '50%',
            width: 'var(--icon-size)',
            boxShadow: 'sm',
            bgcolor: 'background.surface',
            position: 'relative',
          }}
        >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  <Typography sx={{fontSize:'45px',color:'white'}}>{profileData?.name?.charAt(0)}</Typography>
                </Avatar>
        </AspectRatio>
      </CardOverflow>
      <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
        🎊 {profileData?.name} 🎊
      </Typography>
      <CardContent sx={{ fontSize:'15px' }}>
       <Box sx={{display:'flex',flexDirection:'column'}}>
       <span><strong>Email:</strong> {profileData?.email}</span>
       {profileData?.age&&<span><strong>Age:</strong>{profileData?.age}</span>} 
        </Box> 

      </CardContent>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          '--Button-radius': '40px',
          width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
        }}
      >
        <Button variant="solid" color="warning" onClick={handleEdit}>
          Update
        </Button>
        {(userid || profiledata )&& <Button variant="plain" onClick={handleDelete} color="neutral">
        Delete
        </Button>}
      </CardActions>
    </Card>
  );
}

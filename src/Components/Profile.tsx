import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { Avatar, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { Box } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import './Cards/Styles.css';
import { useEffect } from 'react';

export default function CardCard() {
  const userid = localStorage.getItem('userid') || 'No ID';
  const username = localStorage.getItem('username') || 'Guest';
  const navigate = useNavigate();
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem('latitude', latitude.toString());
          localStorage.setItem('longitude', longitude.toString());
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    }
  }, []);
  const handleNavigate = () => {
    navigate('/map');
  };

  return (
    <Fragment>
      <NavBar />
      <Box className="rootcontainer">
        <Card
          data-resizable
          sx={{
            textAlign: 'center',
            alignItems: 'center',
            width: { lg: 343, xs: 300, md: 300 },
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
                <Typography sx={{ fontSize: '45px', color: 'white' }}>
                  {username.charAt(0).toUpperCase()}
                </Typography>
              </Avatar>
            </AspectRatio>
          </CardOverflow>
          <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
            🎊 UserName: {username} 🎊
          </Typography>
          <CardContent sx={{ fontSize: '15px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography>User ID: {userid}</Typography>
            </Box>
          </CardContent>
          <CardActions
            orientation="vertical"
            buttonFlex={1}
            sx={{
              '--Button-radius': '40px',
              width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Button
              onClick={handleNavigate}
              variant="contained"
              color="primary"
              sx={{
                textTransform: 'capitalize',
                borderRadius: '25px',
                fontWeight: 'bold',
                padding: '10px 20px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#0056b3',
                  transform: 'scale(1.05)',
                },
              }}
            >
              View Map
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Fragment>
  );
}

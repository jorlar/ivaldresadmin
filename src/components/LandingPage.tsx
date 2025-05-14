import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HikingIcon from '@mui/icons-material/Hiking';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HotelIcon from '@mui/icons-material/Hotel';
import EventIcon from '@mui/icons-material/Event';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <HikingIcon sx={{ fontSize: 40 }} />,
      title: 'Activities',
      description: 'Discover exciting outdoor activities and adventures in Valdres.',
    },
    {
      icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
      title: 'Restaurants',
      description: 'Find the best local restaurants and dining experiences.',
    },
    {
      icon: <HotelIcon sx={{ fontSize: 40 }} />,
      title: 'Hotels',
      description: 'Book comfortable accommodations for your stay in Valdres.',
    },
    {
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      title: 'Events',
      description: 'Stay updated with local events and cultural happenings.',
    },
    {
      icon: <ShoppingBagIcon sx={{ fontSize: 40 }} />,
      title: 'Shopping',
      description: 'Explore local shops and find unique souvenirs.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
          height: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Typography
            component="h1"
            variant="h2"
            color="inherit"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Welcome to Valdres
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Discover the beauty of Valdres through our comprehensive guide to activities,
            accommodations, dining, and more.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Admin Login
          </Button>
        </Container>
      </Paper>

      {/* App Showcase Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              The Valdres App
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Your complete guide to exploring Valdres
            </Typography>
            <Typography paragraph>
              The Valdres App is your ultimate companion for discovering everything this beautiful region has to offer. 
              Whether you're planning your next adventure or looking for local experiences, our app has you covered.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <HikingIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Easy-to-use interface</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <RestaurantIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Real-time updates</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HotelIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Offline access</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EventIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Detailed information</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ShoppingBagIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Local recommendations</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HikingIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Interactive maps</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Card
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  transform: 'rotate(-3deg)',
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="500"
                  image="https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="App screenshot 1"
                />
              </Card>
              <Card
                sx={{
                  position: 'absolute',
                  top: '20%',
                  right: '-10%',
                  zIndex: 2,
                  transform: 'rotate(3deg)',
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="400"
                  image="https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="App screenshot 2"
                />
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Explore Valdres
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                About Valdres
              </Typography>
              <Typography paragraph>
                Valdres is a traditional district in central, southern Norway, consisting of the
                municipalities Nord-Aurdal, Sør-Aurdal, Øystre Slidre, Vestre Slidre, Vang, and
                Etnedal. The region is known for its stunning natural beauty, rich cultural heritage,
                and outdoor activities.
              </Typography>
              <Typography paragraph>
                Our app helps visitors and locals alike discover the best that Valdres has to offer,
                from hiking trails and ski slopes to local restaurants and cultural events.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="400"
                  image="https://plus.unsplash.com/premium_photo-1673697239981-389164b7b87f?q=80&w=2044&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Valdres landscape"
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage; 
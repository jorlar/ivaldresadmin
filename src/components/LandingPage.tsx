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
      title: 'Aktiviteter',
      description: 'Oppdag utfordrende utendørs aktiviteter i Valdres.',
    },
    {
      icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
      title: 'Restauranter og cafeer',
      description: 'Finn de beste lokale restauranter og gode opplevelsene.',
    },
    {
      icon: <HotelIcon sx={{ fontSize: 40 }} />,
      title: 'Hoteller',
      description: 'Book ditt hotellopphold for din neste tur til Valdres.',
    },
    {
      icon: <EventIcon sx={{ fontSize: 40 }} />,
      title: 'Eventer og arrangementer',
      description: 'Hold deg oppdatert med lokale begivenheter og kulturelle aktiviteter.',
    },
    {
      icon: <ShoppingBagIcon sx={{ fontSize: 40 }} />,
      title: 'Butikker og bedrifter',
      description: 'Utforsk lokale butikker og finn unike gaver.',
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
            Velkommen til Valdres
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Oppdag ville vakre Valdres gjennom vår app. 
            Her vil du finne all informasjon du trenger for å planlegge ditt besøk i Valdres. Oversikt over aktiviteter, restauranter, hoteller, arrangementer og butikker, mm. <br /> <br></br> Vil du ha din butikk eller arrangement i appen?
          </Typography>
          <Button
            variant="contained"
            size="large"
            component="a"
            href="mailto:hei@tvela.no"
            sx={{
              mt: 4,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Meld interesse
          </Button>
        </Container>
      </Paper>

      {/* App Showcase Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
              Valdres App
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Din komplette guide til å utforske Valdres
            </Typography>
            <Typography paragraph>
              Valdres App er din ultimate guide til å oppdage alt som Valdres har å by på. 
              Uansett om du skal planlegge neste utfordrende tur eller lete etter lokale erfaringer, dekker vår app alt du trenger.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <HikingIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Turforslag</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <RestaurantIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Restauranter og cafeer</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <HotelIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Hotell og overnatting</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EventIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Eventer og arrangementer</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ShoppingBagIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography>Butikker og bedrifter</Typography>
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
          Utforsk Valdres
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
                Om Valdres
              </Typography>
              <Typography paragraph>
                Valdres er et tradisjonelt distrikt i det sentrale, sør-Norge, bestående av
                kommunene Nord-Aurdal, Sør-Aurdal, Øystre Slidre, Vestre Slidre, Vang, og
                Etnedal. Regionen er kjent for sin naturlige skjønnhet, rike kulturarv,
                og utendørs aktiviteter.
              </Typography>
              <Typography paragraph>
                Vår app hjelper besøkende og lokale å oppdage det beste som Valdres har å by på,
                fra hiking og ski til lokale restauranter og kulturelle begivenheter.
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
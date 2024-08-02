import LinearProgress from '@mui/material/CircularProgress';
import { Container } from 'react-bootstrap';

const LoadingScreen = () => {
  
  return (
    <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container 
        style={{ 
          width: '100%',
          maxWidth: '500px',
          display: 'flex',
          flexDirection:'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <LinearProgress style={{  }} color="success" />
        <h1 style={{marginTop: '25px'}}> Fetching Tracks</h1>
      </Container>
    </div>
  );
  }
  
  export default LoadingScreen
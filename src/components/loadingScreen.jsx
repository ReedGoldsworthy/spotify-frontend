import LinearProgress from '@mui/material/CircularProgress';
import { Container } from 'react-bootstrap';

const LoadingScreen = () => {
  
  return (
    <div>
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
  <div style={{ width: '100%', maxWidth: '500px' }}>
    <LinearProgress style={{ }} color="success" />
  </div>
</Container>
    </div>
    
  )
  }
  
  export default LoadingScreen
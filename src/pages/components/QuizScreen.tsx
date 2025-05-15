import React from 'react';
import { Box, Button, Heading, Text } from '@radix-ui/themes';
import { ArrowLeftIcon, ActivityLogIcon, LaptopIcon } from '@radix-ui/react-icons';

const ProgressDemo: React.FC = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      style={{
        position: 'absolute',
        bottom: '0',
        right: '500px',
        width: '1100px',
        height: '60px',
        background: 'rgba(0, 0, 0, 0.09)', 
        borderRadius: '9px',
        transform: 'translateZ(0)',
      }}
    >
      <Box
        style={{
          backgroundColor: 'green', 
          width: `${progress}%`,
          height: '100%',
          transition: 'width 660ms cubic-bezier(0.65, 0, 0.35, 1)', 
        }}
      />
    </Box>
  );
};

const QuizScreen: React.FC = () => {
  return (
    <Box
      style={{
        position: 'fixed',
        top: '0',
        right: '300px',
        width: '500px',
        height: '100vh',
        display: 'flex',
        padding: '20px', 
        boxSizing: 'border-box',
        marginTop:'100px'
      }}
    >
      {/* <Box
        style={{
          position: 'relative',
          width: '100%',
          height: '500px',
          border: '1px solid #ccc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <Button
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            padding: '0',
            backgroundColor: 'transparent',
          }}
        >
          <ArrowLeftIcon width={24} height={24} /> Back
        </Button>

        <Heading size="5" as="h1" style={{ marginBottom: '20px', color: 'black' }}>
          Here is the question
        </Heading>

        <Box
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            padding: '0 20px',
            boxSizing: 'border-box',
            marginLeft: '60px',
          }}
        >
          <Button>
            Primary Button <LaptopIcon />
          </Button>
        </Box>

        <Box
          style={{
            backgroundColor: 'gray',
            padding: '20px',
            borderRadius: '8px',
            width: '80%',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          <Text size="4">Answer 2</Text>
        </Box>
        <Box
          style={{
            backgroundColor: 'gray',
            padding: '15px',
            borderRadius: '8px',
            width: '80%',
            textAlign: 'center',
          }}
        >
        </Box>

        <Box style={{ marginTop: '10px' }}>
          <ActivityLogIcon style={{ width: '100px', height: '100px', color: 'gray' }} />
        </Box>
        <Text style={{ textAlign: 'center', fontSize: '30px', color: 'black' }}>
          X%
        </Text>

      </Box> */}
              <iframe src="http://localhost:4000/"></iframe>

    </Box>
  );
};

export default QuizScreen;

import React, { useState } from 'react';
import {Typography, TextField, Button } from '@mui/material';
import '../index.css';


const Home = () => {
  const [n, setN] = useState('');
  const [k, setK] = useState('');

  const handleGeneratePGM = () => {
    // Handle generate PGM logic
    console.log(`n: ${n}, k: ${k}`);
  };

  

  return (
    <div className='home'>
      <Typography variant="h3" color="textPrimary" sx={{margin: '30px auto'}}>
          REED SOLOMON ENCODER
      </Typography>
      <div className='input'>
        <TextField
          sx={ {marginBottom: '16px'}}
          label="Enter n"
          value={n}
          onChange={(e) => setN(e.target.value)}
          variant="outlined"
          fullWidth
          
          />
        <TextField
          sx={ {marginBottom: '16px'}}
          label="Enter k"
          value={k}
          onChange={(e) => setK(e.target.value)}
          variant="outlined"
          fullWidth
          // style={styles.textField}
          />
        <Button
          sx={ {marginBottom: '8px'}}
          variant="contained"
          color="primary"
          onClick={handleGeneratePGM}
          fullWidth
          >
          Generate PGM
        </Button>
        <Button
          sx={ {marginBottom: '8px'}}
          variant="contained"
          color="primary"
          onClick={handleGeneratePGM}
          fullWidth
        >
          Systematic Encoding
        </Button>
      </div>
      {/* Add the second section here */}
    </div>
  );
};

export default Home;

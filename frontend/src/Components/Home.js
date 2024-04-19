import React, { useRef, useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import '../index.css';
import MatrixGrid from './Matrix';
import { encodeClassical, encodeSystematic, isPrime, parseMessage, pgmGen } from '../Controllers/ReedSolomon';
import ClassicalEncode from './ClassicalEncode';
import SystematicEncode from './SystematicEncode';



const Home = () => {
  const [n, setN] = useState('');
  const [k, setK] = useState('');
  const [alertmsg, setAlertMsg] = useState('');
  const [message, setMessage] = useState('');
  const [classmsg, setClassMsg] = useState(null);
  const [sysmsg, setSysMsg] = useState(null);
  const [pgm, setPgm] = useState(null);
  const [openValid, setOpenValid] = React.useState(false);
  const divRef = [
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  const handleCloseValid = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenValid(false);
  };

  const handleGeneratePGM = () => {
    // Check if n is a valid prime number and k is less than n
    const parsedN = parseInt(n);
    const parsedK = parseInt(k);

    if (isNaN(parsedN) || isNaN(parsedK)) {
      setAlertMsg("N and K must be valid numbers.");
      setOpenValid(true);
      return;
    }

    const isValidN = isPrime(parsedN);
    const isValidK = parsedK < parsedN;

    if (!isValidN) {
      setAlertMsg("N must be prime number.");
      setOpenValid(true);
      return;
    }

    if (!isValidK) {
      setAlertMsg("K must be less than N.");
      setOpenValid(true);
      return;
    }

    setPgm(pgmGen(n, k));
    requestAnimationFrame(() => {
      divRef[0].current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  };

  const handleEncodeClassical = () => {
    if (message !== null && message !== '') {
      const input = parseMessage(message, n, k);
      if (!input) {
        setAlertMsg("Invalid Size or Message Elements.");
        setOpenValid(true);
        return;
      }
      else {
        setClassMsg(encodeClassical(input, pgm, +k));
        requestAnimationFrame(() => {
          divRef[1].current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
      }
    }
    else {
      setAlertMsg("Message should be Non-Empty.");
      setOpenValid(true);
      return;
    }
  }

  const handleEncodeSystematic = () => {
    if (message !== null && message !== '') {
      const input = parseMessage(message, n, k);
      if (!input) {
        setAlertMsg("Invalid Size or Message Elements.");
        setOpenValid(true);
        return;
      }
      else {
        setSysMsg(encodeSystematic(input, +k, +n));
        requestAnimationFrame(() => {
          divRef[2].current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        });
      }
    }
    else {
      setAlertMsg("Message should be Non-Empty.");
      setOpenValid(true);
      return;
    }
  }


  return (
    <>
      <div className='home'>
        <div className="logo">
          REED SOLOMON ENCODER
        </div>

        <div className='input'>
          <TextField
            sx={{ marginBottom: '16px' }}
            label="N"
            value={n}
            onChange={(e) => setN(e.target.value)}
            variant="outlined"
            fullWidth

          />
          <TextField
            sx={{ marginBottom: '8px' }}
            label="K"
            value={k}
            onChange={(e) => setK(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button
            sx={{ marginBottom: '16px' }}
            variant="contained"
            color="primary"
            onClick={handleGeneratePGM}
            fullWidth
          >
            Generate PGM
          </Button>
          <TextField
            sx={{ marginBottom: '8px' }}
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button
            sx={{ marginBottom: '8px' }}
            variant="contained"
            color="primary"
            onClick={handleEncodeClassical}
            fullWidth
            disabled={!pgm}
          >
            Classical Encoding
          </Button>
          <Button
            sx={{ marginBottom: '8px' }}
            variant="contained"
            color="primary"
            onClick={handleEncodeSystematic}
            fullWidth
          >
            Systematic Encoding
          </Button>
        </div>
        {/* Add the second section here */}
      </div>
      <div className="dum" ref={divRef[0]}>
        {pgm && <MatrixGrid  pgmSet={setPgm} pgmMat={pgm} /> }
      </div>
      <div className="dum" ref={divRef[1]}>
        {classmsg &&  <ClassicalEncode msgEncode={classmsg} /> }
      </div>
      <div className="dum" ref={divRef[2]}>
        {sysmsg && <SystematicEncode msgEncode={sysmsg} /> }
      </div>
      {!pgm && !classmsg &&!sysmsg &&<div className="nothing">
        Try out some features.
      </div>}
      <Snackbar open={openValid} autoHideDuration={5000} onClose={handleCloseValid}>
        <Alert onClose={handleCloseValid} severity="error" sx={{ width: '100%' }}>
          {alertmsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;

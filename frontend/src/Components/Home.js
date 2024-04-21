import React, { useRef, useState } from 'react';
import { TextField, Button, Snackbar, Alert, Checkbox, FormControlLabel } from '@mui/material';
import '../index.css';
import MatrixGrid from './Matrix';
import { encodeClassical, encodeSystematic, isPrime, parseEvalP, parseMessage, pgmGen } from '../Controllers/ReedSolomon';
import ClassicalEncode from './ClassicalEncode';
import SystematicEncode from './SystematicEncode';
import About from './About';



const Home = () => {
  const [n, setN] = useState('');
  const [k, setK] = useState('');
  const [evalp, setEvalP] = useState('');
  const [alertmsg, setAlertMsg] = useState('');
  const [message, setMessage] = useState('');
  const [classmsg, setClassMsg] = useState(null);
  const [sysmsg, setSysMsg] = useState(null);
  const [pgm, setPgm] = useState(null);
  const [openValid, setOpenValid] = React.useState(false);
  const [checked, setChecked] = useState(false);
  const divRef = [
    useRef(null),
    useRef(null),
    useRef(null)
  ];


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleCloseValid = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenValid(false);
  };

  const areDg = (str) => {
    return /^[0-9]+$/.test(str);
  }
  const handleGeneratePGM = () => {
    // Check if n is a valid prime number and k is less than n
    if(!areDg(n.trim()) || !areDg(k.trim())) {
      setAlertMsg("N and K must be valid numbers.");
      setOpenValid(true);
      return;
    }
    const parsedN = parseInt(n.trim());
    const parsedK = parseInt(k.trim());
    if (isNaN(parsedN) || isNaN(parsedK)) {
      setAlertMsg("N and K must be valid numbers.");
      setOpenValid(true);
      return;
    }

    if (parsedN * parsedK > 4500){
      setAlertMsg("Memory Constraints: N * K <= 4500.");
      setOpenValid(true);
      return;
    }

    const isValidN = isPrime(parsedN);
    const isValidK = parsedK < parsedN;

    if (!isValidN || parsedN <=0) {
      setAlertMsg("N > 0 must be prime number.");
      setOpenValid(true);
      return;
    }

    if (!isValidK || parsedK <=0) {
      setAlertMsg("K must be less than N > 0.");
      setOpenValid(true);
      return;
    }

    setPgm(pgmGen(+parsedN, +parsedK));
    requestAnimationFrame(() => {
      divRef[0].current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });
  };

  const handleEncodeClassical = () => {
    
    if (message !== null && message !== '') {
      const input = parseMessage(message.trim(), +n, +k);
      if (!input) {
        setAlertMsg("Message size : Multiple of K | Elements : <N");
        setOpenValid(true);
        return;
      }
      else {
        handleGeneratePGM();
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
      const input = parseMessage(message.trim(), +n, +k);
      if (!input) {
        setAlertMsg("Message size : Multiple of K | Elements : <N");
        setOpenValid(true);
        return;
      }
      else {
        let temp = [];
        for (let i = 0; i < k; i++) {
          temp.push(i)
        }
        const pts = checked ? evalp.trim() : temp.join(" ");

        const check = parseEvalP(pts.trim(), +n, +k);
        if (!check) {
          setAlertMsg("Unique points: Length = K, Elements < N.");
          setOpenValid(true);
          return;
        }
        else {
          setSysMsg(encodeSystematic(input, check, +k, +n));
          requestAnimationFrame(() => {
            divRef[2].current.scrollIntoView({ behavior: 'smooth', block: 'end' });
          });
        }
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
            label="N PARAMETER OF RS CODE"
            value={n}
            onChange={(e) => setN(e.target.value)}
            variant="outlined"
            fullWidth

          />
          <TextField
            sx={{ marginBottom: '8px' }}
            label="K PARAMETER OF RS CODE"
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
          <div className="inpeval">
            <div className="txt">
              <div>Default Evaluation points are [0 .. K-1]. </div>
              <div>Change evaluation points for systematic input ? </div>
            </div>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleChange} />}
              label="Check Me"
            />
          </div>
          {
            checked && <TextField
              sx={{ marginBottom: '8px' }}
              label="Evaluation points"
              value={evalp}
              onChange={(e) => setEvalP(e.target.value)}
              variant="outlined"
              fullWidth
            />
          }
        </div>
        {/* Add the second section here */}
      </div>
      <div className="dum" ref={divRef[0]}>
        {pgm && <MatrixGrid pgmSet={setPgm} pgmMat={pgm} />}
      </div>
      <div className="dum" ref={divRef[1]}>
        {classmsg && <ClassicalEncode msgEncode={classmsg} />}
      </div>
      <div className="dum" ref={divRef[2]}>
        {sysmsg && <SystematicEncode msgEncode={sysmsg} />}
      </div>
      {!pgm && !classmsg && !sysmsg && <About />}
      <Snackbar open={openValid} autoHideDuration={5000} onClose={handleCloseValid}>
        <Alert onClose={handleCloseValid} severity="error" sx={{ width: '100%' }}>
          {alertmsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;

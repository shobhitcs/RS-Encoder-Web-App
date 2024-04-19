import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { moveColumn } from '../Tasks/MoveCol';

const MatrixGrid = ( { pgmSet: setPgm , pgmMat: pgm } ) => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const handleMove = () => {
        if(start !== '' && end !== '' && start !== end) 
        setPgm(moveColumn(pgm,start-1,end-1));
    }

    return (
        <div className="pgm-tab" >

        <div className="title" >
            Parity Generator Matrix
        </div>
            <Box marginBottom="1rem" sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                    sx={{ margin: '16px' }}
                    label="Select Column"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    variant="outlined"

                />
                <TextField
                    sx={{ margin: '16px' }}
                    label="Destination Column"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    variant="outlined"

                />

                <Button
                    sx={{ margin: '16px', }}
                    variant="contained"
                    color="primary"
                    onClick={handleMove}
                >
                    Move
                </Button>
            </Box>
            <div className='pgm-grid'>
                <Table>
                    <TableHead>
                        <TableRow>
                            {Array.from({ length: pgm[0].length }, (_, i) => (
                                <TableCell key={i} style={{ minWidth: '20px', fontWeight: '800', fontFamily: "Barlow ,  sans serif" }}>C{i + 1}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pgm.map((row, i) => (
                            <TableRow key={i}>
                                {row.map((value, j) => (
                                    <TableCell key={`${i}-${j}`} style={{ minWidth: '20px' }}>{value}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MatrixGrid;

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

const MatrixGrid = () => {
    const rows = 4;
    const cols = 30;
    const matrix = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => (i + 1) * (j + 1))
    );
    
    const [mat,setMat] = useState(matrix);

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const handleMove = () => {
        if(start !== '' && end !== '' && start !== end) 
        setMat(moveColumn(mat,start-1,end-1));
    }

    return (
        <div className="pgm-tab" style={{maxWidth: '1300px', margin: 'auto', padding: '30px 0 80px 0'}}>

        <div className="logo" style={{ fontSize: '30px'}}>
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
                    sx={{ margin: '16px' }}
                    variant="contained"
                    color="primary"
                    onClick={handleMove}
                >
                    Move Column
                </Button>
            </Box>
            <div className='pgm-grid' style={{ overflowX: 'auto', maxWidth: '1300px', margin: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {Array.from({ length: cols }, (_, i) => (
                                <TableCell key={i} style={{ minWidth: '20px' }}>C{i + 1}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mat.map((row, i) => (
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

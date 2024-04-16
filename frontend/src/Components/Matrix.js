import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const MatrixGrid = () => {
    const rows = 8;
    const cols = 100;
    const matrix = Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => (i + 1) * (j + 1))
    );

    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const handleMove = () => {

    }

    return (
        <div className="pgm-tab" style={{maxWidth: '1300px', margin: 'auto', padding: '30px 0'}}>


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
                // fullWidth
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
                        {matrix.map((row, i) => (
                            <TableRow key={i}>
                                {row.map((value, j) => (
                                    <TableCell key={`${i}-${j}`}>{value}</TableCell>
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

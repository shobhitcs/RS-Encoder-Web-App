import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useState } from 'react';
import { Button } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

const ClassicalEncode = ({ msgEncode: classmsg }) => {
    const [copied, setCopied] = useState(false);
    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(classmsg.join(" "));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            setCopied(false);
        }
    };

    
    return (
        <div className="pgm-tab" >
            <div className="title" >
                Classical Encoded Message
            </div>
            <div className='pgm-grid'>
                <Table>
                    <TableBody>
                        <TableRow>
                            {classmsg.map((value, j) => (
                                <TableCell key={`${j}`} style={{ minWidth: '20px' }}>{value}</TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className='copy-button'>
                <Button
                    variant="contained"
                    onClick={handleCopyToClipboard}
                    
                    endIcon={<FileCopyIcon />}
                    disabled={copied}
                >
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
            </div>
        </div>
    );
};

export default ClassicalEncode;

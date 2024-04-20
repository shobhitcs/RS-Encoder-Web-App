# Reed Solomon Encoder

Reed Solomon Encoder is a JavaScript project that implements both classical and systematic encoding of messages using Reed-Solomon codes. This encoder can generate Portable Graymap (PGM) files, move columns, generate encoded messages for integers of any length, and divide large messages into chunks that can be encoded.

## Features

- **Classical Encoding:** Implements Reed-Solomon encoding without systematic encoding.
- **Systematic Encoding:** Allows systematic encoding, where the user can change the evaluation points. This method enables easy recovery of the original message at the receiver's end.
- **PGM Generation:** Generates Parity Genrator Matrix (PGM) for Classical Encoding.
- **Move Columns:** Allows moving columns to facilitate various encoding techniques.
- **Encoding Large Messages:** Divides large messages into chunks, which are individually encoded.

## Getting Started

### Prerequisites

- npm (Node Package Manager) installed.
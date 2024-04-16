const moveColumn = (matrix, startCol, endCol) => {
    // Copy the matrix to avoid mutating the original one
    const newMatrix = matrix.map(row => [...row]);

    // Check if the columns are within the matrix bounds
    if (startCol >= matrix[0].length || endCol >= matrix[0].length || startCol < 0 || endCol < 0) {
        console.error('Invalid column indices');
        return newMatrix;
    }

    // Remove the startCol and insert it at the endCol
    newMatrix.forEach(row => {
        const temp = row.splice(startCol, 1)[0];
        row.splice(endCol, 0, temp);
    });

    return newMatrix;
};

export {moveColumn};
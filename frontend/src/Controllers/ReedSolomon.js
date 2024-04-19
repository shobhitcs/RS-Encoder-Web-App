const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const power = (a, b, mod) => {
    if (b === 0) return 1;
    if (b === 1) return a % mod;
    let ans = 1;
    ans = power(a * a, Math.floor(b / 2), mod);
    ans %= mod;
    if (b % 2) {
        ans = (ans * a) % mod;
    }
    return ans % mod;
}

const pgmGen = (n, k) => {
    const pgm = Array.from({ length: k }, () =>
        Array.from({ length: n }, () => 0)
    );

    for (let i = 0; i < k; ++i) {
        for (let j = 0; j < n; ++j) {
            pgm[i][j] = power(j, i, n);
        }
    }
    return pgm;
};

const parseMessage = (inputString, n, k) => {
    // Split the input string into an array of substrings containing only numbers
    const numbers = inputString.split(/\s+/);

    // If numbers array is null or the length is not a multiple of k, return null
    if (!numbers || numbers.length % k !== 0 || numbers.length === 0) {
        return null;
    }

    // Convert each substring to a number using map(Number)
    const parsedNumbers = numbers.map(Number);

    // Iterate through each parsed number and check if it's less than n
    for (let i = 0; i < parsedNumbers.length; i++) {
        const num = parsedNumbers[i];
        if (num >= n) {
            return null;
        }
    }

    // Return the array of parsed numbers
    return parsedNumbers;
}

const classicalEncoder = (message, pgm, k) => {
    const n = pgm[0].length;
    const ans = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
        for (let i = 0; i < k; i++) {
            ans[j] = (ans[j] + (message[i] * pgm[i][j]) % n) % n;
        }
    }
    return ans;
}

const divideIntoChunks = (array, k) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += k) {
        chunks.push(array.slice(i, i + k));
    }
    return chunks;
}

// Function to encode each chunk and concatenate the results
const encodeClassical = (array, pgm, k) => {
    const chunks = divideIntoChunks(array, k);
    let encodedMessage = [];

    for (let i = 0; i < chunks.length; i++) {
        const encodedChunk = classicalEncoder(chunks[i], pgm, k);
        encodedMessage = encodedMessage.concat(encodedChunk);
    }

    return encodedMessage;
}


function inverse(val, n) {
    // Base case: if the value is 1, its modular inverse is 1
    if (val === 1) return 1;

    // Initialize variables for the extended Euclidean algorithm
    let t = 0, newt = 1, r = n, newr = val;

    while (newr !== 0) {
        const quotient = Math.floor(r / newr);
        const temp = newt;
        newt = t - quotient * newt;
        t = temp;
        const temp2 = r;
        r = newr;
        newr = temp2 - quotient * newr;
    }

    // Ensure the result is positive
    if (t < 0) t += n;

    return t;
}


function interpolateAndEvaluate(givenPoints, evaluationPoints, prime) {
    const allPoints = [...givenPoints.map(([x]) => x), ...evaluationPoints];
    const evaluations = [];
    for (const x of allPoints) {
        let y = 0;
        for (const [xi, yi] of givenPoints) {
            let numerator = yi;
            let denominator = 1;
            for (const [xj] of givenPoints.filter(([xj]) => xj !== xi)) {
                numerator = (numerator * ((x - xj + prime) % prime)) % prime;
                denominator = (denominator * ((xi - xj + prime) % prime)) % prime;
            }
            const inv = inverse(denominator, prime);
            y = (y + ((numerator * inv) % prime)) % prime;
        }
        evaluations.push(y);
    }

    return evaluations;
}


function zipWithSeparate(arr1,n) {
    let zipped = [];
    let leftOver = [];

    for (let i = 0; i < n; i++) {
        if(i<arr1.length)
            zipped.push([i,arr1[i]]);
        else 
            leftOver.push(i);
    }
    return {zipped, leftOver};
}

// Function to encode each chunk and concatenate the results
const encodeSystematic = (array, k, n) => {
    const chunks = divideIntoChunks(array, k);
    let encodedMessage = [];
    
    for (let i = 0; i < chunks.length; i++) {
        const {zipped , leftOver} = zipWithSeparate(chunks[i], n);
        const encodedChunk = interpolateAndEvaluate(zipped, leftOver, n);
        encodedMessage = encodedMessage.concat(encodedChunk);
    }
    return encodedMessage;
}

export { isPrime, pgmGen, parseMessage, encodeClassical, encodeSystematic };
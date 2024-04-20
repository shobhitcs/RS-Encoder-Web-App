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

const areDgSpace = (str) => {
    return /^[0-9\s]+$/.test(str);
}

const parseMessage = (inputString, n, k) => {
    if(!areDgSpace(inputString)) { return null; }
    const numbers = inputString.split(/\s+/);
    if (!numbers || numbers.length % k !== 0 || numbers.length === 0) {
        return null;
    }
    const parsedNumbers = numbers.map(Number);
    for (let i = 0; i < parsedNumbers.length; i++) {
        const num = parsedNumbers[i];
        if (num >= n) {
            return null;
        }
    }
    return parsedNumbers;
}

const areUnique = (arr) => {
    const seen = new Set();
    for (const item of arr) {
        if (seen.has(item)) {
            return false;
        }
        seen.add(item);
    }
    return true; 
}

const parseEvalP = (inputString, n, k) => {
    if(!areDgSpace(inputString)) { return null; }
    const numbers = inputString.split(/\s+/);
    if (!numbers || numbers.length !== k || numbers.length === 0 || !areUnique(numbers)) {
        return null;
    }
    const parsedNumbers = numbers.map(Number);
    for (let i = 0; i < parsedNumbers.length; i++) {
        const num = parsedNumbers[i];
        if (num >= n) {
            return null;
        }
    }
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
    if (val === 1) return 1;

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


function zipWithSeparate(arr1, arr2, n) {
    let zipped = [];
    let leftOver = [];

    for (let i = 0; i < arr1.length; i++) {
        zipped.push([arr2[i],arr1[i]]);
    }
    for (let i = 0; i < n; i++) {
        if (!arr2.includes(i)) {
            leftOver.push(i);
        }
    }
    return {zipped, leftOver};
}

const encodeSystematic = (array, evalpoints, k, n) => {
    const chunks = divideIntoChunks(array, k);
    let encodedMessage = [];
    
    for (let i = 0; i < chunks.length; i++) {

        const {zipped , leftOver} = zipWithSeparate(chunks[i], evalpoints, n);
        const encodedChunk = interpolateAndEvaluate(zipped, leftOver, n);
        encodedMessage = encodedMessage.concat(encodedChunk);
    }
    return encodedMessage;
}

export { isPrime, pgmGen, parseMessage, encodeClassical, encodeSystematic, parseEvalP };
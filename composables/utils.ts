export function pickRandom(array: any[]) {
    return array[Math.floor(Math.random() * array.length)]
}

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
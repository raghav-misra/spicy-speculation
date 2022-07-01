export function pickRandom<T>(array: T[]) {
    if(array.length === 0) return null;
    return array[Math.floor(Math.random() * array.length)]
}

export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const npcMap = {
    male: {
        B: "Kraft Lawrence",
        C: "Jonesy Jackson",
        D: "Quandale Dingle"
    },
    female: {
        B: "Kara Lroft",
        C: "Pepper Potts",
        D: "Scary Spice"
    }
};

export function getNpcInfo(gender: string, spriteKey: string) {
    return npcMap[gender][spriteKey];
}
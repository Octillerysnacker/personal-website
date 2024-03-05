export const splitValueInclusive = (value: number, numParts: number): number[] => Array.from({length: numParts}, (v,i) => value/(numParts - 1) * i)

export type Vector2D = { x: number, y: number}

export const rotate = (point: Vector2D, origin: Vector2D,  angle: number) => {
    const radians = (Math.PI / 180) * angle;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        const x = (cos * (point.x - origin.x)) + (sin * (point.y - origin.y)) + origin.x;
        const y = (cos * (point.y - origin.y)) - (sin * (point.x - origin.x)) + origin.y;
    return {x, y};
}

export const getRotators = (angle: number) => {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);

    return { x: (x: number, y: number) => cos * x + sin * y, y: (x: number, y: number) => cos * y - sin * x}
}

export const zip = <T, U, R>(a: T[], b: U[], func: (c: T, d: U) => R) => a.map((v,i) => func(v, b[i]));
export const splitValueInclusive = (value: number, numParts: number): number[] => Array.from({length: numParts}, (v,i) => value/(numParts - 1) * i)

export type Vector2D = { x: number, y: number}

export const rotate = (point: Vector2D, origin: Vector2D,  angle: number) => {
    const radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        x = (cos * (point.x - origin.x)) + (sin * (point.y - origin.y)) + origin.x,
        y = (cos * (point.y - origin.y)) - (sin * (point.x - origin.x)) + origin.y;
    return {x, y};
}

export const zip = <T, U, R>(a: T[], b: U[], func: (c: T, d: U) => R) => a.map((v,i) => func(v, b[i]));
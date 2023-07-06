export type PieceProps = {
    color: COLORS,
    startPos: Pos,
    path: (Pos)[],
    cellMap: any,
    move: number,
}


export enum COLORS {
    RED,
    GREEN,
    BLUE,
    YELLOW
}

export type Pos = {
    x: number,
    y: number,
    cellNumber: number
}
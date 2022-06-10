import Vector2 from "../vector2";

export interface PathCommand {
    type: string;
    points: Array<Vector2>;
}

export interface Path{
    type: string,
    d: Array<PathCommand>,
    stroke: string,
    id: string,
}

export function makePath(d: Array<PathCommand>, stroke: string, id: string): Path {
    return {
        type: "path",
        d,
        stroke,
        id
    }
}

export function getPathSvg(path: Path) {
    const { d, stroke, id } = path;
    
    const stringD = d.map(command => {
        const { type, points } = command;
        const pointsString = points.map(point => {
            const { x, y } = point;
            return `${x},${y}`
        }).join(" ");
        return `${type} ${pointsString}`
    }).join(" ");

    return <path d={stringD} stroke={stroke} id={id} key={id} />
}

/*
path {
    type: "path",
    d: [{
        type: "M",
        points: [{
            x: 10,
            y: 10
        }]
    }, {
        type: "C",
        points: [{
            x: 20,
            y: 20
        }, {
            x: 40,
            y: 20,
        }, {
            x: 50,
            y: 10
        }]
    }],
    stroke: "#000",
    id: "path1"
}

function getPathSvg(path: Path) {
    const { d, stroke, id } = path;
    const stringD = d.map(command => {
        const { type, points } = command;
        const pointsString = points.map(point => {
            const { x, y } = point;
            return `${x},${y}`
        }).join(" ");
        return `${type} ${pointsString}`
    }).join(" ");
    return <path d={stringD} stroke={stroke} id={id} key={id} />
    })
}

*/
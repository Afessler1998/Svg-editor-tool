import Vector2 from "../math/vector2"

export interface SelectedOutline{
    type: string,
    id: string,
    center: Vector2,
    width: number,
    height: number,
}

export function makeSelectedOutline(center: Vector2, width: number, height: number): SelectedOutline {
    return {
        type: "selectedOutline",
        id: "selectedOutline",
        center,
        width,
        height
    }
}

export function getSelectedOutlineSvg(selectedOutline: SelectedOutline) {
    const { id, center, width, height } = selectedOutline;

    const point1 = {x: center.x - width/2, y: center.y + height/2};
    const point2 = {x: center.x + width/2, y: center.y + height/2};
    const point3 = {x: center.x + width/2, y: center.y - height/2};
    const point4 = {x: center.x - width/2, y: center.y - height/2};

    return <g key={id}>
        <line x1={point1.x} y1={point1.y} x2={point2.x} y2={point2.y} stroke="black" strokeWidth="1" />
        <line x1={point2.x} y1={point2.y} x2={point3.x} y2={point3.y} stroke="black" strokeWidth="1" />
        <line x1={point3.x} y1={point3.y} x2={point4.x} y2={point4.y} stroke="black" strokeWidth="1" />
        <line x1={point4.x} y1={point4.y} x2={point1.x} y2={point1.y} stroke="black" strokeWidth="1" />

        <circle cx={point1.x} cy={point1.y} r={5} strokeWidth={3} stroke={"#89CFF0"} fill={"#fff"} />
        <circle cx={point2.x} cy={point2.y} r={5} strokeWidth={3} stroke={"#89CFF0"} fill={"#fff"} />
        <circle cx={point3.x} cy={point3.y} r={5} strokeWidth={3} stroke={"#89CFF0"} fill={"#fff"} />
        <circle cx={point4.x} cy={point4.y} r={5} strokeWidth={3} stroke={"#89CFF0"} fill={"#fff"} />

        <circle cx={point1.x - 10} cy={point1.y + 10} r={4} strokeWidth={2} stroke={"#89CFF0"} fill={"#fff"} />
        <circle cx={point2.x + 10} cy={point2.y + 10} r={4} strokeWidth={2} stroke={"#89CFF0"} fill={"#fff"} />
        <circle cx={point3.x + 10} cy={point3.y - 10} r={4} strokeWidth={2} stroke={"#89CFF0"} fill={"#fff"} />
        <circle cx={point4.x - 10} cy={point4.y - 10} r={4} strokeWidth={2} stroke={"#89CFF0"} fill={"#fff"} />
    </g>
}
export default function useNodeClicked(svgList: any[], x: number, y: number) {
    let nodeClicked = 0;
    
    svgList.forEach((element) => {
        if (element.type === "selectedOutline") {
           element.points.forEach((point: any) => {
                if (point.x > x - 5 && point.x < x + 5 && point.y > y - 5 && point.y < y + 5) {
                    nodeClicked = point;
                }
           });
        }
    });

    return nodeClicked;
};

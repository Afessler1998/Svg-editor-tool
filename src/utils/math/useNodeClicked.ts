export default function useNodeClicked(svgList: any[], x: number, y: number) {
    let nodeClicked = 0;
    
    svgList.forEach((element) => {
        if (element.type === "selectedOutline") {
           element.points.forEach((node: any) => {
                if (node.x > x - 5 && node.x < x + 5 && node.y > y - 5 && node.y < y + 5) {
                    nodeClicked = node.point;
                }
           });
        }
    });

    return nodeClicked;
};

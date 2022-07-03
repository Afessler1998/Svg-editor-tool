import capitalizeFirstLetter from "./capitalizeFirstLetter";

export default function getElementName(element: any) {
    let name = element.type;
    switch (name) {
        case "starPolygon":
            return "Star";
        case "rect":
            return "Rectangle";
        default:
            return capitalizeFirstLetter(name);
    }
}
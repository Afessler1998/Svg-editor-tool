import transforms from "../types/transforms";

export default function getTransformString(transforms: transforms) {
    const { translateX, translateY, skewX, skewY, scaleX, scaleY, rotate, rotateX, rotateY } = transforms;
    return `matrix(${scaleX} ${skewY} ${skewX} ${scaleY} ${translateX} ${translateY}) rotate(${rotate} ${rotateX} ${rotateY})`;
}
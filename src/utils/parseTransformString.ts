export default function parseTransformString(transformString: string) {
    const commands = transformString.match(/([a-zA-Z]+)\(([^)]+)\)/g) || ["matrix(1,0,0,1,0,0)", "rotate(0 0 0)"];
    const matrix = commands[0];
    const rotateCommand = commands[1];
    const matrixValues = matrix.match(/[-+]?[0-9]*\.?[0-9]+/g) || ["1", "0", "0", "1", "0", "0"];
    const rotateValues = rotateCommand.match(/[-+]?[0-9]*\.?[0-9]+/g) || ["0", "0", "0"];
    const transforms = {
        translateX: parseFloat(matrixValues[4]),
        translateY: parseFloat(matrixValues[5]),
        scaleX: parseFloat(matrixValues[0]),
        scaleY: parseFloat(matrixValues[3]),
        skewX: parseFloat(matrixValues[2]),
        skewY: parseFloat(matrixValues[1]),
        rotate: parseFloat(rotateValues[0]),
        rotateX: parseFloat(rotateValues[1]),
        rotateY: parseFloat(rotateValues[2]),
    };
    return transforms;
}
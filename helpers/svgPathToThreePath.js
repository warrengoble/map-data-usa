import { parseSVG, makeAbsolute } from "svg-path-parser";
import { Path } from "three";

export default (svgPath) => {
  const parsed = parseSVG(svgPath);
  const parsedAbs = makeAbsolute(parsed);

  let paths = [];
  let currentPath;

  parsedAbs.forEach(({ command, x, y, ...rest }) => {
    if (
      command === "moveto" ||
      command === "horizontal lineto" ||
      command === "vertical lineto"
    ) {
      currentPath = new Path();
      currentPath.moveTo(x, -y);
      paths = [...paths, currentPath];
    } else if (command === "lineto") {
      currentPath.lineTo(x, -y);
    } else if (command === "curveto") {
      const { x1, y1, x2, y2 } = rest;
      currentPath.bezierCurveTo(x1, -y1, x2, -y2, x, -y);
    } else if (command === "quadratic curveto") {
      const { x1, y1 } = rest;
      currentPath.quadraticCurveTo(x1, -y1, x, -y);
    }
  });

  return paths;
};

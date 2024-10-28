import { fabric } from "fabric";
import {
  updateInFirebase,
  saveInFirebase,
} from "../helpers/transactionsWithFirebase.js";
import SHAPES from "../helpers/constants/shapes.js";
export function create(points = [], canvas, userId, idProject) {

  const config = {
    stroke: "#ddd",
    strokeWidth: 3,
    fill: "",
    scaleX: 1,
    scaleY: 1,
  };
  const idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
  const halfPoint = {x:(points[0] + points[2]) / 2, y:(points[1] + points[3]) / 2};
  //halfPoint.x plus 100 to make a Z shape
  let arrow = new fabric.Polyline([{x:points[0], y:points[1]}, {x:halfPoint.x, y:halfPoint.y}, {x:points[2], y:points[3]}], {...config, id: idEl});
  var elementToFirebase = {
    ...config,
    idShape: idEl,
    type: SHAPES.ARROW,
    coor: [points[0], points[1], halfPoint.x, halfPoint.y, points[2], points[3]],
    idProyecto: idProject,
    userCreator: userId,
    scaleX: 1,
    scaleY: 1,
    angle: arrow.angle,
    left: arrow.left,
    top: arrow.top,
  };
  canvas.current.add(arrow);
  arrow.on("modified", () => {
    const angle = arrow.angle;
    let left = arrow.left;
    let top = arrow.top;
    let scaleX = arrow.scaleX;
    let scaleY = arrow.scaleY;
    updateInFirebase(elementToFirebase, { angle, top, left, scaleX, scaleY });
  });

  arrow.on("mousedblclick", () => {
    //   deleteInFirebase(elementsInCanvas[idEl])
  });

  saveInFirebase({...elementToFirebase, idProyecto: idProject});
}

export function update(element, canvas) {
  const {coor, idShape, type, idProyecto, userCreator, ...figure } = element;
      // Busca el objeto existente en el canvas usando el idShape
      let arrow = canvas.current.getObjects().find(obj => obj.id === idShape);
      if (arrow) {
        // Si existe, actualiza sus propiedades
        arrow.set({
          points: [{x:coor[0], y:coor[1]}, {x:coor[2], y:coor[3]}, {x:coor[4], y:coor[5]}],
          left: figure.left,
          top: figure.top,
          scaleX: figure.scaleX,
          scaleY: figure.scaleY,
          angle: figure.angle,
        });
    
        // Renderiza el canvas para reflejar los cambios
        if(canvas.current)canvas.current.renderAll();
    
        // Asigna los eventos si es necesario
        arrow.on("modified", () => {
          //let coor = [arrow.x1, arrow.y1, arrow.x2, arrow.y2];
          let angle = arrow.angle;
          let scaleX = arrow.scaleX;
          let scaleY = arrow.scaleY;
          let left = arrow.left;
          let top = arrow.top;
          updateInFirebase(element, { scaleX, scaleY, angle, top, left, coor });
        });
        arrow.on("mousedblclick", () => {
          //deleteInFirebase(elementsInCanvas[idFigura]);
        });
      } 
      else{
        let newArrow = new fabric.Polyline([{x:coor[0], y:coor[1]}, {x:coor[2], y:coor[3]}, {x:coor[4], y:coor[5]}], {...figure, id: idShape});
        if(canvas.current){
          canvas.current.add(newArrow);
          canvas.current.renderAll();
        };
        newArrow.on("modified", () => {
         // let coor = [newArrow.x1, newArrow.y1, newArrow.x2, newArrow.y2];
          let angle = newArrow.angle;
          let scaleX = newArrow.scaleX;
          let scaleY = newArrow.scaleY;
          let left = newArrow.left;
          let top = newArrow.top;
          updateInFirebase(element, { scaleX, scaleY, angle, top, left, coor });
        });
        newArrow.on("mousedblclick", () => {
          //deleteInFirebase(elementsInCanvas[idFigura]);
        });
      }
}

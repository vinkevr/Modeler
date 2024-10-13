import { fabric } from "fabric";
import {
  updateInFirebase,
  saveInFirebase,
} from "../helpers/transactionsWithFirebase.js";
export function create(points = [], canvas, userId, idProject) {
  //it is a new element on the canvas
  const config = {
    stroke: "#ddd",
    strokeWidth: 5,
  };
  let arrow = new fabric.Line({points, ...config, id: idEl});
  const idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
  var elementToFirebase = {
    ...config,
    idShape: idEl,
    type: "arrow",
    coor: points,
    idProyecto: id,
    userCreator: userId
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
  const { idShape, type, idProyecto, userCreator, ...figure } = element;
      // Busca el objeto existente en el canvas usando el idShape
      let arrow = canvas.current.getObjects().find(obj => obj.id === idShape);

      if (arrow) {
        // Si existe, actualiza sus propiedades
        arrow.set({
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
          let coor = arrow.coor;
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
        let newArrow = new fabric.Line({points: figure.coor, ...figure, id: idShape});
        
        if(canvas.current){
          canvas.current.add(newArrow);
          canvas.current.renderAll()
        };
        newArrow.on("modified", () => {
          let coor = newArrow.coor;
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

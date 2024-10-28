import { fabric } from "fabric";
import {
  updateInFirebase,
  saveInFirebase,
} from "../helpers/transactionsWithFirebase.js";
import SHAPES from "../helpers/constants/shapes.js";
export function create(points, canvas, setModalEntidad, userId, idProject) {
  const config = {
    left: points.x,
    top: points.y,
    width: 200,
    height: 100,
    fill: "#024079",
    stroke: "#024079",
    strokeWidth: 5,
    scaleX: 1,
    scaleY: 1,
  };

  //it is a new element on the canvas
  let idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;

  let rect = new fabric.Rect({ ...config, id: idEl });
  var elementToFirebase = { ...config, idShape: idEl, type: SHAPES.IDENTITY, userCreator: userId };
  canvas.current.add(rect);

  rect.on("modified", () => {
    let angle = rect.angle;
    let scaleX = rect.scaleX;
    let scaleY = rect.scaleY;
    let left = rect.left;
    let top = rect.top;
    updateInFirebase(elementToFirebase, { scaleX, scaleY, angle, top, left });
  });
  rect.on("mousedblclick", () => {
    //Abrir modal para agregar atributos
    setModalEntidad(true);
  });
  saveInFirebase({ ...elementToFirebase, idProyecto: idProject});
}

export function update(element, canvas, modal) {

    const { idShape, type, idProyecto, userCreator, ...figure } = element;
  
    // Busca el objeto existente en el canvas usando el idShape
    let rect = canvas.current.getObjects().find(obj => obj.id === idShape);
  
    if (rect) {
      
      // Si existe, actualiza sus propiedades
      rect.set({
        left: figure.left,
        top: figure.top,
        scaleX: figure.scaleX ?? 1,
        scaleY: figure.scaleY ?? 1,
        angle: figure.angle ?? null,
      });
  
      // Renderiza el canvas para reflejar los cambios
      if(canvas.current)canvas.current.renderAll();
  
      // Asigna los eventos si es necesario
      rect.on("modified", () => {
        let angle = rect.angle;
        let scaleX = rect.scaleX;
        let scaleY = rect.scaleY;
        let left = rect.left;
        let top = rect.top;
        updateInFirebase(element, { scaleX, scaleY, angle, top, left });
      });
  
      rect.on("mousedblclick", () => {
        // Abrir modal para agregar atributos
        modal(true);
      });
    } else {
      // Si no existe el objeto, crea uno nuevo
      let newRect = new fabric.Rect({ ...figure, id: idShape });
      
      if(canvas.current){
        canvas.current.add(newRect);
        canvas.current.renderAll();
      }

  
      newRect.on("modified", () => {
        let angle = newRect.angle;
        let scaleX = newRect.scaleX;
        let scaleY = newRect.scaleY;
        let left = newRect.left;
        let top = newRect.top;
        updateInFirebase(element, { scaleX, scaleY, angle, top, left });
      });
  
      newRect.on("mousedblclick", () => {
        // Abrir modal para agregar atributos
        modal(true);
      });
    }
  }
  

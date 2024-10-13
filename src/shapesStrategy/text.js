import { fabric } from "fabric";
import {
  updateInFirebase,
  saveInFirebase,
} from "../helpers/transactionsWithFirebase.js";
export function create(points, canvas, texto, userId, idProject) {
  const idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
  const config = {
    originX: "center",
    originY: "center",
    stroke: "#FFF",
    fill: "#FFF",
    fontSize: 35,
    fontFamily: "Outfit",
    left: points.x,
    top: points.y,
  };
  let txt = new fabric.IText(texto, { ...config, id: idEl });
  canvas.current.add(txt);
  var elementToFirebase = {
    ...config,
    idShape: idEl,
    type: "text",
    text: texto,
    userCreator: userId,
  };
  txt.on("modified", () => {
    const modified = txt.text;
    let left = txt.left;
    let top = txt.top;
    let scaleX = txt.scaleX;
    let scaleY = txt.scaleY;
    const angle = txt.angle;
    updateInFirebase(elementToFirebase, {
      text: modified,
      scaleX,
      scaleY,
      angle,
      top,
      left,
    });
  });

  saveInFirebase({
    ...elementToFirebase,
    idProyecto: idProject,
  });
}

export function update(element, canvas) {
  const { idShape, type, idProyecto, userCreator, ...figure } = element;
  
  // Busca el objeto existente en el canvas usando el idShape
  let txt = canvas.current.getObjects().find(obj => obj.id === idShape);
  if(txt){
    txt.set({
      left: figure.left,
      top: figure.top,
      scaleX: figure.scaleX,
      scaleY: figure.scaleY,
      angle: figure.angle,
      text: figure.text,
    });
    if(canvas.current)canvas.current.renderAll();
    txt.on("modified", () => {
      const modified = txt.text;
      let left = txt.left;
      let top = txt.top;
      let scaleX = txt.scaleX;
      let scaleY = txt.scaleY;
      const angle = txt.angle;
      updateInFirebase(elementToFirebase, {
        text: modified,
        scaleX,
        scaleY,
        angle,
        top,
        left,
      });
    });
  }
  else{
   let newTxt = new fabric.IText({...figure, id: idShape});
   
   if(canvas.current){
    canvas.current.add(newTxt);
    canvas.current.renderAll();
  }
    newTxt.on("modified", () => {
      const modified = newTxt.text;
      let left = newTxt.left;
      let top = newTxt.top;
      let scaleX = newTxt.scaleX;
      let scaleY = newTxt.scaleY;
      const angle = newTxt.angle;
      updateInFirebase(element, {
        text: modified,
        scaleX,
        scaleY,
        angle,
        top,
        left,
      });
    });
    canvas.current.add(newTxt);
  }
}

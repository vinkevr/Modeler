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

export function update(elemen) {
  let idEl = "";
  const config = {
    originX: "center",
    originY: "center",
    stroke: "#FFF",
    fill: "#FFF",
    fontSize: 35,
    fontFamily: "Outfit",
    left: x,
    top: y,
  };
  let txt;
  //Solo se entra cuando es la primera vez que se entra al proyecto
  const { idFigura, type, text, idProyecto, ...figure } = draw;
  idEl = idFigura;
  txt = new fabric.IText(text, figure);
  elementsInCanvas[idFigura] = { ...figure, idFigura, type, text, idProyecto };

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
  canvas.current.add(txt);
}

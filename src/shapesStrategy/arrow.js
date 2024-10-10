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

export function update(draw = null, points = [], update = false) {
  let idEl = "";
  const config = {
    stroke: "#ddd",
    strokeWidth: 5,
  };
  let arrow;
  const { idFigura, type, text, idProyecto, coor, ...figure } = draw;
  idEl = idFigura;
  arrow = new fabric.Line(coor, figure);
  elementsInCanvas[idFigura] = { ...figure, idFigura, type, idProyecto };
  arrow.on("modified", () => {
    const angle = arrow.angle;
    let left = arrow.left;
    let top = arrow.top;
    let scaleX = arrow.scaleX;
    let scaleY = arrow.scaleY;
    updateInFirebase(elementToFirebase, { angle, top, left, scaleX, scaleY });
  });

  arrow.on("mousedblclick", () => {
    deleteInFirebase(elementsInCanvas[idFigura]);
  });
  canvas.current.add(arrow);
}

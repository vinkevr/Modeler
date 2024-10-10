import { fabric } from "fabric";
import {
  updateInFirebase,
  saveInFirebase,
} from "../helpers/transactionsWithFirebase.js";
export function create(points, canvas, setModalEntidad, userId, idProject) {
  const config = {
    left: points.x,
    top: points.y,
    width: 200,
    height: 100,
    fill: "#024079",
    stroke: "#024079",
    strokeWidth: 5,
  };

  //it is a new element on the canvas
  let idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;

  let rect = new fabric.Rect({ ...config, id: idEl });
  var elementToFirebase = { ...config, idShape: idEl, type: "process", userCreator: userId };
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
    console.log("Doble click");
  });
  saveInFirebase({ ...elementToFirebase, idProyecto: idProject});
}

export function update(element, canvas, modal) {

const { idShape, type, idProyecto, userCreator, ...figure } = element;
  let rect = new fabric.Rect({...figure, id: idShape});
  canvas.current.add(rect);
  rect.on("modified", () => {
    let angle = rect.angle;
    let scaleX = rect.scaleX;
    let scaleY = rect.scaleY;
    let left = rect.left;
    let top = rect.top;
    updateInFirebase(element, { scaleX, scaleY, angle, top, left });
  });
  rect.on("mousedblclick", () => {
    //Abrir modal para agregar atributos
    modal(true);
  });
}

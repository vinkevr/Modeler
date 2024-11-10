import { fabric } from "fabric";
import {
  updateInFirebase,
  saveInFirebase,
} from "../helpers/transactionsWithFirebase.js";
import SHAPES from "../helpers/constants/shapes.js";

export function create(points, canvas, setModalTexto, userId, idProject) {
  const romboPuntos = [
    { x: 100, y: 50 }, // Punto superior
    { x: 150, y: 100 }, // Punto derecho
    { x: 100, y: 150 }, // Punto inferior
    { x: 50, y: 100 }, // Punto izquierdo
  ];
  const config = {
    fill: "#7591AB",
    stroke: "#7591AB",
    strokeWidth: 2,
    top: points.y,
    left: points.x,
    scaleX: 1,
    scaleY: 1,
    selectable : true,
  };
  let idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
  let relation = new fabric.Polygon(romboPuntos, { ...config, id: idEl });
  canvas.current.add(relation);

  console.log(relation);
  var elementToFirebase = {
    ...config,
    points: romboPuntos,
    idShape: idEl,
    type: SHAPES.Polygon,
    userCreator: userId,
  };
  relation.on("modified", () => {
    let angle = relation.angle;
    let scaleX = relation.scaleX;
    let scaleY = relation.scaleY;
    let left = relation.left;
    let top = relation.top;
    updateInFirebase(elementToFirebase, { scaleX, scaleY, angle, top, left });
  });
  relation.on("mousedblclick", () => {
    //Abrir modal para agregar atributos
    setModalTexto({isActive: true, type:null});
  });
  saveInFirebase({ ...elementToFirebase, idProyecto: idProject });
}
export function update(element, canvas, modal) {
  const { idShape, type, idProyecto, userCreator, ...figure } = element;
  let relation = canvas.current.getObjects().find((obj) => obj.id === idShape);
  if (relation) {
    relation.set({
      left: figure.left,
      top: figure.top,
      scaleX: figure.scaleX ?? 1,
      scaleY: figure.scaleY ?? 1,
      angle: figure.angle ?? null,
    });
    if (canvas.current) canvas.current.renderAll();
    relation.on("mousedblclick", () => {
      //Abrir modal para agregar atributos
      modal({isActive: true, type:null});
    });
  } else {
    const { points, ...shape } = figure;
    let newRelation = new fabric.Polygon(points, { ...shape, id: idShape });
    if (canvas.current) {
      canvas.current.add(newRelation);
      canvas.current.renderAll();
    }
    newRelation.on("modified", () => {
      let angle = newRelation.angle;
      let scaleX = newRelation.scaleX;
      let scaleY = newRelation.scaleY;
      let left = newRelation.left;
      let top = newRelation.top;
      updateInFirebase(element, { scaleX, scaleY, angle, top, left });
    });
    newRelation.on("mousedblclick", () => {
      //Abrir modal para agregar atributos
      modal({isActive: true, type:null});
    });
  }
}

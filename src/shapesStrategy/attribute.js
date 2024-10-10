import { fabric } from "fabric";
import { updateInFirebase, saveInFirebase } from "../helpers/transactionsWithFirebase.js";
export function create(points, canvas, setModalTexto, type, userId, idProject) {

  const config = {
    rx: 50, // Radio horizontal (mitad del ancho)
    ry: 30, // Radio vertical (mitad de la altura)
    fill: type.color,
    top: points.y,
    left: points.x,
  };

  const idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
  let circ = new fabric.Ellipse({ ...config, id: idEl });
 var elementToFirebase = {
    ...config,
    idShape: idEl,
    type: "ellipse",
    userCreator: userId 
  };

  canvas.current.add(circ);
  circ.on("modified", () => {
    const angle = circ.angle;
    let scaleX = circ.scaleX;
    let scaleY = circ.scaleY;
    let left = circ.left;
    let top = circ.top;
    updateInFirebase(elementToFirebase, { scaleX, scaleY, angle, top, left });
  });
  circ.on("mousedblclick", () => {
    //setEntidadInFocus(elementsInCanvas[idEl]);
    //Abrir modal para agregar atributos
    setModalTexto(true);
  });
 saveInFirebase({
    ...elementToFirebase,
    idProyecto: idProject,
  });
}

export function update() {
  let idEl = "";
  const config = {
    rx: 50, // Radio horizontal (mitad del ancho)
    ry: 30, // Radio vertical (mitad de la altura)
    fill: attributeColorRef.current,
    top: y,
    left: x,
  };
  let circ;
    const { idFigura, type, idProyecto, ...figure } = draw;
    elementsInCanvas[idFigura] = { ...figure, idFigura, type, idProyecto };
    circ = new fabric.Ellipse(figure);
    canvas.current.add(circ);
    circ.on("modified", () => {
      const angle = circ.angle;
      let scaleX = circ.scaleX;
      let scaleY = circ.scaleY;
      let left = circ.left;
      let top = circ.top;
      updateInFirebase(elementToFirebase, { scaleX, scaleY, angle, top, left });
    });
    circ.on("mousedblclick", () => {
      //setEntidadInFocus(elementsInCanvas[idEl]);
      //Abrir modal para agregar atributos
      setModalTexto(true);
    });
}

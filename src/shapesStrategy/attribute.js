import { fabric } from "fabric";

export function create(points, canvas, setModalTexto, type) {
console.log("create attribute");
  const config = {
    rx: 50, // Radio horizontal (mitad del ancho)
    ry: 30, // Radio vertical (mitad de la altura)
    fill: type.color,
    top: points.y,
    left: points.x,
  };

  const idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
  const circ = new fabric.Ellipse({ ...config, id: idEl });
 /* elementsInCanvas[idEl] = {
    ...config,
    idFigura: idEl,
    type: "ellipse",
    idProyecto: id,
  };*/

  canvas.current.add(circ);
  circ.on("modified", () => {
    const angle = circ.angle;
    let scaleX = circ.scaleX;
    let scaleY = circ.scaleY;
    let left = circ.left;
    let top = circ.top;
    //updateInFirebase({...elementsInCanvas[idEl]}, { scaleX, scaleY, angle, top, left });
  });
  circ.on("mousedblclick", () => {
    //setEntidadInFocus(elementsInCanvas[idEl]);
    //Abrir modal para agregar atributos
    setModalTexto(true);
  });
 /* saveInFirebase({
    ...config,
    idFigura: idEl,
    type: "ellipse",
    idProyecto: id,
  });*/
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
  if (update && canvas.current) {
    console.log("Actualizando elemento");
    canvas.current.getObjects().forEach((obj) => {
      const { id, idFigura, idProyecto, ...figure } = draw;
      if (obj.id === idFigura) {
        obj.set(figure);
        canvas.current.requestRenderAll();
      }
    });
  } else {
    const { idFigura, type, idProyecto, ...figure } = draw;
    elementsInCanvas[idFigura] = { ...figure, idFigura, type, idProyecto };
    circ = new fabric.Ellipse(figure);
    canvas.current.add(circ);
    circ.on("mouseout", () => {
      //Update in firebase
      let left = circ.left;
      let top = circ.top;
      updateInFirebase({ ...elementsInCanvas[idFigura] }, { top, left });
    });
    circ.on("scaling", () => {
      let scaleX = circ.scaleX;
      let scaleY = circ.scaleY;
      updateInFirebase({ ...elementsInCanvas[idFigura] }, { scaleX, scaleY });
    });
    circ.on("modified", () => {
      const angle = circ.angle;
      updateInFirebase({ ...elementsInCanvas[idFigura] }, { angle });
    });
    circ.on("mousedblclick", () => {
      //setEntidadInFocus(elementsInCanvas[idEl]);
      //Abrir modal para agregar atributos
      setModalTexto(true);
    });
  }
}

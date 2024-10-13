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

export function update(element, canvas, modal) {
  const { idShape, type, idProyecto, userCreator, ...figure } = element;
  let circ = canvas.current.getObjects().find(obj => obj.id === idShape);

  if (circ) {
    // Si existe, actualiza sus propiedades
    circ.set({
      left: figure.left,
      top: figure.top,
      scaleX: figure.scaleX,
      scaleY: figure.scaleY,
      angle: figure.angle,
    });

    // Renderiza el canvas para reflejar los cambios
    if(canvas.current)canvas.current.renderAll();

    // Asigna los eventos si es necesario
    circ.on("modified", () => {
      let angle = circ.angle;
      let scaleX = circ.scaleX;
      let scaleY = circ.scaleY;
      let left = circ.left;
      let top = circ.top;
      updateInFirebase(element, { scaleX, scaleY, angle, top, left });
    });

    circ.on("mousedblclick", () => {
      //Abrir modal para agregar atributos
      modal(true);
    });
  }
  else{
  
      let newCirc = new fabric.Ellipse({...figure, id: idShape});
      
      if(canvas.current){
        canvas.current.add(newCirc);
        canvas.current.renderAll()
      };
      newCirc.on("modified", () => {
        const angle = newCirc.angle;
        let scaleX = newCirc.scaleX;
        let scaleY = newCirc.scaleY;
        let left = newCirc.left;
        let top = newCirc.top;
        updateInFirebase(element, { scaleX, scaleY, angle, top, left });
      });
      newCirc.on("mousedblclick", () => {
        //Abrir modal para agregar atributos
        modal(true);
      });
  }
}

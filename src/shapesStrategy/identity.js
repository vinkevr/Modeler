import { fabric } from "fabric";
import { updateInFirebase, saveInFirebase } from "../helpers/transactionsWithFirebase.js";
export function create(points, canvas, setModalEntidad) {
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
   
    let rect = new fabric.Rect({...config, id: idEl});
    //elementsInCanvas[idEl] = { ...config, idFigura: rect.id, type: "process" };
    canvas.current.add(rect);

    rect.on("modified", () => {
      let angle = rect.angle;
      let scaleX = rect.scaleX;
      let scaleY = rect.scaleY;
      let left = rect.left;
      let top = rect.top;
      //updateInFirebase({...elementsInCanvas[idEl]}, { scaleX, scaleY, angle, top, left });
      console.log("new size and angle or it is in another place with id: ", idEl);
    });
    rect.on("mousedblclick", () => {
     // setEntidadInFocus(elementsInCanvas[idEl]);
      //Abrir modal para agregar atributos
      setModalEntidad(true);
     console.log("Doble click");
      
    }); 
    //nuevoElemento.current = true;
   // saveInFirebase({ ...config, idFigura: rect.id, type: "process", idProyecto: id});
}

export function update(draw = null, x = null, y = null, update= false) {
    
    let idEl = "";
    const config = {
      left: x,
      top: y,
      width: 200,
      height: 100,
      fill: "#024079",
      stroke: "#024079",
      strokeWidth: 5,
    };
    let rect;
      if(update && canvas.current){
        console.log("Actualizando elemento");
        canvas.current.getObjects().forEach((obj) => {
          const {id, idFigura, idProyecto, ...figure } = draw;
          if(obj.id === idFigura){
            obj.set(figure);
            canvas.current.requestRenderAll();
          }
        });
      
      }
      else{
      //Solo se entra cuando es la primera vez que se entra al proyecto   
        const { idFigura, type, idProyecto, ...figure } = draw;
        elementsInCanvas[idFigura] = { ...figure, idFigura, type, idProyecto};
        rect = new fabric.Rect(figure);
      canvas.current.add(rect);
      rect.on("mouseout", () => {
        //Update in firebase
        let left = rect.left;
        let top = rect.top;
        updateInFirebase({...elementsInCanvas[idFigura]}, { top, left });
      });
      rect.on("scaling", () => {
        let scaleX = rect.scaleX;
        let scaleY = rect.scaleY;
        updateInFirebase({...elementsInCanvas[idFigura]}, { scaleX, scaleY });
      });
      rect.on("modified", () => {
        const angle = rect.angle;
        updateInFirebase({...elementsInCanvas[idFigura]}, { angle });
      });
      rect.on("mousedblclick", () => {
       // setEntidadInFocus(elementsInCanvas[idFigura]);
        //Abrir modal para agregar atributos
        //setModalEntidad(true);
        
      });
    }
}
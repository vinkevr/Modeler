import { fabric } from "fabric";
import { updateInFirebase, saveInFirebase } from "../helpers/transactionsWithFirebase.js";
export function create(points, canvas, texto) {

    const idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
    const config = {
      originX: "center",
      originY: "center",
      stroke: "#FFF",
      fill: "#FFF",
      fontSize: 35,
      fontFamily: "Outfit",
      left: points.x,
      top: points.y
    };
    let txt = new fabric.IText(texto, {...config, id: idEl});
    canvas.current.add(txt);
   /* elementsInCanvas[idEl] = {
      ...config,
      id: idEl,
      type: "text",
      text: texto,
    };
    saveInFirebase({
      ...config,
      idFigura: idEl,
      type: "text",
      idProyecto: id,
      text: texto,
    });*/

    txt.on("modified", () => {
      const modified = txt.text;
      let left = txt.left;
      let top = txt.top;
      let scaleX = txt.scaleX;
      let scaleY = txt.scaleY;
      const angle = txt.angle;
      //updateInFirebase(elementsInCanvas[idEl], {text:modified, scaleX, scaleY, angle, top, left})
    });
}

export function update(draw = null, x = null, y = null, texto=null, update=false) {
    let idEl = "";
    const config = {
      originX: "center",
      originY: "center",
      stroke: "#FFF",
      fill: "#FFF",
      fontSize: 35,
      fontFamily: "Outfit",
      left: x,
      top: y
    };
    let txt;
    if (draw != null) {
      if(update && canvas.current){
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
        const { idFigura, type, text, idProyecto, ...figure } = draw;
        idEl = idFigura;
        txt = new fabric.IText(text, figure);
        elementsInCanvas[idFigura] = {...figure, idFigura, type, text, idProyecto}
        txt.on("mouseout", () => {
          //Update in firebase
          let left = txt.left;
          let top = txt.top;
          updateInFirebase(elementsInCanvas[idFigura], {top, left})
       });
        //Update for the new text
        txt.on("modified", () => {
          const modified = txt.text;
          updateInFirebase(elementsInCanvas[idFigura], {text:modified})
        });
        txt.on("scaling", () => {
          let scaleX = txt.scaleX;
          let scaleY = txt.scaleY;
          updateInFirebase(elementsInCanvas[idFigura], {scaleX, scaleY})
        });
        txt.on("modified", () => {
          const angle = txt.angle;
          updateInFirebase(elementsInCanvas[idFigura], {angle})
        });
      
        canvas.current.add(txt);
      }

    } 
}
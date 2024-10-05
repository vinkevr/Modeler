import { fabric } from "fabric";
export function create(draw = null, x = null, y = null, texto=null, update=false) {
    idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
    txt = new fabric.IText(texto, {...config, id: idEl});
    elementsInCanvas[idEl] = {
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
    });

    canvas.current.add(txt);
    txt.on("mouseup", () => {
      //Update in firebase
      let left = txt.left;
      let top = txt.top;
      updateInFirebase(elementsInCanvas[idEl], {top, left})
   });
    //Update for the new text
    txt.on("modified", () => {
      const modified = txt.text;
      updateInFirebase(elementsInCanvas[idEl], {text:modified})
    });
    txt.on("scaling", () => {
      let scaleX = txt.scaleX;
      let scaleY = txt.scaleY;
      updateInFirebase(elementsInCanvas[idEl], {scaleX, scaleY})
    });
    txt.on("modified", () => {
      const angle = txt.angle;
      updateInFirebase(elementsInCanvas[idEl], {angle})
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
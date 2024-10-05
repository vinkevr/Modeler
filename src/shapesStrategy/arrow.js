import { fabric } from "fabric";

export function create(draw=null, points=[], update=false) {
            //it is a new element on the canvas
            arrow =  new fabric.Line(points, config)
            idEl = `${Date.now()}-${Math.floor(Math.random()*100)}`
            elementsInCanvas[idEl] = {...config, id:idEl, type:'arrow', coor:points, idProyecto:id}
            saveInFirebase(elementsInCanvas[idEl])
            canvas.current.add(arrow)
            arrow.on('mouseup', ()=>{
              //Update in firebase
              let left = arrow.left;
              let top = arrow.top;
              updateInFirebase(elementsInCanvas[idEl], {top, left})
          })
          arrow.on('scaling', ()=>{
              let scaleX = arrow.scaleX 
              let scaleY = arrow.scaleY
              updateInFirebase(elementsInCanvas[idEl], {scaleX, scaleY})
            })
            arrow.on('modified', ()=> {
              const angle = arrow.angle
              updateInFirebase(elementsInCanvas[idEl], {angle})
            });
          arrow.on('mousedblclick', ()=>{
              deleteInFirebase(elementsInCanvas[idEl])
          })
          canvas.current.add(arrow);
}

export function update(draw=null,points=[], update=false) {
    let idEl = ''
    const config = {
        stroke: "#ddd",
        strokeWidth: 5
    }
    let arrow;
    if(draw!=null){
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
        const { idFigura, type, text, idProyecto, coor, ...figure } = draw;
        idEl = idFigura;
        arrow =  new fabric.Line(coor,figure)
        elementsInCanvas[idFigura] = {...figure, idFigura, type, idProyecto}
        arrow.on('mouseup', ()=>{
          //Update in firebase
          let left = arrow.left;
          let top = arrow.top;
          updateInFirebase(elementsInCanvas[idFigura], {top, left})
      })
      arrow.on('scaling', ()=>{
          let scaleX = arrow.scaleX 
          let scaleY = arrow.scaleY
          updateInFirebase(elementsInCanvas[idFigura], {scaleX, scaleY})
        })
        arrow.on('modified', ()=> {
          const angle = arrow.angle
          updateInFirebase(elementsInCanvas[idFigura], {angle})
        });
      arrow.on('mousedblclick', ()=>{
          deleteInFirebase(elementsInCanvas[idFigura])
      })
      canvas.current.add(arrow);
      }
    }
}
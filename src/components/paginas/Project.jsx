
import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext  from "../../context/UserContext";
import firebase from "../../firebase";
import select from "../../images/select.png";
import text from "../../images/text.png";
import newicon from "../../images/new.png";
import shape from "../../images/shape.png";
import arrow from "../../images/Arrow.png";
import redo from "../../images/redo.png";

import SidebarChat from "../ui/SidebarChat";
import { fabric } from "fabric";
import ModalAddAttribute from "../ui/ModalAddAttribute";
import ModalAddTextAttribute from "../ui/ModalAddTextAttribute";
import { opcionesEntidad } from "../../helpers/formatear";

const Project = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [menuFocus, setMenuFocus] = useState(1);
  const [modalEntidad, setModalEntidad] = useState(false);
  const [modalTexto, setModalTexto] = useState(false);
  const [entidadInFocus, setEntidadInFocus] = useState({});
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 }); //para guardar coordenadas
  //Para tomar el tamaño del contenedor
  const canvasContainerRef = useRef(null);
  //Obtener el canvas
  const canvas = useRef(null);

  //verificar los elementos que se crean
  let elementsInCanvas = [];
  //nuestra etiqeuta de canvas
  const canvasRef = useRef(null);
  //El tipo de figura que se va agregar al lienzo
  const typeRef = useRef("");
  //Color del atributo que se va a agregar
  const attributeColorRef = useRef("");
  //Agregar texto al titulo
  const attributeTextRef = useRef("");
  //es para las flechas que se agregue con doble click
  let dbl_click = 0;
  const puntosArrow = {
    x1:'', 
    y1:'',
    x2:'',
    y2:'',
}
const addTextAttribute = (txt) => {
  typeRef.current = "text";
    attributeTextRef.current = txt;
  setModalTexto(false);
}
const addEntityElement = (tipo, txt = '') => {
  typeRef.current = 'ellipse';
  attributeColorRef.current = "#097461";
  if(tipo === opcionesEntidad.PK){
    attributeColorRef.current = '#5B0000';
  }
  if(tipo === opcionesEntidad.FK){
    attributeColorRef.current = '#5B0000';
  }
  if(tipo === opcionesEntidad.RELACION){
  }
  if(tipo === opcionesEntidad.ATRIBUTO){
  }
  if(tipo === opcionesEntidad.TXT){
    typeRef.current = "text";
    attributeTextRef.current = txt;
    console.log(typeRef.current)
   // createText(null, entidadInFocus.top, entidadInFocus.left, txt);
  }
  setModalEntidad(false)
  setEntidadInFocus({})
  //typeRef.current = ''
  //console.log(entidadInFocus)
}
  useEffect(() => {
    // Obtiene el contenedor del canvas
    const canvasContainer = canvasContainerRef.current;
    // Calcula el ancho disponible dentro del contenedor restando el ancho de la barra lateral y el menú
    const availableWidth = canvasContainer.offsetWidth;

    // Calcula el ancho disponible dentro del contenedor restando el alto de cualquier barra superior o inferior
    const availableHeight = canvasContainer.offsetHeight;
    canvas.current = new fabric.Canvas(canvasRef.current, {
      width: availableWidth,
      height: availableHeight,
      selection: true,
    });
    
    //Obtener las figuras guardas en el canvas de firebase
    const getFiguras = async () => {

      await firebase.db
        .collection("proyectos")
        .where("idProyecto", "==", id)
        .onSnapshot( (querySnapshot) => {
           //Entrando al proyecto por primera vez
           if(canvas.current.getObjects().length == 0){
            //insertar los elementos en el canvas
            //Primero pintar los que sean diferente de texto
            querySnapshot.forEach((doc) => {
              if (doc.data().type === "ellipse") {
                createAttribute({ ...doc.data(), id: doc.data().idFigura});
              } else if (doc.data().type === "process") {
                createIdentity({ ...doc.data(), id: doc.data().idFigura});
              }
              else if (doc.data().type === "arrow") {
                drawArrow({ ...doc.data(), id: doc.data().idFigura});
              }
          });
          //Pintar los textos
          querySnapshot.forEach((doc) => {
            if (doc.data().type === "text") {
              createText({ ...doc.data(), id: doc.data().idFigura});
            } 
        });
          }
          //Hacer otra validacion de que este lleno pero no este el objeto porque es nuevo
          else{
            let fireb= [];
            querySnapshot.forEach((doc) => {
              fireb.push(doc.data());
            });

            let canvasObjects = canvas.current.getObjects().map((obj) => obj.id);
            fireb.forEach((obj) => {
              //Verificar si el objeto ya esta en el canvas, solo para modificar su posición y no pintarlo dos veces
              if(canvasObjects.includes(obj.idFigura)){
                if (obj.type === "text") {
                  createText({ ...obj, id: obj.idFigura}, null, null, obj.text, true);
                } else if (obj.type === "process") {
                   createIdentity({ ...obj, id: obj.idFigura}, null, null, true);
                }else if(obj.type === "ellipse"){
                  createAttribute({ ...obj, id: obj.idFigura}, null, null, true);
                }
                else if(obj.type === "arrow"){
                  drawArrow({ ...obj, id: obj.idFigura}, [], true);
                }
              }
              //Pintar por primera vez al nuevoa objeto
              else{
                if (obj.type === "text") {
                  print("es un nuevo texto")
                  createText({ ...obj, id: obj.idFigura});
                } else if (obj.type === "process") {
                   createIdentity({obj, id: obj.idFigura});
                }
                else if(obj.type === "ellipse"){
                  createAttribute({ ...obj, id: obj.idFigura});
                }else if(obj.type === "arrow"){
                  drawArrow({ ...obj, id: obj.idFigura});
                }
                
              }
            });
          }

        
    
        }); //fin del snapshot
    };
    getFiguras();
    canvas.current.on("mouse:down", function (event) {
      const pointer = canvas.current.getPointer(event.e);
      setClickCoords({ x: pointer.x, y: pointer.y });
      console.log(typeRef.current)
      if (typeRef.current == "identity") {
        //console.log("insertando");
        createIdentity(null, pointer.x, pointer.y);
        typeRef.current = "";
        setMenuFocus(1);
       
      }
      else if(typeRef.current == "ellipse"){
        createAttribute(null, pointer.x, pointer.y);
        typeRef.current = "";
        setMenuFocus(1);
       
      }else if(typeRef.current == "arrow"){
        ++dbl_click;
        console.log("clicks:",dbl_click)
        if(dbl_click == 1){
          puntosArrow.x1 = pointer.x;
          puntosArrow.y1 = pointer.y;
        }
        if(dbl_click == 2){
          puntosArrow.x2 = pointer.x;
          puntosArrow.y2 = pointer.y;
          drawArrow(null,Object.values(puntosArrow));
          dbl_click = 0;
          typeRef.current = "";
          setMenuFocus(1);
        } 
        
       
      }
      else if(typeRef.current == "text"){
        createText(null, pointer.x, pointer.y, attributeTextRef.current)
        typeRef.current = "";
        setMenuFocus(1);
      }
       
      //console.log("Posición seleccionada:", pointer);
    });
    // Maneja el evento d para hacer zoom
    const handleWheel = (event) => {
      const delta = event.e.deltaY;
      let zoom = canvas.current.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20; // Limita el zoom máximo
      if (zoom < 0.01) zoom = 0.01; // Limita el zoom mínimo
      canvas.current.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);
      event.e.preventDefault();
      event.e.stopPropagation();
    };
    // Agrega el event listener para el zoom
    canvas.current.on("mouse:wheel", handleWheel);

    // Escucha el evento keydown del documento
    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Delete") {
        deleteSelected();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Función para eliminar elementos seleccionados
    const deleteSelected = () => {
      const activeObjects = canvas.current.getActiveObjects();
      activeObjects.forEach((object) => {
        canvas.current.remove(object);
      });
      canvas.current.discardActiveObject().renderAll();
    };

    return () => {
      canvas.current.dispose(); // Limpiar el canvas al desmontar el componente
    };
  }, []);

  //Guardar en firebase los elementos que se crearon
  const saveInFirebase = (element) => {
    firebase.db.collection("proyectos").add(element);
  };
  const updateInFirebase = async (element, data) => {
    let idCollElement = ''
    //console.log(element)
        //Obtener el id del documento en la colección
          await  firebase.db.collection("proyectos")
            .where('idFigura', '==', element.idFigura)
            .get().then((querySnapshot) => {
              //console.log(querySnapshot)
                    if (!querySnapshot.empty) {
                          idCollElement = querySnapshot.docs[0].id; 
                          //console.log(idCollElement)       
                    }
              })
   await firebase.db.collection("proyectos").doc(idCollElement).update(data);
  };
 const createAttribute = (draw = null, x = null, y = null, update= false) => {
  console.log("Creando atributo");
    let idEl = "";
    const config = {
        rx: 50, // Radio horizontal (mitad del ancho)
        ry: 30, // Radio vertical (mitad de la altura)
        fill: attributeColorRef.current,
        top:y,
        left:x
    }
    let circ;
    if (draw != null) {
      if(update && canvas.current){
        console.log("Actualizando elemento");
        canvas.current.getObjects().forEach((obj) => {
          const {id, idFigura, idProyecto, ...figure } = draw;
          if(obj.id === idFigura){
            obj.set(figure);
            canvas.current.requestRenderAll();
          }
        });
      }else{
        const { idFigura, type, idProyecto, ...figure } = draw;
        elementsInCanvas[idFigura] = { ...figure, idFigura, type, idProyecto};
        circ = new fabric.Ellipse(figure);
        canvas.current.add(circ);
      circ.on("mouseout", () => {
          //Update in firebase
          let left = circ.left;
          let top = circ.top;
          updateInFirebase({...elementsInCanvas[idFigura]}, { top, left });
       });
        circ.on("scaling", () => {
          let scaleX = circ.scaleX;
          let scaleY = circ.scaleY;
          updateInFirebase({...elementsInCanvas[idFigura]}, { scaleX, scaleY });
        });
        circ.on("modified", () => {
          const angle = circ.angle;
          updateInFirebase({...elementsInCanvas[idFigura]}, { angle });
        });
        circ.on("mousedblclick", () => {
          //setEntidadInFocus(elementsInCanvas[idEl]);
          //Abrir modal para agregar atributos
          setModalTexto(true);
          
        });
      }
    }else{
      console.log("Creando circulo");
      //Es nuevo
      idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
      circ = new fabric.Ellipse({...config, id: idEl});
      elementsInCanvas[idEl] = { ...config, idFigura:idEl, type:"ellipse", idProyecto: id};
        
        canvas.current.add(circ);
        circ.on("mouseout", () => {
          //Update in firebase
          let left = circ.left;
          let top = circ.top;
          updateInFirebase({...elementsInCanvas[idEl]}, { top, left });
        });
        circ.on("scaling", () => {
          let scaleX = circ.scaleX;
          let scaleY = circ.scaleY;
          updateInFirebase({...elementsInCanvas[idEl]}, { scaleX, scaleY });
        });
        circ.on("modified", () => {
          const angle = circ.angle;
          updateInFirebase({...elementsInCanvas[idEl]}, { angle });
        });
        circ.on("mousedblclick", () => {
          //setEntidadInFocus(elementsInCanvas[idEl]);
          //Abrir modal para agregar atributos
          setModalTexto(true);
          
        });
        saveInFirebase({ ...config, idFigura: idEl, type: "ellipse", idProyecto: id});
    }


  }
  const createIdentity = (draw = null, x = null, y = null, update= false) => {
    
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
    if (draw != null) {
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
        setEntidadInFocus(elementsInCanvas[idFigura]);
        //Abrir modal para agregar atributos
        setModalEntidad(true);
        
      });
    }
    } else {
      console.log("Creando nuevo elemento");
      //it is a new element on the canvas
      idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
     
      rect = new fabric.Rect({...config, id: idEl});
      elementsInCanvas[idEl] = { ...config, idFigura: rect.id, type: "process" };
      canvas.current.add(rect);
      rect.on("mouseup", () => {
        //Update in firebase
        let left = rect.left;
        let top = rect.top;
        updateInFirebase({...elementsInCanvas[idEl]}, { top, left });
      });
      rect.on("scaling", () => {
        let scaleX = rect.scaleX;
        let scaleY = rect.scaleY;
        updateInFirebase({...elementsInCanvas[idEl]}, { scaleX, scaleY });
      });
      rect.on("modified", () => {
        const angle = rect.angle;
        updateInFirebase({...elementsInCanvas[idEl]}, { angle });
      });
      rect.on("mousedblclick", () => {
        setEntidadInFocus(elementsInCanvas[idEl]);
        //Abrir modal para agregar atributos
        setModalEntidad(true);
        
      });
      //nuevoElemento.current = true;
      saveInFirebase({ ...config, idFigura: rect.id, type: "process", idProyecto: id});

    }
 
    
  };
  const createText = (draw = null, x = null, y = null, texto=null, update=false) => {
    
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

    } else {
      //it is a new element on the canvas
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

  };
  const drawArrow = (draw=null,points=[], update=false) => {
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
    }else{
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
    
    
 }
  
  return (
    <div
      className="bg-zinc-800 w-full h-screen flex justify-between overflow-x-hidden"
      ref={canvasContainerRef}
    >
      <div className="flex flex-col absolute z-50">
        <div className="font-pragati text-white text-5xl p-10">Modeler</div>

        <div>
          <div className="w-1/3 bg-zinc-500 flex flex-col py-5  m-10 rounded-xl items-center ">
            <button
              onClick={() => {
                setMenuFocus(1);
                typeRef.current = "";
              }}
              className={`hover:scale-95 transition-all ease-in-out duration-300 ${
                menuFocus === 1 ? "link-activo" : ""
              }`}
            >
              <img src={select} className="mb-8 h-8 w-8" />
            </button>

          {
            
              <button
              onClick={() => {
                typeRef.current = "arrow";
                setMenuFocus(2);
              }}
              className={`hover:scale-95 transition-all ease-in-out duration-300 ${
                menuFocus === 2 ? "link-activo" : ""
              }`}
            >
             <img src={redo} className="mb-5 h-5 w-8" />
            </button>
            
           
          }

            <button
              onClick={() => {
                typeRef.current = "identity";
                setMenuFocus(3);
              }}
              className={`hover:scale-95 transition-all ease-in-out duration-300 ${
                menuFocus === 3 ? "link-activo" : ""
              }`}
            >
              <img src={shape} className="mb-8 h-8 w-8" />
            </button>


          </div>
        </div>
      </div>

      <canvas ref={canvasRef}></canvas>

      <SidebarChat idRuta={id} />
      {
        modalEntidad && <ModalAddAttribute  addEntityElement={addEntityElement} x={clickCoords.x} 
        y={clickCoords.y} />
      }
      {
        modalTexto && <ModalAddTextAttribute setModalTexto={setModalTexto} addTextAttribute={addTextAttribute} x={clickCoords.x} 
        y={clickCoords.y}/>
      }
    </div>
  );
};

export default Project;

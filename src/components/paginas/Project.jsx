import React from "react";
import firebase from "../../firebase";
import select from "../../images/select.png";
import text from "../../images/text.png";
import newicon from "../../images/new.png";
import shape from "../../images/shape.png";
import arrow from "../../images/Arrow.png";
import redo from "../../images/redo.png";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import SidebarChat from "../ui/SidebarChat";
import { fabric } from "fabric";

const Project = () => {
  const { id } = useParams();
  const [menuFocus, setMenuFocus] = useState("");
  const canvasContainerRef = useRef(null);
  let canvas = null;
  let elementsInCanvas = [];
  const canvasRef = useRef(null);
  const typeRef = useRef(null);

  useEffect(() => {
    // Obtiene el contenedor del canvas
    const canvasContainer = canvasContainerRef.current;
    // Calcula el ancho disponible dentro del contenedor restando el ancho de la barra lateral y el menú
    const availableWidth = canvasContainer.offsetWidth;

    // Calcula el ancho disponible dentro del contenedor restando el alto de cualquier barra superior o inferior
    const availableHeight = canvasContainer.offsetHeight;
    canvas = new fabric.Canvas(canvasRef.current, {
      width: availableWidth,
      height: availableHeight,
      selection: false,
    });

    //Obtener las figuras guardas en el canvas de firebase
    const getFiguras = async () => {
      await firebase.db
        .collection("proyectos")
        .where("idProyecto", "==", id)
        .onSnapshot((querySnapshot) => {
          const figs = [];  
          querySnapshot.forEach((doc) => {
            figs.push({ ...doc.data(), id: doc.id });
          });
          
         //recorrer el arreglo de elementos y dibujarlos en el canvas
         //Limpiamos el canvas
         canvas.clear();
          figs.forEach((element) => {
            if (element.type === "text") {
              createText(element);
            } else if (element.type === "process") {
              createIdentity(element);
            }
          });
        });
    };
    getFiguras();
    canvas.on("mouse:down", function (event) {
      const pointer = canvas.getPointer(event.e);
      if (typeRef.current == "text") {
        createText(null, pointer.x, pointer.y);
      } else if (typeRef.current == "identity") {
        createIdentity(null, pointer.x, pointer.y);
      }
      console.log("Posición seleccionada:", pointer);
    });
    // Maneja el evento d para hacer zoom
    const handleWheel = (event) => {
      const delta = event.e.deltaY;
      let zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20; // Limita el zoom máximo
      if (zoom < 0.01) zoom = 0.01; // Limita el zoom mínimo
      canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);
      event.e.preventDefault();
      event.e.stopPropagation();
    };
    // Agrega el event listener para el zoom
    canvas.on("mouse:wheel", handleWheel);

    // Escucha el evento keydown del documento
    const handleKeyDown = (event) => {
      if (event.key === "Escape" || event.key === "Delete") {
        deleteSelected();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Función para eliminar elementos seleccionados
    const deleteSelected = () => {
      const activeObjects = canvas.getActiveObjects();
      activeObjects.forEach((object) => {
        canvas.remove(object);
      });
      canvas.discardActiveObject().renderAll();
    };

    return () => {
      canvas.dispose(); // Limpiar el canvas al desmontar el componente
    };
  }, []);

  //Guardar en firebase los elementos que se crearon
  const saveInFirebase = (element) => {
    firebase.db.collection("proyectos").add(element);
  };
  const updateInFirebase = async (element, data) => {
    let idCollElement = ''
        //Obtener el id del documento en la colección
          await  firebase.db.collection("proyectos")
            .where('idFigura', '==', element.idFigura)
            .get().then((querySnapshot) => {
              console.log(querySnapshot)
                    if (!querySnapshot.empty) {
                      console.log("hay algo")   
                          idCollElement = querySnapshot.docs[0].id; 
                          console.log(idCollElement)       
                    }
              })
   await firebase.db.collection("proyectos").doc(idCollElement).update(data);
  };
  const createIdentity = (draw = null, x = null, y = null) => {
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
      const { idFigura, type, idProyecto, ...figure } = draw;
      idEl = idFigura;
      rect = new fabric.Rect(figure);
      elementsInCanvas[idEl] = { ...figure, idFigura, type, idProyecto };
    } else {
      //it is a new element on the canvas
      rect = new fabric.Rect(config);
      idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
      elementsInCanvas[idEl] = { ...config, idFigura: idEl, type: "process" };
      saveInFirebase({ ...config, idFigura: idEl, type: "process", idProyecto: id });
    }
    rect.on("mouseup", () => {
      //Update in firebase
      let left = rect.left;
      let top = rect.top;
      updateInFirebase(elementsInCanvas[idEl], { top, left });
    });
    rect.on("scaling", () => {
      let scaleX = rect.scaleX;
      let scaleY = rect.scaleY;
      updateInFirebase(elementsInCanvas[idEl], { scaleX, scaleY });
    });
    rect.on("modified", () => {
      const angle = rect.angle;
      updateInFirebase(elementsInCanvas[idEl], { angle });
    });
    //rect.on("mousedblclick", () => {});
    canvas.add(rect);
  };
  const createText = (draw = null, x = null, y = null) => {
    let idEl = "";
    const config = {
      originX: "center",
      originY: "center",
      stroke: "#FFF",
      fill: "#FFF",
      fontSize: 35,
      fontFamily: "Outfit",
      left: x,
      top: y,
    };
    let txt;
    if (draw != null) {
      const { idFigura, type, text, idProyecto, ...figure } = draw;
      idEl = idFigura;
      txt = new fabric.IText(text, figure);
      elementsInCanvas[idEl] = {...figure, idFigura, type, text, idProyecto}
    } else {
      //it is a new element on the canvas
      txt = new fabric.IText("Escribe aquí", config);
      idEl = `${Date.now()}-${Math.floor(Math.random() * 100)}`;
      elementsInCanvas[idEl] = {
        ...config,
        id: idEl,
        type: "text",
        text: "Escribe aquí",
      };
      saveInFirebase({
        ...config,
        idFigura: idEl,
        type: "text",
        idProyecto: id,
        text: "Escribe aquí",
      });
    }
   /* txt.on("mouseup", () => {
      //Update in firebase
      let left = txt.left;
      let top = txt.top;
      updateInFirebase(elementsInCanvas[idEl], {top, left})
   });*/
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

    canvas.add(txt);
  };

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

            <button
              onClick={() => {
                typeRef.current = "text";
                setMenuFocus(2);
              }}
              className={`hover:scale-95 transition-all ease-in-out duration-300 ${
                menuFocus === 2 ? "link-activo" : ""
              }`}
            >
              <img src={text} className="mb-8 h-8 w-8" />
            </button>

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

            <button>
              <img src={redo} className="mb-5 h-5 w-8" />
            </button>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef}></canvas>

      <SidebarChat idRuta={id} />
    </div>
  );
};

export default Project;

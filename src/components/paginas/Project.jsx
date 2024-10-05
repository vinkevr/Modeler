import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";
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
import factory from "../../shapesFactory/shapesFactory";

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
  const attributeConfig = useRef(null);
  //Agregar texto al titulo
  const attributeTextRef = useRef("");
  //es para las flechas que se agregue con doble click
  let dbl_click = 0;
  const puntosArrow = {
    x1: "",
    y1: "",
    x2: "",
    y2: "",
  };
  const addTextAttribute = (txt) => {
    typeRef.current = "text";
    attributeTextRef.current = txt;
    setModalTexto(false);
  };
  const addEntityElement = (type, txt = "") => {
    typeRef.current = "ellipse";
    attributeConfig.current = type;
    //factory(typeRef.current, clickCoords, canvas, setModalEntidad, type);
    /*if(tipo === opcionesEntidad.RELACION){
  }
  if(tipo === opcionesEntidad.TXT){
    typeRef.current = "text";
    attributeTextRef.current = txt;
    console.log(typeRef.current)
   // createText(null, entidadInFocus.top, entidadInFocus.left, txt);
  }*/
    setModalEntidad(false);
    setEntidadInFocus({});
  };
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

    // getFiguras();
    canvas.current.on("mouse:down", function (event) {
      const pointer = canvas.current.getPointer(event.e);
      setClickCoords({ x: pointer.x, y: pointer.y });
      let modal = typeRef.current === "ellipse" ? setModalTexto : setModalEntidad;
      let options = typeRef.current === "ellipse" ? attributeConfig.current : null;
      factory(typeRef.current, pointer, canvas, modal, options);
      typeRef.current = "";
      setMenuFocus(1);

      /*      else if(typeRef.current == "ellipse"){
        createAttribute(null, pointer.x, pointer.y);
        typeRef.current = "";
        setMenuFocus(1);
       
      }else if(typeRef.current == "arrow"){
        ++dbl_click;
      
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
      }*/
    });

    // Maneja el evento d para hacer zoom
    const handleWheel = (event) => {
      const delta = event.e.deltaY;
      let zoom = canvas.current.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20; // Limita el zoom máximo
      if (zoom < 0.01) zoom = 0.01; // Limita el zoom mínimo
      canvas.current.zoomToPoint(
        { x: event.e.offsetX, y: event.e.offsetY },
        zoom
      );
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

  const createText = (
    draw = null,
    x = null,
    y = null,
    texto = null,
    update = false
  ) => {};
  const drawArrow = (draw = null, points = [], update = false) => {};

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
      {modalEntidad && (
        <ModalAddAttribute
          addEntityElement={addEntityElement}
          x={clickCoords.x}
          y={clickCoords.y}
        />
      )}
      {modalTexto && (
        <ModalAddTextAttribute
          setModalTexto={setModalTexto}
          addTextAttribute={addTextAttribute}
          x={clickCoords.x}
          y={clickCoords.y}
        />
      )}
    </div>
  );
};

export default Project;

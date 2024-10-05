import { useState } from "react";
import opcionesEntidad  from "../../helpers/opcionesEntidad.js";

const ModalAddAttribute = ({ addEntityElement, x, y }) => {
  const [showModal, setShowModal] = useState(false);
  const [entityName, setEntityName] = useState("");
  return (
    <div
      className="fixed bg-black bg-opacity-50 flex flex-col justify-center rounded-md z-50"
      style={{ top: y, left: x }}
    >
      <button
        className="text-white text-md font-semibold border-b border-b-slate-300 text-center py-2 px-3 cursor-pointer hover:bg-gray-800"
        onClick={() => {
          addEntityElement(opcionesEntidad.ATRIBUTO);
        }}
      >
        Agregar atributo
      </button>
      <button
        className="text-white text-md font-semibold border-b border-b-slate-300 text-center py-2 px-3 cursor-pointer hover:bg-gray-800"
        onClick={() => addEntityElement(opcionesEntidad.PK)}
      >
        Agregar llave primaria
      </button>
      <button
        className="text-white text-md font-semibold border-b border-b-slate-300 text-center py-2 px-3 cursor-pointer hover:bg-gray-800"
        onClick={() => addEntityElement(opcionesEntidad.RELACION)}
      >
        Agregar relacion
      </button>
      <button
        className="text-white text-md font-semibold border-b border-b-slate-300 text-center py-2 px-3 cursor-pointer hover:bg-gray-800"
        onClick={() => addEntityElement(opcionesEntidad.FK)}
      >
        Agregar llave foranea
      </button>
      <button
        className="text-white text-md font-semibold py-2 px-3 text-center cursor-pointer hover:bg-gray-800"
        onClick={() => {
          setShowModal(true);
          //addEntityElement(opcionesEntidad.TXT)
        }}
      >
        Agregar nombre a la entidad
      </button>
      {showModal && (
        <div className="fixed top-40 left-60 bg-black bg-opacity-90 flex flex-col justify-center rounded-md z-50">
          <div className="flex flex-col gap-2 p-4 ">
            <input
              type="text"
              className="w-full border border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
              placeholder="Nombre de la entidad"
              value={entityName}
              onChange={(e) => setEntityName(e.target.value.trim())}
            />
            <button
              className="bg-sky-900 rounded-lg text-white text-md font-semibold py-2 px-3 text-center cursor-pointer hover:bg-gray-800"
              onClick={() => {
                addEntityElement(opcionesEntidad.TXT, entityName);
                setShowModal(false);
              }}
            >
              Agregar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalAddAttribute;

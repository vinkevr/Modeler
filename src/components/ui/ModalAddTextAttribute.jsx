import { useState } from "react"
const ModalAddTextAttribute = ({setModalTexto, addTextAttribute}) => {
    const [txt, setTxt] = useState('')
  return (
    <div className="fixed bg-black bg-opacity-50 flex flex-col justify-center rounded-md z-50">
        <input type="text"
        className="w-full border border-gray-300 px-6 py-3 rounded-lg focus:outline-none focus:outline-blue-500 focus:shadow-outline"
        placeholder="Nombre del atributo"
        onChange={(e) => setTxt(e.target.value.trim())}
        />
        <button className="bg-sky-900 rounded-lg text-white text-md font-semibold py-2 px-3 text-center cursor-pointer hover:bg-gray-800"
        onClick={() => {
            addTextAttribute(txt)
            setModalTexto(false)
        }}
        >Agregar</button>
    </div>
  )
}

export default ModalAddTextAttribute
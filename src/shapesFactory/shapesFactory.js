import {create as createIden} from '../shapesStrategy/identity.js';
import {create as createEllipse} from '../shapesStrategy/attribute.js';
const factory = (type, pointer, canvas, setModal = null, others = null) =>{
    console.log("entra a factory con type: ", type);
    switch(type){
        case "identity":
            return createIden(pointer, canvas, setModal);
            break
        case "ellipse":
            return createEllipse(pointer, canvas, setModal, others);
            break
        case  "text":
           return "es un text";
           break
        default:
            return null;
    }
}

export default factory;
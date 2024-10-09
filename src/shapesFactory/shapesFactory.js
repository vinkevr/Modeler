import {create as createIden} from '../shapesStrategy/identity.js';
import {create as createEllipse} from '../shapesStrategy/attribute.js';
import {create as createText} from '../shapesStrategy/text.js';
const factory = (type, pointer, canvas, setModal = null, others = null) =>{
    
    switch(type){
        case "identity":
            return createIden(pointer, canvas, setModal);
            break
        case "ellipse":
            return createEllipse(pointer, canvas, setModal, others);
            break
        case  "text":
           return createText(pointer, canvas, others);
           break
        default:
            return null;
    }
}

export default factory;
import SHAPES from "../helpers/constants/shapes.js";
import {
  create as createIden,
  update as updateIden,
} from "../shapesStrategy/identity.js";
import {
  create as createEllipse,
  update as updateEllipse,
} from "../shapesStrategy/attribute.js";
import {
  create as createText,
  update as updateText,
} from "../shapesStrategy/text.js";
import {update as updateArrow} from "../shapesStrategy/arrow.js";
const factory = (
  type,
  pointer,
  canvas,
  setModal = null,
  others = null,
  userId = null,
  idProject = null
) => {
  switch (type) {
    case SHAPES.IDENTITY:
      createIden(pointer, canvas, setModal, userId, idProject);
      break;
    case SHAPES.ATTRIBUTE:
       createEllipse(
        pointer,
        canvas,
        setModal,
        others,
        userId,
        idProject
      );
      break;
    case SHAPES.TEXT:
      createText(pointer, canvas, others, userId, idProject);
      break;

    case `${SHAPES.IDENTITY}-u`:	
    updateIden(pointer, canvas, setModal); //En estos casos el pinter es la figura
      break;
    case `${SHAPES.ATTRIBUTE}-u`:
      updateEllipse(pointer, canvas, setModal);
      break;
    case `${SHAPES.TEXT}-u`:
      updateText(pointer, canvas);
      break;

      case `${SHAPES.ARROW}-u`:
        updateArrow(pointer, canvas);
        break;
    default:
      return null;
  }
};

export default factory;

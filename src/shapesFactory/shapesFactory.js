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
    case "identity":
      return createIden(pointer, canvas, setModal, userId, idProject);
      break;
    case "ellipse":
      return createEllipse(
        pointer,
        canvas,
        setModal,
        others,
        userId,
        idProject
      );
      break;
    case "text":
      return createText(pointer, canvas, others, userId, idProject);
      break;

    case "identity-u":
      return updateIden(pointer, canvas, setModal);
      break;
    case "ellipse-u":
      return updateEllipse(pointer, canvas, setModal);
      break;
    case "text-u":
      return updateText(pointer, canvas);
      break;
    default:
      return null;
  }
};

export default factory;

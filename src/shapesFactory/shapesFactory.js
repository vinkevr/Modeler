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
  create as createPolygon,
  update as updatePolygon,
} from "../shapesStrategy/relation.js";
import {
  create as createText,
  update as updateText,
} from "../shapesStrategy/text.js";
import { update as updateArrow } from "../shapesStrategy/arrow.js";
const factory = (
  type,
  pointer,
  canvas,
  setModal = null,
  others = null,
  userId = null,
  idProject = null,
  isKey = false
) => {
  switch (type) {
    case SHAPES.IDENTITY:
      createIden(pointer, canvas, setModal, userId, idProject);
      break;
    case SHAPES.ATTRIBUTE:
      createEllipse(pointer, canvas, setModal, others, userId, idProject);
      break;
    case SHAPES.Polygon:
      createPolygon(pointer, canvas, setModal, userId, idProject);
      break;
    case SHAPES.TEXT:
      createText(pointer, canvas, others, userId, idProject, isKey);
      break;

    case `${SHAPES.IDENTITY}-u`:
      updateIden(pointer, canvas, setModal); //En estos casos el pointer es la figura
      break;
    case `${SHAPES.ATTRIBUTE}-u`:
      updateEllipse(pointer, canvas, setModal);
      break;
    case `${SHAPES.Polygon}-u`:
      updatePolygon(pointer, canvas, setModal, userId, idProject);
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

import firebase from "../firebase";

//Guardar en firebase los elementos que se crearon
export const saveInFirebase = (element) => {
  firebase.db.collection("proyectos").add(element);
};

export const updateInFirebase = async (element, data) => {
  let idCollElement = "";

  //Obtener el id del documento en la colección
  await firebase.db
    .collection("proyectos")
    .where("idFigura", "==", element.idFigura)
    .get()
    .then((querySnapshot) => {
      //console.log(querySnapshot)
      if (!querySnapshot.empty) {
        idCollElement = querySnapshot.docs[0].id;
        //console.log(idCollElement)
      }
    });
    
  await firebase.db.collection("proyectos").doc(idCollElement).update(data);
};

//Obtener las figuras guardas en el canvas de firebase
export const getFiguras = async () => {
  await firebase.db
    .collection("proyectos")
    .where("idProyecto", "==", id)
    .onSnapshot((querySnapshot) => {
      //Entrando al proyecto por primera vez
      if (canvas.current.getObjects().length == 0) {
        //insertar los elementos en el canvas
        //Primero pintar los que sean diferente de texto
        querySnapshot.forEach((doc) => {
          if (doc.data().type === "ellipse") {
            createAttribute({ ...doc.data(), id: doc.data().idFigura });
          } else if (doc.data().type === "process") {
            createIdentity({ ...doc.data(), id: doc.data().idFigura });
          } else if (doc.data().type === "arrow") {
            drawArrow({ ...doc.data(), id: doc.data().idFigura });
          }
        });
        //Pintar los textos
        querySnapshot.forEach((doc) => {
          if (doc.data().type === "text") {
            createText({ ...doc.data(), id: doc.data().idFigura });
          }
        });
      }
      //Hacer otra validacion de que este lleno pero no este el objeto porque es nuevo
      else {
        let fireb = [];
        querySnapshot.forEach((doc) => {
          fireb.push(doc.data());
        });

        let canvasObjects = canvas.current.getObjects().map((obj) => obj.id);
        fireb.forEach((obj) => {
          //Verificar si el objeto ya esta en el canvas, solo para modificar su posición y no pintarlo dos veces
          if (canvasObjects.includes(obj.idFigura)) {
            if (obj.type === "text") {
              createText(
                { ...obj, id: obj.idFigura },
                null,
                null,
                obj.text,
                true
              );
            } else if (obj.type === "process") {
              createIdentity({ ...obj, id: obj.idFigura }, null, null, true);
            } else if (obj.type === "ellipse") {
              createAttribute({ ...obj, id: obj.idFigura }, null, null, true);
            } else if (obj.type === "arrow") {
              drawArrow({ ...obj, id: obj.idFigura }, [], true);
            }
          }
          //Pintar por primera vez al nuevoa objeto
          else {
            if (obj.type === "text") {
              print("es un nuevo texto");
              createText({ ...obj, id: obj.idFigura });
            } else if (obj.type === "process") {
              createIdentity({ obj, id: obj.idFigura });
            } else if (obj.type === "ellipse") {
              createAttribute({ ...obj, id: obj.idFigura });
            } else if (obj.type === "arrow") {
              drawArrow({ ...obj, id: obj.idFigura });
            }
          }
        });
      }
    }); //fin del snapshot
};

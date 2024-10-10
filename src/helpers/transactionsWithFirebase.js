import firebase from "../firebase";
import factory from "../shapesFactory/shapesFactory.js";
//Guardar en firebase los elementos que se crearon
export const saveInFirebase = (element) => {
  firebase.db.collection("proyectos").add(element);
};

export const updateInFirebase = async (element, data) => {
  let idCollElement = "";

  //Obtener el id del documento en la colección
  await firebase.db
    .collection("proyectos")
    .where("idShape", "==", element.idFigura)
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
export const getFigurasFirstTime = async (canvas, proyectoId, userId, setModalEntidad, setModalTexto) => {

  if (canvas.current.getObjects().length == 0) {
    await firebase.db
      .collection("proyectos")
      .where("idProyecto", "==", proyectoId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().type !== "text") {
            let data = doc.data();
            let modal = data.type === "process" ? setModalEntidad : setModalTexto;
            factory(`${data.type}-u`, data, canvas, modal);
          } 
        });
        //Pintar los textos
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          if (data.type === "text") {
            factory(`${data.type}-u`, data, canvas, modal);
          }
        });
      });
  }

  //Cambios en el canvas para actualizar las figuras a los demas usuarios
  await firebase.db
    .collection("proyectos")
    .where("idProyecto", "==", proyectoId)
    .onSnapshot((querySnapshot) => {

      querySnapshot.docChanges().forEach((change) => {
        //Pintar el agregado solo a los usuarios que son diferentes al que lo creo
        if (change.type === "added") {
          const data = change.doc.data();
          if ( data.userCreator !== userId) 
          {
            factory(`${data.type}-u`, data, canvas, modal);
          }
        }
        if (change.type === "modified") {
          const data = change.doc.data();
          if ( data.userCreator !== userId) 
          {
            //buscar el objeto en el canvas
            const obj = canvas.current.getObjects().find((obj) => obj.id === data.idShape);
            if (obj) {
              obj.set(data);
              canvas.current.renderAll();
            }
          }
        }
      });
    });
};

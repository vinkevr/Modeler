export const formatearNombre = (nombre) => {
    const nombreArray = nombre.split(' ');
    return nombreArray.length > 1 ? `${nombreArray[0].split('')[0]}${nombreArray[1].split('')[0]}` : nombreArray[0].split('')[0];
}

const path = require('path')
const { v4: uuidv4 } = require('uuid')

const subirArchivo = (files, extensionesPermitidas = ['png', 'jpg', 'jpeg', 'gif'],carpeta='') => {
    return new Promise((resolve, reject) => {

        let uploadPath
        // if(files==null){
        //     return reject('no hay un archivo en la peticion')
        // }
        const { archivo } = files
        //? __dirname apunta a la carpeta controller
        const nombreCortado = archivo.name.split('.')//?cortar el nombre cada vez que vea un punto
        const extension = nombreCortado[nombreCortado.length - 1]//?la extension estara en la ultima posicion del arreglo
        ///? validar contra las extension que se requiere

        if (!extensionesPermitidas.includes(extension)) {
            return reject(`la extension no es valida, validas: ${extensionesPermitidas}`)

        }

        const nombreTemp = uuidv4() + '.' + extension
        uploadPath = path.join(__dirname, '../uploads/'+carpeta, nombreTemp)//?dirname path donde estoy, a donde quiero moverme,nombre del archivo, la carpeta es si es que quiere añadir otra carpeta

        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err)
                return reject(err)
            }

            //?resolve('archivo subido en: ' + uploadPath)
            resolve(nombreTemp)

        })

    })


}

module.exports = {
    subirArchivo
}
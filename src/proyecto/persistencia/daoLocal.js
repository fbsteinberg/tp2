function crearDaoLocal(){
    const daoLocal = {
        getById: (id) => {
            console.log('local encontrado!')
            return { id, nombre:'Rapipago'}
        },
        getPropetarioById: (id) => {
            console.log('Propetario encontrado!')
            return { id, nombre:'Jose', apellido:'Perez', email:'joseperez@gmail.com'}
        }
    }

    return daoLocal
}

export { crearDaoLocal }
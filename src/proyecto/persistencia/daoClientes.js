const crearDaoClientes = () => {
    const clientes = [
        {
            id: 0,
            nombre: 'Lorem',
            email: 'lorem@ipsum.com.ar',
            dni: 39232133
        }
    ];
  
    return {
        add: async (cliente) => {
            clientes.push(cliente);
        },
        addUnique: (cliente, claveUnica) => {
            const existe = clientes.some(e => e[claveUnica] === cliente[claveUnica]);
            if (existe) {
                return { added: 0 };
            } else {
                clientes.push(cliente);
                return { added: 1 };
            }
        },
        getById: async (id) => {
            return clientes.find(e => e.id === id);
        },
        getByDni: async (dni) => {
            return clientes.find(e => e.dni === dni);
        }
    }
}
  
export { crearDaoClientes };

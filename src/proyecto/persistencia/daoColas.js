const crearDaoColas = () => {
    const colas = [
        {
            id: 0,
            nombre: 'Rapipago',
            cantidad: 30,
            horarioMin: 12,
            horarioMax: 18,
            clientes: []
        }
    ];
  
    return {
        add: async (cola) => {
            colas.push(cola);
        },
        getById: async (id) => {
            return colas.find(e => e.id === id);
        },
        addClient: async (id, cliente) => {
            const index = colas.findIndex(e => e.id == id);
            if (index === -1) {
                return { updated: 0 };
            } else {
                colas[index].clientes.push(cliente);
                return { updated: 1 };
            }
        },
        removeFirstClient: async (id) => {
            const index = colas.findIndex(e => e.id == id);
            if (index === -1) {
                return { updated: 0 };
            } else {
                colas[index].clientes.shift();
                return { updated: 1 };
            }
        }
    }
}
  
export { crearDaoColas };

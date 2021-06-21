const crearDaoLocal = () => {
    const locales = [
        {
            id: 0,
            nombre: 'Rapipago',
            cantidad: 30,
            horarioMin: 12,
            horarioMax: 18,
            clientes: []
        }
    ];

    const daoLocal = {
        add: (local) => {
            locales.push(local);
        },
        addUnique: (local, claveUnica) => {
            const existe = locales.some(e => e[claveUnica] === local[claveUnica]);
            if (existe) {
                return { added: 0 };
            } else {
                locales.push(local);
                return { added: 1 };
            }
        },
        getById: (id) => {
            return locales.find(e => e.id === id);
        },
        addClient: (id, cliente) => {
            const index = locales.findIndex(e => e.id == id);
            if (index === -1) {
                return { updated: 0 };
            } else {
                locales[index].clientes.push(cliente);
                return { updated: 1 };
            }
        },
        removeFirstClient: (id) => {
            const index = locales.findIndex(e => e.id == id);
            if (index === -1) {
                return { updated: 0 };
            } else {
                locales[index].clientes.shift();
                return { updated: 1 };
            }
        }
    }

    return daoLocal;
}

export { crearDaoLocal };
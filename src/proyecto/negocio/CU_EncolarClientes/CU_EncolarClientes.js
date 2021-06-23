/**
 * Caso de uso:
 * 
 * Como cliente quiero poder agregarme a una cola de turnos de un local
 */
const generarEncolarCliente = async (daoClientes, daoLocal, enviadorMail) => {
    return {
        agregar: async ({ idCliente, idLocal }) => {
            const cliente = await daoClientes.getById(idCliente);
            console.log(`Cliente encontrado!`);

            const local = await daoLocal.getById(idLocal);
            console.log(`Local encontrado!`);

            await daoLocal.addClient(idLocal, cliente);
            console.log(`Usuario ${cliente.nombre} agregado a la cola del local ${local.id} - ${local.nombre}`);

            
            const responseEmail = await enviadorMail.sendEmail(cliente.email, `Local: ${local.nombre}`, `Se ha agregado exitosamente para la cola del local ${local.nombre}`);
            const { response } = responseEmail;

            console.log(`Mail enviado exitosamente: ${response}`);
        }
    };
};

export default generarEncolarCliente;

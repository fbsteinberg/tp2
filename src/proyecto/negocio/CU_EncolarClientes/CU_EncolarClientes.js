/**
 * Caso de uso:
 * 
 * Como cliente quiero poder a traves de un QR generado, poder agregarme a una cola de turnos
 */
const generarEncolarCliente = async (daoClientes, daoColas, enviadorMail, generadorQR) => {
    await generadorQR.generar({
        archivo: 'output.png',
        texto: '1',
        ancho: 600,
        margen: 2, 
        colorQR: '#000',
        colorFondo: '#fff'
    });

    return {
        agregar: async ({ idCliente, idCola }) => {
            const cliente = await daoClientes.getById(idCliente);
            console.log(`Cliente encontrado!`);

            const cola = await daoColas.getById(idCola);
            console.log(`Cola encontrada!`);

            await daoColas.addClient(idCola, cliente);
            console.log(`Usuario ${cliente.nombre} agregado a la cola ${cola.id} - ${cola.nombre}`);

            const responseEmail = await enviadorMail.sendEmail(cliente.email, `Cola: ${cola.nombre}`, `Se ha agregado exitosamente para la cola de ${cola.nombre}`);
            const { response } = responseEmail;

            console.log(`Mail enviado exitosamente: ${response}`);
        }
    };
};

export default generarEncolarCliente;

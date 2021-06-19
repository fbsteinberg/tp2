import nodemailer from 'nodemailer';

/**
 * Modulo de envio de mails
 * 
 * @param {string} userEmail - Email del usuario emisor
 * @param {string} password - Password del usuario emisor
 */
const generadorMail = (userEmail, password, host, port) => {
    const transporter = nodemailer.createTransport({
        host,
        port,
        secure: false,
        auth: {
            user: userEmail,
            pass: password,
        }
    });

    return {
        sendEmail: async (to, subject, description) => {
            try {
                console.log('Enviando mail...')
                const res = await transporter.sendMail({
                    from: userEmail,
                    to,
                    subject,
                    html: description
                });
                
                return res;
            } catch(e) {
                throw new Error(e);
            }
        }
    };
};

export default generadorMail;

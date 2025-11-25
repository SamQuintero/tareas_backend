import { Request, Response, text } from "express";
import mailer from './model';
import {Options} from 'nodemailer/lib/mailer';

export async function sendEmail(req: Request, res: Response){
    const mailOptions = {
        from: process.env.GMAIL_ADRESS ,
        to: req.query.email as string,
        subject: 'Carta a Santa (aka Profe)',
        template: "email",
        context:{
            nombre: "Profe Francisco Sevilla",
            yo: "Sam Quintero"
        }
      };

    try {
        const mailerInstance = await mailer;
        await mailerInstance.sendMail(mailOptions);
        res.send({message: 'Email sent'});
    } catch (error) {
        res.status(500).send({message: 'Error sending email'});
    }
};
import nodemailer from 'nodemailer';


export const createTransport = (...args) => {
  const transporter = nodemailer.createTransport(...args);
  transporter.sendMail()

}

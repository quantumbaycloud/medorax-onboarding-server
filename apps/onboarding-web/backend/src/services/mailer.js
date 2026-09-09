import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

const transporter = env.smtp.host && env.smtp.user && env.smtp.pass
  ? nodemailer.createTransport({ host: env.smtp.host, port: env.smtp.port, secure: env.smtp.port === 465, auth: { user: env.smtp.user, pass: env.smtp.pass } })
  : null;

export async function sendLinkEmail({ to, subject, text, html }) {
  if (!transporter) {
    console.log(`\n[DEV EMAIL] ${subject} -> ${to}\n${text}\n`);
    return { dev: true };
  }
  return transporter.sendMail({ from: env.smtp.from, to, subject, text, html });
}

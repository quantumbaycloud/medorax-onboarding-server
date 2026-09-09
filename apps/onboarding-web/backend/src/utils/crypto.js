import crypto from 'node:crypto';

export const randomToken = () => crypto.randomBytes(48).toString('base64url');
export const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');
export const randomOtp = () => String(Math.floor(100000 + Math.random() * 900000));

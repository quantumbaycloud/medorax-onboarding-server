import { prisma } from '../config/prisma.js';
import { randomOtp } from '../utils/crypto.js';
import { hashToken } from '../utils/crypto.js';

export async function createMobileOtp({ mobileNumber, userId }) {
  const otp = randomOtp();
  const sessionId = cryptoRandomId();
  await prisma.mobileOtp.create({ data: { sessionId, mobileNumber, userId, otpHash: hashToken(otp), expiresAt: new Date(Date.now() + 5 * 60 * 1000) } });
  console.log(`[DEV OTP] ${mobileNumber}: ${otp}`);
  return { sessionId, otp };
}
function cryptoRandomId() { return `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`; }

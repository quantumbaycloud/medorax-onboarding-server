import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.js';
import { prisma } from '../config/prisma.js';
import { randomToken, hashToken } from './crypto.js';

export const publicUser = (u) => ({
  userId: u.id,
  fullName: u.fullName,
  email: u.email,
  mobileNumber: u.mobileNumber,
  role: u.role,
  emailVerified: u.emailVerified,
  mobileVerified: u.mobileVerified,
  businessType: u.businessType,
  onboardingStatus: u.onboardingStatus,
  selectedPlan: u.selectedPlan,
  paymentMethod: u.paymentMethod
});

export const signAccessToken = (user) => jwt.sign(
  { sub: user.id, email: user.email, role: user.role },
  env.accessSecret,
  { expiresIn: env.accessExpires, issuer: 'MEDORAX', audience: 'MEDORAX' }
);

export const verifyAccessToken = (token) => jwt.verify(token, env.accessSecret, { issuer: 'MEDORAX', audience: 'MEDORAX' });

export const issueRefreshToken = async (userId) => {
  const raw = randomToken();
  const expiresAt = new Date(Date.now() + env.refreshDays * 86400000);
  await prisma.refreshToken.create({ data: { tokenHash: hashToken(raw), userId, expiresAt } });
  return raw;
};

export const rotateRefreshToken = async (raw) => {
  const token = await prisma.refreshToken.findUnique({ where: { tokenHash: hashToken(raw) } });
  if (!token || token.revokedAt || token.expiresAt < new Date()) return null;
  await prisma.refreshToken.update({ where: { id: token.id }, data: { revokedAt: new Date() } });
  return issueRefreshToken(token.userId);
};

export const setAuthCookies = (res, accessToken, refreshToken) => {
  const base = { httpOnly: true, secure: env.cookieSecure, sameSite: 'lax', domain: env.cookieDomain, path: '/' };
  res.cookie('access_token', accessToken, { ...base, maxAge: 15 * 60 * 1000 });
  res.cookie('refresh_token', refreshToken, { ...base, maxAge: env.refreshDays * 86400000 });
};

export const clearAuthCookies = (res) => {
  const base = { httpOnly: true, secure: env.cookieSecure, sameSite: 'lax', domain: env.cookieDomain, path: '/' };
  res.clearCookie('access_token', base);
  res.clearCookie('refresh_token', base);
};

export const passwordHash = (password) => bcrypt.hash(password, 12);
export const passwordMatches = (password, hash) => bcrypt.compare(password, hash);

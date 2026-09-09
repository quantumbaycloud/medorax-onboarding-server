import { prisma } from '../config/prisma.js';
import { env } from '../config/env.js';
import { passwordHash, passwordMatches, publicUser, signAccessToken, issueRefreshToken, rotateRefreshToken, setAuthCookies, clearAuthCookies } from '../utils/auth.js';
import { hashToken, randomToken } from '../utils/crypto.js';
import { sendLinkEmail } from '../services/mailer.js';
import { createMobileOtp } from '../services/otp.js';

export async function register(req, res) {
  const { fullName, email, mobileNumber, password, confirmPassword } = req.body;
  if (!fullName || !email || !mobileNumber || !password || password !== confirmPassword) return res.status(400).json({ message: 'All fields are required and passwords must match.' });
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await prisma.user.findFirst({ where: { OR: [{ email: normalizedEmail }, { mobileNumber: mobileNumber.trim() }] } });
  if (existing) return res.status(409).json({ message: 'An account with this email or mobile number already exists.' });
  const user = await prisma.user.create({ data: { fullName: fullName.trim(), email: normalizedEmail, mobileNumber: mobileNumber.trim(), passwordHash: await passwordHash(password) } });
  const token = randomToken();
  await prisma.verificationToken.create({ data: { tokenHash: hashToken(token), userId: user.id, expiresAt: new Date(Date.now() + 24 * 3600000) } });
  const link = `${env.frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;
  await sendLinkEmail({ to: user.email, subject: 'Verify your MEDORAX account', text: `Verify your account: ${link}`, html: `<p>Verify your MEDORAX account:</p><p><a href="${link}">${link}</a></p>` });
  res.status(201).json({ message: 'Registration successful. Please verify your email.', user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: String(email || '').trim().toLowerCase() } });
  if (!user || !(await passwordMatches(password || '', user.passwordHash))) return res.status(401).json({ message: 'Invalid email or password.' });
  const accessToken = signAccessToken(user);
  const refreshToken = await issueRefreshToken(user.id);
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ user: publicUser(user), accessToken, refreshToken, expiresIn: 900 });
}

export async function refresh(req, res) {
  const raw = req.cookies.refresh_token || req.body.refreshToken;
  if (!raw) return res.status(401).json({ message: 'Refresh token required.' });
  const rotated = await rotateRefreshToken(raw);
  if (!rotated) return res.status(401).json({ message: 'Invalid or expired refresh token.' });
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash: hashToken(rotated) } });
  const user = await prisma.user.findUnique({ where: { id: stored.userId } });
  const accessToken = signAccessToken(user);
  setAuthCookies(res, accessToken, rotated);
  res.json({ user: publicUser(user), accessToken, refreshToken: rotated, expiresIn: 900 });
}

export async function logout(req, res) {
  const raw = req.cookies.refresh_token || req.body.refreshToken;
  if (raw) await prisma.refreshToken.updateMany({ where: { tokenHash: hashToken(raw), revokedAt: null }, data: { revokedAt: new Date() } });
  clearAuthCookies(res);
  res.json({ message: 'Logged out successfully.' });
}

export async function me(req, res) { res.json({ user: publicUser(req.user) }); }

export async function verifyEmail(req, res) {
  const { token } = req.body;
  const record = await prisma.verificationToken.findUnique({ where: { tokenHash: hashToken(String(token || '')) } });
  if (!record || record.usedAt || record.expiresAt < new Date()) return res.status(400).json({ message: 'Invalid or expired verification token.' });
  const user = await prisma.user.update({ where: { id: record.userId }, data: { emailVerified: true, onboardingStatus: 'MOBILE_PENDING' } });
  await prisma.verificationToken.update({ where: { id: record.id }, data: { usedAt: new Date() } });
  res.json({ message: 'Email verified successfully.', user: publicUser(user) });
}

export async function resendVerification(req, res) {
  const email = String(req.body.email || '').trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: 'No account found for this email.' });
  if (user.emailVerified) return res.json({ message: 'Email is already verified.' });
  const token = randomToken();
  await prisma.verificationToken.create({ data: { tokenHash: hashToken(token), userId: user.id, expiresAt: new Date(Date.now() + 24 * 3600000) } });
  const link = `${env.frontendUrl}/verify-email?token=${encodeURIComponent(token)}`;
  await sendLinkEmail({ to: email, subject: 'Verify your MEDORAX account', text: link, html: `<a href="${link}">Verify email</a>` });
  res.json({ message: 'Verification email sent.' });
}

export async function forgotPassword(req, res) {
  const email = String(req.body.email || '').trim().toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const token = randomToken();
    await prisma.passwordResetToken.create({ data: { tokenHash: hashToken(token), userId: user.id, expiresAt: new Date(Date.now() + 30 * 60 * 1000) } });
    const link = `${env.frontendUrl}/reset-password?token=${encodeURIComponent(token)}`;
    await sendLinkEmail({ to: email, subject: 'Reset your MEDORAX password', text: link, html: `<a href="${link}">Reset password</a>` });
  }
  res.json({ message: 'If the email exists, a password reset link has been sent.' });
}

export async function resetPassword(req, res) {
  const { token, newPassword, confirmPassword } = req.body;
  if (!newPassword || newPassword !== confirmPassword) return res.status(400).json({ message: 'Passwords must match.' });
  const record = await prisma.passwordResetToken.findUnique({ where: { tokenHash: hashToken(String(token || '')) } });
  if (!record || record.usedAt || record.expiresAt < new Date()) return res.status(400).json({ message: 'Invalid or expired reset token.' });
  await prisma.user.update({ where: { id: record.userId }, data: { passwordHash: await passwordHash(newPassword) } });
  await prisma.passwordResetToken.update({ where: { id: record.id }, data: { usedAt: new Date() } });
  await prisma.refreshToken.updateMany({ where: { userId: record.userId, revokedAt: null }, data: { revokedAt: new Date() } });
  res.json({ message: 'Password reset successfully.' });
}

export async function sendMobileOtp(req, res) {
  const mobileNumber = String(req.body.mobileNumber || '').trim();
  if (!mobileNumber) return res.status(400).json({ message: 'Mobile number is required.' });
  const user = req.user || await prisma.user.findUnique({ where: { mobileNumber } });
  const { sessionId } = await createMobileOtp({ mobileNumber, userId: user?.id });
  res.json({ message: 'OTP sent successfully.', sessionId, expiresIn: 300 });
}

export async function verifyMobileOtp(req, res) {
  const { mobileNumber, sessionId, otp } = req.body;
  const record = await prisma.mobileOtp.findUnique({ where: { sessionId } });
  if (!record || record.mobileNumber !== mobileNumber || record.expiresAt < new Date() || record.verifiedAt || record.attempts >= 5 || record.otpHash !== hashToken(String(otp || ''))) return res.status(400).json({ message: 'Invalid or expired OTP.' });
  await prisma.mobileOtp.update({ where: { id: record.id }, data: { verifiedAt: new Date(), attempts: { increment: 1 } } });
  const user = await prisma.user.findUnique({ where: { mobileNumber } });
  const verifiedUser = user ? await prisma.user.update({ where: { id: user.id }, data: { mobileVerified: true, onboardingStatus: 'BUSINESS_TYPE_PENDING' } }) : null;
  res.json({ message: 'Mobile number verified successfully.', verified: true, user: verifiedUser ? publicUser(verifiedUser) : undefined });
}

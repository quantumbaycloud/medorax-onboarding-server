import { prisma } from '../config/prisma.js';
import { verifyAccessToken } from '../utils/auth.js';

export async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.access_token || (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ message: 'Authentication required.' });
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(401).json({ message: 'User not found.' });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired access token.' });
  }
}

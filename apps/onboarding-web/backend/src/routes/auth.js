import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as c from '../controllers/auth.js';
import { requireAuth } from '../middleware/auth.js';
const r=Router();
const authLimit=rateLimit({windowMs:15*60*1000,max:50,standardHeaders:true,legacyHeaders:false});
r.post('/register',authLimit,c.register);r.post('/login',authLimit,c.login);r.post('/refresh',c.refresh);r.post('/logout',c.logout);r.get('/me',requireAuth,c.me);r.post('/verify-email',c.verifyEmail);r.post('/resend-verification',c.resendVerification);r.post('/forgot-password',authLimit,c.forgotPassword);r.post('/reset-password',authLimit,c.resetPassword);r.post('/send-mobile-otp',authLimit,c.sendMobileOtp);r.post('/verify-mobile-otp',authLimit,c.verifyMobileOtp);r.get('/google',(req,res)=>res.status(501).json({message:'Google OAuth is not configured yet.'}));r.get('/sso',(req,res)=>res.status(501).json({message:'SSO is not configured yet.'}));export default r;

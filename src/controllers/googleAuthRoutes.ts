import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: "/login",
    session: false
  }),
  (req, res) => {
    // Aquí puedes generar el token
    const user = req.user as any;
    const token = jwt.sign({
      roleId: user.id,
      roleName: user.role?.name || 'user',
      user: user.name
    }, process.env.JWT_SECRET!, { expiresIn: '5h' });

    res.redirect(`http://localhost:5173/oauth-callback?token=${token}`);
  });

export default router;

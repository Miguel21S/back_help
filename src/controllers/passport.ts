
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Users } from '../entities/models/Users.model';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            if (!profile.emails || profile.emails.length === 0) {
                return done(new Error('No email found in Google profile'), false);
            }

            const existingUser = await Users.findOne({ where: { email: profile.emails[0].value } });

            if (existingUser) {
                return done(null, existingUser);
            }

            const newUser = await Users.create({
                name: profile.name?.givenName || 'NoName',
                lastName: profile.name?.familyName || '',
                email: profile.emails[0].value,
                gender: 'Not Specified',
                password: 'GOOGLE_AUTH',
                // role: { id: 2 }
            }).save();

            return done(null, newUser);
        } catch (error) {
            return done(error, false); // ← aquí el fix importante
        }
    }));


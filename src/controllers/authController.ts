import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { Users } from "../entities/models/Users.model";
import { badRequestError, conflictError, notFoundError } from "../core/utils/errorsStatusCodes";
import { validEmail, validPassword } from "../entities/reusableComponents/reusableComponents";

///////////////////////////// METHOD REGISTER //////////////////////////
const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, lastName, email, gender, password } = req.body;
        const comparePassword = req.body.comparePassword;

        if (password !== comparePassword) { throw new badRequestError("Passwords do not match") }

        if (!name || !lastName || !email || !gender || !password) {
            throw new badRequestError("All fields are required: name, lastName, email, date_born, gender, password")
        }

        if (password.length < 8) { throw new notFoundError('Password must be longer than 8 characters') }

        if (!validPassword(password)) {
            throw new notFoundError('Password must include at least one digit, one special character, one uppercase letter, one lowercase letter, and no spaces.')
        }
    
        if (!validEmail(email)) { throw new badRequestError('Invalid email format') }

        const user = await Users.findOne({ where: { email } });
        if (email === user?.email) { throw new conflictError('Email already exists') }

        const passwordEcrypted = bcrypt.hashSync(password, 10);

        if (gender !== 'Hombre' && gender !== 'Man' &&
            gender !== 'Male' && gender !== 'Masculino' &&
            gender !== 'Mujer' && gender !== 'Masculina' &&
            gender !== 'Women' && gender !== 'Female'
        ) {
            throw new badRequestError('Gender must be either Male or Female');
        }

        let genderFormatted;
        if (gender === 'Hombre' || gender === 'Man' || gender === 'Male' || gender === 'Masculino') {
            genderFormatted = 'MALE';
        }

        if (gender === 'Mujer' || gender === 'Masculina' || gender === 'Women' || gender === 'Female') {
            genderFormatted = 'FEMALE';
        }

        await Users.create(
            {
                name,
                lastName,
                email,
                gender: genderFormatted,
                password: passwordEcrypted,
                role: {
                    id: 6
                }
            }
        ).save();

        res.status(200).json({
            success: true,
            message: 'User created successfully'
        });
    } catch (error) {
        next(error);
    }
}


///////////////////////////// METHOD LOGIN //////////////////////////
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email
        const password = req.body.password;

        if (!email || !password) { throw new notFoundError('Email and password are required') }

        const user = await Users.findOne({
            where: {
                email: email
            },
            relations: {
                role: true
            },
            select: {
                id: true,
                name: true,
                lastName: true,
                email: true,
                password: true,
                isActive: true
            }
        })
        if (!user) { throw new badRequestError('Invalid email or password') }

        const validPassword = await bcrypt.compare(password, user!.password);
        if (!validPassword) { throw new badRequestError('Invalid email or password') }

        if (!user?.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Tu cuenta está desactivada. Contacta al soporte.'
            });
        }

        const token = Jwt.sign(
            {
                userId: user.id,
                user: user?.name,
                roleId: user.role.id,
                roleName: user?.role.name,
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: '5h'
            }
        )

        await Users.update(user?.id, { last_login: new Date() })

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token: token
        })
    } catch (error) {
        next(error)
    }
}

export { register, login };
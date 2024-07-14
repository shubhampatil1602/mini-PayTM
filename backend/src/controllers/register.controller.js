import { User } from '../models/user.model.js';
import { Account } from '../models/account.model.js';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const userRegisterZodSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
});

const register = async (req, res) => {
  const { username, password, firstName, lastName } = req.body;
  const validateBody = userRegisterZodSchema.safeParse({
    username,
    password,
    firstName,
    lastName,
  });

  if (!validateBody.success) {
    return res.status(400).json({
      msg: 'Incorrect inputs',
    });
  }

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({
        msg: 'User already exists',
      });
    }

    const newUser = await User.create({
      username,
      password,
      firstName,
      lastName,
    });

    await Account.create({
      userId: newUser._id,
      balance: 1 + Math.round(Math.random() * 10000),
    });

    const token = jwt.sign(
      {
        userId: newUser._id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '3h',
      }
    );

    return res.status(201).json({
      msg: `Welcome ${firstName}!`,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

export default register;

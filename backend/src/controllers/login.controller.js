import { User } from '../models/user.model.js';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const userLoginZodSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

const login = async (req, res) => {
  const { username, password } = req.body;
  const validateBody = userLoginZodSchema.safeParse({
    username,
    password,
  });

  if (!validateBody.success) {
    return res.status(400).json({
      msg: '"Email already taken / Incorrect inputs"',
    });
  }

  try {
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(400).json({
        msg: 'User not exists. Create an account!',
      });
    }

    const token = jwt.sign(
      {
        userId: userExists._id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '3h',
      }
    );

    return res.status(201).json({
      msg: `Welcome back, ${userExists.firstName}!`,
      token,
      userId: userExists._id,
      username: userExists.username,
      firstName: userExists.firstName,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

export default login;

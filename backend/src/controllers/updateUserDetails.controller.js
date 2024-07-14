import { z } from 'zod';
import { User } from '../models/user.model.js';

const updateUserDetailsSchema = z.object({
  password: z.string().min(6).optional(),
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
});

const updateUserDetails = async (req, res) => {
  const { success } = updateUserDetailsSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: 'Error while updating information',
    });
  }
  const userId = req.userId;
  try {
    await User.updateOne(
      {
        _id: userId,
      },
      req.body
    );
    res.json({
      message: 'Updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error while updating information',
    });
  }
};

export default updateUserDetails;

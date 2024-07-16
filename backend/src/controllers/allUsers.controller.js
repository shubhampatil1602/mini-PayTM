import { User } from '../models/user.model.js';

const allUsers = async (req, res) => {
  const filter = req.query.filter || '';
  try {
    const users = User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    res.json({
      user: (await users).map((user) => ({
        id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt.toDateString(),
        updatedAt: user.updatedAt.toLocaleDateString(),
      })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error while getting all users',
    });
  }
};

export default allUsers;

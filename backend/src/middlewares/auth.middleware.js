import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      msg: 'Auth token missing.',
    });
  }

  const token = authorization.split(' ')[1];

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (verifyToken.userId) {
      req.userId = verifyToken.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'Invalid token.' });
  }
};

export default auth;

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization required' });
  }

  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.NEXT_PUBLICJWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


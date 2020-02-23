const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

module.exports = async (req, res, next) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).json({ msg: 'Unauthorized' });

  try {
    await jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};

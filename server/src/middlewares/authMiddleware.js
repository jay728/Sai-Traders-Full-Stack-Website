import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (request, response, next) => {
  try {
    const token = request.headers.authorization?.startsWith('Bearer ') ? request.headers.authorization.split(' ')[1] : null;
    if (!token) return response.status(401).json({ success: false, message: 'Authentication is required.' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return response.status(401).json({ success: false, message: 'User account not found.' });
    request.user = user;
    next();
  } catch (error) {
    response.status(401).json({ success: false, message: 'Invalid or expired authentication token.' });
  }
};

import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authencticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError('authencation invalid');

  try {
    const { userId, role } = verifyJWT(token);
    req.user = { userId, role };

    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};

const jsonWebToken = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

/* const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(new AuthError('Authorization required'));
  }
  req.user = payload;

  next();
};
module.exports = auth; */

module.exports = (req, res, next) => {
  // console.log(`Это req: ${JSON.stringify(req.headers)}`);
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Authorization required');
  }
  // извлечём токен
  // console.log(`Это authorization2: ${JSON.stringify(authorization)}`);
  const jwt = authorization.replace('Bearer ', '');
  let payload;
  try {
    // попытаемся верифицировать токен
    payload = jsonWebToken.verify(jwt, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
    // console.log(`Это payload: ${JSON.stringify(payload)}`);
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new AuthError('Authorization required');
  }
  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

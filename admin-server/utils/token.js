// 引入token
const jwt = require('jsonwebtoken');

const secretOrPublicKey = 'abc'; //公钥 可以自己生成
const expiresIn = 60 * 60;

const createToken = ({ _id, username }) => {
  const token = jwt.sign({ _id, username }, secretOrPublicKey, { expiresIn });
  return token;
}

const verifyToken = (_token) => {
  let verify = jwt.verify(_token, secretOrPublicKey, (error, decoded) => {
    if (error) {
      return "Token Invalid";
    }
    return decoded;
  });
  return verify;
};

exports.createToken = createToken;
exports.verifyToken = verifyToken;
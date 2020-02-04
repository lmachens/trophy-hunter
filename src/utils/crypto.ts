import crypto from 'crypto';

const iterations = 2048;
const keylen = 32;
const digest = 'sha512';

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString('hex');

  return [salt, hash].join('$');
}

export function verifyHash(password, original) {
  const [salt, originalHash] = original.split('$');
  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString('hex');

  return hash === originalHash;
}

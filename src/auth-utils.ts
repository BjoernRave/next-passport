import * as crypto from 'crypto';
import { nanoid } from 'nanoid';
import SecurePasswordLib from 'secure-password';
import { AuthenticationError } from './errors';

export const hash256 = (input: string = '') =>
  crypto.createHash('sha256').update(input).digest('hex');

export const generateToken = (numberOfCharacters: number = 32) =>
  nanoid(numberOfCharacters);

const SP = () => new SecurePasswordLib();

export const SecurePassword = {
  ...SecurePasswordLib,
  async hash(password: string | null | undefined) {
    if (!password) {
      throw new AuthenticationError();
    }
    const hashedBuffer = await SP().hash(Buffer.from(password));
    return hashedBuffer.toString('base64');
  },
  async verify(
    hashedPassword: string | null | undefined,
    password: string | null | undefined
  ) {
    if (!hashedPassword || !password) {
      throw new AuthenticationError();
    }
    try {
      const result = await SP().verify(
        Buffer.from(password),
        Buffer.from(hashedPassword, 'base64')
      );
      // Return result for valid results.
      switch (result) {
        case SecurePassword.VALID:
        case SecurePassword.VALID_NEEDS_REHASH:
          return result;
      }
      // For everything else throw AuthenticationError
      throw new AuthenticationError();
    } catch (error) {
      // Could be error like failed to hash password
      throw new AuthenticationError();
    }
  },
};

export const hashPassword = async (password: string) => {
  const hashedBuffer = await SP().hash(Buffer.from(password));
  return hashedBuffer.toString('base64');
};

export const verifyPassword = async (
  hashedPassword: string,
  password: string
) => {
  try {
    return await SP().verify(
      Buffer.from(password),
      Buffer.from(hashedPassword, 'base64')
    );
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const authenticateUser = async (
  prisma: any,
  email: string,
  password: string
) => {
  const user = await prisma.user.findFirst({
    where: { email: email.toLowerCase() },
  });

  if (!user || !user.hashedPassword) throw new AuthenticationError();

  switch (await verifyPassword(user.hashedPassword, password)) {
    case SecurePassword.VALID:
      break;
    case SecurePassword.VALID_NEEDS_REHASH:
      // Upgrade hashed password with a more secure hash
      const improvedHash = await hashPassword(password);
      await prisma.user.update({
        where: { id: user.id },
        data: { hashedPassword: improvedHash },
      });
      break;
    default:
      throw new AuthenticationError();
  }

  const { hashedPassword, ...rest } = user;
  return rest;
};

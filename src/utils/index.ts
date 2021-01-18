import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';

export function isLocalhost(req: NextApiRequest | IncomingMessage): boolean {
  let { host } = req.headers;
  let localhost = false;
  if (host) {
    host = host.split(':')[0];
    localhost = host === 'localhost';
  }
  return localhost;
}

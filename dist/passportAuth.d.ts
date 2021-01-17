import { NextApiRequest, NextApiResponse } from 'next';
import { BlitzPassportConfig } from './types';
export declare function passportAuth(config: BlitzPassportConfig): (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

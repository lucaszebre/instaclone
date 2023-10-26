


import { authOptions } from "@/lib/auth"
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions(req, res));
};

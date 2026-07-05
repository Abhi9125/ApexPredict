
declare namespace Express {
  interface Request {
    id: string;
    user?: {
      id: string;
      role: 'USER' | 'OPERATOR' | 'ADMIN';
    };
  }
}
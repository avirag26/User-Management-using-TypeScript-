import { Session, SessionData } from 'express-session';
import { safeUser } from '../src/interfaces/user.interface';
declare module 'express-session' {
  interface SessionData {
    admin?: boolean;
    userDetails?: safeUser;
    user?: boolean;
  }
}

declare module 'express' {
  interface Request {
    session: Session & SessionData;
  }
}

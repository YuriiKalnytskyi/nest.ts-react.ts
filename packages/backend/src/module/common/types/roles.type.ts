export enum EAppRoles {
  USER = 'USER',
  ADMIN = 'ADMIN'
}
export interface IJWTPayload {
  id: string;
  role: EAppRoles[];
  email: string;
}

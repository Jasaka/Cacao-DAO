
export interface BaseUser {
  userId: string;
  walletId: string;
}
export interface User extends BaseUser{
  name?: string;
  imageUrl?: string;
  isAdmin?: boolean;
  email?: string;
  about?: string;
}

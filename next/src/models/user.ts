export interface User {
  userId: string;
  walletId: string;
  name?: string;
  imageUrl?: string;
  isAdmin?: boolean;
  email?: string;
  about?: string;
}

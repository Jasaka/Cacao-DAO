export interface Navigation {
  label: string;
  url: string;
  order: number;
  onlyLoggedIn: boolean;
  onlyAdmin: boolean;
}
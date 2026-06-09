export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type UpdateUserData = {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
};

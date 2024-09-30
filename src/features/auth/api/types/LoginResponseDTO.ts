import { APIResponse } from "@/types/api";
export type LoginResponseDTO = APIResponse<LoginApiResponseData>;

export type LoginApiResponseData = {
  entity: Entity;
};

export type Entity = {
  user: User;
  token: Token;
};

export type Token = {
  accessToken: string;
};

export type User = {
  id: string;
  prefix: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  userRoles: UserRole[];
};

export type UserRole = {
  id: string;
  role: string;
  userId: string;
  createdAt: Date;
};

import { APIResponse } from "@/types/api";
import { LoginApiResponseData } from "./LoginResponseDTO";

export type SignupResponseDTO = APIResponse<LoginApiResponseData>;

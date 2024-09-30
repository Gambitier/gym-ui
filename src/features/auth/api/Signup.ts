import { axiosInstance } from "@/lib/axios";
import { useNotificationStore } from "@/stores/notifications";
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import { GenderEnum, PrefixEnum, SignupResponseDTO } from "./types";

type SignupRequestDTO = {
  prefix: PrefixEnum;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: GenderEnum;
  password: string;
  dateOfBirth: Date;
  middleName: string;
};

type ApiParams = {
  data: SignupRequestDTO;
};

const callApi = async (params: ApiParams): Promise<SignupResponseDTO> => {
  const apiEndpoint = `/v1/auth/signup`;
  return axiosInstance.post(apiEndpoint, params.data);
};

export const useSignup = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (params: ApiParams) => {
      return callApi(params);
    },
    onMutate: async (_apiParams: ApiParams) => {
      //
    },
    onSuccess: (_responseData: SignupResponseDTO, _apiParams: ApiParams) => {
      storage.setToken(_responseData.data.entity.token.accessToken);

      addNotification({
        type: "success",
        title: "Request Successful",
        message: _responseData.message,
      });
    },
  });
};

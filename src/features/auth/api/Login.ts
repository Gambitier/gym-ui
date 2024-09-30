import { axiosInstance } from "@/lib/axios";
import { useNotificationStore } from "@/stores/notifications";
import storage from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import { LoginResponseDTO } from "./types";

type LoginRequestDTO = {
  email: string;
  password: string;
};

type ApiParams = {
  data: LoginRequestDTO;
};

const callApi = async (params: ApiParams): Promise<LoginResponseDTO> => {
  const apiEndpoint = `/v1/auth/login`;
  return axiosInstance.post(apiEndpoint, params.data);
};

export const useLogin = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (params: ApiParams) => {
      return callApi(params);
    },
    onMutate: async (_apiParams: ApiParams) => {
      //
    },
    onSuccess: (_responseData: LoginResponseDTO, _apiParams: ApiParams) => {
      storage.setToken(_responseData.data.entity.token.accessToken);
      addNotification({
        type: "success",
        title: "Request Successful",
        message: _responseData.message,
      });
    },
  });
};

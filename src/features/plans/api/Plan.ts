import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { PlanResponseDTO } from "./types";

type ApiParams = {
  // TODO: define params required to call the api
  // id: string;
  // pagination: PaginationQuery;
};

const callApi = async (params: ApiParams): Promise<PlanResponseDTO> => {
  const apiEndpoint = `/v1/`; // TODO: set valid api endpoint"
  return axiosInstance.get(apiEndpoint);
};

export const queryKeyPlan = "Plan-QueryKey";
export const usePlan = (params: ApiParams) => {
  return useQuery({
    queryKey: [
      queryKeyPlan,
      // TODO: if query data dependes on any other keys, mention them;
      // else remove the following code
      // params.id,
    ],
    queryFn: () => callApi(params),

    // Uncomment following when you need to keep current data displayed on page
    // until next data is available from api
    // placeholderData: keepPreviousData,
  });
};

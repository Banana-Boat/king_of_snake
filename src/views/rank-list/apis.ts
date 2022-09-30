import axios from "@/utils/interceptor";
import type { User } from "./types";

interface GetRankListDataResponse {
  users: User[];
  users_count: number;
}

export const getRankListData = (params: number) =>
  axios
    .get<number, GetRankListDataResponse>("/ranklist/getlist/", {
      params: {
        page: params,
      },
    })
    .then((res) => {
      if (res) return res;
    });

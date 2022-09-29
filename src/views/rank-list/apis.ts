import axios from "@/utils/interceptor";
import type { User } from "./types";

interface getRankListDataResponse {
  users: User[];
  users_count: number;
}

export const getRankListData = (params: number) =>
  axios
    .get<number, getRankListDataResponse>("/ranklist/getlist/", {
      params: {
        page: params,
      },
    })
    .then((res) => {
      if (res) return res;
    });

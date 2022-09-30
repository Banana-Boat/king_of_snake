import axios from "@/utils/interceptor";
import type { Record } from "./types";

interface GetRecordDataResponse {
  records: Record[];
  records_count: number;
}

export const getRecordData = (params: number) =>
  axios
    .get<number, GetRecordDataResponse>("/record/getlist/", {
      params: {
        page: params,
      },
    })
    .then((res) => {
      if (res) return res;
    });

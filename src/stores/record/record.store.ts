import { defineStore } from "pinia";
import type { IRecordAction, IRecordState } from "./types";

export const useRecordStore = defineStore<
  string,
  IRecordState,
  {},
  IRecordAction
>("record", {
  state: () => ({
    isRecord: false,
    aName: "",
    bName: "",
    aSteps: "",
    bSteps: "",
    loser: "",
  }),
});

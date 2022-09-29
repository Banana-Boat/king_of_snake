export interface RecordDetail {
  aid: number;
  asteps: string;
  asx: number;
  asy: number;
  bid: string;
  bsteps: string;
  bsx: string;
  bsy: string;
  createtime: string;
  id: number;
  loser: string;
  map: string;
}

export interface Record {
  a_username: string;
  b_username: string;
  record: RecordDetail;
  result: string;
}

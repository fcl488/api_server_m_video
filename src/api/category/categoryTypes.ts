import { baseResult } from "../baseType";

export interface categoryVO {
  videoCategoryId: number,
  videoCategoryName: string,
  children: categoryVO[]
}

export interface queryCategoryResData extends baseResult {
  data: categoryVO[]
}
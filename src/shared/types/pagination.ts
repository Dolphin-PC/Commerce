export interface PaginationReq {
  pageNumber?: number;
  pageSize?: number;
}
export interface PaginationRes {
  totalCount: number;
  hasNextPage: boolean;
  nextPageNumber: number;
}

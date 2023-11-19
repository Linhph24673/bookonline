export interface ICategory {
  _id: string;
  name: string;
  products?: [];
  createdAt?: string;
  updatedAt?: string;
}
export interface ICategoryDocs {
  docs: ICategory[];
  totalDocs: number;
  totalPages: number;
  _limit: number;
  _page: number;
}

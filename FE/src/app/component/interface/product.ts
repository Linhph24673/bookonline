import { IImage } from './images';

export interface IProduct {
  _id: string;
  name: string;
  author: string;
  publishing: string;
  quantity: number;
  images: any;
  price: number;
  categoryId: string
  description: string;
  is_deleted?: boolean;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProductDocs {
  docs: IProduct[];
  totalDocs: number;
  totalPages: number;
  _limit: number;
  _page: number;
}

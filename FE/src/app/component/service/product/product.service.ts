import { environment } from './../../../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductDocs } from '../../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<IProductDocs> {
    return this.http.get<IProductDocs>(`${environment.backendUrl}/products`);
  }
  getProduct(id: any): Observable<IProduct> {
    return this.http.get<IProduct>(`http://localhost:8000/api/products/` + id);
  }
  deleteProduct(_id: number | string): Observable<IProduct> {
    return this.http.delete<IProduct>(
      `${environment.backendUrl}/products/` + _id
    );
  }
  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(
      `http://localhost:8000/api/products/${product._id}`,
      product
    );
  }

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`http://localhost:3000/products`, product);
  }
}

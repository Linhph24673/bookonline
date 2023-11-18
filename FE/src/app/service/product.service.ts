import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('http://localhost:8088/api/show');
  }
  
  getProduct(id: any): Observable<IProduct> {
    return this.http.get<IProduct>(
      'http://localhost:8088/api/showProductDetail/' + id
    );
  }
  
  deleteProduct(id: any): Observable<IProduct> {
    return this.http.delete<IProduct>('http://localhost:8088/api/delete/' + id);
  }
  
  addProduct(product: IProduct): Observable<any>{
    return this.http.post<any>('http://localhost:8088/api/add', product)
  }
  
  updateProduct(product:IProduct): Observable<any>{
    return this.http.patch<any>(`http://localhost:8088/api/update/${product._id}`,product)
  }
  
  search(term: string): Observable<IProduct[]> {
    if (!term.trim()) {
      return this.getProducts();
    }
    const url = `https://localhost:8088/api/search?name_like=${term}`;
    return this.http.get<IProduct[]>(url);
  }
  
}

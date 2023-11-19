import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/component/interface/product';
import { ProductService } from 'src/app/component/service/product/product.service';

@Component({
  selector: 'app-manager-products',
  templateUrl: './manager-products.component.html',
  styleUrls: ['./manager-products.component.css'],
})
export class ManagerProductsComponent implements OnInit {
  status: boolean = false;
  productName = '';
  products: IProduct[] = [];
  product!: IProduct;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {
    // this.productService.getAllProducts().subscribe((data) => {
    //   this.products = data?.docs;
    //   console.log(data);
    // });
  }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data?.docs;
      console.log(data);
    });
  }
  getValue(e: any) {
    this.productName = e.target.value;
  }
  changeStatus() {
    this.status = !this.status;
  }
  removeItem(_id: any) {
    const product = this.products.find((item) => item._id == _id);
    const isConfirmed = confirm(
      `Bạn có muốn xóa sản phẩm ${product?.name} không ?`
    );
    if (isConfirmed) {
      this.productService.deleteProduct(_id).subscribe(
        () => {
          this.products = this.products.filter((item) => item._id !== _id);
          this.toastr.success('Xóa sản phẩm thành công', 'Thành công');
        },
        (error) => {
          console.log(error.message);
          this.toastr.error('Đã xảy ra lỗi khi xóa sản phẩm', 'Lỗi');
        }
      );
    }
  }
}

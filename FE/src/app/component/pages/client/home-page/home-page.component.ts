import { Component } from '@angular/core';
import { IProduct } from 'src/app/component/interface/product';
import { ProductService } from 'src/app/component/service/product/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  status: boolean = false;
  productName = '';
  products: IProduct[] = [];
  product!: IProduct;

  constructor(private productService: ProductService) {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data?.docs;
    });
  }

  carouselImages = [
    {
      url: 'https://diamu.com.bd/wp-content/uploads/2022/09/Apple-iPhone-14-Pro-and-14-Pro-Max-4.jpg',
      alt: 'Slide 1',
    },
    {
      url: 'https://theme.hstatic.net/1000330442/1001030257/14/ms_banner_img8',
      alt: 'Slide 2',
    },
    {
      url: 'https://diamu.com.bd/wp-content/uploads/2022/09/Apple-iPhone-14-Pro-and-14-Pro-Max-4.jpg',
      alt: 'Slide 3',
    },
  ];
}

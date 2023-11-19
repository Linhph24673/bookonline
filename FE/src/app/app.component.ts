import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Bookstore';
  carouselImages = [
    {
      url: 'https://diamu.com.bd/wp-content/uploads/2022/09/Apple-iPhone-14-Pro-and-14-Pro-Max-4.jpg',
      alt: 'Slide 1'
    },
    {
      url: 'https://theme.hstatic.net/1000330442/1001030257/14/ms_banner_img8',
      alt: 'Slide 2'
    },
    {
      url: 'https://diamu.com.bd/wp-content/uploads/2022/09/Apple-iPhone-14-Pro-and-14-Pro-Max-4.jpg',
      alt: 'Slide 3'
    }
  ]
}

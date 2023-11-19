import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  toggleDropdown() {
    this.dropdownMenu.nativeElement.classList.toggle('show');
  }

  signOut() {
    // Xử lý khi đăng xuất
  }
}

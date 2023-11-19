import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tr[app-category-item]',
  templateUrl: './catrgory-item.component.html',
  styleUrls: ['./catrgory-item.component.css']
})
export class CatrgoryItemComponent {
  @Input() category: any;
  @Input() index: any;
  @Output() onRemove: EventEmitter<any> = new EventEmitter();

  confirmDelete(id: any) {
      this.onRemove.emit(id);
  }
}

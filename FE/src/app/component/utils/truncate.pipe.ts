import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxWords: number = 15): string {
    // Tách thành mảng các từ
    const words = value.split(' ');

    // Chỉ lấy số từ tối đa được xác định
    const truncatedWords = words.slice(0, maxWords);

    // Ghép lại các từ thành một chuỗi
    const truncatedText = truncatedWords.join(' ');

    return truncatedText + (words.length > maxWords ? '...' : '');
  }
}

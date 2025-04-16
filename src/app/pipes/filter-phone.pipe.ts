import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPhone'
})
export class FilterPhonePipe implements PipeTransform {

  transform(demandes: any[], searchTel: string): any[] {
    if (!searchTel || searchTel.trim() === '') return demandes;
    return demandes.filter(demande =>
      demande.tel?.toString().toLowerCase().includes(searchTel.toLowerCase())
    );
  }
}
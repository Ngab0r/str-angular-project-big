import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  /**
   * A kapott tömb rendezése a szűrőkifejezés alapján.
   * @param value {any[]} - a tömb.
   * @param key {string} - az objektum kulcs, ami alapján rendez.
   * @returns {any[]} - a kulcs alapján rendezett tömb.
   */
  transform(value: any[], key: string, isAscending: boolean): any[] {

    /**
     * FELADAT!
     * Ellenőrzés: ha a value nem tömb, vagy nincs megadva a key,
     * térj vissza a value változóval.
     */
    if (typeof (value) === 'undefined' || !Array.isArray(value) || typeof (key) === 'undefined') { return value };

    /**
     * FELADAT!
     * Térj vissza a value.sort metódus eredményével!
     * 1. Ha az a[key] és a b[key] típusa is szám, térj vissza a különbségükkel.
     * 2. Ha nem számok, akkor mind a kettőt konvertáld string típusra,
     *  azután alakítsd őket kisbetűssé.
     * 3. Térj vissza a két string localeCompare metódus által visszaadott
     *  összehasonlításának az eredményével.
     */
    return value.sort((a: any, b: any) => SorterPipe.compare(a[key], b[key], isAscending));
  }
  static compare(a: any, b: any, isAscending): number {
    if (typeof (a) === 'number' && typeof (b) === 'number') {
      return isAscending ? a - b : b - a;
    }
    else return isAscending ? a.toString().toLocaleLowerCase().localeCompare(b.toString().toLocaleLowerCase()) :
      b.toString().toLocaleLowerCase().localeCompare(a.toString().toLocaleLowerCase());
  }

}

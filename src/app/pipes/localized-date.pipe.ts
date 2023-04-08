import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate',
  pure: false
})
export class LocalizedDatePipe implements PipeTransform {

  constructor(
    private translateService: TranslateService,
    private datePipe: DatePipe
  ) {}
  //pattern parameter default format is ‘mediumDate’.
  transform(value: any, pattern: string = 'mediumDate'): any {
    if (value)
      return this.datePipe.transform(
        value,
        pattern,
        undefined,
        this.translateService.currentLang
      );
  }

}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DatePipe, registerLocaleData } from '@angular/common';

import es from '@angular/common/locales/es';
import en from '@angular/common/locales/en';
import { PipesModule } from './pipes/pipes.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

registerLocaleData(en);
registerLocaleData(es);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PipesModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(
      {
        defaultLanguage: 'en',
        loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]}
      }
    )
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

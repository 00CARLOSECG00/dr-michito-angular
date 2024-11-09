import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { authInterceptor } from "./helpers/auth.interceptor";
import { CarouselModule } from 'primeng/carousel';
import {PasswordModule} from 'primeng/password';
import { ListboxModule } from 'primeng/listbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { KnobModule } from 'primeng/knob';
import { ChartModule } from 'primeng/chart';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule, 
        NgxPaginationModule,
        NgxChartsModule,    
        BrowserAnimationsModule,
        MatDialogModule,
        CarouselModule,
        PasswordModule,
        ListboxModule,
        ProgressBarModule,
        KnobModule,
        ChartModule
    ],
    providers: [
        provideHttpClient(withInterceptors([authInterceptor]))
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

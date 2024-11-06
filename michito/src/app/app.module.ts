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
        MatDialogModule
    ],
    providers: [
        provideHttpClient(withInterceptors([authInterceptor]))
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

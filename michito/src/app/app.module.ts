import { BrowserModule } from "@angular/platform-browser";
import { NgModule} from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";
import { NgxChartsModule } from "@swimlane/ngx-charts";


@NgModule({
    declarations:[
        AppComponent
    ],
    imports:[
        BrowserModule,
        AppRoutingModule,
        HttpClientModule, 
        NgxPaginationModule,
        NgxChartsModule
    ],
    providers:[],
    bootstrap:[AppComponent]
})
export class AppModule{}
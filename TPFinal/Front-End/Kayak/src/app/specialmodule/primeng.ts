import { NgModule } from "@angular/core";
import { AccordionModule } from "primeng/accordion";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { GalleriaModule } from "primeng/galleria";
import { MessagesModule } from "primeng/messages";
import { TableModule } from "primeng/table";
import { TooltipModule } from "primeng/tooltip";
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
    exports:[
        GalleriaModule,ConfirmDialogModule,
        MessagesModule,TableModule,AccordionModule,
        ButtonModule,TooltipModule,AutoCompleteModule
    ]
})
export class PrimeNgModule { }
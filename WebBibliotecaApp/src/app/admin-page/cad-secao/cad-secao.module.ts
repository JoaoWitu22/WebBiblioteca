import { CadSecaoComponent } from './cad-secao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuiGridModule } from '@generic-ui/ngx-grid';



@NgModule({
  declarations: [CadSecaoComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, GuiGridModule
  ]
})
export class CadSecaoModule { }

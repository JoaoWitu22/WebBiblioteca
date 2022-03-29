import { SecaoService } from 'src/Services/secao.service';
import { Secao } from 'src/Objects/Secao';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Local } from 'src/Objects/local';
import { LocalService } from './../../../Services/local.service';
import { Component, OnInit } from '@angular/core';
import { CadSecaoModule } from './cad-secao.module';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-cad-secao',
  templateUrl: './cad-secao.component.html',
  styleUrls: ['./cad-secao.component.scss']
})
export class CadSecaoComponent implements OnInit {

  formulario: FormGroup;

  constructor(private localService: LocalService, private formbuilder: FormBuilder,private secaoService: SecaoService) { }

  Language = AppComponent.localization;

  ngOnInit(): void {
    this.formulario = this.formbuilder.group({
      codSecao: ['0'],
      descricaoSecao: [''],
      descricaoLocal: ['']
    })

    UpdateActive();

    this.localService.GetLocal().subscribe(locais => {
      locais.forEach(local => {UpdateOptionLocal(local)})})
  }
  SalvarSecao(secao: Secao){
    this.secaoService.PostSecao(secao).subscribe(
      () => {
        console.log("Sucess: " + secao);
      },(erro: any) => {
        console.log("Erro" + secao);
      }
    )
  }
  onSubmit(){
    let secao: Secao = {...this.formulario.value} ;
    console.log(secao);
    this.SalvarSecao(secao)
    location.reload();
  }
}

function UpdateOptionLocal(local: Local){
  var DataList = document.getElementById('DatalistLocal');
  var Option = document.createElement('option');
  Option.value = local.descricaoLocal + " - código " + local.codLoCal;
  DataList?.appendChild(Option);
}

function UpdateActive(){
  var CadLeitorActive = document.getElementById('ACadleitor');
  CadLeitorActive?.classList.remove('active');
  var CadLivroActive = document.getElementById('ACadlivro');
  CadLivroActive?.classList.remove('active');
  var ACadAutorActive = document.getElementById('ACadAutor');
  ACadAutorActive?.classList.remove('active');
  var ACadEditoraActive = document.getElementById('ACadEditora');
  ACadEditoraActive?.classList.remove('active');
  var AcadSecaoActiva = document.getElementById('AcadSecao');
  AcadSecaoActiva?.classList.add('active');
  var AcadLocalActiva = document.getElementById('AcadLocal');
  AcadLocalActiva?.classList.remove('active');
  var AcadSecapActive = document.getElementById('AcadColecao');
  AcadSecapActive?.classList.remove('active');
}

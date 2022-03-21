import { Component, OnInit } from '@angular/core';
import { CadLeitorModule } from './cad-leitor.module';

@Component({
  selector: 'app-cad-leitor',
  templateUrl: './cad-leitor.component.html',
  styleUrls: ['./cad-leitor.component.scss']
})

export class CadLeitorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var CadLeitorActive = document.getElementById('ACadleitor');
    if (CadLeitorActive != null){
      CadLeitorActive.classList.add('active');
    }
    var CadLivroActive = document.getElementById('ACadlivro');
    if (CadLivroActive != null){
      CadLivroActive.classList.remove('active');
    }
    var ACadAutorActive = document.getElementById('ACadAutor');
    if (ACadAutorActive != null){
      ACadAutorActive.classList.remove('active');
    }
    var ACadEditoraActive = document.getElementById('ACadEditora');
    if (ACadEditoraActive != null){
      ACadEditoraActive.classList.remove('active');
    }
    var AcadSecaoActiva = document.getElementById('AcadSecao');
    if (AcadSecaoActiva != null){
      AcadSecaoActiva.classList.remove('active');
    }
    var AcadLocalActiva = document.getElementById('AcadLocal');
    if (AcadLocalActiva != null){
      AcadLocalActiva.classList.remove('active');
    }
    var AcadSecapActive = document.getElementById('AcadColecao');
    if (AcadSecapActive != null){
      AcadSecapActive.classList.remove('active');
    }
  }
}


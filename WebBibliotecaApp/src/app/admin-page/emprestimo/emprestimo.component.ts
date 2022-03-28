import { Livro } from 'src/Objects/livro';
import { Leitor } from './../../../Objects/Leitor';
import { GuiColumn, GuiPaging, GuiPagingDisplay, GuiRowSelection, GuiRowSelectionMode, GuiRowSelectionType, GuiSearching, GuiSelectedRow } from '@generic-ui/ngx-grid';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmprestimoModule } from './emprestimo.module';
import { LeitorService } from 'src/Services/leitor.service';
import { LivroService } from 'src/Services/livro.service';
import { EmprestimoService } from 'src/Services/emprestimo.service';
import { Emprestimo } from 'src/Objects/emprestimo';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-emprestimo',
  templateUrl: './emprestimo.component.html',
  styleUrls: ['./emprestimo.component.scss']
})
export class EmprestimoComponent implements OnInit {

  constructor(private leitorService: LeitorService, public livroService: LivroService, public emprestimoService: EmprestimoService, private formbuilder: FormBuilder) { }

  formulario: FormGroup;
  Language = AppComponent.localization;

  tbLivroValue: string = "";
  tbLeitorValue: string = "";
  TbDataEmprestimo: string = "";
  TbDataDevolucao: string = "";
  CodigoLeitor: string = "";
  CodigoLivro: string = "";
  idEmprestimo: number = 0;

    source: Array<Emprestimo> = [];
    sourceLeitor: Array<Leitor> = [];
    sourceLivro: Array<Livro> = [];

  paging: GuiPaging = {
		enabled: true,
		page: 1,
		pageSize: 5,
		pageSizes: [5 ,10, 25, 50],
		pagerTop: true,
		pagerBottom: false,
		display: GuiPagingDisplay.ADVANCED
	};
  searching: GuiSearching = {
		enabled: true,
		placeholder: 'Pesquisar...'
	};

  columns: Array<GuiColumn> = [
    {
      header: 'Código',
      field: 'codEmprestimo',
      width: 70
    },
    {
      header: 'Leitor',
      field: 'leitor',
    },
    {
      header: 'Cpf',
      field: 'cpfleitor',
    },
    {
      header: 'Livro',
      field: 'livro',
    },
    {
      header: 'Exemplar',
      field: 'exemplar',
      width: 80
    },
    {
      header: 'Empréstimo',
      field: 'dataEmprestimo',
      width: 100
    },
    {
      header: 'Devolução',
      field: 'dataDevolucao',
      width: 100
    },
    ];
    columnsLeitor: Array<GuiColumn> = [
      {
        header: 'Código',
        field: 'codLeitor',
        width: 70
      },
      {
        header: 'Nome',
        field: 'nome'
      },
      {
        header: 'Email',
        field: 'email'
      },
      {
        header: 'Cpf',
        field: 'cpf'
      },
      {
        header: 'Rg',
        field: 'rg'
      }];
      columnsLivro: Array<GuiColumn> = [
        {
          header: 'Código',
          field: 'codLivro',
          width: 75
        },
        {
          header: 'Titulo',
          field: 'tiTulo',
        },
        {
          header: 'Exemplar',
          field: 'numeroExemplar',
          width: 80
        },
        {
          header: 'Autor',
          field: 'autor',
        },
        {
          header: 'Editora',
          field: 'editora',
        },
        {
          header: 'Coleção',
          field: 'coleCao',
        },

      ];
      rowSelection: boolean | GuiRowSelection = {
        enabled: true,
        type: GuiRowSelectionType.CHECKBOX,
        mode: GuiRowSelectionMode.SINGLE,
      };

      onSelectedRowsLivro(rows: Array<GuiSelectedRow>): void {
        var names: string  = rows.map((m: GuiSelectedRow) => m.source.tiTulo)[0];
        this.tbLivroValue = names;
        this.CodigoLivro = rows.map((m: GuiSelectedRow) => m.source.codLivro)[0];
      }
      onSelectedRowsLeitor(rows: Array<GuiSelectedRow>): void {
        var names: string  = rows.map((m: GuiSelectedRow) => m.source.nome)[0];
        this.tbLeitorValue = names;
        this.CodigoLeitor = rows.map((m: GuiSelectedRow) => m.source.codLeitor)[0];
        console.log(this.CodigoLeitor);
      }
      onSelectedRowsEmprestimo(rows: Array<GuiSelectedRow>): void {
        this.tbLeitorValue = rows.map((m: GuiSelectedRow) => m.source.leitor)[0];
        this.tbLivroValue = rows.map((m: GuiSelectedRow) => m.source.livro)[0];
        var dataEmprestimo: string[] = rows.map((m: GuiSelectedRow) => m.source.dataEmprestimo)[0].split("/");
        this.TbDataEmprestimo = dataEmprestimo[2] + "-" + dataEmprestimo[1] +"-"+ dataEmprestimo[0];

        var dataDevolucao: string[] = rows.map((m: GuiSelectedRow) => m.source.dataDevolucao)[0].split("/");
        this.TbDataDevolucao = dataDevolucao[2] + "-" + dataDevolucao[1] +"-"+ dataDevolucao[0];

        this.CodigoLeitor = rows.map((m: GuiSelectedRow) => m.source.codLeitor)[0];
        this.CodigoLivro = rows.map((m: GuiSelectedRow) => m.source.codLivro)[0];
        this.idEmprestimo = rows.map((m: GuiSelectedRow) => m.source.codEmprestimo)[0];
        console.log(this.idEmprestimo)
        var CadLeitorActive = document.getElementById('BtnDevolver');
        CadLeitorActive?.classList.remove('disabled');
      }


  ngOnInit(): void {
    this.leitorService.GetLeitor(0).subscribe(leitores => {this.sourceLeitor = leitores; console.log(leitores)})
    this.livroService.GetLivro(0).subscribe(livros => { this.sourceLivro = livros})
    this.emprestimoService.GetEmprestimo().subscribe(Emprestimos => { this.source = Emprestimos})

    this.formulario = this.formbuilder.group({
      codEmprestimo: [0],
      leitor: [''],
      cpfleitor: [''],
      livro: [''],
      exemplar: [0],
      dataEmprestimo: [''],
      dataDevolucao : [''],
      status: ['Emprestado'],

    })
    var CadLeitorActive = document.getElementById('BtnDevolver');
    CadLeitorActive?.classList.add('disabled');
  }
  SalvarEmprestimo(emprestimo: Emprestimo){
    console.log(emprestimo)
    this.emprestimoService.PostEmprestimo(emprestimo).subscribe(
      () => {
        console.log("Sucess: " + emprestimo);
      },(erro: any) => {
        console.log("Erro" + emprestimo);
      }
    )
  }
  onSubmit(){
    var form =  this.formulario.value;
    form.leitor = this.CodigoLeitor.toString();
    form.livro = this.CodigoLivro.toString();
    this.SalvarEmprestimo(new Emprestimo(form.codEmprestimo, form.leitor, form.cpfleitor, form.livro, form.exemplar , form.dataEmprestimo, form.dataDevolucao, form.status))
    console.log(this.formulario.value)
  }
  DevolverOnClik(){
    this.emprestimoService.Devolver(this.idEmprestimo).subscribe(
      () => {
        console.log("Sucess: " + this.idEmprestimo);
      },(erro: any) => {
        console.log("Erro" + this.idEmprestimo);
      }
    );
    var CadLeitorActive = document.getElementById('BtnDevolver');
        CadLeitorActive?.classList.add('disabled');
  }
}

import { Component, ViewChild  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal } from '@ionic/angular';
import { AuthenticateService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('formInserir', { static: false }) formInserir!: NgForm;
  @ViewChild(IonModal) modal!: IonModal;
  isLoading: boolean = false;
  funcionarios: any;
  nome: any;
  dadosFuncionario  : any

  constructor() {
    this.getFuncionarios();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  remover(id: any){
    this.isLoading = true;
    fetch('http://projeto/API_Atividade/funcionario/remover_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: id })
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.getFuncionarios();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  editar(id: any){
    this.isLoading = true;
    fetch('http://projeto/API_Atividade/funcionario/editar_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({ CodFun: id })
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.getFuncionarios();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  inserir(dados: any){
    this.isLoading = true;
    fetch('http://projeto/API_Atividade/funcionario/inserir_funcionario.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(dados) 
			}
		)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.getFuncionarios();
      this.resetForm();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }

  getFuncionarios(){
    this.isLoading = true;
	
		let funcionario = {};

    fetch('http://projeto/API_Atividade/funcionario/listar_fucionarios.php',
			{
			  method: 'POST',
			  headers: {
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify(funcionario)
			}
		)
    .then(response => response.json())
    .then(response => {
      this.funcionarios = response.funcionarios
      // console.log(response);
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(()=>{
      this.isLoading = false;
    })
  }


  pegarDados(id: any){
    this.isLoading = true;
  
    fetch('http://projeto/API_Atividade/funcionario/pegarDados.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ CodFun: id })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.dadosFuncionario = response; // Atribuir os dados ao objeto dadosFuncionario
      this.modal.present();
    })
    .catch(erro => {
      console.log(erro);
    })
    .finally(() => {
      this.isLoading = false;
    })
  }
  
  resetForm() {
    this.formInserir.resetForm();
  }

}

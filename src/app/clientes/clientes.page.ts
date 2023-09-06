import { Component, OnInit } from '@angular/core';
import { REPL_MODE_STRICT } from 'repl';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage {
  isLoading: boolean = false
  clientes: any



  getClientes() {
    this.isLoading = false
    fetch('http://localhost/api_fatec_2/clientes/listar.php')
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
    .catch(erro => {
      console.log(erro)
    })
    .finally(() => {
      this.isLoading = false
    })
  }
  

}

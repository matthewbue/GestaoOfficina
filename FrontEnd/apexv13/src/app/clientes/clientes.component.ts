import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClientesService } from "./clientes.service";
import { Clientes } from "app/shared/Model/Clientes";
import { AlertModalService } from "app/shared/services/alert-modal.service";
import { switchMap, take } from "rxjs/operators";
import { EMPTY } from "rxjs";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.scss"],
})
export class ClientesComponent implements OnInit {
  constructor(
    private router: Router,
    private clienteService: ClientesService,
    private alertService: AlertModalService,
  ) { }

  clientes: Clientes[];
  clienteId: number;

  ngOnInit(): void {
    this.clienteService.getAllClient().subscribe((data) => {
      this.clientes = data.data
      console.log(this.clientes);
    });
  }

  new() {
    this.router.navigate(["clientes/new"]);
  }

  openById(id) {
    this.router.navigate(["clientes/new"], {
      queryParams: { clienteId: id, tipo: "visualizar" },
    });
  }

  novaOS(id) {
    this.router.navigate(["ordemdeservico/new"], {
      queryParams: { clienteId: id}
    });
  }

  openEditById(id) {
    this.router.navigate(["clientes/new"], {
      queryParams: { clienteId: id, tipo: "editar" },
    });
  }

  deleteCliente(id){
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Deseja realmente deletar esse cliente?"
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result
            ? this.clienteService.deleteCliente(id)
            : EMPTY
        )
      )
      .subscribe(
        (agendamentos) => {
          window.location.reload();
        },
        (error) => console.error(error)
      );

  }
}

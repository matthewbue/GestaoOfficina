import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClientesService } from "./clientes.service";
import { Clientes } from "app/shared/Model/Clientes";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.scss"],
})
export class ClientesComponent implements OnInit {
  constructor(
    private router: Router,
    private clienteService: ClientesService
  ) {}

clientes: Clientes[];

  ngOnInit(): void {
    this.clienteService.getAllClient().subscribe((data) => {
      this.clientes = data.data
      console.log(data);
    });
  }

  new() {
    this.router.navigate(["clientes/new"]);
  }
}

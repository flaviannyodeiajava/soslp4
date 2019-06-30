import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OcorrenciaService } from '../ocorrencia.service';
import { environment } from "../../environments/environment";
import { AuthGuard } from "../auth.guard";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  status: any[] = ["Encaminhado", "Em análise", "Analisado", "Em processo", "Indeferido", "Encerrado"];
  modalOcorrencia: any;
  ocorrencias: any[];
  ocorrencia: any;

  constructor(private ocorrenciaService: OcorrenciaService, private modalService: NgbModal,
    private auth: AuthGuard, private router: Router){
    this.ocorrencias = [];
  }

  ngOnInit(){
    console.log("environment.setor", environment.setor);
    this.ocorrenciaService.getOcorrenciaBySetor(environment.setor)
    .subscribe(
      (res: {}[])=>{
        console.log("res", res);
        for(var i = 0; i<res.length; i++){
          this.ocorrencias.push(res[i]);
        }
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  mudarStatus(e){
    this.ocorrenciaService.updateStatus(this.ocorrencia.id, e.value.status);
  }

  logoff(){
    this.auth.setIsLogged(false);
    this.router.navigate(['']);
  }

  info(o){
    this.ocorrencia = o;
  }
  openModal(content) {
    this.modalOcorrencia = this.modalService.open(content);
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OcorrenciaService } from '../ocorrencia.service';
import { UserService } from '../user.service';
import { AuthGuard } from '../auth.guard';
import { Router } from '@angular/router';
import { isNull } from 'util';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tipos: any[] = ["Estudante", "Docente", "Técnico Administrativo", "Tercerizado"];
  setores: any[] = ["DIRGE", "DIREN", "DIRAD", "COGEP", "COINF", "COTAD", "COCIP", "COMET"];
  flagInformante: Boolean;
  modalLogin: any;
  caracteres: any = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  tamChave = 10;
  chave: any = "";
  status: any = "";
  setor: any = "";
  flagSenha: Boolean;

  constructor(private ocorrenciaService: OcorrenciaService, private userService: UserService,
    private modalService: NgbModal, private auth: AuthGuard, private router: Router){
  
  }

  ngOnInit() {
  }

  registrarOcorrencia(e){
    console.log(e.value);
    var informante;
    if(e.value.informante == undefined){
      informante = null;
    }else{
      informante = e.value.informante;
    }
    this.chave = this.gerarChave(this.tamChave, this.caracteres);

    this.ocorrenciaService.createOcorrencia({
      hash: this.chave,
      setor: e.value.setor,
      data: e.value.data.day+"/"+e.value.data.month+"/"+e.value.data.year,
      tipo: e.value.tipo,      
      descricao: e.value.descricao,
      informante: informante,
      infrator: e.value.infrator,
      status: "Encaminhado"
    });
  }

  consultarOcorrencia(e){
    console.log("hehehe", e.value);
    this.ocorrenciaService.getOcorrenciaByNum(e.value.cod)
    .subscribe(
      (res: {status})=>{
        console.log("res", res);
        this.status = res.status;
      },
      (err)=>{
        console.log(err);
      }
    );    
  }

  login(e){
    this.userService.getUserBySetor(e.value.setor)
    .subscribe(
      (res: {senha, setor})=>{
        console.log(res);
        console.log("resss");
        if(isNull(res)){
          console.log("nullll");
          this.flagSenha = true;
        }else{
          if(res.senha == e.value.senha){
            this.modalService.dismissAll();
            environment.setor = res.setor;
            this.auth.setIsLogged(true);
            // this.auth.canActivate();
            this.router.navigate(['/admin']);
          }
        }
        
      },
      (err)=>{
        console.log(err);
      }
    );
    // get admin by setor
    //  ver se senhas conferem
    //  liberar rota
  }

  mudarFlag(){
    this.flagInformante = !this.flagInformante;
  }

  openModal(content) {
    this.modalLogin = this.modalService.open(content);
  }

  gerarChave(lengthOfCode: number, possible: string) {
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  recarregar(){
    this.router.navigate(['']);
  }
}

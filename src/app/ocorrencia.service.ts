import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  constructor(private http: HttpClient){ }

  createOcorrencia(ocorrencia){
    this.http.post(environment.url+"ocorrencia", ocorrencia)
    .subscribe(
      (res)=>{
        console.log("createOcorrencia com sucesso");
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  getOcorrenciaByNum(num){
    return this.http.get(environment.url+"ocorrencia/h/"+num);
  }

  getOcorrenciaBySetor(setor){
    return this.http.get(environment.url+"ocorrencia/s/"+setor);
  }

  updateStatus(id, status){
    this.http.put(environment.url+"ocorrencia/"+id, status)
    .subscribe(
      (res)=>{
        console.log("funcionou", res);
      },
      (err)=>{
        console.log(err);
      }
    );
  }
  
}

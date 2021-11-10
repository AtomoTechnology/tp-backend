import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuserviceService {
  menunav:any;
  constructor() { }

  GetMenu(role){
    return  this.GetTypeUser(role);
  }
  private GetTypeUser(role){

    if (role.toLowerCase() === ('admin').toLowerCase()) {
      return this.GetAdmin();
    } else if (role.toLowerCase() === ('Socio').toLowerCase()) {
      return this.GetUser();
    } else if (role.toLowerCase() === ('full adnib').toLowerCase()) {
      return this.GetFullAdmin();
    } else {
      return  'error';
    }
  }
  private  GetAdmin(){
    this.menunav=[
      {
        url:"/Kayak",
        displayName:"Kayak",
        active:"active kayak"
      },
      {
        url:"/User",
        displayName:"Usuario",
        active:"user"
      },
      {
        url:"/Hanger",
        displayName:"Parches",
        active:"hanger"
      },
      {
        url:"/Kayak/KayakType",
        displayName:"Tipo kayak",
        active:"hanger"
      },
      {
        url:"/Partner",
        displayName:"Socio",
        active:"partner"
      },
      {
        url:"/Location",
        displayName:"Ubicacion",
        active:"partner"
      }
    ]
    return this.menunav;
  }

  private GetUser(){
    this.menunav=[
      {
        url:"/ActionKayak",
        displayName:"Crear kayak",
        active:"active kayak"
      },
      {
        url:"/User",
        displayName:"Crear usuario",
        active:"user"
      },
      {
        url:"/Hanger",
        displayName:" Crear parches",
        active:"hanger"
      },
      {
        url:"/Partner",
        displayName:"Crear socio",
        active:"partner"
      },
      {
        url:"/Location",
        displayName:"Crear ubicacion",
        active:"partner"
      }
    ]
    return this.menunav;
  }

  private GetFullAdmin(){
    this.menunav=[
      {
        url:"/ActionKayak",
        displayName:"Crear kayak",
        active:"active kayak"
      },
      {
        url:"/User",
        displayName:"Crear usuario",
        active:"user"
      },
      {
        url:"/Hanger",
        displayName:" Crear parches",
        active:"hanger"
      },
      {
        url:"/Partner",
        displayName:"Crear socio",
        active:"partner"
      },
      {
        url:"/Location",
        displayName:"Crear ubicacion",
        active:"partner"
      }
    ]
    return this.menunav;
  }
}

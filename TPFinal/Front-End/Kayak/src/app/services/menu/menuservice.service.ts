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
        url:"/Browser/Kayak",
        displayName:"Kayak",
        active:"active kayak",
        isSubMenu: false
      },
      {
        url:"/Browser/User",
        displayName:"Usuario",
        active:"user",
        isSubMenu: false
      },
      {
        url:"/Browser/Hanger",
        displayName:"Parches",
        active:"hanger",
        isSubMenu: false
      },
      {
        url:"/Browser/Kayak/KayakType",
        displayName:"Tipo kayak",
        active:"hanger",
        isSubMenu: false
      },
      // {
      //   url:"/Browser/Partner",
      //   displayName:"Socio",
      //   active:"partner",
      //   isSubMenu: false
      // },
      {
        url:"/Browser/Location",
        displayName:"Ubicacion",
        active:"partner",
        isSubMenu: false
      },
      {
        url:"",
        displayName:"",
        active:"",
        isSubMenu: true
      }
    ]
    return this.menunav;
  }

  private GetUser(){
    this.menunav=[
      {
        url:"/Browser/ActionKayak",
        displayName:"Crear kayak",
        active:"active kayak"
      },
      {
        url:"/Browser/User",
        displayName:"Crear usuario",
        active:"user"
      },
      {
        url:"/Browser/Hanger",
        displayName:" Crear parches",
        active:"hanger"
      },
      // {
      //   url:"/Browser/Partner",
      //   displayName:"Crear socio",
      //   active:"partner"
      // },
      {
        url:"/Browser/Location",
        displayName:"Crear ubicacion",
        active:"partner"
      }
    ]
    return this.menunav;
  }

  private GetFullAdmin(){
    this.menunav=[
      {
        url:"/Browser/ActionKayak",
        displayName:"Crear kayak",
        active:"active kayak"
      },
      {
        url:"/Browser/User",
        displayName:"Crear usuario",
        active:"user"
      },
      {
        url:"/Browser/Hanger",
        displayName:" Crear parches",
        active:"hanger"
      },
      // {
      //   url:"/Browser/Partner",
      //   displayName:"Crear socio",
      //   active:"partner"
      // },
      {
        url:"/Browser/Location",
        displayName:"Crear ubicacion",
        active:"partner"
      }
    ]
    return this.menunav;
  }
}

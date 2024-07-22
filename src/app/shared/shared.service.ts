import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Session } from '../user/interfaces/session';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _snackBar : MatSnackBar) { }

  showAlert( message: string, type: string ) {
    this._snackBar.open( message, type,{
     horizontalPosition: 'end',
     verticalPosition: 'top', 
     duration:3000
    });
  }

  saveSession(session: Session) {
    localStorage.setItem('usersession', JSON.stringify(session));
  }

  getSession() {
    const sessionString = localStorage.getItem('usersession');
    const userToken = JSON.parse(sessionString!);
    return userToken;
  }

  deleteSession(){
    localStorage.removeItem('usersession');
  }
}

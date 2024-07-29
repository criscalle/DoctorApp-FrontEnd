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
     horizontalPosition: "end",
     verticalPosition: "top", 
     duration:3000
    });
  }

  saveSession(session: Session) {
    localStorage.setItem("usersession", JSON.stringify(session));
  }

  getSession(): Session | null {
    const sessionString = localStorage.getItem("usersession");
    if (sessionString) {
      try {
        return JSON.parse(sessionString) as Session; // Cast to Session type
      } catch (error) {
        console.error("Error parsing session:", error);
        return null;  // Return null if parsing fails
      }
    }
    return null;  // Return null if no session found
  }

  deleteSession(){
    localStorage.removeItem("usersession");
  }
}

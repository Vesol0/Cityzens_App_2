import { FIREBASE_AUTH } from "./firebase";


export class User {
    constructor(email, password){
        this.email = email;
        this.password = password;
    }

    getEmail(){
        return this.email;
    }
    getPassword(){
        return this.password;
    }

    toJson(){
        localStorage.setItem("userData", JSON.stringify(User));
    }

}
export class UserModel{
    id: number;
    userName: string;
    surName: string;
    constructor(obj){
        Object.assign(this, obj);
    }
}
export class User {
  constructor(
    public id: number = null,
    public userName: string = null,
    public password:string = null,
    public fullname: string = null,
    public email: string = null,
    public status: boolean = null,
  ) {}
}

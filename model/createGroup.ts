export class CreateGroup {
  constructor(public username: string, public name: string) {
    this.name = name;
    this.username = username;
  }
}
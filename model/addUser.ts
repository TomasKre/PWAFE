export class AddUser {
  constructor(public username: string, public groupId: string) {
    this.groupId = groupId;
    this.username = username;
  }
}
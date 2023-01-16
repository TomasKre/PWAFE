import { Message } from "./message";

export class MessageClass implements Message {
    group_id: string;
    username: string;
    text: string;
    datetime: Date;

    constructor (group_id: string, username: string, text: string, datetime: Date) {
        this.group_id = group_id;
        this.username = username;
        this.text = text;
        this.datetime = datetime;
    }
}
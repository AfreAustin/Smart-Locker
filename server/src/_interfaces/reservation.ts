import * as mongodb from "mongodb";

export interface Reservation {
  itemName: string;
  userName: string;
  strtTime: string;
  stopTime: string;
  _id?: mongodb.ObjectId;
}
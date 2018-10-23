
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

@Injectable()
export class ChatroomsProvider {
private chatRoomListRef:firebase.database.Reference

  constructor() {
   firebase.auth().onAuthStateChanged(user=>{
     if(user){
      this.chatRoomListRef=firebase.database().ref(`/userProfile/chatRooms`);
     }
   })
  }

  createRoom(name:string):firebase.database.ThenableReference{
    return this.chatRoomListRef.push({chatRoomName:name
    })
  }
  getChatroomList():firebase.database.Reference{
    return this.chatRoomListRef;
  }
  }


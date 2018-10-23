import { ChatroomsProvider } from './../../providers/chatrooms/chatrooms';
import firebase from 'firebase/app';
import { ProfileProvider } from './../../providers/profile/profile';
import { AuthProvider } from './../../providers/auth/auth';
import { Component , ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';
import 'firebase/database';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userProfile:any;
  chatRef:firebase.database.ThenableReference;
  
  @ViewChild(Content) content: Content
  data={
    type:'',
    message:''
  }

  chats=[];
  joinData={};
  roomKey:string;
  offStatus:boolean=false;
  firebaseRef: firebase.database.Reference;
   

  constructor(public navCtrl: NavController, public chatroomsProvider: ChatroomsProvider,public authProvider: AuthProvider, public profileProvider: ProfileProvider, private navParams: NavParams ) {

    
  this.roomKey=this.navParams.get('key') as string
  this.userProfile=this.navParams.get('userProfile');
  this.data.type='message';
  this.chatRef=firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push();
  console.log("profile",this.userProfile)


 let joinData ={
   type:'join',
   user:this.userProfile.firstName,
   message:this.userProfile.firstName + ' has joined the chat room',
   sendDate:Date()
   
 }

 this.chatRef.set(joinData);
 this.data.message='';
 firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).on('value', Response=>{
 this.chats=[];

 this.chats = snapShotToArray(Response);
 setTimeout(()=>{
 if(this.offStatus===false){
 this.content.scrollToBottom(300);
   }
 },1000)
});

 }

 backToRooms():void{
  this.navCtrl.push('ChatroomsPage');
}

 exitChat(){
let exitData = firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push('');
   exitData.set({
   type:'exit',
   user:this.userProfile.firstName,
   sentDate:Date(),
   message:this.userProfile.firstName + ' has left the chat room',
})
 }


 sendMessage(){
firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push()
.set({
  type:this.data.type,
  user:this.userProfile.firstName,
  message:this.data.message,
  sendDate:Date()

});
this.data.message='';
 }

  }



export const snapShotToArray=snapShot =>{  

let returnArr =[];
snapShot.forEach(childSnapShot=>{
  let item= childSnapShot.val();
  returnArr.push(item)
});
return returnArr;
}

import { AuthProvider } from './../../providers/auth/auth';
import { HomePage } from './../home/home';
import { ProfileProvider } from './../../providers/profile/profile';
import { ChatroomsProvider } from './../../providers/chatrooms/chatrooms';
import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-chatrooms',
  templateUrl: 'chatrooms.html',
})
export class ChatroomsPage {
  userProfile:any;
  name:string;
  chatRoomList:Array<any>;

  constructor(public navCtrl: NavController,private profileProvider:ProfileProvider, public navParams: NavParams, private chatroomsProvider : ChatroomsProvider, private alertCtrl : AlertController, private authProvider: AuthProvider) {
  }

joinRoom(key){
  
if (!this.userProfile.hasOwnProperty('firstName') || !this.userProfile.hasOwnProperty('lastName')){
  let alert:Alert=this.alertCtrl.create({
    message:"Please update profile to enter chatroom",
    buttons:[{
     text: 'Cancel',
     role: 'Cancel',
   }, {
     text: 'Update',
     handler: data => {
       this.navCtrl.push('ProfilePage')
     }
   }]
 })
 alert.present();
 }
 else{
  this.navCtrl.setRoot(HomePage,{'key': key, 'userProfile': this.userProfile})
 }


}
 



logOut(){
  this.authProvider.signOut().then(()=>{
    this.navCtrl.setRoot('LoginPage');
  })
}

goToProfile(){
  this.navCtrl.push('ProfilePage')
}


  ionViewCanEnter(){
    this.chatroomsProvider.getChatroomList().off();
   }

  ionViewDidLoad(){
    this.chatroomsProvider.getChatroomList().on('value',chatRoomsListSnapShot=>{
      this.chatRoomList=[];
    
      chatRoomsListSnapShot.forEach(snap=>{
        this.chatRoomList.push({
          id:snap.key,
          name:snap.val().chatRoomName
        });
        return false;
      })
    })
    this.profileProvider.getUserProfile().on('value',userProfileSnapShot=>{
      this.userProfile=userProfileSnapShot.val();
      console.log("profileProvider",this.userProfile)
    })
  }

  createRoom(){
    let alert:Alert=this.alertCtrl.create({
      message:"Please enter chat room",
      inputs: [
        {
          name: 'name',
          placeholder: 'Room name'
        } ],
      buttons: [{
          text: 'Cancel',
          role:'cancel',
        },
        {
          text: 'Create room',
          handler:data=>{
            console.log(data.name);
            this.chatroomsProvider.createRoom(data.name)
            .then(newchatRoom=>{
              console.log(newchatRoom);
          })
        }
        }]
      })
      alert.present();
    }

}

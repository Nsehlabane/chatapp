import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  userProfile:any;
  birthdate:string;



  constructor(public navCtrl: NavController, public navParams: NavParams, private proProvider: ProfileProvider, private alertCtrl: AlertController) {
  }

  IonViewDidLoad() {
    this.proProvider.getUserProfile().off()
   }
   
   
    ionViewDidLoad() {
      this.proProvider.getUserProfile().on('value',userProfileSnapShots=>{
        this.userProfile=userProfileSnapShots.val();
        this.birthdate=userProfileSnapShots.val().birthdate
      })
   
    }

updateName(){
  const alert: Alert= this.alertCtrl.create({
    message: 'First and last name',
    inputs: [{
      name:'firstName',
      placeholder: 'Enter first name',
      value:this.userProfile.firstName
    }, {
      name: 'lastName',
      placeholder: 'Enter last name',
      value: this.userProfile.lastName
    }],
    buttons:[{
      text: 'Cancel',
      role: 'Cancel',
    }, {
      text: 'Update',
      handler: data => {
        this.proProvider.updateName(data.firstName, data.lastName)
        this.navCtrl.push('ChatroomsPage')
      }
    }]
  })
  alert.present();
}

updatePassword(){
  const alert: Alert= this.alertCtrl.create({
    inputs:[{
      name:'oldPassword',
      placeholder:'enter old password',
      value:this.userProfile.firstname
    },
    {
    name:'newPassword',
    placeholder:'enter new password',
    value:this.userProfile.lastname
    }],
    buttons:[{
      text:'Cancel',
      role:'Cancel',

    },
    {
   text:'Save',
 handler: data =>{
   this.proProvider.updatePassword(data.oldPassword, data.newPassword)

   .catch(err=>{
     console.log('error message from catch', err.message)
     let newAlert: Alert = this.alertCtrl.create({
       message:err.message
     })
   })
 }
    }]
  })
  alert.present();
}}
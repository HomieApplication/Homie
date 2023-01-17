
# Homie

![GitHub](https://img.shields.io/github/license/HomieApplication/Homie?style=for-the-badge) 
![GitHub Repo stars](https://img.shields.io/github/stars/HomieApplication/Homie?style=for-the-badge)

<br>
<img src="https://github.com/HomieApplication/Homie/blob/main/client/assets/icon.png" width="200"/> <br>
Homie is a mobile application for finding your future roommate and/or soulmate. It is dedicated for students who want to find a perfect person to share a room with in the future. Our app is quintessential platform to look for other students' shared accommodation offers and for posting your own room-sharing proposal. Thanks to Homie you can find a roommate that matches your hobbies and interests, and that you certainly will get along with.

## Contents
 - [Requirements](#req) 
 - [Installation](#inst)
 - [Contributing](#cont)
 - [General Usage](#gen)
   - [Login/Register](#login)
   - [Main Page](#main)
   - [Edit Profile](#edit)
   - [Add New Offer](#addOffer)
   - [User Profile](#profile)
   - [My and My Favourite Offers](#fav)
   - [Offer Details](#offer)
 - [Backend API](#api)
 - [Acknowledgements](#ack)
 - [License](#lic)

<a name="req"></a>
## 📋 Requirements
To install Homie you will need a device with iOS or Android operating system. Internet connection and third part app: [Expo Go](https://expo.dev/client) are required.

<a name="inst"></a>
## 🎉 Installation
You can install [Expo Go](https://expo.dev/client) on your IOS or Android device and subsequently run our application by scanning QR code from the special link sent to you (you can get it from one of projects contributors).

In the future we are planning to deploy our app to Google Play and App Store, to enable quick and effortless installation and usage. Going forward we would like to add possibility to find a roommate to your own flat and enable looking for residents to your own flat.

<a name="cont"></a>
## 👏 Contribution
We'd love to have your helping hand on Homie app! Any help with issues and pull requests are always appreciated.
Please contact any of our maintainers for more information on what we're looking for and how to get started.

<a name="gen"></a>
## 📖 General Usage

<a name="login"></a>
### Login/Register:
Launching an application moves you to Login Screen. 
You can log in with an existing account or create one by clicking at 'Register here' button. 
Registration requires your: e-mail, password, full name and year of study. 
After registration, you can log in with your account. 
<p>
   <Image width=300 alt='Login' src="./client/assets/edited_screens/login.jpg"></Image>
   <Image width=300 alt='Rejister' src="./client/assets/edited_screens/SignIn.jpg"></Image>
</p>

**Login screen**:
1. If you already have created account -> enter valid email and password 
2. Log in by pressing on "Confirm" button
3. Register button
4. If you forget the password, you can click 'Forgot password' button to get a 'reset password link' sent to your e-mail adress( don't forget to fill-in an e-mail box before clicking on the button😉).

**Register screen:**
1. You can go back to Login screen by pressing the arrow icon on the left top corner.
2. Fill up all necessary data. 
3. Create account. 

<a name="main"></a>
### Main Screen:
After succesful log in, you will be redirected to Main Screen 🏠. 
Here, at the top of the screen, You can see Your personal information. 

<p>
   <Image width=300 alt='Main' src="./client/assets/edited_screens/main.jpg"></Image>
</p>

1. You can click 'Edit Profile' button to edit and fill-in Your profile information (complete Your profile is required for correct posting an offer!).
2. Clicking a star icon ⭐️ next to "Edit Profile", you can move to the list of your favourite offers.

Below You can see a list of all posted offers which can be filtered out using 'Select filter' (5). 
You can certainly see any offer that interests you by clicking an arrow at the buttom of each offer (3). 
Clicking a star icon ⭐️ on the offer add it to your 'Favourites offers' (4). 

On the bottom of the screen you can see tab navigation bar: <br>

6. Home icon 🏠 takes you to main screen.<br>
7. Plus icon ➕ navigates you page where you can add new offer.<br>
8. Profile icon 👤 takes you to your profile page where you can see detiles about your profile.<br>

<a name="edit"></a>
### Edite Profile Screen:

<p>
   <Image width=300 alt='ffp_v1' src="./client/assets/edited_screens/ffp_v1.jpg"></Image>
   <Image width=300 alt='ffp_v2' src="./client/assets/edited_screens/ffp_v2.jpg"></Image>
   <Image width=300 alt='ffp_v3' src="./client/assets/edited_screens/ffp_v3.jpg"></Image>
</p>

1. You can go back to Main Screen 🏠 by pressing the arrow icon on the top-left corner.
2. Fill up all data you want to change.
3. Select image which you want to make your profile picture.
4. Select your interests.
5. Save your changes.

<a name="addOffer"></a>
### Add Offer Screen:
You can add Your new offer using ➕ button on the bottom. 
Here you need to provide all required data like offer title, description and location of a desired dormitory (location is optional; you can leave this record empty if You're not sure which you prefer ). 
After clicking 'Create offer' button your offer will be visible to all the users. 
You can see your offers by clicking profile icon at the bottom and selecting 'My offers'.

<a name="profile"></a>
### Profile Screen:
On the right bottom corner is a button 👤, that moves you to Your Profile Screen. 

<p>
   <Image width=300 alt='profile' src="./client/assets/edited_screens/userProfile.jpg"></Image>
</p>

1. There you can see all your favourite offers.
2. Here you can see and delete all the offers you posted. 
3. Thats a button that lets you log out of the app.

<a name="fav"></a>
### My (Favourite) Offers Screen:

<p>
   <Image width=300 alt='My' src="./client/assets/edited_screens/myOffers.jpg"></Image>
   <Image width=300 alt='Favs' src="./client/assets/edited_screens/favOffers.jpg"></Image>
</p>

**My Offers screen:**
1. You can go back to Profile Screen 👤 by pressing the arrow icon on the left top corner.
2. Delete your offer.
3. Show details about your offer.

**My Favoutire Offers screen:**
1. You can go back to previous screen by pressing the arrow icon on the left top corner.
2. Unlike the offer by clicking a star icon ⭐️.
3. Show details about offer.

<a name="offer"></a>
### Offer Screen:
You can get here by clicking down-arrow on any offer card. This screen constains more information about chosen offer.
On top you can see information about creator, offer's title and its description.

<p>
   <Image width=300 alt='My' src="./client/assets/edited_screens/offerScreen.jpg"></Image>
</p>

1. You can go back to previous screen by pressing the arrow icon on the left top corner.
2. You can change images added to the offer, using arrows

<a name="api"></a>
## Backend API
Documentation <a href="https://github.com/HomieApplication/Homie/wiki/Backend-API-documentation">here</a>
<a name="ack"></a>
## 👥 Acknowledgements
This project is being maintained by four friends from [AGH - University of Science and Technology](https://www.agh.edu.pl/en) in Cracow:

 - [Kinga Wrona](https://github.com/kingawr123)
 - [Jakub Kubicki](https://github.com/kubijaku)
 - [Ryszard Nowak](https://github.com/Rys-Nowak)
 - [Eryk Mikołajek](https://github.com/ErykMikolajek)

<a name="lic"></a>
## 📄 License
![GitHub](https://img.shields.io/github/license/HomieApplication/Homie?style=for-the-badge) <br>
Homie is MIT licensed, as found in the  [LICENSE](https://github.com/HomieApplication/Homie/blob/main/LICENSE)  file.


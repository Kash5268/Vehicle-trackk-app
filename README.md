# How to check

## Install packages
Run this command to install packages
```sh
npm install
```
Also this command
```sh
npm install -g eas-cli
```

After installing all dependencies build a development build with eas to access with android and ios. If you have problems visit https://docs.expo.dev/build/setup/

```sh
eas build --platform all
```
Scan the QR to download a build on your app. Install it. Moreover, don't forget to install Expo go app in case you are working with android. Then, run this command to start a development server on your laptop.

```sh
npm start
```

Go to your development build that you have installed with scanning QR and you will notice that it shows an active development server (if not, just scan the QR after running the latest command)
Go to the active development server on your mobile

## Notes:
It should be noted that it was made for android to run since I didn't have phones with IOS around to check on it. However, it should work fine.

Do not run it on web as it will not show Google Map. If you do not make development build, android app will not access to Google Map API

IOS should have its own Apple map by standard

If your app is still not working try to change: 
```sh
eas build --platform all
```
to:

```sh
eas build --platform android
```

Also, you can run the build for ios also. (Depending on the build it may cause issues since ios may try to fetch Google Map APi rather than standard as I didn't have an option to check it on IOS platforms)



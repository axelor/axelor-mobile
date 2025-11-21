# Get started in mobile application development

Installation guide for Ubuntu platforms

## :leaves: Development envrionment

### Install NodeJS

```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Please see documentation on https://github.com/nodesource/distributions

To check version of NodeJS, run `node --version `

Once NodeJS is installed, npm is available. Check version with `npm -version `

This project is base on Node version **20.x**

### :coffee: Install Java 11

This project required java 11. Check your java version with `java -version`.

To install java 11 please run:
`sudo apt install openjdk-11-jre-headless`

### :airplane_departure: Settings up Android development environment

First step is to [download Android Studio](https://developer.android.com/studio/index.html) to manage SDK and virtual devices ([React native documentation](https://developer.android.com/studio/index.html)).

Once download, unarchive it with command:

```
tar -xf android-studio-xxxx.x.x.x-linux.tar.gz
```

Then launch it by running :

```
cd android-studio/bin
./studio.sh
```

It will start the installation process, follow the standard approch.
Once on the welcome screen, launch the SDK Manager

![](https://i.imgur.com/l0JZyPX.png)

In panel tab **SDK Platforms**, make sure that at least Android 10.0 is installed.

In panel tab **SDK Tools**, check box _"Show package details"_ and make sure that CMake has versions 3.18.1 and 3.22.1. Android SDK need to have versions at least 30 and 31. You also need to install Android Emulator and Android SDK Platform-Tools.

![](https://i.imgur.com/VNOEKVa.png)

Then, you need to set up environment variable.

Add the following lines to your $HOME/.bash_profile or $HOME/.bashrc config file :

```
export ANDROID_SDK_ROOT=$HOME/<Path to Android folder>/Android/Sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

Then run `source .bashrc` to update paths and check with `echo $ANDROID_SDK_ROOT`.

Next step is to create a virutal device with the **Virtual Device Manager** on **Android Studio**. Select a phone and download a system image.

## :rocket: Start project

Once development environment set up, you can clone project with command:

```
git clone git@github.com:axelor/axelor-mobile.git
cd axelor-mobile/
```

This project is running with yarn. You can install it and check version with the following commands.

```
sudo npm install --global yarn
yarn --version
```

To install dependancies, run :

```
yarn clean && yarn
```

A few important commands :

- `yarn start` to start metro.
- `yarn android` to install android debug application on the virutal device.
- `yarn dev` to launch dev environment, that will enable you to see changes done in packages in real time in the application.

Some helpers to keep a clean repository :

- `yarn format` to check files format in the project.
- `yarn lint` to check eslint issue in the project.

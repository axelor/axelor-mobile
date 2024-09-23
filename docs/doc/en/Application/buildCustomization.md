---
id: buildCustomization
sidebar_position: 6
sidebar_class_name: icon
---

# Android build customization

## Name modification

To modify the name displayed under the application once installed, you need to modify the value associated with the _app_name_ key in the `android > app > src > main > res > values > strings.xml` file.

## Changing the identifier

To create an application distinct from Axelor Mobile, you need to modify the package name associated with the application in the native Android code. There's no easy way to do this. You need to perform a global search in the Android folder and replace all occurrences of the standard package name _com.aosmobile_, with and without capital letters, with the name of the new package. You should also remember to modify the structure of the _java_ folders in the main and debug sections to adapt to the new package name.

## Modifying the application icon

To modify the application icon, open the application's Android folder in **Android Studio**. The project may take some time to initialize. Once the IDE is ready, create a new _Image Asset_ in the resources folder.

![android_app_icon.png](/img/en/android_app_icon.png)

Next, you need to provide the path to the image to be used for generation. It's possible to split the image into two parts for easier configuration, with a path for the background and a path for the foreground.

![android_configure_asset.png](/img/en/android_configure_asset.png)

Then simply validate the configuration and Android Studio will generate all the icon sizes and shapes for the application.

# iOS build customization

## Name and ID modification

To change the name or identifier of an iOS application, use XCode and open the application's General tab. In the _identity_ panel, modify the _Display Name_ and/or _Bundle Identifier_ with the desired values. The changes should then appear in the `Info.plist` and `project.pbxproj` files.

## Application icon modification

To modify the application icon, open the application's ios folder in **Xcode**. The project may take some time to initialize. Once the IDE is ready, modify the AppIcon file in `AosMobile > Images`. To only have to load a single image, select _Single Size_ in the right sidebar.

![ios_app_icon.png](/img/en/ios_app_icon.png)

Then just double-click on the old icon to select the new one.
---
id: buildCustomization
sidebar_position: 6
sidebar_class_name: icon
---

# Personnalisation du build Android

## Modification du nom

Pour modifier le nom affiché sous l'application une fois installée, il faut aller modifier la valeur associée à la clé _app_name_ dans le fichier `android > app > src > main > res > values > strings.xml`.

## Modification de l'identifiant

Pour créer une application distincte d'Axelor Mobile, il faut venir modifier le nom du package associé à l'application dans le code natif d'Android. Il n'existe pas de solution simplifiée pour effectuer cette action. Il faut faire une recherche globale dans le dossier Android et remplacer toutes les occurences du nom du package standard _com.aosmobile_ avec et sans majuscules et les remplacer par le nom du nouveau package. Il faut également penser à modifier la structure des dossiers _java_ dans la partie main et debug pour s'adapter au nouveau nom de package.

La dernière étape est de modifier le nom du package à la racine du projet, ainsi que la version, et de modifier l'identifiant utilisé par Metro dans le fichier `app.json` pour utiliser l'identifiant de la nouvelle application.

## Modification de l'icon de l'application

Pour modifier l'icon de l'application, il faut ouvrir le dossier android de l'application dans **Android Studio**, le projet peut prendre un peu de temps à s'initialiser. Une fois l'IDE prêt, il faut aller créer un nouvel _Image Asset_ dans le dossier ressources.

![android_app_icon.png](/img/fr/android_app_icon.png)

Il faut ensuite fournir le chemin de l'image à utiliser pour la génération. Il est possible de découper l'image en deux parties afin de pouvoir plus facilement la configurer avec un chemin pour le background et un chemin pour le foreground.

![android_configure_asset.png](/img/fr/android_configure_asset.png)

Il suffit ensuite de valider la configuration pour que Android Studio génère toutes les tailles et formes d'icon pour l'application.

# Personnalisation du build iOS

## Modification du nom et de l'identifiant

Pour modifier le nom ou l'identifiant de l'application iOS, il faut utiliser XCode et ouvrir l'onglet Général de l'application. Dans le panel _identity_, modifier les _Display Name_ et/ou _Bundle Identifier_ avec les valeurs souhaitées. Les changements devraient alors apparaître dans les fichiers `Info.plist` et `project.pbxproj`.

## Modification de l'icon de l'application

Pour modifier l'icon de l'application, il faut ouvrir le dossier ios de l'application dans **Xcode**, le projet peut prendre un peu de temps à s'initialiser. Une fois l'IDE prêt, il faut aller modifier le fichier AppIcon dans `AosMobile > Images`. Pour n'avoir à charger qu'une seule image il faut sélectionner _Single Size_ dans la barre latérale de droite.

![ios_app_icon.png](/img/fr/ios_app_icon.png)

Il suffit ensuite de double cliquer sur l'ancien icon pour pouvoir sélectionner le nouveau.

---
sidebar_position: 80
description: ''
---

# Gestion de la caméra et/ou du scanner

## Prise de photo avec la caméra

L’application a la possibilité d’ouvrir la caméra du téléphone afin d’effectuer une photo. L’ouverture de la caméra ainsi que l’obtention des données de la photo sont gérées via un slice.

Pour toute utilisation de la caméra, il faut définir une clé pour cibler l’envoi des données de la photo et éviter les conflits. Cette clé doit être unique et idéalement décrire l’utilisation (exemple : _‘expense-line_justification_picture’_).

Pour ouvrir la caméra il suffit d’utiliser le reducer _enableCamera_ avec la clé. De la même manière pour récupérer les informations de la photo, il faut utiliser le selector de la caméra avec la même clé. En mettant en place un useEffect il est alors possible d’initier une action dès qu’une photo est prise. La prise de photo ferme automatiquement la caméra. Une fois l’action initiée suite à la prise de photo, il faut penser à nettoyer le state de la caméra avec _clearPhoto_ pour éviter les problèmes de refresh.

```tsx
// Récupération des données
const cameraPicture = useCameraValueByKey(cameraKey);

// Format de la photo récupérée
interface CameraPhoto {
  name: string; // nom par défaut : `camera.${pictureExtension}`
  pictureExtention: string; // pour faciliter le nommage du fichier
  dateTime: string; // pour faciliter le nommage du fichier
  type: string; // nécessaire pour l'upload de la photo
  size: number; // nécessaire pour l'upload de la photo (en octets)
  base64: string; // fichier au format base64
  fullBase64: string; // base64 avec le header pour définir le type de document
}

// Activation de la caméra
const handleCameraPress = useCallback(() => {
  dispatch(enableCamera(cameraKey));
}, [cameraKey, dispatch]);

// Traitement des données
useEffect(() => {
  if (cameraPicture) {
    handlePhoto(cameraPicture);
    dispatch(clearPhoto());
  }
}, [cameraPicture, dispatch, handlePhoto]);
```

Il existe déjà deux composants qui utilisent la caméra :

- **UploadFileInput** : offre la possibilité à l’utilisateur de sélectionner une image du stockage du téléphone ou de prendre une photo. Cette photo peut ensuite être transformée en MetaFile ou rester au format base64.
- **CameraButton** : offre la possibilié d’ouvrir la caméra au clique puis de permettre une action sur la prise de photo. Cette photo peut être renvoyée sous forme de MetaFile ou au format base64 en fonction de la configuration donnée au composant.

## Récupération des informations d’un scan

Il existe deux types de scan : avec la caméra du téléphone ou bien avec un appareil Zebra. Les deux scans sont gérés à travers deux slices sur le même principe.

```tsx
// Récupération des données du scanner Zebra
const {isEnabled, scanKey} = useScannerSelector();
const scannedValue = useScannedValueByKey(scanKeySearch);

// Récupération des données du scanner caméra
const scanData = useCameraScannerValueByKey(scanKeySearch);

// Activation des scan
const {enable: onScanPress} = useScanActivator(scanKeySearch); // Enable Zebra or Camera depending on device
const {enable: enableScanner} = useScannerDeviceActivator(scanKeySearch); // Enable Zebra only

// Traitement des données
useEffect(() => {
  if (scannedValue) {
    handleScan(scannedValue);
  } else if (scanData?.value != null) {
    handleScan(scanData.value);
  }
}, [scanData, scannedValue, handleScan]);
```

Il existe déjà plusieurs composants qui utilisent le scan comme le **ScannerAutocompleteSearch** par exemple.

## Utilisation du scanner en masse

Dans certains contextes fonctionnels, une gestion de saisie en masse peut être nécessaire. Pour activer le scan en masse, il suffit d'utiliser le hook _useMassScanner_ de la librairie core. Le hook attend en arguments :

- **[requis]** la clé de scan (_scankey_) qui doit être unique pour éviter les conflits avec d'autres composants/écrans
- **[requis]** la fonction à exécuter lors de la réception d'une valeur (_backgroundAction_). Cette fonction recevra en argument la valeur scannée et doit effectuer le traitement sur celle-ci ou renvoyer une erreur en cas de problème pour arrêter le scan en masse.
- la fonction à exécuter en cas d'erreur lors du traitement de la valeur (_fallbackAction_). Cette fonction recevra le contenu de l'erreur en argument et peut appliquer le comportement adapté.
- un interval en millisecondes à appliquer avant de réactiver le scan avec la caméra (_scanInterval_). Par défaut, cet interval est configuré à 1000ms

Ce hook renvoit l'état d'activation du scan et une fonction pour déclencher le scan à la fois sur la douchette Zebra ou avec la caméra en fonction de l'appareil utilisé.

Voici un exemple de mise en place du hook :

```tsx
import React, {useMemo} from 'react';
import {Icon, useThemeColor} from '@axelor/aos-mobile-ui';
import {showToastMessage, useMassScanner} from '@axelor/aos-mobile-core';

const MassScanButton = ({scanKey}) => {
  const Colors = useThemeColor();

  const {isEnabled, enableScan} = useMassScanner({
    scanKey,
    backgroundAction: (_value: string) =>
      showToastMessage({
        type: 'success',
        position: 'bottom',
        text1: 'Value scanned :',
        text2: _value,
      }),
    fallbackAction: () =>
      showToastMessage({
        type: 'error',
        position: 'bottom',
        text1: 'Issue while using mass scan feature',
      }),
  });

  return (
    <Icon
      name="qr-code-scan"
      color={isEnabled ? Colors.successColor.background : undefined}
      touchable
      onPress={enableScan}
    />
  );
};

export default MassScanButton;
```

La librairie core met également à disposition un composant avec cette fonctionnalité, il s'agit du **MassScannerButton**. Il suffit de lui fournir les options à fournir au hook présenté précédemment : scanKey, backgroundAction, fallbackAction & scanInterval. Le comportement s'occupera alors de la transmission et de l'activation du scan au click sur le bouton.

Voici un exemple de mise en place du composant :

```tsx
import React, {useCallback} from 'react';
import {MassScannerButton, showToastMessage} from '@axelor/aos-mobile-core';

const PickingScan = ({scanKey}) => {
  const handlePicking = useCallback((scanValue: string) => {
    //...
  }, []);

  return (
    <MassScannerButton
      scanKey={scanKey}
      backgroundAction={handlePicking}
      fallbackAction={() =>
        showToastMessage({
          type: 'error',
          position: 'bottom',
          text1: 'Issue while using mass scan feature',
        })
      }
    />
  );
};

export default PickingScan;
```

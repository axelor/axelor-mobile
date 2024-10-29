---
sidebar_position: 7
description: ''
---

# Gestion de la caméra et/ou du scanner

## Prise de photo avec la caméra

L’application a la possibilité d’ouvrir la caméra du téléphone afin d’effectuer une photo. L’ouverture de la caméra aisni que l’obtention des données de la photo sont gérées via un slice.

Pour toute utilisation de la caméra, il faut définir une clé pour cibler l’envoi des données de la photo et éviter les conflits. Cette clé doit être unique et idéalement décrire l’utilisation (exemple : _‘expense-line_justication_picture’_).

Pour ouvrir la caméra il suffit d’utiliser le reducer _enableCamera_ avec le clé. De la même manière pour récupérer les informations de la photo, il faut utiliser le selector de la caméra avec la même clé. En mettant en place un useEffect il est alors possible d’initier une action dès qu’une photo est prise. La prise de photo ferme automatiquement la caméra. Une fois l’action initiée suite à la prise de photo, il faut penser à nettoyer le state de la caméra avec _clearPhoto_ pour éviter les problèmes de refresh.

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

- **UploadFileInput** : offre la possibilité à l’utilisateur de sélectionner une image du stockage du téléphone ou de prendre une photo. Cette photo peut ensuite être transformé en MetaFile ou rester au format base64.
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

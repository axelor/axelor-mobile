---
id: Gestion de la camera
sidebar_position: 8
sidebar_class_name: icon gestion de la camera
---

# Using the camera and/or scanner

## Taking photos with the camera

The application can open the phone's camera to take a photo. Opening the camera and obtaining photo data are managed via a slice.

For each use of the camera, a key must be defined to target the sending of photo data and avoid conflicts. This key must be unique and ideally describe the use (e.g. _'expense-line_justication_picture'_).

To open the camera, simply use the _enableCamera_ reducer with the key. Similarly, to retrieve information from the photo, use the camera selector with the same key. By setting up a useEffect, you can then initiate an action as soon as a photo is taken. Taking a photo automatically closes the camera. Once the action has been initiated, remember to clean the camera state with _clearPhoto_ to avoid refresh problems.

```tsx
// Data recovery
const cameraPicture = useCameraValueByKey(cameraKey);

// Recovered photo format
interface CameraPhoto {
  name: string; // default name: `camera.${pictureExtension}`.
  pictureExtention: string; // to facilitate file naming
  dateTime: string; // to facilitate file naming
  type: string; // necessary for photo upload
  size: number; // required for photo upload (in bytes)
  base64: string; // file in base64 format
  fullBase64: string; // base64 with header to define document type
}

// Camera activation
const handleCameraPress = useCallback(() => {
  dispatch(enableCamera(cameraKey));
}, [cameraKey, dispatch]);

// Data processing
useEffect(() => {
  if (cameraPicture) {
    handlePhoto(cameraPicture);
    dispatch(clearPhoto());
  }
}, [cameraPicture, dispatch, handlePhoto]);
```

There are already two components that use the camera:

- **UploadFileInput**: allows the user to select an image from the phone's storage or to take a photo. This photo can then be transformed into a MetaFile or remain in base64 format.
- **CameraButton**: offers the possibility of opening the camera at the click of a button, then taking a photo. This photo can be returned as a MetaFile or in base64 format, depending on the component's configuration.

## Recovering information from a scan

There are two types of scan: with the phone's camera or with a Zebra device. Both scans are managed through two slices based on the same principle.

```tsx
// Retrieve data from Zebra scanner
const {isEnabled, scanKey} = useScannerSelector();
const scannedValue = useScannedValueByKey(scanKeySearch);

// Retrieve scanner camera data
const scanData = useCameraScannerValueByKey(scanKeySearch);

// Scan activation
const {enable: onScanPress} = useScanActivator(scanKeySearch); // Enable Zebra or Camera depending on device
const {enable: enableScanner} = useScannerDeviceActivator(scanKeySearch); // Enable Zebra only

// Data processing
useEffect(() => {
  if (scannedValue) {
    handleScan(scannedValue);
  } else if (scanData?.value != null) {
    handleScan(scanData.value);
  }
}, [scanData, scannedValue, handleScan]);
```

There are already several components that use scanning, such as **ScannerAutocompleteSearch**.

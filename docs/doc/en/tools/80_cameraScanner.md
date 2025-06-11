---
sidebar_position: 80
description: ''
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

## Mass scanner operation

In certain functional contexts, mass input management may be required. To activate mass scanning, simply use the _useMassScanner_ hook in the core library. The hook expects as arguments :

- **[required]** the scan key (_scankey_), which must be unique to avoid conflicts with other components/screens
- **[required]** the function to be executed when a value is received (_backgroundAction_). This function will receive the scanned value as an argument and must perform processing on it, or return an error in the event of a problem to stop the mass scan.
- the function to be executed in the event of an error when processing the value (_fallbackAction_). This function will receive the error content as an argument and can apply the appropriate behavior.
- an interval in milliseconds to be applied before reactivating the camera scan (_scanInterval_). By default, this interval is set to 1000ms.

This hook returns the scan activation status and a function to trigger the scan both on the Zebra device or with the camera, depending on the device used.

Here is an example of how to set up the hook:

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

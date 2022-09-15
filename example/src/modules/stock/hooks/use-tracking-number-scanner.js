import {useState, useEffect} from 'react';
import {useScannedValueByKey} from '@/features/scannerSlice';
import {searchTrackingNumberBySerialNumber} from '@/modules/stock/api/tracking-number-api';

function useTrackingNumberScanner(scanKey) {
  const [trackingNumberScanned, setTrackingNumberScanned] = useState(null);
  const serialNumber = useScannedValueByKey(scanKey);

  useEffect(() => {
    if (!serialNumber) {
      return;
    }

    searchTrackingNumberBySerialNumber(serialNumber).then(trackingNumber => {
      if (trackingNumber) {
        setTrackingNumberScanned(trackingNumber);
      } else {
        console.warn(
          `Tracking number not found with serial number: ${serialNumber}`,
        );
      }
    });
  }, [serialNumber]);

  return trackingNumberScanned;
}

export default useTrackingNumberScanner;

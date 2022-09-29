import {useState, useEffect} from 'react';
import {useScannedValueByKey} from '@aos-mobile/core';
import {searchStockLocationBySerialNumber} from '@/modules/stock/api/stock-location-api';

function useStockLocationScanner(scanKey) {
  const [stockLocationScanned, setStockLocationScanned] = useState(null);
  const serialNumber = useScannedValueByKey(scanKey);

  useEffect(() => {
    if (!serialNumber) {
      return;
    }

    searchStockLocationBySerialNumber(serialNumber).then(stockLocation => {
      if (stockLocation) {
        setStockLocationScanned(stockLocation);
      } else {
        console.warn(
          `Stock location not found with serial number: ${serialNumber}`,
        );
      }
    });
  }, [serialNumber]);

  return stockLocationScanned;
}

export default useStockLocationScanner;

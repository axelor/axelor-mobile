import {useState, useEffect} from 'react';
import {useScannedValueByKey} from '@/features/scannerSlice';
import {searchProductBySerialNumber} from '@/modules/stock/api/product-api';

function useProductScanner(scanKey) {
  const [productScanned, setProductScanned] = useState(null);
  const serialNumber = useScannedValueByKey(scanKey);

  useEffect(() => {
    if (!serialNumber) {
      return;
    }
    searchProductBySerialNumber(serialNumber).then(product => {
      if (product) {
        setProductScanned(product);
      } else {
        console.warn(`Product not found with serial number: ${serialNumber}`);
      }
    });
  }, [serialNumber]);

  return productScanned;
}

export default useProductScanner;

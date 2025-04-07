import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Card, DoubleIcon} from '@axelor/aos-mobile-ui';
import MassScanner from '../MassScanner/MassScanner';
import {useDataWedgeProfile} from '../../external/Scanner/use-dataWedgeProfile';

interface MassScannerButtonProps {
  scanKey: string;
  backgroundAction: (scannedValue: string) => any;
  fallbackAction?: (error: any) => void;
  scanInterval?: number;
}

const MassScannerButton = ({
  scanKey,
  backgroundAction,
  fallbackAction,
  scanInterval = 1000,
}: MassScannerButtonProps) => {
  const [scannerActive, setScannerActive] = useState(false);

  const {switchToProfile} = useDataWedgeProfile();

  useEffect(() => {
    switchToProfile('mass');
  }, [switchToProfile]);

  const handleActivateScanner = () => {
    setScannerActive(true);
  };
  const handleScannerClose = () => {
    console.log('ici');
    setScannerActive(false);
  };

  console.log('scannerActive', scannerActive);

  return (
    <View>
      {scannerActive && (
        <MassScanner
          scanKey={scanKey}
          backgroundAction={backgroundAction}
          fallbackAction={fallbackAction}
          scanInterval={scanInterval}
          onClose={handleScannerClose}
        />
      )}
      <Card>
        <DoubleIcon
          topIconConfig={{name: 'search'}}
          bottomIconConfig={{name: 'qr-code'}}
          predefinedPosition="bottom-right"
          size={32}
          touchable
          onPress={handleActivateScanner}
        />
      </Card>
    </View>
  );
};

export default MassScannerButton;

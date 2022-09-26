import React, {useState, useEffect, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  enableScan,
  useScannedValueByKey,
  useScannerSelector,
} from '@/features/scannerSlice';
import {CameraScanner, Card, Icon, Input, Text} from '@/components/atoms';
import {useThemeColor} from '@aos-mobile/ui';
import {getCommonStyles} from '@/components/commons-styles';

const InputBarCodeCard = ({
  style,
  scanKeySearch,
  title,
  onChange = () => {},
}) => {
  const Colors = useThemeColor();
  const [camScan, setCamScan] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [viewCoordinate, setViewCoordinate] = useState(null);
  const [inputData, setInputData] = useState(null);
  const {isEnabled, scanKey} = useScannerSelector();
  const scannedValue = useScannedValueByKey(scanKeySearch);
  const dispatch = useDispatch();

  useEffect(() => {
    if (scannedValue) {
      setInputData(scannedValue);
      onChange(scannedValue);
    } else if (scanData != null && scanData.value != null) {
      setCamScan(false);
      setInputData(scanData.value);
      onChange(scanData.value);
    }
  }, [onChange, scanData, scannedValue]);

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  return (
    <View
      style={style}
      onLayout={event => {
        const {x, y} = event.nativeEvent.layout;
        setViewCoordinate({x: x, y: y});
      }}>
      <CameraScanner
        isActive={camScan}
        onScan={setScanData}
        coordinate={viewCoordinate}
        onClose={() => setCamScan(false)}
      />
      {title && (
        <View style={styles.titleContainer}>
          <Text style={styles.textImportant}>{title}</Text>
        </View>
      )}
      <Card
        style={[
          commonStyles.filter,
          commonStyles.filterAlign,
          styles.container,
        ]}>
        <Input
          style={styles.inputField}
          value={inputData}
          onChange={onChange}
          onSelection={() => {
            scanKeySearch ? dispatch(enableScan(scanKeySearch)) : undefined;
          }}
        />
        <Icon
          name="qrcode"
          touchable={true}
          onPress={() => setCamScan(true)}
          color={
            isEnabled && scanKey === scanKeySearch
              ? Colors.primaryColor
              : Colors.secondaryColor_dark
          }
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingRight: 15,
    marginBottom: '3%',
  },
  inputField: {
    width: '90%',
  },
  titleContainer: {
    marginHorizontal: 16,
  },
  textImportant: {
    fontWeight: 'bold',
  },
});

export default InputBarCodeCard;

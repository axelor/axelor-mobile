import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import {disableScan, enableScan} from '@/features/scannerSlice';

function useFocusedScan(scanKey) {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(enableScan(scanKey));
    }
    return () => disableScan();
  }, [dispatch, isFocused, scanKey]);
}

export default useFocusedScan;

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {HeaderBandItem} from './types';
import {headerBandProvider} from './HeaderBandProvider';
import {useNavigation} from '@react-navigation/native';

export const useHeaderBands = () => {
  const [state, setState] = useState<{
    bands: HeaderBandItem[];
    headerHeight: number;
  }>({
    bands: headerBandProvider.getFilteredBands(),
    headerHeight: headerBandProvider.getheaderHeight(),
  });

  const navigation = useNavigation();

  useEffect(() => {
    headerBandProvider.register(setState);
  }, []);

  const _addHeaderBand = useCallback(
    (band: HeaderBandItem) => headerBandProvider.addHeaderBand(band),
    [],
  );

  const _updateHeaderBand = useCallback(
    (key: string, newBand: HeaderBandItem) =>
      headerBandProvider.updateHeaderBand(key, newBand),
    [],
  );

  const _removeHeaderBand = useCallback(
    (key: string) => headerBandProvider.removeHeaderBand(key),
    [],
  );

  useLayoutEffect(() => {
    if (navigation) {
      navigation.setOptions({
        headerStyle: {
          height: state.headerHeight,
        },
      });
    }
  }, [navigation, state.headerHeight]);

  return useMemo(() => {
    return {
      ...state,
      addHeaderBand: _addHeaderBand,
      updateHeaderBand: _updateHeaderBand,
      removeHeaderBand: _removeHeaderBand,
    };
  }, [state, _addHeaderBand, _updateHeaderBand, _removeHeaderBand]);
};

import {useCallback, useEffect, useMemo, useState} from 'react';
import {HeaderBandItem} from './types';
import {fetchFilteredHeaderBands, getHeaderHeight} from './utils';

class HeaderBandProvider {
  private _headerBands: HeaderBandItem[];
  private _filteredHeaderBands: HeaderBandItem[];
  private _refreshCallBack: Function;

  constructor() {
    this._headerBands = [];
    this._filteredHeaderBands = [];
    this._refreshCallBack = () => {};
  }

  register(callBack) {
    this._refreshCallBack = callBack;
  }

  private _updateState() {
    this._filteredHeaderBands = fetchFilteredHeaderBands(this._headerBands);
    this._refreshCallBack(this._filteredHeaderBands);
  }

  containsItem(item: HeaderBandItem) {
    return (
      this._headerBands.find(
        e =>
          e.text === item.text && e.color.background === item.color.background,
      ) != null
    );
  }

  getUniqueKey() {
    return new Date().getTime().toString();
  }

  addHeaderBand(item: HeaderBandItem) {
    if (item == null || this.containsItem(item)) {
      return null;
    }

    this._headerBands = [
      ...this._headerBands,
      {
        key: this.getUniqueKey(),
        order: (this._headerBands.length + 1) * 10,
        showIf: false,
        ...item,
      },
    ];

    this._updateState();
  }

  getHeaderBands() {
    return this._filteredHeaderBands;
  }

  getHeaderHeight() {
    return (
      HEADER_DEFAULT_HEIGHT +
      this._filteredHeaderBands.length * HEADER_BAND_HEIGHT
    );
  }
}

export const headerBandProvider = new HeaderBandProvider();

export const useHeaderBands = () => {
  const [headerBands, setHeaderBands] = useState<HeaderBandItem[]>([]);

  useEffect(() => {
    headerBandProvider.register(setHeaderBands);
  }, []);

  const _getHeaderHeight = useCallback(() => {
    const filteredHeaderBands = headerBandProvider.getHeaderBands();
    return getHeaderHeight(filteredHeaderBands);
  }, []);

  const _addHeaderBand = useCallback(
    (item: HeaderBandItem) => headerBandProvider.addHeaderBand(item),
    [],
  );

  console.log('headerBands', headerBands);

  return useMemo(() => {
    return {
      headerBands: headerBandProvider.getHeaderBands(),
      headerHeight: _getHeaderHeight(),
      addHeaderBand: _addHeaderBand,
    };
  }, [_getHeaderHeight, _addHeaderBand]);
};

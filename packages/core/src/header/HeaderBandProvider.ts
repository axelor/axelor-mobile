import {HeaderBandItem} from './types';

const HEADER_DEFAULT_HEIGHT = 88;
const HEADER_BAND_HEIGHT = 24;

class HeaderBandProvider {
  private _allBands: HeaderBandItem[];
  private _filteredBands: HeaderBandItem[];
  private _refreshCallBack: Function;

  constructor() {
    this._allBands = [];
    this._filteredBands = [];
    this._refreshCallBack = () => {};
  }

  getheaderHeight() {
    return (
      HEADER_DEFAULT_HEIGHT + this._filteredBands.length * HEADER_BAND_HEIGHT
    );
  }

  register(callBack) {
    this._refreshCallBack = callBack;
  }

  private _updateState() {
    this._filteredBands = this.getFilteredBands();
    this._refreshCallBack({
      bands: this._filteredBands,
      headerHeight: this.getheaderHeight(),
    });
  }

  getFilteredBands = (): HeaderBandItem[] => {
    return this._allBands
      .filter(band => band.showIf)
      .sort((a, b) => a.order - b.order);
  };

  containsItem(item: HeaderBandItem) {
    return this._allBands.find(band => band.key === item.key) != null;
  }

  addHeaderBand(band: HeaderBandItem) {
    if (band == null || band.key == null || this.containsItem(band)) {
      return null;
    }

    this._allBands = [
      ...this._allBands,
      {
        order: (this._allBands.length + 1) * 10,
        showIf: false,
        ...band,
      },
    ];

    this._updateState();
  }

  updateHeaderBand(key: string, newBand: HeaderBandItem) {
    const index = this._allBands.findIndex(band => band.key === key);
    if (index === -1) {
      return null;
    }
    this._allBands[index] = {...newBand, key};
    this._updateState();
    return true;
  }

  removeHeaderBand(key: string) {
    const index = this._allBands.findIndex(band => band.key === key);
    if (index === -1) {
      return null;
    }
    this._allBands.splice(index, 1);
    this._updateState();
    return true;
  }
}

export const headerBandProvider = new HeaderBandProvider();

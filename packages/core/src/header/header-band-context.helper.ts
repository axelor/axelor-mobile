import {HeaderBandItem} from './types';

export class HeaderBandHelper {
  static filterBands = (allBands: HeaderBandItem[]): HeaderBandItem[] => {
    return allBands
      .filter(band => band.showIf())
      .sort((a, b) => a.order - b.order);
  };

  static addHeaderBand(
    allBands: HeaderBandItem[],
    band: HeaderBandItem,
  ): HeaderBandItem[] {
    if (band == null || band.key == null) {
      return allBands;
    }

    const item = allBands.find(e => e.key === band.key);
    if (item) {
      item.text = band.text;
      return allBands;
    } else {
      return [
        ...allBands,
        {
          order: (allBands.length + 1) * 10,
          showIf: () => false,
          ...band,
        },
      ];
    }
  }

  static updateHeaderBand(
    allBands: HeaderBandItem[],
    key: string,
    newBand: HeaderBandItem,
  ): HeaderBandItem[] {
    const index = allBands.findIndex(band => band.key === key);
    if (index === -1) {
      return allBands;
    }
    allBands[index] = {...newBand, key};
    return allBands;
  }

  static removeHeaderBand(
    allBands: HeaderBandItem[],
    key: string,
  ): HeaderBandItem[] {
    const index = allBands.findIndex(band => band.key === key);
    if (index === -1) {
      return allBands;
    }
    allBands.splice(index, 1);
    return allBands;
  }
}

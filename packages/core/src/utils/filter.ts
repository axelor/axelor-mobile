import {Color} from '@axelor/aos-mobile-ui';

interface Chip {
  isActive?: boolean;
  color: Color;
  title: string;
  key: string | number;
}

export function filterChip(
  listToFilter: any[],
  listSelectedChip: Chip[],
  objectParam: string,
) {
  if (listToFilter == null) {
    return listToFilter;
  } else if (listSelectedChip !== null && listSelectedChip.length > 0) {
    return listToFilter.filter(item => {
      return listSelectedChip.find(chip => chip?.key === item[objectParam]);
    });
  } else {
    return listToFilter;
  }
}

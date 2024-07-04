import {getTypes} from '@axelor/aos-mobile-core';

export function checkUserImputationMode(
  storeState: any,
  unwantedMode: number,
): boolean {
  const userMode: number =
    storeState.user.user.employee?.timesheetImputationSelect;

  return userMode != null && userMode !== unwantedMode;
}

export function getImputationMode(): any {
  return getTypes()?.Employee?.timesheetImputationSelect;
}

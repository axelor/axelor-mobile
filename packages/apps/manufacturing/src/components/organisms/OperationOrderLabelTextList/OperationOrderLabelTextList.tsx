/*
 * Axelor Business Solutions
 *
 * Copyright (C) 2026 Axelor (<http://axelor.com>).
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React, {ReactNode} from 'react';
import {LabelText} from '@axelor/aos-mobile-ui';
import {
  useTranslator,
  formatDuration,
  useSelector,
} from '@axelor/aos-mobile-core';
import {View, StyleSheet} from 'react-native';

interface OperationOrderLabelTextListProps {
  showDuration?: boolean;
  showHumanDuration?: boolean;
  showMachineDuration?: boolean;
  showWorkCenter?: boolean;
  showMachine?: boolean;
  children: ReactNode;
}

const OperationOrderLabelTextList = ({
  showDuration = true,
  showHumanDuration = true,
  showMachineDuration = true,
  showWorkCenter = true,
  showMachine = true,
  children,
}: OperationOrderLabelTextListProps) => {
  const I18n = useTranslator();

  const {operationOrder} = useSelector((state: any) => state.operationOrder);

  return (
    <View style={styles.detailsContainer}>
      {showDuration && (
        <LabelText
          iconName="stopwatch-fill"
          size={18}
          title={I18n.t('Manufacturing_PlannedDuration') + ':'}
          value={formatDuration(operationOrder?.plannedDuration)}
          style={styles.label}
        />
      )}
      {showHumanDuration && !!operationOrder?.plannedHumanDuration && (
        <LabelText
          iconName="user-clock"
          size={18}
          title={I18n.t('Manufacturing_PlannedHumanDuration') + ':'}
          value={formatDuration(operationOrder?.plannedHumanDuration)}
          style={styles.label}
        />
      )}
      {showMachineDuration && !!operationOrder?.plannedMachineDuration && (
        <LabelText
          iconName="gear-fill"
          size={18}
          title={I18n.t('Manufacturing_PlannedMachineDuration') + ':'}
          value={formatDuration(operationOrder?.plannedMachineDuration)}
          style={styles.label}
        />
      )}
      {showWorkCenter && operationOrder?.workCenter && (
        <LabelText
          iconName="house-gear-fill"
          size={18}
          title={I18n.t('Manufacturing_WorkCenter') + ':'}
          value={operationOrder?.workCenter?.name}
          style={styles.label}
        />
      )}
      {showMachine && operationOrder?.machine && (
        <LabelText
          iconName="tools"
          size={18}
          title={I18n.t('Manufacturing_Machine') + ':'}
          value={operationOrder?.machine?.name}
          style={styles.label}
        />
      )}
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  detailsContainer: {
    marginHorizontal: 18,
    marginVertical: 15,
  },
  label: {
    marginVertical: 2,
  },
});

export default OperationOrderLabelTextList;

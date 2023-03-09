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
  showWorkCenter?: boolean;
  showMachine?: boolean;
  children: ReactNode;
}

const OperationOrderLabelTextList = ({
  showDuration = true,
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
          iconName="stopwatch"
          size={20}
          title={I18n.t('Manufacturing_PlannedDuration') + ':'}
          value={formatDuration(operationOrder?.plannedDuration)}
        />
      )}
      {showWorkCenter && operationOrder?.workCenter && (
        <LabelText
          iconName="warehouse"
          size={15}
          title={I18n.t('Manufacturing_WorkCenter') + ':'}
          value={operationOrder?.workCenter?.name}
        />
      )}
      {showMachine && operationOrder?.machine && (
        <LabelText
          iconName="tools"
          size={18}
          title={I18n.t('Manufacturing_Machine') + ':'}
          value={operationOrder?.machine?.name}
        />
      )}
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  detailsContainer: {
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

export default OperationOrderLabelTextList;

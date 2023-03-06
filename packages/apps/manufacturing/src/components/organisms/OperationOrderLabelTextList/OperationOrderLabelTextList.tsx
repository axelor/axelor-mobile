import React from 'react';
import {LabelText} from '@axelor/aos-mobile-ui';
import {useTranslator, formatDuration} from '@axelor/aos-mobile-core';
import {View, StyleSheet} from 'react-native';

interface OperationOrderLabelTextListProps {
  operationOrder: any;
}

const OperationOrderLabelTextList = ({
  operationOrder,
}: OperationOrderLabelTextListProps) => {
  const I18n = useTranslator();

  return (
    <View style={styles.detailsContainer}>
      <LabelText
        iconName="stopwatch"
        size={20}
        title={I18n.t('Manufacturing_PlannedDuration') + ':'}
        value={formatDuration(operationOrder?.plannedDuration)}
      />
      {operationOrder?.workCenter && (
        <LabelText
          iconName="warehouse"
          size={15}
          title={I18n.t('Manufacturing_WorkCenter') + ':'}
          value={operationOrder?.workCenter?.name}
        />
      )}
      {operationOrder?.machine && (
        <LabelText
          iconName="tools"
          size={18}
          title={I18n.t('Manufacturing_Machine') + ':'}
          value={operationOrder?.machine?.name}
        />
      )}
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

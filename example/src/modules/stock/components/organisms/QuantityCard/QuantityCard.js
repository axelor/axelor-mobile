import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Increment} from '@/components/molecules';
import {Card, Icon, Text, useThemeColor} from '@aos-mobile/ui';
import {getCommonStyles} from '@/components/commons-styles';

const QuantityCard = ({
  style,
  children,
  labelQty,
  defaultValue,
  onValueChange,
  editable,
  actionQty = false,
  onPressActionQty = () => {},
}) => {
  const Colors = useThemeColor();

  const commonStyles = useMemo(() => getCommonStyles(Colors), [Colors]);

  if (children == null || children.length === 0) {
    return (
      <Card style={[styles.noChildrenContainer, style]}>
        <Text style={styles.noChildrenTextField}>{labelQty}</Text>
        {editable ? (
          <Increment
            value={defaultValue.toString()}
            onValueChange={onValueChange}
          />
        ) : (
          <Text style={styles.noChildrenTextValue}>{defaultValue}</Text>
        )}
      </Card>
    );
  }

  return (
    <Card style={[commonStyles.filter, styles.container]}>
      <View style={styles.container_up}>
        {actionQty ? (
          <View style={styles.actionContainer}>
            <View style={styles.childrenContainer}>{children}</View>
            <Icon
              name="pencil-alt"
              size={17}
              touchable={true}
              onPress={onPressActionQty}
            />
          </View>
        ) : (
          <View>{children}</View>
        )}
      </View>
      <View style={styles.container_down}>
        <Text style={styles.textField}>{labelQty}</Text>
        {editable ? (
          <Increment
            value={defaultValue.toString()}
            onValueChange={onValueChange}
          />
        ) : (
          <Text style={styles.textValue}>{defaultValue}</Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  noChildrenContainer: {
    flexDirection: 'column',
    marginHorizontal: 16,
    marginBottom: '2%',
    alignItems: 'center',
  },
  noChildrenTextField: {
    fontSize: 16,
  },
  noChildrenTextValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'column',
    marginHorizontal: 18,
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 16,
    width: '90%',
  },
  container_up: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '3%',
    alignSelf: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  childrenContainer: {
    flexDirection: 'column',
  },
  container_down: {
    paddingTop: '1%',
    alignItems: 'center',
  },
  textField: {
    fontSize: 16,
    paddingTop: '3%',
  },
  textValue: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: '3%',
  },
});

export default QuantityCard;

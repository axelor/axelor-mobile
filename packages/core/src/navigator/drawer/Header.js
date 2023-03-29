import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text, useThemeColor} from '@axelor/aos-mobile-ui';
import DrawerToggleButton from './DrawerToggleButton';
import BackIcon from './BackIcon';
import {useTranslator} from '../../i18n';
import {HeaderOptionsMenu} from '../../components';
import {headerActionsProvider, useHeaderOptions} from '../../header';

const Header = ({mainScreen, title, actionID = null, shadedHeader = true}) => {
  const Colors = useThemeColor();
  const I18n = useTranslator();

  const {options} = useHeaderOptions(actionID);

  const headerOptions = useMemo(
    () => options || headerActionsProvider.getHeaderOptions(actionID),
    [actionID, options],
  );

  const styles = useMemo(() => getHeaderStyles(Colors), [Colors]);

  return (
    <View style={[styles.header, shadedHeader ? styles.shadedHeader : null]}>
      <View style={styles.options}>
        {mainScreen ? (
          <DrawerToggleButton tintColor={Colors.primaryColor.background} />
        ) : (
          <BackIcon tintColor={Colors.primaryColor.background} />
        )}
        <View>
          <Text fontSize={20} adjustsFontSizeToFit={true} numberOfLines={1}>
            {I18n.t(title)}
          </Text>
        </View>
      </View>
      {headerOptions != null ? (
        <HeaderOptionsMenu
          model={headerOptions.model}
          modelId={headerOptions.modelId}
          actions={headerOptions.actions}
          attachedFileScreenTitle={headerOptions.attachedFileScreenTitle}
          disableMailMessages={headerOptions.disableMailMessages}
        />
      ) : null}
    </View>
  );
};

const getHeaderStyles = Colors =>
  StyleSheet.create({
    headerTitle: {
      color: Colors.text,
      marginLeft: -14,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: -15,
      backgroundColor: Colors.backgroundColor,
      height: '100%',
      width: Dimensions.get('screen').width,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
    },
    shadedHeader: {
      elevation: 3,
    },
    options: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
    },
  });

export default Header;

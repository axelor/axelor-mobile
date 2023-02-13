import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Button,
  FormInput,
  HtmlInput,
  Screen,
  StarScore,
} from '@axelor/aos-mobile-ui';
import {useSelector, useDispatch, useTranslator} from '@axelor/aos-mobile-core';

import {
  fetchProspectById,
  updateProspectScore,
} from '../../features/prospectSlice';

const ProspectFormScreen = ({navigation, route}) => {
  const idProspect = route.params.idProspect;
  const {prospect} = useSelector(state => state.prospect);
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const [name, setName] = useState(prospect.name);

  useEffect(() => {
    dispatch(fetchProspectById({partnerId: idProspect}));
  }, [dispatch, idProspect]);

  const updateScoreProspectAPI = useCallback(
    newScore => {
      dispatch(
        updateProspectScore({
          partnerId: prospect.id,
          partnerVersion: prospect.version,
          newScore: newScore,
        }),
      );
    },
    [dispatch, prospect.id, prospect.version],
  );

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
        keyboardVerticalOffset={200}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.headerContainer}>
              <StarScore
                score={prospect.leadScoringSelect}
                showMissingStar={true}
                onPress={updateScoreProspectAPI}
                editMode={true}
              />
            </View>
            <FormInput
              style={styles.input}
              title={I18n.t('Crm_Name')}
              onChange={setName}
              defaultValue={name}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={() => console.log('e')} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
  },
  checkBoxContainer: {
    flexDirection: 'column',
    width: '50%',
    marginLeft: '10%',
  },
  halfHeader: {
    width: '50%',
  },
  picker: {
    width: '100%',
  },
  button_container: {
    marginVertical: '1%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  input: {
    width: '90%',
  },
});

export default ProspectFormScreen;

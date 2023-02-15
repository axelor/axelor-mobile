import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Button, Screen} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useTranslator,
  useSelector,
  AutoCompleteSearchInput,
} from '@axelor/aos-mobile-core';
import {getOpportunity} from '../../features/opportunitySlice';
import {fetchClientAndProspect} from '../../features/partnerSlice';

const OpportunityFormScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {opportunity} = useSelector(state => state.opportunity);
  const {clientAndProspectList} = useSelector(state => state.partner);
  const [clientAndProspect, setClientAndProspect] = useState(
    opportunity.partner,
  );

  useEffect(() => {
    dispatch(
      getOpportunity({
        opportunityId: route.params.opportunityId,
      }),
    );
  }, [dispatch, route.params.opportunityId]);

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerKeyboard}
        keyboardVerticalOffset={200}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.picker}>
              <AutoCompleteSearchInput
                title={I18n.t('Crm_ClientProspect')}
                objectList={clientAndProspectList}
                value={clientAndProspect}
                searchField="fullName"
                onChangeValue={setClientAndProspect}
                searchAPI={fetchClientAndProspect}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.button_container}>
        <Button
          title={I18n.t('Base_Save')}
          onPress={() => console.log('save')}
        />
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

export default OpportunityFormScreen;

import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Button,
  Screen,
  HtmlInput,
  Picker,
  StarScore,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useTranslator,
  useSelector,
  AutoCompleteSearchInput,
  DateInput,
} from '@axelor/aos-mobile-core';
import {getOpportunity} from '../../features/opportunitySlice';
import {fetchClientAndProspect} from '../../features/partnerSlice';

const OpportunityFormScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const {opportunity, opportunityStatusList} = useSelector(
    state => state.opportunity,
  );
  const {clientAndProspectList} = useSelector(state => state.partner);
  const [clientAndProspect, setClientAndProspect] = useState(
    opportunity.partner,
  );
  const [description, setDescription] = useState(opportunity.description);
  const [status, setStatus] = useState(opportunity.opportunityStatus?.id);
  const [score, setScore] = useState(opportunity.opportunityRating);
  const [date, setDate] = useState(new Date(opportunity.expectedCloseDate));

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
          <View style={styles.headerContainer}>
            <StarScore
              style={styles.score}
              score={score}
              showMissingStar={true}
              onPress={setScore}
              editMode={true}
            />
          </View>
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
            <View style={styles.input}>
              <DateInput
                title={I18n.t('Crm_ExpectedCloseDate')}
                defaultDate={date}
                onDateChange={setDate}
              />
            </View>
            <View style={styles.picker}>
              <Picker
                title={I18n.t('Crm_Opportunity_Status')}
                defaultValue={status}
                listItems={opportunityStatusList}
                labelField="name"
                valueField="id"
                emptyValue={false}
                onValueChange={setStatus}
                style={styles.picker}
                isScrollViewContainer={true}
              />
            </View>
            <HtmlInput
              title={I18n.t('Base_Description')}
              onChange={setDescription}
              defaultInput={description}
            />
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
  score: {marginRight: '10%'},
  container: {
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row-reverse',
  },
  checkBoxContainer: {
    flexDirection: 'column',
    width: '50%',
    marginLeft: '10%',
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

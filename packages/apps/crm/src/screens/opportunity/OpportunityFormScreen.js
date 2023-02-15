import React, {useCallback, useEffect, useState} from 'react';
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
  FormHtmlInput,
  Picker,
  StarScore,
  MoreLessInput,
  unformatNumber,
} from '@axelor/aos-mobile-ui';
import {
  useDispatch,
  useTranslator,
  useSelector,
  AutoCompleteSearchInput,
  DateInput,
} from '@axelor/aos-mobile-core';
import {
  getOpportunity,
  updateOpportunity,
} from '../../features/opportunitySlice';
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
  const [amount, setAmount] = useState(opportunity.amount);
  const [recurrentAmount, setRecurrentAmount] = useState(
    opportunity.recurrentAmount,
  );
  useEffect(() => {
    dispatch(
      getOpportunity({
        opportunityId: route.params.opportunityId,
      }),
    );
  }, [dispatch, route.params.opportunityId]);

  const updateOpportunityAPI = useCallback(() => {
    dispatch(
      updateOpportunity({
        opportunityId: opportunity.id,
        opportunityVersion: opportunity.version,
        opportunityStatusId: status,
        opportunityRecurrentAmount: unformatNumber(
          recurrentAmount,
          I18n.t('Base_DecimalSpacer'),
          I18n.t('Base_ThousandSpacer'),
        ),
        opportunityAmount: unformatNumber(
          amount,
          I18n.t('Base_DecimalSpacer'),
          I18n.t('Base_ThousandSpacer'),
        ),
        opportunityDescription: description,
        idPartner: clientAndProspect?.id,
        opportunityRating: score,
        opportunityCloseDate: date?.toISOString().split('T')[0],
      }),
    );
    navigation.navigate('OpportunityDetailsScreen', {
      opportunityId: opportunity.id,
    });
  }, [
    dispatch,
    opportunity.id,
    opportunity.version,
    status,
    amount,
    recurrentAmount,
    description,
    clientAndProspect?.id,
    score,
    date,
    navigation,
    I18n,
  ]);

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
                title={I18n.t('Crm_Opportunity_ExpectedCloseDate')}
                defaultDate={date}
                onDateChange={setDate}
              />
            </View>
            <MoreLessInput
              title={I18n.t('Crm_Opportunity_Amount')}
              defaultValue={amount}
              onChange={setAmount}
              decimalSpacer={I18n.t('Base_DecimalSpacer')}
              thousandSpacer={I18n.t('Base_ThousandSpacer')}
            />
            <MoreLessInput
              title={I18n.t('Crm_Opportunity_RecurrentAmount')}
              defaultValue={recurrentAmount}
              onChange={setRecurrentAmount}
              decimalSpacer={I18n.t('Base_DecimalSpacer')}
              thousandSpacer={I18n.t('Base_ThousandSpacer')}
            />
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
            <FormHtmlInput
              title={I18n.t('Base_Description')}
              onChange={setDescription}
              defaultInput={description}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.button_container}>
        <Button title={I18n.t('Base_Save')} onPress={updateOpportunityAPI} />
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

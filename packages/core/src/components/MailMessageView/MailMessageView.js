import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import useTranslator from '../../i18n/hooks/use-translator';
import {
  ScrollList,
  Screen,
  MessageBox,
  Icon,
  PopUpTwoButton,
  useThemeColor,
} from '@aos-mobile/ui';
import {MailMessageCard, MailMessageReadIcon} from '../../components';
import {
  getMailMessages,
  getModelSubscribers,
  modelSubscribeRequest,
  modelUnsubscribeRequest,
  sendMailMessageComment,
} from '../../features/mailMessageSlice';

const DEFAULT_BOTTOM_MARGIN = 10;

const MailMessageView = ({model, modelId, navigation}) => {
  const dispatch = useDispatch();
  const I18n = useTranslator();
  const Colors = useThemeColor();

  const [comment, setComment] = useState();
  const [subscribe, setSubscribe] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const {userId} = useSelector(state => state.auth);
  const {
    loading,
    moreLoading,
    isListEnd,
    mailMessagesList,
    modelFollowersList,
    reload,
    reloadFollowers,
    unreadMessages,
  } = useSelector(state => state.mailMessages);

  const fetchMailMessageAPI = useCallback(
    page => {
      dispatch(
        getMailMessages({
          model: model,
          modelId: modelId,
          limit: 10,
          page: page,
        }),
      );
    },
    [dispatch, model, modelId],
  );

  const fetchModelFollowersAPI = useCallback(() => {
    dispatch(getModelSubscribers({model, modelId}));
  }, [dispatch, model, modelId]);

  const checkFollowers = useCallback(() => {
    modelFollowersList.find(follower => follower.$author.id === userId)
      ? setSubscribe(true)
      : setSubscribe(false);
  }, [modelFollowersList, userId]);

  const handleSubscribe = useCallback(() => {
    if (!subscribe) {
      dispatch(modelSubscribeRequest({model, modelId}));
    }
  }, [dispatch, subscribe, model, modelId]);

  const handleUnsubscribe = useCallback(() => {
    if (subscribe) {
      dispatch(modelUnsubscribeRequest({model, modelId}));
    }
  }, [dispatch, subscribe, model, modelId]);

  const handleUnfollowConfirmation = useCallback(() => {
    handleUnsubscribe();
    setPopUp(false);
  }, [handleUnsubscribe]);

  const handleSendMailMessageComment = useCallback(() => {
    dispatch(sendMailMessageComment({model, modelId, comment}));
    Keyboard.dismiss();
    setComment();
  }, [dispatch, model, modelId, comment]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerOptionsContainer}>
          <MailMessageReadIcon
            allMessagesRead={unreadMessages === 0}
            model={model}
            modelId={modelId}
          />
          <Icon
            name={subscribe ? 'star' : 'star-o'}
            color={
              subscribe
                ? Colors.primaryColor.background
                : Colors.secondaryColor_dark.background
            }
            size={22}
            style={styles.action}
            FontAwesome5={false}
            touchable={true}
            onPress={subscribe ? () => setPopUp(true) : handleSubscribe}
          />
        </View>
      ),
    });
  }, [
    navigation,
    Colors,
    subscribe,
    unreadMessages,
    handleSubscribe,
    handleUnsubscribe,
    mailMessagesList,
    model,
    modelId,
  ]);

  useEffect(() => {
    fetchModelFollowersAPI();
  }, [fetchModelFollowersAPI]);

  useEffect(() => {
    checkFollowers();
  }, [checkFollowers, modelFollowersList]);

  useEffect(() => {
    if (reload) {
      fetchMailMessageAPI(0);
    }

    if (reloadFollowers) {
      fetchModelFollowersAPI();
    }
  }, [fetchMailMessageAPI, fetchModelFollowersAPI, reload, reloadFollowers]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 70}
      style={styles.container}>
      <Screen removeSpaceOnTop={true}>
        <PopUpTwoButton
          visible={popUp}
          title={I18n.t('Base_Question')}
          data={I18n.t('Base_Unfollow_Confirmation')}
          PrimaryBtnTitle={I18n.t('Base_OK')}
          SecondaryBtnTitle={I18n.t('Base_Cancel')}
          onPressPrimary={handleUnfollowConfirmation}
          onPressSecondary={() => setPopUp(false)}
        />
        <View style={styles.scrollListContainer}>
          <ScrollList
            loadingList={loading}
            data={mailMessagesList}
            renderItem={({item}) => (
              <MailMessageCard
                key={item.id}
                author={item.$author?.fullName}
                avatar={item.$avatar}
                body={item.body}
                eventText={item.$eventText}
                eventTime={item.$eventTime}
                files={item.$files}
                subject={item.subject}
                title={item.subject}
                type={item.type}
                flags={item.$flags}
                navigation={navigation}
                relatedId={modelId}
                relatedModel={model}
              />
            )}
            fetchData={fetchMailMessageAPI}
            filter={false}
            moreLoading={moreLoading}
            isListEnd={isListEnd}
          />
        </View>
        <View style={styles.commentContainer}>
          <MessageBox
            placeholder={I18n.t('Base_MailMessages_CommentInput_Placeholder')}
            disabled={!comment}
            value={comment}
            onChange={setComment}
            onSend={handleSendMailMessageComment}
          />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: DEFAULT_BOTTOM_MARGIN,
    paddingTop: 3,
  },
  container: {
    flex: 1,
  },
  headerOptionsContainer: {
    flexDirection: 'row',
    width: '50%',
    margin: 15,
  },
  action: {
    flex: 1,
  },
  scrollListContainer: {
    flex: 1,
  },
});

export default MailMessageView;

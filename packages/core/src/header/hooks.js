import {useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {countAttachmentFiles} from '../features/attachedFilesSlice';
import {countUnreadMailMessages} from '../features/mailMessageSlice';
import {useTranslator} from '../i18n';
import {checkNullString} from '../utils';

export const useBasicActions = ({
  model,
  modelId,
  disableMailMessages,
  attachedFileScreenTitle,
}) => {
  const navigation = useNavigation();
  const I18n = useTranslator();
  const dispatch = useDispatch();

  const {attachments} = useSelector(state => state.attachedFiles);
  const {unreadMessages} = useSelector(state => state.mailMessages);

  const [disableAttachementFiles, setDisableAttachementFiles] = useState(true);

  const modelConfigured = useMemo(
    () => !checkNullString(model) && modelId != null,
    [model, modelId],
  );

  const countUnreadMessagesAPI = useCallback(() => {
    if (modelConfigured) {
      dispatch(countUnreadMailMessages({model, modelId}));
    }
  }, [dispatch, model, modelConfigured, modelId]);

  const countAttachmentsAPI = useCallback(() => {
    if (modelConfigured) {
      dispatch(countAttachmentFiles({model, modelId}));
    }
  }, [dispatch, model, modelConfigured, modelId]);

  useEffect(() => {
    countUnreadMessagesAPI();
  }, [countUnreadMessagesAPI]);

  useEffect(() => {
    countAttachmentsAPI();
  }, [countAttachmentsAPI]);

  useEffect(() => {
    setDisableAttachementFiles(attachments === 0);
  }, [attachments]);

  const mailMessagesAction = useMemo(() => {
    return {
      key: 'mailMessages',
      order: 20,
      onPress: () =>
        navigation.navigate('MailMessageScreen', {
          model,
          modelId,
        }),
      hideIf: disableMailMessages,
      indicator: unreadMessages,
      iconName: 'bell',
      FontAwesome5: false,
      title: I18n.t('Base_MailMessages'),
      showInHeader: true,
    };
  }, [I18n, disableMailMessages, model, modelId, navigation, unreadMessages]);

  const attachedFilesAction = useMemo(() => {
    return {
      key: 'attachedFiles',
      order: 10,
      title: I18n.t('Base_AttachedFiles'),
      iconName: 'paperclip',
      indicator: attachments,
      hideIf: disableAttachementFiles,
      onPress: () =>
        navigation.navigate('AttachedFilesScreen', {
          model,
          modelId,
          screenTitle: attachedFileScreenTitle,
        }),
      showInHeader: true,
    };
  }, [
    I18n,
    attachedFileScreenTitle,
    attachments,
    disableAttachementFiles,
    model,
    modelId,
    navigation,
  ]);

  return useMemo(() => {
    if (modelConfigured) {
      return {
        mailMessagesAction,
        attachedFilesAction,
      };
    }

    return {
      mailMessagesAction: {key: 'mailMessages', hideIf: true},
      attachedFilesAction: {key: 'attachedFiles', hideIf: true},
    };
  }, [attachedFilesAction, mailMessagesAction, modelConfigured]);
};

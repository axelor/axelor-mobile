import React, {useCallback, useEffect, useState} from 'react';
import {DropdownMenu} from '@aos-mobile/ui';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {countAttachmentFiles} from '../../features/attachedFilesSlice';
import {countUnreadMailMessages} from '../../features/mailMessageSlice';
import HeaderOptionMenuItem from '../HeaderOptionsMenuItem/HeaderOptionMenuItem';

const HeaderOptionsMenu = ({
  model,
  modelId,
  children,
  navigation,
  disableMailMessages,
  attachedFileScreenTitle,
}) => {
  const [disableAttachementFiles, setDisableAttachementFiles] = useState(true);
  const {attachments} = useSelector(state => state.attachedFiles);
  const {unreadMessages} = useSelector(state => state.mailMessages);
  const dispatch = useDispatch();

  const countUnreadMessagesAPI = useCallback(() => {
    dispatch(countUnreadMailMessages({model, modelId}));
  }, [dispatch, model, modelId]);

  const countAttachmentsAPI = useCallback(() => {
    dispatch(countAttachmentFiles({model, modelId}));
  }, [dispatch, model, modelId]);

  useEffect(() => {
    countUnreadMessagesAPI();
  }, [countUnreadMessagesAPI]);

  useEffect(() => {
    countAttachmentsAPI();
  }, [countAttachmentsAPI]);

  useEffect(() => {
    setDisableAttachementFiles(attachments === 0);
  }, [attachments]);

  return (
    <View style={styles.container}>
      <HeaderOptionMenuItem
        icon="bell"
        FontAwesome5={false}
        indicator={unreadMessages}
        hideIf={disableMailMessages}
        onPress={() =>
          navigation.navigate('MailMessageScreen', {
            model,
            modelId,
          })
        }
      />
      <HeaderOptionMenuItem
        icon="paperclip"
        indicator={attachments}
        hideIf={disableAttachementFiles}
        onPress={() =>
          navigation.navigate('AttachedFilesScreen', {
            model,
            modelId,
            screenTitle: attachedFileScreenTitle,
          })
        }
      />
      {children && <DropdownMenu>{children}</DropdownMenu>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

export default HeaderOptionsMenu;

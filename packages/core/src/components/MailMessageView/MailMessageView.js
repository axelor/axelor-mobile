import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollList} from '@aos-mobile/ui';
import MailMessageCard from '../MailMessageCard/MailMessageCard';
import {getMailMessages} from '../../features/mailMessageSlice';

const MailMessageView = ({model, modelId}) => {
  const dispatch = useDispatch();
  const {loading, moreLoading, isListEnd, mailMessagesList} = useSelector(
    state => state.mailMessages,
  );
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

  return (
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
          subject={item.subject}
          title={item.subject}
          type={item.type}
        />
      )}
      fetchData={fetchMailMessageAPI}
      filter={false}
      moreLoading={moreLoading}
      isListEnd={isListEnd}
    />
  );
};

export default MailMessageView;

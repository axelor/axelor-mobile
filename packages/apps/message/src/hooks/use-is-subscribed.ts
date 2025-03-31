import {useMemo} from 'react';
import {useSelector} from '@axelor/aos-mobile-core';

export const useIsSubscribed = () => {
  const {userId} = useSelector(state => state.auth);
  const {modelFollowersList} = useSelector(state => state.mailMessages);

  return useMemo(
    () =>
      modelFollowersList.find((_f: any) => _f.$author.id === userId) != null,
    [modelFollowersList, userId],
  );
};

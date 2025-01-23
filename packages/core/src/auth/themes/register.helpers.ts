import {useCallback, useEffect, useState} from 'react';
import {useTheme} from '@axelor/aos-mobile-ui';
import {useSelector} from '../../redux/hooks';
import {fetchWebThemes} from './api.helpers';

export const useThemesRegister = () => {
  const [themes, setThemes] = useState([]);
  const {addThemes} = useTheme();

  const {logged} = useSelector(state => state.auth);

  const fetchThemes = useCallback(() => {
    fetchWebThemes()
      .then(res => setThemes(res?.data?.data ?? []))
      .catch(() => setThemes([]));
  }, []);

  useEffect(() => {
    if (logged) {
      fetchThemes();
    }
  }, [fetchThemes, logged]);

  useEffect(() => {
    addThemes(themes);
  }, [addThemes, themes]);
};

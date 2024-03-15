import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchObjectModelTypes} from './api.helpers';
import {useFieldsPermissions, useIsAdmin} from '../../permissions';

const isFieldHidden = (authorizedRoles, userRoles) => {
  if (!Array.isArray(authorizedRoles) || authorizedRoles.length === 0) {
    return true;
  } else if (!Array.isArray(userRoles) || userRoles.length === 0) {
    return false;
  } else {
    return authorizedRoles.some(
      _role => userRoles.find(({id: roleId}) => roleId === _role.id) != null,
    );
  }
};

export const useFieldPermitter = ({modelName}: {modelName: string}) => {
  const dispatch = useDispatch();

  const {modelTypes} = useSelector((state: any) => state.metaJsonField);
  const {user} = useSelector((state: any) => state.user);

  const isAdmin = useIsAdmin();
  const permissions = useFieldsPermissions({
    modelName,
    fieldNames: modelTypes,
  });

  useEffect(() => {
    dispatch((fetchObjectModelTypes as any)({modelName}));
  }, [dispatch, modelName]);

  return useCallback(
    _item => {
      if (isAdmin) {
        return _item;
      }

      const {readonly} = permissions.find(({key}) => key === _item.modelField);
      const isHidden = isFieldHidden(_item.roles, user?.roles);

      return {..._item, readonly, hidden: isHidden};
    },
    [isAdmin, permissions, user?.roles],
  );
};

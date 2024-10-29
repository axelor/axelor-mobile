---
sidebar_position: 9
description: ''
---

# Permission management

To avoid API errors linked to user rights on the ERP, the CORE package provides tools for checking read, write, create and delete rights on a given object.

The permissions registered on the ERP are retrieved when the user logs on to the home screen, thanks to the resulting function of the _usePermissionsFetcher_ hook. The _admin_ user is not affected by these permissions, as he is the ERP administrator and has full rights.

Once the permissions have been retrieved, several hooks can be used:

- _useIsAdmin_: allows you to determine whether the logged-in user is an ERP administrator. This is either the `admin` user or a user belonging to the `admin` group.
- _usePermitted_ : takes the model name as argument and returns the user's rights to the object concerned.
- _useFieldPermitted_ : takes the model and field name as arguments and returns read and write rights.
- _useFieldsPermissions_: works in the same way as above, but takes a list of fields as arguments and returns a list of permissions with the field name and associated permissions.

An example of use:

```tsx
import React from 'react';
import {Stopwatch, usePermitted} from '@axelor/aos-mobile-core';

const OperationOrderStopwatch = ({handleCreate, ...props}) => {
  const {canCreate, canDelete, hidden, readonly} = usePermitted({
    modelName: 'com.axelor.apps.production.db.OperationOrder',
  });

  if (hidden) {
    return null;
  }

  return (
    <View>
      <Icon
        name="plus-lg"
        size={20}
        visible={canCreate}
        touchable={true}
        onPress={handleCreate}
      />
      <Stopwatch {...props} disable={readonly} hideCancel={!canDelete} />
    </View>
  );
};

export default OperationOrderStopwatch;
```

Permissions are automatically checked through the _FormView_.

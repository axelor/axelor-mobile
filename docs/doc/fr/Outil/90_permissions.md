---
slug: /permission
sidebar_position: 90
description: ''
---

# Gestion des permissions

Pour éviter les erreurs API liées aux droits des utilisateurs sur l'ERP, le package CORE met à disposition des outils permettant de vérifier les droits de lecture, d'écriture, de création et/ou de suppression sur un objet donné.

Les permissions enregistrées sur l'ERP sont récupérées lors de la connexion sur l'écran d'accueil grâce à la fonction résultante du hook _usePermissionsFetcher_. L'utilisateur _admin_ n'est pas impacté par ces permissions puisqu'il est l'administrateur de l'ERP et possède tous les droits.

Une fois les permissions récupérées, il est alors possible d'utiliser plusieurs hooks :

- _useIsAdmin_ : permet de savoir si l'utilisateur connecté est un administrateur de l'ERP. Il s'agit soit de l'utilisateur `admin` ou d'un utilisateur faisant parti du groupe `admin`.
- _usePermitted_ : prend en argment le nom du modèle et renvoit les droits de l'utilisateur sur l'objet concerné.
- _useFieldPermitted_ : prend en arguments le nom du modèle et du champs et renvoit les droits de lecture et d'écriture.
- _useFieldsPermissions_ : son fonctionnement est similaire au précédent mais en demandant en arguments une liste de champs et en renvoyant ainsi une liste de permission avec le nom du champs et les permissions associées.

Un exemple d'utilisation :

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

Les permissions sont automatiquement vérifiées à travers le _FormView_.

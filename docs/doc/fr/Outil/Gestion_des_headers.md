---
sidebar_position: 6
description: ''
---

# Gestion des headers

## Actions

Afin de faciliter la surcharge avec l’ajout ou la modification des actions disponibles en haut à droite de l’écran, les headers sont gérés avec un système de clé. Il faut venir enregistrer, via un provider disponible dans le package core, pour chaque écran les actions qui doivent être affichées.

Ces enregistrements sont réalisés par des hook permettant ainsi d’accéder à différents outils mis à disposition dans les packages (traductions, thèmes, store,…) mais également d’avoir une mise à jour des headers lorsque c’est nécessaire.

Chaque module doit donc fournir son hook permettant d’enregistrer les actions du header pour ses écrans.

```tsx
const useCustomerDeliveryDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.config);
  const {customerDelivery} = useSelector(state => state.customerDelivery);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_customerDelivery_details', {
      model: 'com.axelor.apps.stock.db.StockMove',
      modelId: customerDelivery?.id,
      disableMailMessages: !mobileSettings?.isTrackerMessageOnStockApp,
    });
  }, [mobileSettings, customerDelivery]);
};
```

Il faut donc utiliser l’outil `headerActionsProvider` pour associer une clé à un objet contenant l’ensemble des informations nécessaires aux différentes actions du header.

Un nomenclature a été mise en place pour aider à la compréhension de l’origine d’une clé : `<Module>_<Object>_<Type d’écran>`.

Les actions sont donc définies à travers une structure nommée `HeaderOptions` :

```tsx
export interface HeaderActions {
  [key: string]: HeaderOptions;
}

export interface HeaderOptions {
  model?: string;
  modelId?: number;
  options?: any;
  disablePrint?: boolean;
  disableMailMessages?: boolean;
  disableJsonFields?: boolean;
  barcodeFieldname?: string;
  headerTitle?: string;
  actions?: ActionType[];
}
```

Le package core fournit par défaut plusieurs actions pour le header: les messages de suivi sur chaque objet, l'affichage du code-barre, les champs studio or encore l'impression de rapport. Elles sont paramétrables via les props suivantes :

- _model_ : nom complet du modèle sur l’ERP.
- _modelId_ : identifiant de l’objet.
- _options_: objet contenant des options pour les actions génériques.
- _disablePrint_: ccondition pour l'affichage ou non de l'impression de rapport.
- _disableMailMessages_ : condition pour l'affichage ou non des messages de suivi sur l'objet.
- _disableJsonFields_ : condition pour l’affichage ou non des champs studio.
- _barcodeFieldname_ : nom de l’attribut contenant le fichier code-barre sur l’ERP (par défaut `barCode`).
- _headerTitle_ : nom de l'écran pour permettre les titres dynamiques.

:::caution
Depuis la version 8.3, la fonctionnalité des fichiers joints est gérée comme une action générique du module DMS. Elle sera ajoutée à tous les écrans avec un model et un modelId enregistrés.
:::

Il est ensuite possible d’ajouter des actions supplémentaires avec l’attribut `actions`. Chaque action possède alors la structure suivante :

```tsx
export interface ActionType {
  key: string;
  order: number;
  title: string;
  iconName: string;
  iconColor?: string;
  indicator?: number;
  hideIf?: boolean;
  disableIf?: boolean;
  onPress: () => void;
  showInHeader?: boolean;
  customComponent?: ReactElement<any>;
}
```

Les différents attributs mis à disposition sont donc :

- **key** : **_[Required]_** permet de donner un identifiant à l’action afin de permettre la modification à travers une surcharge.
- **order** : **_[Required]_** permet d’ordonner l’affichage des actions
- **title** : **_[Required]_** titre de l’action lorsque celle-ci est réduite dans le `DropdownMenu`
- **iconName** : **_[Required]_** nom de l’icone associé à cette action
- **iconColor** : couleur de l’icone, par défaut celle-ci est fixée à `secondaryColor_dark.background`
- **indicator** : chiffre à afficher en petit en haut de l’icone de l’action (ex: nombre de fichiers joints ou de messages en attente)
- **hideIf** : condition d’affichage de l’action
- **disableIf** : condition de désactivation de l’action
- **onPress** : **_[Required]_** action à exécuter lorsque l’utilisateur clique sur l’icone
- **showInHeader** : condition pour savoir si l’action peut s’afficher directement dans le header ou si elle doit toujours être présente dans les actions déroulantes. Par défaut, les actions sont paramétrées pour s’afficher dans la liste déroulante.
- **customComponent**: possibilité d'ajouter un composant react personnalisé

D’un point de vue fonctionnel, l’ensemble des actions est transmis au composant `HeaderOptionsMenu` qui va ensuite réaliser les étapes suivantes:

- récuprérer les deux actions par défaut paramétrées avec les informations renseignées
- retirer de la liste les actions cachées
- trier la liste par `order` croissant
- afficher les deux premières actions avec l’attribut `showInHeader` à true directement dans le header
- afficher le reste des actions dans le `DropdownMenu`

Pour les petits écrans, toutes les actions sont affichées dans la liste déroulante.

## Actions génériques

Il est possible de créer des actions génériques depuis n'importe quel package fonctionnel.

Comme pour les actions, cela passe par un hook.

```tsx
const useAttachedFilesAction = () => {
  const navigation = useNavigation();
  const I18n = useTranslator();

  useEffect(() => {
    headerActionsProvider.registerGenericAction(
      'dms_attachedFiles',
      ({model, modelId, options}) => ({
        key: 'attachedFiles',
        order: 10,
        onPress: () =>
          navigation.navigate('AttachedFilesScreen', {model, modelId, options}),
        hideIf: options.disabled,
        indicator: ...,
        iconName: 'bell-fill',
        title: options.screenTitle,
        showInHeader: true,
      }),
    );
  }, [...]);
};
```

Il faut donc utiliser `registerGenericAction` de l’outil `headerActionsProvider` pour associer une clé à une fonction. Cette fonction prend en paramètres `model`, `modelId` et `options`. Elle retourne l’ensemble des informations nécessaires aux différentes actions du header.

Le paramètre `options` permet de passer des paramètres personnalisés depuis un écran grâce à la clé utilisée pour créer l'action générique.

```tsx
const useProductDetailsActions = () => {
  const {mobileSettings} = useSelector(state => state.appConfig);
  const {product} = useSelector(state => state.product);

  useEffect(() => {
    headerActionsProvider.registerModel('stock_product_details', {
      model: 'com.axelor.apps.base.db.Product',
      modelId: product?.id,
      options: {
        dms_attachedFiles: {
          disabled: !mobileSettings?.isAttachedFilesEnabled,
          screenTitle: product?.name,
          ...
        },
      },
    });
  }, [mobileSettings, product]);
};
```

## Bandeaux

Il est possible de venir renseigner des bandeaux à afficher au-dessus du header pour informer l’utilisateur d’une situation globale de l’application (mode hors-ligne, perte de connexion ou encore environnement de test).

Afin de faciliter l’ajout et/ou la modification d’un bandeau, cette fonctionnalité est gérée avec un sytème de clé. Il faut venir enregistrer, via un contexte disponible dans le package core, les bandeaux lorsqu’ils doivent s’afficher ou disparaître.

Ces enregistrements sont réalisés par des hook permettant ainsi d’accéder à différents outils mis à disposition dans les packages (traductions, thèmes, store,…) mais également d’avoir une mise à jour des headers lorsque c’est nécessaire.

Les bandeaux sont gérés par un contexte afin de permettre une mise à jour au moindre changement. Pour récupérer la fonction d’enregistrement, il faut utiliser le hook _useHeaderBand_.

```tsx
const {registerHeaderBand} = useHeaderBand();

...

const checkInternetConnection = useCallback(async () => {
    const {isConnected} = await getNetInfo();

    registerHeaderBand({
      key: 'noInternetConnection',
      text: I18n.t('Base_NoConnection'),
      color: Colors.secondaryColor,
      order: 15,
      showIf: !isConnected,
    });
  }, [Colors, I18n, registerHeaderBand]);

  useEffect(() => {
    const interval = setInterval(checkInternetConnection, 2000);
    return () => clearInterval(interval.current);
  }, [checkInternetConnection]);
```

Pour enregistrer un bandeau, il suffit alors d’utiliser la fonction _registerHeaderBand_ en fournissant toutes les informations nécessaire à l’affichage, à savoir :

```tsx
export interface HeaderBandItem {
  key: string; // Clé du bandeau
  color: Color; // Couleur du bandeau
  text: string; // Test à afficher
  showIf: boolean; // Condition pour laquelle le bandeau doit s'afficher
  order?: number; // Ordre d'affichage du bandeau dans la liste
}
```

Pour mettre à jour / modifier un bandeau, il suffit alors d’utiliser la même fonction d’enregistrement en utilisant la même clé et en modifiant les informations nécessaires.

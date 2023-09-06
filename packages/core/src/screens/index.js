import AttachedFilesScreen from './AttachedFilesScreen';
import BarcodeDisplayScreen from './BarcodeDisplayScreen';
import MailMessageScreen from './MailMessageScreen';

export default {
  AttachedFilesScreen: {
    title: 'Base_AttachedFiles',
    component: AttachedFilesScreen,
    actionID: 'core_attachedFiles_details',
    options: {
      shadedHeader: false,
    },
  },
  MailMessageScreen: {
    title: 'Base_MailMessages',
    component: MailMessageScreen,
    actionID: 'core_mailMessage_details',
    options: {
      shadedHeader: false,
    },
  },
  BarcodeDisplayScreen: {
    title: 'Base_Barcode',
    component: BarcodeDisplayScreen,
    actionID: 'core_barcode_details',
    options: {
      shadedHeader: true,
    },
  },
};

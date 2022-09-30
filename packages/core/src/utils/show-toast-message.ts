import Toast, {ToastShowParams} from 'react-native-toast-message';

export const showToastMessage = (toastOptions: ToastShowParams) => {
  return Toast.show(toastOptions);
};

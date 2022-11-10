class MailMessageNotificationType {
  static style = {
    Default: 'default',
    Important: 'important',
    Success: 'success',
    Warning: 'orange',
    Inverse: 'inverse',
    Info: 'info',
  };

  static getTagColor = (style, Colors) => {
    switch (style) {
      case this.style.Default:
        return Colors.defaultColor;
      case this.style.Important:
        return Colors.importantColor;
      case this.style.Success:
        return Colors.successColor;
      case this.style.Warning:
        return Colors.warningColor;
      case this.style.Inverse:
        return Colors.inverseColor;
      case this.style.Info:
        return Colors.infoColor;
      default:
        console.warn(
          `Style provided with value ${style} is not supported by Mail Message Tag`,
        );
        return null;
    }
  };
}

export default MailMessageNotificationType;

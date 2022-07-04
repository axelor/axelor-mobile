class File {
  static getFileExtension = filename => {
    return filename.split('.').pop();
  };

  static getFileIcon = filename => {
    switch (this.getFileExtension(filename)) {
      case 'pdf':
        return 'file-pdf';
      case 'png' || 'jpeg' || 'jpg':
        return 'file-image';
      case 'csv':
        return 'file-csv';
      case 'zip':
        return 'file-archive';
      case 'docx' || 'doc' || 'odt' || 'txt':
        return 'file-word';
      case 'potx' || 'pptx' || 'ppt' || 'odp':
        return 'file-powerpoint';
      case 'ods' || 'xls' || 'xlsx' || 'xltm':
        return 'file-excel';
      case 'mp4' || 'mp3':
        return 'file-audio';
      default:
        return 'file';
    }
  };
}

export default File;

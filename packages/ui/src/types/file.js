class File {
  static getFileExtension = filename => {
    if (filename == null) {
      return filename;
    }
    return filename.split('.').pop();
  };

  static getFileIcon = filename => {
    switch (this.getFileExtension(filename)) {
      case 'pdf':
        return 'file-pdf';
      case 'jpeg':
      case 'jpg':
      case 'svg':
      case 'png':
        return 'file-image';
      case 'csv':
        return 'file-csv';
      case 'zip':
        return 'file-archive';
      case 'docx':
      case 'doc':
      case 'odt':
      case 'txt':
        return 'file-word';
      case 'potx':
      case 'pptx':
      case 'ppt':
      case 'odp':
        return 'file-powerpoint';
      case 'ods':
      case 'xls':
      case 'xlsx':
      case 'xltm':
        return 'file-excel';
      case 'mp4':
      case 'mp3':
        return 'file-audio';
      default:
        return 'file';
    }
  };
}

export default File;

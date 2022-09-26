import {CameraScanner as CoreCamera} from '@aos-mobile/core';

const CameraScanner = ({
  isActive = false,
  onScan = () => {},
  coordinate = {x: 0, y: 0},
  onClose = () => {},
}) => CoreCamera({isActive, onClose, onScan, coordinate});

export default CameraScanner;

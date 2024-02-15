import { FC } from 'react';
// import AnotherComponent from './AnotherComponent'; // Import AnotherComponent if needed
import Cropper from 'react-easy-crop';

interface StepComponentProps {
  step: number;
  files: File[];
  crop: any; 
  value: any; 
  aspect: number;
  setCrop: (crop: any) => void; 
  onCropComplete: (crop: any) => void; 
  setZoom: (zoom: any) => void; 
}

const StepComponent: FC<StepComponentProps> = ({ step, files, crop, value, aspect, setCrop, onCropComplete, setZoom }) => {
  if (step === 1) {
    return (
      <Cropper
        image={files[0].preview}
        crop={crop}
        zoom={value}
        aspect={aspect}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    );
  } else if (step === 2) {
    return (
       <Filter />
    )
  } else {
    return null; 
  }
};

export default StepComponent;

  
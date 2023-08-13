import { LineWave } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className="fixed z-40 top-0 left-0 backdrop-blur-sm bg-primary bg-opacity-40 w-screen h-screen flex justify-center items-center">
      <LineWave
        wrapperClass="translate-x-7"
        color="#2D2D2D"
        width={100}
        visible={true}
      />
    </div>
  );
}

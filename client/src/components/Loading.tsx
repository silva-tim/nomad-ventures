import { LineWave } from 'react-loader-spinner';

export default function Loading() {
  return (
    <div className="fixed z-20 w-screen h-1/2 flex justify-center items-center scale-150 translate-x-7">
      <LineWave color="#2D2D2D" width={100} visible={true} />
    </div>
  );
}

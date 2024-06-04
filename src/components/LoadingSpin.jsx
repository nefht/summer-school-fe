import { Spin } from 'antd';

const LoadingSpin = () => {
  return (
    <Spin
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '99999',
      }}
      size="large"
    />
  );
};

export default LoadingSpin;

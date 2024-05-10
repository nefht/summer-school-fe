import { message } from 'antd';

export default function useMessage() {
  const [messageApi, contextHolder] = message.useMessage();
  return { messageApi, contextHolder };
}

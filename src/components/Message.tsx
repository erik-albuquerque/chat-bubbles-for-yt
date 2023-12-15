import { MessageType } from '../types/Message'

type MessageProps = {
  data: Omit<MessageType, 'id'>;
};

const Message = ({ data: { content = "" } }: MessageProps) => {
  return (
    <div className="w-full max-w-fit bg-white rounded-full pl-3 pr-4 py-2 relative">
      <div className="w-6 h-6 bg-white absolute left-0 bottom-0 -z-10 rounded-sm" />
      <span className="font-medium text-base">{content}</span>
    </div>
  );
};

export { Message };

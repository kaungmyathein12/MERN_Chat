import { PaperPlaneTilt } from "@phosphor-icons/react";

const ChatInput = ({ message, setMessage, trigger }) => {
  return (
    <div className="bg-[#101010] border-t border-night absolute bottom-0 w-full p-3 flex flex-row justify-between items-stretch gap-x-4">
      <textarea
        rows="1"
        placeholder="Enter text something"
        autoFocus
        className="outline-none bg-[#101010] resize-none p-3 w-full mx-0 text-sm rounded-md"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        className="border border-night px-4 rounded-md bg-white text-black"
        onClick={() => trigger()}
      >
        <PaperPlaneTilt size={18} weight="fill" />
      </button>
    </div>
  );
};

export default ChatInput;

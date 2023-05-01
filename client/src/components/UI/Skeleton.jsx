const Skeleton = () => {
  return (
    <div className="flex flex-row justify-start items-center gap-x-3 px-3 py-[9px] mx-2 mb-2 rounded-md animate-pulse">
      <div className="w-10 h-10 bg-[#333] rounded-full"></div>
      <div className="grow">
        <div className="w-11/12 h-[10px] bg-[#333] mb-3"></div>
        <div className="w-1/2 h-2 bg-[#333]"></div>
      </div>
    </div>
  );
};

export default Skeleton;

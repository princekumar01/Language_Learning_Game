export const Progressbar = ({ percent }) => {
  return (
    <div
      role="progress bar"
      className="flex-1 bg-gray-200 h-4 rounded-full relative overflow-hidden"
    >
      <span
        className="absolute left-0 top-0 h-full bg-[#58cc02]"
        style={{ width: `${percent}%` }}
      ></span>
    </div>
  );
};

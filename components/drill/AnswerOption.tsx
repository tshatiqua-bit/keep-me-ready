interface AnswerOptionProps {
  text: string;
  index: number;
  selectedIndex: number | null;
  correctIndex: number;
  phase: "answering" | "revealed";
  onSelect: (index: number) => void;
}

export default function AnswerOption({
  text,
  index,
  selectedIndex,
  correctIndex,
  phase,
  onSelect,
}: AnswerOptionProps) {
  const isSelected = index === selectedIndex;
  const isCorrect = index === correctIndex;

  let className =
    "w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400";

  if (phase === "answering") {
    className +=
      " border-slate-200 text-slate-700 bg-white hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer";
  } else {
    // revealed
    if (isCorrect) {
      className +=
        " border-green-500 bg-green-50 text-green-800 cursor-default";
    } else if (isSelected && !isCorrect) {
      className +=
        " border-red-400 bg-red-50 text-red-700 cursor-default";
    } else {
      className +=
        " border-slate-100 bg-slate-50 text-slate-400 cursor-default opacity-60";
    }
  }

  return (
    <button
      className={className}
      onClick={() => phase === "answering" && onSelect(index)}
      disabled={phase === "revealed"}
    >
      {text}
    </button>
  );
}

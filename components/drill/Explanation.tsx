interface ExplanationProps {
  text: string;
  isCorrect: boolean;
}

export default function Explanation({ text, isCorrect }: ExplanationProps) {
  return (
    <div
      className={`mt-4 rounded-xl border px-4 py-4 text-sm leading-relaxed ${
        isCorrect
          ? "border-green-200 bg-green-50 text-green-900"
          : "border-amber-200 bg-amber-50 text-amber-900"
      }`}
    >
      <p className="font-semibold mb-1">
        {isCorrect ? "Correct!" : "Not quite."}
      </p>
      <p>{text}</p>
    </div>
  );
}

interface ExplanationProps {
  text: string;
  isCorrect: boolean;
  questionIndex: number;
}

const CORRECT_HEADERS = [
  "Exactly right!",
  "You got it!",
  "Spot on!",
  "That's the one!",
  "Perfect — keep that in mind.",
];

const INCORRECT_HEADERS = [
  "Close — here's the key:",
  "Not quite, but this one trips people up:",
  "Good try — let's clear that up:",
  "Not this time — here's why:",
  "Almost — here's what to remember:",
];

export default function Explanation({ text, isCorrect, questionIndex }: ExplanationProps) {
  const headers = isCorrect ? CORRECT_HEADERS : INCORRECT_HEADERS;
  const header = headers[questionIndex % headers.length];

  return (
    <div
      className={`mt-4 rounded-xl border px-4 py-4 text-sm leading-relaxed ${
        isCorrect
          ? "border-green-200 bg-green-50 text-green-900"
          : "border-amber-200 bg-amber-50 text-amber-900"
      }`}
    >
      <p className="font-semibold mb-1">{header}</p>
      <p>{text}</p>
    </div>
  );
}

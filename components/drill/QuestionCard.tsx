import type { Question } from "@/types";

const TYPE_LABELS: Record<Question["type"], string> = {
  multiple_choice: "Multiple Choice",
  true_false: "True / False",
  scenario: "Scenario",
};

const CATEGORY_LABELS: Record<Question["category"], string> = {
  debits_credits: "Debits & Credits",
  accounts: "Accounts",
  financial_statements: "Financial Statements",
  journal_entries: "Journal Entries",
  bank_reconciliation: "Bank Reconciliation",
  payroll: "Payroll",
};

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="mb-1">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
          {TYPE_LABELS[question.type]}
        </span>
        <span className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
          {CATEGORY_LABELS[question.category]}
        </span>
      </div>
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-300 leading-snug">
        {question.text}
      </h2>
    </div>
  );
}

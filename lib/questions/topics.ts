import type { QuestionCategory } from "@/types";

export interface Topic {
  category: QuestionCategory;
  title: string;
  lesson: string;
  whyItMatters: string;
  commonConfusion: string;
  reviewNext: string;
  reflectionPrompt: string;
  takeaways: string[];
}

const TOPICS: Record<QuestionCategory, Topic> = {
  debits_credits: {
    category: "debits_credits",
    title: "Debits & Credits — The Foundation of Every Transaction",
    lesson:
      "Double-entry bookkeeping means every transaction touches at least two accounts — one gets a debit, the other gets a credit. Debits increase assets and expenses; credits increase liabilities, equity, and revenue. The totals always balance: every dollar debited is a dollar credited somewhere else.",
    whyItMatters:
      "Every journal entry, every bank reconciliation, and every financial statement flows from getting debits and credits right. Master this concept and the rest of bookkeeping starts to click into place naturally.",
    commonConfusion:
      '"Debit" does not mean bad and "credit" does not mean good — those everyday meanings do not apply in bookkeeping. A debit to your Cash account is actually a good thing: it means cash went up.',
    reviewNext: "Journal Entries — Debits & Credits in Action",
    reflectionPrompt:
      "Think of a recent purchase your business made. Which two accounts were affected? Which side did each account move — and why?",
    takeaways: [
      "Debits increase assets and expenses; credits increase liabilities, equity, and revenue.",
      "Every transaction touches at least two accounts — one debit and one credit, always equal.",
      '"Debit" and "credit" carry no positive or negative meaning in bookkeeping — they only describe which side of an account is affected.',
      "The normal balance of an account is the side that increases it — assets and expenses have debit normal balances; liabilities, equity, and revenue have credit normal balances.",
      "If total debits do not equal total credits, there is an error somewhere in the entry.",
    ],
  },
  accounts: {
    category: "accounts",
    title: "Chart of Accounts — Where Every Dollar Lives",
    lesson:
      "Every business transaction gets recorded in an account. Accounts fall into five types: Assets (what you own), Liabilities (what you owe), Equity (the owner's stake), Revenue (income earned), and Expenses (costs incurred). A business's chart of accounts is the master list of every account it uses.",
    whyItMatters:
      "If a transaction lands in the wrong account, the financial statements show the wrong picture. Accurate categorization is the difference between books that help you run the business and books that quietly mislead you.",
    commonConfusion:
      "Accounts Receivable is an asset — money owed TO you. Accounts Payable is a liability — money you owe OTHERS. These two are easy to mix up, and the mistake causes real downstream problems in the books.",
    reviewNext: "Financial Statements — How Accounts Tell the Story",
    reflectionPrompt:
      "Can you name one asset, one liability, and one expense account a small retail business would use? What would change in the chart of accounts for a service business instead?",
    takeaways: [
      "Every account belongs to one of five types: Assets, Liabilities, Equity, Revenue, or Expenses.",
      "The chart of accounts is the master list — every transaction eventually lands in one or more of its accounts.",
      "Accounts Receivable is money owed to you (asset); Accounts Payable is money you owe others (liability) — they are not interchangeable.",
      "Miscategorizing a transaction affects the financial statements immediately and can mislead business decisions.",
      "The same five account types appear in every business — only the specific accounts inside them differ.",
    ],
  },
  financial_statements: {
    category: "financial_statements",
    title: "Financial Statements — The Scoreboard of the Business",
    lesson:
      "Three reports summarize a business's financial health. The Income Statement shows revenue minus expenses over a period — the profit or loss. The Balance Sheet shows what the business owns and owes at a single point in time. The Cash Flow Statement tracks the actual movement of cash in and out.",
    whyItMatters:
      "Owners, lenders, and investors rely on these three reports to make decisions. A bookkeeper who understands what each statement means — not just how to produce it — is far more valuable than one who only knows the mechanics.",
    commonConfusion:
      "Profit and cash are not the same thing. A business can show a profit on the Income Statement while running out of cash if customers haven't paid their invoices yet. Always look at the Cash Flow Statement alongside the Income Statement.",
    reviewNext: "Journal Entries — How Transactions Become Financial Statements",
    reflectionPrompt:
      'If a business owner asks "Are we making money?", which statement do you show them first — and what would you also want them to see alongside it?',
    takeaways: [
      "The Income Statement shows profit or loss over a period of time; the Balance Sheet shows financial position at a single point in time.",
      "The Balance Sheet must always balance: Assets = Liabilities + Equity.",
      "Net income from the Income Statement flows into Equity on the Balance Sheet, connecting the two reports.",
      "Profit and cash are not the same — a profitable business can still run out of cash if customers are slow to pay.",
      "The Cash Flow Statement explains where cash came from and where it went — always read it alongside the Income Statement.",
    ],
  },
  journal_entries: {
    category: "journal_entries",
    title: "Journal Entries — Recording Every Business Transaction",
    lesson:
      "A journal entry is the formal record of a transaction. It lists the date, the accounts affected, the amounts, and which side each account moves. Every entry must balance: total debits equal total credits. Simple entries have one debit and one credit; compound entries have multiple lines but still balance.",
    whyItMatters:
      "Journal entries are the source of everything downstream — the ledger, the trial balance, the financial statements. An error here ripples through all of them, so precision at this step saves hours of cleanup later.",
    commonConfusion:
      "Recording a sale on credit (an invoice) is not the same as recording a cash receipt. The sale is recorded when earned: debit Accounts Receivable, credit Revenue. The cash hits later as a separate entry: debit Cash, credit Accounts Receivable.",
    reviewNext: "Bank Reconciliation — Catching Errors in Your Entries",
    reflectionPrompt:
      "Walk through the journal entry for paying a $300 utility bill by check. Which accounts move, in which direction, and by how much on each side?",
    takeaways: [
      "Every journal entry includes a date, the accounts affected, the amounts, and which side each account moves.",
      "Total debits must equal total credits in every entry — without exception.",
      "Recording a credit sale and recording the cash receipt are two separate entries, not one.",
      "Errors in journal entries ripple through the ledger, trial balance, and financial statements — catching them early saves significant time.",
      "Compound entries have multiple lines but still balance; simple entries have exactly one debit and one credit.",
    ],
  },
  bank_reconciliation: {
    category: "bank_reconciliation",
    title: "Bank Reconciliation — Keeping Your Books and Your Bank in Agreement",
    lesson:
      "A bank reconciliation compares your internal cash records to the bank statement. Outstanding checks, deposits in transit, bank fees, and errors can all cause differences between the two. The goal is to explain every difference until both sides show the same adjusted balance.",
    whyItMatters:
      "Unreconciled books hide errors, missed payments, and even fraud. Most businesses reconcile monthly. Catching a small discrepancy early is far easier than untangling months of differences once something looks wrong.",
    commonConfusion:
      "An outstanding check is not an error — it is timing. You recorded the check in your books, but the bank has not cleared it yet. It is real money that has left your records but not yet left the bank's version of events.",
    reviewNext: "Debits & Credits — Understanding What Moves Your Cash Balance",
    reflectionPrompt:
      "Your books show $5,200 in cash but the bank statement shows $4,900. What are three possible explanations for that $300 difference?",
    takeaways: [
      "A bank reconciliation compares your internal cash records to the bank statement and explains every difference.",
      "Outstanding checks have left your books but not yet cleared the bank — a timing difference, not an error.",
      "Deposits in transit have been recorded internally but not yet processed by the bank.",
      "Bank fees and interest discovered on the statement must be recorded in your books after reconciling.",
      "Regular reconciliation — monthly at minimum — is the first line of defense against errors and fraud.",
    ],
  },
  payroll: {
    category: "payroll",
    title: "Payroll — Paying People and Staying Compliant",
    lesson:
      "Payroll involves more than writing a paycheck. The gross wage is what an employee earned. Deductions — federal and state tax withholding, Social Security, Medicare — reduce it to the net pay, which is what hits their bank account. The employer also owes matching Social Security and Medicare taxes on top of gross wages.",
    whyItMatters:
      "Payroll errors affect real people's income and can trigger IRS penalties. Getting withholding wrong, missing a deposit deadline, or misclassifying a worker as a contractor instead of an employee can be costly — in money and in trust.",
    commonConfusion:
      "The employee's gross pay is not the total cost to the business. The employer's share of payroll taxes adds to that cost and must be recorded separately in the books as both an expense and a liability until remitted.",
    reviewNext: "Accounts — Where Payroll Liabilities Live on the Balance Sheet",
    reflectionPrompt:
      "An employee earns $1,000 gross and takes home $750 after deductions. What is the total cost to the business — and where do the extra dollars beyond $750 actually go?",
    takeaways: [
      "Gross pay is what an employee earned; net pay is what they receive after all deductions.",
      "The employer owes payroll taxes on top of the employee's gross wage — the total cost to the business is higher than gross pay alone.",
      "Withheld taxes are a liability until remitted to the government — they must be tracked separately in the books.",
      "Misclassifying an employee as a contractor avoids short-term paperwork but creates serious compliance and penalty risk.",
      "Payroll entries affect both expense accounts (wages) and liability accounts (taxes payable) simultaneously.",
    ],
  },
};

const CATEGORY_ORDER: QuestionCategory[] = [
  "debits_credits",
  "accounts",
  "financial_statements",
  "journal_entries",
  "bank_reconciliation",
  "payroll",
];

export const TOTAL_TOPICS = CATEGORY_ORDER.length;

export const ENCOURAGEMENTS = [
  "Today's topic is one of the building blocks of bookkeeping mastery.",
  "Five minutes here can save hours of confusion later.",
  "Every expert started by learning one concept at a time.",
  "Small daily repetitions create long-term confidence.",
  "Understanding grows through practice, not perfection.",
];

export function getTodaysMeta(): {
  topic: Topic;
  topicIndex: number;
  dayOfYear: number;
} {
  const startOfYear = new Date(new Date().getFullYear(), 0, 0).getTime();
  const dayOfYear = Math.floor((Date.now() - startOfYear) / 86_400_000);
  const topicIndex = dayOfYear % CATEGORY_ORDER.length;
  return { topic: TOPICS[CATEGORY_ORDER[topicIndex]], topicIndex, dayOfYear };
}

export function getTodaysTopic(): Topic {
  return getTodaysMeta().topic;
}

export { TOPICS };

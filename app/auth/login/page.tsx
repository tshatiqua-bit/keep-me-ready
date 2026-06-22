import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-sm mx-auto px-4 py-16">
      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h1 className="text-xl font-bold text-slate-900 mb-2">Sign in</h1>
        <p className="text-sm text-slate-500 mb-6">
          Save your scores and streaks across devices. No login needed to
          practice.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

"use client";
import { useState, ChangeEvent, FormEvent } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface FormValues {
  email: string;
  password: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

interface EyeIconProps {
  open: boolean;
}

// ── Sub-components ───────────────────────────────────────────────────────────

const EyeIcon: React.FC<EyeIconProps> = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    {open ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </>
    )}
  </svg>
);

const ErrorIcon: React.FC = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// ── Validation ───────────────────────────────────────────────────────────────

const validate = ({ email, password }: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
};

// ── Main Component ───────────────────────────────────────────────────────────

const LoginForm: React.FC = () => {
  const [form, setForm] = useState<FormValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    setServerError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setServerError("");

    // Simulate API call
    await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    // Simulate failed login for demo purposes
    if (form.email !== "user@example.com" || form.password !== "password123") {
      setServerError("Invalid email or password. Try user@example.com / password123");
      return;
    }

    setSubmitted(true);
  };

  const handleReset = (): void => {
    setSubmitted(false);
    setForm({ email: "", password: "" });
  };

  // ── Success Screen ─────────────────────────────────────────────────────────

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">Welcome back!</h2>
          <p className="text-stone-400 text-sm">You've successfully signed in.</p>
          <button
            onClick={handleReset}
            className="mt-2 text-xs text-stone-500 underline underline-offset-2 hover:text-stone-300 transition-colors"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  // ── Login Form ─────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl shadow-black/60 p-8">

          {/* Header */}
          <div className="mb-8">
            <div className="w-10 h-10 bg-amber-400 rounded-xl mb-5 flex items-center justify-center shadow-md shadow-amber-400/20">
              <svg className="w-5 h-5 text-stone-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-white tracking-tight">Sign in</h1>
            <p className="text-stone-500 text-sm mt-1">Welcome back. Enter your details below.</p>
          </div>

          {/* Server-level error banner */}
          {serverError && (
            <div className="mb-5 flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-3.5 py-3">
              <ErrorIcon />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-stone-400 mb-1.5 tracking-wide uppercase"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={[
                  "w-full bg-stone-800 border rounded-lg px-3.5 py-2.5 text-sm text-white",
                  "placeholder-stone-600 outline-none transition-all duration-150",
                  "focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60",
                  errors.email
                    ? "border-red-500/60 ring-1 ring-red-500/30"
                    : "border-stone-700 hover:border-stone-600",
                ].join(" ")}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <ErrorIcon />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-stone-400 tracking-wide uppercase"
                >
                  Password
                </label>
                <a href="#" className="text-xs text-amber-400/80 hover:text-amber-400 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={[
                    "w-full bg-stone-800 border rounded-lg px-3.5 py-2.5 pr-10 text-sm text-white",
                    "placeholder-stone-600 outline-none transition-all duration-150",
                    "focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400/60",
                    errors.password
                      ? "border-red-500/60 ring-1 ring-red-500/30"
                      : "border-stone-700 hover:border-stone-600",
                  ].join(" ")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showPassword} />
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                  <ErrorIcon />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed text-stone-950 font-semibold text-sm rounded-lg py-2.5 mt-1 transition-all duration-150 shadow-md shadow-amber-400/20 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-stone-600 text-xs mt-6">
            Don't have an account?{" "}
            <a href="#" className="text-amber-400/80 hover:text-amber-400 transition-colors font-medium">
              Create one
            </a>
          </p>
        </div>

        {/* Demo hint */}
        <p className="text-center text-stone-700 text-xs mt-4">
          Demo credentials:{" "}
          <span className="text-stone-500">user@example.com / password123</span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;



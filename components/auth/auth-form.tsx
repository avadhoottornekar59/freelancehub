"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { USER_ROLES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

type AuthMode = "login" | "register";

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
    inviteCode: "",
  });

  const isRegister = mode === "register";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        const registerResponse = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });

        const registerData = await registerResponse.json();

        if (!registerResponse.ok) {
          throw new Error(registerData.message ?? "Registration failed.");
        }
      }

      const signInResponse = await signIn("credentials", {
        email: formState.email,
        password: formState.password,
        redirect: false,
      });

      if (signInResponse?.error) {
        throw new Error(signInResponse.error);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to continue.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="surface space-y-5 p-6 sm:p-8">
      {isRegister ? (
        <label className="block space-y-2">
          <span className="text-sm text-slate-200">Full name</span>
          <input
            required
            value={formState.name}
            onChange={(event) =>
              setFormState((current) => ({ ...current, name: event.target.value }))
            }
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            placeholder="Jane Doe"
          />
        </label>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm text-slate-200">Email</span>
        <input
          type="email"
          required
          value={formState.email}
          onChange={(event) =>
            setFormState((current) => ({ ...current, email: event.target.value }))
          }
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          placeholder="you@example.com"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm text-slate-200">Password</span>
        <input
          type="password"
          required
          value={formState.password}
          onChange={(event) =>
            setFormState((current) => ({ ...current, password: event.target.value }))
          }
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          placeholder="Minimum 8 characters"
        />
      </label>

      {isRegister ? (
        <>
          <label className="block space-y-2">
            <span className="text-sm text-slate-200">Role</span>
            <select
              value={formState.role}
              onChange={(event) =>
                setFormState((current) => ({ ...current, role: event.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
            >
              {USER_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </label>

          {formState.role === "admin" ? (
            <label className="block space-y-2">
              <span className="text-sm text-slate-200">Admin invite code</span>
              <input
                value={formState.inviteCode}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    inviteCode: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
                placeholder="Required for admin access"
              />
            </label>
          ) : null}
        </>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
          {error}
        </div>
      ) : null}

      <Button type="submit" disabled={loading} className="w-full justify-center">
        {loading
          ? "Please wait..."
          : isRegister
            ? "Create account"
            : "Sign in"}
      </Button>
    </form>
  );
}

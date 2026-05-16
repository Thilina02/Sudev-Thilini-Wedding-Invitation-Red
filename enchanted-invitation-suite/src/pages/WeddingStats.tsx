import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "@/lib/apiBase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type RsvpRow = {
  id: number;
  name: string;
  attending: string;
  message: string | null;
  created_at: string;
};

const fetchOpts: RequestInit = { credentials: "include" };

const WeddingStats = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [rsvps, setRsvps] = useState<RsvpRow[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadRsvps = useCallback(async () => {
    setLoadError(null);
    const res = await fetch(apiUrl("/api/private/rsvps"), fetchOpts);
    if (res.status === 401) {
      setAuthenticated(false);
      setRsvps([]);
      return;
    }
    if (!res.ok) {
      setLoadError("Could not load RSVPs.");
      return;
    }
    const data = (await res.json()) as { rsvps?: RsvpRow[] };
    setRsvps(data.rsvps ?? []);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(apiUrl("/api/auth/session"), fetchOpts);
        const data = (await res.json()) as { authenticated?: boolean };
        if (cancelled) return;
        if (data.authenticated) {
          setAuthenticated(true);
          await loadRsvps();
        }
      } catch {
        if (!cancelled) setLoadError("Could not reach the server.");
      } finally {
        if (!cancelled) setSessionChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadRsvps]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setSubmitting(true);
    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
        ...fetchOpts,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        setLoginError(body.error || "Sign-in failed.");
        return;
      }
      setPassword("");
      setAuthenticated(true);
      await loadRsvps();
    } catch {
      setLoginError("Network error. Is the backend running?");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch(apiUrl("/api/auth/logout"), { ...fetchOpts, method: "POST" });
    setAuthenticated(false);
    setRsvps([]);
  };

  if (!sessionChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="font-body text-sm text-muted-foreground tracking-wide">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-envelope mb-2 text-center">
          Private
        </p>
        <h1 className="font-display text-4xl sm:text-5xl text-envelope-dark text-center mb-10">
          RSVP overview
        </h1>

        {!authenticated ? (
          <form
            onSubmit={handleLogin}
            className="max-w-sm mx-auto space-y-6 rounded-lg border border-border bg-card p-8 shadow-sm"
          >
            <div className="space-y-2 text-center">
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Enter the shared password to view responses. Nothing is stored in the URL.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="private-password" className="font-body text-xs uppercase tracking-widest">
                Password
              </Label>
              <Input
                id="private-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-body bg-background"
                placeholder="••••••••"
              />
            </div>
            {loginError ? (
              <p className="font-body text-sm text-destructive text-center" role="alert">
                {loginError}
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={submitting || !password.trim()}>
              {submitting ? "Checking…" : "Enter"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="font-body text-sm text-muted-foreground">
                Signed in for this browser. Session lasts up to 24 hours.
              </p>
              <div className="flex gap-2 sm:justify-end">
                <Button type="button" variant="outline" size="sm" onClick={() => void loadRsvps()}>
                  Refresh
                </Button>
                <Button type="button" variant="secondary" size="sm" onClick={() => void handleLogout()}>
                  Sign out
                </Button>
              </div>
            </div>

            {loadError ? (
              <p className="font-body text-sm text-destructive text-center">{loadError}</p>
            ) : rsvps.length === 0 ? (
              <p className="font-body text-sm text-muted-foreground text-center py-12">
                No RSVPs yet.
              </p>
            ) : (
              <div className="rounded-md border border-border bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-body text-xs uppercase tracking-wider">Name</TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider">Attending</TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider">Message</TableHead>
                      <TableHead className="font-body text-xs uppercase tracking-wider">Received</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rsvps.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="font-body text-sm font-medium">{row.name}</TableCell>
                        <TableCell className="font-body text-sm">{row.attending}</TableCell>
                        <TableCell className="font-body text-sm text-muted-foreground max-w-[200px] truncate" title={row.message || undefined}>
                          {row.message || "—"}
                        </TableCell>
                        <TableCell className="font-body text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(row.created_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}

        <p className="mt-12 text-center">
          <Link to="/" className="font-body text-sm text-primary underline-offset-4 hover:underline">
            Back to invitation
          </Link>
        </p>
      </div>
    </div>
  );
};

export default WeddingStats;

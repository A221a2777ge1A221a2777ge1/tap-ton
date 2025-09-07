
"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import GoogleIcon from "./google-icon";
import { Loader2 } from "lucide-react";

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signInWithGoogle } = useAuth();

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (error) {
      setError("Failed to sign in. Please try again.");
      setLoading(false);
    }
  };

  return (
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Evana Tycoon</CardTitle>
          <CardDescription>Sign in to start your empire</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleSignIn} disabled={loading} className="w-full">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GoogleIcon className="mr-2 h-4 w-4" />
            )}
            Sign in with Google
          </Button>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Alert>
            <AlertDescription>
              Disclaimer: This is a game. All transactions are simulated.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Password, PasswordType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, AlertCircle, Shield } from "lucide-react";
import { checkPassword } from "@/lib/cryptolib";

export default function PasswordModal({
  isOpen,
  passwordData,
  toggleOpenPasswordModal,
  userUnlocked,
}: {
  isOpen: boolean;
  passwordData: Password;
  toggleOpenPasswordModal: () => void;
  userUnlocked: (password: string) => void;
}) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setShow(false);
      setError(false);
      setIsLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setError(false);

    try {
      const isPasswordValid = await checkPassword(password, passwordData.value);
      if (isPasswordValid) {
        toggleOpenPasswordModal();
        userUnlocked(password);
      } else {
        setPassword("");
        setError(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    } catch {
      setError(true);
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={toggleOpenPasswordModal}>
      <DialogContent className="sm:max-w-md shadow-2xl rounded-3xl bg-black/[0.96] overflow-hidden border border-zinc-700/50">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-purple-500/8 to-pink-500/8" />

        <div className="relative z-10 p-6">
          <DialogHeader className="text-center pb-6 pt-2">
            <div className="mx-auto mb-6 relative w-fit">
              <div className="p-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-lg relative overflow-hidden">
                <Lock className="w-7 h-7 text-white z-10 relative" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-md animate-pulse" />
              </div>
            </div>

            <DialogTitle className="text-xl font-semibold text-white mb-2">
              Secure Access Required
            </DialogTitle>
            <p className="text-sm text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Enter your password to decrypt and unlock the protected message.
            </p>
          </DialogHeader>

          <div className="space-y-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative">
                <Input
                  ref={inputRef}
                  type={show ? "text" : "password"}
                  inputMode={
                    passwordData.type === PasswordType.number
                      ? "numeric"
                      : "text"
                  }
                  pattern={
                    passwordData.type === PasswordType.number
                      ? "[0-9]*"
                      : undefined
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(
                      passwordData.type === PasswordType.number
                        ? e.target.value.replace(/[^0-9]/g, "")
                        : e.target.value
                    );
                    setError(false);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    passwordData.type === PasswordType.number
                      ? "Enter numeric passcode"
                      : "Enter password"
                  }
                  className={`pr-12 h-12 rounded-xl border-2 font-medium backdrop-blur-sm text-base transition-all duration-300 focus:ring-2 focus:ring-purple-500/50 focus:outline-none placeholder:text-zinc-500 ${
                    error
                      ? "border-red-400/60 bg-red-950/30 text-red-200 animate-shake"
                      : "border-zinc-600/50 bg-zinc-800/40 text-white hover:border-purple-500/60 focus:border-purple-500/80"
                  }`}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-400 hover:text-purple-400 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {show ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-3 bg-red-950/50 border border-red-700/50 rounded-xl animate-shake backdrop-blur-sm">
                <div className="w-8 h-8 bg-red-500/90 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-200">
                    Access Denied
                  </p>
                  <p className="text-xs text-red-300/80">
                    Incorrect password. Please try again.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-2">
              <Button
                variant="outline"
                onClick={toggleOpenPasswordModal}
                className="flex-1 h-11 rounded-xl border border-zinc-600/50 text-zinc-200 hover:bg-zinc-800/50 hover:border-zinc-500/50 hover:text-white transition-all duration-200"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-11 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                disabled={isLoading || !password.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Unlock Message</span>
                  </div>
                )}
              </Button>
            </div>

            <div className="text-center text-xs text-zinc-500 pt-2 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              <span>AES-CGM Encrypted</span>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes shake {
            0%,
            100% {
              transform: translateX(0);
            }
            25% {
              transform: translateX(-5px);
            }
            75% {
              transform: translateX(5px);
            }
          }
          .animate-shake {
            animation: shake 0.4s ease-in-out;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}

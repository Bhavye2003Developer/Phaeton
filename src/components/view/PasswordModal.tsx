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
import { Eye, EyeOff, Lock, AlertCircle, Shield, Sparkles } from "lucide-react";
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
  userUnlocked: () => void;
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
        userUnlocked();
      } else {
        setPassword("");
        setError(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    } catch (err) {
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
      <DialogContent className="sm:max-w-md border-0 shadow-2xl rounded-3xl bg-white dark:bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 opacity-60">
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <DialogHeader className="text-center pb-6 pt-2">
            <div className="mx-auto mb-6 relative">
              <div className="p-4 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-2xl w-fit mx-auto shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-75 animate-pulse"></div>
                <Lock className="w-7 h-7 text-white relative z-10" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce delay-500">
                <Sparkles className="w-2.5 h-2.5 text-white m-0.5" />
              </div>
            </div>

            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-slate-100 dark:via-slate-200 dark:to-slate-100 bg-clip-text text-transparent">
              Secure Access Required
            </DialogTitle>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 max-w-xs mx-auto leading-relaxed">
              This content is protected with end-to-end encryption. Enter your
              password to decrypt and view the message.
            </p>
          </DialogHeader>

          <div className="space-y-6 pt-2">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
                      ? "Enter your numeric passcode"
                      : "Enter your password"
                  }
                  className={`pr-14 h-14 rounded-2xl border-2 text-base transition-all duration-300 backdrop-blur-sm font-medium ${
                    error
                      ? "border-red-300 focus:border-red-500 bg-red-50/80 dark:bg-red-900/20 shake"
                      : "border-slate-200 focus:border-purple-500 dark:border-slate-700 dark:focus:border-purple-400 bg-white/80 dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800"
                  } focus:shadow-lg focus:scale-[1.02] hover:shadow-md`}
                  disabled={isLoading}
                />

                <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center pr-5 text-slate-400 hover:text-purple-600 dark:text-slate-500 dark:hover:text-purple-400 transition-all duration-200 hover:scale-110"
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
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-2xl animate-shake">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">
                    Access Denied
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400">
                    The password you entered is incorrect. Please try again.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={toggleOpenPasswordModal}
                className="flex-1 h-12 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 font-medium"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-medium"
                disabled={isLoading || !password.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <Shield className="w-3 h-3" />
              <span>Protected with AES-256 encryption</span>
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
            animation: shake 0.5s ease-in-out;
          }
          .shake {
            animation: shake 0.5s ease-in-out;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}

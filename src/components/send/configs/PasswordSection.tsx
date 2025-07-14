import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PasswordType } from "@/lib/types";
import useMessageStore from "@/lib/useMessageStore";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function PasswordSection() {
  const {
    config: { password },
    updatePasswordConfig,
  } = useMessageStore();

  const [enabled, setEnabled] = useState(password.isEnabled ?? false);
  const [passwordType, setPasswordType] = useState(
    password.type ?? PasswordType.text
  );
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(password.value ?? "");

  useEffect(() => {
    updatePasswordConfig({
      isEnabled: enabled,
      type: passwordType,
      value,
    });
  }, [enabled, passwordType, value, updatePasswordConfig]);

  return (
    <div className="space-y-4 p-3 sm:p-4 rounded-xl border border-[#404040] bg-black/[0.96] transition-all duration-300">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-neutral-300 min-w-0">
          <Lock className="w-4 h-4 shrink-0" />
          <Label className="text-sm font-medium truncate">
            Password Protection
          </Label>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
          className="data-[state=checked]:bg-[#3b82f6] shrink-0"
        />
      </div>

      {enabled && (
        <>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                setPasswordType(PasswordType.text);
                setValue("");
              }}
              className={`text-sm px-3 sm:px-4 py-2 rounded-lg border transition flex-1 sm:flex-none ${
                passwordType === PasswordType.text
                  ? "bg-[#3b82f6] text-white border-[#3b82f6]"
                  : "text-neutral-300 border-[#404040] hover:border-[#525252]"
              }`}
            >
              Alphanumeric
            </button>
            <button
              type="button"
              onClick={() => {
                setPasswordType(PasswordType.number);
                setValue("");
              }}
              className={`text-sm px-3 sm:px-4 py-2 rounded-lg border transition flex-1 sm:flex-none ${
                passwordType === PasswordType.number
                  ? "bg-[#3b82f6] text-white border-[#3b82f6]"
                  : "text-neutral-300 border-[#404040] hover:border-[#525252]"
              }`}
            >
              Numeric
            </button>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Input
                type={show ? "text" : "password"}
                inputMode={
                  passwordType === PasswordType.number ? "numeric" : "text"
                }
                pattern={
                  passwordType === PasswordType.number ? "[0-9]*" : undefined
                }
                value={value}
                onChange={(e) =>
                  setValue(
                    passwordType === PasswordType.number
                      ? e.target.value.replace(/[^0-9]/g, "")
                      : e.target.value
                  )
                }
                placeholder={
                  passwordType === PasswordType.number
                    ? "Enter numeric code"
                    : "Enter password"
                }
                className="pr-12 bg-[#0a0a0a] border border-[#404040] text-white focus:border-[#3b82f6] text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-neutral-400 hover:text-white touch-manipulation"
              >
                {show ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex items-start sm:items-center gap-2 text-xs text-neutral-500">
              <Shield className="w-3 h-3 shrink-0 mt-0.5 sm:mt-0" />
              <span className="leading-relaxed">
                {passwordType === PasswordType.number
                  ? "Numeric PIN required to access message"
                  : "Alphanumeric password required to access message"}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

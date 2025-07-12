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

  const handleToggle = (val: boolean) => {
    setEnabled(val);
  };

  const handleTypeChange = (type: PasswordType) => {
    setPasswordType(type);
    setValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const clean =
      passwordType === PasswordType.number ? raw.replace(/[^0-9]/g, "") : raw;

    setValue(clean);
  };

  return (
    <div className="space-y-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
            <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Password Protect Message
          </Label>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-green-600"
        />
      </div>

      {enabled && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleTypeChange(PasswordType.text)}
            className={`text-sm px-4 py-2 rounded-lg border transition-all duration-200 ${
              passwordType === PasswordType.text
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "text-slate-600 dark:text-slate-400 border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
            }`}
          >
            Alphanumeric
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange(PasswordType.number)}
            className={`text-sm px-4 py-2 rounded-lg border transition-all duration-200 ${
              passwordType === PasswordType.number
                ? "bg-green-600 text-white border-green-600 shadow-md"
                : "text-slate-600 dark:text-slate-400 border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
            }`}
          >
            Numeric
          </button>
        </div>
      )}

      {enabled && (
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
              onChange={handleInputChange}
              placeholder={
                passwordType === PasswordType.number
                  ? "Enter numeric passcode"
                  : "Enter password"
              }
              className="pr-12 border-green-200 dark:border-green-700 focus:ring-2 focus:ring-green-500 bg-white dark:bg-slate-800"
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
              {show ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
            <Shield className="w-3 h-3" />
            <span>
              {passwordType === PasswordType.number
                ? "Enter a numeric PIN for secure access"
                : "Create a strong password for secure access"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import useMessageStore from "@/lib/useMessageStore";
import { PasswordType } from "@/lib/types";

export default function PasswordSection() {
  const {
    config: { password },
    updatePasswordConfig,
  } = useMessageStore();

  const [enabled, setEnabled] = useState(password.isEnabled ?? false);
  const [passwordType, setPasswordType] = useState<PasswordType>(
    password.type ?? PasswordType.text
  );
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(password.value ?? "");

  // Sync to store when local state changes
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
    setValue(""); // reset input on type change
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const clean =
      passwordType === PasswordType.number
        ? raw.replace(/[^0-9]/g, "") // strip non-numeric
        : raw;

    // if (clean.trim() === "") {
    //   setEnabled(false);
    // }
    setValue(clean);
  };

  return (
    <div className="space-y-4">
      {/* Password Enable Switch */}
      <div className="flex items-center justify-between">
        <Label className="text-sm">Password Protect Message</Label>
        <Switch checked={enabled} onCheckedChange={handleToggle} />
      </div>

      {/* Password Type Selector */}
      {enabled && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleTypeChange(PasswordType.text)}
            className={`text-sm px-3 py-1 rounded-md border transition-colors ${
              passwordType === PasswordType.text
                ? "bg-ring text-white border-ring"
                : "text-muted-foreground border-input"
            }`}
          >
            Alphanumeric
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange(PasswordType.number)}
            className={`text-sm px-3 py-1 rounded-md border transition-colors ${
              passwordType === PasswordType.number
                ? "bg-ring text-white border-ring"
                : "text-muted-foreground border-input"
            }`}
          >
            Numeric
          </button>
        </div>
      )}

      {/* Password Input */}
      {enabled && (
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
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
          >
            {show ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

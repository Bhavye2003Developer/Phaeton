"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMessageStore from "@/lib/useMessageStore";
import { useMemo } from "react";

export default function OpenLimitSection() {
  const {
    config: { openLimit },
    updateOpenLimit,
  } = useMessageStore();

  const limits = useMemo(() => [1, 2, 3, 5, 10, "NA"], []);
  const selectedLimit = openLimit === 10e5 ? "NA" : String(openLimit);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">
          Open Limit
        </span>
        <Select
          value={selectedLimit}
          onValueChange={(val) => {
            const numeric = val === "NA" ? 10e5 : Number(val);
            updateOpenLimit(numeric);
          }}
        >
          <SelectTrigger className="w-28 rounded-md border border-input shadow-sm focus:ring-1 focus:ring-ring">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {limits.map((v) => (
              <SelectItem key={v} value={String(v)}>
                {v === "NA" ? "No Limit" : v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="text-xs text-muted-foreground text-right">
        Number of times this message can be opened. Select "No Limit" to allow
        unlimited views.
      </p>
    </div>
  );
}

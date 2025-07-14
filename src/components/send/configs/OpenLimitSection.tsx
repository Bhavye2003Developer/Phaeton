import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMessageStore from "@/lib/useMessageStore";
import { CheckCircle2, Users } from "lucide-react";
import { useMemo } from "react";

export default function OpenLimitSection() {
  const {
    config: { openLimit },
    updateOpenLimit,
  } = useMessageStore();

  const limits = useMemo(() => [1, 2, 3, 5, 10, "NA"], []);
  const selectedLimit = openLimit === 10e5 ? "NA" : String(openLimit);

  return (
    <div className="space-y-3 p-4 rounded-xl border border-[#404040] bg-black/[0.96] transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-300">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">Open Limit</span>
        </div>
        <Select
          value={selectedLimit}
          onValueChange={(val) => {
            const numeric = val === "NA" ? 10e5 : Number(val);
            updateOpenLimit(numeric);
          }}
        >
          <SelectTrigger className="w-28 bg-black/[0.96] border border-[#404040] text-white rounded-lg">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent className="bg-black/[0.96]">
            {limits.map((v) => (
              <SelectItem key={v} value={String(v)}>
                {v === "NA" ? "No Limit" : v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2 text-xs text-neutral-400">
        <CheckCircle2 className="w-3 h-3" />
        <span>
          Number of times this message can be opened. &quot;No Limit&quot;
          allows unlimited views.
        </span>
      </div>
    </div>
  );
}

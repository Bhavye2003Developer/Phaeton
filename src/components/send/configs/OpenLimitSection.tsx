import { Input } from "@/components/ui/input";
import useMessageStore from "@/lib/useMessageStore";

export default function OpenLimitSection() {
  const {
    configs: { openLimit },
    updateOpenLimit,
  } = useMessageStore();

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>Open Limit</span>
      <Input
        type="number"
        min={1}
        className="w-28"
        value={openLimit}
        onChange={(e) => updateOpenLimit(+e.target.value)}
      />
    </div>
  );
}

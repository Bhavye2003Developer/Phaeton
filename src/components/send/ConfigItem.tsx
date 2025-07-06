import { Badge } from "../ui/badge";

export default function ConfigItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>{label}</span>
      <Badge variant="outline">{value}</Badge>
    </div>
  );
}

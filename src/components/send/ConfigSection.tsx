import { Badge } from "../ui/badge";

export default function ConfigSection() {
  return (
    <div>
      <h1>Configuration</h1>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Encryption</span>
        <Badge variant="outline">AES-GCM</Badge>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        Open Limit
        <Badge variant={"outline"}>5 minutes</Badge>
      </div>
    </div>
  );
}

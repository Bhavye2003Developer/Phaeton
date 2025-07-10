import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Encryption } from "@/lib/types";
import useMessageStore from "@/lib/useMessageStore";

export default function EncryptionSection() {
  const {
    config: { encryption },
    updateEncryption,
  } = useMessageStore();

  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <span>Encryption</span>
      <Select
        onValueChange={(val) => {
          console.log("Changed: ", val);
          updateEncryption(val as Encryption);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder={encryption} />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(Encryption).map((type) => (
            <SelectItem value={type} key={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

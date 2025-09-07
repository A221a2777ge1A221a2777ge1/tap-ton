import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface TapSectionProps {
  handleTap: () => void;
}

export default function TapSection({ handleTap }: TapSectionProps) {
  return (
    <Card>
      <CardContent className="flex justify-center items-center py-16">
        <Button onClick={handleTap} size="lg" className="h-32 w-32 rounded-full text-2xl font-bold">
          Tap!
        </Button>
      </CardContent>
    </Card>
  );
}

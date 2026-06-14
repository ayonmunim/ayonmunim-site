import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { initUISound, isSoundEnabled, setSoundEnabled } from "@/lib/ui-sound";

export function SoundToggle() {
  const [on, setOn] = useState(true);

  useEffect(() => {
    initUISound();
    setOn(isSoundEnabled());
  }, []);

  const toggle = () => {
    const next = !on;
    setSoundEnabled(next);
    setOn(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={on ? "Mute interface sounds" : "Enable interface sounds"}
      title={on ? "Sound on" : "Sound off"}
      className="fixed bottom-5 right-5 z-50 flex size-11 items-center justify-center rounded-full border border-ink/15 bg-bone/80 text-ink shadow-sm backdrop-blur-xl transition hover:border-ink hover:bg-ink hover:text-bone"
    >
      {on ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
    </button>
  );
}

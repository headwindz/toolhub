import { Card } from "@/components/ui/card";

type FingerType =
  | "left-pinky"
  | "left-ring"
  | "left-middle"
  | "left-index"
  | "right-index"
  | "right-middle"
  | "right-ring"
  | "right-pinky";

// Keyboard layout with finger assignments
const KEYBOARD_LAYOUT = {
  row1: [
    { key: "`", finger: "left-pinky" },
    { key: "1", finger: "left-pinky" },
    { key: "2", finger: "left-ring" },
    { key: "3", finger: "left-middle" },
    { key: "4", finger: "left-index" },
    { key: "5", finger: "left-index" },
    { key: "6", finger: "right-index" },
    { key: "7", finger: "right-index" },
    { key: "8", finger: "right-middle" },
    { key: "9", finger: "right-ring" },
    { key: "0", finger: "right-pinky" },
    { key: "-", finger: "right-pinky" },
    { key: "=", finger: "right-pinky" },
  ],
  row2: [
    { key: "Q", finger: "left-pinky" },
    { key: "W", finger: "left-ring" },
    { key: "E", finger: "left-middle" },
    { key: "R", finger: "left-index" },
    { key: "T", finger: "left-index" },
    { key: "Y", finger: "right-index" },
    { key: "U", finger: "right-index" },
    { key: "I", finger: "right-middle" },
    { key: "O", finger: "right-ring" },
    { key: "P", finger: "right-pinky" },
    { key: "[", finger: "right-pinky" },
    { key: "]", finger: "right-pinky" },
    { key: "\\", finger: "right-pinky" },
  ],
  row3: [
    { key: "A", finger: "left-pinky", homeRow: true },
    { key: "S", finger: "left-ring", homeRow: true },
    { key: "D", finger: "left-middle", homeRow: true },
    { key: "F", finger: "left-index", homeRow: true, bump: true },
    { key: "G", finger: "left-index" },
    { key: "H", finger: "right-index" },
    { key: "J", finger: "right-index", homeRow: true, bump: true },
    { key: "K", finger: "right-middle", homeRow: true },
    { key: "L", finger: "right-ring", homeRow: true },
    { key: ";", finger: "right-pinky", homeRow: true },
    { key: "'", finger: "right-pinky" },
  ],
  row4: [
    { key: "Z", finger: "left-pinky" },
    { key: "X", finger: "left-ring" },
    { key: "C", finger: "left-middle" },
    { key: "V", finger: "left-index" },
    { key: "B", finger: "left-index" },
    { key: "N", finger: "right-index" },
    { key: "M", finger: "right-index" },
    { key: ",", finger: "right-middle" },
    { key: ".", finger: "right-ring" },
    { key: "/", finger: "right-pinky" },
  ],
};

const FINGER_COLORS: Record<FingerType, string> = {
  "left-pinky":
    "bg-pink-500/20 border-pink-500/50 text-pink-600 dark:text-pink-400",
  "left-ring":
    "bg-blue-500/20 border-blue-500/50 text-blue-600 dark:text-blue-400",
  "left-middle":
    "bg-green-500/20 border-green-500/50 text-green-600 dark:text-green-400",
  "left-index":
    "bg-yellow-500/20 border-yellow-500/50 text-yellow-600 dark:text-yellow-400",
  "right-index":
    "bg-yellow-500/20 border-yellow-500/50 text-yellow-600 dark:text-yellow-400",
  "right-middle":
    "bg-green-500/20 border-green-500/50 text-green-600 dark:text-green-400",
  "right-ring":
    "bg-blue-500/20 border-blue-500/50 text-blue-600 dark:text-blue-400",
  "right-pinky":
    "bg-pink-500/20 border-pink-500/50 text-pink-600 dark:text-pink-400",
};

const FINGER_LABELS: Record<FingerType, string> = {
  "left-pinky": "Left Pinky",
  "left-ring": "Left Ring",
  "left-middle": "Left Middle",
  "left-index": "Left Index",
  "right-index": "Right Index",
  "right-middle": "Right Middle",
  "right-ring": "Right Ring",
  "right-pinky": "Right Pinky",
};

interface KeyboardGuideProps {
  currentKey?: string;
}

export function KeyboardGuide({ currentKey }: KeyboardGuideProps) {
  const getCurrentKeyFinger = (): FingerType | null => {
    if (!currentKey) return null;
    const upperKey = currentKey.toUpperCase();

    for (const row of Object.values(KEYBOARD_LAYOUT)) {
      for (const keyData of row) {
        if (
          keyData.key === upperKey ||
          keyData.key.toLowerCase() === currentKey
        ) {
          return keyData.finger as FingerType;
        }
      }
    }
    return null;
  };

  const currentFinger = getCurrentKeyFinger();

  return (
    <Card className="border-2 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Keyboard Guide</h3>
          {currentFinger && (
            <div className="text-sm">
              <span className="text-muted-foreground">Use: </span>
              <span className="font-semibold">
                {FINGER_LABELS[currentFinger]}
              </span>
            </div>
          )}
        </div>

        {/* Keyboard Layout */}
        <div className="space-y-1 overflow-x-auto">
          {/* Row 1 - Numbers */}
          <div className="flex gap-1 justify-center">
            {KEYBOARD_LAYOUT.row1.map((keyData) => (
              <div
                key={keyData.key}
                className={`flex h-10 w-10 items-center justify-center rounded border text-xs font-mono font-semibold transition-all ${
                  FINGER_COLORS[keyData.finger]
                } ${
                  currentKey &&
                  (keyData.key === currentKey.toUpperCase() ||
                    keyData.key === currentKey)
                    ? "ring-2 ring-primary scale-110"
                    : ""
                }`}
              >
                {keyData.key}
              </div>
            ))}
          </div>

          {/* Row 2 - QWERTY */}
          <div className="flex gap-1 justify-center pl-6">
            {KEYBOARD_LAYOUT.row2.map((keyData) => (
              <div
                key={keyData.key}
                className={`flex h-10 w-10 items-center justify-center rounded border text-xs font-mono font-semibold transition-all ${
                  FINGER_COLORS[keyData.finger]
                } ${
                  currentKey &&
                  (keyData.key === currentKey.toUpperCase() ||
                    keyData.key.toLowerCase() === currentKey)
                    ? "ring-2 ring-primary scale-110"
                    : ""
                }`}
              >
                {keyData.key}
              </div>
            ))}
          </div>

          {/* Row 3 - Home Row (ASDF JKL;) */}
          <div className="flex gap-1 justify-center pl-8">
            {KEYBOARD_LAYOUT.row3.map((keyData) => (
              <div
                key={keyData.key}
                className={`relative flex h-10 w-10 items-center justify-center rounded border text-xs font-mono font-semibold transition-all ${
                  FINGER_COLORS[keyData.finger]
                } ${keyData.homeRow ? "ring-2 ring-primary/50" : ""} ${
                  currentKey &&
                  (keyData.key === currentKey.toUpperCase() ||
                    keyData.key.toLowerCase() === currentKey)
                    ? "ring-2 ring-primary scale-110"
                    : ""
                }`}
              >
                {keyData.key}
                {keyData.bump && (
                  <div className="absolute bottom-1 h-1 w-1 rounded-full bg-current" />
                )}
              </div>
            ))}
          </div>

          {/* Row 4 - ZXCV */}
          <div className="flex gap-1 justify-center pl-12">
            {KEYBOARD_LAYOUT.row4.map((keyData) => (
              <div
                key={keyData.key}
                className={`flex h-10 w-10 items-center justify-center rounded border text-xs font-mono font-semibold transition-all ${
                  FINGER_COLORS[keyData.finger]
                } ${
                  currentKey &&
                  (keyData.key === currentKey.toUpperCase() ||
                    keyData.key.toLowerCase() === currentKey)
                    ? "ring-2 ring-primary scale-110"
                    : ""
                }`}
              >
                {keyData.key}
              </div>
            ))}
          </div>

          {/* Spacebar */}
          <div className="flex gap-1 justify-center pt-1">
            <div
              className={`flex h-10 w-64 items-center justify-center rounded border text-xs font-semibold transition-all ${"bg-purple-500/20 border-purple-500/50 text-purple-600 dark:text-purple-400"} ${
                currentKey === " " ? "ring-2 ring-primary scale-105" : ""
              }`}
            >
              SPACE (Thumbs)
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded border bg-pink-500/20 border-pink-500/50" />
              <span className="text-muted-foreground">Pinky</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded border bg-blue-500/20 border-blue-500/50" />
              <span className="text-muted-foreground">Ring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded border bg-green-500/20 border-green-500/50" />
              <span className="text-muted-foreground">Middle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded border bg-yellow-500/20 border-yellow-500/50" />
              <span className="text-muted-foreground">Index</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Keys with ring outline are the home row position (ASDF JKL;). F and
            J have bumps for finger positioning.
          </div>
        </div>
      </div>
    </Card>
  );
}

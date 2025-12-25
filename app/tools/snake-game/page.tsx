"use client";

import { ToolLayout } from "@/components/tool-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gamepad2, Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type Position = { x: number; y: number };

const GRID_SIZE = 25;
const CELL_SIZE = 26;
const INITIAL_SPEED = 150;

export default function SnakeGamePage() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT");
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (
      snakeBody.some(
        (segment) => segment.x === newFood.x && segment.y === newFood.y,
      )
    );
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    setSnake(initialSnake);
    setFood(generateFood(initialSnake));
    setDirection("RIGHT");
    setNextDirection("RIGHT");
    setScore(0);
    setGameOver(false);
    setSpeed(INITIAL_SPEED);
  }, [generateFood]);

  const startGame = () => {
    resetGame();
    setIsPlaying(true);
  };

  const pauseGame = () => {
    setIsPlaying(false);
  };

  const moveSnake = useCallback(() => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      let newHead: Position;

      switch (nextDirection) {
        case "UP":
          newHead = { x: head.x, y: head.y - 1 };
          break;
        case "DOWN":
          newHead = { x: head.x, y: head.y + 1 };
          break;
        case "LEFT":
          newHead = { x: head.x - 1, y: head.y };
          break;
        case "RIGHT":
          newHead = { x: head.x + 1, y: head.y };
          break;
      }

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) {
          setHighScore(score);
        }
        return prevSnake;
      }

      // Check self collision
      if (
        prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y,
        )
      ) {
        setGameOver(true);
        setIsPlaying(false);
        if (score > highScore) {
          setHighScore(score);
        }
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(generateFood(newSnake));
        // Increase speed slightly
        setSpeed((prev) => Math.max(50, prev - 5));
        return newSnake;
      }

      // Remove tail if no food eaten
      newSnake.pop();
      return newSnake;
    });

    setDirection(nextDirection);
  }, [nextDirection, food, score, highScore, generateFood]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (!isPlaying && e.key !== " ") return;

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          if (direction !== "DOWN") setNextDirection("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          if (direction !== "UP") setNextDirection("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          if (direction !== "RIGHT") setNextDirection("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          if (direction !== "LEFT") setNextDirection("RIGHT");
          break;
        case " ":
          e.preventDefault();
          if (gameOver) {
            startGame();
          } else {
            setIsPlaying((prev) => !prev);
          }
          break;
      }
    },
    [isPlaying, direction, gameOver],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, speed);
      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
    }
  }, [isPlaying, gameOver, moveSnake, speed]);

  return (
    <ToolLayout
      title="Snake Game"
      description="Classic snake game - eat food and grow!"
      icon={Gamepad2}
      badges={[{ label: "Classic Game", icon: Sparkles }, { label: "Fun" }]}
    >
      {/* <SnakeGameKnowledge /> */}

      <Card className="border-2 shadow-xl transition-shadow overflow-hidden hover:shadow-2xl">
        <div className="bg-gradient-to-r to-transparent from-primary/10 via-primary/5 p-6">
          <h2 className="font-semibold text-xl">Game Arena</h2>
          <p className="text-sm text-muted-foreground">
            Use arrow keys or WASD to control the snake
          </p>
        </div>

        <div className="p-6 pt-4">
          {/* Game Board */}
          <div className="flex mb-6 justify-center">
            <div
              className="rounded-lg border-4 border-muted-foreground/30 relative overflow-hidden"
              style={{
                width: GRID_SIZE * CELL_SIZE,
                height: GRID_SIZE * CELL_SIZE,
                backgroundColor: "#1a1a1a",
              }}
            >
              {/* Grid lines */}
              {Array.from({ length: GRID_SIZE }).map((_, i) => (
                <div
                  key={`h-${i}`}
                  className="border-t border-muted-foreground/10 absolute"
                  style={{
                    top: i * CELL_SIZE,
                    width: "100%",
                    height: 1,
                  }}
                />
              ))}
              {Array.from({ length: GRID_SIZE }).map((_, i) => (
                <div
                  key={`v-${i}`}
                  className="border-l border-muted-foreground/10 absolute"
                  style={{
                    left: i * CELL_SIZE,
                    height: "100%",
                    width: 1,
                  }}
                />
              ))}

              {/* Snake */}
              {snake.map((segment, index) => (
                <div
                  key={index}
                  className="transition-all duration-75 absolute"
                  style={{
                    left: segment.x * CELL_SIZE,
                    top: segment.y * CELL_SIZE,
                    width: CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    backgroundColor: index === 0 ? "#22c55e" : "#16a34a",
                    borderRadius: index === 0 ? "4px" : "2px",
                    border: index === 0 ? "2px solid #86efac" : "none",
                  }}
                />
              ))}

              {/* Food */}
              <div
                className="animate-pulse absolute"
                style={{
                  left: food.x * CELL_SIZE,
                  top: food.y * CELL_SIZE,
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  backgroundColor: "#ef4444",
                  borderRadius: "50%",
                  border: "2px solid #fca5a5",
                }}
              />

              {/* Game Over Overlay */}
              {gameOver && (
                <div className="flex bg-black/80 inset-0 absolute items-center justify-center">
                  <div className="text-center">
                    <p className="font-bold mb-2 text-3xl text-red-500">
                      Game Over!
                    </p>
                    <p className="text-xl text-white mb-4">
                      Final Score: {score}
                    </p>
                    {score === highScore && score > 0 && (
                      <p className="text-sm mb-4 text-orange-500">
                        🎉 New High Score! 🎉
                      </p>
                    )}
                    <Button onClick={startGame} size="lg" className="shadow-lg">
                      <Play className="h-5 mr-2 w-5" />
                      Play Again
                    </Button>
                  </div>
                </div>
              )}

              {/* Start Screen */}
              {!isPlaying && !gameOver && (
                <div className="flex bg-black/80 inset-0 absolute items-center justify-center">
                  <div className="text-center">
                    <Gamepad2 className="mx-auto h-16 text-primary mb-4 opacity-50 w-16" />
                    <p className="font-medium text-lg text-white mb-2">
                      Ready to Play?
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Eat the red food to grow!
                    </p>
                    <Button onClick={startGame} size="lg" className="shadow-lg">
                      <Play className="h-5 mr-2 w-5" />
                      Start Game
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            {!isPlaying && !gameOver ? (
              <Button onClick={startGame} size="lg" className="flex-1">
                <Play className="h-4 mr-2 w-4" />
                Start Game
              </Button>
            ) : isPlaying ? (
              <Button
                onClick={pauseGame}
                size="lg"
                variant="outline"
                className="flex-1"
              >
                <Pause className="h-4 mr-2 w-4" />
                Pause
              </Button>
            ) : null}
            <Button onClick={resetGame} size="lg" variant="outline">
              <RotateCcw className="h-4 mr-2 w-4" />
              Reset
            </Button>
          </div>

          {/* Instructions */}
          <div className="border rounded-lg bg-muted/50 mt-6 p-4">
            <h3 className="font-semibold text-sm mb-2">🎮 Controls</h3>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• Arrow Keys or WASD to move</li>
              <li>• Space to pause/resume</li>
              <li>• Eat red food to grow and score points</li>
              <li>• Don't hit walls or yourself!</li>
              <li>• Speed increases as you score</li>
            </ul>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}

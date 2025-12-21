export function TypingKnowledge() {
  return (
    <div className="space-y-4 text-sm leading-relaxed p-6">
      <section>
        <h3 className="font-semibold text-lg mb-3">Why Practice Typing?</h3>
        <p className="text-muted-foreground">
          Touch typing is an essential skill in the digital age. Improving your
          typing speed and accuracy can significantly boost your productivity,
          reduce fatigue, and help you focus more on your ideas rather than the
          mechanics of typing.
        </p>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3">Key Metrics</h3>
        <div className="space-y-3">
          <div>
            <strong className="text-foreground">WPM (Words Per Minute)</strong>
            <p className="mt-1 text-muted-foreground">
              Measures typing speed. Average typist: 40 WPM. Professional: 65-75
              WPM. Expert: 90+ WPM.
            </p>
          </div>
          <div>
            <strong className="text-foreground">Accuracy</strong>
            <p className="mt-1 text-muted-foreground">
              Percentage of correctly typed characters. Aim for 95%+ accuracy
              before focusing on speed. Accuracy is more important than speed.
            </p>
          </div>
          <div>
            <strong className="text-foreground">Consistency</strong>
            <p className="mt-1 text-muted-foreground">
              Regular practice (15-30 minutes daily) is more effective than
              occasional long sessions. Build muscle memory gradually.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3">Tips for Improvement</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Proper Posture:</strong> Sit
            upright with feet flat on the floor. Keep wrists elevated and
            fingers curved over the home row keys.
          </li>
          <li>
            <strong className="text-foreground">Home Row Position:</strong> Rest
            your fingers on ASDF (left hand) and JKL; (right hand). Your index
            fingers should feel the bumps on F and J keys.
          </li>
          <li>
            <strong className="text-foreground">Look at Screen:</strong> Train
            yourself to type without looking at the keyboard. This builds muscle
            memory and increases speed.
          </li>
          <li>
            <strong className="text-foreground">
              Focus on Accuracy First:
            </strong>{" "}
            Speed will naturally increase as you build muscle memory. Typing
            fast with errors is counterproductive.
          </li>
          <li>
            <strong className="text-foreground">Practice Regularly:</strong>{" "}
            Daily 15-20 minute sessions are more effective than sporadic long
            practice sessions.
          </li>
          <li>
            <strong className="text-foreground">Use All Fingers:</strong> Each
            finger has designated keys. Using proper finger placement prevents
            strain and increases speed.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3">Difficulty Levels</h3>
        <div className="space-y-3">
          <div>
            <strong className="text-foreground">Easy</strong>
            <p className="mt-1 text-muted-foreground">
              Short, simple sentences with common words. Perfect for beginners
              to build confidence and accuracy.
            </p>
          </div>
          <div>
            <strong className="text-foreground">Medium</strong>
            <p className="mt-1 text-muted-foreground">
              Longer sentences with varied vocabulary. Great for intermediate
              typists working on consistency.
            </p>
          </div>
          <div>
            <strong className="text-foreground">Hard</strong>
            <p className="mt-1 text-muted-foreground">
              Complex sentences with technical terms and punctuation. For
              advanced typists seeking mastery.
            </p>
          </div>
          <div>
            <strong className="text-foreground">Code</strong>
            <p className="mt-1 text-muted-foreground">
              Programming syntax with special characters, brackets, and
              semicolons. Essential for developers.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3">Common Mistakes</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            Looking at the keyboard instead of the screen - breaks muscle memory
            development
          </li>
          <li>
            Using only 2-4 fingers instead of all 10 - leads to strain and
            limits speed
          </li>
          <li>
            Rushing to increase speed before mastering accuracy - creates bad
            habits
          </li>
          <li>
            Inconsistent practice schedule - makes progress slower and harder to
            maintain
          </li>
          <li>
            Poor posture - causes fatigue, pain, and reduces typing efficiency
          </li>
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-lg mb-3">Setting Goals</h3>
        <p className="text-muted-foreground">
          Start with achievable targets and gradually increase difficulty:
        </p>
        <ul className="space-y-2 mt-3 text-muted-foreground">
          <li>Beginner: 20-30 WPM with 90% accuracy</li>
          <li>Intermediate: 40-50 WPM with 95% accuracy</li>
          <li>Advanced: 60-80 WPM with 97% accuracy</li>
          <li>Expert: 90+ WPM with 98%+ accuracy</li>
        </ul>
      </section>
    </div>
  );
}

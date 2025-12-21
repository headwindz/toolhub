export type OperationType =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";

export interface MathQuestion {
  id: string;
  type: OperationType;
  operand1: number;
  operand2: number;
  answer: number;
  displayText: string;
}

export interface QuizConfig {
  type: OperationType;
  firstOperandDigits: number;
  secondOperandDigits: number;
  numberOfQuestions: number;
}

function generateRandomNumber(digits: number): number {
  if (digits <= 0) return 0;
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAdditionQuestion(
  augendDigits: number,
  addendDigits: number,
): MathQuestion {
  const operand1 = generateRandomNumber(augendDigits);
  const operand2 = generateRandomNumber(addendDigits);
  const answer = operand1 + operand2;

  return {
    id: Math.random().toString(36),
    type: "addition",
    operand1,
    operand2,
    answer,
    displayText: `${operand1} + ${operand2} = (  )`,
  };
}

function generateSubtractionQuestion(
  minuendDigits: number,
  subtrahendDigits: number,
): MathQuestion {
  let operand1 = generateRandomNumber(minuendDigits);
  let operand2 = generateRandomNumber(subtrahendDigits);

  // Ensure operand1 >= operand2 to avoid negative results
  if (operand1 < operand2) {
    [operand1, operand2] = [operand2, operand1];
  }

  const answer = operand1 - operand2;

  return {
    id: Math.random().toString(36),
    type: "subtraction",
    operand1,
    operand2,
    answer,
    displayText: `${operand1} - ${operand2} = (  )`,
  };
}

function generateMultiplicationQuestion(
  multiplierDigits: number,
  multiplicandDigits: number,
): MathQuestion {
  const operand1 = generateRandomNumber(multiplierDigits);
  const operand2 = generateRandomNumber(multiplicandDigits);
  const answer = operand1 * operand2;

  return {
    id: Math.random().toString(36),
    type: "multiplication",
    operand1,
    operand2,
    answer,
    displayText: `${operand1} × ${operand2} = (  )`,
  };
}

function generateDivisionQuestion(
  dividendDigits: number,
  divisorDigits: number,
): MathQuestion {
  // Generate divisor first
  let divisor = generateRandomNumber(divisorDigits);
  // Ensure divisor is not 0
  while (divisor === 0) {
    divisor = generateRandomNumber(divisorDigits);
  }

  // Generate a quotient that fits in dividendDigits
  const maxQuotient = Math.pow(10, dividendDigits) - 1;
  const quotient = Math.floor(Math.random() * maxQuotient) + 1;

  // Calculate dividend
  const dividend = quotient * divisor;

  // Make sure dividend doesn't exceed digit limit
  const actualDividendDigits = dividend.toString().length;
  if (actualDividendDigits > dividendDigits) {
    // Recursively try again
    return generateDivisionQuestion(dividendDigits, divisorDigits);
  }

  return {
    id: Math.random().toString(36),
    type: "division",
    operand1: dividend,
    operand2: divisor,
    answer: quotient,
    displayText: `${dividend} ÷ ${divisor} = (  )`,
  };
}

export function generateQuestions(config: QuizConfig): MathQuestion[] {
  const questions: MathQuestion[] = [];

  for (let i = 0; i < config.numberOfQuestions; i++) {
    let question: MathQuestion;

    switch (config.type) {
      case "addition":
        question = generateAdditionQuestion(
          config.firstOperandDigits,
          config.secondOperandDigits,
        );
        break;
      case "subtraction":
        question = generateSubtractionQuestion(
          config.firstOperandDigits,
          config.secondOperandDigits,
        );
        break;
      case "multiplication":
        question = generateMultiplicationQuestion(
          config.firstOperandDigits,
          config.secondOperandDigits,
        );
        break;
      case "division":
        question = generateDivisionQuestion(
          config.firstOperandDigits,
          config.secondOperandDigits,
        );
        break;
      default:
        continue;
    }

    questions.push(question);
  }

  return questions;
}

export function getOperandLabel(type: OperationType, isFirst: boolean): string {
  switch (type) {
    case "addition":
      return isFirst ? "Augend digits" : "Addend digits";
    case "subtraction":
      return isFirst ? "Minuend digits" : "Subtrahend digits";
    case "multiplication":
      return isFirst ? "Multiplier digits" : "Multiplicand digits";
    case "division":
      return isFirst ? "Dividend digits" : "Divisor digits";
    default:
      return isFirst ? "First" : "Second";
  }
}

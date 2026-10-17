// Core quiz logic.
// This file has NO browser (DOM) code so it can be tested with Node.js.

/**
 * Returns a new array with the items in random order.
 * The original array is not changed.
 */
function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Returns a fresh quiz state with questions shuffled and score reset.
 */
function createQuiz(questions) {
  return {
    questions: shuffle(questions),
    current: 0,
    score: 0,
  };
}

/**
 * Returns the next state after selecting an answer, plus a boolean flag
 * indicating whether the answer was correct.
 */
function answerQuestion(state, selectedIndex) {
  const question = state.questions[state.current];
  const correct = question ? question.answer === selectedIndex : false;
  const nextState = {
    ...state,
    score: state.score + (correct ? 1 : 0),
  };

  return { state: nextState, correct };
}

/**
 * Returns true when the quiz has reached the end.
 */
function isQuizFinished(state) {
  return state.current >= state.questions.length;
}

/**
 * Returns true when the selected option is the correct one.
 */
function isCorrect(question, selectedIndex) {
  return question.answer === selectedIndex;
}

/**
 * Converts a score into a whole-number percentage (0-100).
 */
function calculatePercentage(score, total) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

/**
 * Formats the remaining time for display in the quiz UI.
 */
function formatTimeLeft(seconds) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `⏱ ${safeSeconds}s`;
}

/**
 * Turns a percentage into a grade.
 * A = 90% or more, B = 75% or more, C = 50% or more.
 */
function getGrade(percentage) {
  if (percentage >= 90) return "A";
  if (percentage >= 75) return "B";
  if (percentage >= 50) return "C";
  return "Keep practicing";
}

// Returns an encouraging message for a grade: "A", "B", "C" or anything else
function getFeedbackMessage(grade) {
  switch (grade) {
    case "A":
      return "Excellent work!";
    case "B":
      return "Good job!";
    case "C":
      return "You can do better!";
    default:
      return "Keep practicing!";
  }
}

/**
 * Returns true when the current percentage is a new personal best.
 * The best value may be null when no previous score has been stored.
 */
function isNewBestScore(current, best) {
  if (best === null || best === undefined) {
    return true;
  }

  const numericCurrent = Number(current);
  const numericBest = Number(best);

  if (!Number.isFinite(numericCurrent) || !Number.isFinite(numericBest)) {
    return false;
  }

  return numericCurrent > numericBest;
}

// Lets Node.js tests load this file. Browsers ignore this block.
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    shuffle,
    createQuiz,
    answerQuestion,
    isQuizFinished,
    isCorrect,
    calculatePercentage,
    formatTimeLeft,
    getGrade,
    getFeedbackMessage,
    isNewBestScore,
  };
}

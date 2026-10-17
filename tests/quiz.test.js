// Tests use Node's built-in test runner, so nothing needs to be installed.
// Run them with:  npm test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const {
  shuffle,
  isCorrect,
  calculatePercentage,
  getGrade,
  getFeedbackMessage,
  formatTimeLeft,
  createQuiz,
  answerQuestion,
  isQuizFinished,
  isNewBestScore,
} = require("../src/quiz.js");

test("createQuiz initializes a fresh quiz state", () => {
  const questions = [
    { question: "Q1", options: ["A", "B"], answer: 1 },
    { question: "Q2", options: ["C", "D"], answer: 0 },
  ];

  const state = createQuiz(questions);

  assert.equal(state.current, 0);
  assert.equal(state.score, 0);
  assert.equal(state.questions.length, questions.length);
  assert.notStrictEqual(state.questions, questions);
  assert.deepEqual([...state.questions].sort((a, b) => a.question.localeCompare(b.question)),
    [...questions].sort((a, b) => a.question.localeCompare(b.question)));
});

test("answerQuestion returns a new state and correct flag without mutating input", () => {
  const initial = {
    questions: [{ question: "Q1", options: ["A", "B"], answer: 1 }],
    current: 0,
    score: 0,
  };

  const result = answerQuestion(initial, 1);

  assert.equal(result.correct, true);
  assert.equal(result.state.score, 1);
  assert.equal(result.state.current, 0);
  assert.deepEqual(initial, {
    questions: [{ question: "Q1", options: ["A", "B"], answer: 1 }],
    current: 0,
    score: 0,
  });

  const wrong = answerQuestion(initial, 0);
  assert.equal(wrong.correct, false);
  assert.equal(wrong.state.score, 0);
});

test("isQuizFinished indicates when the last question has been answered", () => {
  assert.equal(isQuizFinished({ questions: [{}, {}], current: 0 }), false);
  assert.equal(isQuizFinished({ questions: [{}, {}], current: 2 }), true);
  assert.equal(isQuizFinished({ questions: [], current: 0 }), true);
});

test("isCorrect returns true for the right answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 2), true);
});

test("isCorrect returns false for a wrong answer", () => {
  assert.equal(isCorrect({ answer: 2 }, 0), false);
});

test("calculatePercentage rounds to a whole number", () => {
  assert.equal(calculatePercentage(2, 3), 67);
});

test("calculatePercentage returns 0 when there are no questions", () => {
  assert.equal(calculatePercentage(0, 0), 0);
});

test("shuffle keeps every item and does not change the original array", () => {
  const original = [1, 2, 3, 4, 5];
  const result = shuffle(original);
  assert.deepEqual([...result].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(original, [1, 2, 3, 4, 5]);
});

test("formatTimeLeft returns a timer badge with remaining seconds", () => {
  assert.equal(formatTimeLeft(15), "⏱ 15s");
  assert.equal(formatTimeLeft(5), "⏱ 5s");
  assert.equal(formatTimeLeft(0), "⏱ 0s");
});

test("getGrade uses the correct percentage boundaries", () => {
  assert.equal(getGrade(90), "A");
  assert.equal(getGrade(75), "B");
  assert.equal(getGrade(50), "C");
  assert.equal(getGrade(49), "Keep practicing");
});

test("getFeedbackMessage returns the expected message for each grade", () => {
  assert.equal(getFeedbackMessage("A"), "Excellent work!");
  assert.equal(getFeedbackMessage("B"), "Good job!");
  assert.equal(getFeedbackMessage("C"), "You can do better!");
  assert.equal(getFeedbackMessage("D"), "Keep practicing!");
});

test("isNewBestScore identifies when a score beats the stored best", () => {
  assert.equal(isNewBestScore(80, null), true);
  assert.equal(isNewBestScore(80, 60), true);
  assert.equal(isNewBestScore(80, 80), false);
  assert.equal(isNewBestScore(80, 90), false);
});

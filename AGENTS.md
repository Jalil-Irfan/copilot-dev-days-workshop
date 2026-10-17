# AGENTS.md

## Project rules

- This is a plain JavaScript app with no frameworks, build tools, or npm dependencies beyond the built-in Node test runner.
- Keep pure quiz logic in `src/quiz.js`; it should be testable and exported via `module.exports`.
- Keep DOM/browser behavior in `src/app.js`; do not mix UI code into the logic file.
- Keep colors in `src/style.css` only via CSS variables defined in `:root`.
- Build accessible UI: use buttons for actions, keep focus visible, and set `aria-live` on text that updates after interaction.
- Run `npm test` before finishing a change.
- Use the workshop flow in `README.md` as the project context.

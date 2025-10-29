# Repository Guidelines

## Project Structure & Module Organization
This GitHub Pages site is flat and asset-light. `index.html` and `my-story.html` define the main landing pages, while shared behaviour lives iniiiii `theme.js`, and `mixpanel-setup.js`. Static assets reside in `img/` and `curriculum/` (the `.pdf` CV and download icon). The Rive animation required by the theme toggle is stored under `davide.riv/davide.riv`; keep that relative path intact because `script.js` loads it directly.

## Build, Test, and Development Commands
No bundler is required. Use `python3 -m http.server 4000` from the repository root to preview the site locally, and visit `http://localhost:4000`. When editing JavaScript, run `npx eslint script.js theme.js mixpanel-setup.js` if you have eslint globally available; otherwise rely on your editor's linting. Before pushing, clear caches with `rm -rf .cache` if your static server writes artifacts.

## Coding Style & Naming Conventions
HTML favors semantic sections; copy existing structure for nav, main, and card blocks. JavaScript modules use `const`/`let`, camelCase names, early returns, and two-space indentation inside functions. CSS sticks to four-space indentation, kebab-case class names, and CSS custom properties defined under `:root`. Avoid inline event handlers—attach listeners in JavaScript modules to keep analytics and theme logic centralized.

## Testing Guidelines
There is no automated test suite, so lean on manual checks. Validate layout and dark/light transitions in the latest Chrome, Safari, and a mobile viewport. Re-trigger every tracked element after updates by logging Mixpanel events in the devtools console. If you introduce new pages, confirm that Lighthouse performance stays above prior baselines and that sitemap and robots entries still point to the correct paths.

## Commit & Pull Request Guidelines
Commit messages in this repo are short and action-focused (e.g., `changed img google`), so keep them under 50 characters and in the imperative mood. Group unrelated edits into separate commits to simplify GitHub diffs. Pull requests should describe the visual or behavioural change, note any analytics updates, and include before/after screenshots for UI work. Link related issues when available and confirm local preview steps in the PR body.

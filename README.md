# Lift Log

A simple, private workout tracker that runs as a home-screen web app. No account, no subscription. Your data stays on your phone.

## Features

- Log sets with previous-session weights pre-filled, plus warm-up, drop, and failure sets
- Rest timer that starts when you check off a set
- Templates, with an offer to update them when you change a workout
- History you can view, edit, repeat, or save as a template
- Per-exercise stats and an estimated-1RM progress chart
- PR detection when you finish a workout
- Import from Strong (CSV export), backup and restore (JSON), CSV export
- Works offline

## Install on iPhone

1. Open the site in Safari.
2. Tap Share, then **Add to Home Screen**.
3. Always open it from the home-screen icon. That copy keeps its own data, separate from Safari.

## Moving from Strong

In Strong, open Settings, tap **Export Strong Data**, and save the CSV to Files. In Lift Log, go to Settings, tap **Import from Strong**, and pick the file. It imports your history and can build templates from your routines.

## Releasing changes

It's a static site: `index.html`, `sw.js`, `manifest.webmanifest`, `icons/`. After changing files, bump `CACHE` in `sw.js` so installed copies update on their next launch.

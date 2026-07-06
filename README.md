# Homebase Next.js Project

Cleaned and organized Next.js version of the uploaded Homebase files.

## Routes

| Route | Page |
| --- | --- |
| `/` | Homepage |
| `/templates` | Templates page |
| `/template-finder` | Template finder quiz |
| `/quiz` | Client intake quiz |

## Folder structure

```txt
app/
  layout.jsx
  page.jsx
  globals.css
  templates/page.jsx
  template-finder/page.jsx
  quiz/page.jsx
components/
  home/
  templates/
  finder/
  quiz/
styles/
  home.css
  templates.css
  finder.css
  quiz.css
  quiz-layouts.css
public/
  screenshots/
```

## Run locally

```bash
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

## Build for production

```bash
npm run build
npm run start
```

## GitHub upload

```bash
git init
git add .
git commit -m "Initial Homebase Next.js project"
```

Create a new GitHub repo, then follow GitHub’s instructions to push the project.

## Notes

- The old loose `.html`, duplicate `.jsx`, `_archive`, and Mac `__MACOSX` files were not included in this cleaned project.
- Screenshots were moved into `public/screenshots` so they are easy to reference later.
- Components are separated by feature: `home`, `templates`, `finder`, and `quiz`.

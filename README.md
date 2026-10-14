# A Golden Birthday Surprise ✨

A mobile-first, black-and-gold birthday website built with React, Vite, Tailwind CSS v4, custom CSS animations, and Lucide React. No Next.js.

## Run it locally

1. Install Node.js (LTS recommended).
2. Open this folder in VS Code.
3. In the terminal, run:

```bash
npm install
npm run dev
```

4. Open the local URL Vite prints (usually `http://localhost:5173`).
5. To verify a production build, run `npm run build`.

## Personalize it first

Open `src/main.jsx` and edit the values at the top:

- `FRIEND_NAME`
- `FROM_NAME`
- `BIRTHDAY_LETTER`
- `memories` array — replace the placeholder captions with real details.
- `timeline` array — add real dates and moments.
- `starMessages` and `wishes` arrays — edit the wishes.

### Add real photos

The gallery intentionally uses labelled placeholders so it does not pretend to show real memories. Put your photos in `public/photos/`, then replace each `.photo-placeholder` in the memory card with an `<img src="/photos/your-photo.jpg" alt="A short description" />`. Add `object-fit: cover; width: 100%; height: 100%` to the image in CSS. The existing click-to-open lightbox is ready to personalize too.

## Included interactions

- Gift box opens and scrolls into the cake section.
- Birthday cake includes exactly 15 animated candles; button toggles them out and back on.
- Five tappable stars reveal friendship messages in accessible dialogs.
- Four clearly labelled gallery placeholders open a larger detail view.
- Editable friendship timeline.
- Click-to-open personal letter.
- Selectable birthday wish cards.
- Animated golden fireworks and replay button.
- Escape key closes dialogs; reduced-motion preferences are respected.

The sound control is a visual toggle only; it does not play audio. Google Fonts require an internet connection; the site has serif/sans-serif fallbacks.

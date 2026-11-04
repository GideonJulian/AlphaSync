# AlphaSync

AlphaSync is a React application scaffolded with Vite. It uses JavaScript and
JSX, Tailwind CSS for styling, React Router for nested layouts, and Lucide React
for icons.

## Development

```sh
npm install
npm run dev
```

Use `npm run build` to create a production build and `npm run lint` to check the
source.

## Frontend structure

- `src/components/ui/` contains reusable interface primitives.
- `src/components/common/` contains shared brand and page-level elements.
- `src/components/navigation/` contains navigation building blocks.
- `src/layouts/` contains public, authentication, and dashboard route layouts.
- `src/pages/` contains route-level page components.
- `src/routes/AppRouter.jsx` defines all routes with JSX route elements.
- `src/assets/` is reserved for images and icons used by the application.

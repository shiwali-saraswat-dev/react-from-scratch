# React From Scratch

My structured journey through React, from plain HTML and JavaScript to routing and beyond. Each numbered folder is one small, runnable demo of a single concept, built with Vite.

## Table of Contents

| #   | Topic                              | Run (http://localhost:5173/)                                 | Status         |
|-----|---------------------------------------------------------------------------------------------------|----------------|
| 001 | [Hello World(HTML)]                      | (001-hello-world-html/index.html)                      | ✅ Done        |
| 002 | [Hello World(JavaScript)]                | (002-hello-world-javascript/index.html)                | ✅ Done        |
| 003 | [Hello World (React)]                    | (003-hello-world-reactt/index.html)                    | ✅ Done        |
| 004 | [Nested List]                            | (004-nested-list-react/index.html)                     | ✅ Done        |
| 005 | [Render Replaces Content]                | (005-render-replaces-content/index.html)               | ✅ Done        |
| 006 | [React Inside Any Element]               | (006-react-inside-any-element/index.html)              | ✅ Done        |
| 007 | [Hello World (JSX)]                      | (007-hello-world-jsx/index.html)                       | ✅ Done        |
| 008 | [Functional Component]                   | (008-react-functional-component/index.html)            | ✅ Done        |
| 009 | [Component Composition]                  | (009-component-composition/index.html)                 | ✅ Done        |
| 010 | [JS Expressions in JSX]                  | (010-js-expressions-in-jsx/index.html)                 | ✅ Done        |
| 011 | [React Element Inside JSX]               | (011-react-element-inside-jsx/index.html)              | ✅ Done        |
| 012 | [Header Component](012-header-component)                                                          |----------------|
|     |    - HTML/CSS version                    | (012-header-component/index.html)                      | ✅ Done        |
|     |    - React version                       | (012-header-component/index.html)                      | ✅ Done        |
| 013 | [Inline Styling]                         | (013-inline-styling/index.html)                        | ✅ Done        |
| 014 | [Props Patterns]                         | (014-props-patterns/index.html)                        | ✅ Done        |
| 015 | [Accessing Data Objects]                 | (015-accessing-data-objects/index.html)                | ✅ Done        |
| 016 | [Import & Export]                        | (016-react-import-export/index.html)                   | ✅ Done        |
| 017 | [Hooks: useState](017-react-hooks-usestate)                                                       |----------------|
|     |    - Core JS                             | (017-react-hooks-usestatex/index.html)                 | ✅ Done        |
|     |    - useState                            | (017-react-hooks-usestate/index.html)                  | ✅ Done        |
| 018 | [Conditional Rendering]                  | (018-conditional-rendering/index.html)                 | ⬜ Not started |
| 019 | [Fetching Data]                          | (019-react-fetch-data/index.html)                      | ✅ Done        |
| 020 | [Loading UI](020-react-loading-ui)                                                                |----------------|
|     |    - Spinner                             | (020-react-loading-ui/index.html)                      | ✅ Done        |
|     |    - Shimmer UI                          | (020-react-loading-ui/index.html)                      | ✅ Done        |
| 021 | [Toggle Button]                          | (021-react-toggle-btn/index.html)                      | ✅ Done        |
| 022 | [Search]                                 | (022-react-search/index.html)                          | ✅ Done        |
| 023 | [Images]                                 | (023-react-images/index.html)                          | ✅ Done        |
| 024 | [React Router Declarative Mode](024-react-router-declarative-mode)                                | ✅ Done        |
|     | - Simple Routing                         | (024-react-router-declarative-mode/index.html)         | ✅ Done        |
| 025 | [React Router Data Mode](025-react-router-data-mode)                                              |----------------|
|     | - Simple Routing                         | (025-react-router-data-mode/index.html)                | ✅ Done        |
|     | - Nested Routes & Outlet                 | (025-react-router-data-mode/index.html)                | ✅ Done        |
|     | - Dynamic Routes & URL Params            | (025-react-router-data-mode/index.html)                | ✅ Done        |
|     | - Error Routes                           | (025-react-router-data-mode/index.html)                | ✅ Done        |
|     | - Loader & Action                        | (025-react-router-data-mode/index.html)                | ⬜ Not started |
|     | - Loader Errors                          | (025-react-router-data-mode/index.html)                | ⬜ Not started |
|     | - Other Routers                          | (025-react-router-data-mode/index.html)                | ⬜ Not started |
| 026 | [React Router Framework Mode]            | (026-react-router-framework-mode/index.html)           | ⬜ Not started |
| 027 | [Class Component]                        | (027-class-component/index.html)                       | ✅ Done        |
| 028 | [Parent Child Order in Class Component]  | (028-class-parent-child-order/index.html)              | 🚧 In progress |
| 029 | [LifeCycle Methods]                      | (029-react-lifecycle-methods/index.html)               | ⬜ Not started |
| 030 |                                          |                                                        | ⬜ Not started |
**Legend:** ⬜ Not started · 🚧 In progress · ✅ Completed


## How this repo works

- One folder per concept, numbered in learning order
- Each demo folder has its own `index.html`, so it runs as a separate page of the same Vite project
- Folders with sub-topics (such as `025-react-router-data-mode`) use numbered subfolders, each with its own router `basename`
- Topics not started yet are kept as placeholder folders with a short note
- Progress in the tables above is updated when a topic is finished

## Tech stack

- React with Vite (React Compiler enabled)
- React Router v7
- Oxlint

## Run the code

```bash
# install dependencies (once)
npm install

# start the dev server
npm run dev
```

Then open a demo by its folder path, with the trailing slash:

```
<folder-name>/
023-react-routing/2-declarative-style/
```

Notes for the routing demos:

- Each router sets a `basename` equal to its folder path, so always open the folder URL above
- Typing a deep link such as `.../about` directly into the address bar can fail in the Vite dev server, so click the links inside the demo instead
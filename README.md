# React From Scratch

My structured journey through React, from plain HTML and JavaScript to routing and beyond. Each numbered folder is one small, runnable demo of a single concept, built with Vite.

## Table of Contents

| #   | Topic                                    | Run                                                                   | Status         |
|-----|------------------------------------------------------------------------------------------------------------------|----------------|
| 001 | [Hello World(HTML)]                      | (http://localhost:5173/001-hello-world-html/index.html)               | ✅ Done        |
| 002 | [Hello World(JavaScript)]                | (http://localhost:5173/002-hello-world-javascript/index.html)         | ✅ Done        |
| 003 | [Hello World (React)]                    | (http://localhost:5173/003-hello-world-reactt/index.html)             | ✅ Done        |
| 004 | [Nested List]                            | (http://localhost:5173/004-nested-list-react/index.html)              | ✅ Done        |
| 005 | [Render Replaces Content]                | (http://localhost:5173/005-render-replaces-content/index.html)        | ✅ Done        |
| 006 | [React Inside Any Element]               | (http://localhost:5173/006-react-inside-any-element/index.html)       | ✅ Done        |
| 007 | [Hello World (JSX)]                      | (http://localhost:5173/007-hello-world-jsx/index.html)                | ✅ Done        |
| 008 | [Functional Component]                   | (http://localhost:5173/008-react-functional-component/index.html)     | ✅ Done        |
| 009 | [Component Composition]                  | (http://localhost:5173/009-component-composition/index.html)          | ✅ Done        |
| 010 | [JS Expressions in JSX]                  | (http://localhost:5173/010-js-expressions-in-jsx/index.html)          | ✅ Done        |
| 011 | [React Element Inside JSX]               | (http://localhost:5173/011-react-element-inside-jsx/index.html)       | ✅ Done        |
| 012 | [Header Component](012-header-component)                                                                         |-----------------|
|     |    - HTML/CSS version                    | (http://localhost:5173/012-header-component/index.html)               | ✅ Done        |
|     |    - React version                       | (http://localhost:5173/012-header-component/index.html)               | ✅ Done        |
| 013 | [Inline Styling]                         | (http://localhost:5173/013-inline-styling/index.html)                 | ✅ Done        |
| 014 | [Props Patterns]                         | (http://localhost:5173/014-props-patterns/index.html)                 | ✅ Done        |
| 015 | [Accessing Data Objects]                 | (http://localhost:5173/015-accessing-data-objects/index.html)         | ✅ Done        |
| 016 | [Import & Export]                        | (http://localhost:5173/016-react-import-export/index.html)            | ✅ Done        |
| 017 | [Hooks: useState](017-react-hooks-usestate)                                                                      |-----------------|
|     |    - Core JS                             | (http://localhost:5173/017-react-hooks-usestatex/index.html)          | ✅ Done        |
|     |    - useState                            | (http://localhost:5173/017-react-hooks-usestate/index.html)           | ✅ Done        |
| 018 | [Conditional Rendering]                  | (http://localhost:5173/018-conditional-rendering/index.html)          | ⬜ Not started |
| 019 | [Fetching Data]                          | (http://localhost:5173/019-react-fetch-data/index.html)               | ✅ Done        |
| 020 | [Loading UI](020-react-loading-ui)                                                                               |-----------------|
|     |    - Spinner                             | (http://localhost:5173/020-react-loading-ui/index.html)               | ✅ Done        |
|     |    - Shimmer UI                          | (http://localhost:5173/020-react-loading-ui/index.html)               | ✅ Done        |
| 021 | [Toggle Button]                          | (http://localhost:5173/021-react-toggle-btn/index.html)               | ✅ Done        |
| 022 | [Search]                                 | (http://localhost:5173/022-react-search/index.html)                   | ✅ Done        |
| 023 | [Images]                                 | (http://localhost:5173/023-react-images/index.html)                   | ✅ Done        |
| 024 | [React Router Declarative Mode](024-react-router-declarative-mode)                                               | ✅ Done        |
|     | - Simple Routing                         | (http://localhost:5173/024-react-router-declarative-mode/index.html)  | ✅ Done        |
| 025 | [React Router Data Mode](025-react-router-data-mode)                                                             |-----------------|
|     | - Simple Routing                         | (http://localhost:5173/025-react-router-data-mode/index.html)         | ✅ Done        |
|     | - Nested Routes & Outlet                 | (http://localhost:5173/025-react-router-data-mode/index.html)         | ✅ Done        |
|     | - Dynamic Routes & URL Params            | (http://localhost:5173/025-react-router-data-mode/index.html)         | ✅ Done        |
|     | - Error Routes                           | (http://localhost:5173/025-react-router-data-mode/index.html)         | ✅ Done        |
|     | - Loader & Action                        | (http://localhost:5173/025-react-router-data-mode/index.html)         | ⬜ Not started |
|     | - Loader Errors                          | (http://localhost:5173/025-react-router-data-mode/index.html)         | ⬜ Not started |
|     | - Other Routers                          | (http://localhost:5173/025-react-router-data-mode/index.html)         | ⬜ Not started |
| 026 | [React Router Framework Mode]            | (http://localhost:5173/026-react-router-framework-mode/index.html)    | ⬜ Not started |
| 027 | [Class Component]                        | (http://localhost:5173/027-class-component/index.html)                | ✅ Done        |
| 028 | [Parent Child Order in Class Component]  | (http://localhost:5173/028-class-parent-child-order/index.html)       | 🚧 In progress |
| 029 | [LifeCycle Methods]                      | (http://localhost:5173/029-react-lifecycle-methods/index.html)        | ⬜ Not started |
| 030 |                                          |                                                                       | ⬜ Not started |
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
http://localhost:5173/<folder-name>/
http://localhost:5173/023-react-routing/2-declarative-style/
```

Notes for the routing demos:

- Each router sets a `basename` equal to its folder path, so always open the folder URL above
- Typing a deep link such as `.../about` directly into the address bar can fail in the Vite dev server, so click the links inside the demo instead
# React From Scratch

My structured journey through React, from plain HTML and JavaScript to routing and beyond. Each numbered folder is one small, runnable demo of a single concept, built with Vite.

## Table of Contents

| #   | Topic                                                                             | Status         |
|-----|-----------------------------------------------------------------------------------|----------------|
| 001 | [Hello World (HTML)](001-hello-world-html)                                        | ✅ Done        |
| 002 | [Hello World (JavaScript)](002-hello-world-javascript)                            | ✅ Done        |
| 003 | [Hello World (React)](003-hello-world-react)                                      | ✅ Done        |
| 004 | [Nested List](004-nested-list-react)                                              | ✅ Done        |
| 005 | [Render Replaces Content](005-render-replaces-content)                            | ✅ Done        |
| 006 | [React Inside Any Element](006-react-inside-any-element)                          | ✅ Done        |
| 007 | [Hello World (JSX)](007-hello-world-jsx)                                          | ✅ Done        |
| 008 | [Functional Component](008-react-functional-component)                            | ✅ Done        |
| 009 | [Component Composition](009-component-composition)                                | ✅ Done        |
| 010 | [JS Expressions in JSX](010-js-expressions-in-jsx)                                | ✅ Done        |
| 011 | [React Element Inside JSX](011-react-element-inside-jsx)                          | ✅ Done        |
| 012 | [Header Component](012-header-component)                                          |-----------------|
|     |    - HTML/CSS version                                                             | ✅ Done        |
|     |    - React version                                                                | ✅ Done        |
| 013 | [Inline Styling](013-inline-styling)                                              | ✅ Done        |
| 014 | [Props Patterns](014-props-patterns)                                              | ✅ Done        |
| 015 | [Accessing Data Objects](015-accessing-data-objects)                              | ✅ Done        |
| 016 | [Import & Export](016-react-import-export)                                        | ✅ Done        |
| 017 | [Hooks: useState](017-react-hooks-usestate)                                       |-----------------|
|     |    - Core JS                                                                      | ✅ Done        |
|     |    - useState                                                                     | ✅ Done        |
| 018 | [Conditional Rendering](018-conditional-rendering)                                | ⬜ Not started |
| 019 | [Fetching Data](019-react-fetch-data)                                             | ✅ Done        |
| 020 | [Loading UI](020-react-loading-ui)                                                |-----------------|
|     |    - Spinner                                                                      | ✅ Done        |
|     |    - Shimmer UI                                                                   | ✅ Done        |
| 021 | [Toggle Button](021-react-toggle-btn)                                             | ✅ Done        |
| 022 | [Search](022-react-search)                                                        | ✅ Done        |
| 023 | [Images](023-react-images)                                                        | ✅ Done        |
| 024 | [React Router Declarative Mode](024-react-router-declarative-mode)                | ✅ Done        |
|     | - Simple Routing                                                                  | ✅ Done        |
| 025 | [React Router Data Mode](025-react-router-data-mode)                              |-----------------|
|     | - Simple Routing (createBrowserRouter + RouterProvider)                           | ✅ Done        |
|     | - Nested Routes & Outlet                                                          | ✅ Done        |
|     | - Dynamic Routes & URL Params                                                     | ✅ Done        |
|     | - Error Routes (404 & error routes (errorElement / errorBoundary))                | ✅ Done        |
|     | - Loader & Action                                                                 | ⬜ Not started |
|     | - Loader Errors (Response, isRouteErrorResponse)                                  | ⬜ Not started |
|     | - Other Routers (createHashRouter, createMemoryRouter)                            | ⬜ Not started |
| 026 | [React Router Framework Mode](026-react-router-framework-mode)                    | ⬜ Not started |
| 027 | [Class Component](027-class-component)                                            | ✅ Done        |
| 028 | [Parent Child Order in Class Component](028-class-parent-child-order)             | 🚧 In progress |
| 029 | [LifeCycle Methods](029-react-lifecycle-methods)                                  | ⬜ Not started |

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
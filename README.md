# React From Scratch

My structured journey through React, from plain HTML and JavaScript to routing and beyond. Each numbered folder is one small, runnable demo of a single concept, built with Vite.

## Table of Contents

| #   | Topic                                                                             | Status         |
|-----|---------------------------------------------------------------                    |----------------|
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
| 012 | [Header Component](012-header-component)                                          | ✅ Done        |
|     |    - HTML/CSS version                                                             |                |
|     |    - React version                                                                |                |
| 013 | [Inline Styling](013-inline-styling)                                              | ✅ Done        |
| 014 | [Props Patterns](014-props-patterns)                                              | ✅ Done        |
| 015 | [Accessing Data Objects](015-accessing-data-objects)                              | ✅ Done        |
| 016 | [Import & Export](016-react-import-export)                                        | ✅ Done        |
| 017 | [Hooks: useState](017-react-hooks-usestate)                                       | ✅ Done        |
|     |    - Core JS                                                                      |                |
|     |    - useState                                                                     |                |
| 018 | [Fetching Data](018-react-fetch-data)                                             | ✅ Done        |
| 019 | [Loading UI](019-react-loading-ui)                                                | ✅ Done        |
|     |    - Spinner                                                                      |                |
|     |    - Shimmer UI                                                                   |                |
| 020 | [Toggle Button](020-react-toggle-btn)                                             | ✅ Done        |
| 021 | [Search](021-react-search)                                                        | ✅ Done        |
| 022 | [Images](022-react-images)                                                        | ✅ Done        |
| 023 | [Routing (React Router)](023-react-routing)                                       | ✅ Done        |
|     | - Simple Routing  (createBrowserRouter + RouterProvider)                          |                |
|     | - Declarative Style (Route, Routes, Link, NavLink)                                |                |
|     | - Error Routes (404 & error routes (errorElement / errorBoundary))                |                |
| 024 | [Nested Routes & Outlet](024-nested-routes)                                       | ✅ Done        |
| 025 | [Dynamic Routes & URL Params](025-dynamic-routes)                                 | ✅ Done        |
| 026 | [Loader and Action](026-loader-and-action)                                        | ⬜ Not started |
| 027 | [Other React Routers](027-other-react-routers)                                    | ⬜ Not started |
|     |    - createHashRouter                                                             |                |
|     |    - createMemoryRouter                                                           |                |
| 028 | [Class Component](028-class-component)                                            | ✅ Done        |
| 029 | [Parent Child Order in Class Component](029-class-parent-child-order)             | 🚧 In progress |
| 030 | [LifeCycle Methods](030-react-lifecycle-methods)                                  | ⬜ Not started |

**Legend:** ⬜ Not started · 🚧 In progress · ✅ Completed


## How this repo works

- One folder per concept, numbered in learning order
- Each demo folder has its own `index.html`, so it runs as a separate page of the same Vite project
- Folders with sub-topics (such as `023-react-routing`) use numbered subfolders, each with its own router `basename`
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
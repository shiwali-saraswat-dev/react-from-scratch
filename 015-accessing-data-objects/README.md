# 015 - Accessing Data Objects

Demonstrates four approaches to accessing and rendering JSON-like data, progressing from the simplest case to nested, optional-chained data.

## Patterns covered

| # | Component | Pattern |
|---|---|---|
| 1 | `FeaturedSection` | Single object — nested fields accessed directly (`resData.poster.url`) |
| 2 | `MovieCard` | Array accessed by **fixed index** (`movieList[0]`, `movieList[1]`...) — no loop |
| 3 | `ActorCard` | Array accessed via a **single `.map()` loop** — scales automatically as items are added/removed |
| 4 | `DirectorSection` | **Nested array** — outer `.map()` over directors, inner `.map()` over each director's own `movies` array, with **optional chaining** on both layers |

## Key notes

- **Pattern 2 (fixed index)** doesn't scale — adding a 4th movie means manually adding another `<MovieCard resData={movieList[3]} />` line, and the code must be touched every time the data changes.
- **Pattern 3 (`.map()`)** solves that — the list can grow or shrink without touching the rendering code at all. Always use a stable, unique `key` prop (here, `actor.id`).
- **Pattern 4 (nested `.map()`)** shows looping over data that has its own array *inside* each item (`director.movies`). The outer loop renders one `DirectorSection` per director; the inner loop (inside `DirectorSection`) renders one `<li>` per movie.
- **Optional chaining (`?.` and `??`)** is used on both layers of Pattern 4:
  - `props.resData ?? {}` — if a director object itself is missing/undefined, destructuring falls back to an empty object instead of crashing.
  - `movies?.map(...)` — if a specific director has no `movies` array yet, this stops safely and renders nothing instead of throwing `Cannot read properties of undefined (reading 'map')`.
- `key` should come from actual data (`movie.id`, `actor.id`, `director.id`), never the array index where possible — this keeps React's reconciliation stable across re-renders.

## Run

```
http://localhost:5173/015-accessing-data-objects/
```
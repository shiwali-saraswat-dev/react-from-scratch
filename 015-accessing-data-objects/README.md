# 015 - Accessing Data Objects

Demonstrates three approaches to accessing and rendering JSON-like data.

## Patterns covered

| # | Component | Pattern |
|---|---|---|
| 1 | `FeaturedSection` | Single object — nested fields accessed directly (`resData.poster.url`) |
| 2 | `MovieCard` | Array accessed by **fixed index** (`movieList[0]`, `movieList[1]`...) — no loop |
| 3 | `DirectorSection` | **Nested array** — outer `.map()` over directors, inner `.map()` over each director's own `movies` array |

## Key notes
- Pattern 2 (fixed index) doesn't scale — adding a 4th movie means
  manually adding another `<MovieCard resData={movieList[3]} />` line.
- Pattern 3 (`.map()`) scales automatically — the list can grow/shrink
  without touching the rendering code. Always use a stable, unique `key`.
- `key` should come from actual data (`movie.id`), never the array index,
  where possible — keeps React's reconciliation stable across re-renders.

## Run
```
http://localhost:5173/015-accessing-data-objects/
```
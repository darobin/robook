
# TODO
- [ ] `rootle` bin, taking commands and options
- [ ] `rootle watch $dir -p port`
  - [ ] kicks up an Express app
    - [ ] index MD on launch to produce nav
    - [ ] make search index on launch (use the mutable lunr)
    - [ ] cache nav and search so they're available right away
    - [ ] serves the preact shell (similar to that in datagov)
      - [ ] routing
      - [ ] configurable CSS
      - [ ] client-side search
    - [ ] has API that serves the MD, nav, search
    - [ ] serve resources as public
  - [ ] watches dir for changes
    - [ ] sends them over SSE
    - [ ] updates the nav and search indices when ready

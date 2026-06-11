# Official squad data

This folder is the authoritative source for verified World Cup squads.

Use one file per team and tournament year:

```text
data/squads/<teamId>/<year>.ts
```

Rules:

- Include every player from the official final squad list.
- Mark players who withdrew before the tournament with `status: 'withdrawn'`.
- Mark replacement call-ups with `status: 'replacement'` and `replaced` when known.
- Playable candidates are generated from official squad files first.
- If no official squad file exists for a team/year, the legacy player database fallback is used.
- Do not add guessed real names as fallback depth. Unknown depth must remain a placeholder.


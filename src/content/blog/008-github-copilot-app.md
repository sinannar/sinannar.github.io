---
title: 'Building My GitHub Presence with Copilot App'
description: 'How I switched from juggling three Copilot tools to the unified Copilot App'
pubDate: 'June 27 2026'
heroImage: '/008-github-copilot-app.png'
---

### Intro

Up until recently, my GitHub Copilot workflow involved juggling three separate tools:

- **Copilot in VS Code** — inline completions and chat while coding
- **Copilot CLI** — terminal commands and explanations
- **Copilot Cloud Agent** — autonomous PRs for larger tasks

They worked well individually, but switching between them for a single project meant a lot of context-switching. Then I started using the **GitHub Copilot App**, and it brought everything under one roof.

I used it to update my personal GitHub ecosystem across three repos:

- [**sinannar.github.io**](https://github.com/sinannar/sinannar.github.io) — this personal website
- [**sinannar**](https://github.com/sinannar/sinannar) — my GitHub profile README
- [**snnr**](https://github.com/sinannar/snnr) — my npm package (`npx snnr`)

### What the Copilot App Does Differently

The Copilot App is a standalone desktop application with session-based workspaces. Each session gets its own git worktree and branch. You describe what you want, the AI implements it, runs the build, and commits — all in one place.

Instead of bouncing between VS Code for code, the terminal for CLI, and github.com for the cloud agent, I now open a session in the app and it handles the full loop: code, terminal, git, and PR creation.

### What I Built

Here's what my sessions looked like:

**snnr**: NPM publish workflow · Update CLI resume · Update readme

**sinannar**: Redesign readme · Refresh profile readme

**sinannar.github.io**: Update certifications · Modernize blog design · Updating organiser and talks

Each session was isolated — its own branch, no conflicts with other work. I could describe a task like "add my latest Azure certification" or "set up automated NPM publishing", let it work, and review the result.

### What Worked Well

**One tool instead of three** — no more switching between VS Code chat, terminal, and the cloud agent dashboard. The app handles code generation, command execution, and PR creation in one flow.

**Session isolation** — each task lives in its own branch. No half-finished work leaking into other changes.

**Build verification** — it runs your builds automatically. When I changed the blog layout, it verified the Astro site still compiled.

**Low-effort maintenance** — personal projects suffer from "I'll update that later" syndrome. Having AI handle the tedious bits means they actually get done.

### Conclusion

If you're already using Copilot across CLI, VS Code, and the cloud agent, the Copilot App consolidates that workflow into something more manageable. For maintaining a personal GitHub presence, it's been the push I needed to keep things up to date.

Check out the results: run `npx snnr`, visit my [profile](https://github.com/sinannar), or keep browsing this site. 🚀

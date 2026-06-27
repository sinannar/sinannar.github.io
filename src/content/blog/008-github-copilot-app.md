---
title: 'Building My GitHub Presence with Copilot App'
description: 'How I combined Copilot CLI, VS Code, Cloud Agent, and the Copilot App to update my personal GitHub ecosystem'
pubDate: 'June 27 2026'
heroImage: '/008-github-copilot-app.png'
---

### Intro

I've been using GitHub Copilot across multiple surfaces for a while — **Copilot in VS Code** for inline completions, **Copilot CLI** for terminal commands, and the **Copilot Cloud Agent** for autonomous PRs. Recently I added the **GitHub Copilot App** to the mix, and used all of them together to overhaul my personal GitHub ecosystem:

- [**sinannar.github.io**](https://github.com/sinannar/sinannar.github.io) — this personal website
- [**sinannar**](https://github.com/sinannar/sinannar) — my GitHub profile README
- [**snnr**](https://github.com/sinannar/snnr) — my npm package (`npx snnr`)

### The Copilot App

The Copilot App is a standalone desktop application where you work in session-based workspaces. Each session gets its own git worktree and branch, so you can run multiple tasks in parallel without conflicts. You describe what you want, the AI implements it, runs the build, and commits.

Here's what my sidebar looked like:

**snnr**: NPM publish workflow · Update CLI resume · Update readme

**sinannar**: Redesign readme · Refresh profile readme

**sinannar.github.io**: Update certifications · Modernize blog design · Updating organiser and talks

### How I Combined the Tools

I didn't use just one Copilot surface — I used whichever fit the moment:

- **Copilot CLI** — quick git commands, checking build outputs, running `npx snnr` to verify changes
- **Copilot in VS Code** — fine-tuning code where I needed precise control, reviewing diffs before merging
- **Copilot Cloud Agent** — kicked off for larger autonomous tasks like setting up the NPM publish GitHub Action
- **Copilot App** — the hub for managing sessions, delegating tasks, and working across repos without context-switching overhead

The app shines for delegation. Things like "add my latest Azure certification" or "modernize the blog layout" — I'd describe the task, let it work, then review the PR. Meanwhile I could switch to another session or jump into VS Code for something that needed my hands on the keyboard.

### What Worked Well

**Session isolation** — each task lives in its own branch. No half-finished work leaking into other changes.

**Build verification** — the app runs your builds and tests automatically. When I changed the blog layout, it verified the Astro site still compiled.

**Low-effort maintenance** — personal projects suffer from "I'll update that later" syndrome. Having AI handle the tedious bits (README badges, certification lists, CLI output) means they actually get done.

### Conclusion

The combination of Copilot CLI + VS Code + Cloud Agent + the App covers the full spectrum — from quick terminal one-liners to autonomous multi-file PRs. For maintaining a personal GitHub presence across multiple repos, it's been genuinely useful.

Check out the results: run `npx snnr`, visit my [profile](https://github.com/sinannar), or keep browsing this site. 🚀

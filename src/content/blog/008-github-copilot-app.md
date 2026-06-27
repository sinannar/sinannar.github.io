---
title: 'Building My GitHub Presence with Copilot App'
description: 'How I used GitHub Copilot App to manage and update my personal GitHub ecosystem'
pubDate: 'June 27 2026'
heroImage: '/008-github-copilot-app.png'
---

### Intro

I have been using GitHub Copilot in my editor for a while now, but recently I started using the **GitHub Copilot App** — a dedicated desktop application that takes a different approach to AI-assisted development. Instead of inline suggestions while you type, it gives you a session-based workspace where you can have conversations about your code, delegate tasks, and manage multiple repositories simultaneously.

In this post, I'll share how I used it to overhaul my personal GitHub ecosystem across three repositories:

- [**sinannar.github.io**](https://github.com/sinannar/sinannar.github.io) — my personal website (the one you're reading right now)
- [**sinannar**](https://github.com/sinannar/sinannar) — my GitHub profile README
- [**snnr**](https://github.com/sinannar/snnr) — my npm package that you can run with `npx snnr`

### What is the Copilot App?

The Copilot App is a standalone application that connects directly to your GitHub repositories. It creates isolated worktree-backed sessions for each task, so you can work on multiple things in parallel without branch conflicts. Think of it as having a team of developers, each working on their own feature branch, but it's just you and the AI.

The key concepts are:

- **Projects** — linked to your GitHub repositories
- **Sessions** — isolated workspaces with their own branches, each focused on a specific task
- **Worktrees** — git worktrees that allow parallel development without switching branches

### My Workflow

Here's what my sidebar looked like while working across all three repositories:

**snnr** (npm package):
- NPM publish workflow — setting up automated publishing via GitHub Actions
- Update CLI resume — refreshing the content that shows when you run `npx snnr`
- Update readme — improving documentation for the package

**sinannar** (GitHub profile):
- Redesign readme — giving my profile a fresh look
- Refresh profile readme — updating the content and stats

**sinannar.github.io** (personal website):
- Update certifications — adding my latest certifications
- Modernize blog design — refreshing the look and feel of this blog
- Updating organiser and talks — adding recent meetup and conference info

### How Sessions Work

Each session is a self-contained unit of work. When I opened "Modernize blog design", the app created a new git worktree with its own branch, separate from the other sessions. I could describe what I wanted — a cleaner layout, better typography, improved mobile responsiveness — and the AI would implement the changes, run the build to verify nothing broke, and commit the work.

What I found powerful was the ability to context-switch between sessions without losing progress. While waiting for one session to finish a build or test run, I could jump to another repository entirely and work on something else. The app keeps track of everything.

### The Multi-Repo Advantage

Managing a personal GitHub presence involves keeping multiple repositories in sync. My profile README references my website, my website links to my npm package, and the npm package CLI displays info that should match both. Before the Copilot App, updating all three meant:

1. Clone/pull each repo
2. Switch to a new branch
3. Make changes
4. Test locally
5. Commit and push
6. Create PRs
7. Repeat for the next repo

With the Copilot App, I could open sessions across all three projects and work on them concurrently. The AI handles the git operations, branch management, and even creates the pull requests for me.

### What Worked Well

**Delegation of routine tasks** — Things like updating a README badge, fixing a typo in the CLI output, or adding a new certification to a list don't require creative thinking. I could describe the task in natural language and let the AI handle it.

**Consistency across repos** — When I updated my job title or added a new certification, I could tell each session about the change and it would update the relevant files in each repository consistently.

**The worktree model** — Having isolated branches for each task meant I never had to worry about half-finished work conflicting with other changes. Each session produced a clean PR that I could review independently.

**Build verification** — The app doesn't just write code; it runs your builds and tests to make sure things actually work. When I changed the blog layout, it ran `npm run build` to verify the Astro site still compiled correctly.

### What I Learned

The Copilot App works best when you treat it like delegating to a junior developer — be clear about what you want, provide context, and review the output. It's not magic, but it removes a lot of friction from routine development tasks.

For personal projects especially, where motivation to do boring maintenance tasks is low, having an AI assistant that can handle the tedious parts while you focus on the creative decisions is genuinely useful.

### Conclusion

If you maintain multiple GitHub repositories — especially interconnected ones like a personal website, profile, and packages — the Copilot App is worth trying. The session-based workflow with isolated branches makes it easy to parallelize work that would otherwise be sequential and tedious.

You can check out the results:
- Run `npx snnr` in your terminal to see my CLI resume
- Visit my [GitHub profile](https://github.com/sinannar) to see the redesigned README
- And you're already on my [personal site](https://sinannar.github.io) reading this post

Happy coding! 🚀

# Agent Workflow Rules

- Always start new work from `dev`.
- Create a task branch from `dev` before making edits. Use names like `codex/<short-task>`.
- Do not commit directly to `main` or `dev`.
- Keep each unit of work scoped, and preserve unrelated local changes unless the user explicitly asks to include them.
- Before finishing a unit of work, run the relevant build, test, or check command.
- After each completed unit of work, commit with a clear message and push the branch.
- Include `Co-authored-by: Codex <codex@openai.com>` on Codex-authored commits.

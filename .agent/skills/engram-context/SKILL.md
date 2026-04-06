# Skill: Engram Context
This skill enables the orchestration to retrieve and persist project context from previous sessions using the Engram MCP server.

## Instructions
1. Use `mem_search` to find relevant context about the current task.
2. Use `mem_context` for a quick overview of recent sessions.
3. If no context is found, initialize the task from current source documentation.
4. At the end of every task, use `mem_save` or `mem_session_summary` to preserve decisions and findings.

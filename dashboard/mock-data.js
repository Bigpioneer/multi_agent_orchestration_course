const AGENTS = [
  { id: "orchestrator", name: "Orchestrator", role: "Workflow Coordination", status: "active", model: "claude-opus-4", tasksCompleted: 14, tasksFailed: 1 },
  { id: "planner", name: "Planner", role: "Task Planning", status: "running", model: "claude-sonnet-4", tasksCompleted: 9, tasksFailed: 0 },
  { id: "frontend", name: "Frontend Agent", role: "UI Implementation", status: "active", model: "claude-sonnet-4", tasksCompleted: 7, tasksFailed: 2 },
  { id: "validator", name: "Validator", role: "Quality Check", status: "error", model: "claude-haiku-4", tasksCompleted: 5, tasksFailed: 3 },
  { id: "debugger", name: "Debugger", role: "Issue Resolution", status: "idle", model: "claude-haiku-4", tasksCompleted: 8, tasksFailed: 0 },
  { id: "docs", name: "Docs Agent", role: "Documentation", status: "idle", model: "claude-haiku-4", tasksCompleted: 6, tasksFailed: 0 },
];

const TASKS = [
  { id: "MO-001", title: "Define dashboard shell and regions", assignee: "planner", status: "done", priority: "high", startedAt: "2026-05-21T09:05", completedAt: "2026-05-21T09:32" },
  { id: "MO-002", title: "Render agent status cards", assignee: "frontend", status: "in_progress", priority: "high", startedAt: "2026-05-21T09:40", completedAt: null },
  { id: "MO-003", title: "Connect task filter buttons", assignee: "frontend", status: "pending", priority: "medium", startedAt: null, completedAt: null },
  { id: "MO-004", title: "Review orchestration strategy options", assignee: "orchestrator", status: "in_progress", priority: "medium", startedAt: "2026-05-21T10:02", completedAt: null },
  { id: "MO-005", title: "Fix modal close interaction", assignee: "debugger", status: "pending", priority: "low", startedAt: null, completedAt: null },
  { id: "MO-006", title: "Validate log filtering behavior", assignee: "validator", status: "error", priority: "high", startedAt: "2026-05-21T10:18", completedAt: null },
  { id: "MO-007", title: "Update README execution guide", assignee: "docs", status: "done", priority: "low", startedAt: "2026-05-21T08:50", completedAt: "2026-05-21T09:15" },
];

const LOGS = [
  { id: "LG-001", timestamp: "2026-05-21T10:20:11", level: "info", agentId: "orchestrator", message: "MO-004 assigned to orchestrator for strategy review." },
  { id: "LG-002", timestamp: "2026-05-21T10:21:03", level: "success", agentId: "docs", message: "README execution guide updated successfully." },
  { id: "LG-003", timestamp: "2026-05-21T10:22:44", level: "warn", agentId: "validator", message: "Log filter test returned an unexpected empty state." },
  { id: "LG-004", timestamp: "2026-05-21T10:23:09", level: "error", agentId: "validator", message: "Filter assertion failed: expected 2 warning logs, received 0." },
  { id: "LG-005", timestamp: "2026-05-21T10:24:28", level: "info", agentId: "frontend", message: "Agent card click handler registered." },
  { id: "LG-006", timestamp: "2026-05-21T10:25:51", level: "success", agentId: "planner", message: "Initial task dependency order confirmed." },
];

const MODEL_STRATEGIES = [
  { id: "ST-001", name: "Leader-led Orchestration", description: "One orchestrator assigns tasks and merges validated outputs.", enabled: true },
  { id: "ST-002", name: "Specialist Routing", description: "Tasks are routed to agents by role, complexity, and required output type.", enabled: true },
  { id: "ST-003", name: "Fallback Chain", description: "If an agent fails, the task is reassigned to a backup agent.", enabled: false },
  { id: "ST-004", name: "Review Gate", description: "Important outputs must pass validator review before completion.", enabled: true },
  { id: "ST-005", name: "Cost-aware Execution", description: "Lightweight agents handle simple work before escalating to stronger models.", enabled: false },
];

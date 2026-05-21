// ── STEP 05: Agent Cards ─────────────────────────────────────────────────────

function statusColor(status) {
  return {
    active:  'var(--status-active)',
    idle:    'var(--status-idle)',
    running: 'var(--status-running)',
    error:   'var(--status-error)'
  }[status] || 'var(--status-idle)';
}

function renderAgents() {
  const grid = document.getElementById('agent-grid');
  grid.innerHTML = AGENTS.map(a => `
    <div class="agent-card" data-status="${a.status}" onclick="openAgentModal('${a.id}')" style="cursor:pointer">
      <div class="agent-card-header">
        <span class="agent-status-dot" style="background:${statusColor(a.status)}"></span>
        <strong>${a.name}</strong>
        <span class="agent-status-label">${a.status}</span>
      </div>
      <div class="agent-role">${a.role}</div>
      <div class="agent-model">${a.model}</div>
      <div class="agent-stats">
        <span class="stat-ok">✓ ${a.tasksCompleted}</span>
        <span class="stat-fail">✗ ${a.tasksFailed}</span>
      </div>
    </div>
  `).join('');

  const activeCount = AGENTS.filter(a => a.status === 'active' || a.status === 'running').length;
  document.getElementById('active-count').textContent = `활성 에이전트: ${activeCount}`;
}

// ── STEP 06: Task List ────────────────────────────────────────────────────────

let currentTaskFilter = 'all';

function statusBadgeColor(status) {
  return {
    done:        'var(--status-done)',
    in_progress: 'var(--status-running)',
    pending:     'var(--status-pending)',
    error:       'var(--status-error)'
  }[status] || 'var(--text-secondary)';
}

function renderTasks(filter) {
  filter = filter || 'all';
  const list = document.getElementById('task-list');
  const filtered = filter === 'all' ? TASKS : TASKS.filter(t => t.status === filter);
  list.innerHTML = filtered.map(t => `
    <li class="task-item" data-status="${t.status}">
      <span class="task-id">${t.id}</span>
      <span class="task-title">${t.title}</span>
      <span class="task-assignee">${t.assignee}</span>
      <span class="task-badge" style="color:${statusBadgeColor(t.status)}">${t.status}</span>
      <span class="task-priority priority-${t.priority}">${t.priority}</span>
    </li>
  `).join('');
}

function initTaskFilters() {
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentTaskFilter = btn.dataset.filter;
      renderTasks(currentTaskFilter);
    });
  });
}

// ── STEP 07: Log Panel ────────────────────────────────────────────────────────

function renderLogs() {
  const panel = document.getElementById('log-panel');
  const search = document.getElementById('log-search').value.toLowerCase();
  const level = document.getElementById('log-level-filter').value;

  const filtered = LOGS.filter(function(l) {
    const matchLevel = level === 'all' || l.level === level;
    const matchSearch = l.message.toLowerCase().includes(search) || l.agentId.includes(search);
    return matchLevel && matchSearch;
  });

  panel.innerHTML = filtered.map(function(l) {
    return '<div class="log-entry log-' + l.level + '">' +
      '<span class="log-time">' + l.timestamp.replace('T', ' ') + '</span>' +
      '<span class="log-level">[' + l.level.toUpperCase() + ']</span>' +
      '<span class="log-agent">' + l.agentId + '</span>' +
      '<span class="log-msg">' + l.message + '</span>' +
      '</div>';
  }).join('') || '<div class="log-empty">로그 없음</div>';
}

function initLogControls() {
  document.getElementById('log-search').addEventListener('input', renderLogs);
  document.getElementById('log-level-filter').addEventListener('change', renderLogs);
}

function initMemo() {
  const input = document.getElementById('memo-input');
  const saved = localStorage.getItem('dashboard-memo');
  if (saved) input.value = saved;
  document.getElementById('memo-save').addEventListener('click', function() {
    localStorage.setItem('dashboard-memo', input.value);
    var btn = document.getElementById('memo-save');
    btn.textContent = '저장됨 ✓';
    setTimeout(function() { btn.textContent = '저장'; }, 1500);
  });
}

// ── STEP 08: Model Strategy Checklist ────────────────────────────────────────

function renderStrategies() {
  const list = document.getElementById('strategy-list');
  list.innerHTML = MODEL_STRATEGIES.map(function(s) {
    return '<li class="strategy-item ' + (s.enabled ? 'enabled' : '') + '">' +
      '<label class="strategy-label">' +
        '<input type="checkbox" class="strategy-check" data-id="' + s.id + '" ' + (s.enabled ? 'checked' : '') + ' />' +
        '<span class="strategy-name">' + s.name + '</span>' +
      '</label>' +
      '<p class="strategy-desc">' + s.description + '</p>' +
    '</li>';
  }).join('');

  document.querySelectorAll('.strategy-check').forEach(function(cb) {
    cb.addEventListener('change', function(e) {
      var strategy = MODEL_STRATEGIES.find(function(s) { return s.id === e.target.dataset.id; });
      if (strategy) {
        strategy.enabled = e.target.checked;
        e.target.closest('.strategy-item').classList.toggle('enabled', strategy.enabled);
      }
    });
  });
}

// ── STEP 11: KPI Summary Bar ──────────────────────────────────────────────────

function renderSummary() {
  document.getElementById('sum-total-agents').textContent = AGENTS.length;
  document.getElementById('sum-active').textContent = AGENTS.filter(function(a) { return a.status === 'active' || a.status === 'running'; }).length;
  document.getElementById('sum-error').textContent = AGENTS.filter(function(a) { return a.status === 'error'; }).length;
  document.getElementById('sum-done-tasks').textContent = TASKS.filter(function(t) { return t.status === 'done'; }).length;
  document.getElementById('sum-inprogress').textContent = TASKS.filter(function(t) { return t.status === 'in_progress'; }).length;
}

// ── STEP 12: Agent Detail Modal ───────────────────────────────────────────────

function openAgentModal(agentId) {
  var agent = AGENTS.find(function(a) { return a.id === agentId; });
  if (!agent) return;
  var agentLogs = LOGS.filter(function(l) { return l.agentId === agentId; }).slice(0, 3);
  var agentTasks = TASKS.filter(function(t) { return t.assignee === agentId; });
  var logsHtml = agentLogs.length
    ? agentLogs.map(function(l) { return '<div class="modal-log log-' + l.level + '"><span class="log-level">[' + l.level.toUpperCase() + ']</span> ' + l.message + '</div>'; }).join('')
    : '<div class="modal-log-empty">로그 없음</div>';
  var tasksHtml = agentTasks.length
    ? agentTasks.map(function(t) { return '<div class="modal-task"><span class="task-id">' + t.id + '</span> ' + t.title + ' <span class="task-badge" style="color:' + statusBadgeColor(t.status) + '">' + t.status + '</span></div>'; }).join('')
    : '<div class="modal-task-empty">태스크 없음</div>';
  document.getElementById('modal-body').innerHTML =
    '<h2 class="modal-agent-name">' + agent.name + '</h2>' +
    '<div class="modal-meta"><span>' + agent.role + '</span> · <span class="agent-model">' + agent.model + '</span> · <span style="color:var(--status-' + agent.status + ')">' + agent.status + '</span></div>' +
    '<h3 class="modal-section-title">최근 로그</h3>' + logsHtml +
    '<h3 class="modal-section-title">담당 태스크</h3>' + tasksHtml;
  document.getElementById('agent-modal').classList.remove('hidden');
}

function closeAgentModal() {
  document.getElementById('agent-modal').classList.add('hidden');
}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', function() {
  renderAgents();
  renderTasks();
  initTaskFilters();
  renderLogs();
  initLogControls();
  initMemo();
  renderStrategies();
  renderSummary();

  var now = new Date().toLocaleString('ko-KR');
  document.getElementById('last-updated').textContent = '마지막 갱신: ' + now;
});

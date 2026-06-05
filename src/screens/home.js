const routeSeed = [
  {
    id: "sydney",
    city: "悉尼",
    days: 3,
    color: "#2d6cdf",
    map: { x: 70, y: 74 },
    stops: ["歌剧院", "岩石区", "邦迪海滩", "蓝山", "达令港", "皇家植物园"],
    intent: "城市初印象与轻松海岸"
  },
  {
    id: "uluru",
    city: "乌鲁鲁",
    days: 2,
    color: "#d36b36",
    map: { x: 48, y: 52 },
    stops: ["日落观景", "卡塔丘塔", "文化中心", "星空晚餐"],
    intent: "自然地标与荒野体验"
  },
  {
    id: "melbourne",
    city: "墨尔本",
    days: 3,
    color: "#7a4bd8",
    map: { x: 62, y: 88 },
    stops: ["联邦广场", "涂鸦巷", "菲利普岛", "大洋路", "维多利亚市场", "咖啡街区"],
    intent: "城市审美与一日线探索"
  },
  {
    id: "reef",
    city: "凯恩斯",
    days: 2,
    color: "#139a91",
    map: { x: 78, y: 35 },
    stops: ["大堡礁", "库兰达雨林", "滨海步道", "码头晚餐"],
    intent: "海洋与热带雨林收尾"
  }
];

const state = {
  view: "map",
  density: 5,
  collapsed: new Set(["day-4"]),
  route: routeSeed.map((city) => ({ ...city })),
  notes: [
    {
      id: "note-1",
      target: "D3 蓝山",
      size: "medium",
      text: "蓝山当天留出 1 小时机动，避免返程太赶。"
    }
  ],
  chat: [
    {
      role: "assistant",
      text: "我先按澳洲十日游铺开。你可以直接改城市天数、景点密度，或在左侧任意节点加注释。"
    },
    {
      role: "assistant",
      text: "老板提到的“摊开/收缩”我放在天数、城市节点和整体工具栏里；宏观调整放在编辑区顶部。"
    }
  ]
};

export function renderHomeScreen(root) {
  const render = () => {
    root.innerHTML = `
      <section class="app-shell">
        ${renderTopbar()}
        <div class="workspace">
          <section class="editor-pane">
            ${renderEditorHeader()}
            ${renderMacroPanel()}
            ${renderActiveView()}
            ${renderNotesPanel()}
          </section>
          ${renderChatPanel()}
        </div>
        <div class="toast" role="status" aria-live="polite"></div>
      </section>
    `;
  };

  root.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;

    const action = target.dataset.action;

    if (action === "set-view") {
      state.view = target.dataset.view;
      render();
      return;
    }

    if (action === "toggle-day") {
      toggleSetValue(state.collapsed, target.dataset.day);
      render();
      return;
    }

    if (action === "toggle-city") {
      toggleSetValue(state.collapsed, `city-${target.dataset.city}`);
      render();
      return;
    }

    if (action === "expand-all") {
      state.collapsed.clear();
      render();
      return;
    }

    if (action === "collapse-all") {
      getPlanDays().forEach((day) => state.collapsed.add(day.id));
      state.route.forEach((city) => state.collapsed.add(`city-${city.id}`));
      render();
      return;
    }

    if (action === "add-note") {
      addNote(target.dataset.target || "当前行程");
      render();
      return;
    }

    if (action === "remove-note") {
      state.notes = state.notes.filter((note) => note.id !== target.dataset.note);
      render();
      return;
    }

    if (action === "city-step") {
      updateCityDays(target.dataset.city, Number(target.dataset.delta));
      render();
      return;
    }

    if (action === "preset") {
      applyPreset(target.dataset.preset);
      render();
      return;
    }

    if (action === "copy-email") {
      void copyEmail();
      return;
    }

    if (action === "send-chat") {
      sendChatMessage(root.querySelector(".chat-input").value);
      render();
      return;
    }
  });

  const handleFormChange = (event) => {
    const target = event.target;

    if (target.matches(".density-range")) {
      state.density = Number(target.value);
      render();
      return;
    }

    if (target.matches(".note-text")) {
      const note = state.notes.find((item) => item.id === target.dataset.note);
      if (note) note.text = target.value;
      return;
    }

    if (target.matches(".note-size")) {
      const note = state.notes.find((item) => item.id === target.dataset.note);
      if (note) note.size = target.value;
      render();
    }
  };

  root.addEventListener("input", handleFormChange);
  root.addEventListener("change", handleFormChange);

  root.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.matches(".chat-input")) {
      event.preventDefault();
      sendChatMessage(event.target.value);
      render();
    }
  });

  render();
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div>
        <p class="eyebrow">Travel Plans / Canvas</p>
        <h1>旅行规划工作台</h1>
      </div>
      <div class="query-pill">
        <span>示例 query</span>
        <strong>澳洲十日游，首次到访，节奏适中</strong>
      </div>
    </header>
  `;
}

function renderEditorHeader() {
  const views = [
    ["map", "地图视图"],
    ["doc", "文档视图"],
    ["canvas", "画布视图"]
  ];

  return `
    <div class="editor-head">
      <div class="view-tabs" role="tablist" aria-label="编辑区视图">
        ${views
          .map(
            ([view, label]) => `
              <button
                class="view-tab ${state.view === view ? "is-active" : ""}"
                type="button"
                role="tab"
                aria-selected="${state.view === view}"
                data-action="set-view"
                data-view="${view}"
              >
                ${label}
              </button>
            `
          )
          .join("")}
      </div>
      <div class="editor-actions">
        <button class="icon-button" type="button" title="全部展开" data-action="expand-all">展开</button>
        <button class="icon-button" type="button" title="全部收缩" data-action="collapse-all">收缩</button>
        <button class="button button--ghost" type="button" data-action="add-note">添加注释</button>
        <button class="button button--primary" type="button" data-action="copy-email">复制到 E-mail</button>
      </div>
    </div>
  `;
}

function renderMacroPanel() {
  const totalDays = getTotalDays();
  return `
    <section class="macro-panel" aria-label="宏观调整">
      <div class="macro-summary">
        <p class="eyebrow">Macro controls</p>
        <h2>先改结构，再改细节</h2>
        <p>不用先想清每个景点。先决定城市天数、景点密度和线路重心，下面的地图、文档和画布会一起更新。</p>
      </div>
      <div class="macro-controls">
        <div class="metric">
          <span>当前总天数</span>
          <strong>${totalDays} 天</strong>
        </div>
        <label class="density-control">
          <span>景点密度 ${state.density}/8</span>
          <input class="density-range" type="range" min="3" max="8" value="${state.density}" />
        </label>
        <div class="preset-row">
          <button type="button" data-action="preset" data-preset="sydney-plus">悉尼加一天</button>
          <button type="button" data-action="preset" data-preset="melbourne-plus">墨尔本加一天</button>
          <button type="button" data-action="preset" data-preset="relax">降低密度</button>
          <button type="button" data-action="preset" data-preset="coast">强化海岸线</button>
        </div>
      </div>
      <div class="city-day-grid">
        ${state.route.map(renderCityStepper).join("")}
      </div>
    </section>
  `;
}

function renderCityStepper(city) {
  return `
    <article class="city-stepper">
      <span class="city-dot" style="--city-color: ${city.color}"></span>
      <div>
        <strong>${city.city}</strong>
        <span>${city.intent}</span>
      </div>
      <div class="stepper">
        <button type="button" data-action="city-step" data-city="${city.id}" data-delta="-1">-</button>
        <output>${city.days} 天</output>
        <button type="button" data-action="city-step" data-city="${city.id}" data-delta="1">+</button>
      </div>
    </article>
  `;
}

function renderActiveView() {
  if (state.view === "doc") return renderDocumentView();
  if (state.view === "canvas") return renderCanvasView();
  return renderMapView();
}

function renderMapView() {
  const points = state.route
    .map(
      (city, index) => `
        <button
          class="map-pin"
          type="button"
          style="--x: ${city.map.x}%; --y: ${city.map.y}%; --city-color: ${city.color};"
          data-action="toggle-city"
          data-city="${city.id}"
          aria-label="${city.city}"
        >
          <span>${index + 1}</span>
        </button>
      `
    )
    .join("");

  return `
    <section class="view-panel map-view" aria-label="地图视图">
      <div class="map-stage">
        <div class="map-grid"></div>
        <svg class="route-line" viewBox="0 0 100 100" aria-hidden="true" preserveAspectRatio="none">
          <polyline points="${state.route.map((city) => `${city.map.x},${city.map.y}`).join(" ")}" />
        </svg>
        ${points}
      </div>
      <aside class="map-inspector">
        <div class="section-title">
          <p class="eyebrow">Route overview</p>
          <h2>澳洲十日游</h2>
        </div>
        ${state.route.map(renderCityBlock).join("")}
      </aside>
    </section>
  `;
}

function renderCityBlock(city) {
  const collapsed = state.collapsed.has(`city-${city.id}`);
  const stops = city.stops.slice(0, Math.min(city.stops.length, Math.max(2, state.density - 1)));
  return `
    <article class="city-block ${collapsed ? "is-collapsed" : ""}">
      <button class="city-block__head" type="button" data-action="toggle-city" data-city="${city.id}">
        <span class="city-dot" style="--city-color: ${city.color}"></span>
        <strong>${city.city}</strong>
        <span>${city.days} 天</span>
      </button>
      ${
        collapsed
          ? ""
          : `<div class="tag-list">${stops.map((stop) => `<span>${stop}</span>`).join("")}</div>`
      }
    </article>
  `;
}

function renderDocumentView() {
  return `
    <section class="view-panel document-view" aria-label="文档视图">
      <div class="doc-header">
        <div>
          <p class="eyebrow">Living document</p>
          <h2>澳洲十日游行程草案</h2>
        </div>
        <p>每一天都能像文档标题一样摊开或收缩，也可以在任意段落旁加注释。</p>
      </div>
      <div class="day-list">
        ${getPlanDays().map(renderDaySection).join("")}
      </div>
    </section>
  `;
}

function renderDaySection(day) {
  const collapsed = state.collapsed.has(day.id);
  return `
    <article class="day-section ${collapsed ? "is-collapsed" : ""}">
      <button class="day-head" type="button" data-action="toggle-day" data-day="${day.id}">
        <span>${collapsed ? "+" : "-"}</span>
        <strong>D${day.day} ${day.city}</strong>
        <em>${day.title}</em>
      </button>
      ${
        collapsed
          ? ""
          : `
            <div class="day-body">
              <p>${day.summary}</p>
              <div class="tag-list">${day.stops.map((stop) => `<span>${stop}</span>`).join("")}</div>
              <div class="day-actions">
                <button type="button" data-action="add-note" data-target="D${day.day} ${day.city}">添加注释</button>
                <button type="button" data-action="preset" data-preset="${day.cityId}-plus">给${day.city}加一天</button>
              </div>
            </div>
          `
      }
    </article>
  `;
}

function renderCanvasView() {
  return `
    <section class="view-panel canvas-view" aria-label="画布视图">
      <div class="canvas-board">
        ${state.route.map(renderCanvasCity).join("")}
        ${state.notes.map(renderCanvasNote).join("")}
      </div>
    </section>
  `;
}

function renderCanvasCity(city, index) {
  const collapsed = state.collapsed.has(`city-${city.id}`);
  const width = Math.max(150, 112 + city.days * 30);
  return `
    <article class="canvas-node ${collapsed ? "is-collapsed" : ""}" style="--city-color: ${city.color}; --node-width: ${width}px;">
      <button class="canvas-node__head" type="button" data-action="toggle-city" data-city="${city.id}">
        <span>${index + 1}</span>
        <strong>${city.city}</strong>
        <em>${city.days} 天</em>
      </button>
      ${
        collapsed
          ? ""
          : `
            <div class="canvas-node__body">
              <p>${city.intent}</p>
              <div class="mini-days">${Array.from({ length: city.days }, (_, day) => `<span>D${day + 1}</span>`).join("")}</div>
            </div>
          `
      }
    </article>
  `;
}

function renderCanvasNote(note, index) {
  return `
    <article class="canvas-note canvas-note--${note.size}" style="--note-index: ${index};">
      <strong>${note.target}</strong>
      <p>${escapeHtml(note.text)}</p>
    </article>
  `;
}

function renderNotesPanel() {
  return `
    <section class="notes-panel" aria-label="注释">
      <div class="section-title">
        <p class="eyebrow">Annotations</p>
        <h2>注释层</h2>
      </div>
      <div class="notes-list">
        ${
          state.notes.length
            ? state.notes.map(renderNoteEditor).join("")
            : `<p class="empty-state">还没有注释。可以在任意天数、城市节点或当前视图上添加。</p>`
        }
      </div>
    </section>
  `;
}

function renderNoteEditor(note) {
  return `
    <article class="note-editor note-editor--${note.size}">
      <div class="note-editor__head">
        <strong>${note.target}</strong>
        <button type="button" data-action="remove-note" data-note="${note.id}">删除</button>
      </div>
      <textarea class="note-text" data-note="${note.id}" rows="3">${escapeHtml(note.text)}</textarea>
      <label>
        <span>注释尺寸</span>
        <select class="note-size" data-note="${note.id}">
          <option value="small" ${note.size === "small" ? "selected" : ""}>小</option>
          <option value="medium" ${note.size === "medium" ? "selected" : ""}>中</option>
          <option value="large" ${note.size === "large" ? "selected" : ""}>大</option>
        </select>
      </label>
    </article>
  `;
}

function renderChatPanel() {
  return `
    <aside class="chat-pane" aria-label="对话框">
      <div class="chat-head">
        <div>
          <p class="eyebrow">AI copilot</p>
          <h2>对话修改</h2>
        </div>
        <span>结构优先</span>
      </div>
      <div class="chat-messages">
        ${state.chat.map(renderChatMessage).join("")}
      </div>
      <div class="chat-shortcuts">
        <button type="button" data-action="preset" data-preset="sydney-plus">悉尼多玩一天</button>
        <button type="button" data-action="preset" data-preset="relax">少跑景点</button>
        <button type="button" data-action="preset" data-preset="coast">多一点海岸</button>
      </div>
      <div class="chat-compose">
        <input class="chat-input" type="text" value="把澳洲十日游改得更适合第一次去的人" />
        <button class="button button--primary" type="button" data-action="send-chat">发送</button>
      </div>
    </aside>
  `;
}

function renderChatMessage(message) {
  return `
    <article class="chat-message chat-message--${message.role}">
      <p>${escapeHtml(message.text)}</p>
    </article>
  `;
}

function getPlanDays() {
  const days = [];
  let dayNumber = 1;

  state.route.forEach((city) => {
    for (let day = 0; day < city.days; day += 1) {
      const stopCount = Math.min(city.stops.length, Math.max(2, state.density - 2));
      const startIndex = (day * 2) % city.stops.length;
      const availableStops = Array.from({ length: stopCount }, (_, index) => {
        return city.stops[(startIndex + index) % city.stops.length];
      });
      days.push({
        id: `day-${dayNumber}`,
        day: dayNumber,
        city: city.city,
        cityId: city.id,
        title: day === 0 ? `${city.intent}` : `${city.city}深入与弹性安排`,
        summary: buildDaySummary(city, day, availableStops),
        stops: availableStops
      });
      dayNumber += 1;
    }
  });

  return days;
}

function buildDaySummary(city, dayIndex, stops) {
  if (dayIndex === 0) {
    return `抵达或切换到${city.city}，先用半天建立方位感，再安排 ${stops.join("、")}。`;
  }
  return `${city.city}第 ${dayIndex + 1} 天保持可调整节奏，核心围绕 ${stops.join("、")}，晚间留出复盘和改计划时间。`;
}

function getTotalDays() {
  return state.route.reduce((sum, city) => sum + city.days, 0);
}

function toggleSetValue(set, value) {
  if (set.has(value)) set.delete(value);
  else set.add(value);
}

function updateCityDays(cityId, delta) {
  const city = state.route.find((item) => item.id === cityId);
  if (!city) return;
  city.days = Math.min(5, Math.max(1, city.days + delta));
  state.chat.push({
    role: "assistant",
    text: `已把${city.city}调整为 ${city.days} 天。左侧三个视图已经同步更新。`
  });
}

function applyPreset(preset) {
  const cityPreset = preset.match(/^(.+)-plus$/);
  if (cityPreset) {
    updateCityDays(cityPreset[1], 1);
    return;
  }

  if (preset === "relax") {
    state.density = Math.max(3, state.density - 1);
    state.chat.push({ role: "assistant", text: "已降低景点密度，保留更多机动时间。" });
    return;
  }

  if (preset === "coast") {
    const reef = state.route.find((city) => city.id === "reef");
    const uluru = state.route.find((city) => city.id === "uluru");
    if (reef && uluru && uluru.days > 1) {
      reef.days += 1;
      uluru.days -= 1;
    }
    state.chat.push({ role: "assistant", text: "已把线路重心向海岸和大堡礁倾斜，压缩部分内陆时间。" });
  }
}

function addNote(target = "当前行程") {
  state.notes.push({
    id: `note-${Date.now()}`,
    target,
    size: "medium",
    text: "写下注释，拖动右下角可以调整文本框大小。"
  });
}

function sendChatMessage(value) {
  const text = value.trim();
  if (!text) return;

  state.chat.push({ role: "user", text });
  state.chat.push({
    role: "assistant",
    text: "收到。这个版本先把你的需求转成宏观控制：城市天数、景点密度、线路重心。下一步可以继续接入真实 AI 生成和局部改写。"
  });
}

async function copyEmail() {
  const body = buildEmailText();
  try {
    await navigator.clipboard.writeText(body);
    showToast("已复制 E-mail 草稿");
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = body;
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    showToast("已复制 E-mail 草稿");
  }
}

function buildEmailText() {
  const days = getPlanDays();
  const lines = [
    "主题：澳洲十日游行程草案",
    "",
    `总天数：${getTotalDays()} 天`,
    `景点密度：${state.density}/8`,
    "",
    "行程概览：",
    ...state.route.map((city) => `- ${city.city}：${city.days} 天，${city.intent}`),
    "",
    "每日安排：",
    ...days.map((day) => `D${day.day} ${day.city}：${day.stops.join("、")}`),
    "",
    "注释：",
    ...(state.notes.length ? state.notes.map((note) => `- ${note.target}：${note.text}`) : ["- 暂无"])
  ];

  return lines.join("\n");
}

function showToast(message) {
  const toast = document.querySelector(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

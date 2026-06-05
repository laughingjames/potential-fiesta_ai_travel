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

const dayTemplates = {
  sydney: [
    {
      focus: "抵达与海港地标",
      pace: "轻松",
      transport: "机场快线 + 步行",
      stay: "Circular Quay 附近",
      image: "harbor",
      schedule: [
        { time: "09:30", title: "抵达悉尼", detail: "先把行李放到酒店，确认 Opal 交通卡和电话卡。" },
        { time: "13:30", title: "歌剧院与海港大桥", detail: "用步行建立城市方位，拍照点安排在 Mrs Macquarie's Chair。" },
        { time: "18:30", title: "岩石区晚餐", detail: "选海港边轻松餐厅，第一天不安排太满。" }
      ]
    },
    {
      focus: "海岸线与本地生活",
      pace: "适中",
      transport: "公交 + 海岸步道",
      stay: "悉尼市中心",
      image: "coast",
      schedule: [
        { time: "09:00", title: "邦迪海滩", detail: "从 Bondi 到 Coogee 选一段海岸步道，不强求走完全程。" },
        { time: "14:00", title: "Paddington / Surry Hills", detail: "咖啡、买手店和街区散步，保留临时替换空间。" },
        { time: "19:00", title: "达令港", detail: "晚餐后可以沿水边散步，作为城市夜景收尾。" }
      ]
    },
    {
      focus: "蓝山一日线",
      pace: "偏满",
      transport: "火车或包车",
      stay: "悉尼市中心",
      image: "mountain",
      schedule: [
        { time: "08:00", title: "前往蓝山", detail: "如果同行人怕累，优先包车；公共交通需要更早出发。" },
        { time: "11:00", title: "三姐妹峰与 Scenic World", detail: "核心点控制在 2-3 个，避免一日线碎片化。" },
        { time: "17:30", title: "回悉尼", detail: "晚餐不预约太硬，给返程延误留空间。" }
      ]
    }
  ],
  uluru: [
    {
      focus: "内陆日落",
      pace: "舒缓",
      transport: "航班 + 酒店接驳",
      stay: "Ayers Rock Resort",
      image: "desert",
      schedule: [
        { time: "10:30", title: "飞往乌鲁鲁", detail: "抵达后先休息补水，内陆天气变化大。" },
        { time: "16:30", title: "乌鲁鲁日落观景", detail: "带外套和水，日落后温差明显。" },
        { time: "20:00", title: "星空晚餐", detail: "如果预算紧张，可替换为度假村内轻餐。" }
      ]
    },
    {
      focus: "卡塔丘塔与文化中心",
      pace: "适中",
      transport: "当地团或自驾",
      stay: "Ayers Rock Resort",
      image: "rock",
      schedule: [
        { time: "06:00", title: "日出观景", detail: "早起看光线变化，结束后回酒店早餐。" },
        { time: "10:30", title: "文化中心", detail: "补足原住民文化背景，避免只看地标。" },
        { time: "15:30", title: "卡塔丘塔轻徒步", detail: "根据体力选择短线，傍晚返回。" }
      ]
    }
  ],
  melbourne: [
    {
      focus: "城市审美与街区",
      pace: "轻松",
      transport: "电车 + 步行",
      stay: "CBD / Southbank",
      image: "laneway",
      schedule: [
        { time: "09:30", title: "联邦广场", detail: "从市中心公共空间开始，顺路看圣保罗教堂。" },
        { time: "11:00", title: "涂鸦巷与咖啡街区", detail: "安排 2 小时给拍照和咖啡，不急着赶点。" },
        { time: "16:00", title: "维多利亚市场", detail: "如果当天不开市，替换为 Fitzroy 街区。" }
      ]
    },
    {
      focus: "大洋路",
      pace: "偏满",
      transport: "一日团或包车",
      stay: "墨尔本 CBD",
      image: "road",
      schedule: [
        { time: "07:30", title: "出发大洋路", detail: "路程长，建议别把晚上安排得太硬。" },
        { time: "12:30", title: "海岸午餐与观景", detail: "优先十二门徒、Loch Ard Gorge，其他点看时间。" },
        { time: "20:00", title: "回到墨尔本", detail: "准备简单晚餐或外卖，降低疲劳。" }
      ]
    },
    {
      focus: "菲利普岛或城市留白",
      pace: "可选",
      transport: "自驾 / 一日团",
      stay: "墨尔本 CBD",
      image: "penguin",
      schedule: [
        { time: "10:00", title: "慢上午", detail: "如果前一天大洋路疲劳，上午不安排固定项目。" },
        { time: "14:00", title: "前往菲利普岛", detail: "看企鹅归巢；若天气差，改为美术馆和河岸散步。" },
        { time: "21:30", title: "返回酒店", detail: "这天重点是可替换，不追求满行程。" }
      ]
    }
  ],
  reef: [
    {
      focus: "大堡礁出海",
      pace: "偏满",
      transport: "船",
      stay: "Cairns Esplanade",
      image: "reef",
      schedule: [
        { time: "08:00", title: "码头集合", detail: "提前确认晕船药、泳衣、毛巾和防晒。" },
        { time: "10:30", title: "浮潜或玻璃底船", detail: "不强迫深潜，给不同体力的人留选择。" },
        { time: "17:00", title: "滨海步道", detail: "出海后不安排复杂交通，轻松收尾。" }
      ]
    },
    {
      focus: "雨林与返程缓冲",
      pace: "舒缓",
      transport: "缆车 / 火车",
      stay: "返程或机场附近",
      image: "rainforest",
      schedule: [
        { time: "09:00", title: "库兰达雨林", detail: "用缆车或观光火车串联，减少步行压力。" },
        { time: "14:30", title: "凯恩斯市区补给", detail: "买伴手礼、整理照片和账单。" },
        { time: "18:00", title: "返程准备", detail: "预留打包和机场交通时间。" }
      ]
    }
  ]
};

const state = {
  view: "canvas",
  density: 5,
  collapsed: new Set(["day-4"]),
  activeCanvasDay: null,
  dayEdits: {},
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
            ${state.view === "canvas" ? renderCanvasQuickPanel() : renderMacroPanel()}
            ${renderActiveView()}
            ${state.view === "canvas" ? "" : renderNotesPanel()}
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
      state.activeCanvasDay = null;
      render();
      return;
    }

    if (action === "open-day") {
      state.activeCanvasDay = target.dataset.day;
      render();
      return;
    }

    if (action === "close-day") {
      state.activeCanvasDay = null;
      render();
      return;
    }

    if (action === "add-activity") {
      addActivity(target.dataset.day);
      render();
      return;
    }

    if (action === "remove-activity") {
      removeActivity(target.dataset.day, Number(target.dataset.index));
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
      return;
    }

    if (target.matches("[data-day-field]")) {
      updateDayField(target.dataset.day, target.dataset.dayField, target.value);
      return;
    }

    if (target.matches("[data-activity-field]")) {
      updateActivityField(
        target.dataset.day,
        Number(target.dataset.index),
        target.dataset.activityField,
        target.value
      );
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
    ["canvas", "画布视图"],
    ["map", "地图视图"],
    ["doc", "文档视图"]
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

function renderCanvasQuickPanel() {
  return `
    <section class="canvas-quick-panel" aria-label="画布快速调整">
      <div class="canvas-quick-panel__title">
        <p class="eyebrow">Canvas controls</p>
        <strong>${getTotalDays()} 天澳洲行程</strong>
      </div>
      <label class="quick-density">
        <span>景点密度 ${state.density}/8</span>
        <input class="density-range" type="range" min="3" max="8" value="${state.density}" />
      </label>
      <div class="preset-row">
        <button type="button" data-action="preset" data-preset="sydney-plus">悉尼加一天</button>
        <button type="button" data-action="preset" data-preset="melbourne-plus">墨尔本加一天</button>
        <button type="button" data-action="preset" data-preset="relax">降低密度</button>
        <button type="button" data-action="preset" data-preset="coast">强化海岸线</button>
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
  const days = getPlanDays();
  const activeDay = days.find((day) => day.id === state.activeCanvasDay);

  if (activeDay) return renderCanvasDayDetail(activeDay);

  return `
    <section class="view-panel canvas-view canvas-overview" aria-label="画布视图">
      <div class="canvas-toolbar">
        <div>
          <p class="eyebrow">Notion-like canvas</p>
          <h2>澳洲十日游每日看板</h2>
          <p>先平铺看到 D1-D10 的关键安排。点击任意一天进入详情，所有标题、节奏、交通和时间段都可以直接编辑。</p>
        </div>
        <div class="canvas-toolbar__meta">
          <span>${days.length} 天</span>
          <span>${state.notes.length} 条注释</span>
        </div>
      </div>
      <div class="day-card-grid">
        ${days.map(renderCanvasDayCard).join("")}
      </div>
    </section>
  `;
}

function renderCanvasDayCard(day) {
  return `
    <article class="day-card" style="--city-color: ${day.color};">
      <button class="day-card__open" type="button" data-action="open-day" data-day="${day.id}" aria-label="打开 D${day.day} ${day.city}">
        <div class="day-card__image travel-image travel-image--${day.image}" role="img" aria-label="${day.city} ${day.focus} 图片">
          <span>D${day.day}</span>
        </div>
        <div class="day-card__body">
          <div class="day-card__head">
            <span>${day.city}</span>
            <em>${day.pace}</em>
          </div>
          <h3>${escapeHtml(day.title)}</h3>
          <p>${escapeHtml(day.summary)}</p>
          <div class="info-strip">
            <span>${escapeHtml(day.transport)}</span>
            <span>${escapeHtml(day.stay)}</span>
          </div>
          <div class="tag-list">${day.stops.slice(0, 3).map((stop) => `<span>${escapeHtml(stop)}</span>`).join("")}</div>
        </div>
      </button>
    </article>
  `;
}

function renderCanvasDayDetail(day) {
  return `
    <section class="view-panel canvas-view day-detail-view" aria-label="单日详情">
      <div class="day-detail-head">
        <button class="button button--ghost" type="button" data-action="close-day">返回画布</button>
        <div>
          <p class="eyebrow">Editable day plan</p>
          <h2>D${day.day} ${day.city}</h2>
        </div>
        <button class="button button--primary" type="button" data-action="add-note" data-target="D${day.day} ${day.city}">给当天加注释</button>
      </div>
      <div class="day-detail-layout">
        <aside class="day-detail-side">
          <div class="detail-cover travel-image travel-image--${day.image}" role="img" aria-label="${day.city} ${day.focus} 图片">
            <span>D${day.day}</span>
          </div>
          <label class="edit-field">
            <span>当天标题</span>
            <input type="text" value="${escapeAttr(day.title)}" data-day="${day.id}" data-day-field="title" />
          </label>
          <label class="edit-field">
            <span>节奏</span>
            <select data-day="${day.id}" data-day-field="pace">
              ${["舒缓", "轻松", "适中", "偏满", "可选"].map((pace) => `<option value="${pace}" ${day.pace === pace ? "selected" : ""}>${pace}</option>`).join("")}
            </select>
          </label>
          <label class="edit-field">
            <span>交通</span>
            <input type="text" value="${escapeAttr(day.transport)}" data-day="${day.id}" data-day-field="transport" />
          </label>
          <label class="edit-field">
            <span>住宿 / 落点</span>
            <input type="text" value="${escapeAttr(day.stay)}" data-day="${day.id}" data-day-field="stay" />
          </label>
          <label class="edit-field">
            <span>当天摘要</span>
            <textarea rows="4" data-day="${day.id}" data-day-field="summary">${escapeHtml(day.summary)}</textarea>
          </label>
        </aside>
        <main class="day-detail-main">
          <div class="detail-section-title">
            <div>
              <p class="eyebrow">Timeline</p>
              <h3>每日具体安排</h3>
            </div>
            <button class="button button--ghost" type="button" data-action="add-activity" data-day="${day.id}">添加时间段</button>
          </div>
          <div class="activity-list">
            ${day.schedule.map((activity, index) => renderActivityEditor(day.id, activity, index)).join("")}
          </div>
          <div class="detail-section-title">
            <div>
              <p class="eyebrow">Key places</p>
              <h3>关键信息</h3>
            </div>
          </div>
          <div class="detail-facts">
            ${day.stops.map((stop) => `<span>${escapeHtml(stop)}</span>`).join("")}
          </div>
        </main>
      </div>
    </section>
  `;
}

function renderActivityEditor(dayId, activity, index) {
  return `
    <article class="activity-editor">
      <input class="activity-time" type="text" value="${escapeAttr(activity.time)}" data-day="${dayId}" data-index="${index}" data-activity-field="time" aria-label="时间" />
      <div class="activity-fields">
        <input type="text" value="${escapeAttr(activity.title)}" data-day="${dayId}" data-index="${index}" data-activity-field="title" aria-label="安排标题" />
        <textarea rows="2" data-day="${dayId}" data-index="${index}" data-activity-field="detail" aria-label="安排详情">${escapeHtml(activity.detail)}</textarea>
      </div>
      <button type="button" data-action="remove-activity" data-day="${dayId}" data-index="${index}" aria-label="删除时间段">删除</button>
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
      const template = getDayTemplate(city.id, day);
      const stopCount = Math.min(city.stops.length, Math.max(2, state.density - 2));
      const startIndex = (day * 2) % city.stops.length;
      const availableStops = Array.from({ length: stopCount }, (_, index) => {
        return city.stops[(startIndex + index) % city.stops.length];
      });
      const baseDay = {
        id: `day-${dayNumber}`,
        day: dayNumber,
        city: city.city,
        cityId: city.id,
        color: city.color,
        image: template.image,
        focus: template.focus,
        pace: template.pace,
        transport: template.transport,
        stay: template.stay,
        title: template.focus,
        summary: buildDaySummary(city, day, availableStops),
        stops: availableStops,
        schedule: template.schedule.map((activity) => ({ ...activity }))
      };
      days.push(applyDayEdit(baseDay));
      dayNumber += 1;
    }
  });

  return days;
}

function getDayTemplate(cityId, dayIndex) {
  const templates = dayTemplates[cityId] || dayTemplates.sydney;
  return templates[dayIndex % templates.length];
}

function applyDayEdit(baseDay) {
  const edit = state.dayEdits[baseDay.id];
  if (!edit) return baseDay;
  return {
    ...baseDay,
    ...edit,
    schedule: edit.schedule ? edit.schedule.map((activity) => ({ ...activity })) : baseDay.schedule
  };
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

function ensureDayEdit(dayId) {
  if (!state.dayEdits[dayId]) {
    const day = getPlanDays().find((item) => item.id === dayId);
    state.dayEdits[dayId] = day
      ? {
          title: day.title,
          pace: day.pace,
          transport: day.transport,
          stay: day.stay,
          summary: day.summary,
          schedule: day.schedule.map((activity) => ({ ...activity }))
        }
      : { schedule: [] };
  }
  return state.dayEdits[dayId];
}

function updateDayField(dayId, field, value) {
  const edit = ensureDayEdit(dayId);
  edit[field] = value;
}

function updateActivityField(dayId, index, field, value) {
  const edit = ensureDayEdit(dayId);
  if (!edit.schedule[index]) return;
  edit.schedule[index][field] = value;
}

function addActivity(dayId) {
  const edit = ensureDayEdit(dayId);
  edit.schedule.push({
    time: "待定",
    title: "新的安排",
    detail: "补充交通、时长、预订和替代方案。"
  });
}

function removeActivity(dayId, index) {
  const edit = ensureDayEdit(dayId);
  if (edit.schedule.length <= 1) {
    showToast("至少保留一个时间段");
    return;
  }
  edit.schedule.splice(index, 1);
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

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

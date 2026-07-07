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

const hotelSeed = [
  {
    city: "悉尼",
    name: "Pier One Sydney Harbour",
    area: "The Rocks / Circular Quay",
    budget: "约 AUD 330-460 / 晚",
    reason: "步行到歌剧院和岩石区，适合首次到访建立方位感。",
    image: "harbor"
  },
  {
    city: "乌鲁鲁",
    name: "Desert Gardens Hotel",
    area: "Ayers Rock Resort",
    budget: "约 AUD 380-520 / 晚",
    reason: "接驳方便，适合日落观景和文化中心安排。",
    image: "desert"
  },
  {
    city: "墨尔本",
    name: "Ovolo Laneways",
    area: "CBD / Theatre District",
    budget: "约 AUD 240-360 / 晚",
    reason: "适合街区探索，去联邦广场、咖啡街区都比较顺。",
    image: "laneway"
  },
  {
    city: "凯恩斯",
    name: "Crystalbrook Flynn",
    area: "Esplanade",
    budget: "约 AUD 250-390 / 晚",
    reason: "靠近码头和滨海步道，大堡礁出海当天更省心。",
    image: "reef"
  }
];

const budgetSeed = [
  { label: "大交通", amount: "待估算", note: "航班、高铁、包车或长途交通" },
  { label: "酒店", amount: "待估算", note: "按目的地、位置和舒适度动态估算" },
  { label: "体验与门票", amount: "待估算", note: "核心景点、导览、活动和预约项目" },
  { label: "餐饮与市内交通", amount: "待估算", note: "按旅行节奏和城市通勤估算" }
];

const bookingSeed = {
  flights: {
    sydney: { booked: false, name: "上海 - 悉尼", action: "订抵达航班", detail: "直飞优先 · 上午抵达 · 含 1 件托运行李" },
    uluru: { booked: true, name: "QF728 悉尼 - 乌鲁鲁", action: "订内陆航班", detail: "10:40 SYD - 13:45 AYQ · 2 件行李" },
    melbourne: { booked: true, name: "JQ665 乌鲁鲁 - 墨尔本", action: "订城市航班", detail: "14:20 AYQ - 18:05 MEL · 经济舱" },
    reef: { booked: false, name: "墨尔本 - 凯恩斯", action: "订凯恩斯航班", detail: "下午出发 · 靠窗座优先" }
  },
  hotels: {
    sydney: { booked: true, name: "Pier One Sydney Harbour", action: "订悉尼酒店", detail: "The Rocks · 2 晚 · 海港步行圈" },
    uluru: { booked: true, name: "Desert Gardens Hotel", action: "订乌鲁鲁酒店", detail: "Ayers Rock Resort · 2 晚 · 接驳方便" },
    melbourne: { booked: false, name: "Ovolo Laneways", action: "订墨尔本酒店", detail: "CBD / Theatre District · 3 晚" },
    reef: { booked: false, name: "Crystalbrook Flynn", action: "订凯恩斯酒店", detail: "Esplanade · 2 晚 · 近码头" }
  },
  tickets: {
    sydney: { booked: false, name: "悉尼景点通票", action: "订景点门票", detail: "歌剧院导览 / 蓝山 / 海港体验可组合" },
    uluru: { booked: true, name: "乌鲁鲁日落观景套票", action: "订体验门票", detail: "日落观景 + 文化中心 · 可改期一次" },
    melbourne: { booked: false, name: "墨尔本城市体验", action: "订体验门票", detail: "NGV / 菲利普岛 / 大洋路候选" },
    reef: { booked: false, name: "大堡礁出海船票", action: "订出海门票", detail: "浮潜 / 玻璃底船 · 含午餐候选" }
  },
  trains: {
    sydney: { booked: false, name: "悉尼城际列车", action: "订火车票", detail: "市区 ↔ 蓝山 / 机场快线候选" },
    uluru: { booked: false, name: "乌鲁鲁接驳交通", action: "订交通票", detail: "机场接驳或当地交通方案" },
    melbourne: { booked: false, name: "墨尔本 V/Line", action: "订火车票", detail: "大洋路 / 菲利普岛方向候选" },
    reef: { booked: false, name: "凯恩斯区域列车", action: "订火车票", detail: "库兰达方向或市内接驳" }
  }
};

const INSPIRATION_DESTINATION_CATALOG = [
  {
    id: "sanya",
    name: "三亚",
    region: "海南",
    themes: ["海岛", "海滩", "度假", "国内", "热带"],
    priceFrom: "¥2,400",
    lng: 109.511,
    lat: 18.252,
    image: "coast",
    tagline: "亚龙湾 · 蜈支洲岛",
    highlights: ["亚龙湾", "蜈支洲岛", "天涯海角"]
  },
  {
    id: "weizhou",
    name: "涠洲岛",
    region: "广西",
    themes: ["海岛", "国内", "潜水"],
    priceFrom: "¥1,800",
    lng: 109.104,
    lat: 21.04,
    image: "reef",
    tagline: "火山海岛 · 玻璃海",
    highlights: ["五彩滩", "鳄鱼山", "石螺口"]
  },
  {
    id: "gulangyu",
    name: "鼓浪屿",
    region: "福建",
    themes: ["海岛", "文艺", "国内", "步行"],
    priceFrom: "¥1,600",
    lng: 118.067,
    lat: 24.447,
    image: "harbor",
    tagline: "万国建筑 · 海边漫步",
    highlights: ["日光岩", "菽庄花园", "龙头路"]
  },
  {
    id: "zhoushan",
    name: "舟山",
    region: "浙江",
    themes: ["海岛", "国内", "海鲜"],
    priceFrom: "¥1,500",
    lng: 122.207,
    lat: 29.985,
    image: "coast",
    tagline: "普陀山 · 东极岛",
    highlights: ["普陀山", "东极岛", "朱家尖"]
  },
  {
    id: "changdao",
    name: "长岛",
    region: "山东",
    themes: ["海岛", "国内"],
    priceFrom: "¥1,400",
    lng: 120.738,
    lat: 37.914,
    image: "reef",
    tagline: "渤海明珠 · 渔家风情",
    highlights: ["九丈崖", "月牙湾", "烽山"]
  },
  {
    id: "huizhou",
    name: "惠州",
    region: "广东",
    themes: ["海岛", "海滩", "国内", "周末"],
    priceFrom: "¥1,200",
    lng: 114.416,
    lat: 22.788,
    image: "coast",
    tagline: "双月湾 · 巽寮湾",
    highlights: ["双月湾", "巽寮湾", "海龟湾"]
  },
  {
    id: "xiamen",
    name: "厦门",
    region: "福建",
    themes: ["海岛", "文艺", "国内", "城市"],
    priceFrom: "¥1,700",
    lng: 118.089,
    lat: 24.479,
    image: "harbor",
    tagline: "环岛路 · 文艺老城",
    highlights: ["环岛路", "曾厝垵", "南普陀"]
  },
  {
    id: "lijiang",
    name: "丽江",
    region: "云南",
    themes: ["古镇", "雪山", "登山", "国内", "慢生活"],
    priceFrom: "¥2,100",
    lng: 100.233,
    lat: 26.872,
    image: "mountain",
    tagline: "古城 · 玉龙雪山",
    highlights: ["丽江古城", "玉龙雪山", "束河古镇"]
  },
  {
    id: "dali",
    name: "大理",
    region: "云南",
    themes: ["洱海", "古镇", "登山", "国内", "慢生活"],
    priceFrom: "¥1,900",
    lng: 100.225,
    lat: 25.589,
    image: "road",
    tagline: "洱海骑行 · 苍山",
    highlights: ["洱海", "大理古城", "喜洲古镇"]
  },
  {
    id: "chengdu",
    name: "成都",
    region: "四川",
    themes: ["美食", "国内", "城市", "慢生活"],
    priceFrom: "¥1,500",
    lng: 104.066,
    lat: 30.572,
    image: "laneway",
    tagline: "火锅 · 熊猫 · 茶馆",
    highlights: ["宽窄巷子", "大熊猫基地", "锦里"]
  },
  {
    id: "qingdao",
    name: "青岛",
    region: "山东",
    themes: ["海岛", "海滩", "国内", "城市", "度假"],
    priceFrom: "¥1,600",
    lng: 120.382,
    lat: 36.067,
    image: "coast",
    tagline: "栈桥 · 金沙滩",
    highlights: ["栈桥", "金沙滩", "八大关"]
  },
  {
    id: "dalian",
    name: "大连",
    region: "辽宁",
    themes: ["海岛", "海滩", "国内", "城市", "度假"],
    priceFrom: "¥1,700",
    lng: 121.614,
    lat: 38.914,
    image: "harbor",
    tagline: "滨海路 · 老虎滩",
    highlights: ["星海广场", "老虎滩", "金石滩"]
  },
  {
    id: "qiandao-lake",
    name: "千岛湖",
    region: "浙江",
    themes: ["湖景", "国内", "自驾", "亲子", "美食", "度假"],
    priceFrom: "¥1,600",
    lng: 119.042,
    lat: 29.558,
    image: "coast",
    tagline: "千岛碧水 · 鱼头美食",
    highlights: ["梅峰观岛", "天屿山", "芹川古村"]
  },
  {
    id: "huangshan",
    name: "黄山",
    region: "安徽",
    themes: ["登山", "国内", "摄影", "周末"],
    priceFrom: "¥1,500",
    lng: 118.337,
    lat: 30.132,
    image: "mountain",
    tagline: "奇松云海 · 经典登山",
    highlights: ["迎客松", "光明顶", "西海大峡谷"]
  },
  {
    id: "taishan",
    name: "泰山",
    region: "山东",
    themes: ["登山", "国内", "文化"],
    priceFrom: "¥900",
    lng: 117.129,
    lat: 36.254,
    image: "mountain",
    tagline: "日出东方 · 五岳之首",
    highlights: ["日观峰", "南天门", "岱庙"]
  },
  {
    id: "wugongshan",
    name: "武功山",
    region: "江西",
    themes: ["登山", "徒步", "国内", "摄影"],
    priceFrom: "¥1,100",
    lng: 114.236,
    lat: 27.453,
    image: "mountain",
    tagline: "高山草甸 · 徒步露营",
    highlights: ["金顶", "吊马桩", "发云界"]
  },
  {
    id: "zhangjiajie",
    name: "张家界",
    region: "湖南",
    themes: ["登山", "国内", "摄影"],
    priceFrom: "¥1,800",
    lng: 110.479,
    lat: 29.117,
    image: "mountain",
    tagline: "奇峰林立 · 玻璃栈道",
    highlights: ["天门山", "国家森林公园", "袁家界"]
  },
  {
    id: "emeishan",
    name: "峨眉山",
    region: "四川",
    themes: ["登山", "雪山", "国内", "文化"],
    priceFrom: "¥1,600",
    lng: 103.484,
    lat: 29.601,
    image: "mountain",
    tagline: "金顶云海 · 徒步朝圣",
    highlights: ["金顶", "万年寺", "清音阁"]
  },
  {
    id: "lushan",
    name: "庐山",
    region: "江西",
    themes: ["登山", "国内", "度假", "慢生活"],
    priceFrom: "¥1,300",
    lng: 115.992,
    lat: 29.555,
    image: "mountain",
    tagline: "牯岭镇 · 避暑徒步",
    highlights: ["三叠泉", "含鄱口", "美庐别墅"]
  }
];

const INSPIRATION_DESTINATION_SPOTS = {
  "qiandao-lake": [
    {
      id: "qd-meifeng",
      name: "梅峰观岛",
      region: "千岛湖",
      priceFrom: "¥120",
      lng: 119.013,
      lat: 29.593,
      image: "mountain",
      tagline: "登高俯瞰千岛全景",
      highlights: ["缆车", "观景台"],
      parentDestination: "千岛湖"
    },
    {
      id: "qd-tianyu",
      name: "天屿山",
      region: "千岛湖",
      priceFrom: "免费",
      lng: 119.062,
      lat: 29.608,
      image: "mountain",
      tagline: "日落与湖湾全景",
      highlights: ["日落", "观景平台"],
      parentDestination: "千岛湖"
    },
    {
      id: "qd-qinchuan",
      name: "芹川古村",
      region: "千岛湖",
      priceFrom: "¥50",
      lng: 118.638,
      lat: 29.521,
      image: "laneway",
      tagline: "徽派水乡古村",
      highlights: ["古村", "摄影"],
      parentDestination: "千岛湖"
    },
    {
      id: "qd-center",
      name: "中心湖区",
      region: "千岛湖",
      priceFrom: "¥195",
      lng: 119.042,
      lat: 29.558,
      image: "coast",
      tagline: "游船登岛经典线",
      highlights: ["游船", "登岛"],
      parentDestination: "千岛湖"
    },
    {
      id: "qd-qilong",
      name: "骑龙巷",
      region: "千岛湖",
      priceFrom: "¥80",
      lng: 119.044,
      lat: 29.609,
      image: "harbor",
      tagline: "鱼头美食街",
      highlights: ["千岛湖鱼头", "夜市"],
      parentDestination: "千岛湖"
    },
    {
      id: "qd-southeast",
      name: "东南湖区",
      region: "千岛湖",
      priceFrom: "¥165",
      lng: 119.128,
      lat: 29.512,
      image: "reef",
      tagline: "桂花岛 · 天池岛",
      highlights: ["桂花岛", "天池岛"],
      parentDestination: "千岛湖"
    }
  ]
};

const insightSeed = [
  {
    icon: "↗",
    title: "先锁定关键交通",
    detail: "跨城市移动、热门日期和早晚班次最容易影响整体动线。",
    action: "查看交通"
  },
  {
    icon: "⌂",
    title: "住宿优先看动线",
    detail: "第一次到访建议住在交通枢纽或核心街区，减少来回折返。",
    action: "查看酒店"
  },
  {
    icon: "−",
    title: "保留弹性时间",
    detail: "每天至少留一段可替换空间，天气、排队和体力都会影响体验。",
    action: "优化节奏"
  }
];

const PLAN_CATEGORIES = ["景点", "美食", "交通", "住宿", "体验", "购物", "其他"];
const DEFAULT_COLLAPSED_CANVAS_GUIDE_BLOCKS = ["hotels", "spots", "restaurants", "transport", "checklist"];

const state = {
  view: "ultimate",
  density: 5,
  workspaceEntering: false,
  collapsed: new Set(),
  activeCanvasDay: null,
  dayEdits: {},
  bookings: {
    flights: {},
    hotels: {},
    tickets: {},
    trains: {}
  },
  hotelSearches: {},
  bookingSearches: {},
  mapRoutes: {
    signature: "",
    loading: false,
    routesLoading: false,
    items: [],
    map: null,
    error: ""
  },
  mapPlanner: {
    currentDay: "ALL",
    hasManualDaySelection: false,
    isEditing: false,
    activePoiId: null,
    draggingPoiId: null
  },
  canvasPlanner: {
    draggingItem: null,
    draggingDayId: null,
    draggingFreeActivity: null,
    dayOrder: null,
    lastDayOrder: null,
    orderAlert: null,
    orderValidating: false,
    dayDrag: null
  },
  canvasGuide: {
    collapsed: new Set(DEFAULT_COLLAPSED_CANVAS_GUIDE_BLOCKS)
  },
  calendar: {
    monthOffset: 0,
    selectedDate: "",
    tripStartDate: "",
    mapExpanded: false
  },
  selection: null,
  activeBooking: null,
  tripQueryEdit: null,
  planForm: null,
  freePoiForm: null,
  freePoiDetail: null,
  freeInspiration: {
    category: "全部",
    activeId: null
  },
  ultimateTab: "all",
  ultimateActiveDay: null,
  ultimateExpandedDays: new Set(),
  ultimateDayTab: "itinerary",
  ultimateMapExpanded: false,
  workspaceZoom: {
    free: 1,
    canvas: 1,
    ultimate: 1
  },
  tripGuide: null,
  route: [],
  notes: [],
  chat: [
    {
      role: "assistant",
      text: "我是你的旅行助手，快来制定行程吧。"
    }
  ],
  isChatLoading: false,
  inspiration: {
    query: "",
    anchor: "",
    picks: [],
    activePickId: null,
    exploring: false,
    recommendedDestinations: []
  },
  travelImages: {
    cache: {},
    loading: false
  }
};

let amapLoaderPromise = null;
let amapMapInstance = null;
let amapInitToken = 0;
let amapLastViewState = null;
let amapLastRouteSignature = "";
let inspirationMapInstance = null;
let inspirationMapMarkersByPickId = new Map();
let inspirationMapPickSignature = "";
let inspirationCardObserver = null;
let amapRoutesFetchPromise = null;
let requestHomeRender = null;
const travelImagePendingKeys = new Set();
const travelImageLoadCache = new Map();

export function renderHomeScreen(root) {
  const render = (options = {}) => {
    const viewPanelScrollTop = root.querySelector(".view-panel")?.scrollTop || 0;
    const viewPanelScrollLeft = root.querySelector(".view-panel")?.scrollLeft || 0;
    const isHomeLanding = !hasEnteredTripWorkspace() && !isInspirationTrip();
    const shouldShowPlanningLoading = state.isChatLoading && !state.route.length && !isInspirationTrip();
    root.innerHTML = `
      <section class="app-shell ${isHomeLanding ? "app-shell--landing" : ""}">
        ${renderTopbar()}
        ${isHomeLanding
          ? renderHomeLanding()
          : shouldShowPlanningLoading
            ? `
              <div class="workspace ${state.workspaceEntering ? "workspace--entering" : ""}">
                ${renderChatPanel()}
                <section class="editor-pane">
                  ${renderPlanningLoadingView()}
                </section>
              </div>
            `
          : state.view === "ultimate"
            ? renderUltimateView()
          : state.view === "calendar"
            ? renderCalendarWorkspaceView()
          : state.view === "free2"
            ? renderFreeCanvasWorkspaceView()
          : `
            <div class="workspace ${state.workspaceEntering ? "workspace--entering" : ""} ${state.activeBooking ? "workspace--booking-open" : ""}">
              ${renderChatPanel()}
              <section class="editor-pane">
                ${isInspirationTrip() ? renderEditorHeader() : ""}
                ${state.isChatLoading && !state.route.length && !isInspirationTrip()
                  ? renderPlanningLoadingView()
                  : renderActiveView()}
              </section>
              ${state.activeBooking ? renderBookingRail() : ""}
            </div>
          `}
        <div class="toast" role="status" aria-live="polite"></div>
        ${renderPlanFormModal()}
        ${renderFreePoiModal()}
        ${renderFreePoiDetail()}
        ${renderFreeInspirationDetail()}
        ${renderSelectionToolbar()}
      </section>
    `;
    const viewPanel = root.querySelector(".view-panel");
    if (viewPanel) {
      viewPanel.scrollTop = viewPanelScrollTop;
      viewPanel.scrollLeft = viewPanelScrollLeft;
    }
    if (state.selection?.text) {
      queueMicrotask(() => root.querySelector(".selection-comment-input")?.focus({ preventScroll: true }));
    }
    if (state.freePoiForm) {
      queueMicrotask(() => root.querySelector(".free-poi-search-input")?.focus({ preventScroll: true }));
    }
    if (state.tripQueryEdit) {
      queueMicrotask(() => {
        const input = root.querySelector(".trip-query-summary__input");
        input?.focus({ preventScroll: true });
        input?.select?.();
      });
    }
    scheduleAmapMapRefresh(options);
    scheduleInspirationMapRefresh();
    if (isInspirationTrip()) {
      syncInspirationPicks();
    }
    hydrateTravelImages(root);
    setupInspirationCardScrollSync(root);
  };
  requestHomeRender = render;

  root.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;

    const action = target.dataset.action;

    if (action === "set-view") {
      state.view = target.dataset.view === "map" ? "canvas" : target.dataset.view;
      state.activeCanvasDay = null;
      render();
      if (["doc", "canvas", "free2", "ultimate"].includes(state.view)) prefetchTripMapAssets(render);
      return;
    }

    if (action === "set-ultimate-tab") {
      const tab = target.dataset.tab;
      state.ultimateTab = tab;
      if (tab === "all") {
        state.ultimateActiveDay = null;
        state.ultimateExpandedDays = new Set();
      } else {
        const dayNum = parseInt(tab.replace("day", ""));
        const days = getPlanDays();
        const selectedDay = days.find((d) => d.day === dayNum);
        if (selectedDay) {
          state.ultimateActiveDay = selectedDay.id;
          state.ultimateExpandedDays.add(selectedDay.id);
        }
      }
      render();
      return;
    }

    if (action === "toggle-ultimate-map") {
      state.ultimateMapExpanded = !state.ultimateMapExpanded;
      render();
      return;
    }

    if (action === "toggle-calendar-map") {
      state.calendar.mapExpanded = !state.calendar.mapExpanded;
      render();
      return;
    }

    if (action === "set-ultimate-day-tab") {
      state.ultimateDayTab = target.dataset.tab;
      render();
      return;
    }

    if (action === "ultimate-select-day") {
      const dayId = target.dataset.day;
      state.ultimateActiveDay = dayId;
      state.ultimateExpandedDays.add(dayId);
      const days = getPlanDays();
      const selectedDay = days.find((d) => d.id === dayId);
      if (selectedDay) {
        state.ultimateTab = "day" + selectedDay.day;
      }
      render();
      return;
    }

    if (action === "ultimate-collapse-day") {
      const dayId = target.dataset.day;
      state.ultimateExpandedDays.delete(dayId);
      if (state.ultimateActiveDay === dayId) {
        const days = getPlanDays();
        const nextExpandedDay = days.find((day) => state.ultimateExpandedDays.has(day.id));
        state.ultimateActiveDay = nextExpandedDay?.id || null;
        state.ultimateTab = nextExpandedDay ? "day" + nextExpandedDay.day : "all";
      }
      render();
      return;
    }

    if (action === "ultimate-close-rail") {
      render();
      return;
    }

    if (action === "edit-trip-query" || action === "edit-trip-condition") {
      openTripQueryEdit(target.dataset.key);
      render();
      return;
    }

    if (action === "cancel-trip-query-edit") {
      state.tripQueryEdit = null;
      render();
      return;
    }

    if (action === "submit-trip-query-edit") {
      void submitTripQueryEdit(render);
      return;
    }

    if (action === "ultimate-collapse-chat") {
      render();
      return;
    }

    if (action === "ultimate-optimize-day") {
      const input = root.querySelector(".ultimate-chat .chat-input, .chat-input");
      if (input) { input.value = "请优化当天的行程安排，给出更合理的建议。"; }
      const sendBtn = root.querySelector('[data-action="send-chat"]');
      if (sendBtn) sendBtn.click();
      return;
    }

    if (action === "ultimate-view-route") {
      state.ultimateMapExpanded = true;
      render();
      return;
    }

    if (action === "ultimate-add-stop" || action === "ultimate-reorder-day") {
      showToast("可以通过左侧 AI 助理继续补充或调整行程");
      return;
    }

    if (action === "ultimate-save") {
      showToast("已保存当前终极视图方案");
      return;
    }

    if (action === "ultimate-todo" || action === "ultimate-timeline" || action === "ultimate-share" || action === "ultimate-export") {
      showToast("功能开发中，敬请期待");
      return;
    }

    if (action === "ultimate-refresh-suggestions" || action === "ultimate-replace-suggestion") {
      showToast("AI 正在生成新建议...");
      return;
    }


    if (action === "workspace-zoom-out") {
      changeWorkspaceZoom(target.dataset.view, -0.1, render, target);
      return;
    }

    if (action === "workspace-zoom-in") {
      changeWorkspaceZoom(target.dataset.view, 0.1, render, target);
      return;
    }

    if (action === "workspace-zoom-reset") {
      setWorkspaceZoom(target.dataset.view, 1, render, target);
      return;
    }

    if (action === "workspace-zoom-overview") {
      setWorkspaceZoom(target.dataset.view, 0.6, render, target);
      return;
    }

    if (action === "calendar-prev-month") {
      state.calendar.monthOffset -= 1;
      state.calendar.selectedDate = "";
      renderPreservingMap();
      return;
    }

    if (action === "calendar-next-month") {
      state.calendar.monthOffset += 1;
      state.calendar.selectedDate = "";
      renderPreservingMap();
      return;
    }

    if (action === "calendar-today") {
      state.calendar.monthOffset = 0;
      state.calendar.selectedDate = "";
      renderPreservingMap();
      return;
    }

    if (action === "calendar-select-day") {
      state.calendar.selectedDate = target.dataset.date || "";
      renderPreservingMap();
      return;
    }

    if (action === "calendar-close-detail") {
      state.calendar.selectedDate = "";
      renderPreservingMap();
      return;
    }

    if (action === "calendar-open-day") {
      state.activeCanvasDay = target.dataset.day || null;
      state.view = "canvas";
      render();
      return;
    }

    if (action === "select-inspiration-pick") {
      const pick = state.inspiration.picks.find((item) => item.id === target.dataset.pick);
      if (!pick || !isLikelyModelDestinationName(pick.name)) return;
      state.inspiration.anchor = pick.parentDestination || pick.name;
      state.inspiration.exploring = true;
      state.inspiration.activePickId = pick.id;
      void sendChatMessage(buildInspirationPickQuery(pick), render);
      queueMicrotask(() => fitInspirationMapOverview());
      return;
    }

    if (action === "focus-inspiration-pick") {
      const fromMap = Boolean(target.closest(".inspiration-map-pill"));
      setInspirationActivePick(target.dataset.pick || null, { scrollCard: fromMap });
      return;
    }

    if (action === "set-map-day") {
      updateMapDayFilter(normalizeMapPlannerDay(target.dataset.day));
      return;
    }

    if (action === "toggle-map-edit") {
      state.mapPlanner.isEditing = !state.mapPlanner.isEditing;
      if (state.mapPlanner.isEditing && state.mapPlanner.currentDay === "ALL") {
        state.mapPlanner.currentDay = getPlanDays()[0]?.day || 1;
      }
      state.mapPlanner.activePoiId = null;
      render();
      return;
    }

    if (action === "select-map-poi") {
      updateMapPoiSelection(target.dataset.poi || null);
      render();
      return;
    }

    if (action === "close-map-poi") {
      updateMapPoiSelection(null);
      render();
      return;
    }

    if (action === "open-day") {
      state.activeCanvasDay = target.dataset.day;
      render();
      return;
    }

    if (action === "toggle-guide-block") {
      toggleSetValue(state.canvasGuide.collapsed, target.dataset.block);
      render();
      return;
    }

    if (action === "add-guide-row") {
      addGuideRow(target.dataset.section);
      render();
      return;
    }

    if (action === "remove-guide-row") {
      removeGuideRow(target.dataset.section, Number(target.dataset.index));
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

    if (action === "free-add-activity") {
      openFreePoiForm(target.dataset.day, target);
      render();
      return;
    }

    if (action === "free-add-day") {
      addFreeCanvasDay();
      render();
      queueMicrotask(() => showToast("已新增一天", "success"));
      return;
    }

    if (action === "close-free-poi-form") {
      state.freePoiForm = null;
      render();
      return;
    }

    if (action === "submit-free-poi-form") {
      submitFreePoiForm();
      render();
      return;
    }

    if (action === "free-remove-activity") {
      removeFreeCanvasActivity(target.dataset.day, Number(target.dataset.index));
      render();
      return;
    }

    if (action === "open-free-poi-detail") {
      state.freePoiDetail = {
        dayId: target.dataset.day,
        index: Number(target.dataset.index)
      };
      state.freeInspiration.activeId = null;
      render();
      return;
    }

    if (action === "close-free-poi-detail") {
      state.freePoiDetail = null;
      render();
      return;
    }

    if (action === "open-free-poi-day") {
      state.activeCanvasDay = target.dataset.day || null;
      state.freePoiDetail = null;
      state.view = "canvas";
      render();
      return;
    }

    if (action === "free-add-recommendation") {
      addFreeRecommendationToDay(target.dataset.day, Number(target.dataset.recIndex));
      state.freeInspiration.activeId = null;
      render();
      return;
    }

    if (action === "set-free-inspiration-category") {
      state.freeInspiration.category = target.dataset.category || "全部";
      render();
      return;
    }

    if (action === "open-free-inspiration-detail") {
      state.freeInspiration.activeId = target.dataset.recId || null;
      render();
      return;
    }

    if (action === "close-free-inspiration-detail") {
      state.freeInspiration.activeId = null;
      render();
      return;
    }

    if (action === "remove-attraction") {
      removeAttractionFromDay(target.dataset.day, target.dataset.name);
      render();
      return;
    }

    if (action === "open-booking") {
      openBooking(target.dataset.kind, target.dataset.city, {
        dayId: target.dataset.day,
        query: target.dataset.query,
        activityIndex: target.dataset.index === "" ? null : Number(target.dataset.index)
      });
      state.freePoiDetail = null;
      render();
      fetchFlyAiOptions(state.activeBooking, render);
      return;
    }

    if (action === "close-booking") {
      state.activeBooking = null;
      render();
      return;
    }

    if (action === "book-service") {
      bookService(target.dataset.kind, target.dataset.city);
      render();
      return;
    }

    if (action === "open-flyai-booking") {
      openFlyAiBooking(Number(target.dataset.option));
      return;
    }

    if (action === "apply-booking-option") {
      const appliedBooking = applyBookingOption(Number(target.dataset.option));
      render();
      if (appliedBooking) {
        showToast(`${getBookingLabel(appliedBooking.kind)}已更新到 Day ${appliedBooking.day}`);
        prefetchTripMapAssets(render);
      }
      return;
    }

    if (action === "add-hotel-to-roadbook") {
      addHotelToRoadbook(target.dataset.city, target.dataset.hotel);
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

    if (action === "undo-day-order") {
      undoCanvasDayOrder();
      render();
      return;
    }

    if (action === "dismiss-order-alert") {
      state.canvasPlanner.orderAlert = null;
      render();
      return;
    }

    if (action === "open-plan-form") {
      openPlanForm(target.dataset.day);
      render();
      return;
    }

    if (action === "close-plan-form") {
      if (!state.planForm?.submitting) {
        state.planForm = null;
        render();
      }
      return;
    }

    if (action === "submit-plan-form") {
      void submitPlanForm(render);
      return;
    }

    if (action === "clear-selection") {
      state.selection = null;
      render();
      return;
    }

    if (action === "submit-selection-instruction") {
      void submitSelectionInstruction(root.querySelector(".selection-comment-input")?.value || "", render);
      return;
    }

    if (action === "remove-note") {
      state.notes = state.notes.filter((note) => note.id !== target.dataset.note);
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
      const input = root.querySelector(".chat-input, .ult-chat-input");
      void sendChatMessage(input?.value || "", render);
      return;
    }

    if (action === "send-suggestion") {
      void sendChatMessage(target.dataset.prompt, render);
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

    if (target.matches("[data-plan-field]") && state.planForm) {
      state.planForm[target.dataset.planField] = target.value;
      return;
    }

    if (target.matches("[data-free-poi-field]") && state.freePoiForm) {
      state.freePoiForm[target.dataset.freePoiField] = target.value;
      return;
    }

    if (target.matches("[data-trip-query-field]") && state.tripQueryEdit) {
      state.tripQueryEdit.value = target.value;
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
      return;
    }

    if (target.matches("[data-guide-field]")) {
      updateGuideFromInput(target);
      return;
    }

    const docField = target.closest("[data-doc-field]");
    if (docField) {
      updateDocumentFromInput(docField);
      return;
    }

  };

  root.addEventListener("input", handleFormChange);
  root.addEventListener("change", handleFormChange);
  root.addEventListener(
    "blur",
    (event) => {
      const docField = event.target.closest?.("[data-doc-field]");
      if (docField?.isContentEditable) updateDocumentFromInput(docField);
    },
    true
  );

  root.addEventListener("mouseup", (event) => {
    if (event.target.closest(".selection-toolbar")) return;
    if (event.target.closest(".amap-real-map, .map-stage, .canvas-map-preview, .custom-map-canvas")) return;

    const inDocumentView = event.target.closest(".document-view");
    const selection = getWorkspaceSelection(root);

    if (inDocumentView) {
      const nextText = selection?.text || "";
      const prevText = state.selection?.text || "";
      if (nextText !== prevText) {
        state.selection = selection || null;
        render();
      }
      return;
    }

    const nextSelection = selection && !event.target.closest("input, textarea, select, [contenteditable='true']")
      ? selection
      : null;
    const nextText = nextSelection?.text || "";
    const prevText = state.selection?.text || "";
    if (nextText !== prevText) {
      state.selection = nextSelection;
      render();
    }
  });

  root.addEventListener("keyup", (event) => {
    if (event.target.closest(".document-view")) {
      const selection = getWorkspaceSelection(root);
      if (JSON.stringify(selection) !== JSON.stringify(state.selection)) {
        state.selection = selection;
        render();
      }
      return;
    }

    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Shift", "Meta", "Control"].includes(event.key)) return;
    const selection = getWorkspaceSelection(root);
    if (selection) {
      state.selection = selection;
      render();
    }
  });

  root.addEventListener("dragstart", (event) => {
    const canvasItem = event.target.closest("[data-canvas-item]");
    if (canvasItem) {
      const payload = {
        dayId: canvasItem.dataset.day,
        index: Number(canvasItem.dataset.index)
      };
      state.canvasPlanner.draggingItem = payload;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("application/x-canvas-activity", JSON.stringify(payload));
      canvasItem.classList.add("is-dragging");
      return;
    }

    const freeActivity = event.target.closest("[data-free-activity]");
    if (freeActivity) {
      const payload = {
        dayId: freeActivity.dataset.day,
        index: Number(freeActivity.dataset.index)
      };
      state.canvasPlanner.draggingFreeActivity = payload;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("application/x-free-activity", JSON.stringify(payload));
      freeActivity.classList.add("is-dragging");
      return;
    }

    const dayCard = event.target.closest("[data-day-order-card]");
    if (dayCard) {
      clearCanvasDayDrag(root);
      const dayId = dayCard.dataset.dayOrderCard;
      state.canvasPlanner.draggingDayId = dayId;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("application/x-day-order", dayId);
      dayCard.classList.add("is-day-dragging");
      return;
    }

    const freeRecommendation = event.target.closest("[data-free-rec]");
    if (freeRecommendation) {
      const payload = { index: Number(freeRecommendation.dataset.freeRec) };
      event.dataTransfer.effectAllowed = "copy";
      event.dataTransfer.setData("application/x-free-recommendation", JSON.stringify(payload));
      freeRecommendation.classList.add("is-dragging");
      return;
    }

    const target = event.target.closest("[data-map-poi]");
    if (!target || !state.mapPlanner.isEditing) return;
    state.mapPlanner.draggingPoiId = target.dataset.mapPoi;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", target.dataset.mapPoi);
    target.classList.add("is-dragging");
  });

  root.addEventListener("dragend", (event) => {
    event.target.closest("[data-canvas-item]")?.classList.remove("is-dragging");
    const draggedDayCard = event.target.closest("[data-day-order-card]");
    draggedDayCard?.classList.remove("is-day-dragging");
    if (draggedDayCard) clearCanvasDayDrag(root);
    event.target.closest("[data-free-rec]")?.classList.remove("is-dragging");
    state.canvasPlanner.draggingItem = null;
    state.canvasPlanner.draggingDayId = null;
    state.canvasPlanner.draggingFreeActivity = null;
    event.target.closest("[data-free-activity]")?.classList.remove("is-dragging");
    root.querySelectorAll("[data-day-order-drop].is-drop-target").forEach((element) => {
      element.classList.remove("is-drop-target");
    });
    root.querySelectorAll("[data-free-activity-drop].is-poi-drop-target").forEach((element) => {
      element.classList.remove("is-poi-drop-target");
    });
    event.target.closest("[data-map-poi]")?.classList.remove("is-dragging");
    state.mapPlanner.draggingPoiId = null;
  });

  bindCanvasDayLongPress(root, render);

  root.addEventListener("dragover", (event) => {
    const dayOrderDrop = event.target.closest("[data-day-order-drop]");
    if (dayOrderDrop && state.canvasPlanner.draggingDayId) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      root.querySelectorAll("[data-day-order-drop].is-drop-target").forEach((element) => {
        element.classList.toggle(
          "is-drop-target",
          element === dayOrderDrop && element.dataset.dayOrderDrop !== state.canvasPlanner.draggingDayId
        );
      });
      return;
    }

    const freeActivityDrop = event.target.closest("[data-free-activity-drop]");
    if (freeActivityDrop && state.canvasPlanner.draggingFreeActivity) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      root.querySelectorAll("[data-free-activity-drop].is-poi-drop-target").forEach((element) => {
        const isSource = element.dataset.day === state.canvasPlanner.draggingFreeActivity.dayId
          && Number(element.dataset.index) === state.canvasPlanner.draggingFreeActivity.index;
        element.classList.toggle("is-poi-drop-target", element === freeActivityDrop && !isSource);
      });
      return;
    }

    const canvasDrop = event.target.closest("[data-canvas-drop-day]");
    if (canvasDrop) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      return;
    }

    const freeDrop = event.target.closest("[data-free-drop-day]");
    if (freeDrop) {
      event.preventDefault();
      event.dataTransfer.dropEffect = state.canvasPlanner.draggingFreeActivity ? "move" : "copy";
      return;
    }

    if (!event.target.closest("[data-map-poi-drop]") || !state.mapPlanner.isEditing) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  });

  root.addEventListener("drop", (event) => {
    const dayOrderDrop = event.target.closest("[data-day-order-drop]");
    const sourceDayId = event.dataTransfer.getData("application/x-day-order") || state.canvasPlanner.draggingDayId;
    if (dayOrderDrop && sourceDayId) {
      event.preventDefault();
      state.canvasPlanner.draggingDayId = null;
      root.querySelectorAll("[data-day-order-drop].is-drop-target").forEach((element) => {
        element.classList.remove("is-drop-target");
      });
      if (reorderCanvasDay(sourceDayId, dayOrderDrop.dataset.dayOrderDrop)) {
        void validateDayOrderAfterMove(render);
      }
      return;
    }

    const freeActivityDrop = event.target.closest("[data-free-activity-drop]");
    const freeActivitySource = parseJsonOrNull(event.dataTransfer.getData("application/x-free-activity"))
      || state.canvasPlanner.draggingFreeActivity;
    if (freeActivityDrop && freeActivitySource) {
      event.preventDefault();
      state.canvasPlanner.draggingFreeActivity = null;
      if (moveFreeActivity(
        freeActivitySource.dayId,
        Number(freeActivitySource.index),
        freeActivityDrop.dataset.day,
        Number(freeActivityDrop.dataset.index)
      )) render();
      return;
    }

    const canvasDrop = event.target.closest("[data-canvas-drop-day]");
    if (canvasDrop) {
      event.preventDefault();
      const raw = event.dataTransfer.getData("application/x-canvas-activity");
      const source = parseJsonOrNull(raw) || state.canvasPlanner.draggingItem;
      if (source && moveCanvasActivity(source.dayId, Number(source.index), canvasDrop.dataset.canvasDropDay)) {
        render();
      }
      return;
    }

    const freeDrop = event.target.closest("[data-free-drop-day]");
    if (freeDrop) {
      event.preventDefault();
      if (freeActivitySource) {
        state.canvasPlanner.draggingFreeActivity = null;
        if (moveFreeActivity(
          freeActivitySource.dayId,
          Number(freeActivitySource.index),
          freeDrop.dataset.freeDropDay
        )) render();
        return;
      }
      const source = parseJsonOrNull(event.dataTransfer.getData("application/x-free-recommendation"));
      if (source) {
        addFreeRecommendationToDay(freeDrop.dataset.freeDropDay, Number(source.index));
        render();
      }
      return;
    }

    const target = event.target.closest("[data-map-poi-drop]");
    if (!target || !state.mapPlanner.isEditing) return;
    event.preventDefault();
    const sourcePoiId = event.dataTransfer.getData("text/plain") || state.mapPlanner.draggingPoiId;
    const targetPoiId = target.dataset.mapPoiDrop;
    if (sourcePoiId && targetPoiId) {
      const reorderedPoiId = reorderMapPoi(sourcePoiId, targetPoiId);
      if (!reorderedPoiId) return;
      state.mapPlanner.activePoiId = reorderedPoiId;
      render();
    }
  });

  root.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && ["+", "=", "-", "0"].includes(event.key) && ["free", "canvas"].includes(state.view)) {
      event.preventDefault();
      if (event.key === "0") setWorkspaceZoom(state.view, 1, render);
      else changeWorkspaceZoom(state.view, event.key === "-" ? -0.1 : 0.1, render);
      return;
    }

    if (event.key === "Escape" && state.freePoiDetail) {
      state.freePoiDetail = null;
      render();
      return;
    }

    if (event.key === "Escape" && state.freeInspiration.activeId) {
      state.freeInspiration.activeId = null;
      render();
      return;
    }

    if (event.key === "Escape" && state.planForm && !state.planForm.submitting) {
      state.planForm = null;
      render();
      return;
    }

    if (event.key === "Escape" && state.tripQueryEdit) {
      state.tripQueryEdit = null;
      render();
      return;
    }

    if (event.key === "Escape" && state.calendar.selectedDate) {
      state.calendar.selectedDate = "";
      renderPreservingMap();
      return;
    }

    if (event.key === "Enter" && event.target.matches(".trip-query-summary__input")) {
      event.preventDefault();
      void submitTripQueryEdit(render);
      return;
    }

    if (event.key === "Enter" && event.target.matches(".chat-input")) {
      event.preventDefault();
      void sendChatMessage(event.target.value, render);
    }

    if (event.key === "Enter" && event.target.matches(".selection-comment-input")) {
      event.preventDefault();
      void submitSelectionInstruction(event.target.value, render);
    }

    if (event.key === "Enter" && event.target.matches(".free-poi-search-input")) {
      event.preventDefault();
      submitFreePoiForm();
      render();
    }

    if ((event.key === "Enter" || event.key === " ") && event.target.matches(".free-rec-card")) {
      event.preventDefault();
      state.freeInspiration.activeId = event.target.dataset.recId || null;
      render();
    }

    if ((event.key === "Enter" || event.key === " ") && event.target.matches(".free-activity-card")) {
      event.preventDefault();
      state.freePoiDetail = {
        dayId: event.target.dataset.day,
        index: Number(event.target.dataset.index)
      };
      render();
    }

  });

  root.addEventListener("wheel", (event) => {
    if (!(event.ctrlKey || event.metaKey)) return;
    if (event.target.closest(".map-stage")) {
      event.preventDefault();
      return;
    }
    const panel = event.target.closest("[data-zoom-workspace]");
    if (!panel) return;
    event.preventDefault();
    const view = panel.dataset.zoomWorkspace;
    changeWorkspaceZoom(view, event.deltaY > 0 ? -0.1 : 0.1, render, event);
  }, { passive: false });

  render();
  prefetchTripMapAssets(render);
}

function prefetchTripMapAssets(render) {
  if (!state.route.length || isInspirationTrip()) return;
  void loadAmapSdk().catch(() => {});
  void fetchAmapRoutes(typeof render === "function" ? render : requestHomeRender);
}

function renderTopbar() {
  const showWorkspaceSummary = hasEnteredTripWorkspace() && !isHomeQueryEmpty();
  return `
    <header class="topbar">
      <div>
        <h1>Trip Planner</h1>
      </div>
      ${showWorkspaceSummary ? renderTripQuerySummary() : ""}
      ${hasEnteredTripWorkspace() && !isInspirationTrip() ? renderViewTabs() : ""}
    </header>
  `;
}

function hasEnteredTripWorkspace() {
  return state.route.length > 0 || state.chat.some((message) => message.role === "user");
}

function isHomeQueryEmpty() {
  return !state.route.length && !getLatestUserChatText() && !state.inspiration.query;
}

function renderTripQuerySummary() {
  const items = getTripQuerySummaryItems();
  if (!items.length) return "";

  return `
    <div class="trip-query-summary" aria-label="查询摘要">
      ${items.map((item) => renderTripQuerySummaryItem(item)).join("")}
    </div>
  `;
}

function renderTripQuerySummaryItem(item) {
  if (state.tripQueryEdit?.key === item.key) {
    return `
      <form class="trip-query-summary__edit" data-trip-query-key="${escapeAttr(item.key)}">
        <input
          class="trip-query-summary__input"
          type="text"
          value="${escapeAttr(state.tripQueryEdit.value)}"
          placeholder="${escapeAttr(item.placeholder)}"
          data-trip-query-field="value"
          aria-label="修改${escapeAttr(item.name)}"
        />
        <button class="trip-query-summary__icon" type="button" data-action="submit-trip-query-edit" aria-label="确认修改">✓</button>
        <button class="trip-query-summary__icon" type="button" data-action="cancel-trip-query-edit" aria-label="取消修改">×</button>
      </form>
    `;
  }

  return `
    <button
      class="trip-query-summary__item ${item.isPlaceholder ? "is-placeholder" : ""}"
      type="button"
      data-action="edit-trip-query"
      data-key="${escapeAttr(item.key)}"
      title="修改${escapeAttr(item.name)}"
    >
      ${escapeHtml(item.label)}
    </button>
  `;
}

function getTripQuerySummaryItems() {
  const query = [getLatestUserChatText(), state.inspiration.query].filter(Boolean).join(" ");
  const days = getPlanDays();
  const destinations = state.route.length
    ? resolveTripDestinationNames(days, state.tripGuide).filter((name) => !isPlaceholderDestination(name))
    : [];
  const destination = destinations.length
    ? destinations.join(" · ")
    : inferPrimaryDestinationFromText(query) || getInspirationAnchor() || "目的地";
  const tripDays = getTotalDays() || parseTripDaysFromText(query);
  const month = parseTripMonthFromText(query);
  const dateLabel = tripDays
    ? `${tripDays}天${month ? ` · ${month}` : ""}`
    : month || "日期";
  const people = parseTripPeopleFromText(query);
  const budget = parseTripBudgetFromText(query) || (state.route.length ? getBudgetTotal() : "");
  const preferences = parseTripPreferencesFromText(query);

  return [
    { key: "destination", name: "目的地", label: destination, value: destination === "目的地" ? "" : destination, placeholder: "例如：长沙", isPlaceholder: destination === "目的地" },
    { key: "date", name: "日期", label: dateLabel, value: dateLabel === "日期" ? "" : dateLabel, placeholder: "例如：6月 3天", isPlaceholder: dateLabel === "日期" },
    { key: "people", name: "人数", label: people || "人数", value: people || "", placeholder: "例如：2人出行", isPlaceholder: !people },
    { key: "budget", name: "预算", label: budget || "预算", value: budget || "", placeholder: "例如：预算 ¥8000", isPlaceholder: !budget },
    { key: "preferences", name: "偏好", label: preferences || "偏好", value: preferences || "", placeholder: "例如：轻松、美食、亲子", isPlaceholder: !preferences }
  ];
}

function openTripQueryEdit(key) {
  const item = getTripQuerySummaryItems().find((entry) => entry.key === key);
  if (!item) return;
  state.tripQueryEdit = {
    key: item.key,
    name: item.name,
    value: item.value || "",
    placeholder: item.placeholder
  };
}

async function submitTripQueryEdit(render) {
  const edit = state.tripQueryEdit;
  const value = String(edit?.value || "").trim();
  if (!edit || !value || state.isChatLoading) return;
  state.tripQueryEdit = null;
  await sendChatMessage(buildTripQueryEditPrompt(edit.key, value), render);
}

function buildTripQueryEditPrompt(key, value) {
  const labels = {
    destination: "目的地",
    date: "出行日期/天数",
    people: "出行人数",
    budget: "预算",
    preferences: "旅行偏好"
  };
  const label = labels[key] || "行程条件";
  return `请把当前行程的${label}修改为「${value}」，保留其他已经确定的行程条件，并同步更新路线、每日安排、住宿/交通/预订建议和预算摘要。`;
}

function parseChineseCount(value) {
  const text = String(value || "").trim();
  const map = { 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9, 十: 10 };
  if (/^\d+$/.test(text)) return Number(text);
  if (map[text]) return map[text];
  if (/^十[一二两三四五六七八九]$/.test(text)) return 10 + map[text.slice(1)];
  if (/^[一二两三四五六七八九]十$/.test(text)) return map[text[0]] * 10;
  if (/^[一二两三四五六七八九]十[一二两三四五六七八九]$/.test(text)) return map[text[0]] * 10 + map[text[2]];
  return 0;
}

function parseTripDaysFromText(text) {
  const source = String(text || "");
  const numeric = source.match(/(\d{1,2})\s*(?:天|日|晚|days?)/i);
  if (numeric) return Number(numeric[1]);
  const chinese = source.match(/([一二两三四五六七八九十]{1,3})\s*(?:天|日|晚)/);
  return chinese ? parseChineseCount(chinese[1]) : 0;
}

function parseTripMonthFromText(text) {
  const source = String(text || "");
  const numeric = source.match(/(\d{1,2})\s*月/);
  if (numeric) return `${Number(numeric[1])}月`;
  const english = source.match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\b/i);
  return english ? english[0].slice(0, 3) : "";
}

function parseTripPeopleFromText(text) {
  const source = String(text || "");
  const numeric = source.match(/(\d{1,2})\s*(?:人|位|个人|成人|大人)/);
  if (numeric) return `${Number(numeric[1])}人`;
  const chinese = source.match(/([一二两三四五六七八九十]{1,3})\s*(?:人|位|个人|成人|大人)/);
  if (chinese) {
    const count = parseChineseCount(chinese[1]);
    if (count) return `${count}人`;
  }
  if (/一家三口|三口之家/.test(source)) return "3人";
  if (/情侣|夫妻|两人|二人|2人|双人/.test(source)) return "2人";
  if (/带(?:父母|爸妈|爸爸妈妈|家人)/.test(source)) return "3人";
  if (/独自|一个人|单人/.test(source)) return "1人";
  return "";
}

function parseTripBudgetFromText(text) {
  const source = String(text || "");
  const explicit = source.match(/(?:预算|人均|总共|控制在|不超过|以内)[^\d¥￥]{0,8}([¥￥]?\s?\d+(?:[.,]\d+)?\s*(?:万|k|K|元|块|人民币|rmb|RMB)?)/);
  const currency = source.match(/([¥￥]\s?\d+(?:[.,]\d+)?\s*(?:万|k|K|元|块)?)/);
  const value = explicit?.[1] || currency?.[1] || "";
  return value ? value.replace(/\s+/g, "") : "";
}

function parseTripPreferencesFromText(text) {
  const source = String(text || "");
  const preferences = [
    ["亲子", /亲子|孩子|小朋友|带娃/],
    ["轻松", /轻松|不赶|慢节奏|舒缓|休闲/],
    ["美食", /美食|吃|餐厅|小吃|咖啡/],
    ["自然", /自然|山|湖|海|海岛|草原|森林/],
    ["徒步", /徒步|爬山|登山|骑行/],
    ["文化", /博物馆|历史|人文|古镇|寺|展览/],
    ["购物", /购物|商场|买买买|市集/],
    ["摄影", /摄影|拍照|打卡|日出|日落/],
    ["自驾", /自驾|租车/],
    ["酒店", /酒店|民宿|度假村|住宿/]
  ];
  return preferences
    .filter(([, pattern]) => pattern.test(source))
    .map(([label]) => label)
    .slice(0, 3)
    .join(" · ");
}

function renderHomeLanding() {
  return `
    <main class="home-landing" aria-label="创建旅行计划">
      <div class="home-landing__media" aria-hidden="true">
        <img src="/src/assets/travel-editorial-hero.jpg" alt="" />
      </div>
      <section class="home-landing__content">
        <p class="eyebrow">AI Travel Planner</p>
        <h2>告诉我，你的旅行想法</h2>
        <p>目的地、天数、同行人和偏好，一句话就够了。</p>
        <div class="home-planner-compose">
          <input
            class="chat-input home-planner-input"
            type="text"
            placeholder="例如：带父母去云南 6 天，节奏轻松"
            aria-label="描述你的旅行计划"
            ${state.isChatLoading ? "disabled" : ""}
          />
          <button
            class="button button--primary home-planner-submit"
            type="button"
            data-action="send-chat"
            ${state.isChatLoading ? "disabled" : ""}
          >${state.isChatLoading ? "规划中" : "生成行程"}</button>
        </div>
        ${state.isChatLoading ? `<p class="home-planner-status" role="status">正在整理路线、住宿与每日安排...</p>` : ""}
      </section>
    </main>
  `;
}

function renderPlanningLoadingView() {
  const latestQuery = [...state.chat].reverse().find((message) => message.role === "user")?.text || "你的旅行计划";
  return `
    <section class="view-panel planning-loading-view" aria-label="正在生成行程">
      <div class="planning-loading-view__content">
        <span class="planning-loading-view__signal" aria-hidden="true"></span>
        <p class="eyebrow">Building your journey</p>
        <h2>正在生成你的行程</h2>
        <p class="planning-loading-view__query">${escapeHtml(latestQuery)}</p>
        <p class="planning-loading-view__status" role="status">正在整理路线、住宿与每日安排...</p>
      </div>
    </section>
  `;
}

function renderSelectionToolbar() {
  const selection = state.selection;
  if (!selection?.text) return "";
  return `
    <div
      class="selection-toolbar ${selection.placement === "top" ? "is-above" : ""}"
      style="--x: ${selection.x}px; --y: ${selection.y}px; --arrow-x: ${selection.arrowX}px;"
      role="toolbar"
      aria-label="选中文本操作"
    >
      <input
        class="selection-comment-input"
        type="text"
        placeholder="改动/提问都可以告诉我"
        aria-label="批注内容"
      />
      <button type="button" data-action="submit-selection-instruction">发送</button>
      <button type="button" data-action="clear-selection" aria-label="关闭选区工具">×</button>
    </div>
  `;
}

function renderPlanFormModal() {
  const form = state.planForm;
  if (!form) return "";

  return `
    <div class="plan-form-overlay" role="presentation">
      <button class="plan-form-overlay__backdrop" type="button" data-action="close-plan-form" aria-label="关闭添加计划"></button>
      <form class="plan-form-dialog" role="dialog" aria-modal="true" aria-labelledby="plan-form-title">
        <div class="plan-form-dialog__head">
          <div>
            <p class="eyebrow">Add plan</p>
            <h2 id="plan-form-title">添加计划</h2>
            <p class="plan-form-dialog__meta">D${form.day} · ${escapeHtml(form.city)}</p>
          </div>
          <button class="icon-button" type="button" data-action="close-plan-form" aria-label="关闭" ${form.submitting ? "disabled" : ""}>×</button>
        </div>

        <label class="plan-form-field">
          <span>分类</span>
          <select data-plan-field="category" ${form.submitting ? "disabled" : ""}>
            ${PLAN_CATEGORIES.map(
              (category) =>
                `<option value="${category}" ${form.category === category ? "selected" : ""}>${category}</option>`
            ).join("")}
          </select>
        </label>

        <label class="plan-form-field">
          <span>标题</span>
          <input
            type="text"
            data-plan-field="title"
            value="${escapeAttr(form.title)}"
            placeholder="例如：周日夜市、蓝湖温泉、机场快线"
            ${form.submitting ? "disabled" : ""}
          />
        </label>

        <label class="plan-form-field">
          <span>备注信息</span>
          <textarea
            rows="3"
            data-plan-field="remark"
            placeholder="补充时间偏好、预算、同行人需求或避坑提醒"
            ${form.submitting ? "disabled" : ""}
          >${escapeHtml(form.remark)}</textarea>
        </label>

        <div class="plan-form-dialog__actions">
          <button class="button button--ghost" type="button" data-action="close-plan-form" ${form.submitting ? "disabled" : ""}>取消</button>
          <button class="button button--primary" type="button" data-action="submit-plan-form" ${form.submitting ? "disabled" : ""}>
            ${form.submitting ? "AI 排期中..." : "提交并插入行程"}
          </button>
        </div>
      </form>
    </div>
  `;
}

function renderFreePoiModal() {
  const form = state.freePoiForm;
  if (!form) return "";
  const day = getPlanDays().find((item) => item.id === form.dayId);
  const position = getFreePoiDialogPosition(form);
  return `
    <div class="free-poi-overlay" role="presentation">
      <button class="free-poi-overlay__backdrop" type="button" data-action="close-free-poi-form" aria-label="关闭地点搜索"></button>
      <form
        class="free-poi-dialog ${position.placement === "below" ? "is-below" : "is-above"}"
        role="dialog"
        aria-modal="true"
        aria-label="添加 POI 点位"
        style="--free-poi-left:${position.left}px;--free-poi-top:${position.top}px"
      >
        <input
          class="free-poi-search-input"
          type="text"
          data-free-poi-field="query"
          value="${escapeAttr(form.query)}"
          placeholder="搜索地点"
          autocomplete="off"
        />
        <button class="free-poi-dialog__submit" type="button" data-action="submit-free-poi-form" aria-label="搜索并添加到 ${escapeAttr(day ? `Day ${day.day}` : "当天")}"></button>
      </form>
    </div>
  `;
}

function openFreePoiForm(dayId, trigger) {
  const rect = trigger?.getBoundingClientRect?.();
  state.freePoiForm = {
    dayId,
    query: "",
    anchorX: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
    anchorTop: rect?.top || window.innerHeight / 2,
    anchorBottom: rect?.bottom || window.innerHeight / 2
  };
}

function getFreePoiDialogPosition(form) {
  const margin = 18;
  const dialogWidth = Math.min(420, window.innerWidth - margin * 2);
  const halfWidth = dialogWidth / 2;
  const anchorTop = Number(form.anchorTop) || window.innerHeight / 2;
  const anchorBottom = Number(form.anchorBottom) || anchorTop;
  const left = Math.min(
    Math.max(Number(form.anchorX) || window.innerWidth / 2, margin + halfWidth),
    window.innerWidth - margin - halfWidth
  );
  const canShowAbove = anchorTop > 118;
  return {
    left: Math.round(left),
    top: Math.round(canShowAbove ? anchorTop - 14 : anchorBottom + 14),
    placement: canShowAbove ? "above" : "below"
  };
}

function submitFreePoiForm() {
  const form = state.freePoiForm;
  const title = String(form?.query || "").trim();
  if (!form?.dayId || !title) return;
  addFreeCanvasActivity(form.dayId, title);
  state.freePoiForm = null;
}

function renderEditorHeader() {
  if (isInspirationTrip()) {
    const anchor = getInspirationAnchor();
    return `
      <div class="editor-head editor-head--inspiration">
        <span class="inspiration-head-spacer" aria-hidden="true"></span>
        <h2 class="inspiration-head-title">${anchor ? `探索 ${escapeHtml(anchor)}` : "选择城市"}</h2>
        <span class="inspiration-head-spacer" aria-hidden="true"></span>
      </div>
    `;
  }

  return "";
}

function renderViewTabs() {
  const views = [
    ["canvas", "画布视图"],
    ["doc", "文档视图"],
    ["calendar", "日历视图"],
    ["free2", "自由视图"],
    ["ultimate", "终极视图"]
  ];

  return `
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
  `;
}

function renderBookingRail() {
  const active = state.activeBooking;
  return `
    <aside class="booking-rail" aria-label="预订工具栏">
      <div class="booking-rail__head">
        <div>
          <span>预订助手</span>
          <strong>${active ? getBookingLabel(active.kind) : "点击行程内订单入口"}</strong>
        </div>
        <button type="button" data-action="close-booking" aria-label="关闭预订助手">×</button>
      </div>
      <div class="booking-rail__body">
        ${active ? renderActiveBookingPanel(active) : renderBookingEmptyState()}
      </div>
    </aside>
  `;
}

function renderBookingEmptyState() {
  return `
    <div class="booking-empty">
      <strong>从时间轴开始</strong>
      <p>点击航班、酒店或门票入口，左侧会展开对应方案。已预订项目会显示订单详情。</p>
    </div>
  `;
}

function renderActiveBookingPanel(active) {
  const city = state.route.find((item) => item.id === active.cityId);
  const booking = state.bookings[active.kind][active.cityId];
  if (!city || !booking) return renderBookingEmptyState();
  return renderFlyAiBookingOptions(active, city);
}

function renderBookingDetail(kind, city, booking) {
  return `
    <article class="booking-detail">
      <span>${city.city} · ${getBookingLabel(kind)}</span>
      <h2>${escapeHtml(booking.name)}</h2>
      <p>${escapeHtml(booking.detail)}</p>
      <dl>
        <div><dt>状态</dt><dd>已确认</dd></div>
        <div><dt>关联</dt><dd>D${getFirstDayForCity(city.id)} ${city.city}</dd></div>
      </dl>
    </article>
  `;
}

function renderFlyAiBookingOptions(active, city) {
  const search = getBookingSearch(active);
  const liveOptions = Array.isArray(search?.items) ? search.items : [];
  const fallbackOptions = active.kind === "hotels" && !search?.loading && !liveOptions.length
    ? buildFallbackHotelOptions(city, ensureBooking("hotels", city.id))
    : [];
  const usingFallback = active.kind === "hotels" && !liveOptions.length && fallbackOptions.length > 0;
  const options = liveOptions.length ? liveOptions : fallbackOptions;
  const hasFinishedEmptySearch = search && !search.loading && !search.error && liveOptions.length === 0 && !fallbackOptions.length;
  const sourceLabel = usingFallback ? "本地建议" : "实时查询";
  const sourceBadge = usingFallback ? "离线兜底" : "预订助手";
  return `
    <div class="booking-group booking-group--flyai">
      <div class="booking-group__title">
        <div>
          <span>${sourceLabel}</span>
          <h2>${escapeHtml(city.city)} · ${escapeHtml(getBookingLabel(active.kind))}</h2>
        </div>
        <strong>${sourceBadge}</strong>
      </div>
      ${active.query ? `<p class="booking-group__hint">正在匹配“${escapeHtml(active.query)}”相关的可订方案。</p>` : ""}
      ${search?.loading ? renderHotelSearchState("正在查询实时库存与价格...") : ""}
      ${search?.error
        ? renderHotelSearchState(
            usingFallback ? "实时查询暂时不可用，先展示行程内建议酒店。" : search.error,
            !usingFallback
          )
        : ""}
      ${hasFinishedEmptySearch ? renderHotelSearchState("暂未返回可展示方案，请稍后重试或补充更明确的信息。", true) : ""}
      ${options.map((option, index) => renderFlyAiBookingCard(active, city, option, index)).join("")}
      ${search?.systemMessage ? `<p class="flyai-platform-hint">${escapeHtml(sanitizeBookingDisplayText(stripMarkdownLinks(search.systemMessage)))}</p>` : ""}
    </div>
  `;
}

function renderFlyAiBookingCard(active, city, option, index) {
  const imageUrl = getTravelImageProxyUrl(option.imageUrl);
  return `
    <article class="flyai-booking-card">
      ${imageUrl ? `<img class="flyai-booking-card__image" src="${escapeAttr(imageUrl)}" alt="" loading="lazy" referrerpolicy="no-referrer" />` : ""}
      <div class="flyai-booking-card__head">
        <span>${escapeHtml(option.meta || "实时可订")}</span>
        ${option.price ? `<strong>${escapeHtml(option.price)}</strong>` : ""}
      </div>
      <h3>${escapeHtml(option.name)}</h3>
      ${option.detail ? `<p>${escapeHtml(option.detail)}</p>` : ""}
      ${option.tags?.length ? `<div class="flyai-booking-card__tags">${option.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : ""}
      <div class="flyai-booking-card__actions">
        <button class="is-secondary" type="button" data-action="apply-booking-option" data-option="${index}">选用此方案</button>
        ${option.bookingUrl ? `<button type="button" data-action="open-flyai-booking" data-option="${index}">去查看</button>` : `<span>暂未提供预订链接</span>`}
      </div>
    </article>
  `;
}

function stripMarkdownLinks(value) {
  return String(value || "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[\*_`]/g, "").trim();
}

function renderHotelSearchState(text, isError = false) {
  return `
    <div class="hotel-search-state ${isError ? "is-error" : ""}">
      ${escapeHtml(text)}
    </div>
  `;
}

function getBookingLabel(kind) {
  if (kind === "flights") return "机票";
  if (kind === "hotels") return "酒店";
  if (kind === "trains") return "火车票";
  return "门票与体验";
}

function getFirstDayForCity(cityId) {
  return getPlanDays().find((day) => day.cityId === cityId)?.day || 1;
}

function getHotelOptionsForCity(city, booking) {
  const liveOptions = getLiveHotelOptionsForCity(city);
  if (liveOptions.length) return liveOptions;
  return buildFallbackHotelOptions(city, booking);
}

function getLiveHotelOptionsForCity(city) {
  const search = state.activeBooking?.kind === "hotels" ? getBookingSearch(state.activeBooking) : null;
  if (state.activeBooking?.cityId === city.id && Array.isArray(search?.items)) return search.items;
  return [];
}

function buildFallbackHotelOptions(city, booking) {
  const cityDays = getPlanDays().filter((day) => day.cityId === city.id);
  const nights = Math.max(1, cityDays.length);
  const options = [];
  const seen = new Set();
  const pushOption = (option) => {
    const name = sanitizeBookingDisplayText(option?.name);
    if (!name) return;
    const key = `${city.id}|${name}`;
    if (seen.has(key)) return;
    seen.add(key);
    options.push({
      id: `fallback-hotel-${city.id}-${options.length + 1}`,
      name,
      meta: sanitizeBookingDisplayText(option.meta) || "行程内建议 · 非实时库存",
      tags: Array.isArray(option.tags) ? option.tags.map(sanitizeBookingDisplayText).filter(Boolean).slice(0, 5) : [],
      detail: sanitizeBookingDisplayText(option.detail),
      price: sanitizeBookingDisplayText(option.price) || "请手动询价",
      imageUrl: "",
      bookingUrl: ""
    });
  };

  const seed = hotelSeed.find((item) => item.city === city.city);
  if (seed) {
    pushOption({
      name: seed.name,
      meta: `${seed.area} · 本地精选`,
      tags: [seed.area, "本地建议"],
      detail: seed.reason,
      price: seed.budget
    });
  }

  if (booking?.name && !/(方案|待订)/.test(booking.name)) {
    pushOption({
      name: booking.name,
      meta: "当前路书住宿 · 非实时库存",
      tags: [city.city, "已在路书中"],
      detail: booking.detail,
      price: "请手动确认"
    });
  }

  cityDays.forEach((day) => {
    const hotel = resolveHotelEntity(day, nights);
    if (!hotel) return;
    pushOption({
      name: hotel.name,
      meta: `${hotel.area || city.city} · 行程推荐`,
      tags: [hotel.area || city.city, `D${day.day}`],
      detail: hotel.note,
      price: "请手动询价"
    });
  });

  if (!options.length) {
    const firstDay = cityDays[0];
    const fallbackStay = normalizeStayLabel(inferStayFromDay(firstDay), `${city.city}交通便利区域酒店`);
    pushOption({
      name: fallbackStay,
      meta: `${city.city} · 通勤方便`,
      tags: [city.city, "兜底建议"],
      detail: "实时查询不可用时，先按当前行程动线推荐通勤更顺的住宿区域。",
      price: "请手动询价"
    });
  }

  return options.slice(0, 4);
}

function renderMacroPanel() {
  const totalDays = getTotalDays();
  return `
    <section class="macro-panel" aria-label="宏观调整">
      <div class="macro-summary">
        <p class="eyebrow">Macro controls</p>
        <h2>行程结构</h2>
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
          <button type="button" data-action="preset" data-preset="relax">降低密度</button>
          <button type="button" data-action="preset" data-preset="buffer">增加留白</button>
        </div>
      </div>
    </section>
  `;
}

function renderBudgetWallet() {
  const total = getBudgetTotal();
  const categories = budgetSeed.map((item) => {
    const amount = Number(item.amount.replace(/[^\d]/g, ""));
    const totalAmount = budgetSeed.reduce((sum, budget) => sum + Number(budget.amount.replace(/[^\d]/g, "")), 0);
    const percent = totalAmount ? Math.round((amount / totalAmount) * 100) : 0;
    return `
      <article class="budget-category">
        <div>
          <span>${item.label}</span>
          <strong>${item.amount}</strong>
        </div>
        <div class="budget-bar" aria-hidden="true">
          <span style="width: ${percent}%"></span>
        </div>
      </article>
    `;
  });

  return `
    <section class="budget-wallet" aria-label="预算概览">
      <div class="budget-wallet__main">
        <span>Total budget</span>
        <strong>${total}</strong>
        <p>${getTotalDays()} 天 · ${state.route.length} 城 · 等待真实报价确认</p>
      </div>
      <div class="budget-wallet__categories">
        ${categories.join("")}
      </div>
    </section>
  `;
}

function renderAiInsights() {
  return `
    <section class="ai-insights" aria-label="AI 建议">
      <div class="section-heading">
        <p class="eyebrow">AI Insights</p>
        <h2>旅行顾问建议</h2>
      </div>
      <div class="insight-grid">
        ${insightSeed
          .map(
            (insight) => `
              <article class="insight-card">
                <span class="insight-card__icon" aria-hidden="true">${insight.icon}</span>
                <div>
                  <h3>${insight.title}</h3>
                  <p>${insight.detail}</p>
                  <button class="chip-button" type="button">${insight.action}</button>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderActiveView() {
  if (isInspirationTrip()) return renderInspirationView();
  if (state.view === "doc") return renderDocumentView();
  if (state.view === "calendar") return renderCalendarView();
  if (state.view === "free2") return renderFreeCanvasView({ includeMap: false });
  if (state.view === "canvas") return renderCanvasView();
  if (state.view === "ultimate") return renderUltimateView();
  return renderCanvasView();
}

const VAGUE_TRAVEL_THEMES = new Set([
  "海岛", "岛屿", "海边", "海滩", "沙滩", "海滨", "海岛游",
  "国内", "国外", "周边", "山区", "古城", "古镇", "城市",
  "度假", "慢生活", "美食", "徒步", "自驾", "亲子", "蜜月",
  "爬山", "登山", "登高"
]);

const NON_DESTINATION_WORDS = new Set([
  "好的", "可以", "了解", "收到", "感谢", "谢谢", "不错", "当然", "没问题",
  "欢迎", "你好", "您好", "是的", "不是", "这里", "那里", "以下", "如下",
  "首先", "其次", "另外", "此外", "总结", "建议", "推荐", "考虑", "选择",
  "需要", "想要", "希望", "如果", "或者", "以及", "还有", "等等", "比如",
  "例如", "其中", "适合", "非常", "特别", "一些", "几个", "多个", "方便",
  "告诉", "补充", "确认", "规划", "出发", "预算", "交通", "天数", "同行",
  "人员", "日期", "偏好", "接下来", "然后", "最后", "同时", "不过",
  "但是", "因此", "所以", "由于", "为了", "关于", "根据", "按照", "通过",
  "进行", "提供", "帮助", "安排", "准备", "注意", "提醒", "说明", "介绍",
  "概述", "概览", "详情", "信息", "问题", "回答", "回复",
  "经典", "热门", "人气", "特色", "体验", "活动", "景点", "景区", "风景",
  "自然", "人文", "历史", "文化", "当地", "本地", "全国", "华东", "华南",
  "华北", "西南", "西北", "东北", "中部", "沿海", "高原", "平原",
  "打算", "哪里", "去哪", "怎么", "什么", "请问", "爬山", "爬"
]);

const CONVERSATIONAL_DESTINATION_PATTERN = /(?:哪|怎|什么|为何|如何|打算|想去|告诉我|请问|补充|确认|规划|选择|推荐|考虑|适合|有没有|去哪|哪里|怎么|为您|便于|方便|接下来|然后|同时|因此|所以|由于|为了|关于|根据|按照|通过|进行|提供|帮助|安排|准备|注意|提醒|说明|介绍|概述|详情|问题|回答|回复|您|你|我|他|她|这|那|其|些|每|各|某|去爬|爬)/;

const GEOGRAPHIC_DESTINATION_SUFFIX_PATTERN = /^(?:[\u4e00-\u9fa5]{1,6}(?:山|岛|湖|州|城|镇|湾|江|岭|谷|岩|峰|屿|浦|滩|港|澳|门|溪|涧|潭|泉|洞|崖|峡|沟|坡|坪|川|海|滨|岸|堤|墟|里|坊|圩|甸|道|口|源|林|森|坝|关|庄|寨|原)|(?:[\u4e00-\u9fa5]{2,8}(?:沙漠|湿地|草原|国家公园|古城|古镇|老街|湖区|景区|公园)))$/;

function isVagueTravelTheme(name) {
  const value = String(name || "").trim();
  if (!value) return true;
  if (VAGUE_TRAVEL_THEMES.has(value)) return true;
  if (/^(帮我|我想|想要|去|找个|推荐|规划|制定)/.test(value)) return true;
  if (/[？?]/.test(value)) return true;
  if (/具体|天数|出发|同行|预算|偏好|告诉/.test(value)) return true;
  if (/^(国内|国外|周边)?的?(海岛|山区|海边|草原|沙漠|古镇|城市|目的地)$/.test(value)) return true;
  return value.length > 10;
}

function isConcreteDestinationName(name) {
  const value = String(name || "").trim();
  if (!value || isPlaceholderDestination(value) || isVagueTravelTheme(value)) return false;
  if (/[去还问帮想找想要规划具体告诉这那]/.test(value)) return false;
  if (findCatalogDestinationByName(value)) return true;
  if (TRIP_DESTINATION_ALIASES.some((alias) => alias.name === value)) return true;
  if (TRIP_DESTINATION_ALIASES.some((alias) => alias.pattern.test(value) && value.length <= 8)) return true;
  if (/^[\u4e00-\u9fa5]{2,4}$/.test(value)) return true;
  return false;
}

function hasConcreteTripDestination() {
  return state.route.some((city) => isConcreteDestinationName(city.city));
}

function isAssistantClarifyingTripDetails(text) {
  const source = String(text || "").replace(/\n+已同步更新左侧.*$/s, "");
  if (isAssistantClaimingGeneratedItinerary(source)) return false;
  const asksDays = /(计划去几天|打算玩几天|玩几天|去几天|待几天|多少天|几天)/.test(source);
  const asksDeparture = /(出发城市|出发日期|从哪里出发|从哪.*出发|出发地)/.test(source);
  const asksOther = /(预算|同行|交通|住宿偏好)/.test(source);

  return (
    (/(请确认|确认以下|补充以下|请告诉我|告诉我以下|根据您的选择|为您规划|方便告诉|还需要了解|请补充|想先了解|再确认)/.test(source)
      && (asksDays || asksDeparture || asksOther))
    || (asksDays && asksDeparture)
    || (/^(?:请|麻烦|可以|能否|帮我|为我)?(?:生成|制定|规划).{0,12}(详细)?(路书|行程|计划)/.test(source) && !/(已|已经|已为|我已|帮你|为你|为您)/.test(source))
    || /(我来为你规划详细行程|出发城市和出发日期)/.test(source)
  );
}

function isTemplateSchedule(schedule) {
  const titles = (schedule || []).map((item) => String(item?.title || "")).join("|");
  return /(抵达与安顿|核心街区探索|晚餐与夜间散步|城市初访)/.test(titles);
}

function hasAppliedItineraryEdits() {
  return Object.values(state.dayEdits).some((edit) => {
    if (!Array.isArray(edit?.schedule) || !edit.schedule.length) return false;
    return !isTemplateSchedule(edit.schedule);
  });
}

function hasConfirmedTripPlan() {
  if (isAssistantClarifyingTripDetails(getLatestAssistantChatText())) return false;
  if (!state.route.length) return false;

  const hasEditedSchedule = Object.values(state.dayEdits).some((edit) => {
    if (!Array.isArray(edit?.schedule) || !edit.schedule.length) return false;
    return !isTemplateSchedule(edit.schedule);
  });
  if (hasEditedSchedule) return true;

  const days = getPlanDays();
  const hasRealPlan = days.some((day) =>
    (day.schedule || []).some((activity) => {
      const title = String(activity?.title || "").trim();
      return title && !/^(抵达与安顿|核心街区探索|晚餐与夜间散步|新的安排|待定|自由活动)$/.test(title);
    })
  );
  if (hasRealPlan) return true;

  return hasConcreteTripDestination() && !state.inspiration.exploring;
}

function isTripClarifyingPhase() {
  if (isAssistantClarifyingTripDetails(getLatestAssistantChatText())) return true;
  return state.inspiration.exploring && !state.route.length;
}

function isConcreteTripRequest(text) {
  const source = String(text || "").trim();
  if (!source) return false;
  const days = extractTripDaysFromText(source);
  if (!days) return false;

  for (const alias of TRIP_DESTINATION_ALIASES) {
    if (source.includes(alias.name) || alias.pattern.test(source)) return true;
  }
  for (const item of INSPIRATION_DESTINATION_CATALOG) {
    if (source.includes(item.name)) return true;
  }

  const inferred = inferPrimaryDestinationFromText(source);
  if (isConcreteDestinationName(inferred)) return true;

  const leadingDestination = extractLeadingTripDestination(source);
  if (leadingDestination) return true;

  return /^[\u4e00-\u9fa5]{2,8}[一二三四五六七八九十两\d]+(?:天|日)/.test(source)
    || /^[\u4e00-\u9fa5]{2,8}\s*\d+\s*(?:天|日)/.test(source);
}

function shouldEnterInspirationFromUserText(text) {
  const source = String(text || "");
  if (isConcreteTripRequest(source)) return false;
  return /(找|推荐|哪个|哪里|什么地方|想去|还去|有没有|适合|海岛|海边|海滩|古镇|爬山|登山|徒步|国内|国外|周边|目的地|去哪)/.test(source)
    || /([\u4e00-\u9fa5]{2,8}(?:湖|岛|山|城|镇|古|湾)).*([一二三四五六1-6]日|\d+\s*天)/.test(source)
    || /([一二三四五六1-6]日|\d+\s*天).*(?:湖|岛|山|城|镇|古|湾)/.test(source);
}

function inferInspirationAnchorFromText(text) {
  const source = String(text || "");
  const leading = extractLeadingTripDestination(source);
  if (leading && isLikelyModelDestinationName(leading)) return leading;
  for (const alias of TRIP_DESTINATION_ALIASES) {
    if (alias.pattern.test(source)) return alias.name;
  }
  for (const item of INSPIRATION_DESTINATION_CATALOG) {
    if (source.includes(item.name)) return item.name;
  }
  const inferred = inferPrimaryDestinationFromText(source);
  return isLikelyModelDestinationName(inferred) ? inferred : "";
}

function inferInspirationAnchorDestination() {
  const latestUserText = getLatestUserChatText();
  if (shouldEnterInspirationFromUserText(latestUserText) && !isConcreteTripRequest(latestUserText)) {
    return inferInspirationAnchorFromText(latestUserText);
  }

  for (const message of [...state.chat].reverse()) {
    if (message.role !== "user") continue;
    const inferred = inferInspirationAnchorFromText(message.text);
    if (inferred) return inferred;
  }
  return isLikelyModelDestinationName(state.inspiration.anchor) ? state.inspiration.anchor : "";
}

function extractExampleDestinationsFromText(text) {
  const source = String(text || "");
  const names = [];

  for (const match of source.matchAll(/(?:比如|例如|如|推荐|可以考虑|像是)[^，。！？\n]{0,16}?([\u4e00-\u9fa5]{2,6}(?:[、，,/\s][\u4e00-\u9fa5]{2,6})+)/g)) {
    match[1].split(/[、，,/\s]+/).forEach((name) => names.push(cleanInspirationName(name)));
  }

  for (const match of source.matchAll(/([\u4e00-\u9fa5]{2,6}(?:[、，,][\u4e00-\u9fa5]{2,6}){2,})/g)) {
    match[1].split(/[、，,]+/).forEach((name) => names.push(cleanInspirationName(name)));
  }

  return [...new Set(names.filter((name) => name.length >= 2 && !isVagueTravelTheme(name)))];
}

function addThemedInspirationCatalogPicks(found, addPick, themes, query, limit = 8) {
  const ranked = rankInspirationCatalog(themes, query);
  ranked.forEach(({ item }) => {
    if (found.size >= limit) return;
    addPick(item);
  });
}

function collectInspirationThemes(query = "") {
  const userTexts = state.chat
    .filter((message) => message.role === "user")
    .map((message) => message.text)
    .join("\n");
  return extractInspirationThemes(`${query}\n${userTexts}`);
}

function extractInspirationThemes(text) {
  const source = String(text || "");
  const themes = [];
  const themePatterns = [
    { key: "海岛", pattern: /海岛|岛屿|海边|海滩|沙滩|海滨|潜水|出海/ },
    { key: "古镇", pattern: /古镇|古城|老街/ },
    { key: "登山", pattern: /爬山|登山|登高|山峰|山地|越野|户外/ },
    { key: "徒步", pattern: /徒步|步行|环线|露营/ },
    { key: "雪山", pattern: /雪山|冰川|高原/ },
    { key: "湖景", pattern: /湖泊|湖边|湖景|环湖|千岛湖/ },
    { key: "美食", pattern: /美食|小吃|夜市|火锅/ },
    { key: "度假", pattern: /度假|放松|躺平|轻松/ },
    { key: "文艺", pattern: /文艺|摄影|打卡/ },
    { key: "国内", pattern: /国内/ }
  ];
  themePatterns.forEach((item) => {
    if (item.pattern.test(source)) themes.push(item.key);
  });
  return [...new Set(themes)];
}

function scoreInspirationCatalogMatch(item, themes, query) {
  const source = String(query || "");
  let score = 0;

  if (themes.length) {
    themes.forEach((theme) => {
      if (item.themes?.includes(theme)) score += 12;
    });
    if (score === 0) return 0;
  }

  const blob = [
    item.name,
    item.tagline,
    item.region,
    ...(item.highlights || []),
    ...(item.themes || [])
  ].join(" ");

  extractIntentKeywords(source).forEach((keyword) => {
    if (blob.includes(keyword)) score += 8;
  });

  if (!themes.length) {
    return score > 0 ? score : 0;
  }

  return score;
}

function extractIntentKeywords(query) {
  const source = String(query || "");
  const keywords = [];
  const patterns = [
    /爬山|登山|徒步|高原|雪山|海岛|海边|海滩|沙滩|古镇|古城|美食|火锅|潜水|湖泊|环湖|亲子|自驾|摄影|露营|草甸|云海|日出/
  ];
  patterns.forEach((pattern) => {
    const match = source.match(pattern);
    if (match) keywords.push(match[0]);
  });
  return [...new Set(keywords)];
}

function rankInspirationCatalog(themes, query) {
  return INSPIRATION_DESTINATION_CATALOG
    .map((item) => ({ item, score: scoreInspirationCatalogMatch(item, themes, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
}

function shouldAddAssistantInspirationPick(name, themes) {
  if (!themes.length) return true;
  const catalog = findCatalogDestinationByName(name);
  if (!catalog) return false;
  return catalog.themes.some((theme) => themes.includes(theme));
}

function getInspirationAnchor() {
  return inferInspirationAnchorDestination();
}

function shouldBypassInspirationFlow(userText = getLatestUserChatText(), assistantText = getLatestAssistantChatText()) {
  if (isConcreteTripRequest(userText)) return true;
  if (isAssistantClaimingGeneratedItinerary(assistantText)) return true;
  return false;
}

function hasInspirationRecommendations(assistantText = getLatestAssistantChatText(), guide = state.tripGuide) {
  return getModelRecommendedDestinations(guide, assistantText).length > 0
    || extractCatalogDestinationsFromAssistantText(assistantText).length > 0;
}

function hasActiveInspirationIntent(userText = getLatestUserChatText(), assistantText = getLatestAssistantChatText()) {
  if (!String(userText || "").trim() && !state.inspiration.exploring) return false;
  if (isConcreteTripRequest(userText)) return false;
  if (shouldBypassInspirationFlow(userText, assistantText)) return false;
  return state.inspiration.exploring
    || shouldEnterInspirationFromUserText(userText)
    || hasInspirationRecommendations(assistantText, state.tripGuide);
}

function isUserExploringDestinations() {
  const assistantText = getLatestAssistantChatText();
  const latestUser = getLatestUserChatText();
  if (hasActiveInspirationIntent(latestUser, assistantText)) return true;
  if (hasConfirmedTripPlan()) return false;
  if (hasAppliedItineraryEdits()) return false;
  if (state.route.length) return false;
  if (shouldBypassInspirationFlow(latestUser, assistantText)) return false;
  if (isAssistantClarifyingTripDetails(assistantText)) return true;

  const explorationQuery = shouldEnterInspirationFromUserText(latestUser);
  const hasAnchor = Boolean(getInspirationAnchor());
  return explorationQuery || state.inspiration.exploring || hasAnchor;
}

function isInspirationTrip() {
  const hasUserQuery = state.chat.some((message) => message.role === "user");
  if (!hasUserQuery) return false;
  if (state.route.length && !state.inspiration.exploring) return false;
  const assistantText = getLatestAssistantChatText();
  const latestUser = getLatestUserChatText();
  if (hasActiveInspirationIntent(latestUser, assistantText)) return true;
  if (hasConfirmedTripPlan()) return false;
  if (hasAppliedItineraryEdits()) return false;
  if (shouldBypassInspirationFlow(latestUser, assistantText)) return false;
  return isUserExploringDestinations() || (state.inspiration.exploring && !state.route.length);
}

function getInspirationHeadline() {
  const query = state.inspiration.query || getLatestUserChatText();
  const assistant = getLatestAssistantChatText();
  const anchor = getInspirationAnchor();
  const clarifying = isAssistantClarifyingTripDetails(assistant);

  return {
    title: anchor
      ? `${anchor} · 灵感探索`
      : query
        ? truncateInspirationText(query, 28)
        : "发现你的下一站",
    subtitle: clarifying
      ? "补充出发城市、交通方式和预算后，即可生成完整路书"
      : anchor
        ? `先看看 ${anchor} 玩什么，选好亮点再开始规划`
        : assistant
          ? truncateInspirationText(assistant.replace(/\s+/g, " "), 56)
          : "根据对话推荐目的地，点选卡片开始规划"
  };
}

function getLatestUserChatText() {
  const message = [...state.chat].reverse().find((item) => item.role === "user");
  return message?.text?.trim() || "";
}

function getLatestAssistantChatText() {
  const message = [...state.chat].reverse().find((item) => item.role === "assistant");
  return message?.text?.trim() || "";
}

function truncateInspirationText(value, maxLength) {
  const text = String(value || "").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

function extractDestinationNamesFromText(text) {
  const source = String(text || "");
  const names = [];

  for (const match of source.matchAll(/\*\*([^\*\n]{2,12})\*\*/g)) {
    names.push(cleanInspirationName(match[1]));
  }
  for (const match of source.matchAll(/(?:^|\n)\s*(?:\d+\.|[-•*])\s*([^\n：:]{2,16})/gm)) {
    names.push(cleanInspirationName(match[1]));
  }
  for (const match of source.matchAll(/([\u4e00-\u9fa5]{2,8}(?:岛|湖|山|城|州|江|湾|古镇|古城))/g)) {
    names.push(cleanInspirationName(match[1]));
  }

  return [...new Set(names.filter(Boolean))];
}

function cleanInspirationName(value) {
  return String(value || "")
    .replace(/[（(].*?[）)]/g, "")
    .replace(/[:：\-—].*$/, "")
    .replace(/[。．.!！?？,，、]/g, "")
    .trim();
}

function findCatalogDestinationByName(name) {
  const cleaned = cleanInspirationName(name);
  if (!cleaned) return null;
  return INSPIRATION_DESTINATION_CATALOG.find((item) => item.name === cleaned || cleaned.includes(item.name) || item.name.includes(cleaned)) || null;
}

function buildInspirationPickFromCatalog(item) {
  return {
    id: item.id,
    name: item.name,
    region: item.region,
    priceFrom: item.priceFrom,
    lng: item.lng,
    lat: item.lat,
    image: item.image,
    tagline: item.tagline,
    highlights: item.highlights || []
  };
}

function slugifyInspirationName(name) {
  return String(name || "dest")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9-]/g, "")
    .toLowerCase() || "dest";
}

function buildInspirationPickFromDestination(dest, index = 0) {
  const payload = typeof dest === "string" ? { name: dest } : dest || {};
  const name = cleanInspirationName(payload.name);
  if (!name || !isLikelyModelDestinationName(name)) return null;

  const catalog = findCatalogDestinationByName(name);
  if (catalog) {
    return {
      ...buildInspirationPickFromCatalog(catalog),
      tagline: payload.tagline || catalog.tagline,
      highlights: payload.highlights?.length ? payload.highlights : catalog.highlights,
      modelRecommended: true
    };
  }

  return {
    id: `dest-${slugifyInspirationName(name)}-${index}`,
    name,
    region: payload.region || "",
    tagline: payload.tagline || payload.highlights?.[0] || "",
    highlights: payload.highlights || [],
    lng: Number.isFinite(Number(payload.lng)) ? Number(payload.lng) : null,
    lat: Number.isFinite(Number(payload.lat)) ? Number(payload.lat) : null,
    image: "mountain",
    priceFrom: payload.priceFrom || "",
    modelRecommended: true
  };
}

function getModelRecommendedDestinations(guide, assistantText = "") {
  const inspiration = guide?.inspiration;
  if (Array.isArray(inspiration?.destinations) && inspiration.destinations.length) {
    return inspiration.destinations.filter((item) => isLikelyModelDestinationName(cleanInspirationName(item?.name)));
  }

  if (state.inspiration.recommendedDestinations?.length) {
    return state.inspiration.recommendedDestinations.filter((item) =>
      isLikelyModelDestinationName(cleanInspirationName(item?.name))
    );
  }

  return extractCatalogDestinationsFromAssistantText(assistantText || getLatestAssistantChatText());
}

function isLikelyModelDestinationName(name) {
  const value = cleanInspirationName(name);
  if (!value || value.length < 2 || value.length > 10) return false;
  if (isVagueTravelTheme(value)) return false;
  if (NON_DESTINATION_WORDS.has(value)) return false;
  if (/[？?！!。．]/.test(value)) return false;
  if (CONVERSATIONAL_DESTINATION_PATTERN.test(value)) return false;
  if (findCatalogDestinationByName(value)) return true;
  if (TRIP_DESTINATION_ALIASES.some((alias) => alias.name === value)) return true;
  if (/^[\u4e00-\u9fa5]{2,4}$/.test(value) && !/[去还问帮想找想要规划具体告诉这那]/.test(value)) return true;
  return GEOGRAPHIC_DESTINATION_SUFFIX_PATTERN.test(value);
}

function extractCatalogDestinationsFromAssistantText(text) {
  const source = String(text || "");
  const names = [];

  for (const match of source.matchAll(/\*\*([\u4e00-\u9fa5]{2,8}(?:山|岛|湖|州|城|镇|湾|江|岭|谷|岩|峰|屿)?)\*\*/g)) {
    names.push(cleanInspirationName(match[1]));
  }

  for (const match of source.matchAll(
    /(?:^|\n)\s*\d+\.\s*(?:\*\*)?([\u4e00-\u9fa5]{2,8}(?:山|岛|湖|州|城|镇|湾|江|岭|谷|岩|峰|屿))(?:\*\*)?(?:[：:\-—]|$)/gm
  )) {
    names.push(cleanInspirationName(match[1]));
  }

  for (const item of INSPIRATION_DESTINATION_CATALOG) {
    if (source.includes(item.name)) names.push(item.name);
  }

  for (const alias of TRIP_DESTINATION_ALIASES) {
    if (alias.pattern.test(source)) names.push(alias.name);
  }

  const genericWords = new Set(["古城", "古镇", "老街", "市区", "城区", "中心"]);
  return [...new Set(names.filter((name) => isLikelyModelDestinationName(name) && !genericWords.has(name)))].slice(0, 8).map((name) => ({ name }));
}

let inspirationGeocodePromise = null;

async function hydrateInspirationPickCoordinates(render) {
  const missing = state.inspiration.picks.filter(
    (pick) => !Number.isFinite(pick.lng) || !Number.isFinite(pick.lat)
  );
  if (!missing.length) return;

  if (inspirationGeocodePromise) {
    await inspirationGeocodePromise.catch(() => {});
  }

  inspirationGeocodePromise = (async () => {
    try {
      const response = await fetch("/api/amap/geocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          places: missing.map((pick) => ({ name: pick.name, city: pick.region || "" }))
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !Array.isArray(data.places)) return;

      const byName = new Map(data.places.map((item) => [item.name, item]));
      state.inspiration.picks = state.inspiration.picks.map((pick) => {
        const geo = byName.get(pick.name);
        if (!geo || !Number.isFinite(geo.lng) || !Number.isFinite(geo.lat)) return pick;
        return {
          ...pick,
          lng: geo.lng,
          lat: geo.lat,
          region: pick.region || geo.region || pick.region
        };
      });
      render?.();
    } catch {
      // ignore geocode failures
    } finally {
      inspirationGeocodePromise = null;
    }
  })();

  await inspirationGeocodePromise;
}

function getInspirationSpotsForAnchor(anchorName) {
  const catalog = findCatalogDestinationByName(anchorName);
  if (!catalog) return [];
  const spots = INSPIRATION_DESTINATION_SPOTS[catalog.id] || [];
  return spots.map((spot) => ({ ...spot }));
}

function syncInspirationPicks(userText = "", guide = null, assistantText = "") {
  const query = String(userText || getLatestUserChatText() || state.inspiration.query || "").trim();
  if (shouldBypassInspirationFlow(query, assistantText)) {
    state.inspiration.query = query;
    state.inspiration.exploring = false;
    state.inspiration.anchor = "";
    state.inspiration.picks = [];
    state.inspiration.activePickId = null;
    return;
  }
  const userAnchor = inferInspirationAnchorDestination();
  const activeGuide = guide || state.tripGuide;
  const modelDestinations = getModelRecommendedDestinations(activeGuide, assistantText);
  const themes = collectInspirationThemes(query);
  const found = new Map();

  const addPick = (candidate) => {
    if (candidate && typeof candidate === "object" && candidate.id && candidate.name) {
      found.set(candidate.id, candidate);
      return;
    }
    const pick = buildInspirationPickFromDestination(candidate);
    if (pick) found.set(pick.id, pick);
  };

  if (modelDestinations.length && !userAnchor) {
    state.inspiration.recommendedDestinations = modelDestinations;
    modelDestinations.forEach((dest, index) => {
      const pick = buildInspirationPickFromDestination(dest, index);
      if (pick) found.set(pick.id, pick);
    });
  } else if (userAnchor) {
    const catalog = findCatalogDestinationByName(userAnchor);
    const spots = getInspirationSpotsForAnchor(userAnchor);
    if (spots.length) {
      spots.forEach((spot) => addPick(spot));
      if (catalog) {
        addPick({
          ...buildInspirationPickFromCatalog(catalog),
          tagline: "从这里开始规划完整行程",
          isPrimary: true
        });
      }
    } else if (catalog) {
      addPick(catalog);
    } else if (isLikelyModelDestinationName(userAnchor)) {
      addPick({
        name: userAnchor,
        tagline: "已选定，请补充天数和预算后生成路书"
      });
    }
  } else {
    state.chat.forEach((message) => {
      if (message.role !== "user") return;
      const inferred = inferPrimaryDestinationFromText(message.text);
      if (isLikelyModelDestinationName(inferred)) addPick(inferred);
    });
  }

  if (!found.size && themes.length) {
    addThemedInspirationCatalogPicks(found, addPick, themes, query);
  }

  const picks = [...found.values()]
    .filter((pick) => isLikelyModelDestinationName(pick.name))
    .slice(0, 8);
  const activePickId = picks.some((pick) => pick.id === state.inspiration.activePickId)
    ? state.inspiration.activePickId
    : picks[0]?.id || null;

  state.inspiration = {
    query,
    anchor: userAnchor,
    picks,
    activePickId,
    exploring: state.inspiration.exploring
      || Boolean(userAnchor)
      || Boolean(modelDestinations.length)
      || (shouldEnterInspirationFromUserText(query) && !isConcreteTripRequest(query))
      || (Boolean(picks.length) && Boolean(themes.length))
  };
}

function collectUserChatText() {
  return state.chat
    .filter((message) => message.role === "user")
    .map((message) => message.text)
    .join("\n");
}

function extractTripDaysFromText(text) {
  const source = String(text || "");
  if (/周五(?:晚上|晚间|夜间|晚)?[\s\S]{0,30}(?:周末|周日|星期日|礼拜日)/.test(source)) return 3;
  if (/(?:周六|星期六|礼拜六)[\s\S]{0,24}(?:周末|周日|星期日|礼拜日)/.test(source)) return 2;
  if (/(?:过|玩|安排|计划|去|度过)?(?:这个|本)?周末(?:游|旅行|行程)?/.test(source)) return 2;
  const digitDayMatch = source.match(/(\d+)\s*天/);
  if (digitDayMatch) return Math.max(1, Number(digitDayMatch[1]) || 1);
  const digitRiMatch = source.match(/(\d+)\s*日(?:游|行程)?/);
  if (digitRiMatch) return Math.max(1, Number(digitRiMatch[1]) || 1);
  const chineseMatch = source.match(/([一二三四五六七八九十两]{1,4})\s*(?:天|日)(?:游|行程)?/);
  if (chineseMatch) return parseChineseTripNumber(chineseMatch[1]);
  return null;
}

function extractLeadingTripDestination(text) {
  const source = String(text || "").trim();
  const spacedMatch = source.match(/^([\u4e00-\u9fa5]{2,8})\s*(?:\d+\s*[天日]|[一二三四五六七八九十两]{1,4}\s*[天日])/);
  const tightMatch = source.match(/^([\u4e00-\u9fa5]{2,8})(?:[一二三四五六七八九十两\d]+[天日])/);
  const city = (spacedMatch?.[1] || tightMatch?.[1] || "").trim();
  if (!city) return "";
  if (isConcreteDestinationName(city)) return city;
  if (/^[\u4e00-\u9fa5]{2,4}$/.test(city) && !/[去还问帮想找想要规划具体告诉这那]/.test(city)) return city;
  return "";
}

function parseChineseTripNumber(value) {
  const source = String(value || "").trim();
  if (!source) return null;
  const digitMap = { 零: 0, 一: 1, 二: 2, 两: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  if (source === "十") return 10;
  const tenIndex = source.indexOf("十");
  if (tenIndex >= 0) {
    const before = source.slice(0, tenIndex);
    const after = source.slice(tenIndex + 1);
    const tens = before ? digitMap[before] : 1;
    const ones = after ? digitMap[after] : 0;
    const total = (tens || 1) * 10 + (ones || 0);
    return total > 0 ? total : null;
  }
  return digitMap[source] || null;
}

function resolveConcreteTripDestination(userText = "") {
  const source = String(userText || "").trim();
  if (!source) return "";

  const leading = extractLeadingTripDestination(source);
  if (leading) return leading;

  for (const alias of TRIP_DESTINATION_ALIASES) {
    if (source.includes(alias.name)) return alias.name;
  }
  for (const item of INSPIRATION_DESTINATION_CATALOG) {
    if (source.includes(item.name)) return item.name;
  }

  const casual = inferCasualDestinationPick(source);
  if (casual) return casual;

  const inferred = inferPrimaryDestinationFromText(source);
  if (isLikelyModelDestinationName(inferred) || isConcreteDestinationName(inferred)) return inferred;

  return "";
}

function buildFallbackTripUpdatesFromRequest(userText) {
  const days = extractTripDaysFromText(userText);
  const city = resolveConcreteTripDestination(userText);
  if (!days || !city) return null;

  const dayUpdates = Array.from({ length: days }, (_, index) => ({
    day: index + 1,
    city,
    title: `第${index + 1}天 · ${city}`,
    summary: `${city}第${index + 1}天行程，核心景点与美食体验。`,
    pace: "平衡游",
    transport: "当地交通",
    stay: `${city}市区酒店`,
    schedule: [
      { time: "09:30", title: "核心景点", detail: `游览${city}代表性景点，建议提前预约门票。` },
      { time: "13:00", title: "当地美食", detail: "体验当地特色餐饮与街区漫步。" },
      { time: "20:00", title: `入住 ${city}`, detail: "选择交通便利区域，方便次日衔接。" }
    ],
    stops: ["核心景点", "当地美食"]
  }));

  return {
    mode: "replace",
    route: [{ city, days, stops: ["核心景点", "代表体验"] }],
    days: dayUpdates
  };
}

function hasIncomingTripPlan(updates, updateDays = []) {
  const route = Array.isArray(updates?.route) ? updates.route : [];
  const hasIncomingRoute = route.some((city) => {
    const name = String(city?.city || "").trim();
    return name && !isPlaceholderDestination(name);
  });
  const hasIncomingDays = updateDays.some((day) => {
    return Number(day?.day) > 0
      && Array.isArray(day?.schedule)
      && day.schedule.some((item) => String(item?.title || "").trim());
  });
  return hasIncomingRoute || hasIncomingDays;
}

function ensureTripPlanForConcreteRequest(userText, assistantText = "") {
  if (!isConcreteTripRequest(userText)) return 0;
  if (getPlanDays().length > 0) return 0;
  const fallback = buildFallbackTripUpdatesFromRequest(userText);
  if (!fallback) return 0;
  return applyAssistantUpdates(fallback, userText, assistantText);
}

function inferCasualDestinationPick(text) {
  const source = String(text || "").trim();
  if (!source || source.length > 24) return "";

  for (const item of INSPIRATION_DESTINATION_CATALOG) {
    if (source.includes(item.name)) return item.name;
  }
  for (const alias of TRIP_DESTINATION_ALIASES) {
    if (source.includes(alias.name) || alias.pattern.test(source)) return alias.name;
  }

  const casual = source
    .replace(/[吧呢啊呀哦了就好吗嘛]$/, "")
    .replace(/^(就|那|去|选|还是|先去|那就|我想去|我要去|咱们去|我们去)/, "")
    .trim();
  if (findCatalogDestinationByName(casual)) return findCatalogDestinationByName(casual).name;
  if (isLikelyModelDestinationName(casual)) return casual;

  const inferred = inferPrimaryDestinationFromText(source);
  return isLikelyModelDestinationName(inferred) ? inferred : "";
}

function isAssistantClaimingGeneratedItinerary(text) {
  const source = String(text || "").replace(/\n+已同步更新左侧.*$/s, "");
  return /(?:已|已经|我已|已为您|已为你|已帮您|已帮你|为您生成了|为你生成了|帮您生成了|帮你生成了).{0,16}(规划|安排|制定|生成|更新).{0,24}(行程|路书|攻略|计划)/.test(source)
    || (/(完整|详细).{0,10}(行程|路书)/.test(source) && /(\d+\s*[天日]|[一二三四五六七八九十两]{1,4}\s*[天日])/.test(source));
}

function hasUserSpecifiedTripDays() {
  return state.chat.some((message) => message.role === "user" && extractTripDaysFromText(message.text));
}

function hasUserSelectedDestination() {
  if (state.inspiration.anchor && isLikelyModelDestinationName(state.inspiration.anchor)) return true;
  const latest = getLatestUserChatText();
  if (isConcreteTripRequest(latest)) {
    for (const alias of TRIP_DESTINATION_ALIASES) {
      if (latest.includes(alias.name)) return true;
    }
    const inferred = inferPrimaryDestinationFromText(latest);
    if (isConcreteDestinationName(inferred)) return true;
  }
  const casualPick = inferCasualDestinationPick(latest);
  if (casualPick) return true;
  if (/^我选择/.test(latest)) {
    const destination = latest.replace(/^我选择/, "").replace(/，重点关注.+$/, "").trim();
    return isLikelyModelDestinationName(destination);
  }
  if (/^我想去/.test(latest)) {
    const inferred = inferPrimaryDestinationFromText(latest);
    return isLikelyModelDestinationName(inferred);
  }
  return false;
}

function needsTripPlanningClarification() {
  if (hasConfirmedTripPlan()) return false;
  if (!state.inspiration.exploring && state.route.length) return false;
  if (!hasUserSelectedDestination()) return false;
  return !hasUserSpecifiedTripDays();
}

function buildInspirationPickQuery(pick) {
  const destination = pick.parentDestination || pick.name;

  if (pick.parentDestination && pick.name !== pick.parentDestination) {
    return `我选择${destination}，重点关注${pick.name}`;
  }

  return `我选择${destination}`;
}

function renderInspirationView() {
  syncInspirationPicks();
  const picks = state.inspiration.picks;
  const activePick = picks.find((pick) => pick.id === state.inspiration.activePickId) || picks[0] || null;

  return `
    <section class="view-panel inspiration-view" aria-label="目的地探索">
      <div class="inspiration-layout">
        <div class="inspiration-feed">
          <div class="inspiration-cards" role="list">
            ${
              picks.length
                ? picks.map((pick) => renderInspirationCard(pick, pick.id === activePick?.id)).join("")
                : state.isChatLoading
                  ? `<div class="inspiration-empty">正在根据 AI 整理目的地推荐…</div>`
                  : `<div class="inspiration-empty">暂未收到目的地推荐，请补充更多偏好</div>`
            }
          </div>
        </div>
        <aside class="inspiration-map-panel" aria-label="目的地地图">
          <div id="inspiration-map" class="inspiration-map" aria-label="探索地图"></div>
        </aside>
      </div>
    </section>
  `;
}

function formatInspirationPickLocation(pick) {
  const region = String(pick.region || "").trim();
  if (!region) return pick.name;
  const isIntl = (pick.themes || []).includes("国外")
    || /(泰国|日本|韩国|新加坡|马来西亚|印尼|越南|菲律宾|澳洲|澳大利亚|欧洲|美国|英国|法国|意大利|新西兰|加拿大)/.test(`${pick.name}${region}`);
  const flag = isIntl ? " 🌏" : "";
  return `${pick.name}, ${region}${flag}`;
}

function formatInspirationPickMeta(pick) {
  if (pick.priceFrom) return `${pick.priceFrom} 起`;
  const days = extractTripDaysFromText(collectUserChatText());
  if (days) return `建议 ${days} 天`;
  return pick.tagline || "";
}

function renderInspirationCard(pick, isActive) {
  return `
    <article class="inspiration-card ${isActive ? "is-active" : ""}" role="listitem" data-inspiration-pick="${escapeAttr(pick.id)}">
      <div class="inspiration-card__frame">
        <button
          type="button"
          class="inspiration-card__media"
          data-action="focus-inspiration-pick"
          data-pick="${escapeAttr(pick.id)}"
          aria-label="查看 ${escapeAttr(pick.name)}"
        >
          ${renderTravelImageMarkup({
            imageKey: `inspiration-${pick.id}`,
            query: pick.highlights?.[0] || pick.name,
            city: pick.name,
            fallback: pick.image,
            extraClass: "inspiration-card__image"
          })}
          <div class="inspiration-card__meta">
            <strong>${escapeHtml(formatInspirationPickLocation(pick))}</strong>
            <span>${escapeHtml(formatInspirationPickMeta(pick))}</span>
          </div>
        </button>
        <button
          class="inspiration-card__select"
          type="button"
          data-action="select-inspiration-pick"
          data-pick="${escapeAttr(pick.id)}"
        >
          <span aria-hidden="true">+</span>
          选择
        </button>
      </div>
    </article>
  `;
}

function scheduleInspirationMapRefresh() {
  if (!isInspirationTrip() || !state.inspiration.picks.length) {
    inspirationMapInstance?.destroy?.();
    inspirationMapInstance = null;
    inspirationMapMarkersByPickId.clear();
    inspirationMapPickSignature = "";
    return;
  }
  queueMicrotask(async () => {
    await hydrateInspirationPickCoordinates();
    await initializeInspirationMap();
  });
}

async function initializeInspirationMap() {
  const container = document.querySelector("#inspiration-map");
  if (!container || !isInspirationTrip()) {
    inspirationMapInstance?.destroy?.();
    inspirationMapInstance = null;
    inspirationMapMarkersByPickId.clear();
    inspirationMapPickSignature = "";
    return;
  }

  const picks = state.inspiration.picks;
  const pickSignature = picks.map((pick) => `${pick.id}:${pick.lng || ""}:${pick.lat || ""}`).join("|");
  const activePickId = state.inspiration.activePickId || picks[0]?.id || null;

  if (inspirationMapInstance && inspirationMapPickSignature === pickSignature) {
    if (activePickId) highlightInspirationPick(activePickId);
    queueMicrotask(() => inspirationMapInstance?.resize?.());
    return;
  }

  try {
    const AMap = await loadAmapSdk();
    const liveContainer = document.querySelector("#inspiration-map");
    if (!liveContainer || !isInspirationTrip()) return;

    const mapView = getInspirationMapView(picks);

    inspirationMapInstance?.destroy?.();
    inspirationMapMarkersByPickId.clear();
    inspirationMapPickSignature = pickSignature;

    inspirationMapInstance = new AMap.Map(liveContainer, {
      center: mapView.center,
      zoom: mapView.zoom,
      viewMode: "2D",
      mapStyle: "amap://styles/normal",
      resizeEnable: true,
      animateEnable: true
    });

    const overlays = picks
      .filter((pick) => Number.isFinite(pick.lng) && Number.isFinite(pick.lat))
      .map((pick) => {
      const isActive = pick.id === activePickId;
      const marker = new AMap.Marker({
        position: [pick.lng, pick.lat],
        content: `
          <button type="button" class="inspiration-map-pill ${isActive ? "is-active" : ""}" data-action="focus-inspiration-pick" data-pick="${escapeAttr(pick.id)}">
            <span class="inspiration-map-pill__dot" aria-hidden="true"></span>
            <span class="inspiration-map-pill__name">${escapeHtml(pick.name)}</span>
          </button>
        `,
        offset: new AMap.Pixel(-72, -18)
      });
      inspirationMapMarkersByPickId.set(pick.id, marker);
      marker.on?.("click", () => {
        setInspirationActivePick(pick.id, { scrollCard: true });
      });
      return marker;
    });

    if (overlays.length) {
      inspirationMapInstance.add(overlays);
      fitInspirationMapOverview();
    }
    queueMicrotask(() => {
      inspirationMapInstance?.resize?.();
      fitInspirationMapOverview();
      if (activePickId) highlightInspirationPick(activePickId);
    });
  } catch {
    inspirationMapMarkersByPickId.clear();
    inspirationMapPickSignature = "";
    container.innerHTML = renderInspirationMapFallback(picks);
    if (activePickId) highlightInspirationPick(activePickId);
  }
}

function setInspirationActivePick(pickId, options = {}) {
  if (!pickId) return;
  if (state.inspiration.activePickId === pickId && !options.scrollCard) {
    highlightInspirationPick(pickId);
    return;
  }

  state.inspiration.activePickId = pickId;
  highlightInspirationPick(pickId);

  if (options.scrollCard) {
    scrollInspirationCardIntoView(pickId);
  }
}

function highlightInspirationPick(pickId) {
  document.querySelectorAll(".inspiration-card[data-inspiration-pick]").forEach((card) => {
    card.classList.toggle("is-active", card.dataset.inspirationPick === pickId);
  });

  document.querySelectorAll(".inspiration-map-pill[data-pick]").forEach((pill) => {
    pill.classList.toggle("is-active", pill.dataset.pick === pickId);
  });
}

function scrollInspirationCardIntoView(pickId) {
  const card = document.querySelector(`.inspiration-card[data-inspiration-pick="${CSS.escape(pickId)}"]`);
  card?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function setupInspirationCardScrollSync(root) {
  inspirationCardObserver?.disconnect();
  inspirationCardObserver = null;

  if (!isInspirationTrip()) return;

  const container = root.querySelector(".inspiration-cards");
  if (!container) return;

  const cards = [...container.querySelectorAll(".inspiration-card[data-inspiration-pick]")];
  if (!cards.length) return;

  inspirationCardObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const topEntry = visible[0];
      if (!topEntry) return;

      const pickId = topEntry.target.dataset.inspirationPick;
      if (!pickId || pickId === state.inspiration.activePickId) return;

      setInspirationActivePick(pickId);
    },
    {
      root: container,
      threshold: [0.35, 0.55, 0.75]
    }
  );

  cards.forEach((card) => inspirationCardObserver.observe(card));
}

function renderInspirationMapFallback(picks) {
  const activePick = picks.find((pick) => pick.id === state.inspiration.activePickId) || picks[0];
  const markers = picks.map((pick) => {
    const x = 18 + ((pick.lng - 73) / (135 - 73)) * 64;
    const y = 82 - ((pick.lat - 18) / (54 - 18)) * 64;
    const isActive = pick.id === activePick?.id;
    return `
      <button
        type="button"
        class="inspiration-map-pill inspiration-map-pill--fallback ${isActive ? "is-active" : ""}"
        style="left:${x}%; top:${y}%"
        data-action="focus-inspiration-pick"
        data-pick="${escapeAttr(pick.id)}"
      >
        <span class="inspiration-map-pill__dot" aria-hidden="true"></span>
        <span class="inspiration-map-pill__name">${escapeHtml(pick.name)}</span>
      </button>
    `;
  }).join("");

  return `
    <div class="inspiration-map-fallback" aria-label="探索地图示意">
      ${markers}
    </div>
  `;
}

function renderEmptyTripView() {
  return `
    <section class="view-panel empty-trip-view" aria-label="空白行程">
      <div class="empty-trip-media" aria-hidden="true">
        <img src="/src/assets/travel-editorial-hero.jpg" alt="" />
      </div>
      <div class="empty-trip-copy">
        <p class="eyebrow">Global travel OS</p>
        <h2>从一个想法，<br />到一段旅途</h2>
        <p>在对话框中告诉我目的地、天数、预算、同行人和旅行偏好，我会生成可编辑的路线、每日时间轴、酒店/机票/门票入口与预算建议。</p>
      </div>
      <div class="empty-trip-prompts">
        <span>例如：东京 5 天，第一次去，想轻松一点</span>
        <span>例如：川西 6 天，自驾，少走回头路</span>
        <span>例如：带父母去新加坡 4 天，酒店交通要方便</span>
      </div>
    </section>
  `;
}

function getPreferredMapPlannerDay(days = getPlanDays(), map = state.mapRoutes.map) {
  if (!days.length) return "ALL";
  const pointCounts = new Map(days.map((day) => [Number(day.day) || 1, 0]));
  const points = Array.isArray(map?.points) ? map.points : [];
  points.forEach((point) => {
    const day = Number(point.day);
    const coords = toAmapLngLat(point);
    if (!pointCounts.has(day) || !coords || !isValidGeoCoordinate(coords[0], coords[1])) return;
    pointCounts.set(day, (pointCounts.get(day) || 0) + 1);
  });
  const ranked = [...pointCounts.entries()].sort((left, right) => right[1] - left[1] || left[0] - right[0]);
  if (ranked[0]?.[1] > 0) return ranked[0][0];
  return Number(days[0]?.day) || "ALL";
}

function ensureValidMapPlannerState() {
  const days = getPlanDays();
  const preferredDay = getPreferredMapPlannerDay(days, state.mapRoutes.map);
  const hasCurrentDay = state.mapPlanner.currentDay === "ALL"
    || days.some((day) => day.day === state.mapPlanner.currentDay);
  if (!hasCurrentDay) {
    state.mapPlanner.currentDay = preferredDay;
    state.mapPlanner.hasManualDaySelection = false;
  }
  if (!state.mapPlanner.hasManualDaySelection && days.length) {
    state.mapPlanner.currentDay = preferredDay;
  }
  const visiblePois = getVisibleMapPois(days);
  if (state.mapPlanner.activePoiId && !getMapPoiById(state.mapPlanner.activePoiId, days)) {
    state.mapPlanner.activePoiId = null;
  }
  if (state.mapPlanner.isEditing && state.mapPlanner.currentDay === "ALL" && days.length) {
    state.mapPlanner.currentDay = preferredDay === "ALL" ? days[0].day : preferredDay;
  }
  if (!visiblePois.length && state.mapPlanner.activePoiId) {
    state.mapPlanner.activePoiId = null;
  }
}

function shouldUseRealAmapMap(map) {
  return Boolean(map) && map.renderMode !== "draft";
}

function isValidGeoCoordinate(lng, lat) {
  const x = Number(lng);
  const y = Number(lat);
  return Number.isFinite(x) && Number.isFinite(y) && x >= 70 && x <= 140 && y >= 15 && y <= 55;
}

function getMapPointIdentity(value) {
  return cleanMapPointName(value)
    .replace(/[\s·•,，。:：()（）/\-]/g, "")
    .toLowerCase();
}

function matchesResolvedMapPoint(expectedName, resolvedNames = []) {
  const expected = getMapPointIdentity(expectedName);
  if (!expected) return false;
  return resolvedNames.some((name) => {
    const resolved = getMapPointIdentity(name);
    return resolved && (resolved === expected || resolved.includes(expected) || expected.includes(resolved));
  });
}

function getMapCoverageSummary(map = state.mapRoutes.map, days = getPlanDays()) {
  const resolvedPoints = (Array.isArray(map?.points) ? map.points : [])
    .filter((point) => isValidGeoCoordinate(point.lng, point.lat));
  const hasRealPoints = map?.renderMode !== "draft" && resolvedPoints.length > 0;
  const unresolvedDays = (Array.isArray(days) ? days : [])
    .map((day) => {
      const expectedNames = [...new Set(
        extractDraftMapPoiItems(day)
          .map((item) => String(item.name || "").trim())
          .filter(Boolean)
      )];
      if (!expectedNames.length) return null;
      const resolvedNames = resolvedPoints
        .filter((point) => Number(point.day) === Number(day.day))
        .map((point) => String(point.name || "").trim())
        .filter(Boolean);
      const unresolvedNames = expectedNames.filter((name) => !matchesResolvedMapPoint(name, resolvedNames));
      return unresolvedNames.length
        ? {
            day: Number(day.day) || 1,
            city: day.city || "",
            expectedNames,
            resolvedNames,
            unresolvedNames
          }
        : null;
    })
    .filter(Boolean);

  return {
    hasRealPoints,
    hasFullCoverage: unresolvedDays.length === 0,
    unresolvedDays
  };
}

function getMapCoverageWarning(map = state.mapRoutes.map, days = getPlanDays()) {
  const coverage = getMapCoverageSummary(map, days);
  if (!coverage.hasRealPoints || coverage.hasFullCoverage) return "";

  const summary = coverage.unresolvedDays
    .slice(0, 3)
    .map((item) => `Day ${item.day} 还差 ${item.unresolvedNames.length} 个点位`)
    .join("；");
  return `${summary}。当前先展示已定位地点，剩余点位待补充高德坐标。`;
}

function normalizeMapLngLat(point) {
  const lng = Number(point?.lng ?? point?.[0]);
  const lat = Number(point?.lat ?? point?.[1]);
  if (!isValidGeoCoordinate(lng, lat)) return null;
  return { lng, lat };
}

function computeRegionalMapView(points, options = {}) {
  const {
    minZoom = 10,
    maxZoom = 15,
    singleZoom = 13,
    defaultCenter = [104.066301, 30.572961],
    defaultZoom = 11
  } = options;

  const valid = (Array.isArray(points) ? points : [])
    .map(normalizeMapLngLat)
    .filter(Boolean);

  if (!valid.length) {
    return { center: defaultCenter, zoom: defaultZoom };
  }

  if (valid.length === 1) {
    return { center: [valid[0].lng, valid[0].lat], zoom: singleZoom };
  }

  const lngs = valid.map((point) => point.lng);
  const lats = valid.map((point) => point.lat);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const center = [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
  const span = Math.max(maxLng - minLng, maxLat - minLat);

  let zoom = 12;
  if (span < 0.015) zoom = 14;
  else if (span < 0.05) zoom = 13;
  else if (span < 0.12) zoom = 12;
  else if (span < 0.35) zoom = 11;
  else if (span < 0.8) zoom = 10;
  else if (span < 2.5) zoom = 8;
  else if (span < 8) zoom = 6;
  else zoom = 5;

  return {
    center,
    zoom: Math.min(maxZoom, Math.max(minZoom, zoom))
  };
}

function getInspirationCityMapView(picks = state.inspiration.picks) {
  const safePicks = (picks || []).filter(
    (pick) => Number.isFinite(pick.lng) && Number.isFinite(pick.lat)
  );
  if (!safePicks.length) {
    return { center: [104.066301, 30.572961], zoom: 5 };
  }

  const anchor = getInspirationAnchor();
  const focusPick = (anchor && safePicks.find((pick) => pick.name === anchor))
    || safePicks.find((pick) => pick.id === state.inspiration.activePickId)
    || safePicks[0];

  return {
    center: [focusPick.lng, focusPick.lat],
    zoom: 10
  };
}

function getInspirationMapView(picks = state.inspiration.picks) {
  const safePicks = (picks || []).filter(
    (pick) => Number.isFinite(pick.lng) && Number.isFinite(pick.lat)
  );
  const pickPoints = safePicks.map((pick) => ({ lng: pick.lng, lat: pick.lat }));
  if (!pickPoints.length) {
    return { center: [104.066301, 30.572961], zoom: 5 };
  }

  const anchor = getInspirationAnchor();
  if (anchor || safePicks.length === 1) {
    return getInspirationCityMapView(safePicks);
  }

  const subSpots = getInspirationSpotsForAnchor(anchor);
  const isRegionalSpotMode = subSpots.length >= 3
    && safePicks.length > 1
    && safePicks.every((pick) => pick.parentDestination);

  if (isRegionalSpotMode) {
    return computeRegionalMapView(pickPoints, {
      minZoom: 9,
      maxZoom: 12,
      singleZoom: 11,
      defaultCenter: [pickPoints[0].lng, pickPoints[0].lat],
      defaultZoom: 11
    });
  }

  return computeRegionalMapView(pickPoints, {
    minZoom: 4,
    maxZoom: 7,
    singleZoom: 7,
    defaultZoom: 5
  });
}

function fitInspirationMapOverview() {
  if (!inspirationMapInstance) return;

  const picks = (state.inspiration.picks || []).filter(
    (pick) => Number.isFinite(pick.lng) && Number.isFinite(pick.lat)
  );
  const anchor = getInspirationAnchor();
  const subSpots = anchor ? getInspirationSpotsForAnchor(anchor) : [];
  const isRegionalSpotMode = subSpots.length >= 3
    && picks.length > 1
    && picks.every((pick) => pick.parentDestination);

  let view;
  if (isRegionalSpotMode) {
    view = computeRegionalMapView(
      picks.map((pick) => ({ lng: pick.lng, lat: pick.lat })),
      {
        minZoom: 9,
        maxZoom: 12,
        singleZoom: 11,
        defaultCenter: [picks[0].lng, picks[0].lat],
        defaultZoom: 11
      }
    );
  } else if (anchor || picks.length === 1) {
    view = getInspirationCityMapView(picks);
  } else {
    view = getInspirationMapView(picks);
  }

  if (typeof inspirationMapInstance.setZoomAndCenter === "function") {
    inspirationMapInstance.setZoomAndCenter(view.zoom, view.center);
    return;
  }
  inspirationMapInstance.setZoom(view.zoom);
  inspirationMapInstance.setCenter(view.center);
}

function getAmapMapCenterFallback() {
  const points = state.mapRoutes.map?.points || [];
  const first = points.find((point) => isValidGeoCoordinate(point.lng, point.lat));
  if (first) return [Number(first.lng), Number(first.lat)];

  for (const name of resolveTripDestinationNames()) {
    const catalog = findCatalogDestinationByName(name);
    if (catalog) return [catalog.lng, catalog.lat];
  }

  for (const city of state.route) {
    const catalog = findCatalogDestinationByName(city.city);
    if (catalog) return [catalog.lng, catalog.lat];
  }

  return [104.066301, 30.572961];
}

function getTripMapView(map = state.mapRoutes.map) {
  const points = [
    ...(map?.points || []),
    ...(map?.segments || []).flatMap((segment) => segment.path || [])
  ];
  const anchor = getInspirationAnchor();
  const anchorCatalog = anchor ? findCatalogDestinationByName(anchor) : null;

  for (const name of resolveTripDestinationNames()) {
    const catalog = findCatalogDestinationByName(name);
    if (catalog) points.push({ lng: catalog.lng, lat: catalog.lat });
  }

  state.route.forEach((city) => {
    const catalog = findCatalogDestinationByName(city.city);
    if (catalog) points.push({ lng: catalog.lng, lat: catalog.lat });
  });

  return computeRegionalMapView(points, {
    minZoom: 4,
    maxZoom: 13,
    singleZoom: 12,
    defaultCenter: anchorCatalog ? [anchorCatalog.lng, anchorCatalog.lat] : getAmapMapCenterFallback(),
    defaultZoom: 11
  });
}

function getAmapBaseFitViewConfig(containerId) {
  if (containerId === "canvas-amap-real-map") {
    return { padding: [32, 44, 32, 44], maxZoom: 13 };
  }
  if (containerId === "doc-amap-real-map") {
    return { padding: [72, 120, 72, 96], maxZoom: 12 };
  }
  return { padding: [88, 132, 88, 104], maxZoom: 12 };
}

function getVisibleStageRects(stage, selector) {
  return [...stage.querySelectorAll(selector)]
    .filter((node) => node instanceof HTMLElement)
    .map((node) => {
      const style = window.getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) return null;
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return null;
      return rect;
    })
    .filter(Boolean);
}

function getAmapFitViewConfig(containerId, mapContainer = null) {
  const base = getAmapBaseFitViewConfig(containerId);
  const resolvedContainer = mapContainer instanceof HTMLElement
    ? mapContainer
    : (containerId ? document.getElementById(containerId) : null);
  const stage = resolvedContainer?.closest(".map-stage");
  if (!stage) return base;

  const stageRect = stage.getBoundingClientRect();
  if (!stageRect.width || !stageRect.height) return base;

  const padding = [...base.padding];
  const hasTallPlannerControls = getVisibleStageRects(stage, ".map-planner-controls")
    .some((rect) => rect.height >= 72);
  const applyTopInset = (selector, gap = 14) => {
    const inset = Math.max(
      0,
      ...getVisibleStageRects(stage, selector)
        .filter((rect) => rect.top <= stageRect.top + stageRect.height * 0.45)
        .map((rect) => rect.bottom - stageRect.top)
    );
    if (inset > 0) padding[0] = Math.max(padding[0], Math.ceil(inset + gap));
  };
  const applyRightInset = (selector, gap = 14) => {
    const inset = Math.max(
      0,
      ...getVisibleStageRects(stage, selector)
        .filter((rect) => rect.right >= stageRect.right - stageRect.width * 0.45)
        .map((rect) => stageRect.right - rect.left)
    );
    if (inset > 0) padding[1] = Math.max(padding[1], Math.ceil(inset + gap));
  };
  const applyBottomInset = (selector, gap = 14) => {
    const inset = Math.max(
      0,
      ...getVisibleStageRects(stage, selector)
        .filter((rect) => rect.bottom >= stageRect.bottom - stageRect.height * 0.45)
        .map((rect) => stageRect.bottom - rect.top)
    );
    if (inset > 0) padding[2] = Math.max(padding[2], Math.ceil(inset + gap));
  };

  applyTopInset(".map-planner-controls", hasTallPlannerControls ? 44 : 18);
  applyTopInset(".amap-real-state--compact.amap-real-state--warning", 16);
  applyTopInset(".map-edit-panel, .map-itinerary-overlay", 18);
  applyRightInset(".map-edit-panel, .map-itinerary-overlay", 18);
  applyRightInset(".map-edit-toggle", 18);
  applyRightInset(".amap-real-state--compact:not(.amap-real-state--warning)", 14);
  applyBottomInset(".amap-real-attribution, .map-poi-sheet", 16);
  applyRightInset(".amap-real-attribution", 16);

  return { ...base, padding };
}

function getMapDayFilterForContainer(containerId) {
  if (containerId === "canvas-amap-real-map" || containerId === "doc-amap-real-map") return "ALL";
  return state.mapPlanner.currentDay;
}

function shouldShowTripMapInView() {
  return (state.view === "doc" || state.view === "canvas" || state.view === "free2")
    && !isInspirationTrip()
    && state.route.length > 0;
}

function shouldShowRealAmapMapUI() {
  return shouldShowTripMapInView() && shouldUseRealAmapMap(state.mapRoutes.map);
}

function getActiveAmapContainerId() {
  if (state.view === "canvas") return "canvas-amap-real-map";
  if (state.view === "doc") return "doc-amap-real-map";
  if (state.view === "free2") return "amap-real-map";
  return "";
}

function rememberAmapViewState(mapInstance, containerId = getActiveAmapContainerId()) {
  if (!mapInstance || !containerId) return;
  const center = mapInstance.getCenter?.();
  const zoom = mapInstance.getZoom?.();
  if (!center || !Number.isFinite(zoom)) return;
  const lng = typeof center.getLng === "function" ? center.getLng() : center.lng;
  const lat = typeof center.getLat === "function" ? center.getLat() : center.lat;
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) return;
  amapLastViewState = { containerId, center: [lng, lat], zoom };
}

function bindAmapViewPersistence(mapInstance, containerId) {
  if (!mapInstance || mapInstance._tripViewBound) return;
  mapInstance._tripViewBound = true;
  const persist = () => rememberAmapViewState(mapInstance, containerId);
  mapInstance.on?.("moveend", persist);
  mapInstance.on?.("zoomend", persist);
}

function renderPreservingMap() {
  requestHomeRender?.({ preserveMapView: true });
}

function updateMapPoiSelection(poiId) {
  state.mapPlanner.activePoiId = poiId || null;
  
  document.querySelectorAll("[data-map-poi]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.mapPoi === state.mapPlanner.activePoiId);
  });
  document.querySelectorAll(".custom-map-marker[data-poi]").forEach((item) => {
    item.setAttribute("aria-pressed", String(item.dataset.poi === state.mapPlanner.activePoiId));
  });
  document.querySelectorAll("[data-map-marker-poi]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.mapMarkerPoi === state.mapPlanner.activePoiId);
  });
}

function refreshMapInspectorPanel() {
  document.querySelectorAll(".map-inspector").forEach((panel) => {
    panel.innerHTML = renderAmapRoutePanel();
  });
}

function updateMapDayFilter(dayFilter, options = {}) {
  state.mapPlanner.currentDay = dayFilter;
  if (options.manual !== false) state.mapPlanner.hasManualDaySelection = true;
  updateMapPoiSelection(null);

  document.querySelectorAll(".map-day-tabs [data-day]").forEach((button) => {
    const active = normalizeMapPlannerDay(button.dataset.day) === dayFilter;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  const containerId = getActiveAmapContainerId();
  const container = containerId ? document.getElementById(containerId) : null;
  if (container) container.dataset.mapDayFilter = String(dayFilter);

  const stage = document.querySelector(".map-stage");
  stage?.querySelector(".map-edit-panel")?.remove();
  if (state.mapPlanner.isEditing) {
    stage?.insertAdjacentHTML(
      "beforeend",
      renderMapEditingOverlay(getVisibleMapPois(getPlanDays(), dayFilter))
    );
  }
  refreshMapInspectorPanel();

  if (amapMapInstance && window.AMap) {
    renderAmapOverlays(window.AMap, amapMapInstance, {
      preserveView: false,
      containerId,
      dayFilter
    });
  } else {
    const canvas = stage?.querySelector(".custom-map-canvas");
    if (canvas) {
      canvas.outerHTML = renderCustomAmapCanvas(state.mapRoutes.map, getPlanDays(), { dayFilter });
    }
  }
}

function scheduleAmapMapRefresh(options = {}) {
  if (!shouldShowRealAmapMapUI()) {
    amapMapInstance?.destroy?.();
    amapMapInstance = null;
    return;
  }
  queueMicrotask(() => {
    void initializeAmapMap(options);
  });
}

function renderAmapMcpMapStage(options = {}) {
  const embedded = options.embedded === true;
  const preview = options.preview === true;
  const minimal = options.minimal === true;
  const mapElementId = preview
    ? "canvas-amap-real-map"
    : embedded
      ? "doc-amap-real-map"
      : "amap-real-map";
  const map = state.mapRoutes.map;
  const hasPoints = Array.isArray(map?.points) && map.points.length;
  const isDraftMap = map?.renderMode === "draft";
  const useRealMap = shouldShowRealAmapMapUI();
  const hasRealOverlays = shouldUseRealAmapMap(map);
  const days = getPlanDays();
  const mapDayFilter = preview || embedded ? "ALL" : state.mapPlanner.currentDay;
  const pois = getVisibleMapPois(days, mapDayFilter);
  const activePoi = getMapPoiById(state.mapPlanner.activePoiId, days);
  const coverage = getMapCoverageSummary(map, days);
  const attributionText = isDraftMap
    ? "行程草图 · 等待真实坐标"
    : hasRealOverlays
      ? coverage.hasFullCoverage
        ? state.mapRoutes.routesLoading
          ? "高德地图 · 标记已加载，路线补充中"
          : "高德地图 · 真实坐标"
        : "高德地图 · 已定位部分点位"
      : "高德地图 · 底图已就绪";
  const stageClass = [
    "map-stage",
    useRealMap ? "amap-real-stage" : "custom-amap-stage",
    embedded ? "map-stage--doc-embed" : "",
    preview ? "map-stage--canvas-preview" : ""
  ].filter(Boolean).join(" ");

  return `
    <div class="${stageClass}">
      ${
        useRealMap
          ? `<div id="${mapElementId}" class="amap-real-map" data-map-day-filter="${escapeAttr(mapDayFilter)}" aria-label="高德地图"></div>`
          : renderCustomAmapCanvas(map, days, { dayFilter: mapDayFilter })
      }
      ${preview || minimal ? "" : renderMapPlannerControls(days)}
      ${
        !minimal && state.mapRoutes.loading
          ? `<div class="amap-real-state amap-real-state--compact">点位加载中…</div>`
          : !minimal && state.mapRoutes.routesLoading
            ? `<div class="amap-real-state amap-real-state--compact">路线细化中…</div>`
          : ""
      }
      ${
        !minimal && !preview && !state.mapRoutes.loading && !state.mapRoutes.routesLoading && !hasPoints
          ? `<div class="amap-real-state amap-real-state--compact">暂无可绘制路线，请点击「检查交通」重新查询。</div>`
          : ""
      }
      ${
        !minimal && !preview && (hasPoints || hasRealOverlays)
          ? `<div class="amap-real-attribution">${escapeHtml(attributionText)}</div>`
          : ""
      }
      ${
        !minimal && !preview && state.mapPlanner.isEditing
          ? renderMapEditingOverlay(pois)
          : ""
      }
      ${!minimal && activePoi ? renderMapPoiDetailCard(activePoi, { compact: preview }) : ""}
    </div>
  `;
}

function renderCustomAmapCanvas(map, days, options = {}) {
  const dayFilter = options.dayFilter ?? state.mapPlanner.currentDay;
  const points = filterMapPointsByDay(map?.points || [], dayFilter);
  const segments = filterMapSegmentsByDay(map?.segments || [], dayFilter);
  const projection = createCustomMapProjection(map, points, segments);
  const dayColors = getMapDayColors(days);
  const isDraftMap = map?.renderMode === "draft";

  const routeLines = segments
    .map((segment) => {
      const path = (segment.path || []).map(projection).filter(Boolean);
      if (path.length < 2) return "";
      return `
        <polyline
          class="custom-map-route ${isDraftMap ? "custom-map-route--draft" : ""}"
          points="${path.map((point) => `${point.x},${point.y}`).join(" ")}"
          style="--route-color: ${dayColors.get(Number(segment.day)) || "#0757ff"}"
        />
      `;
    })
    .join("");

  const markers = points
    .map((point) => renderCustomMapMarker(point, projection, dayColors))
    .join("");

  return `
    <div class="custom-map-canvas ${isDraftMap ? "is-draft" : ""}" aria-label="高德 MCP 自定义地图">
      <div class="custom-map-basemap" aria-hidden="true">
        <span class="custom-road custom-road--one"></span>
        <span class="custom-road custom-road--two"></span>
        <span class="custom-road custom-road--three"></span>
        <span class="custom-water custom-water--one"></span>
        <span class="custom-water custom-water--two"></span>
        <span class="custom-place custom-place--one">${escapeHtml(getPrimaryMapPlace(points, days))}</span>
        <span class="custom-place custom-place--two">高德坐标</span>
      </div>
      <svg class="custom-map-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        ${routeLines}
      </svg>
      ${markers}
      ${renderCustomMapLegend(days, dayColors, dayFilter)}
    </div>
  `;
}

function filterMapPointsByDay(points, dayFilter = state.mapPlanner.currentDay) {
  if (dayFilter === "ALL") return points;
  return points.filter((point) => Number(point.day) === Number(dayFilter));
}

function filterMapSegmentsByDay(segments, dayFilter = state.mapPlanner.currentDay) {
  if (dayFilter === "ALL") return segments;
  return segments.filter((segment) => Number(segment.day) === Number(dayFilter));
}

function renderCustomMapMarker(point, projection, dayColors) {
  const pos = projection(point);
  if (!pos) return "";
  const poiId = getPoiIdForMapPoint(point);
  const color = dayColors.get(Number(point.day)) || "#0757ff";
  return `
    <button
      type="button"
      class="custom-map-marker trip-map-marker"
      style="--x: ${pos.x}%; --y: ${pos.y}%; --marker-color: ${color}"
      data-action="select-map-poi"
      data-poi="${escapeAttr(poiId)}"
      data-map-marker-poi="${escapeAttr(poiId)}"
      aria-label="${escapeAttr(point.name)}"
    >
      ${Number(point.order) === 1 ? `<em class="trip-map-marker__day">Day ${Number(point.day) || 1}</em>` : ""}
      <span class="trip-map-marker__dot">${escapeHtml(point.order || "")}</span>
      <strong class="trip-map-marker__name">${escapeHtml(point.name)}</strong>
    </button>
  `;
}

function renderCustomMapLegend(days, dayColors, dayFilter = state.mapPlanner.currentDay) {
  const isDraftMap = state.mapRoutes.map?.renderMode === "draft";
  const visibleDays = dayFilter === "ALL"
    ? days
    : days.filter((day) => Number(day.day) === Number(dayFilter));
  return `
    <aside class="custom-map-legend" aria-label="行程路线图例">
      <strong>${isDraftMap ? "行程草图" : "行程路线"}</strong>
      ${visibleDays.map((day) => `
        <span>
          <i style="--route-color: ${dayColors.get(Number(day.day)) || "#0757ff"}"></i>
          Day ${day.day}: ${escapeHtml(day.title || day.city)}
        </span>
      `).join("")}
    </aside>
  `;
}

function createCustomMapProjection(map, points, segments) {
  const bounds = map?.bounds || createBoundsFromClientMap(points, segments);
  const minLng = Number(bounds?.minLng);
  const maxLng = Number(bounds?.maxLng);
  const minLat = Number(bounds?.minLat);
  const maxLat = Number(bounds?.maxLat);
  const lngSpan = Math.max(0.001, maxLng - minLng);
  const latSpan = Math.max(0.001, maxLat - minLat);
  const padding = 8;

  return (point) => {
    const lng = Number(point?.lng);
    const lat = Number(point?.lat);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
    return {
      x: padding + ((lng - minLng) / lngSpan) * (100 - padding * 2),
      y: 100 - padding - ((lat - minLat) / latSpan) * (100 - padding * 2)
    };
  };
}

function createBoundsFromClientMap(points, segments) {
  const all = [
    ...(points || []),
    ...(segments || []).flatMap((segment) => segment.path || [])
  ].filter((point) => Number.isFinite(Number(point.lng)) && Number.isFinite(Number(point.lat)));
  if (!all.length) return { minLng: 0, maxLng: 1, minLat: 0, maxLat: 1 };
  const lngs = all.map((point) => Number(point.lng));
  const lats = all.map((point) => Number(point.lat));
  return {
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats)
  };
}

function getMapDayColors(days) {
  const palette = ["#ec5ac8", "#a855f7", "#63cf19", "#ff9f1c", "#18a9f5", "#ef476f"];
  return new Map(days.map((day, index) => [Number(day.day), palette[index % palette.length]]));
}

function getPoiIdForMapPoint(point) {
  const day = getPlanDays().find((item) => Number(item.day) === Number(point.day));
  if (!day) return "";
  const index = Math.max(0, Number(point.order || 1) - 1);
  return `poi-${day.id}-${index}`;
}

function getPrimaryMapPlace(points, days) {
  const resolved = resolveTripDestinationNames(days, state.tripGuide);
  if (resolved.length) return resolved[0];
  const city = points[0]?.city || days[0]?.city || "";
  return isPlaceholderDestination(city) ? "目的地" : city;
}

const TRIP_DESTINATION_ALIASES = [
  { pattern: /千岛湖|梅峰|天屿山|天屿|芹川|进贤湾|中心湖区|东南湖区|啤酒小镇|骑龙巷|鱼头/, name: "千岛湖" },
  { pattern: /西湖|灵隐|河坊街|西溪|宋城|京杭大运河/, name: "杭州" },
  { pattern: /外滩|迪士尼|陆家嘴|武康路|豫园/, name: "上海" },
  { pattern: /故宫|颐和园|天坛|南锣鼓巷|什刹海/, name: "北京" },
  { pattern: /宽窄巷子|大熊猫|春熙路|武侯祠|都江堰/, name: "成都" },
  { pattern: /西安|兵马俑|大唐不夜城|回民街|钟楼/, name: "西安" },
  { pattern: /鼓浪屿|曾厝垵|中山路|集美学村/, name: "厦门" },
  { pattern: /大理|洱海|大理古城|玉龙雪山|束河|泸沽湖|喜洲|苍山/, name: "大理" },
  { pattern: /喀什|帕米尔|塔什库尔干|塔县|艾提尕尔|香妃墓|白沙湖|卡拉库里/, name: "喀什" },
  { pattern: /亚龙湾|天涯海角|蜈支洲岛|骑楼/, name: "三亚" }
];

function isPlaceholderDestination(name) {
  const value = String(name || "").trim();
  return !value || value === "目的地" || /^目的地\s*\d*$/.test(value);
}

function inferPrimaryDestinationFromText(text, depth = 0) {
  const source = String(text || "").trim();
  if (!source || depth > 5) return "";

  const leadingDestination = extractLeadingTripDestination(source);
  if (leadingDestination) return leadingDestination;

  for (const alias of TRIP_DESTINATION_ALIASES) {
    if (alias.pattern.test(source)) return alias.name;
  }

  const bracketMatches = [...source.matchAll(/【([\u4e00-\u9fa5]{2,12})】/g)].map((match) => match[1]);
  for (const name of bracketMatches) {
    if (name === source) continue;
    const resolved = inferPrimaryDestinationFromText(name, depth + 1);
    if (resolved && !isPlaceholderDestination(resolved)) return resolved;
    if (!isPlaceholderDestination(name)) return name;
  }

  const placeMatches = [...source.matchAll(/([\u4e00-\u9fa5]{2,8}(?:湖|岛|山|江|河|湾|城|镇|县|市|谷|原|草原|沙漠|古城|古镇|老街))/g)].map(
    (match) => match[1]
  );
  for (const name of placeMatches) {
    if (name === source) {
      if (isConcreteDestinationName(name)) return name;
      continue;
    }
    for (const alias of TRIP_DESTINATION_ALIASES) {
      if (alias.pattern.test(name)) return alias.name;
    }
    if (isConcreteDestinationName(name)) return name;
  }

  return "";
}

function resolveTripDestinationNames(days = getPlanDays(), guide = state.tripGuide) {
  const names = [];

  const addName = (value) => {
    const name = String(value || "").trim();
    if (isConcreteDestinationName(name) && !names.includes(name)) names.push(name);
  };

  state.route.forEach((city) => addName(city.city));

  String(guide?.overview?.destinations || "")
    .split(/[、,，/|]/)
    .forEach(addName);

  days.forEach((day) => addName(day.city));

  if (!names.length) {
    const tripText = getTripContext(days).tripText;
    addName(inferPrimaryDestinationFromText(tripText));
  }

  if (!names.length) {
    [...state.chat]
      .reverse()
      .filter((message) => message.role === "user")
      .slice(0, 6)
      .forEach((message) => addName(inferPrimaryDestinationFromText(message.text)));
  }

  return names;
}

function shouldRefreshDocumentTitle(title) {
  if (!title) return true;
  return /目的地/.test(title);
}

function renderMapPlannerControls(days) {
  const currentDay = state.mapPlanner.currentDay;
  const dayTabs = [
    `<button type="button" class="${currentDay === "ALL" ? "is-active" : ""}" data-action="set-map-day" data-day="ALL">All Days</button>`,
    ...days.map((day) => `
      <button type="button" class="${currentDay === day.day ? "is-active" : ""}" data-action="set-map-day" data-day="${day.day}">
        Day ${day.day}
      </button>
    `)
  ].join("");

  return `
    <div class="map-planner-controls">
      <div class="map-day-tabs" role="tablist" aria-label="地图日期筛选">
        ${dayTabs}
      </div>
      <button
        type="button"
        class="map-edit-toggle ${state.mapPlanner.isEditing ? "is-active" : ""}"
        data-action="toggle-map-edit"
        aria-pressed="${state.mapPlanner.isEditing}"
      >
        <span></span>
        Edit Mode
      </button>
    </div>
  `;
}

function renderMapEditingOverlay(pois) {
  if (state.mapPlanner.currentDay === "ALL") {
    return `
      <div class="map-edit-panel">
        <div class="map-overlay-head">
          <strong>Drag to reorder</strong>
          <span>选择某一天后编辑</span>
        </div>
        <p class="map-overlay-empty">请先选择 Day 1、Day 2 等单日视图，再拖拽调整 POI 顺序。</p>
      </div>
    `;
  }

  return `
    <div class="map-edit-panel" aria-label="拖拽编辑 POI 顺序">
      <div class="map-overlay-head">
        <strong>Drag to reorder</strong>
        <span>Day ${state.mapPlanner.currentDay}</span>
      </div>
      <div class="map-dnd-list">
        ${pois.map(renderMapDraggablePoi).join("")}
      </div>
    </div>
  `;
}

function renderMapDraggablePoi(poi) {
  return `
    <article
      class="map-dnd-poi ${state.mapPlanner.activePoiId === poi.id ? "is-active" : ""}"
      draggable="true"
      data-map-poi="${poi.id}"
      data-map-poi-drop="${poi.id}"
      data-action="select-map-poi"
      data-poi="${poi.id}"
    >
      <span class="map-dnd-handle" aria-hidden="true">::</span>
      <div>
        <strong>${escapeHtml(poi.title)}</strong>
        <em>${escapeHtml(poi.time || "待定")} · ${escapeHtml(poi.category)}</em>
      </div>
    </article>
  `;
}

function renderMapPoiDetailCard(poi, options = {}) {
  const compact = options.compact === true;
  return `
    <article class="map-poi-sheet${compact ? " map-poi-sheet--compact" : ""}">
      <button type="button" class="map-poi-close" data-action="close-map-poi" aria-label="关闭 POI 详情">×</button>
      <span>D${poi.day} · Stop ${poi.sequence}</span>
      <h3>${escapeHtml(poi.title)}</h3>
      <p>${escapeHtml(poi.detail || "暂无详情")}</p>
      <div>
        <em>${escapeHtml(poi.time || "待定")}</em>
        <em>${escapeHtml(poi.category)}</em>
      </div>
    </article>
  `;
}

function normalizeMapPlannerDay(value) {
  if (value === "ALL") return "ALL";
  const day = Number(value);
  return Number.isFinite(day) ? day : "ALL";
}

function getVisibleMapDays(days = getPlanDays(), dayFilter = state.mapPlanner.currentDay) {
  return days.filter((day) => dayFilter === "ALL" || day.day === dayFilter);
}

function getVisibleMapPois(days = getPlanDays(), dayFilter = state.mapPlanner.currentDay) {
  const visibleDays = getVisibleMapDays(days, dayFilter);
  const resolvedByDay = new Map();
  const mapPoints = Array.isArray(state.mapRoutes.map?.points) ? state.mapRoutes.map.points : [];
  mapPoints
    .filter((point) => dayFilter === "ALL" || Number(point.day) === Number(dayFilter))
    .filter((point) => {
      const title = cleanMapPointName(point.name || "");
      if (!title || isGenericMapPoint(title)) return false;
      const coords = toAmapLngLat(point);
      return !shouldUseRealAmapMap(state.mapRoutes.map) || (coords && isValidGeoCoordinate(coords[0], coords[1]));
    })
    .forEach((point) => {
      const day = days.find((item) => Number(item.day) === Number(point.day));
      const poi = createResolvedMapPoi(day, point);
      if (!poi) return;
      const key = Number(poi.day) || 1;
      if (!resolvedByDay.has(key)) resolvedByDay.set(key, []);
      resolvedByDay.get(key).push(poi);
    });

  const fallbackByDay = new Map();
  visibleDays.forEach((day) => {
    const schedule = Array.isArray(day.schedule) ? day.schedule : [];
    schedule.forEach((activity, index) => {
      const poi = createMapPoi(day, activity, index);
      if (!poi) return;
      const key = Number(day.day) || 1;
      if (!fallbackByDay.has(key)) fallbackByDay.set(key, []);
      fallbackByDay.get(key).push(poi);
    });
  });

  return visibleDays
    .flatMap((day) => {
      const key = Number(day.day) || 1;
      return resolvedByDay.get(key)?.length ? resolvedByDay.get(key) : (fallbackByDay.get(key) || []);
    })
    .sort((a, b) => (Number(a.day) - Number(b.day)) || (Number(a.sequence) - Number(b.sequence)));
}

function createResolvedMapPoi(day, point) {
  const scheduleIndex = getResolvedMapPoiScheduleIndex(day, point);
  return {
    id: scheduleIndex != null && day?.id
      ? `poi-${day.id}-${scheduleIndex}`
      : `map-point-${point.id || `${point.day}-${point.order}-${point.name}`}`,
    dayId: day?.id || "",
    day: Number(point.day) || 1,
    city: point.city || day?.city || "",
    title: point.name || "未命名 POI",
    detail: point.detail || point.district || "",
    time: point.time || "",
    sequence: point.order || 1,
    category: getActivityCategory(point.name || "", Math.max(0, (scheduleIndex ?? (point.order || 1)) - 1)),
    coordinates: toAmapLngLat(point),
    isEstimated: false
  };
}

function getResolvedMapPoiScheduleIndex(day, point) {
  const match = /^d\d+-p(\d+)(?:-\d+)?$/.exec(String(point?.id || ""));
  const index = Number(match?.[1]);
  const scheduleLength = Array.isArray(day?.schedule) ? day.schedule.length : 0;
  if (!Number.isInteger(index) || index < 0 || index >= scheduleLength) return null;
  return index;
}

function createMapPoi(day, activity, index) {
  const normalizedTitle = extractDraftMapPoiNames(activity?.title, day?.city)[0];
  if (!normalizedTitle) return null;
  const normalizedActivity = { ...activity, title: normalizedTitle };
  const coords = resolveMapPoiCoordinates(day, normalizedActivity, index);
  return {
    id: `poi-${day.id}-${index}`,
    dayId: day.id,
    day: day.day,
    city: day.city,
    title: normalizedTitle,
    detail: activity.detail || "",
    time: activity.time || "",
    sequence: index + 1,
    category: getActivityCategory(activity.title || normalizedTitle, index),
    coordinates: coords.coordinates,
    isEstimated: coords.isEstimated
  };
}

function getMapPoiById(id, days = getPlanDays()) {
  if (!id) return null;
  return getVisibleMapPois(days).find((poi) => poi.id === id)
    || getVisibleMapPois(days, "ALL").find((poi) => poi.id === id)
    || null;
}

function findAmapCoordinatesForActivity(day, activity, index) {
  const candidates = state.mapRoutes.map?.points || [];
  const titles = [
    cleanMapPointName(activity?.title || ""),
    ...extractDraftMapPoiNames(activity?.title, day?.city)
  ]
    .map((value) => cleanMapPointName(value))
    .filter(Boolean);
  const matched = candidates.find((point) => {
    if (Number(point.day) !== Number(day.day)) return false;
    const name = cleanMapPointName(point.name || "");
    return titles.some((title) => areRouteNamesCompatible(name, title));
  });
  if (!matched) return null;
  return toAmapLngLat(matched);
}

function resolveMapPoiCoordinates(day, activity, index) {
  const exact = findAmapCoordinatesForActivity(day, activity, index);
  if (exact && isValidGeoCoordinate(exact[0], exact[1])) {
    return { coordinates: exact, isEstimated: false };
  }
  const estimated = estimateMapPoiCoordinates(day);
  return {
    coordinates: estimated,
    isEstimated: Boolean(estimated)
  };
}

function estimateMapPoiCoordinates(day) {
  const points = Array.isArray(state.mapRoutes.map?.points) ? state.mapRoutes.map.points : [];
  const dayPoints = points
    .filter((point) => Number(point.day) === Number(day?.day))
    .map(toAmapLngLat)
    .filter((coords) => coords && isValidGeoCoordinate(coords[0], coords[1]));
  if (dayPoints.length) return dayPoints[0];

  const daySegments = (Array.isArray(state.mapRoutes.map?.segments) ? state.mapRoutes.map.segments : [])
    .filter((segment) => Number(segment.day) === Number(day?.day))
    .flatMap((segment) => Array.isArray(segment.path) && segment.path.length
      ? segment.path
      : [segment.origin, segment.destination])
    .map(toAmapLngLat)
    .filter((coords) => coords && isValidGeoCoordinate(coords[0], coords[1]));
  if (daySegments.length) return daySegments[0];

  const city = String(day?.city || "").trim();
  if (city) {
    const cityPoints = points
      .filter((point) => String(point.city || "").trim() === city)
      .map(toAmapLngLat)
      .filter((coords) => coords && isValidGeoCoordinate(coords[0], coords[1]));
    if (cityPoints.length) return cityPoints[0];

    const catalog = findCatalogDestinationByName(city);
    if (catalog && Number.isFinite(catalog.lng) && Number.isFinite(catalog.lat)) {
      return [catalog.lng, catalog.lat];
    }
  }

  const fallback = getAmapMapCenterFallback();
  return Array.isArray(fallback) && fallback.length === 2 ? fallback : null;
}

function reorderMapPoi(sourcePoiId, targetPoiId) {
  if (sourcePoiId === targetPoiId) return sourcePoiId;
  const source = parseMapPoiId(sourcePoiId);
  const target = parseMapPoiId(targetPoiId);
  if (!source || !target || source.dayId !== target.dayId) return null;

  const edit = ensureDayEdit(source.dayId);
  const [moved] = edit.schedule.splice(source.index, 1);
  if (!moved) return null;
  const targetIndex = source.index < target.index ? target.index - 1 : target.index;
  edit.schedule.splice(targetIndex, 0, moved);
  return `poi-${source.dayId}-${targetIndex}`;
}

function parseMapPoiId(id) {
  const match = /^poi-(.+)-(\d+)$/.exec(String(id || ""));
  if (!match) return null;
  return {
    dayId: match[1],
    index: Number(match[2])
  };
}

async function initializeAmapMap(options = {}) {
  const container = document.querySelector("#amap-real-map, #doc-amap-real-map, #canvas-amap-real-map");
  if (!container) {
    amapMapInstance?.destroy?.();
    amapMapInstance = null;
    return;
  }

  const initToken = ++amapInitToken;
  const isPreviewMap = container.id === "canvas-amap-real-map";
  const routeSignature = state.mapRoutes.signature || "";
  if (routeSignature !== amapLastRouteSignature) {
    amapLastRouteSignature = routeSignature;
    amapLastViewState = null;
  }

  const savedView = options.preserveMapView && amapLastViewState?.containerId === container.id ? amapLastViewState : null;
  const preserveView = Boolean(savedView);
  const defaultView = getTripMapView();
  const initialCenter = savedView?.center || defaultView.center;
  const initialZoom = savedView?.zoom ?? defaultView.zoom;

  if (!savedView) container.classList.add("is-booting");
  const overlay = container.closest(".map-stage")?.querySelector(".amap-real-state:not(.amap-real-state--compact)");
  try {
    const AMap = await loadAmapSdk();
    if (initToken !== amapInitToken) return;

    const liveContainer = document.querySelector("#amap-real-map, #doc-amap-real-map, #canvas-amap-real-map");
    if (!liveContainer || !shouldShowTripMapInView()) return;

    rememberAmapViewState(amapMapInstance, liveContainer.id);
    amapMapInstance?.destroy?.();
    amapMapInstance = new AMap.Map(liveContainer, {
      center: initialCenter,
      zoom: initialZoom,
      viewMode: "2D",
      mapStyle: "amap://styles/normal",
      resizeEnable: true,
      animateEnable: false,
      scrollWheel: true,
      dragEnable: true,
      zoomEnable: true,
      doubleClickZoom: true,
      touchZoom: true
    });

    bindAmapViewPersistence(amapMapInstance, liveContainer.id);
    if (!isPreviewMap) {
      if (AMap.Scale) amapMapInstance.addControl(new AMap.Scale());
      if (AMap.ToolBar) amapMapInstance.addControl(new AMap.ToolBar({ position: "RT" }));
    }
    renderAmapOverlays(AMap, amapMapInstance, {
      preserveView,
      containerId: liveContainer.id,
      dayFilter: liveContainer.dataset.mapDayFilter || getMapDayFilterForContainer(liveContainer.id)
    });
    queueMicrotask(() => amapMapInstance?.resize?.());
    liveContainer.classList.remove("is-booting");
    overlay?.remove();
  } catch (error) {
    container.classList.remove("is-booting");
    if (overlay) {
      overlay.textContent = error.message || "高德地图组件加载失败，请检查 JS API Key 和安全密钥配置。";
    }
  }
}

async function loadAmapSdk() {
  if (window.AMap) return window.AMap;
  if (amapLoaderPromise) return amapLoaderPromise;

  amapLoaderPromise = fetch(`/api/amap/config?t=${Date.now()}`, { cache: "no-store" })
    .then(async (response) => {
      const config = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(config.error || `高德 JS API 配置读取失败（HTTP ${response.status}）。`);
      }
      if (!config.key) {
        throw new Error("高德 JS API Key 为空，请检查 AMAP_JS_API_KEY 或 .mcp.local.json。");
      }
      if (config.securityJsCode) {
        window._AMapSecurityConfig = { securityJsCode: config.securityJsCode };
      }
      await appendAmapScript(config);
      return window.AMap;
    })
    .catch((error) => {
      amapLoaderPromise = null;
      throw error;
    });

  return amapLoaderPromise;
}

function appendAmapScript(config) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-amap-jsapi]");
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", () => reject(new Error("高德地图 JS API 加载失败。")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.dataset.amapJsapi = "true";
    script.src = `https://webapi.amap.com/maps?v=${encodeURIComponent(config.version || "2.0")}&key=${encodeURIComponent(config.key)}&plugin=AMap.Scale,AMap.ToolBar`;
    script.onload = resolve;
    script.onerror = () => reject(new Error("高德地图 JS API 加载失败。"));
    document.head.append(script);
  });
}

function getAmapMapCenter() {
  return getTripMapView().center;
}

function getAmapMapZoom() {
  return getTripMapView().zoom;
}

function renderAmapOverlays(AMap, mapInstance, options = {}) {
  const map = state.mapRoutes.map;
  const containerId = options.containerId || getActiveAmapContainerId();
  const dayFilter = options.dayFilter ?? getMapDayFilterForContainer(containerId);
  const days = getPlanDays();
  const showAllDaysOverview = dayFilter === "ALL";
  const pois = getVisibleMapPois(days, dayFilter)
    .filter((poi) => !showAllDaysOverview || !poi.isEstimated);
  const segments = showAllDaysOverview
    ? []
    : filterMapSegmentsByDay(Array.isArray(map?.segments) ? map.segments : [], dayFilter);
  const dayColors = getMapDayColors(days);
  const overlays = [];
  const overlayEntries = [];
  const hasRealCoords = shouldUseRealAmapMap(map);
  const preserveView = options.preserveView === true;
  const markerLayouts = getAmapMarkerLayouts(pois);

  if (mapInstance._tripOverlays?.length) {
    mapInstance.remove(mapInstance._tripOverlays);
    mapInstance._tripOverlays = [];
    mapInstance._tripOverlayEntries = [];
  }

  pois.forEach((poi) => {
    const position = poi.coordinates;
    if (!position) return;
    if (hasRealCoords && !isValidGeoCoordinate(position[0], position[1])) return;
    const layout = markerLayouts.get(poi.id) || {};
    const marker = new AMap.Marker({
      position,
      title: poi.title,
      anchor: "center",
      offset: layout.offset ? new AMap.Pixel(layout.offset.x, layout.offset.y) : undefined,
      content: renderAmapMarkerContent(poi, dayColors.get(Number(poi.day)) || "#0757ff", {
        compact: showAllDaysOverview || layout.groupSize > 1,
        allDays: showAllDaysOverview,
        estimated: poi.isEstimated
      })
    });
    marker.on?.("click", () => {
      updateMapPoiSelection(poi.id);
    });
    overlays.push(marker);
    overlayEntries.push({ overlay: marker, day: Number(poi.day) });
  });

  segments.filter(shouldDrawRealAmapSegment).forEach((segment) => {
    const path = (Array.isArray(segment.path) && segment.path.length ? segment.path : [segment.origin, segment.destination])
      .map(toAmapLngLat)
      .filter((point) => point && (!hasRealCoords || isValidGeoCoordinate(point[0], point[1])));
    if (path.length < 2) return;
    const color = dayColors.get(Number(segment.day)) || "#0757ff";
    const isEstimated = isEstimatedAmapSegment(segment);
    const polyline = new AMap.Polyline({
      path,
      strokeColor: color,
      strokeOpacity: isEstimated ? 0.52 : 0.7,
      strokeWeight: isEstimated ? 7 : 9,
      strokeStyle: isEstimated ? "dashed" : "solid",
      strokeDasharray: isEstimated ? [12, 9] : undefined,
      isOutline: true,
      outlineColor: "#ffffff",
      borderWeight: 2,
      lineJoin: "round",
      lineCap: "round"
    });
    overlays.push(polyline);
    overlayEntries.push({ overlay: polyline, day: Number(segment.day) });
  });

  if (overlays.length) {
    mapInstance.add(overlays);
    mapInstance._tripOverlays = overlays;
    mapInstance._tripOverlayEntries = overlayEntries;
  }

  if (!preserveView && overlays.length) {
    fitAmapMapToTripData(AMap, mapInstance, map, containerId, dayFilter);
  } else if (!preserveView) {
    const mapView = getTripMapView(map);
    mapInstance.setCenter(mapView.center);
    mapInstance.setZoom(mapView.zoom);
    rememberAmapViewState(mapInstance, containerId);
  }
}

function renderAmapMarkerContent(poi, color, options = {}) {
  const compact = options.compact === true;
  const allDays = options.allDays === true;
  const estimated = options.estimated === true;
  const title = `Day ${poi.day} 第 ${poi.sequence} 站：${poi.title}${estimated ? "（估算位置）" : ""}`;
  const showDayBadge = allDays || Number(poi.sequence) === 1;
  const dayBadgeLabel = allDays ? `D${Number(poi.day) || 1}` : `Day ${Number(poi.day) || 1}`;
  const dayBadgeClass = `trip-map-marker__day${allDays ? " trip-map-marker__day--compact" : ""}`;
  return `
    <button
      type="button"
      class="trip-map-marker"
      style="--marker-color: ${color}"
      data-map-marker-poi="${escapeAttr(poi.id || "")}"
      aria-label="${escapeAttr(title)}"
    >
      ${showDayBadge ? `<em class="${dayBadgeClass}">${dayBadgeLabel}</em>` : ""}
      <span class="trip-map-marker__dot">${escapeHtml(poi.sequence || "")}</span>
      ${compact ? "" : `<strong class="trip-map-marker__name">${escapeHtml(poi.title)}</strong>`}
    </button>
  `;
}

function getAmapMarkerLayouts(pois = []) {
  const groups = new Map();
  pois.forEach((poi) => {
    const coords = poi.coordinates;
    if (!coords || !isValidGeoCoordinate(coords[0], coords[1])) return;
    const key = `${Number(coords[0]).toFixed(5)},${Number(coords[1]).toFixed(5)}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(poi);
  });

  const layouts = new Map();
  groups.forEach((group) => {
    group
      .sort((left, right) => (Number(left.sequence) - Number(right.sequence)) || String(left.title || "").localeCompare(String(right.title || ""), "zh-Hans-CN"))
      .forEach((poi, index) => {
        layouts.set(poi.id, {
          groupSize: group.length,
          offset: getAmapMarkerOffset(index, group.length)
        });
      });
  });
  return layouts;
}

function getAmapMarkerOffset(index, count) {
  if (count <= 1) return null;
  if (count === 2) return index === 0 ? { x: -18, y: 0 } : { x: 18, y: 0 };
  if (count === 3) {
    return [
      { x: 0, y: -22 },
      { x: -20, y: 14 },
      { x: 20, y: 14 }
    ][index] || null;
  }
  if (count === 4) {
    return [
      { x: -22, y: -22 },
      { x: 22, y: -22 },
      { x: -22, y: 22 },
      { x: 22, y: 22 }
    ][index] || null;
  }
  const radius = Math.max(24, Math.min(40, 18 + count * 2));
  const angle = (Math.PI * 2 * index) / count - Math.PI / 2;
  return {
    x: Math.round(Math.cos(angle) * radius),
    y: Math.round(Math.sin(angle) * radius)
  };
}

function fitAmapMapToTripData(AMap, mapInstance, map, containerId, dayFilter = "ALL") {
  const mapContainer = containerId ? document.getElementById(containerId) : null;
  const fit = getAmapFitViewConfig(containerId, mapContainer);
  const sourcePoints = [];
  getVisibleMapPois(getPlanDays(), dayFilter)
    .filter((poi) => dayFilter !== "ALL" || !poi.isEstimated)
    .forEach((poi) => {
      const lngLat = poi.coordinates;
      if (!lngLat || !isValidGeoCoordinate(lngLat[0], lngLat[1])) return;
      sourcePoints.push(lngLat);
    });

  if (dayFilter !== "ALL" && containerId !== "canvas-amap-real-map") {
    filterMapSegmentsByDay(Array.isArray(map?.segments) ? map.segments : [], dayFilter)
      .filter(shouldDrawRealAmapSegment)
      .forEach((segment) => {
        (Array.isArray(segment.path) ? segment.path : [])
          .map(toAmapLngLat)
          .filter((point) => point && isValidGeoCoordinate(point[0], point[1]))
          .forEach((point) => sourcePoints.push(point));
      });
  }

  const uniquePoints = [];
  const seen = new Set();
  sourcePoints.forEach((point) => {
    const key = `${point[0].toFixed(6)},${point[1].toFixed(6)}`;
    if (seen.has(key)) return;
    seen.add(key);
    uniquePoints.push(point);
  });

  if (!uniquePoints.length) {
    const mapView = getTripMapView(map);
    mapInstance.setCenter(mapView.center);
    mapInstance.setZoom(mapView.zoom);
    rememberAmapViewState(mapInstance, containerId);
    return;
  }

  if (uniquePoints.length === 1) {
    const [lng, lat] = uniquePoints[0];
    if (AMap?.Bounds && typeof mapInstance.setBounds === "function") {
      const deltaLng = containerId === "canvas-amap-real-map" ? 0.016 : 0.012;
      const deltaLat = deltaLng * 0.8;
      mapInstance.setBounds(
        new AMap.Bounds([lng - deltaLng, lat - deltaLat], [lng + deltaLng, lat + deltaLat]),
        false,
        fit.padding,
        Math.min(fit.maxZoom, containerId === "canvas-amap-real-map" ? 12 : 13)
      );
    } else {
      mapInstance.setCenter(uniquePoints[0]);
      mapInstance.setZoom(Math.min(fit.maxZoom, containerId === "canvas-amap-real-map" ? 12 : 13));
    }
    rememberAmapViewState(mapInstance, containerId);
    return;
  }

  const lngs = uniquePoints.map((point) => point[0]);
  const lats = uniquePoints.map((point) => point[1]);
  const sw = [Math.min(...lngs), Math.min(...lats)];
  const ne = [Math.max(...lngs), Math.max(...lats)];

  if (AMap?.Bounds && typeof mapInstance.setBounds === "function") {
    mapInstance.setBounds(new AMap.Bounds(sw, ne), false, fit.padding, fit.maxZoom);
  } else if (typeof mapInstance.setFitView === "function") {
    mapInstance.setFitView(null, false, fit.padding, fit.maxZoom);
  }
  queueMicrotask(() => rememberAmapViewState(mapInstance, containerId));
}

function shouldDrawRealAmapSegment(segment) {
  const path = Array.isArray(segment?.path) ? segment.path : [];
  return path.length >= 2;
}

function isEstimatedAmapSegment(segment) {
  return String(segment?.status || "") !== "ok"
    || (Array.isArray(segment?.path) && segment.path.length === 2);
}

function toAmapLngLat(point) {
  const lng = Number(point?.lng);
  const lat = Number(point?.lat);
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
  return [lng, lat];
}

function getMapInspectorNotices(days = getPlanDays(), map = state.mapRoutes.map) {
  const notices = [];
  const currentDay = state.mapPlanner.currentDay;
  if (currentDay === "ALL") {
    notices.push("当前是 All Days 总览：圆点里的数字表示当天第几站，不是第几天；旁边的 D1 / D2 / D3 才是天数。");
  } else {
    notices.push(`默认先展示 Day ${currentDay}，避免多天点位叠在一起。需要全局总览时再切到 All Days。`);
    const estimatedCount = getVisibleMapPois(days, currentDay).filter((poi) => poi.isEstimated && poi.coordinates).length;
    if (estimatedCount) {
      notices.push(`Day ${currentDay} 有 ${estimatedCount} 个点暂时没拿到精确坐标，先按当天锚点展开，避免地图看起来像漏点。`);
    }
  }
  const coverageWarning = getMapCoverageWarning(map, days);
  if (coverageWarning) notices.push(coverageWarning);
  if (map?.renderMode === "draft" && !state.mapRoutes.loading && !state.mapRoutes.routesLoading) {
    notices.push("当前还是临时草图，位置不代表真实地理坐标。");
  }
  return notices;
}

function renderAmapRoutePanel() {
  const routes = state.mapPlanner.currentDay === "ALL"
    ? (state.mapRoutes.items || [])
    : (state.mapRoutes.items || []).filter((route) => Number(route.day) === Number(state.mapPlanner.currentDay));
  const notices = getMapInspectorNotices();
  return `
    <section class="amap-route-panel" aria-label="高德路线">
      <div class="amap-route-panel__head">
        <span>高德 MCP</span>
        <strong>行程路段</strong>
      </div>
      ${notices.map((notice) => `<p class="amap-route-status">${escapeHtml(notice)}</p>`).join("")}
      ${state.mapRoutes.loading ? `<p class="amap-route-status">正在根据当前行程查询 A -> B 路线...</p>` : ""}
      ${state.mapRoutes.error ? `<p class="amap-route-status is-error">${escapeHtml(state.mapRoutes.error)}</p>` : ""}
      ${
        !state.mapRoutes.loading && !state.mapRoutes.error && !routes.length
          ? `<p class="amap-route-status">地图组件会自动用高德 MCP 校验每日相邻地点路线。</p>`
          : ""
      }
      <div class="amap-route-list">
        ${routes.map(renderAmapRouteItem).join("")}
      </div>
    </section>
  `;
}

function renderAmapRouteItem(route, index) {
  const ok = route.status === "ok";
  return `
    <article class="amap-route-item ${ok ? "is-ok" : "is-muted"}">
      <div class="amap-route-item__title">
        <span>D${escapeHtml(route.day || index + 1)}</span>
        <strong>${escapeHtml(route.from)} -> ${escapeHtml(route.to)}</strong>
      </div>
      ${
        ok
          ? `<p>${escapeHtml(getRouteModeLabel(route.tool || route.mode))} · ${escapeHtml(route.distanceText || "待确认")} · ${escapeHtml(route.durationText || "待确认")}</p>`
          : `<p>${escapeHtml(route.message || "该路段暂无法用高德确认。")}</p>`
      }
      ${ok && Array.isArray(route.steps) && route.steps.length ? `<em>${escapeHtml(route.steps[0])}</em>` : ""}
    </article>
  `;
}

function getRouteModeLabel(value) {
  const text = String(value || "");
  if (text.includes("walking")) return "步行";
  if (text.includes("transit")) return "公共交通";
  if (text.includes("bicycling")) return "骑行";
  if (text.includes("driving")) return "驾车";
  return text || "路线";
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
  const days = getPlanDays();
  if (!days.length) return renderEmptyTripView();
  ensureValidMapPlannerState();
  const guide = getTripGuide(days);
  const rawDoc = getDocumentCanvas(guide, days);
  const doc = rawDoc;
  return `
    <section class="view-panel document-view doc-canvas-view" aria-label="文档视图">
      <div class="doc-canvas-desk">
        <article class="doc-canvas">
          <div class="doc-canvas__sheet">
            <label class="doc-field doc-field--title">
              <textarea class="doc-canvas__h1" rows="2" data-doc-field="title" placeholder="输入文档标题…">${escapeHtml(doc.title)}</textarea>
            </label>

            <div class="doc-field doc-intro">${renderDocumentIntro(doc.intro)}</div>
            ${renderDocumentHeroImage(days)}

            <section class="doc-section doc-section--map">
              <div class="doc-section__head">
                <h2 class="doc-canvas__h2">🗺️ 行程地图</h2>
            </div>
              <div class="doc-map-embed">
                ${renderAmapMcpMapStage({ embedded: true })}
          </div>
            </section>

            <section class="doc-section">
              <div class="doc-section__head">
                <h2 class="doc-canvas__h2">🗺️ 行程速览</h2>
          </div>
              ${renderDocumentQuickOverview(doc.quickItems)}
        </section>

            <section class="doc-section">
              <div class="doc-section__head">
                <h2 class="doc-canvas__h2">🎒 详细行程规划</h2>
              </div>
              <div class="doc-canvas__day-plans">
                ${doc.dayPlans.map((plan, index) => renderDocumentDayPlan(plan, index)).join("")}
              </div>
            </section>

            <section class="doc-section">
              <div class="doc-section__head">
                <h2
                  class="doc-canvas__h2 doc-canvas__h2--editable"
                  contenteditable="true"
                  data-doc-field="tipsHeading"
                >${escapeHtml(doc.tipsHeading)}</h2>
              </div>
              ${renderDocumentTips(doc.tipsSections)}
            </section>
          </div>
      </article>
      </div>
    </section>
  `;
}

function getDocumentCanvas(guide, days) {
  if (!guide.document?.dayPlans?.length || !guide.document?.version || guide.document.version < 8) {
    guide.document = buildDocumentCanvas(days, guide);
  }
  return normalizeDocumentCanvas(guide.document, days, guide);
}

function normalizeDocumentCanvas(document, days, guide = state.tripGuide) {
  const base = document && typeof document === "object" ? document : {};
  const dayPlans =
    Array.isArray(base.dayPlans) &&
    base.dayPlans.length === days.length &&
    base.dayPlans.every((plan) => Array.isArray(plan?.activities))
      ? base.dayPlans
      : days.map((day, index) => base.dayPlans?.[index] || buildStructuredDayPlan(day, index, days));

  const quickItems =
    Array.isArray(base.quickItems) && base.quickItems.length === days.length
      ? base.quickItems
      : days.map((day, index) => base.quickItems?.[index] || buildQuickOverviewItem(day));

  const destinationNames = resolveTripDestinationNames(days, guide);
  const tripText = getTripContext(days).tripText;
  const title = shouldRefreshDocumentTitle(base.title)
    ? buildDocumentTitle(days, destinationNames, tripText)
    : base.title || buildDocumentTitle(days, destinationNames, tripText);

  return {
    version: 8,
    title,
    intro: base.intro || buildRichDocumentIntro(days, destinationNames, tripText),
    quickItems,
    dayPlans,
    tipsHeading: base.tipsHeading || buildDocumentTipsHeading(days),
    tipsSections:
      Array.isArray(base.tipsSections) && base.tipsSections.length
        ? base.tipsSections
        : buildStructuredTipsSections(days, guide || {}, "")
  };
}

function buildDocumentCanvas(days, guide) {
  const destinationNames = resolveTripDestinationNames(days, guide);
  const tripText = days.flatMap((day) => [day.title, day.summary, ...day.schedule.map((a) => `${a.title} ${a.detail}`)]).join(" ");

  return {
    version: 8,
    title: buildDocumentTitle(days, destinationNames, tripText),
    intro: buildRichDocumentIntro(days, destinationNames, tripText),
    quickItems: days.map((day, index) => buildQuickOverviewItem(day, index)),
    dayPlans: days.map((day, index) => buildStructuredDayPlan(day, index, days)),
    tipsHeading: buildDocumentTipsHeading(days, tripText),
    tipsSections: buildStructuredTipsSections(days, guide, tripText)
  };
}

const DOC_SLOT_EMOJI = { 上午: "🌅", 中午: "🍱", 下午: "☀️", 傍晚: "🌆" };
const DOC_TIP_EMOJI = {
  避堵秘籍: "🚦",
  夏日贴士: "☀️",
  为什么去: "✨",
  玩法: "🎯",
  黄金时间: "⏰",
  推荐路线: "🚴",
  懒人上山: "🌄",
  玩水贴士: "🏊",
  晚餐推荐: "🍽️",
  端午特色: "🐲",
  高铁票: "🚄",
  大交通: "✈️",
  大巴接驳: "🚌",
  住宿选择: "🏨",
  气候: "🌤️",
  蚊虫: "🦟",
  船票预约: "⛴️",
  热门门票: "🎫"
};
const DOC_SECTION_EMOJI = {
  "1. 交通与住宿抢先订": "🚄",
  "2. 防暑与雨天准备": "🌂",
  "3. 景区购票与预约": "🎫",
  "4. 其他提醒": "📌"
};
const DOC_DAY_BADGES = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"];

function getSlotEmoji(slot) {
  return DOC_SLOT_EMOJI[slot] || "🕐";
}

function inferPoiEmoji(text) {
  const value = String(text || "");
  if (/(鱼头|餐|啤酒|小吃|美食|下午茶|农家)/.test(value)) return "🍽️";
  if (/(湖|岛|游船|码头|水上|桨板|皮划艇|碧波)/.test(value)) return "🏝️";
  if (/(古村|古镇|徽派|芹川|老街|巷)/.test(value)) return "🏘️";
  if (/(骑行|绿道|自行车)/.test(value)) return "🚴";
  if (/(天屿|日落|观景|索道|登山)/.test(value)) return "🌄";
  if (/(返程|高铁|机场|车站)/.test(value)) return "🧳";
  if (/(端午|艾草|粽子)/.test(value)) return "🐲";
  if (/(夜市|商圈|购物)/.test(value)) return "🛍️";
  return "📍";
}

function inferTipEmoji(label) {
  return DOC_TIP_EMOJI[label] || "💡";
}

function inferSectionEmoji(title) {
  return DOC_SECTION_EMOJI[title] || "📋";
}

function inferDayBadge(day, index) {
  const text = `${day.title} ${day.summary} ${day.schedule.map((item) => item.title).join(" ")}`;
  return inferPoiEmoji(text) !== "📍" ? inferPoiEmoji(text) : DOC_DAY_BADGES[index] || `${day.day}️⃣`;
}

function enrichQuickItem(item, day, index) {
  return {
    ...item,
    emoji: item.emoji || inferDayBadge(day, index)
  };
}

function enrichActivity(activity) {
  const text = `${activity.poi} ${activity.detail}`;
  return {
    ...activity,
    slotEmoji: activity.slotEmoji || getSlotEmoji(activity.slot),
    poiEmoji: activity.poiEmoji || inferPoiEmoji(text),
    tips: (activity.tips || []).map((tip) => ({
      ...tip,
      emoji: tip.emoji || inferTipEmoji(tip.label)
    }))
  };
}

function enrichDayPlan(plan, day, index) {
  return {
    ...plan,
    dayEmoji: plan.dayEmoji || inferDayBadge(day, index),
    activities: (plan.activities || []).map(enrichActivity)
  };
}

function enrichTipsSection(section) {
  return {
    ...section,
    emoji: section.emoji || inferSectionEmoji(section.title),
    items: (section.items || []).map((item) => ({
      ...item,
      emoji: item.emoji || (item.label ? inferTipEmoji(item.label) : "✅")
    }))
  };
}

function getDocumentDayContext(dayIndex) {
  return getPlanDays()[dayIndex] || null;
}

function getDocumentDayImageFallback(day, dayIndex = 0) {
  return day?.image || getImageForStop(day?.cityId, dayIndex) || "reef";
}

function pickDocumentFeaturedQuery(day, activityIndex = 0) {
  const schedule = (day?.schedule || []).filter((activity) => !isPureTransportActivity(activity));
  const activity = schedule[activityIndex] || day?.schedule?.[activityIndex] || schedule[0];
  return activity?.title || day?.title || day?.city || getTripTitle();
}

function isDocumentActivityImageWorthy(activity) {
  const text = `${activity.poi || ""} ${activity.detail || ""}`;
  if (!text.trim()) return false;
  if (
    /(返程|高铁|机场|车站|入住|退房|乘车|乘船|前往|抵达)/.test(text) &&
    !/(景区|古村|灯塔|码头|天屿|骑行|午餐|晚餐|鱼头)/.test(text)
  ) {
    return false;
  }
  return true;
}

function renderDocumentFigure({ imageKey, query, city, fallback, label = "", caption = "", extraClass = "" }) {
  return `
    <figure class="doc-figure ${extraClass}">
      ${renderTravelImageMarkup({
        imageKey,
        query,
        city,
        fallback,
        label,
        extraClass: "doc-figure__image"
      })}
      ${caption ? `<figcaption class="doc-figure__caption">${escapeHtml(caption)}</figcaption>` : ""}
    </figure>
  `;
}

function renderDocumentHeroImage(days) {
  const firstDay = days[0];
  if (!firstDay) return "";
  const query = pickDocumentFeaturedQuery(firstDay, 0);
  return renderDocumentFigure({
    imageKey: `doc-hero-${firstDay.id || "trip"}`,
    query,
    city: firstDay.city,
    fallback: getDocumentDayImageFallback(firstDay, 0),
    label: getTripBadge(),
    caption: `${firstDay.city || "行程"} · 封面`,
    extraClass: "doc-figure--hero"
  });
}

function renderDocumentIntro(intro) {
  const paragraphs = String(intro || "")
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  if (!paragraphs.length) {
    return `<p class="doc-intro__p" contenteditable="true" data-doc-field="intro" data-doc-paragraph="0"></p>`;
  }
  return paragraphs
    .map(
      (paragraph, index) =>
        `<p class="doc-intro__p" contenteditable="true" data-doc-field="intro" data-doc-paragraph="${index}">${escapeHtml(paragraph)}</p>`
    )
    .join("");
}

function renderDocumentQuickOverview(items = []) {
  if (!items.length) {
    return `<p class="doc-empty">暂无行程速览</p>`;
  }
  const days = getPlanDays();
  return `
    <ul class="doc-quick-grid">
      ${items
        .map((item, index) => {
          const day = days[index] || days.find((entry) => entry.day === item.day);
          const query = pickDocumentFeaturedQuery(day, 0);
          return `
        <li class="doc-quick-card">
          ${renderTravelImageMarkup({
            imageKey: `doc-quick-${day?.id || index}`,
            query,
            city: day?.city || "",
            fallback: getDocumentDayImageFallback(day, index),
            label: `D${item.day}`,
            extraClass: "doc-quick-card__image"
          })}
          <div class="doc-quick-card__copy">
            <strong>Day ${item.day}（<span contenteditable="true" data-doc-field="quickTheme" data-doc-index="${index}">${escapeHtml(item.theme)}</span>）</strong>
            <p contenteditable="true" data-doc-field="quickRoute" data-doc-index="${index}">${escapeHtml(item.route)}</p>
          </div>
        </li>
      `;
        })
        .join("")}
    </ul>
  `;
}

function renderDocumentDayPlan(plan, dayIndex) {
  const day = getDocumentDayContext(dayIndex);
  const gallery = getDocumentDayGallery(day, plan, dayIndex);

  return `
    <div class="doc-day-block">
      <label class="doc-day-title">
        <textarea class="doc-canvas__h3 doc-day-title__input" rows="1" data-doc-field="dayHeading" data-doc-index="${dayIndex}" placeholder="📍 Day 1：当日主题">${escapeHtml(plan.heading)}</textarea>
      </label>
      <ul class="doc-plain-list doc-activity-list">
        ${(plan.activities || [])
          .map((activity, activityIndex) => renderDocumentActivity(activity, dayIndex, activityIndex))
          .join("")}
      </ul>
      ${gallery.length ? renderDocumentImageGallery(gallery) : ""}
    </div>
  `;
}

function getDocumentDayGallery(day, plan, dayIndex) {
  const featured = [{
    imageKey: `doc-day-${day?.id || dayIndex}`,
    query: pickDocumentFeaturedQuery(day, 0),
    city: day?.city || "",
    fallback: getDocumentDayImageFallback(day, dayIndex),
    label: `D${plan.day || dayIndex + 1}`,
    caption: plan.themeLine || day?.summary || plan.heading.replace(/^📍\s*/, "")
  }];

  const activityImages = (plan.activities || [])
    .map((activity, activityIndex) => ({ activity, activityIndex }))
    .filter(({ activity }) => isDocumentActivityImageWorthy(activity))
    .slice(0, 2)
    .map(({ activity, activityIndex }) => ({
      imageKey: `doc-act-${day?.id || dayIndex}-${activityIndex}`,
      query: activity.poi || activity.detail || day?.city || "",
      city: day?.city || "",
      fallback: getImageForStop(day?.cityId, activityIndex + 1),
      label: activity.slot || "",
      caption: activity.poi || ""
    }));

  return [...featured, ...activityImages].slice(0, 3);
}

function renderDocumentImageGallery(images) {
  return `
    <div class="doc-image-gallery" aria-label="行程配图">
      ${images.map((image) => renderDocumentFigure({ ...image, extraClass: "doc-figure--thumb" })).join("")}
    </div>
  `;
}

function renderDocumentActivity(activity, dayIndex, activityIndex) {
  const bullets = [];
  if (activity.detail) {
    bullets.push(
      `<li class="doc-plain-list__item"><span contenteditable="true" data-doc-field="activityDetail" data-doc-index="${dayIndex}" data-doc-act-index="${activityIndex}">${escapeHtml(activity.detail)}</span></li>`
    );
  }
  (activity.tips || []).forEach((tip, tipIndex) => {
    bullets.push(
      `<li class="doc-plain-list__item"><strong class="doc-editable-label" contenteditable="true" data-doc-field="tipLabel" data-doc-index="${dayIndex}" data-doc-act-index="${activityIndex}" data-doc-tip-index="${tipIndex}">${escapeHtml(tip.label)}</strong>：<span contenteditable="true" data-doc-field="tipText" data-doc-index="${dayIndex}" data-doc-act-index="${activityIndex}" data-doc-tip-index="${tipIndex}">${escapeHtml(tip.text)}</span></li>`
    );
  });
  if (!bullets.length) {
    bullets.push(
      `<li class="doc-plain-list__item doc-plain-list__item--empty"><span contenteditable="true" data-doc-field="activityDetail" data-doc-index="${dayIndex}" data-doc-act-index="${activityIndex}"></span></li>`
    );
  }
  const durationMarkup = `（<span contenteditable="true" data-doc-field="activityDuration" data-doc-index="${dayIndex}" data-doc-act-index="${activityIndex}">${escapeHtml(activity.duration || "")}</span>）`;
  return `
    <li class="doc-activity-item">
      <div class="doc-activity-layout">
        <div class="doc-activity-copy">
          <div class="doc-activity-line">
            <strong contenteditable="true" data-doc-field="activitySlot" data-doc-index="${dayIndex}" data-doc-act-index="${activityIndex}">${escapeHtml(activity.slot)}</strong>：
            <span contenteditable="true" data-doc-field="activityPoi" data-doc-index="${dayIndex}" data-doc-act-index="${activityIndex}">${escapeHtml(activity.poi)}</span>${durationMarkup}
          </div>
          <ul class="doc-plain-list doc-plain-list--nested">
            ${bullets.join("")}
          </ul>
        </div>
      </div>
    </li>
  `;
}

function renderDocumentTips(sections = []) {
  if (!sections.length) {
    return `<p class="doc-empty">暂无贴士</p>`;
  }
  return `
    <ol class="doc-numbered-list">
      ${sections
        .map(
          (section, sectionIndex) => `
        <li class="doc-numbered-list__item">
          <h3
            class="doc-numbered-list__title"
            contenteditable="true"
            data-doc-field="tipSectionTitle"
            data-doc-section-index="${sectionIndex}"
          >${escapeHtml(section.title)}</h3>
          <ul class="doc-plain-list doc-plain-list--nested">
            ${(section.items || [])
              .map((item, itemIndex) =>
                item.bullet
                  ? `<li class="doc-plain-list__item"><span contenteditable="true" data-doc-field="tipBullet" data-doc-section-index="${sectionIndex}" data-doc-item-index="${itemIndex}">${escapeHtml(item.text)}</span></li>`
                  : `<li class="doc-plain-list__item"><strong class="doc-editable-label" contenteditable="true" data-doc-field="tipItemLabel" data-doc-section-index="${sectionIndex}" data-doc-item-index="${itemIndex}">${escapeHtml(item.label)}</strong>：<span contenteditable="true" data-doc-field="tipItem" data-doc-section-index="${sectionIndex}" data-doc-item-index="${itemIndex}">${escapeHtml(item.text)}</span></li>`
              )
              .join("")}
          </ul>
        </li>
      `
        )
        .join("")}
    </ol>
  `;
}

function buildDocumentTitle(days, destinationNames, tripText) {
  const cityLabel = (destinationNames || []).filter((name) => !isPlaceholderDestination(name)).join("·")
    || inferPrimaryDestinationFromText(tripText)
    || inferPrimaryDestinationFromText(state.chat.map((message) => message.text).join(" "));
  const emoji = /端午/.test(tripText) ? "🐲" : /春节|过年/.test(tripText) ? "🧧" : /国庆/.test(tripText) ? "🇨🇳" : "✈️";
  const style = /避堵|松弛|深度/.test(tripText) ? "经典与避堵深度攻略" : `${days.length}日深度攻略`;
  if (/千岛湖/.test(tripText) && /端午/.test(tripText)) {
    return `${emoji} 端午·千岛湖三日游经典与避堵深度攻略`;
  }
  if (!cityLabel) return `${emoji} ${days.length}日游${style}`;
  return `${emoji} ${cityLabel}${days.length}日游${style}`;
}

function buildRichDocumentIntro(days, destinationNames, tripText) {
  const place = (destinationNames || []).filter((name) => !isPlaceholderDestination(name)).join("、")
    || inferPrimaryDestinationFromText(tripText)
    || "旅行目的地";
  if (/千岛湖/.test(tripText)) {
    const p1 = `端午及六月中旬的千岛湖，青山如黛、碧波万顷。此时正值江南梅雨与初夏交替，气温约 24℃-31℃，正是玩水、骑行、吃鱼头、逛古村的好时节。`;
    const p2 = /端午/.test(tripText)
      ? `端午是出行高峰，这份攻略特别融入「反向避堵」与民俗体验，按先玩核心、再避峰转场、最后轻松收尾的节奏编排，尽量把排队和折返降到最低。`
      : `整体按「先玩核心 → 避峰转场 → 轻松收尾」编排，尽量减少排队和折返。`;
    return `${p1}\n\n${p2}`;
  }

  const season = /端午/.test(tripText)
    ? "端午小长假"
    : /春节/.test(tripText)
      ? "春节假期"
      : /国庆/.test(tripText)
        ? "国庆黄金周"
        : "这次出行";

  const p1 = `${place}，${days.length} 天行程。${season}若想玩得轻松又不踩坑，建议先看行程速览，再按天展开细节。`;
  const p2 = `下文按「行程速览 → 详细规划 → 实用贴士」组织，所有段落都可以直接修改。`;
  return `${p1}\n\n${p2}`;
}

function buildQuickOverviewItem(day, index = day.day - 1) {
  const theme = (day.title || `${day.city}行程`).replace(/^D\d+[:：\s]*/, "").trim();
  const stops = day.schedule
    .map((activity) => summarizeActivityForQuickLine(activity))
    .filter(Boolean);
  return {
    day: day.day,
    emoji: inferDayBadge(day, index),
    theme,
    route: stops.length ? stops.join(" → ") : day.summary || "待补充"
  };
}

function summarizeActivityForQuickLine(activity) {
  const text = `${activity.title} ${activity.detail}`;
  if (isTransportOrStayActivity(activity.title, activity.detail) && !/(餐|鱼头|小吃|美食)/.test(text)) {
    return "";
  }
  const title = String(activity.title || "").trim();
  if (/(午餐|晚餐|早餐|鱼头|小吃|啤酒|灯塔|下午茶)/.test(title)) {
    return title.replace(/^(午餐|晚餐|早餐)[:：]?\s*/, "").trim() || title;
  }
  const bracket = title.match(/【(.+?)】/);
  if (bracket) return bracket[1];
  return cleanCanvasItemTitle(title) || title;
}

function buildStructuredDayPlan(day, index, days) {
  const subtitle = (day.title || `${day.city}行程`).replace(/^D\d+[:：\s]*/, "").trim();
  const heading = `📍 Day ${day.day}：${subtitle}`;
  const scheduleActivities = day.schedule.filter((activity) => !isPureTransportActivity(activity));
  const activities = scheduleActivities.map((activity, activityIndex) =>
    buildStructuredActivity(activity, day, activityIndex, scheduleActivities.length)
  );

  if (index === days.length - 1 && /返程|回家|高铁|机场/.test(day.summary + day.schedule.map((a) => a.title).join(" "))) {
    activities.push({
      slot: "傍晚",
      poi: "返程动线",
      duration: "",
      detail: "整理行囊，按预约时间前往车站或机场返程。",
      tips: []
    });
  }

  return {
    day: day.day,
    dayEmoji: inferDayBadge(day, index),
    heading,
    themeLine: day.summary ? day.summary.trim() : "",
    activities
  };
}

function isPureTransportActivity(activity) {
  const text = `${activity.title} ${activity.detail}`;
  return /^(前往|抵达|乘车|乘船|返程|退房|入住)/.test(activity.title) && !/(景区|古村|骑行|鱼头|午餐|晚餐)/.test(text);
}

function buildStructuredActivity(activity, day, index, total) {
  const slot = classifyTimeSlot(activity.time, index, total);
  const poi = formatDocumentPoiTitle(activity.title);
  const detail = (activity.detail || "").trim();
  const text = `${activity.title} ${detail}`;
  let tips = inferActivityTips(activity, day);

  if (detail) {
    if (/(岛|码头|游船|梅峰|湖区)/.test(text) && !tips.some((tip) => tip.label === "核心路线")) {
      tips.unshift({ label: "核心路线", text: detail });
    } else if (!tips.length) {
      tips.push({ label: "玩法亮点", text: detail });
    }
  }

  return {
    slot,
    poi,
    duration: inferActivityDuration(activity),
    detail: tips.length ? "" : detail,
    tips: tips.slice(0, 3)
  };
}

function classifyTimeSlot(time, index, total) {
  const hour = Number.parseInt(String(time || "").split(":")[0], 10);
  if (!Number.isNaN(hour)) {
    if (hour < 11) return "上午";
    if (hour < 14) return "中午";
    if (hour < 17) return "下午";
    return "傍晚";
  }
  if (index === 0) return "上午";
  if (index === total - 1) return "傍晚";
  if (index === 1) return "下午";
  return "下午";
}

function formatDocumentPoiTitle(title) {
  const raw = String(title || "").trim();
  if (/【.+】/.test(raw)) return raw.match(/【.+】/)[0];
  const cleaned = raw
    .replace(/^(游览|参观|打卡|前往|抵达|午餐|晚餐|早餐|夜宵)[:：]?\s*/, "")
    .trim();
  if (!cleaned) return "【行程安排】";
  if (/鱼头|啤酒|灯塔|下午茶/.test(cleaned)) return cleaned;
  return `【${cleaned}】`;
}

function inferActivityDuration(activity) {
  const text = `${activity.title} ${activity.detail}`;
  if (/(午餐|晚餐|早餐|鱼头|下午茶)/.test(text)) return "用餐约 1-1.5 小时";
  if (/(骑行|绿道)/.test(text)) return "湖畔骑行约 2 小时";
  if (/(古村|古镇|芹川)/.test(text)) return "慢逛约 2-3 小时";
  if (/(皮划艇|桨板|水上)/.test(text)) return "建议游玩 3-4 小时，含更衣准备";
  if (/(梅峰|中心湖)/.test(text)) return "黄金避堵场，游玩约 4 小时";
  if (/(岛|湖区|游船|索道)/.test(text)) return "游玩约 3-4 小时";
  if (/(天屿|日落|观景)/.test(text)) return "傍晚观景约 1.5 小时";
  if (/(夜市|街巷|巷)/.test(text)) return "夜游约 2 小时";
  return "游玩约 2-3 小时";
}

function inferActivityTips(activity, day) {
  const text = `${activity.title} ${activity.detail}`;
  const tips = [];

  if (/(岛|码头|游船|梅峰|湖区)/.test(text)) {
    tips.push({
      label: "避坑指南",
      text: "高峰日旅行团多在 9:30 后涌向码头，尽量买早班船，提前 1-2 天在线预约船票。"
    });
    tips.push({
      label: "夏日贴士",
      text: "湖面紫外线强，上岛务必防晒，备好防蚊喷雾与遮阳帽。"
    });
  }

  if (/(古村|芹川|徽派)/.test(text)) {
    tips.push({
      label: "避坑指南",
      text: "主湖区人潮汹涌时，往外围古村走是更松弛的反向避堵选择，古桥溪水也更清凉。"
    });
    tips.push({
      label: "玩法亮点",
      text: "沿溪漫步、过桥拍照，端午前后可留意门前艾草与手工粽，适合慢逛。"
    });
  }

  if (/(骑行|绿道|自行车)/.test(text)) {
    tips.push({
      label: "黄金时间",
      text: "建议早上 8:30 前出发，湖畔最清凉，风也更舒服。"
    });
    tips.push({
      label: "核心路线",
      text: "可租自行车或双人协力车，沿湖绿道慢行，一侧山林一侧碧波。"
    });
  }

  if (/(天屿|日落|观景|扶梯)/.test(text)) {
    tips.push({
      label: "懒人上山",
      text: "自动扶梯可省去大热天爬山，傍晚看日落和大桥全景都很治愈。"
    });
    tips.push({
      label: "避坑指南",
      text: "傍晚上山看日落人较多，建议提前到达占位，携带轻便外套。"
    });
  }

  if (/(皮划艇|桨板|水上|华美|进贤)/.test(text)) {
    tips.push({
      label: "玩水贴士",
      text: "自带干湿分离包、防晒服和替换衣物，结束后冲淋更衣会更从容。"
    });
  }

  if (/(餐|鱼头|农家|啤酒|灯塔|下午茶)/.test(text)) {
    tips.push({
      label: "美食推荐",
      text: "选口碑稳定的本地餐馆，鱼头汤、冰镇精酿或湖边下午茶都很适合作为当日收尾。"
    });
  }

  if (/(巷|骑龙|老街|小吃)/.test(text)) {
    tips.push({
      label: "端午特色",
      text: "老街常见艾草与菖蒲装饰，可尝手工粽、粉皮等本地小吃，避开正午暴晒时段更好逛。"
    });
  }

  return tips.slice(0, 3);
}

function buildDocumentTipsHeading(days, tripText = "") {
  const text = tripText || days.map((day) => `${day.title} ${day.summary}`).join(" ");
  return /端午/.test(text) ? '💡 端午出行"避坑"与实用贴士' : "💡 出行实用贴士";
}

function buildStructuredTipsSections(days, guide, tripText) {
  const text = tripText || days.flatMap((day) => [day.title, day.summary]).join(" ");
  const isDuanwu = /端午/.test(text);
  const isQiandao = /千岛湖/.test(text);
  const hotels = getGuideHotelsList(guide, days);
  const checklist = guide?.checklist?.items?.length ? guide.checklist.items : getDocumentChecklist(days);
  const sections = [];

  const transportItems = [];
  if (isDuanwu) {
    transportItems.push({
      label: "高铁票",
      text: "端午假期高铁票非常抢手，建议提前 15 天开售时抢票，优先锁定往返千岛湖站时段。"
    });
  } else {
    transportItems.push({
      label: "大交通",
      text: "提前锁定往返车次或航班，热门日期宁可多留一段可改签的备选。"
    });
  }
  if (isQiandao) {
    transportItems.push({
      label: "大巴接驳",
      text: "千岛湖高铁站距镇中心约 30 公里，出站可购买高铁穿梭巴士，减少打车等待。"
    });
  }
  if (hotels.length) {
    transportItems.push({
      label: "住宿选择",
      text: `${hotels.map((hotel) => `${hotel.name}（${hotel.area || hotel.city}）`).join("；")}。高峰期间优先选交通便利、可免费取消的房型。`
    });
  } else {
    transportItems.push({
      label: "住宿选择",
      text: `${days[0]?.stay || "优先选镇中心或次日动线顺路的区域"}，高峰期间尽早预订。`
    });
  }
  sections.push({ title: "1. 交通与住宿抢先订", items: transportItems });

  sections.push({
    title: "2. 防晒与梅雨准备",
    items: [
      { label: "气候", text: "六月江南可能阵雨与晴热交替，随身带晴雨两用伞，午后尽量安排室内或遮阳活动。" },
      { label: "蚊虫", text: "湖区植被茂密，防蚊液、风油精建议常备。" }
    ]
  });

  sections.push({
    title: "3. 景区购票与预约",
    emoji: "🎫",
    items: [
      isQiandao
        ? {
            label: "船票预约",
            text: "中心湖区游船票建议提前 1-2 天在官方平台预约，端午高峰避免现场排长队。"
          }
        : {
            label: "热门门票",
            text: "核心景区、演出和索道尽量提前预约，把不可退项目放在确定性高的日期。"
          }
    ]
  });

  if (checklist.length) {
    sections.push({
      title: "4. 其他提醒",
      emoji: "📌",
      items: checklist.slice(0, 3).map((item) => ({ text: item, bullet: true, emoji: "✅" }))
    });
  }

  return sections;
}

function readDocumentFieldValue(target) {
  if (target.isContentEditable) return target.textContent.replace(/\u00a0/g, " ").trim();
  return target.value;
}

function readDocumentIntro(container) {
  if (!container) return "";
  const paragraphs = [...container.querySelectorAll("[data-doc-field='intro']")]
    .map((node) =>
      String(node.innerText || node.textContent || "")
        .replace(/\u00a0/g, " ")
        .trim()
    )
    .filter(Boolean);
  if (paragraphs.length) return paragraphs.join("\n\n");
  return String(container.innerText || container.textContent || "")
    .replace(/\u00a0/g, " ")
    .replace(/\r\n/g, "\n")
    .trim();
}

function updateDocumentFromInput(target) {
  const days = getPlanDays();
  getTripGuide(days);
  const guide = state.tripGuide;
  if (!guide) return;

  const field = target.dataset.docField;
  const index = target.dataset.docIndex != null && target.dataset.docIndex !== "" ? Number(target.dataset.docIndex) : null;
  const actIndex =
    target.dataset.docActIndex != null && target.dataset.docActIndex !== "" ? Number(target.dataset.docActIndex) : null;
  const tipIndex =
    target.dataset.docTipIndex != null && target.dataset.docTipIndex !== "" ? Number(target.dataset.docTipIndex) : null;
  const sectionIndex =
    target.dataset.docSectionIndex != null && target.dataset.docSectionIndex !== ""
      ? Number(target.dataset.docSectionIndex)
      : null;
  const itemIndex =
    target.dataset.docItemIndex != null && target.dataset.docItemIndex !== "" ? Number(target.dataset.docItemIndex) : null;
  const value = readDocumentFieldValue(target);

  guide.document = guide.document || normalizeDocumentCanvas({}, days, guide);

  if (field === "title") {
    guide.document.title = value;
    if (guide.overview) guide.overview.title = value.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]+\s*/u, "");
    return;
  }

  if (field === "intro") {
    const introRoot = target.closest(".doc-intro") || target.parentElement;
    guide.document.intro = readDocumentIntro(introRoot);
    if (guide.overview) guide.overview.summary = guide.document.intro.split("\n\n")[0] || guide.document.intro;
    return;
  }

  if (field === "tipsHeading") {
    guide.document.tipsHeading = value;
    return;
  }

  if (field === "quickTheme") {
    guide.document.quickItems = guide.document.quickItems || [];
    if (!guide.document.quickItems[index]) guide.document.quickItems[index] = { day: index + 1, theme: "", route: "" };
    guide.document.quickItems[index].theme = value;
    return;
  }

  if (field === "quickRoute") {
    guide.document.quickItems = guide.document.quickItems || [];
    if (!guide.document.quickItems[index]) guide.document.quickItems[index] = { day: index + 1, theme: "", route: "" };
    guide.document.quickItems[index].route = value;
    return;
  }

  if (field === "dayHeading") {
    guide.document.dayPlans = guide.document.dayPlans || [];
    if (!guide.document.dayPlans[index]) {
      guide.document.dayPlans[index] = { day: index + 1, heading: "", themeLine: "", activities: [] };
    }
    guide.document.dayPlans[index].heading = value;
    return;
  }

  if (field === "dayTheme") {
    guide.document.dayPlans = guide.document.dayPlans || [];
    if (!guide.document.dayPlans[index]) {
      guide.document.dayPlans[index] = { day: index + 1, heading: "", themeLine: "", activities: [] };
    }
    guide.document.dayPlans[index].themeLine = value;
    return;
  }

  if (field === "activitySlot") {
    const activity = guide.document.dayPlans?.[index]?.activities?.[actIndex];
    if (!activity) return;
    activity.slot = value;
    return;
  }

  if (field === "activityPoi") {
    const activity = guide.document.dayPlans?.[index]?.activities?.[actIndex];
    if (!activity) return;
    activity.poi = value;
    return;
  }

  if (field === "activityDuration") {
    const activity = guide.document.dayPlans?.[index]?.activities?.[actIndex];
    if (!activity) return;
    activity.duration = value;
    return;
  }

  if (field === "activityDetail") {
    const plan = guide.document.dayPlans?.[index];
    if (!plan?.activities?.[actIndex]) return;
    plan.activities[actIndex].detail = value;
    return;
  }

  if (field === "tipLabel") {
    const tip = guide.document.dayPlans?.[index]?.activities?.[actIndex]?.tips?.[tipIndex];
    if (!tip) return;
    tip.label = value.replace(/[：:]+$/g, "");
    return;
  }

  if (field === "tipText") {
    const activity = guide.document.dayPlans?.[index]?.activities?.[actIndex];
    if (!activity?.tips?.[tipIndex]) return;
    activity.tips[tipIndex].text = value;
    return;
  }

  if (field === "tipSectionTitle") {
    const section = guide.document.tipsSections?.[sectionIndex];
    if (!section) return;
    section.title = value;
    return;
  }

  if (field === "tipItemLabel") {
    const item = guide.document.tipsSections?.[sectionIndex]?.items?.[itemIndex];
    if (!item) return;
    item.label = value.replace(/[：:]+$/g, "");
    return;
  }

  if (field === "tipItem") {
    const item = guide.document.tipsSections?.[sectionIndex]?.items?.[itemIndex];
    if (!item) return;
    item.text = value;
    return;
  }

  if (field === "tipBullet") {
    const item = guide.document.tipsSections?.[sectionIndex]?.items?.[itemIndex];
    if (!item) return;
    item.text = value;
  }
}

function renderTripOverview(eyebrow, days = getPlanDays(), guide = getTripGuide(days)) {
  const travelStyle = getTravelStyle(days);
  const overview = guide?.overview || {};
  const styleLabel = overview.travelStyle || travelStyle.label;
  const styleHint = overview.summary || travelStyle.hint;
  return `
    <header class="article-hero">
      <div class="article-hero__copy">
        <p class="eyebrow">${escapeHtml(eyebrow)}</p>
        <h2>${escapeHtml(overview.title || getTripTitle())}</h2>
        ${overview.summary ? `<p class="article-hero__summary">${escapeHtml(overview.summary)}</p>` : ""}
      </div>
      ${renderTravelImageMarkup({
        imageKey: `hero-${days[0]?.id || "trip"}`,
        query: days[0]?.schedule?.[0]?.title || days[0]?.city || getTripTitle(),
        city: days[0]?.city || "",
        fallback: days[0]?.image || "reef",
        label: getTripBadge(),
        extraClass: "article-hero__image"
      })}
    </header>

    <section class="article-summary-grid" aria-label="行程摘要">
      <article>
        <span>总天数</span>
        <strong>${days.length} 天</strong>
        <p>${escapeHtml(overview.destinations || state.route.map((city) => city.city).join("、"))}</p>
      </article>
      <article>
        <span>日期范围</span>
        <strong>${escapeHtml(overview.dateRange || getTripDateRange(days))}</strong>
        <p>${escapeHtml(overview.companions || "同行人待补充")}</p>
      </article>
      <article>
        <span>旅行风格</span>
        <strong>${escapeHtml(styleLabel)}</strong>
        <p>${escapeHtml(styleHint)}</p>
      </article>
      <article>
        <span>预算预估</span>
        <strong>${getBudgetTotal()}</strong>
        <p>交通、住宿、体验和餐饮</p>
      </article>
    </section>
  `;
}

function getTripDateRange(days) {
  if (!days.length) return "待确定";
  return `共 ${days.length} 天 · D1–D${days.length}`;
}

function getTripGuide(days = getPlanDays()) {
  if (!state.tripGuide && days.length) {
    state.tripGuide = buildTripGuideFromItinerary(days);
  }
  return state.tripGuide ? normalizeTripGuide(state.tripGuide) : null;
}

function extractLooseDisplayText(value, depth = 0) {
  if (value === undefined || value === null || depth > 3) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return String(value).replace(/\[object Object\]/g, " ").trim();
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => extractLooseDisplayText(item, depth + 1))
      .filter(Boolean)
      .join(" · ")
      .trim();
  }
  if (typeof value === "object") {
    const preferredKeys = [
      "name",
      "title",
      "label",
      "text",
      "value",
      "content",
      "description",
      "detail",
      "summary",
      "city",
      "area",
      "address",
      "note",
      "remark"
    ];
    for (const key of preferredKeys) {
      const text = extractLooseDisplayText(value[key], depth + 1);
      if (text) return text;
    }
    for (const nested of Object.values(value).slice(0, 6)) {
      const text = extractLooseDisplayText(nested, depth + 1);
      if (text) return text;
    }
  }
  return "";
}

function sanitizeLooseDisplayText(value) {
  return extractLooseDisplayText(value)
    .replace(/^[\s·|｜:：-]+|[\s·|｜:：-]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalizeStayLabel(value, fallback = "") {
  const text = sanitizeLooseDisplayText(value)
    .replace(/^(?:入住|住在|下榻)\s*/i, "")
    .trim();
  return text || fallback;
}

function normalizeGuideAccommodationNights(nights) {
  return (Array.isArray(nights) ? nights : [])
    .map((item, index) => ({
      ...item,
      day: Number(item?.day) || index + 1,
      city: sanitizeLooseDisplayText(item?.city),
      name: normalizeStayLabel(item?.name),
      area: sanitizeLooseDisplayText(item?.area),
      checkIn: sanitizeLooseDisplayText(item?.checkIn),
      checkOut: sanitizeLooseDisplayText(item?.checkOut),
      note: sanitizeLooseDisplayText(item?.note)
    }))
    .filter((item) => item.city || item.name || item.area || item.note);
}

function normalizeGuideHotelList(hotels) {
  return (Array.isArray(hotels) ? hotels : [])
    .map((hotel) => ({
      ...hotel,
      name: normalizeStayLabel(hotel?.name),
      city: sanitizeLooseDisplayText(hotel?.city),
      area: sanitizeLooseDisplayText(hotel?.area),
      note: sanitizeLooseDisplayText(hotel?.note),
      badge: sanitizeLooseDisplayText(hotel?.badge),
      reason: sanitizeLooseDisplayText(hotel?.reason),
      budget: sanitizeLooseDisplayText(hotel?.budget)
    }))
    .filter((hotel) => hotel.name || hotel.city || hotel.area);
}

function normalizeTripGuide(guide) {
  if (!guide || typeof guide !== "object") return null;
  return {
    overview: guide.overview || {},
    essentials: guide.essentials || {},
    inspiration: guide.inspiration || {},
    transport: guide.transport || {},
    accommodation: {
      ...(guide.accommodation || {}),
      nights: normalizeGuideAccommodationNights(guide.accommodation?.nights),
      tips: Array.isArray(guide.accommodation?.tips)
        ? guide.accommodation.tips.map(sanitizeLooseDisplayText).filter(Boolean)
        : []
    },
    dining: guide.dining || {},
    activities: guide.activities || {},
    budget: guide.budget || {},
    preparation: guide.preparation || {},
    communication: guide.communication || {},
    checklist: guide.checklist || {},
    lists: {
      ...(guide.lists || { spots: [], hotels: [], restaurants: [] }),
      hotels: normalizeGuideHotelList(guide.lists?.hotels)
    },
    document: guide.document || {}
  };
}

function getEmptyTripGuide() {
  return {
    overview: {},
    essentials: {},
    inspiration: {},
    transport: {},
    accommodation: {},
    dining: {},
    activities: {},
    budget: {},
    preparation: {},
    communication: {},
    checklist: {},
    lists: { spots: [], hotels: [], restaurants: [] },
    document: {}
  };
}

function mergeTripGuide(existing, incoming) {
  if (!incoming) return existing;
  const base = normalizeTripGuide(existing) || getEmptyTripGuide();
  const next = normalizeTripGuide(incoming) || getEmptyTripGuide();
  return {
    overview: { ...base.overview, ...next.overview },
    essentials: { ...base.essentials, ...next.essentials, items: next.essentials.items || base.essentials.items },
    inspiration: {
      ...base.inspiration,
      ...next.inspiration,
      destinations: next.inspiration?.destinations?.length
        ? next.inspiration.destinations
        : base.inspiration?.destinations
    },
    transport: { ...base.transport, ...next.transport, intercity: next.transport.intercity || base.transport.intercity, localTips: next.transport.localTips || base.transport.localTips },
    accommodation: { ...base.accommodation, ...next.accommodation, nights: next.accommodation.nights || base.accommodation.nights },
    dining: { ...base.dining, ...next.dining, mustTry: next.dining.mustTry || base.dining.mustTry },
    activities: { ...base.activities, ...next.activities, highlights: next.activities.highlights || base.activities.highlights, backup: next.activities.backup || base.activities.backup },
    budget: { ...base.budget, ...next.budget, categories: next.budget.categories || base.budget.categories },
    preparation: { ...base.preparation, ...next.preparation, packing: next.preparation.packing || base.preparation.packing, todos: next.preparation.todos || base.preparation.todos },
    communication: { ...base.communication, ...next.communication, phrases: next.communication.phrases || base.communication.phrases, apps: next.communication.apps || base.communication.apps },
    checklist: { ...base.checklist, ...next.checklist, items: next.checklist.items || base.checklist.items },
    lists: {
      ...base.lists,
      ...next.lists,
      spots: sanitizeGuideSpots(next.lists?.spots || base.lists?.spots || []),
      hotels: next.lists?.hotels || base.lists?.hotels,
      restaurants: next.lists?.restaurants || base.lists?.restaurants
    },
    document: {
      ...base.document,
      ...next.document,
      quickItems: next.document?.quickItems || base.document?.quickItems,
      dayPlans: next.document?.dayPlans || base.document?.dayPlans,
      tipsSections: next.document?.tipsSections || base.document?.tipsSections,
      tipsHeading: next.document?.tipsHeading || base.document?.tipsHeading
    }
  };
}

function buildTripGuideFromItinerary(days) {
  const cities = resolveTripDestinationNames(days);
  const travelStyle = getTravelStyle(days);
  const { isDomestic } = getTripContext(days);

  const guide = normalizeTripGuide({
    overview: {
      title: getTripTitle(),
      dateRange: getTripDateRange(days),
      destinations: cities.join("、"),
      companions: "",
      travelStyle: travelStyle.label,
      emergencyContact: "",
      summary: `${cities.join("、")} ${days.length} 日 · ${travelStyle.label}`
    },
    essentials: {
      timezone: isDomestic ? "" : "抵达后按当地时间调整作息",
      voltage: isDomestic ? "" : "出发前确认插座规格，必要时带转换插头",
      visa: isDomestic ? "" : "确认护照有效期与签证 / 签注",
      insurance: "",
      embassy: isDomestic ? "" : "保存目的地中国使领馆联系方式",
      items: getPreTripNotes(days)
    },
    inspiration: {
      activities: days.flatMap((day) => day.stops).filter(Boolean).slice(0, 6),
      foods: extractGuideFoods(days),
      places: cities.flatMap((city) => state.route.find((r) => r.city === city)?.stops || []).slice(0, 6),
      notes: ""
    },
    transport: {
      intercity: buildIntercityTransportGuide(days),
      localSummary: days[0]?.transport ? `以${days[0].transport}衔接各点` : "",
      localTips: isDomestic
        ? []
        : [
            { title: "交通卡", detail: "抵达首日办交通卡或 eSIM，减少购票排队。" },
            { title: "打车", detail: "高峰与景区返程多留 20 分钟弹性。" }
          ]
    },
    accommodation: {
      nights: [],
      tips: ["选次日动线顺路、交通便利的区域"]
    },
    dining: {
      mustTry: [],
      markets: extractGuideMarkets(days),
      dietaryNotes: ""
    },
    activities: {
      highlights: [],
      backup: [
        { title: "雨天", detail: "改室内展馆、商场或咖啡馆。" },
        { title: "体力不够", detail: "删 1 个远点，保核心景点。" }
      ]
    },
    budget: {
      categories: getDocumentBudgetDetails(days).map((item) => ({
        label: item.label,
        estimate: item.value,
        detail: item.detail
      })),
      paymentTips: isDomestic ? "" : "大额消费留意汇率与境外刷卡通知",
      prepaid: ["大交通", "核心酒店", "热门门票"]
    },
    preparation: {
      packing: [
        {
          category: "证件",
          items: isDomestic ? ["身份证", "订单截图"] : ["护照", "签证页", "订单截图"]
        },
        { category: "装备", items: ["充电宝", "雨具", "防滑鞋", "常用药"] }
      ],
      todos: [
        { task: "核对订单", detail: "交通、酒店、门票的日期与姓名。" },
        { task: "行前 1 天", detail: "看天气、路况和景区公告。" }
      ],
      devices: isDomestic ? ["地图", "点评", "打车"] : ["地图", "翻译", "点评", "打车"]
    },
    communication: {
      phrases: isDomestic ? [] : [{ phrase: "Hello / Thank you", meaning: "基础礼貌用语" }],
      apps: isDomestic
        ? []
        : [
            { name: "地图", use: "离线地图 + 路况" },
            { name: "点评", use: "餐厅预约" },
            { name: "打车", use: "夜间返程" }
          ],
      emergency: isDomestic ? [] : ["报警", "急救", "使领馆"]
    },
    checklist: {
      items: getDocumentChecklist(days)
    },
    lists: {
      spots: [],
      hotels: [],
      restaurants: []
    }
  });

  guide.document = buildDocumentCanvas(days, guide);
  return guide;
}

function isTransportOrStayActivity(title, detail = "") {
  const text = `${title} ${detail}`;
  if (/(餐|小吃|美食|餐厅|农家|鱼宴)/.test(title)) return false;
  return /(抵达|到达|入住|休整|返程|出发|退房|乘车|乘船|环湖|步行|登山|登顶|办理|观景点|返回|赶路|高铁|机场|码头|乘船|回酒店|回民宿|送机|送站|离境|出境|回家|回程|打包|动线)/.test(title);
}

function cleanScenicSpotTitle(value) {
  return String(value || "")
    .replace(/^(游览|参观|打卡|体验|前往|抵达|返回|返程|入住|午餐[:：]?|晚餐[:：]?|早餐[:：]?)/, "")
    .replace(/^(在|去|到)/, "")
    .replace(/(附近|一带|沿线|休整|准备|动线)$/, "")
    .trim();
}

function isGenericGuideSpotName(name = "", detail = "") {
  const title = String(name || "").trim();
  const text = `${title} ${detail}`.trim();
  if (!title || title.length < 2) return true;
  if (/^(自由活动|新的安排|酒店休息|返程|返程准备|无|待定|核心体验|核心景点|核心街区|代表景点|当地美食|轻松漫步|打包|休整)$/.test(title)) return true;
  if (/^(午餐|晚餐|早餐|夜宵|下午茶|用餐|就餐)$/.test(title)) return true;
  if (isTransportOrStayActivity(title, detail)) return true;
  if (/^(前往|抵达|到达|返回|回程|返程|出发|送机|送站|离境|出境|入住|退房|休整|休息|准备|赶路|乘车|乘船|回|去)/.test(title) && title.length <= 8) return true;
  if (/^(回|去).{0,6}(酒店|民宿|机场|车站|码头|家|悉尼|墨尔本|凯恩斯)/.test(title)) return true;
  if (/^(.*)(准备|动线|交通|出发地|送机|送站|回家|回程|离境|出境)$/.test(title) && title.length <= 10) return true;
  if (!text) return true;
  return false;
}

function resolveScenicSpotEntity(activity, day) {
  const title = String(activity.title || "").trim();
  const detail = String(activity.detail || "").trim();
  if (!title || isGenericGuideSpotName(title, detail)) return null;
  if (isTransportOrStayActivity(title, detail)) return null;
  if (/(早餐|午餐|晚餐|夜宵|餐厅|美食|小吃|咖啡|茶|农家|鱼宴|饭店|酒楼|品尝|用餐|鱼宴)/.test(title)) return null;

  const stripped = cleanScenicSpotTitle(title);
  if (!stripped || stripped.length < 2 || isGenericGuideSpotName(stripped, detail)) return null;

  const text = `${stripped} ${detail}`;
  const isScenic =
    /(景区|风景|公园|博物馆|美术馆|展览|古镇|古城|老街|岛|湖区|湖|山|峰|寺|庙|塔|桥|湾|滩| reef|Opera|Beach|World|Center|广场|街区|巷|园|码头|森林|草原|沙漠|瀑布|洞|谷| zoo|水族|剧院|剧场|演出|索道|缆车|游船|出海|漂流|温泉|国家公园|文化|中心|湿地|滑道|骑行|漫步|观景台|大堡礁|菲利普|蓝山|三姐妹|千岛湖|黄山尖|梅峰|渔村|天屿|东南|尖|岩|石|堡|礁|谷|坝|关|门|楼|阁|殿|院|祠|陵|墓|坊|圩|里|弄|坞|澳|港|堤|岸|坡|顶|底|源|口|渡|关|寨|堡|城|镇|村|庄|坞|岭|岗|坡|坪|原|川|溪|涧|潭|池|泉|洞|窟|崖|壁|谷|峡|沟|坡|顶|底|源|口|渡|关|寨)/i.test(text)
    || /[A-Za-z]{3,}/.test(stripped);

  if (!isScenic) return null;

  return {
    name: stripped,
    city: day.city,
    note: detail ? `D${day.day} · ${detail.slice(0, 48)}` : `D${day.day}`,
    image: day.image || getImageForStop(day.cityId, 0)
  };
}

function sanitizeGuideSpots(spots) {
  return (Array.isArray(spots) ? spots : [])
    .map((spot) => {
      const name = cleanScenicSpotTitle(spot?.name || "");
      if (!name || isGenericGuideSpotName(name, spot?.note || "")) return null;
      return { ...spot, name };
    })
    .filter(Boolean);
}

function extractEntitySpecialty(detail = "") {
  const match = String(detail).match(/(?:品尝|特色|招牌|推荐|必点)([^，。；]{2,24})/);
  return match ? match[1].trim() : "";
}

function resolveHotelEntity(day, nightCount = 1) {
  const booking = ensureBooking("hotels", day.cityId);
  if (booking?.booked && booking.name) {
    return {
      name: booking.name,
      area: String(booking.detail || "").split("·")[0]?.trim() || day.city,
      note: booking.detail || "",
      image: day.image || "laneway"
    };
  }

  const seed = hotelSeed.find((hotel) => hotel.city === day.city);
  if (seed) {
    return { name: seed.name, area: seed.area, note: seed.reason, image: seed.image };
  }

  if (booking?.name && !/(方案|待订)/.test(booking.name)) {
    return {
      name: booking.name,
      area: day.city,
      note: booking.detail || "",
      image: day.image || "laneway"
    };
  }

  const stay = String(day.stay || "").trim();
  const areaMatch = stay.match(/(?:建议住|住在|入住|选|落脚)([^，。；\s]{2,14}?)(?:一带|附近|区域|边上|沿线|民宿|酒店)/);
  if (areaMatch) {
    const area = areaMatch[1].trim();
    return {
      name: `${area}酒店`,
      area,
      note: nightCount > 1 ? `${stay} · 连住 ${nightCount} 晚` : stay,
      image: day.image || "laneway"
    };
  }

  if (/(酒店|民宿|客栈|度假村|宾馆)/.test(stay) && !/(建议|待定|同上)/.test(stay)) {
    return { name: stay, area: day.city, note: day.summary || "", image: day.image || "laneway" };
  }

  if (stay && !/(不住宿|返程|无|待定|同上)/.test(stay)) {
    return {
      name: `${day.city}酒店（待订）`,
      area: day.city,
      note: stay,
      image: day.image || "laneway"
    };
  }

  return null;
}

function buildGuideHotelList(days) {
  const safeDays = Array.isArray(days) ? days : [];
  const hotels = [];
  const seen = new Set();
  const cityGroups = new Map();

  safeDays.forEach((day) => {
    if (!day.stay || /(不住宿|返程|无住宿|不住)/.test(day.stay)) return;
    const key = day.cityId || day.city;
    if (!cityGroups.has(key)) {
      cityGroups.set(key, { city: day.city, cityId: day.cityId, days: [], anchor: day });
    }
    cityGroups.get(key).days.push(day.day);
  });

  cityGroups.forEach((group) => {
    const entity = resolveHotelEntity(group.anchor, group.days.length);
    if (!entity) return;
    const dedupeKey = entity.name.toLowerCase();
    if (seen.has(dedupeKey)) return;
    seen.add(dedupeKey);

    const nightLabel = group.days.length > 1 ? `连住 ${group.days.length} 晚` : `D${group.days[0]}`;
    hotels.push({
      name: entity.name,
      city: group.city,
      area: entity.area || group.city,
      image: entity.image || "laneway",
      note: entity.note || "",
      badge: `${group.city} · ${nightLabel}`
    });
  });

  return hotels;
}

function resolveRestaurantEntity(activity, day) {
  const title = String(activity.title || "").trim();
  const detail = String(activity.detail || "").trim();
  const text = `${title} ${detail}`;

  if (!/(餐|美食|小吃|农家|鱼宴|饭店|酒楼|品尝|用餐|鱼头|土菜|鱼宴)/.test(text)) return null;
  if (isTransportOrStayActivity(title, detail)) return null;

  const stripped = title.replace(/^(午餐|晚餐|早餐|夜宵|品尝)[:：\s]*/i, "").trim();
  if (
    stripped.length >= 2 &&
    stripped.length <= 18 &&
    /(小吃|餐厅|美食|农家|鱼头|馆|店|宴|美食街|老街|圩|巷)/.test(stripped)
  ) {
    return { name: stripped, specialty: extractEntitySpecialty(detail), note: detail };
  }

  const detailName =
    detail.match(/在[「“]?([^，。、""]{2,16}?)(?:用餐|就餐|品尝)/)?.[1] ||
    detail.match(/([^，。、]{2,14}(?:餐厅|饭店|酒楼|农家乐|小吃店|小吃街))/)?.[1] ||
    detail.match(/品尝([^，。、]{2,14})/)?.[1] ||
    detail.match(/推荐(?:去)?([^，。、]{2,14}(?:餐|店|馆))/)?.[1];

  if (detailName) {
    const name = detailName.trim();
    if (name.length >= 2 && !isTransportOrStayActivity(name, detail)) {
      return { name, specialty: extractEntitySpecialty(detail), note: detail };
    }
  }

  const placeMatch = text.match(/([^，。、]{2,10}(?:镇|街|巷|村))(?:附近|品尝|特色|美食)/);
  if (placeMatch && /(农家|土菜|鱼|美食|小吃)/.test(text)) {
    return {
      name: `${placeMatch[1]}特色美食`,
      specialty: extractEntitySpecialty(detail) || "本地风味",
      note: detail
    };
  }

  return null;
}

function buildGuideRestaurantList(days) {
  const safeDays = Array.isArray(days) ? days : [];
  const seen = new Set();
  const restaurants = [];

  safeDays.forEach((day) => {
    (day.schedule || []).forEach((activity, index) => {
      const entity = resolveRestaurantEntity(activity, day);
      if (!entity) return;
      const key = entity.name.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      restaurants.push({
        name: entity.name,
        city: day.city,
        image: day.image || getImageForStop(day.cityId, index + 1),
        specialty: entity.specialty || "",
        note: entity.note || activity.detail || ""
      });
    });
  });

  return restaurants.slice(0, 10);
}

function getGuideHotelsList(guide, days) {
  if (guide?.lists?.hotels?.length) return guide.lists.hotels;
  return buildGuideHotelList(days);
}

function getGuideRestaurantsList(guide, days) {
  if (guide?.lists?.restaurants?.length) return guide.lists.restaurants;
  return buildGuideRestaurantList(days);
}

function ensureGuideHotelsList(guide, days) {
  guide.lists = guide.lists || { spots: [], hotels: [], restaurants: [] };
  if (!guide.lists.hotels.length) {
    guide.lists.hotels = buildGuideHotelList(days);
  }
  return guide.lists.hotels;
}

function ensureGuideRestaurantsList(guide, days) {
  guide.lists = guide.lists || { spots: [], hotels: [], restaurants: [] };
  if (!guide.lists.restaurants.length) {
    guide.lists.restaurants = buildGuideRestaurantList(days);
  }
  return guide.lists.restaurants;
}

function buildGuideSpotsWishlist(days, inspiration = {}) {
  const seen = new Set();
  const spots = [];
  const safeDays = Array.isArray(days) ? days : [];

  const addSpot = (spot) => {
    const name = String(spot?.name || "").trim();
    if (!name || isGenericGuideSpotName(name, spot?.note || "")) return;
    const key = name.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    spots.push({ ...spot, name });
  };

  safeDays.forEach((day) => {
    (day.schedule || []).forEach((activity) => {
      const entity = resolveScenicSpotEntity(activity, day);
      if (entity) addSpot(entity);
    });
  });

  [...new Set(safeDays.map((day) => day.city))].forEach((city) => {
    const routeCity = state.route.find((route) => route.city === city);
    (routeCity?.stops || []).forEach((stop) => {
      const name = cleanScenicSpotTitle(stop);
      if (!name || isGenericGuideSpotName(name)) return;
      addSpot({
        name,
        city,
        note: "",
        image: getImageForStop(routeCity?.id, spots.length)
      });
    });
  });

  (Array.isArray(inspiration) ? inspiration : inspiration.places || []).forEach((place) => {
    const rawName = typeof place === "string" ? place : place?.name;
    const name = cleanScenicSpotTitle(rawName);
    if (!name || isGenericGuideSpotName(name)) return;
    addSpot({
      name,
      city: typeof place === "object" ? place.city || "" : "",
      note: "种草",
      image: getImageForStop(state.route.find((route) => route.city === (typeof place === "object" ? place.city : ""))?.id, spots.length)
    });
  });

  return spots.slice(0, 12);
}

function getGuideSpotsList(guide, days) {
  const stored = sanitizeGuideSpots(guide?.lists?.spots || []);
  if (stored.length) return stored;
  return buildGuideSpotsWishlist(days, guide?.inspiration || {});
}

function ensureGuideSpotsList(guide, days) {
  guide.lists = guide.lists || { spots: [], hotels: [], restaurants: [] };
  const sanitized = sanitizeGuideSpots(guide.lists.spots);
  if (sanitized.length) {
    guide.lists.spots = sanitized;
    return guide.lists.spots;
  }
  guide.lists.spots = buildGuideSpotsWishlist(days, guide.inspiration || {});
  return guide.lists.spots;
}

function extractGuideFoods(days) {
  return days
    .flatMap((day) => day.schedule)
    .filter((activity) => /(餐|美食|小吃|咖啡|茶|餐厅)/.test(`${activity.title} ${activity.detail}`))
    .map((activity) => activity.title)
    .slice(0, 6);
}

function extractGuideMarkets(days) {
  const text = days.map((day) => `${day.city} ${day.summary}`).join(" ");
  const markets = [];
  if (/(市场|夜市|集市)/.test(text)) markets.push("当地夜市与集市");
  days.forEach((day) => {
    day.stops.forEach((stop) => {
      if (/(市场|夜市|小吃)/.test(stop)) markets.push(stop);
    });
  });
  return [...new Set(markets)].slice(0, 5);
}

function extractGuideRestaurants(days) {
  return days
    .flatMap((day) => day.schedule)
    .filter((activity) => /(餐|餐厅|美食|小吃)/.test(`${activity.title} ${activity.detail}`))
    .slice(0, 5)
    .map((activity) => ({
      name: activity.title.replace(/^(午餐|晚餐|早餐)[:：]?/, "").trim() || activity.title,
      specialty: "",
      budget: "",
      note: activity.detail
    }));
}

function extractGuideActivityHighlights(days) {
  return days
    .flatMap((day) =>
      day.schedule.map((activity) => ({
        name: activity.title,
        openHours: "",
        ticket: /(门票|景区|博物馆|演出|索道|游船)/.test(`${activity.title} ${activity.detail}`) ? "建议提前预约" : "",
        booking: "",
        note: activity.detail ? `D${day.day} · ${activity.detail}` : `D${day.day} · ${day.city}`
      }))
    )
    .slice(0, 6);
}

function buildIntercityTransportGuide(days) {
  const segments = [];
  const cityOrder = [];
  days.forEach((day) => {
    if (cityOrder[cityOrder.length - 1] !== day.city) cityOrder.push(day.city);
  });
  for (let i = 1; i < cityOrder.length; i += 1) {
    segments.push({
      type: "跨城",
      title: `${cityOrder[i - 1]} → ${cityOrder[i]}`,
      detail: "比较高铁 / 航班耗时与价格，预留换乘时间"
    });
  }
  days.forEach((day) => {
    day.schedule.forEach((activity) => {
      const text = `${activity.title} ${activity.detail}`;
      if (/(航班|飞机|机场)/.test(text)) {
        segments.push({ type: "航班", title: activity.title, detail: activity.detail });
      } else if (/(高铁|动车|火车|高铁站)/.test(text)) {
        segments.push({ type: "高铁", title: activity.title, detail: activity.detail });
      }
    });
  });
  return segments.slice(0, 6);
}

function getTripContext(days = getPlanDays()) {
  const tripText = days
    .flatMap((day) => [day.city, day.title, day.summary, day.transport, ...(day.schedule || []).flatMap((activity) => [activity.title, activity.detail])])
    .filter(Boolean)
    .join(" ");
  const isDomestic =
    /(中国|省|市|高铁|地铁|国内)/.test(tripText) ||
    !/(悉尼|墨尔本|东京|巴黎|伦敦|纽约|首尔|曼谷|新加坡|洛杉矶)/.test(tripText);
  return { tripText, isDomestic };
}

function isGuideBoilerplate(text) {
  const value = String(text || "").trim();
  if (!value) return true;
  return /(国内行程通常|无需签证|一般无需转换|220V|可在右侧对话|如有过敏、宗教|建议购买含医疗|使领馆（境外）|出发前确认开放时间与预约规则|可通过右侧预订|见行程详情|人均待确认|待确认)/.test(
    value
  );
}

function buildDocSection({ title, emoji, accent, lines }) {
  const body = (lines || [])
    .map((line) => String(line || "").trim())
    .filter(Boolean)
    .join("\n");
  if (!body) return null;
  return { title, emoji, accent, body };
}

function renderInlineMarkdown(text) {
  const escaped = escapeHtml(String(text ?? ""));
  return escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

function renderDocMarkdown(source) {
  if (!source || !String(source).trim()) return "";

  const lines = String(source).trim().split("\n");
  const html = [];
  let inList = false;
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${renderInlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!inList) return;
    html.push("</ul>");
    inList = false;
  };

  lines.forEach((rawLine) => {
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushParagraph();
      closeList();
      return;
    }

    if (/^>\s+/.test(trimmed)) {
      flushParagraph();
      closeList();
      html.push(`<blockquote class="doc-markdown-callout">${renderInlineMarkdown(trimmed.replace(/^>\s+/, ""))}</blockquote>`);
      return;
    }

    if (/^##\s+/.test(trimmed)) {
      flushParagraph();
      closeList();
      html.push(`<h3>${renderInlineMarkdown(trimmed.replace(/^##\s+/, ""))}</h3>`);
      return;
    }

    if (/^###\s+/.test(trimmed)) {
      flushParagraph();
      closeList();
      html.push(`<h4>${renderInlineMarkdown(trimmed.replace(/^###\s+/, ""))}</h4>`);
      return;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${renderInlineMarkdown(trimmed.replace(/^[-*]\s+/, ""))}</li>`);
      return;
    }

    closeList();
    paragraph.push(trimmed);
  });

  flushParagraph();
  closeList();
  return html.join("\n");
}

function renderDocMarkdownBlock(section) {
  if (!section?.body) return "";
  const html = renderDocMarkdown(section.body);
  if (!html) return "";
  const accent = section.accent || "blue";
  return `
    <section class="doc-markdown-section doc-markdown-section--${escapeAttr(accent)}">
      <header class="doc-markdown-section__head">
        <span class="doc-markdown-section__emoji" aria-hidden="true">${section.emoji || "📄"}</span>
        <div>
          <p class="doc-markdown-section__eyebrow">Guide</p>
          <h3>${escapeHtml(section.title || "补充说明")}</h3>
        </div>
      </header>
      <div class="doc-markdown">${html}</div>
    </section>
  `;
}

function buildEssentialsSection(essentials = {}, days) {
  const { isDomestic } = getTripContext(days);
  const lines = [];

  if (!isDomestic) {
    if (essentials.visa && !isGuideBoilerplate(essentials.visa)) lines.push(`- **签注 / 签证：** ${essentials.visa}`);
    if (essentials.timezone && !isGuideBoilerplate(essentials.timezone)) lines.push(`- **时差：** ${essentials.timezone}`);
    if (essentials.voltage && !isGuideBoilerplate(essentials.voltage)) lines.push(`- **插座：** ${essentials.voltage}`);
    if (essentials.embassy && !isGuideBoilerplate(essentials.embassy)) lines.push(`- **使领馆：** ${essentials.embassy}`);
  }

  (essentials.items || getPreTripNotes(days)).forEach((note) => {
    lines.push(`- **${note.title}：** ${note.detail}`);
  });

  return buildDocSection({ title: "出行备忘", emoji: "🎒", accent: "amber", lines });
}

function buildInspirationSection(inspiration = {}) {
  const lines = [];
  const activities = (inspiration.activities || []).filter(Boolean);
  const foods = (inspiration.foods || []).filter(Boolean);
  const places = (inspiration.places || []).filter(Boolean);

  if (activities.length) lines.push(`- **想体验：** ${activities.slice(0, 6).join(" · ")}`);
  if (foods.length) lines.push(`- **必吃：** ${foods.slice(0, 6).join(" · ")}`);
  if (places.length) lines.push(`- **种草：** ${places.slice(0, 6).join(" · ")}`);

  if (inspiration.notes && !isGuideBoilerplate(inspiration.notes)) {
    lines.push(`> ${inspiration.notes}`);
  }

  return buildDocSection({ title: "灵感清单", emoji: "✨", accent: "violet", lines });
}

function buildTransportSection(transport = {}, days) {
  const lines = [];
  const intercity = transport.intercity || buildIntercityTransportGuide(days);

  intercity.slice(0, 4).forEach((item) => {
    const label = item.type === "城际交通" ? "跨城" : item.type || "大交通";
    const body = [item.title, item.detail].filter((part) => part && !isGuideBoilerplate(part)).join(" — ");
    if (body) lines.push(`- **${label}：** ${body}`);
  });

  if (transport.localSummary && !isGuideBoilerplate(transport.localSummary)) {
    lines.push(`- **市内：** ${transport.localSummary}`);
  }

  (transport.localTips || []).slice(0, 2).forEach((tip) => {
    if (tip.detail && !isGuideBoilerplate(tip.detail)) {
      lines.push(`- **${tip.title.replace(/策略|与接驳/, "")}：** ${tip.detail}`);
    }
  });

  return buildDocSection({ title: "交通清单", emoji: "🚆", accent: "blue", lines });
}

function buildAccommodationSection(accommodation = {}, guide, days) {
  const lines = [];
  getGuideHotelsList(guide, days).forEach((hotel) => {
    const body = [hotel.area, hotel.note].filter(Boolean).join(" · ");
    lines.push(`- **${hotel.name}：** ${body || hotel.city}`);
  });

  const tips = (accommodation.tips || []).filter((tip) => tip && !isGuideBoilerplate(tip));
  if (tips.length === 1) {
    lines.push(`> ${tips[0]}`);
  }

  if (!lines.length) return null;
  return buildDocSection({ title: "酒店清单", emoji: "🏨", accent: "teal", lines });
}

function buildDiningSection(dining = {}, guide, days) {
  const lines = [];

  getGuideRestaurantsList(guide, days).forEach((item) => {
    const body = [item.specialty, item.note].filter((part) => part && !isGuideBoilerplate(part)).join(" · ");
    lines.push(`- **${item.name}：** ${body || item.city || "待补充"}`);
  });

  if (dining.markets?.length) {
    lines.push(`- **小吃 / 市集：** ${dining.markets.slice(0, 4).join(" · ")}`);
  }

  if (dining.dietaryNotes && !isGuideBoilerplate(dining.dietaryNotes)) {
    lines.push(`- **注意：** ${dining.dietaryNotes}`);
  }

  if (!lines.length) return null;
  return buildDocSection({ title: "餐厅清单", emoji: "🍜", accent: "orange", lines });
}

function buildSpotsSection(guide, days) {
  const spots = getGuideSpotsList(guide, days);
  const lines = spots.map((spot) => {
    const meta = [spot.city, spot.note].filter(Boolean).join(" · ");
    return `- **${spot.name}：** ${meta || "待补充"}`;
  });

  const backup = guide.activities?.backup || [];
  if (backup.length) {
    lines.push("", "### 🌧️ 备选");
    backup.slice(0, 2).forEach((item) => {
      lines.push(`- **${item.title}：** ${item.detail}`);
    });
  }

  if (!lines.length) return null;
  return buildDocSection({ title: "景点清单", emoji: "🎯", accent: "green", lines });
}

function buildBudgetSection(budget = {}, days) {
  const categories = budget.categories || getDocumentBudgetDetails(days);
  const lines = [`> 预估 **${getBudgetTotal()}**，按项查价更准 👇`, ""];

  categories.forEach((item) => {
    const value = item.estimate || item.value;
    if (!item.detail) return;
    lines.push(`- **${item.label}${value ? ` · ${value}` : ""}：** ${item.detail}`);
  });

  if (budget.prepaid?.length) {
    lines.push(`- **先订：** ${budget.prepaid.join(" · ")}`);
  }

  if (budget.paymentTips && !isGuideBoilerplate(budget.paymentTips)) {
    lines.push(`- **支付：** ${budget.paymentTips}`);
  }

  return buildDocSection({ title: "预算参考", emoji: "💰", accent: "gold", lines });
}

function buildPreparationSection(preparation = {}, days) {
  const { isDomestic } = getTripContext(days);
  const lines = [];

  if (preparation.packing?.length) {
    lines.push("### 📦 行李");
    preparation.packing.forEach((group) => {
      let items = (group.items || []).filter(Boolean);
      if (isDomestic) items = items.filter((item) => !/(护照|签证|转换插头)/.test(item));
      if (!items.length) return;
      lines.push(`- **${group.category.replace(/与文件/, "")}：** ${items.join(" · ")}`);
    });
  }

  (preparation.todos || []).slice(0, 3).forEach((item) => {
    lines.push(`- **${item.task}：** ${item.detail}`);
  });

  const devices = (preparation.devices || []).filter((item) => !(isDomestic && /翻译/.test(item)));
  if (devices.length) {
    lines.push(`- **App：** ${devices.join(" · ")}`);
  }

  return buildDocSection({ title: "行前准备", emoji: "🧳", accent: "slate", lines });
}

function buildCommunicationSection(communication = {}, days) {
  const { isDomestic } = getTripContext(days);
  if (isDomestic) return null;

  const lines = [];
  (communication.apps || []).forEach((item) => {
    if (item.use) lines.push(`- **${item.name}：** ${item.use}`);
  });
  (communication.phrases || []).forEach((item) => {
    lines.push(`- **${item.phrase}：** ${item.meaning}`);
  });
  if (communication.emergency?.length) {
    lines.push(`- **紧急：** ${communication.emergency.join(" · ")}`);
  }

  return buildDocSection({ title: "通讯工具", emoji: "📱", accent: "purple", lines });
}

function buildChecklistSection(days, guide) {
  const items = guide?.checklist?.items?.length ? guide.checklist.items : getDocumentChecklist(days);
  if (!items.length) return null;
  return buildDocSection({
    title: "避坑提醒",
    emoji: "⚠️",
    accent: "rose",
    lines: items.map((item) => `- ${item}`)
  });
}

function renderGuideMarkdownFlow(sections) {
  const html = sections.filter(Boolean).map((section) => renderDocMarkdownBlock(section)).filter(Boolean).join("");
  if (!html) return "";
  return `<div class="doc-markdown-flow">${html}</div>`;
}

function renderGuideMainDocument(guide, days) {
  if (!guide) return "";
  return renderGuideMarkdownFlow([
    buildEssentialsSection(guide.essentials || {}, days),
    buildInspirationSection(guide.inspiration || {})
  ]);
}

function renderGuideExtendedSections(guide, days) {
  if (!guide) return renderDocumentLegacySections(days);

  return renderGuideMarkdownFlow([
    buildTransportSection(guide.transport || {}, days),
    buildAccommodationSection(guide.accommodation || {}, guide, days),
    buildDiningSection(guide.dining || {}, guide, days),
    buildSpotsSection(guide, days),
    buildBudgetSection(guide.budget || {}, days),
    buildPreparationSection(guide.preparation || {}, days),
    buildCommunicationSection(guide.communication || {}, days),
    buildChecklistSection(days, guide)
  ]);
}

function renderDocumentLegacySections(days) {
  const guide = getTripGuide(days);
  return renderGuideMarkdownFlow([
    buildDocSection({
      title: "出行备忘",
      emoji: "🎒",
      accent: "amber",
      lines: getPreTripNotes(days).map((note) => `- **${note.title}：** ${note.detail}`)
    }),
    buildBudgetSection({}, days),
    buildChecklistSection(days, guide)
  ]);
}

function renderDocumentHotelSection(cities) {
  return `
    <section class="article-section">
      <div class="article-section__head">
        <div>
          <p class="eyebrow">Hotels</p>
          <h3>酒店建议</h3>
        </div>
      </div>
      <div class="hotel-grid">
        ${cities.map(renderRouteHotelCard).join("")}
      </div>
    </section>
  `;
}

function getPreTripNotes(days) {
  const text = days
    .flatMap((day) => [day.city, day.title, day.summary, day.transport, day.stay, ...day.schedule.flatMap((activity) => [activity.title, activity.detail])])
    .join(" ");
  const notes = [
    {
      title: "行前确认",
      detail: `D1 前查好${days[0]?.city || "目的地"}天气和首段交通，截图放手机。`
    },
    {
      title: "装备",
      detail: "分层穿衣 + 防滑鞋；徒步多的日子尤其重要。"
    },
    {
      title: "节奏",
      detail: "每天留 30–60 分钟弹性，排队或天气变化时不慌。"
    }
  ];
  if (/(高原|海拔|川西|稻城|康定|新都桥|四姑娘山|折多山)/.test(text)) {
    notes.push({
      title: "高原",
      detail: "首日不洗头、不饮酒、不剧烈运动；不适就减强度。"
    });
  }
  if (/(湖|岛|骑行|船|游船|海|雨|山)/.test(text)) {
    notes.push({
      title: "户外",
      detail: "看景区天气公告；雨天改室内或酒店周边轻松活动。"
    });
  }
  return notes;
}

function renderGeneratedNote(note) {
  return `
    <article class="generated-note">
      <h4>${escapeHtml(note.title)}</h4>
      <p>${escapeHtml(note.detail)}</p>
    </article>
  `;
}

function getDocumentBudgetDetails(days) {
  const totalDays = days.length || 1;
  const cities = [...new Set(days.map((day) => day.city).filter(Boolean))];
  const hotelNights = days.filter((day) => !/(返程|不住宿)/.test(day.stay || "")).length;
  const ticketDays = days.filter((day) => day.schedule.some((activity) => /(景区|乐园|门票|观光车|索道|游船|博物馆|展览)/.test(`${activity.title} ${activity.detail}`))).length;
  return [
    {
      label: "大交通",
      value: "待查价",
      detail: cities.length > 1 ? `${cities.join(" ↔ ")} 跨城段先锁时段` : "往返大交通先锁到达 / 返程时段"
    },
    {
      label: "住宿",
      value: `${hotelNights} 晚`,
      detail: "优先交通便利、次日动线顺路"
    },
    {
      label: "门票体验",
      value: ticketDays ? `${ticketDays} 天` : "按行程",
      detail: "热门景区 / 演出提前查预约规则"
    },
    {
      label: "吃喝 + 市内",
      value: "按日",
      detail: "正餐 + 打车机动，高峰多留 15% 弹性"
    }
  ];
}

function renderGeneratedBudgetItem(item) {
  return `
    <article class="generated-budget-item">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <p>${escapeHtml(item.detail)}</p>
    </article>
  `;
}

function getDocumentChecklist(days) {
  const firstDay = days[0];
  const lastDay = days[days.length - 1];
  const busyDays = days.filter((day) => day.pace === "偏满").map((day) => `D${day.day}`);
  const items = [
    `D1 先落位${firstDay?.city || "目的地"}住宿，别拖着行李反复换乘。`,
    lastDay ? `返程日 D${lastDay.day} 别排强预约，留延误缓冲。` : "",
    busyDays.length ? `${busyDays.join("、")} 偏满，必要时删非核心点。` : "",
    "酒店 / 门票保留可取消方案，出发前再确认天气和开放信息。"
  ];
  return items.filter(Boolean).slice(0, 4);
}

function getCitiesNeedingHotelBooking(days) {
  const cityIds = new Set(
    days
      .filter((day) => dayNeedsHotelBooking(day))
      .map((day) => day.cityId)
      .filter(Boolean)
  );
  return state.route.filter((city) => cityIds.has(city.id));
}

function dayNeedsHotelBooking(day) {
  const text = [
    day.stay,
    day.summary,
    day.transport,
    ...(Array.isArray(day.schedule) ? day.schedule.flatMap((activity) => [activity.title, activity.detail]) : [])
  ].filter(Boolean).join(" ");
  return /(入住|住宿|酒店|民宿|客栈|旅馆|过夜|住在|住到|Hotel|check[- ]?in|stay)/i.test(text);
}

function renderHotelCard(hotel) {
  return `
    <article class="hotel-card">
      ${renderTravelImageMarkup({
        imageKey: `hotel-${hotel.city}-${hotel.area}`,
        query: hotel.name || hotel.area || hotel.city,
        city: hotel.city,
        fallback: hotel.image,
        label: hotel.city.slice(0, 1),
        extraClass: "hotel-card__image"
      })}
      <div class="hotel-card__body">
        <span>${hotel.city} · ${hotel.area}</span>
        <h4>${hotel.name}</h4>
        <strong>${hotel.budget}</strong>
        <p>${hotel.reason}</p>
      </div>
    </article>
  `;
}

function renderRouteHotelCard(city) {
  const hotel = ensureBooking("hotels", city.id);
  return renderHotelCard({
    city: city.city,
    name: hotel.booked ? hotel.name : hotel.action,
    area: city.intent || "推荐住宿区域待确认",
    budget: hotel.booked ? "已确认" : "未预订",
    reason: hotel.detail,
    image: "laneway"
  });
}

function renderBudgetRow(item) {
  return `
    <article class="budget-row">
      <div>
        <strong>${item.label}</strong>
        <span>${item.note}</span>
      </div>
      <em>${item.amount}</em>
    </article>
  `;
}

function renderDaySection(day) {
  const collapsed = state.collapsed.has(day.id);
  const outlineBase = day.day;
  return `
    <article class="day-section article-day outline-day ${collapsed ? "is-collapsed" : ""}">
      <button class="day-head" type="button" data-action="toggle-day" data-day="${day.id}">
        <span>${collapsed ? "+" : "-"}</span>
        <strong>${outlineBase}. D${day.day} ${day.city}</strong>
        <em>${day.title}</em>
      </button>
      ${collapsed ? "" : renderDayItineraryBody(day)}
    </article>
  `;
}

function renderDayItineraryBody(day) {
  return `
            <div class="day-body">
              <label class="roadbook-brief">
        <div class="roadbook-brief__panel">
          <span class="roadbook-brief__emoji" aria-hidden="true">✨</span>
          <div class="roadbook-brief__content">
            <span class="roadbook-brief__label">当日导语</span>
                <textarea rows="2" data-day="${day.id}" data-day-field="summary">${escapeHtml(day.summary)}</textarea>
          </div>
        </div>
              </label>

              <div class="outline-block outline-block--plain">
                ${renderRoadbookSections(day)}
              </div>

              <div class="day-actions">
        <button type="button" data-action="open-plan-form" data-day="${day.id}">添加计划</button>
              </div>
            </div>
  `;
}

function renderRoadbookSections(day) {
  return `
    <div class="roadbook-timeline">
      ${day.schedule
        .map((activity, index) => renderRoadbookTimelineItem(day, activity, index))
        .join("")}
    </div>
  `;
}

function renderRoadbookTimelineItem(day, activity, index) {
  const imageClass = index === 0 ? day.image : getImageForStop(day.cityId, index);
  const category = getActivityCategory(activity.title, index);
  const timeRange = getActivityTimeRange(activity.time, index);
  const connector = index < day.schedule.length - 1 ? getTransportConnector(day, index) : "";
  const bookingChips = renderRoadbookBookingChips(day, activity, index);

  return `
    <article class="roadbook-section">
      <div class="roadbook-section__marker" aria-hidden="true">
        ${renderTravelImageMarkup({
          imageKey: `activity-${day.id}-${index}`,
          query: activity.title,
          city: day.city,
          fallback: imageClass,
          label: String(index + 1),
          extraClass: "roadbook-thumb",
          preferredUrl: activity.booking?.imageUrl
        })}
      </div>
      <div class="roadbook-section__copy">
        <span class="roadbook-category">${escapeHtml(category)}</span>
        <h5>${index + 1}. ${escapeHtml(activity.title)}</h5>
        <div class="roadbook-card">
          <strong>${escapeHtml(timeRange)}</strong>
          <p>${escapeHtml(activity.detail)}</p>
          ${bookingChips}
        </div>
        ${connector}
      </div>
    </article>
  `;
}

function renderRoadbookBookingChips(day, activity, index) {
  const actions = resolveActivityBookingActions(day, activity, index);
  if (!actions.length) return "";

  const chips = actions.map(({ kind, label }) => renderBookingChip(kind, day.cityId, label, day.id, activity.title, index));
  return `<div class="roadbook-bookings">${chips.join("")}</div>`;
}

function renderBookingChip(kind, cityId, actionLabel, dayId = "", query = "", activityIndex = null) {
  const booking = ensureBooking(kind, cityId);
  const pendingLabel = actionLabel || booking.action;
  return `
    <button class="booking-chip ${booking.booked ? "is-booked" : "is-pending"}" type="button" data-action="open-booking" data-kind="${kind}" data-city="${cityId}" data-day="${escapeAttr(dayId)}" data-query="${escapeAttr(query)}" data-index="${Number.isInteger(activityIndex) ? activityIndex : ""}">
      <em>${getBookingLabel(kind)}</em>
      <strong>${escapeHtml(booking.booked ? booking.name : pendingLabel)}</strong>
    </button>
  `;
}

function getActivityContextText(activity) {
  return [activity?.title, activity?.detail].filter(Boolean).join(" ");
}

function resolveActivityBookingActions(day, activity, index) {
  const contextText = getActivityContextText(activity);
  if (shouldShowHotelBooking(activity)) {
    return [{ kind: "hotels", label: getHotelBookingLabel(contextText) }];
  }

  const actions = [];

  if (shouldShowFlightBooking(day, activity, index)) {
    actions.push({ kind: "flights", label: getFlightBookingLabel(contextText) });
  }
  if (shouldShowTrainBooking(activity)) {
    actions.push({ kind: "trains", label: getTrainBookingLabel(contextText) });
  }
  if (shouldShowTicketBooking(day, activity, index)) {
    actions.push({ kind: "tickets", label: getTicketBookingLabel(contextText) });
  }

  return actions;
}

function shouldShowFlightBooking(day, activity, index) {
  const text = getActivityContextText(activity);
  const mentionsAirport = /(机场|航站楼|空港)/i.test(text);
  const hasFlightIntent = /(航班|飞机|机票|起飞|落地|值机|登机|飞往|飞抵|送机|离境|出境|乘机|T\d)/i.test(text);

  if (/(高铁|动车|火车|铁路|城际|地铁|公交|步行|徒步|骑行|轮渡|渡轮|自驾|包车|驾车)/.test(text)) return false;
  if (mentionsAirport && !hasFlightIntent && !/(抵达|到达|入境)/.test(text)) return false;
  if (hasFlightIntent) return true;
  if (mentionsAirport && /(抵达|到达|入境|送机|离境|出境)/.test(text)) return true;
  if (/(抵达|到达|入境)/.test(text) && isFirstCityArrivalActivity(day, index)) return true;

  return false;
}

function shouldShowHotelBooking(activity) {
  const text = getActivityContextText(activity);
  const title = String(activity?.title || "").trim();

  if (isHotelCheckoutContext(text, title)) return false;
  if (isMealAtHotelOnlyContext(text, title)) return false;

  return /(入住|住宿|预订.*酒店|订.*酒店|下榻|过夜|check[- ]?in)/i.test(text)
    || /^入住/.test(title)
    || /(办理入住|住宿落点|酒店办理)/.test(text);
}

function isHotelCheckoutContext(text, title) {
  return /(退房|离店|退宿|checkout|check[- ]?out|离开酒店|办理退房)/i.test(`${title} ${text}`);
}

function isMealAtHotelOnlyContext(text, title) {
  const combined = `${title} ${text}`;
  const isMeal = /(午餐|晚餐|早餐|用餐|餐厅|咖啡|茶|小吃|美食)/.test(combined);
  const mentionsHotel = /(酒店|民宿|客栈|Hotel)/i.test(combined);
  const hasStayIntent = /(入住|住宿|预订|订.*酒店|过夜|check[- ]?in)/i.test(combined);
  return isMeal && mentionsHotel && !hasStayIntent;
}

function shouldShowTrainBooking(activity) {
  const text = getActivityContextText(activity);
  if (/(火车站附近|高铁站附近|车站附近|站附近|站点附近)/.test(text)
    && !/(订票|购票|乘坐|搭乘|出发|前往|抵达|返回|返程|送站|进站|检票|候车)/.test(text)) {
    return false;
  }
  if (/(高铁|动车|火车|铁路|城际)/.test(text)) return true;
  return /(火车站|高铁站)/.test(text)
    && /(订票|购票|乘坐|搭乘|出发|前往|抵达|返回|返程|送站|进站|检票|候车)/.test(text);
}

function shouldShowTicketBooking(day, activity, index) {
  const text = getActivityContextText(activity);

  if (shouldShowFlightBooking(day, activity, index)) return false;
  if (shouldShowTrainBooking(activity)) return false;
  if (shouldShowHotelBooking(activity)) return false;
  if (/(早餐|午餐|晚餐|餐厅|餐|小吃|美食|咖啡|茶|休整|休息|自由活动|拍照|散步|逛街|购物|市场)/.test(text)) return false;
  if (/(市区|街区|商圈|广场|看日出|看日落|打卡)/.test(text) && !/(门票|景区|博物馆|展览|演出|导览|游船|出海)/.test(text)) return false;
  if (/(门票|通票|套票|景区|博物馆|美术馆|展览|乐园|游乐|索道|缆车|观光车|导览|演出|剧场|漂流|温泉|船票|游船|出海|预约|国家公园|文化中心|动物园|水族馆|歌剧院|大堡礁|菲利普岛|蓝山|三姐妹|Scenic World| reef)/i.test(text)) return true;

  return /(体验|项目|营地|课程|活动|浮潜|潜水|观鲸|滑雪)/.test(text);
}

function isFirstCityArrivalActivity(day, index) {
  if (index !== 0) return false;
  const cityDays = getPlanDays().filter((item) => item.cityId === day.cityId);
  return cityDays[0]?.id === day.id;
}

function getFlightBookingLabel(text) {
  if (/(送机|离境|出境|返程|离开.*机场|出发.*机场)/.test(text)) return "订返程机票";
  if (/(内陆|转机|中转)/.test(text)) return "订中转航班";
  return "订机票";
}

function getHotelBookingLabel() {
  return "订酒店";
}

function getTrainBookingLabel(text) {
  if (/高铁/.test(text)) return "订高铁票";
  if (/动车/.test(text)) return "订动车票";
  if (/城际/.test(text)) return "订城际票";
  return "订火车票";
}

function getTicketBookingLabel(text) {
  if (/(博物馆|美术馆|展览|NGV)/i.test(text)) return "订展览票";
  if (/(出海|游船|船票|大堡礁|浮潜)/.test(text)) return "订船票";
  if (/(演出|剧场|表演|音乐会)/.test(text)) return "订演出票";
  if (/(导览|观光|日落|观景|体验|项目|营地|课程)/.test(text)) return "订体验票";
  return "订门票";
}

function getActivityCategory(title, index) {
  if (/(早餐|午餐|晚餐|餐厅|餐|小吃|美食|市场|咖啡|茶)/.test(title)) return "美食";
  if (title.includes("酒店") || title.includes("抵达") || title.includes("返回") || title.includes("前往")) return "交通";
  if (title.includes("购物") || title.includes("市场")) return "购物";
  return index === 0 ? "景点" : "体验";
}

function getActivityCategoryEmoji(category) {
  const emojiByCategory = {
    美食: "🍽️",
    交通: "🚗",
    购物: "🛍️",
    景点: "📍",
    体验: "✨"
  };
  return emojiByCategory[category] || "✨";
}

function getActivityTimeRange(time, index) {
  const duration = index === 0 ? 90 : index === 1 ? 120 : 90;
  return `${time} - ${addMinutes(time, duration)}`;
}

function addMinutes(time, minutes) {
  const [hour, minute] = time.split(":").map(Number);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return time;
  const date = new Date(2026, 0, 1, hour, minute + minutes);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function getTransportConnector(day, index) {
  const next = day.schedule[index + 1];
  if (!next || shouldHideRoadbookTransferTarget(next)) return "";
  const isWalkable = day.transport.includes("步行") || index === 0;
  const mode = isWalkable ? "步行" : day.transport.includes("船") ? "船程" : "车程";
  const distance = isWalkable ? `${(1.2 + index * 0.7).toFixed(1)} 公里` : `${(6.5 + index * 3.8).toFixed(1)} 公里`;
  const minutes = isWalkable ? 18 + index * 9 : 16 + index * 8;
  return `
    <div class="roadbook-transfer">
      <span>${mode}</span>
      <strong>${distance} · ${minutes} 分钟</strong>
      <em>到 ${escapeHtml(next.title)}</em>
    </div>
  `;
}

function shouldHideRoadbookTransferTarget(activity) {
  const title = String(activity?.title || "").trim();
  const detail = String(activity?.detail || "").trim();
  const text = `${title} ${detail}`;
  if (/^(早餐|午餐|晚餐|用餐|餐厅|下午茶|咖啡|茶歇|夜宵)(及|与|和|、|$)/.test(title)) return true;
  if (/^(返程|返回|回程|离开|送机|送站|退房|打包|整理行李|返程准备)(及|与|和|、|$)/.test(title)) return true;
  if (/(午餐及返程|午餐与返程|晚餐及返程|早餐及返程|返程午餐)/.test(text)) return true;
  return false;
}

function getFreeTransportConnector(day, index) {
  const schedule = Array.isArray(day?.schedule) ? day.schedule : [];
  const current = schedule[index];
  const next = schedule[index + 1];
  if (!current || !next) return "";

  const matched = findRouteSegmentForActivities(day, current, next);
  const fallback = getFallbackTransferMeta(day, index);
  const mode = matched ? getRouteModeLabel(matched.tool || matched.mode || day.transport) : fallback.mode;
  const distance = matched?.distanceText || matched?.distance || fallback.distance;
  const duration = matched?.durationText || matched?.duration || fallback.duration;
  const icon = getFreeTransportIcon(mode);
  const description = [mode, distance, duration].filter(Boolean).join("，");

  return `
    <div class="free-transfer-line" aria-label="前往下一站：${escapeAttr(description)}" title="${escapeAttr(description)}">
      <span class="free-transfer-line__icon" aria-hidden="true">${icon}</span>
      <span class="free-transfer-line__content">
        <strong class="free-transfer-line__mode">${escapeHtml(mode || "交通")}</strong>
        <span class="free-transfer-line__metrics">
          <span>${escapeHtml(distance || "待确认")}</span>
          <span>${escapeHtml(duration || "待确认")}</span>
        </span>
      </span>
    </div>
  `;
}

function getFreeTransportIcon(mode) {
  const text = String(mode || "");
  if (/步行|徒步/.test(text)) return "🚶";
  if (/公交|公共交通|地铁/.test(text)) return "🚌";
  if (/高铁|火车|铁路/.test(text)) return "🚆";
  if (/船|轮渡/.test(text)) return "⛴";
  return "🚕";
}

function findRouteSegmentForActivities(day, current, next) {
  const from = cleanMapPointName(current?.title);
  const to = cleanMapPointName(next?.title);
  if (!from || !to) return null;
  const candidates = [
    ...(Array.isArray(state.mapRoutes.items) ? state.mapRoutes.items : []),
    ...(Array.isArray(state.mapRoutes.map?.segments) ? state.mapRoutes.map.segments : [])
  ];
  return candidates.find((segment) => {
    if (Number(segment.day) !== Number(day.day)) return false;
    const segmentFrom = cleanMapPointName(segment.from);
    const segmentTo = cleanMapPointName(segment.to);
    return areRouteNamesCompatible(segmentFrom, from) && areRouteNamesCompatible(segmentTo, to);
  }) || null;
}

function areRouteNamesCompatible(a, b) {
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}

function getFallbackTransferMeta(day, index) {
  const transport = String(day?.transport || "");
  const isWalkable = /步行|徒步|walk/i.test(transport) || index === 0;
  const isBoat = /船|游船|轮渡/.test(transport);
  const isTransit = /地铁|公交|公共交通|高铁|火车/.test(transport);
  const mode = isWalkable ? "步行" : isBoat ? "船程" : isTransit ? "公共交通" : "车程";
  const distance = isWalkable ? `${(0.9 + index * 0.6).toFixed(1)} 公里` : `${(3.5 + index * 2.4).toFixed(1)} 公里`;
  const duration = `${isWalkable ? 12 + index * 7 : 10 + index * 8} 分钟`;
  return { mode, distance, duration };
}

function getImageForStop(cityId, index) {
  const imageMap = {
    sydney: ["harbor", "coast", "mountain"],
    uluru: ["desert", "rock", "desert"],
    melbourne: ["laneway", "road", "penguin"],
    reef: ["reef", "rainforest", "coast"]
  };
  const images = imageMap[cityId] || imageMap.sydney;
  return images[index % images.length];
}

function isInternationalCity(city = "") {
  return /(日本|东京|大阪|京都|北海道|冲绳|韩国|济州|首尔|釜山|泰国|曼谷|清迈|普吉|新加坡|澳洲|澳大利亚|悉尼|墨尔本|乌鲁鲁|凯恩斯|欧洲|美国|英国|法国|意大利|新西兰|加拿大)/.test(city);
}

function getTravelFallbackImageUrl(theme = "coast") {
  return `/api/travel-image-fallback?theme=${encodeURIComponent(String(theme || "coast").trim().toLowerCase() || "coast")}`;
}

function getTravelImageProxyUrl(url = "") {
  return /^https:\/\//i.test(String(url || ""))
    ? `/api/travel-image-proxy?url=${encodeURIComponent(url)}`
    : "";
}

function buildTravelPhotoValue(primaryUrl = "", fallbackUrl = "") {
  const layers = [primaryUrl, fallbackUrl]
    .filter(Boolean)
    .filter((value, index, list) => list.indexOf(value) === index)
    .map((value) => `url("${String(value).replace(/"/g, '\\"')}")`);
  return layers.join(", ");
}

function renderTravelImageMarkup({ imageKey, query, city, fallback = "coast", label = "", extraClass = "", kind = "", preferredUrl = "" }) {
  const imageQuery = cleanTravelImageQuery(query || city || "");
  const cached = state.travelImages.cache[imageKey];
  const imageKind = kind || inferTravelImageKind(imageKey, imageQuery);
  const fallbackUrl = getTravelFallbackImageUrl(fallback);
  const directUrl = getTravelImageProxyUrl(preferredUrl);
  const primaryUrl = directUrl || (cached?.url && cached.query === imageQuery ? cached.url : "");
  const photoValue = buildTravelPhotoValue(primaryUrl, fallbackUrl);
  const resolvedUrl = primaryUrl || fallbackUrl;
  const hasPhoto = Boolean(resolvedUrl);
  const attrs = [
    `data-travel-image-key="${escapeAttr(imageKey)}"`,
    `data-travel-query="${escapeAttr(imageQuery || city || "")}"`,
    `data-travel-city="${escapeAttr(city || "")}"`,
    `data-travel-kind="${escapeAttr(imageKind)}"`,
    `data-travel-fallback="${escapeAttr(fallback)}"`,
    isInternationalCity(city) ? `data-travel-intl="1"` : "",
    directUrl ? `data-travel-image-direct="1"` : "",
    hasPhoto ? `style="--travel-photo:${escapeAttr(photoValue)}"` : ""
  ].filter(Boolean).join(" ");
  const labelHtml = label ? `<span>${escapeHtml(label)}</span>` : "";
  return `<div class="${extraClass} travel-image travel-image--${fallback}${hasPhoto ? " has-photo" : ""}" ${attrs} aria-hidden="true">${labelHtml}</div>`;
}

function inferTravelImageKind(imageKey, query) {
  if (/^(?:day-|doc-hero-|doc-day-)/.test(String(imageKey || ""))) return "cover";
  if (/酒店|宾馆|民宿|客栈|住宿|度假村/.test(query)) return "hotel";
  if (/早餐|午餐|晚餐|餐厅|饭店|酒楼|小吃|美食|鱼头|咖啡|茶馆/.test(query)) return "food";
  if (/高铁|火车|机场|车站|航班|交通|返程/.test(query)) return "transport";
  if (/体验|游船|骑行|徒步|演出|温泉/.test(query)) return "experience";
  return "poi";
}

function cleanTravelImageQuery(value) {
  return String(value || "")
    .replace(/^\d+[.、]\s*/, "")
    .replace(/^(抵达|前往|出发前往|返回|入住|游览|参观|打卡|安排|推荐|回到|去往|赶往|住在|下榻)/, "")
    .replace(/(上午|中午|下午|傍晚|晚上|早餐|午餐|晚餐|入住|返程|出发|抵达|建议|约\d+.*|从.*出发|返回.*)$/g, "")
    .replace(/(?:或|\/|、)?\s*(?:自由活动|休整|待定|可选.*)$/g, "")
    .replace(/[（(].*?[）)]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function applyTravelImageToNode(node, image) {
  if (!node || !image?.url) return;
  void preloadTravelImage(image.url)
    .then(() => {
      if (!node.isConnected) return;
      node.dataset.travelImageResolved = "1";
      node.classList.add("has-photo");
      node.classList.remove("is-photo-failed");
      node.style.setProperty(
        "--travel-photo",
        buildTravelPhotoValue(image.url, getTravelFallbackImageUrl(node.dataset.travelFallback || "coast"))
      );
    })
    .catch(() => {
      if (!node.isConnected) return;
      delete node.dataset.travelImageResolved;
      applyTravelImageFallback(node);
    });
}

function applyTravelImageFallback(node) {
  if (!node) return;
  node.classList.add("has-photo");
  node.classList.remove("is-photo-failed");
  node.style.setProperty("--travel-photo", buildTravelPhotoValue("", getTravelFallbackImageUrl(node.dataset.travelFallback || "coast")));
}

function preloadTravelImage(url) {
  if (!url) return Promise.reject(new Error("empty image url"));
  if (travelImageLoadCache.has(url)) return travelImageLoadCache.get(url);
  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(url);
    image.onerror = () => reject(new Error("image load failed"));
    image.decoding = "async";
    image.loading = "eager";
    image.src = url;
  }).catch((error) => {
    travelImageLoadCache.delete(url);
    throw error;
  });
  travelImageLoadCache.set(url, promise);
  return promise;
}

function hydrateTravelImages(root) {
  const nodes = [...root.querySelectorAll("[data-travel-image-key]")];
  const pending = [];

  nodes.forEach((node) => {
    if (node.dataset.travelImageDirect === "1") return;
    const key = node.dataset.travelImageKey;
    const query = node.dataset.travelQuery || "";
    const cached = state.travelImages.cache[key];
    if (cached?.url && cached.query === query) {
      applyTravelImageToNode(node, cached);
      return;
    }
    if (node.dataset.travelImageResolved === "1") return;
    pending.push({
      key,
      query,
      city: node.dataset.travelCity || "",
      kind: node.dataset.travelKind || "poi",
      international: node.dataset.travelIntl === "1"
    });
  });

  const seen = new Set();
  const uniquePending = pending.filter((item) => {
    if (!item.key || seen.has(item.key)) return false;
    seen.add(item.key);
    return true;
  });
  if (!uniquePending.length) return;
  void fetchTravelImages(uniquePending, root);
}

async function fetchTravelImages(items, root) {
  const unresolved = items.filter((item) => {
    const cached = state.travelImages.cache[item.key];
    return item.key
      && item.query
      && !travelImagePendingKeys.has(item.key)
      && (!cached?.url || cached.query !== item.query);
  });
  if (!unresolved.length) return;
  unresolved.forEach((item) => travelImagePendingKeys.add(item.key));

  const loadBatch = async (batch) => {
    try {
      const response = await fetch("/api/travel-images/resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: batch })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) return;
      Object.entries(data.images || {}).forEach(([key, image]) => {
        const query = batch.find((item) => item.key === key)?.query || "";
        if (image?.url) state.travelImages.cache[key] = { ...image, query };
      });
      Object.entries(data.images || {}).forEach(([key, image]) => {
        const cached = state.travelImages.cache[key] || image;
        document.querySelectorAll(`[data-travel-image-key="${key}"]`).forEach((node) => {
          const query = batch.find((item) => item.key === key)?.query || "";
          if (!query || node.dataset.travelQuery === query) applyTravelImageToNode(node, cached);
        });
      });
    } finally {
      batch.forEach((item) => travelImagePendingKeys.delete(item.key));
    }
  };

  await Promise.all(chunkArray(unresolved, 8).map(loadBatch));
}

function chunkArray(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function getTravelStyle(days = getPlanDays()) {
  if (!days.length) {
    return { label: "待定义", hint: "生成行程后自动识别风格" };
  }

  const densityScore = state.density / 8;
  const paceScore =
    days.reduce((sum, day) => sum + getPaceWeight(day.pace), 0) / days.length / 3;
  const intensity = densityScore * 0.62 + paceScore * 0.38;

  if (intensity <= 0.42) {
    return { label: "度假游", hint: "慢节奏留白，适合休息与即兴探索" };
  }
  if (intensity <= 0.58) {
    return { label: "平衡游", hint: "热门景点 + 适度自由时间" };
  }
  if (intensity <= 0.72) {
    return { label: "深度游", hint: "主题明确，安排紧凑但不硬赶" };
  }
  return { label: "特种兵", hint: "高密度打卡，早出晚归" };
}

function getPaceWeight(pace) {
  if (pace === "舒缓" || pace === "轻松") return 1;
  if (pace === "偏满") return 3;
  return 2;
}

function getTripTitle() {
  if (!state.route.length) return "从一个想法，到一段旅途";
  const totalDays = getTotalDays();
  const cities = resolveTripDestinationNames().join("、");
  if (cities) return `${cities}${totalDays ? ` ${totalDays} 天` : ""}行程`;
  const fallback = state.route.map((city) => city.city).filter((city) => !isPlaceholderDestination(city)).join("、");
  return `${fallback || "行程规划"}${totalDays ? ` ${totalDays} 天` : ""}`;
}

function getTripBadge() {
  if (!state.route.length) return "Trip";
  return state.route.length === 1 ? state.route[0].city.slice(0, 1) : `${state.route.length}城`;
}

function getBudgetTotal() {
  const total = budgetSeed.reduce((sum, item) => {
    return sum + Number(item.amount.replace(/[^\d]/g, ""));
  }, 0);
  if (!total) return "待估算";
  return `AUD ${total.toLocaleString("en-AU")}`;
}

function splitGuideListText(value) {
  return String(value || "")
    .split(/[·,、|/]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinGuideListText(items) {
  return (items || []).filter(Boolean).join(" · ");
}

function updateGuideFromInput(target) {
  getTripGuide(getPlanDays());
  const guide = state.tripGuide;
  if (!guide) return;

  const section = target.dataset.guideSection;
  const field = target.dataset.guideField;
  const index = target.dataset.guideIndex != null && target.dataset.guideIndex !== "" ? Number(target.dataset.guideIndex) : null;
  const value = target.value;
  if (!section || !field) return;

  if (section === "essentials") {
    if (field === "visa" || field === "timezone" || field === "voltage" || field === "embassy") {
      guide.essentials[field] = value;
      return;
    }
    if (field === "title" || field === "detail") {
      guide.essentials.items = guide.essentials.items || [];
      if (!guide.essentials.items[index]) guide.essentials.items[index] = { title: "", detail: "" };
      guide.essentials.items[index][field] = value;
    }
    return;
  }

  if (section === "inspiration") {
    if (field === "activities" || field === "foods" || field === "places") {
      guide.inspiration[field] = splitGuideListText(value);
      return;
    }
    guide.inspiration[field] = value;
    return;
  }

  if (section === "transport") {
    if (field === "localSummary") {
      guide.transport.localSummary = value;
      return;
    }
    if (field === "title" || field === "detail" || field === "type") {
      guide.transport.intercity = guide.transport.intercity || [];
      if (!guide.transport.intercity[index]) guide.transport.intercity[index] = { type: "交通", title: "", detail: "" };
      if (field === "type") {
        guide.transport.intercity[index].type = value;
      } else {
        guide.transport.intercity[index][field] = value;
      }
      return;
    }
    if (field === "tipTitle" || field === "tipDetail") {
      guide.transport.localTips = guide.transport.localTips || [];
      if (!guide.transport.localTips[index]) guide.transport.localTips[index] = { title: "", detail: "" };
      guide.transport.localTips[index][field === "tipTitle" ? "title" : "detail"] = value;
    }
    return;
  }

  if (section === "accommodation") {
    if (field === "tips") {
      guide.accommodation.tips = value ? [value] : [];
      return;
    }
    if (field === "name" || field === "note") {
      guide.accommodation.nights = guide.accommodation.nights || [];
      if (!guide.accommodation.nights[index]) guide.accommodation.nights[index] = { day: index + 1, city: "", name: "", note: "" };
      guide.accommodation.nights[index][field] = value;
    }
    return;
  }

  if (section === "dining") {
    if (field === "markets") {
      guide.dining.markets = splitGuideListText(value);
      return;
    }
    if (field === "dietaryNotes") {
      guide.dining.dietaryNotes = value;
      return;
    }
    if (field === "name" || field === "note") {
      guide.dining.mustTry = guide.dining.mustTry || [];
      if (!guide.dining.mustTry[index]) guide.dining.mustTry[index] = { name: "", note: "" };
      guide.dining.mustTry[index][field] = value;
    }
    return;
  }

  if (section === "activities") {
    const arrayName = target.dataset.guideArray || "highlights";
    guide.activities[arrayName] = guide.activities[arrayName] || [];
    if (field === "name" || field === "note") {
      if (!guide.activities[arrayName][index]) guide.activities[arrayName][index] = { name: "", note: "" };
      guide.activities[arrayName][index][field] = value;
      return;
    }
    if (field === "title" || field === "detail") {
      if (!guide.activities[arrayName][index]) guide.activities[arrayName][index] = { title: "", detail: "" };
      guide.activities[arrayName][index][field] = value;
    }
    return;
  }

  if (section === "budget") {
    if (field === "paymentTips") {
      guide.budget.paymentTips = value;
      return;
    }
    if (field === "prepaid") {
      guide.budget.prepaid = splitGuideListText(value);
      return;
    }
    if (field === "label" || field === "detail" || field === "estimate") {
      guide.budget.categories = guide.budget.categories || [];
      if (!guide.budget.categories[index]) guide.budget.categories[index] = { label: "", detail: "", estimate: "" };
      guide.budget.categories[index][field] = value;
    }
    return;
  }

  if (section === "preparation") {
    if (field === "devices") {
      guide.preparation.devices = splitGuideListText(value);
      return;
    }
    if (field === "packItems") {
      guide.preparation.packing = guide.preparation.packing || [];
      if (!guide.preparation.packing[index]) guide.preparation.packing[index] = { category: "清单", items: [] };
      guide.preparation.packing[index].items = splitGuideListText(value);
      return;
    }
    if (field === "task" || field === "detail") {
      guide.preparation.todos = guide.preparation.todos || [];
      if (!guide.preparation.todos[index]) guide.preparation.todos[index] = { task: "", detail: "" };
      guide.preparation.todos[index][field] = value;
    }
    return;
  }

  if (section === "communication") {
    if (field === "emergency") {
      guide.communication.emergency = splitGuideListText(value);
      return;
    }
    if (field === "name" || field === "use") {
      guide.communication.apps = guide.communication.apps || [];
      if (!guide.communication.apps[index]) guide.communication.apps[index] = { name: "", use: "" };
      guide.communication.apps[index][field] = value;
    }
    return;
  }

  if (section === "lists") {
    ensureGuideSpotsList(guide, getPlanDays());
    if (field === "name" || field === "note" || field === "city") {
      if (!guide.lists.spots[index]) guide.lists.spots[index] = { name: "", city: "", note: "" };
      guide.lists.spots[index][field] = value;
    }
    return;
  }

  if (section === "checklist" && field === "items") {
    guide.checklist.items = guide.checklist.items || [];
    guide.checklist.items[index] = value;
  }
}

function addGuideRow(section) {
  getTripGuide(getPlanDays());
  const guide = state.tripGuide;
  if (!guide) return;

  switch (section) {
    case "essentials":
      guide.essentials.items = [...(guide.essentials.items || []), { title: "新条目", detail: "" }];
      break;
    case "transport":
      guide.transport.intercity = [...(guide.transport.intercity || []), { type: "交通", title: "", detail: "" }];
      break;
    case "accommodation":
      guide.accommodation.nights = [...(guide.accommodation.nights || []), { day: (guide.accommodation.nights?.length || 0) + 1, city: "", name: "", note: "" }];
      break;
    case "dining":
      guide.dining.mustTry = [...(guide.dining.mustTry || []), { name: "", note: "" }];
      break;
    case "spots":
      ensureGuideSpotsList(guide, getPlanDays());
      guide.lists.spots.push({ name: "", city: "", note: "" });
      break;
    case "budget":
      guide.budget.categories = [...(guide.budget.categories || []), { label: "新项", estimate: "", detail: "" }];
      break;
    case "preparation":
      guide.preparation.todos = [...(guide.preparation.todos || []), { task: "待办", detail: "" }];
      break;
    case "checklist":
      guide.checklist.items = [...(guide.checklist.items || getDocumentChecklist(getPlanDays())), "新的提醒"];
      break;
    default:
      break;
  }
}

function removeGuideRow(section, index) {
  getTripGuide(getPlanDays());
  const guide = state.tripGuide;
  if (!guide || Number.isNaN(index)) return;

  const removeAt = (list) => {
    if (!Array.isArray(list) || list.length <= 1) return list;
    return list.filter((_, itemIndex) => itemIndex !== index);
  };

  switch (section) {
    case "essentials":
      guide.essentials.items = removeAt(guide.essentials.items);
      break;
    case "transport":
      guide.transport.intercity = removeAt(guide.transport.intercity);
      break;
    case "accommodation":
      guide.accommodation.nights = removeAt(guide.accommodation.nights);
      break;
    case "dining":
      guide.dining.mustTry = removeAt(guide.dining.mustTry);
      break;
    case "spots":
      guide.lists = guide.lists || { spots: [] };
      guide.lists.spots = removeAt(guide.lists.spots);
      break;
    case "budget":
      guide.budget.categories = removeAt(guide.budget.categories);
      break;
    case "preparation":
      guide.preparation.todos = removeAt(guide.preparation.todos);
      break;
    case "checklist":
      guide.checklist.items = removeAt(guide.checklist.items || []);
      break;
    default:
      break;
  }
}

function renderNotionLine(section, field, label, emoji, value, placeholder = "", options = {}) {
  const indexAttr = options.guideIndex != null ? ` data-guide-index="${options.guideIndex}"` : "";
  return `
    <label class="notion-line">
      <span class="notion-line__label">${emoji} ${escapeHtml(label)}</span>
      <textarea class="notion-line__value" rows="1" placeholder="${escapeAttr(placeholder)}"
        data-guide-section="${section}" data-guide-field="${field}"${indexAttr}>${escapeHtml(value)}</textarea>
    </label>
  `;
}

function renderNotionRow(section, index, label, value, labelField, valueField, arrayName = "") {
  const arrayAttr = arrayName ? ` data-guide-array="${arrayName}"` : "";
  return `
    <div class="notion-row">
      <span class="notion-row__handle" aria-hidden="true">⋮⋮</span>
      <input
        type="text"
        class="notion-row__label"
        value="${escapeAttr(label)}"
        placeholder="标签"
        data-guide-section="${section}"
        data-guide-index="${index}"
        data-guide-field="${labelField}"${arrayAttr}
      />
      <textarea
        class="notion-row__value"
        rows="1"
        placeholder="点击编辑…"
        data-guide-section="${section}"
        data-guide-index="${index}"
        data-guide-field="${valueField}"${arrayAttr}
      >${escapeHtml(value)}</textarea>
      <button type="button" class="notion-row__remove" data-action="remove-guide-row" data-section="${section}" data-index="${index}" aria-label="删除">×</button>
    </div>
  `;
}

function renderNotionBulletRow(section, index, value) {
  return `
    <div class="notion-row notion-row--bullet">
      <span class="notion-row__bullet" aria-hidden="true">•</span>
      <textarea
        class="notion-row__value"
        rows="1"
        placeholder="写一条提醒…"
        data-guide-section="${section}"
        data-guide-index="${index}"
        data-guide-field="items"
      >${escapeHtml(value)}</textarea>
      <button type="button" class="notion-row__remove" data-action="remove-guide-row" data-section="${section}" data-index="${index}" aria-label="删除">×</button>
    </div>
  `;
}

function renderNotionAddRow(section, label = "添加条目") {
  return `
    <button type="button" class="notion-add-row" data-action="add-guide-row" data-section="${section}">
      <span>+</span> ${escapeHtml(label)}
    </button>
  `;
}

function renderGuideListItem({ section, index, emoji, badge, title, meta, titleField, metaField, titlePlaceholder, metaPlaceholder }) {
  return `
    <li class="guide-list-item">
      <span class="guide-list-item__icon" aria-hidden="true">${emoji}</span>
      <div class="guide-list-item__copy">
        ${badge ? `<span class="guide-list-item__badge">${escapeHtml(badge)}</span>` : ""}
        <input
          type="text"
          class="guide-list-item__title"
          value="${escapeAttr(title)}"
          placeholder="${escapeAttr(titlePlaceholder || "名称")}"
          data-guide-section="${section}"
          data-guide-index="${index}"
          data-guide-field="${titleField}"
        />
        <input
          type="text"
          class="guide-list-item__meta"
          value="${escapeAttr(meta)}"
          placeholder="${escapeAttr(metaPlaceholder || "备注")}"
          data-guide-section="${section}"
          data-guide-index="${index}"
          data-guide-field="${metaField}"
        />
      </div>
      <button type="button" class="guide-list-item__remove" data-action="remove-guide-row" data-section="${section === "lists" ? "spots" : section}" data-index="${index}" aria-label="删除">×</button>
    </li>
  `;
}

function renderGuideListOnlyItem({ section, index, emoji, value, field, placeholder }) {
  return `
    <li class="guide-list-item guide-list-item--solo">
      <span class="guide-list-item__icon" aria-hidden="true">${emoji}</span>
      <input
        type="text"
        class="guide-list-item__title"
        value="${escapeAttr(value)}"
        placeholder="${escapeAttr(placeholder || "内容")}"
        data-guide-section="${section}"
        data-guide-index="${index}"
        data-guide-field="${field}"
      />
      <button type="button" class="guide-list-item__remove" data-action="remove-guide-row" data-section="${section}" data-index="${index}" aria-label="删除">×</button>
    </li>
  `;
}

function renderCanvasListBody(key, guide, days) {
  switch (key) {
    case "hotels":
      return `
        <ul class="guide-list">
          ${(guide.accommodation?.nights || [])
            .map((night, index) =>
              renderGuideListItem({
                section: "accommodation",
                index,
                emoji: "🏨",
                badge: `D${night.day}${night.city ? ` · ${night.city}` : ""}`,
                title: night.name || "",
                meta: night.note || "",
                titleField: "name",
                metaField: "note",
                titlePlaceholder: "酒店名称",
                metaPlaceholder: "区域 / 备注"
              })
            )
            .join("")}
        </ul>
        ${renderNotionAddRow("accommodation", "添加酒店")}
      `;
    case "spots":
      return `
        <ul class="guide-list">
          ${getGuideSpotsList(guide, days)
            .map((spot, index) =>
              renderGuideListItem({
                section: "lists",
                index,
                emoji: "🎯",
                badge: spot.city || "待排期",
                title: spot.name || "",
                meta: spot.note || "",
                titleField: "name",
                metaField: "note",
                titlePlaceholder: "景点名称",
                metaPlaceholder: "备注 / 预约提示"
              })
            )
            .join("")}
        </ul>
        ${renderNotionAddRow("spots", "添加景点")}
      `;
    case "restaurants":
      return `
        <ul class="guide-list">
          ${(guide.dining?.mustTry || [])
            .map((item, index) =>
              renderGuideListItem({
                section: "dining",
                index,
                emoji: "🍜",
                badge: "餐厅",
                title: item.name || "",
                meta: item.note || "",
                titleField: "name",
                metaField: "note",
                titlePlaceholder: "餐厅名称",
                metaPlaceholder: "招牌 / 备注"
              })
            )
            .join("")}
        </ul>
        ${renderNotionAddRow("dining", "添加餐厅")}
      `;
    case "transport":
      return `
        <ul class="guide-list">
          ${(guide.transport?.intercity || [])
            .map((item, index) =>
              renderGuideListItem({
                section: "transport",
                index,
                emoji: "🚆",
                badge: item.type || "交通",
                title: item.title || "",
                meta: item.detail || "",
                titleField: "title",
                metaField: "detail",
                titlePlaceholder: "路段 / 班次",
                metaPlaceholder: "耗时 / 价格 / 备注"
              })
            )
            .join("")}
        </ul>
        ${guide.transport?.localSummary ? `<p class="guide-list-footnote">🚌 ${escapeHtml(guide.transport.localSummary)}</p>` : ""}
        ${renderNotionAddRow("transport", "添加路段")}
      `;
    case "checklist":
      return `
        <ul class="guide-list">
          ${(guide.checklist?.items || getDocumentChecklist(days))
            .map((item, index) =>
              renderGuideListOnlyItem({
                section: "checklist",
                index,
                emoji: "⚠️",
                value: item,
                field: "items",
                placeholder: "写一条避坑提醒"
              })
            )
            .join("")}
        </ul>
        ${renderNotionAddRow("checklist", "添加提醒")}
      `;
    default:
      return "";
  }
}

function getCanvasListCount(key, guide, days) {
  switch (key) {
    case "hotels":
      return guide.accommodation?.nights?.length || 0;
    case "spots":
      return getGuideSpotsList(guide, days).length;
    case "restaurants":
      return guide.dining?.mustTry?.length || 0;
    case "transport":
      return guide.transport?.intercity?.length || 0;
    case "checklist":
      return (guide.checklist?.items || getDocumentChecklist(days)).length;
    default:
      return 0;
  }
}

function collectBudgetStrings(value) {
  if (value == null) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectBudgetStrings);
  if (typeof value === "object") return Object.values(value).flatMap(collectBudgetStrings);
  return [];
}

function parseBudgetRange(value) {
  const text = String(value || "").replace(/,/g, "");
  const range = "(?:\\s*(?:-|~|\\u2013|\\u2014|\\u81f3|\\uff5e)\\s*([0-9]+(?:\\.[0-9]+)?))?";
  const prefix = text.match(new RegExp("(AUD|USD|CNY|人民币|[¥￥])\\s*([0-9]+(?:\\.[0-9]+)?)" + range, "i"));
  const suffix = text.match(new RegExp("([0-9]+(?:\\.[0-9]+)?)" + range + "\\s*(人民币|澳元|美元|元|AUD|USD|CNY)", "i"));
  const match = prefix || suffix;
  if (!match) return null;

  const isPrefix = match === prefix;
  const rawCurrency = isPrefix ? match[1] : match[3];
  const minimum = Number(isPrefix ? match[2] : match[1]);
  const maximum = Number(isPrefix ? match[3] || match[2] : match[2] || match[1]);
  if (!Number.isFinite(minimum) || !Number.isFinite(maximum)) return null;

  const currency = /AUD|澳元/i.test(rawCurrency)
    ? "AUD"
    : /USD|美元/i.test(rawCurrency)
      ? "USD"
      : /CNY/i.test(rawCurrency)
        ? "CNY"
        : "CNY_SYMBOL";
  return {
    currency,
    minimum,
    maximum,
    perPerson: /人均|\/人/.test(text)
  };
}

function getCanvasBudgetTexts(key, guide, days) {
  const categoryMatchers = {
    hotels: /住宿|酒店/,
    spots: /门票|体验|景点/,
    restaurants: /餐饮|吃喝|美食/,
    transport: /交通|机票|车费/
  };
  const source = key === "hotels"
    ? guide.accommodation?.nights || []
    : key === "spots"
      ? getGuideSpotsList(guide, days)
      : key === "restaurants"
        ? guide.dining?.mustTry || []
        : key === "transport"
          ? guide.transport?.intercity || []
          : [];
  const matchingBudgetCategories = (guide.budget?.categories || []).filter((item) =>
    categoryMatchers[key]?.test(String(item?.label || item?.title || ""))
  );
  return [...collectBudgetStrings(source), ...collectBudgetStrings(matchingBudgetCategories)];
}

function formatCanvasBudgetAmount(value) {
  return Math.round(value).toLocaleString("zh-CN");
}

function getCanvasBudgetSummary(key, guide, days) {
  if (key === "checklist") return "无直接费用";
  const parsed = getCanvasBudgetTexts(key, guide, days).map(parseBudgetRange).filter(Boolean);
  if (!parsed.length) return "预算待补充";

  const currency = parsed[0].currency;
  const matching = parsed.filter((item) => item.currency === currency);
  const minimum = matching.reduce((sum, item) => sum + item.minimum, 0);
  const maximum = matching.reduce((sum, item) => sum + item.maximum, 0);
  const prefix = currency === "AUD" ? "AUD " : currency === "USD" ? "USD " : currency === "CNY" ? "CNY " : "¥";
  const amount = minimum === maximum
    ? `${prefix}${formatCanvasBudgetAmount(minimum)}`
    : `${prefix}${formatCanvasBudgetAmount(minimum)}–${formatCanvasBudgetAmount(maximum)}`;
  const perPerson = matching.length > 0 && matching.every((item) => item.perPerson) ? "/人" : "";
  return `预算合计 ${amount}${perPerson}`;
}

const CANVAS_LIST_BLOCKS = [
  { key: "hotels", emoji: "🏨", title: "酒店清单", accent: "teal", visible: (guide) => (guide.accommodation?.nights || []).length > 0 },
  { key: "spots", emoji: "🎯", title: "景点清单", accent: "green", visible: (guide, days) => getGuideSpotsList(guide, days).length > 0 },
  { key: "restaurants", emoji: "🍜", title: "餐厅清单", accent: "orange", visible: (guide) => (guide.dining?.mustTry || []).length > 0 },
  { key: "transport", emoji: "🚆", title: "交通清单", accent: "blue", visible: (guide) => (guide.transport?.intercity || []).length > 0 || !!guide.transport?.localSummary },
  { key: "checklist", emoji: "⚠️", title: "避坑提醒", accent: "rose", visible: (guide, days) => (guide.checklist?.items || getDocumentChecklist(days)).length > 0 }
];

function renderNotionGuideBlock(config, guide, days) {
  const collapsed = state.canvasGuide.collapsed.has(config.key);
  const count = getCanvasListCount(config.key, guide, days);
  const budgetSummary = getCanvasBudgetSummary(config.key, guide, days);
  return `
    <article class="notion-block canvas-guide-card notion-block--${config.accent} ${collapsed ? "is-collapsed" : ""}" data-guide-block="${config.key}">
      <button type="button" class="notion-block__toggle" data-action="toggle-guide-block" data-block="${config.key}" aria-expanded="${!collapsed}">
        <span class="notion-block__emoji" aria-hidden="true">${config.emoji}</span>
        <div class="notion-block__title-copy">
          <strong>${escapeHtml(config.title)}</strong>
          <div class="canvas-guide-card__meta">
            <span class="canvas-guide-card__count"><b>${count}</b> 项</span>
            <span class="canvas-guide-card__budget">${escapeHtml(budgetSummary)}</span>
          </div>
        </div>
        <em>${collapsed ? "+" : "−"}</em>
      </button>
      ${collapsed ? "" : `<div class="notion-block__body">${renderCanvasListBody(config.key, guide, days)}</div>`}
    </article>
  `;
}

function renderCanvasGuideCards(days) {
  const guide = getTripGuide(days);
  if (!guide) return "";

  const cards = CANVAS_LIST_BLOCKS.filter((config) => config.visible(guide, days))
    .map((config) => renderNotionGuideBlock(config, guide, days))
    .join("");

  if (!cards) return "";

  return `
    <section class="canvas-block-section canvas-block-section--resources" aria-label="路书清单">
      <div class="canvas-block-section__head">
        <div>
          <p class="eyebrow">Resource Lists</p>
          <h3>资源清单</h3>
        </div>
        <span class="canvas-block-section__hint">按类目查看数量与预算，展开后可编辑具体资源</span>
      </div>
      <div class="canvas-guide-grid">${cards}</div>
    </section>
  `;
}

function startOfDay(date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function formatISODateLocal(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseISODateLocal(value) {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const parsed = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(parsed.getTime()) ? null : startOfDay(parsed);
}

function parseTripStartFromText(text) {
  const source = String(text || "");
  const rangeMatch = source.match(/(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (!rangeMatch) return null;
  const year = new Date().getFullYear();
  const parsed = new Date(year, Number(rangeMatch[1]) - 1, Number(rangeMatch[2]));
  return Number.isNaN(parsed.getTime()) ? null : startOfDay(parsed);
}

function ensureTripCalendarStartDate() {
  if (state.calendar.tripStartDate) {
    return parseISODateLocal(state.calendar.tripStartDate) || startOfDay(new Date());
  }

  const guideRange = getTripGuide()?.overview?.dateRange || "";
  const fromGuide = parseTripStartFromText(guideRange);
  if (fromGuide) {
    state.calendar.tripStartDate = formatISODateLocal(fromGuide);
    return fromGuide;
  }

  for (const message of state.chat) {
    if (message.role !== "user") continue;
    const fromChat = parseTripStartFromText(message.text);
    if (fromChat) {
      state.calendar.tripStartDate = formatISODateLocal(fromChat);
      return fromChat;
    }
  }

  const start = startOfDay(new Date());
  state.calendar.tripStartDate = formatISODateLocal(start);
  return start;
}

function getTripStartDate() {
  return ensureTripCalendarStartDate();
}

function getDateForPlanDay(dayNumber) {
  const start = getTripStartDate();
  const date = new Date(start);
  date.setDate(start.getDate() + Number(dayNumber) - 1);
  return startOfDay(date);
}

function getPlanDayForCalendarDate(isoDate) {
  const target = parseISODateLocal(isoDate);
  if (!target) return null;
  const start = getTripStartDate();
  const diff = Math.round((target.getTime() - start.getTime()) / 86400000);
  if (diff < 0) return null;
  return getPlanDays().find((day) => day.day === diff + 1) || null;
}

function buildCalendarTripIndex(days = getPlanDays()) {
  const index = new Map();
  days.forEach((planDay) => {
    index.set(formatISODateLocal(getDateForPlanDay(planDay.day)), planDay);
  });
  return index;
}

function formatCalendarMonthTitle(year, monthIndex) {
  return `${year}年${monthIndex + 1}月`;
}

function formatCalendarDayLabel(date) {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function getCalendarDisplayWeek() {
  const anchor = startOfDay(getTripStartDate());
  anchor.setDate(anchor.getDate() + state.calendar.monthOffset * 7);
  return anchor;
}

function buildCalendarWeekCells(weekStart) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return startOfDay(date);
  });
}

function formatCalendarWeekTitle(weekStart) {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  if (weekStart.getFullYear() === weekEnd.getFullYear()) {
    return `${weekStart.getFullYear()}年 ${formatCalendarDayLabel(weekStart)} – ${formatCalendarDayLabel(weekEnd)}`;
  }
  return `${weekStart.getFullYear()}年${formatCalendarDayLabel(weekStart)} – ${weekEnd.getFullYear()}年${formatCalendarDayLabel(weekEnd)}`;
}

function getCalendarWeekdayLabel(date) {
  return ["日", "一", "二", "三", "四", "五", "六"][date.getDay()];
}

function renderCalendarActivityChip(activity, planDay) {
  const iso = formatISODateLocal(getDateForPlanDay(planDay.day));
  return `
    <button
      type="button"
      class="calendar-activity"
      style="--city-color: ${planDay.color}"
      data-action="calendar-select-day"
      data-date="${escapeAttr(iso)}"
      title="${escapeAttr(`${activity.time} ${activity.title}`)}"
    >
      <span>${escapeHtml(activity.time || "待定")}</span>
      <strong>${escapeHtml(activity.title)}</strong>
    </button>
  `;
}

function getCalendarWeekGridTemplate(cells, tripIndex) {
  return cells
    .map((date) => {
      if (!date) return "minmax(52px, 0.42fr)";
      const planDay = tripIndex.get(formatISODateLocal(date));
      return planDay ? "minmax(170px, 1.35fr)" : "minmax(72px, 0.58fr)";
    })
    .join(" ");
}

function ensureCalendarSelection() {
  ensureTripCalendarStartDate();
}

function renderCalendarDayCell(date, tripIndex) {
  if (!date) {
    return `<div class="calendar-cell calendar-cell--empty" aria-hidden="true"></div>`;
  }

  const iso = formatISODateLocal(date);
  const planDay = tripIndex.get(iso) || null;
  const isSelected = state.calendar.selectedDate === iso;
  const isToday = iso === formatISODateLocal(startOfDay(new Date()));
  const activities = planDay?.schedule || [];
  const hiddenActivityCount = Math.max(0, activities.length - 5);

  return `
    <div
      class="calendar-cell ${planDay ? "is-trip-day" : ""} ${isSelected ? "is-selected" : ""} ${isToday ? "is-today" : ""}"
      role="gridcell"
      style="${planDay ? `--city-color: ${planDay.color}` : ""}"
    >
      <button
        type="button"
        class="calendar-cell__select"
        data-action="calendar-select-day"
        data-date="${escapeAttr(iso)}"
        aria-label="${escapeAttr(`${date.getDate()}日${planDay ? `，${planDay.city}行程` : ""}`)}"
      >
        <span class="calendar-cell__date">${date.getDate()}</span>
        ${planDay ? `<span class="calendar-cell__city">${escapeHtml(planDay.city)}</span>` : ""}
      </button>
      ${
        planDay
          ? `<div
              class="calendar-cell__activities ${hiddenActivityCount ? "is-scrollable" : ""}"
              ${hiddenActivityCount ? `tabindex="0" aria-label="${escapeAttr(`${planDay.city}共有 ${activities.length} 项日程，可上下滑动查看`)}"` : ""}
            >
              ${activities.map((activity) => renderCalendarActivityChip(activity, planDay)).join("")}
            </div>`
          : ""
      }
      ${hiddenActivityCount ? `<span class="calendar-cell__more" aria-hidden="true">向下滑动查看 · +${hiddenActivityCount} 项</span>` : ""}
    </div>
  `;
}

function renderCalendarDayDetail(selectedDate, tripIndex) {
  const planDay = tripIndex.get(selectedDate) || getPlanDayForCalendarDate(selectedDate);
  const parsed = parseISODateLocal(selectedDate);

  if (!planDay) {
    return `
      <aside class="calendar-detail calendar-detail--empty" aria-label="日期详情">
        <p class="eyebrow">Day Detail</p>
        <h3>${parsed ? formatCalendarDayLabel(parsed) : "选择日期"}</h3>
        <p>这一天暂无行程安排。点击有颜色的日期查看旅行活动。</p>
      </aside>
    `;
  }

  return `
    <aside class="calendar-detail" aria-label="日期详情" style="--city-color: ${planDay.color}">
      <p class="eyebrow">D${planDay.day} · ${escapeHtml(planDay.city)}</p>
      <h3>${parsed ? formatCalendarDayLabel(parsed) : planDay.title}</h3>
      <p class="calendar-detail__summary">${escapeHtml(planDay.summary || planDay.title)}</p>
      <div class="calendar-detail__meta">
        <span>${escapeHtml(planDay.pace || "平衡游")}</span>
        <span>${escapeHtml(planDay.transport || "当地交通")}</span>
        <span>${escapeHtml(planDay.stay || "住宿待定")}</span>
      </div>
      <ol class="calendar-detail__timeline">
        ${(planDay.schedule || []).map((activity) => `
          <li>
            <time>${escapeHtml(activity.time || "待定")}</time>
            <div>
              <strong>${escapeHtml(activity.title)}</strong>
              <p>${escapeHtml(activity.detail || "")}</p>
            </div>
          </li>
        `).join("")}
      </ol>
      <button type="button" class="button button--primary calendar-detail__open" data-action="calendar-open-day" data-day="${escapeAttr(planDay.id)}">
        在画布中编辑这一天
      </button>
    </aside>
  `;
}

function renderCalendarDetailDrawer(selectedDate, tripIndex) {
  if (!selectedDate) return "";
  return `
    <div class="calendar-detail-drawer" role="dialog" aria-label="日期详情">
      <button type="button" class="calendar-detail-drawer__close" data-action="calendar-close-detail" aria-label="关闭日期详情">×</button>
      ${renderCalendarDayDetail(selectedDate, tripIndex)}
    </div>
  `;
}

function getCalendarVisibleDays(days) {
  const pageSize = 5;
  const maxStart = Math.max(0, days.length - pageSize);
  const start = Math.min(maxStart, Math.max(0, state.calendar.monthOffset * pageSize));
  return days.slice(start, start + pageSize);
}

function getCalendarVisibleDayStart(days) {
  const pageSize = 5;
  const maxStart = Math.max(0, days.length - pageSize);
  return Math.min(maxStart, Math.max(0, state.calendar.monthOffset * pageSize));
}

function getCalendarVisibleDaySlots(days) {
  const start = getCalendarVisibleDayStart(days);
  return Array.from({ length: 5 }, (_, index) => {
    const day = days[start + index] || null;
    const date = new Date(getTripStartDate());
    date.setDate(date.getDate() + start + index);
    return { day, date: startOfDay(date) };
  });
}

function getCalendarActivityForPeriod(day, period) {
  const schedule = Array.isArray(day?.schedule) ? day.schedule : [];
  const tests = {
    morning: (activity) => {
      const text = `${activity.time || ""} ${activity.title || ""}`;
      return /^(0?[6-9]|10|11):/.test(text) || /(上午|早餐|抵达|办理入住|出发)/.test(text);
    },
    afternoon: (activity) => {
      const text = `${activity.time || ""} ${activity.title || ""}`;
      return /^(12|13|14|15|16):/.test(text) || /(下午|午餐|游船|骑行|自由|景点|游览)/.test(text);
    },
    dusk: (activity) => {
      const text = `${activity.time || ""} ${activity.title || ""}`;
      return /^(17|18|19):/.test(text) || /(傍晚|日落|晚餐|夜市|夜景)/.test(text);
    },
    night: (activity) => {
      const text = `${activity.time || ""} ${activity.title || ""}`;
      return /^(20|21|22|23):/.test(text) || /(晚上|夜间|入住|酒店|返回|休息|自由)/.test(text);
    }
  };
  return schedule.find(tests[period]) || schedule[period === "morning" ? 0 : period === "afternoon" ? 1 : period === "dusk" ? 2 : 3] || null;
}

function getCalendarPeriodOrder(period) {
  return ["morning", "afternoon", "dusk", "night"].indexOf(period);
}

function getCalendarActivityIdentity(activity) {
  return cleanCanvasItemTitle(activity?.title || "")
    .replace(/[\s·•,，。:：()（）/]/g, "")
    .toLowerCase();
}

function shouldMergeCalendarActivity(activity) {
  const text = `${activity?.title || ""} ${activity?.detail || ""}`;
  return /(返程|返回|回程|不住宿|退房|离店|酒店休息|休息调整|整理行李|机场|高铁站|车站)/.test(text);
}

function shouldHideRepeatedCalendarActivity(day, period, activity) {
  if (!activity) return false;
  const currentOrder = getCalendarPeriodOrder(period);
  if (currentOrder <= 0) return false;
  const identity = getCalendarActivityIdentity(activity);
  if (!identity) return false;
  const previousPeriods = ["morning", "afternoon", "dusk", "night"].slice(0, currentOrder);
  return previousPeriods.some((previousPeriod) => {
    const previous = getCalendarActivityForPeriod(day, previousPeriod);
    if (!previous || getCalendarActivityIdentity(previous) !== identity) return false;
    return shouldMergeCalendarActivity(activity) || shouldMergeCalendarActivity(previous) || true;
  });
}

function getCalendarPeriodFallback(period) {
  return {
    morning: ["上午", "自然探索"],
    afternoon: ["下午", "湖边放松"],
    dusk: ["傍晚", "轻松夜晚"],
    night: ["晚上", "休息调整"]
  }[period] || ["待定", "自由安排"];
}

function renderCalendarRhythmCell(day, period) {
  if (!day) {
    return `<div class="calendar-rhythm-cell calendar-rhythm-cell--empty"><strong>—</strong></div>`;
  }

  const activity = getCalendarActivityForPeriod(day, period);
  if (shouldHideRepeatedCalendarActivity(day, period, activity)) {
    return `<div class="calendar-rhythm-cell calendar-rhythm-cell--empty calendar-rhythm-cell--merged"><strong>—</strong></div>`;
  }

  const fallback = getCalendarPeriodFallback(period);
  const title = cleanCanvasItemTitle(activity?.title) || activity?.title || fallback[0];
  const detail = activity?.detail
    ? cleanCalendarDetailText(activity.detail)
    : fallback[1];
  const iso = formatISODateLocal(getDateForPlanDay(day.day));

  return `
    <button
      type="button"
      class="calendar-rhythm-cell"
      data-action="calendar-select-day"
      data-date="${escapeAttr(iso)}"
      style="--city-color:${day.color};"
    >
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(detail)}</span>
    </button>
  `;
}

function cleanCalendarDetailText(value) {
  return String(value || "")
    .replace(/[。；;].*$/, "")
    .replace(/建议|适合/g, "")
    .trim()
    .slice(0, 18) || "查看详情";
}

function renderCalendarOverviewCard(day) {
  if (!day) {
    return `<div class="calendar-overview-card calendar-overview-card--empty" aria-hidden="true"></div>`;
  }

  const iso = formatISODateLocal(getDateForPlanDay(day.day));
  const coreItems = getCanvasCoreItems(day).slice(0, 3);
  const title = getUltimateDayCardTitle(day);
  const subtitle = (day.stops || []).slice(0, 2).join(" · ") || day.summary || day.city;
  const activeDots = Math.min(3, Math.max(1, coreItems.length || (day.schedule || []).length));

  return `
    <button
      type="button"
      class="calendar-overview-card"
      data-action="calendar-select-day"
      data-date="${escapeAttr(iso)}"
      style="--city-color:${day.color};"
    >
      ${renderTravelImageMarkup({
        imageKey: `calendar-overview-${day.id}`,
        query: pickDayCoverImageQuery(day),
        city: day.city,
        fallback: day.image || getImageForStop(day.cityId, Math.max(0, day.day - 1)),
        label: "",
        extraClass: "calendar-overview-card__image"
      })}
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(subtitle)}</span>
      <i aria-hidden="true">
        ${Array.from({ length: 3 }, (_, index) => `<b class="${index < activeDots ? "is-active" : ""}"></b>`).join("")}
      </i>
    </button>
  `;
}

function renderCalendarRhythmBoard(days) {
  const slots = getCalendarVisibleDaySlots(days);
  const rows = [
    { key: "morning", label: "上午", icon: "☼" },
    { key: "afternoon", label: "下午", icon: "☀" },
    { key: "dusk", label: "傍晚", icon: "☀" },
    { key: "night", label: "晚上", icon: "☾" }
  ];

  return `
    <div class="calendar-rhythm">
      <div class="calendar-rhythm__dates">
        <div class="calendar-rhythm__corner">
          <button type="button" class="calendar-nav-btn" data-action="calendar-prev-month" aria-label="上一组">‹</button>
        </div>
        ${slots.map(({ day, date }) => {
          return `
            <button
              type="button"
              class="calendar-date-head"
              data-action="calendar-select-day"
              data-date="${escapeAttr(formatISODateLocal(date))}"
            >
              <strong>${date.getMonth() + 1}/${date.getDate()}</strong>
              <span>周${getCalendarWeekdayLabel(date)}</span>
              <em>${day ? `Day ${day.day}` : "—"}</em>
            </button>
          `;
        }).join("")}
      </div>

      <div class="calendar-rhythm__row calendar-rhythm__row--overview">
        <div class="calendar-rhythm__label">
          <strong>行程<br>概览</strong>
        </div>
        ${slots.map(({ day }) => renderCalendarOverviewCard(day)).join("")}
      </div>

      <div class="calendar-rhythm__section-label">
        <strong>每日节奏</strong>
        <span>点击查看详情</span>
      </div>

      ${rows.map((row) => `
        <div class="calendar-rhythm__row">
          <div class="calendar-rhythm__label calendar-rhythm__label--${row.key}">
            <i>${row.icon}</i>
            <strong>${row.label}</strong>
          </div>
          ${slots.map(({ day }) => renderCalendarRhythmCell(day, row.key)).join("")}
        </div>
      `).join("")}

      <aside class="calendar-rhythm-tip">
        <div>
          <strong>小贴士</strong>
          <p>行程节奏可根据天气、体力和个人喜好随时调整，点击任意一天查看详细安排或继续修改。</p>
        </div>
        <span aria-hidden="true"></span>
      </aside>
    </div>
  `;
}

function renderCalendarView(options = {}) {
  const days = getPlanDays();
  if (!days.length) return renderEmptyTripView();
  const includeMap = options.includeMap !== false;

  ensureTripCalendarStartDate();
  const tripIndex = buildCalendarTripIndex(days);
  const tripStart = getTripStartDate();
  const tripEnd = getDateForPlanDay(days[days.length - 1].day);
  const selectedDate = state.calendar.selectedDate;
  const selectedPlanDay = selectedDate ? tripIndex.get(selectedDate) : null;

  return `
    <section class="view-panel calendar-view ${includeMap && state.calendar.mapExpanded ? "calendar-view--map-expanded" : ""}" aria-label="日历视图">
      <div class="calendar-workspace">
        <div class="calendar-main">
          <div class="calendar-layout calendar-layout--rhythm ${selectedDate ? "has-detail" : ""}">
            ${renderCalendarRhythmBoard(days)}
          </div>
        </div>
        ${includeMap ? renderCalendarMapRail(selectedPlanDay) : ""}
        ${includeMap ? renderCalendarDetailDrawer(selectedDate, tripIndex) : ""}
      </div>
    </section>
  `;
}

function renderCalendarWorkspaceView() {
  const days = getPlanDays();
  if (!days.length) return renderEmptyTripView();

  ensureTripCalendarStartDate();
  const tripIndex = buildCalendarTripIndex(days);
  const selectedDate = state.calendar.selectedDate;
  const selectedPlanDay = selectedDate ? tripIndex.get(selectedDate) : null;

  return `
    <section class="calendar-shell ${state.calendar.mapExpanded ? "calendar-shell--map-expanded" : ""}" aria-label="日历工作台">
      <div class="calendar-shell__workspace">
        ${renderChatPanel()}
        <section class="calendar-shell__main">
          ${renderCalendarView({ includeMap: false })}
        </section>
        ${renderCalendarMapRail(selectedPlanDay)}
        ${renderCalendarDetailDrawer(selectedDate, tripIndex)}
        ${state.activeBooking ? `<div class="calendar-booking-panel">${renderBookingRail()}</div>` : ""}
      </div>
    </section>
  `;
}

function renderCalendarMapRail(activeDay) {
  return `
    <aside class="calendar-map-rail" aria-label="日历地图">
      <div class="calendar-map-rail__inner">
        <button class="calendar-map-toggle" type="button" data-action="toggle-calendar-map" aria-label="${state.calendar.mapExpanded ? "收起地图" : "展开地图"}">
          ${state.calendar.mapExpanded ? "收起地图" : "展开地图"}
        </button>
        ${renderAmapMcpMapStage({ embedded: true })}
      </div>
    </aside>
  `;
}

function getWorkspaceZoom(view) {
  const value = Number(state.workspaceZoom?.[view] || 1);
  return Math.min(1.5, Math.max(0.5, value));
}

function renderWorkspaceZoomControls(view) {
  const zoom = getWorkspaceZoom(view);
  return `
    <div class="zoom-workspace__toolbar" role="toolbar" aria-label="画布缩放">
      <div class="zoom-workspace__controls">
        <button type="button" data-action="workspace-zoom-out" data-view="${view}" title="缩小" aria-label="缩小画布">−</button>
        <button type="button" class="zoom-workspace__value" data-action="workspace-zoom-reset" data-view="${view}" title="恢复 100%" aria-label="当前缩放 ${Math.round(zoom * 100)}%，点击恢复">${Math.round(zoom * 100)}%</button>
        <button type="button" data-action="workspace-zoom-in" data-view="${view}" title="放大" aria-label="放大画布">＋</button>
        <span class="zoom-workspace__divider" aria-hidden="true"></span>
        <button type="button" data-action="workspace-zoom-overview" data-view="${view}" title="快速查看全局" aria-label="缩放至全局视野">⛶</button>
      </div>
    </div>
  `;
}

function changeWorkspaceZoom(view, delta, render, focal) {
  setWorkspaceZoom(view, getWorkspaceZoom(view) + Number(delta || 0), render, focal);
}

function setWorkspaceZoom(view, nextValue, render, focal) {
  if (!["free", "canvas", "ultimate"].includes(view)) return;
  const oldZoom = getWorkspaceZoom(view);
  const nextZoom = Math.round(Math.min(1.5, Math.max(0.5, Number(nextValue) || 1)) * 10) / 10;
  if (nextZoom === oldZoom) return;

  const panel = document.querySelector(`[data-zoom-workspace="${view}"]`);
  const rect = panel?.getBoundingClientRect();
  const clientX = Number.isFinite(focal?.clientX) ? focal.clientX : rect ? rect.left + rect.width / 2 : 0;
  const clientY = Number.isFinite(focal?.clientY) ? focal.clientY : rect ? rect.top + rect.height / 2 : 0;
  const localX = rect ? clientX - rect.left : 0;
  const localY = rect ? clientY - rect.top : 0;
  const contentX = panel ? (panel.scrollLeft + localX) / oldZoom : 0;
  const contentY = panel ? (panel.scrollTop + localY) / oldZoom : 0;

  state.workspaceZoom[view] = nextZoom;
  render();

  queueMicrotask(() => {
    const nextPanel = document.querySelector(`[data-zoom-workspace="${view}"]`);
    if (!nextPanel) return;
    nextPanel.scrollLeft = Math.max(0, contentX * nextZoom - localX);
    nextPanel.scrollTop = Math.max(0, contentY * nextZoom - localY);
  });
}

function renderCanvasView() {
  const days = getPlanDays();
  const activeDay = days.find((day) => day.id === state.activeCanvasDay);

  if (!days.length) return renderEmptyTripView();
  if (activeDay) return renderCanvasDayDetail(activeDay);

  return `
    <section class="view-panel canvas-view canvas-overview zoom-workspace" aria-label="画布视图" data-zoom-workspace="canvas">
      ${renderWorkspaceZoomControls("canvas")}
      <div class="zoom-workspace__surface" style="--workspace-zoom:${getWorkspaceZoom("canvas")}">
        ${renderCanvasTripHeader(days)}
        ${state.canvasPlanner.orderValidating ? `<div class="canvas-order-alert canvas-order-alert--pending" role="status">AI 正在检查日期顺序…</div>` : renderCanvasOrderAlert()}
        <section class="canvas-block-section canvas-block-section--itinerary" aria-label="行程卡片">
          <div class="canvas-block-section__head">
            <div>
              <p class="eyebrow">Itinerary</p>
              <h3>每日行程</h3>
            </div>
            <span class="canvas-block-section__hint">长按调整顺序；具体去哪天玩，看卡片里的 POI</span>
          </div>
          <div class="day-card-grid">
            ${days.map(renderCanvasDayCard).join("")}
          </div>
        </section>
        ${renderCanvasGuideCards(days)}
        ${renderCanvasBottomBoard(days)}
      </div>
    </section>
  `;
}

function getFreeCanvasRecommendations(days = getPlanDays()) {
  const guide = getTripGuide(days) || {};
  const plannedTitles = new Set(days.flatMap((day) => [
    ...(day.stops || []),
    ...(day.schedule || []).map((activity) => activity.title)
  ]).map(getFreeRecommendationIdentity).filter(Boolean));
  const spots = getGuideSpotsList(guide, days).map((item, index) => ({
    id: `spot-${index}`,
    kind: "景点",
    title: item.name || item.title || "推荐景点",
    detail: item.note || item.area || "拖到某一天加入行程",
    category: "游玩",
    imageKey: `free-spot-${index}`,
    city: item.city || days[0]?.city || "",
    fallback: item.image || getImageForStop(days[0]?.cityId, index)
  }));
  const inspirationPlaces = (guide.inspiration?.places || []).map((title, index) => ({
    id: `place-${index}`,
    kind: "景点",
    title,
    detail: `适合作为${days[0]?.city || "目的地"}行程中的弹性选择`,
    category: "游玩",
    imageKey: `free-place-${index}`,
    city: days[0]?.city || "",
    fallback: getImageForStop(days[0]?.cityId, index + 2)
  }));
  const restaurants = (guide.dining?.mustTry || []).map((item, index) => ({
    id: `food-${index}`,
    kind: "餐饮",
    title: item.name || "推荐餐厅",
    detail: [item.specialty, item.note, item.budget].filter(Boolean).join(" · ") || "适合安排在午餐或晚餐",
    category: "餐饮",
    imageKey: `free-food-${index}`,
    city: days[0]?.city || "",
    fallback: getImageForStop(days[0]?.cityId, index + 3)
  }));
  const hotels = (guide.accommodation?.nights || []).map((item, index) => ({
    id: `hotel-${index}`,
    kind: "住宿",
    title: item.name || item.area || "推荐酒店",
    detail: item.note || item.area || "适合放在当天住宿",
    category: "住宿",
    imageKey: `free-hotel-${index}`,
    city: item.city || days[0]?.city || "",
    fallback: getImageForStop(days[0]?.cityId, index + 6)
  }));
  const experiences = [
    ...(guide.activities?.highlights || []).map((item) => ({
      title: item.name,
      detail: [item.note, item.openHours, item.ticket].filter(Boolean).join(" · ")
    })),
    ...(guide.inspiration?.activities || []).map((title) => ({ title, detail: "适合加入当天的体验安排" }))
  ].map((item, index) => ({
    id: `experience-${index}`,
    kind: "体验",
    title: item.title || "当地体验",
    detail: item.detail || "适合加入当天的体验安排",
    category: "体验",
    imageKey: `free-experience-${index}`,
    city: days[0]?.city || "",
    fallback: getImageForStop(days[0]?.cityId, index + 9)
  }));

  const seen = new Set();
  return [...spots, ...inspirationPlaces, ...restaurants, ...experiences, ...hotels]
    .filter((item) => {
      const identity = getFreeRecommendationIdentity(item.title);
      if (!identity || plannedTitles.has(identity) || seen.has(identity)) return false;
      seen.add(identity);
      return true;
    })
    .slice(0, 24);
}

function getFreeRecommendationIdentity(value) {
  return String(value || "")
    .replace(/^(早餐|午餐|晚餐|入住|前往|游览|参观)\s*[:：]?\s*/, "")
    .replace(/[\s·•,，。:：()（）/]/g, "")
    .toLowerCase();
}

function getFreeRecommendationByIndex(index) {
  return getFreeCanvasRecommendations()[index] || null;
}

function addFreeCanvasActivity(dayId, title = "新的安排") {
  const edit = ensureDayEdit(dayId);
  edit.schedule.push({
    time: "待定",
    title,
    detail: title === "新的安排" ? "补充地点、交通、门票或备注。" : "用户添加的 POI 点位"
  });
}

function addFreeCanvasDay() {
  const currentDays = getPlanDays();
  const targetCity = state.route[state.route.length - 1];
  if (!targetCity) return;

  const newDayNumber = getTotalDays() + 1;
  const newDayId = `day-${newDayNumber}`;
  const currentOrder = state.canvasPlanner.dayOrder?.length
    ? [...state.canvasPlanner.dayOrder]
    : currentDays.map((day) => day.id);

  targetCity.days += 1;
  state.dayEdits[newDayId] = {
    color: getCityColor(newDayNumber - 1),
    title: "自由安排",
    focus: "自由安排",
    summary: "留给临时灵感、天气变化或旅途中发现的新地点。",
    pace: "待安排",
    transport: "待安排",
    stay: "待定",
    stops: [],
    schedule: []
  };
  state.canvasPlanner.dayOrder = [...currentOrder, newDayId];
  state.canvasPlanner.lastDayOrder = null;
  state.canvasPlanner.orderAlert = null;
  state.calendar.selectedDate = "";
  state.mapRoutes = { signature: "", loading: false, routesLoading: false, items: [], map: null, error: "" };
}

function removeFreeCanvasActivity(dayId, index) {
  const edit = ensureDayEdit(dayId);
  if (!Number.isInteger(index) || index < 0 || index >= edit.schedule.length) return;
  edit.schedule.splice(index, 1);
}

function addFreeRecommendationToDay(dayId, recIndex) {
  const recommendation = getFreeRecommendationByIndex(recIndex);
  if (!recommendation) return;
  const edit = ensureDayEdit(dayId);
  edit.schedule.push({
    time: "待定",
    title: recommendation.title,
    detail: `${recommendation.category} · ${recommendation.detail}`
  });
  const day = getPlanDays().find((item) => item.id === dayId);
  if (day && recommendation.category !== "住宿" && !edit.stops?.includes(recommendation.title)) {
    edit.stops = [...(edit.stops || day.stops || []), recommendation.title];
  }
  showToast(`已加入 ${day?.city || "当天"} 行程`);
}

function renderFreeCanvasMemo(days) {
  const checklist = getUserTripChecklist(days);
  return `
    <aside class="free-side-board free-side-board--dock" aria-label="自由画布备忘">
      <article class="free-note-card free-note-card--memo">
        <strong>Note</strong>
        <p contenteditable="true" data-placeholder="点击输入备忘，比如订票、天气、同行人偏好或需要确认的事项。"></p>
      </article>
      <article class="free-note-card free-note-card--check">
        <strong>Checklist</strong>
        <ul>${checklist.map((item) => `<li contenteditable="true" data-placeholder="${escapeAttr(item.placeholder)}">${escapeHtml(item.text)}</li>`).join("")}</ul>
      </article>
    </aside>
  `;
}

function getUserTripChecklist(days) {
  const guideItems = getTripGuide(days)?.checklist?.items || [];
  const cleaned = guideItems
    .map((item) => String(item || "").trim())
    .filter((item) => item && !/(拖拽|点击|生成|删除|添加|长按|推荐卡|Day)/.test(item))
    .slice(0, 3);
  const placeholders = ["输入待办事项", "输入需要确认的预订", "输入同行人提醒"];
  return placeholders.map((placeholder, index) => ({
    text: cleaned[index] || "",
    placeholder
  }));
}

function renderFreeDayActivity(day, activity, index) {
  const type = getFreeActivityType(activity, index);
  return `
    <article
      class="free-activity-card"
      draggable="true"
      role="button"
      tabindex="0"
      data-action="open-free-poi-detail"
      data-free-activity="${escapeAttr(activity.title || `activity-${index}`)}"
      data-free-activity-drop="${escapeAttr(activity.title || `activity-${index}`)}"
      data-day="${escapeAttr(day.id)}"
      data-index="${index}"
    >
      <span class="free-activity-card__type" data-type="${escapeAttr(type)}">${escapeHtml(type)}</span>
      ${renderTravelImageMarkup({
        imageKey: `free-day-${day.id}-${index}`,
        query: activity.title || day.city,
        city: day.city,
        fallback: getImageForStop(day.cityId, index),
        label: "",
        extraClass: "free-activity-card__image",
        preferredUrl: activity.booking?.imageUrl
      })}
      <strong>${escapeHtml(activity.title || "新的安排")}</strong>
      <button type="button" data-action="free-remove-activity" data-day="${escapeAttr(day.id)}" data-index="${index}" aria-label="删除">⋮</button>
    </article>
  `;
}

function isFreeCanvasInlineTransportActivity(activity) {
  if (isPureTransportActivity(activity)) return true;

  const title = String(activity?.title || "").trim();
  const detail = String(activity?.detail || "").trim();
  const text = `${title} ${detail}`.trim();
  if (!title) return false;
  if (/(游览|参观|打卡|漫步|散步|徒步|骑行|观景|拍照|用餐|午餐|晚餐|早餐|探店|逛|体验|夜游|泡温泉|浮潜|滑雪|露营)/.test(text)) {
    return false;
  }

  return /^(前往|去往|赶往|到|到达|抵达|出发前往|返回|回到|返程|乘车|搭车|打车|驾车|乘船|坐船|步行前往|步行至)/.test(title);
}

function buildFreeDayDisplayItems(day) {
  const schedule = Array.isArray(day?.schedule) ? day.schedule : [];
  if (!schedule.length) return [];

  const items = [];
  let pendingTransport = [];
  let lastContentIndex = null;

  schedule.forEach((activity, index) => {
    if (isFreeCanvasInlineTransportActivity(activity)) {
      pendingTransport.push({ activity, index });
      return;
    }

    if (pendingTransport.length && lastContentIndex != null) {
      items.push({
        kind: "transport",
        transportItems: pendingTransport,
        fromIndex: lastContentIndex,
        toIndex: index
      });
    }

    pendingTransport = [];
    items.push({ kind: "activity", activity, index });
    lastContentIndex = index;
  });

  return items;
}

function inferTransportModeFromActivities(transportItems = [], fallback = "") {
  const text = transportItems
    .map(({ activity }) => getActivityContextText(activity))
    .join(" ");

  if (/步行|徒步|walk/i.test(text)) return "步行";
  if (/地铁|公交|公共交通|巴士|公车/.test(text)) return "公共交通";
  if (/高铁|动车|火车|铁路|城际/.test(text)) return "高铁 / 火车";
  if (/船|轮渡|游船|码头/.test(text)) return "船程";
  if (/骑行|单车/.test(text)) return "骑行";
  if (/航班|飞机|机场|飞往|飞抵/.test(text)) return "航班";
  if (/自驾|驾车|打车|接驳|包车|前往|抵达|返回/.test(text)) return "车程";
  return fallback || "交通";
}

function renderFreeTransportTransition(day, item) {
  const schedule = Array.isArray(day?.schedule) ? day.schedule : [];
  const previous = schedule[item.fromIndex];
  const next = schedule[item.toIndex];
  if (!previous || !next) return "";

  const primaryTransport = item.transportItems[0] || null;
  const matched = findRouteSegmentForActivities(day, previous, next);
  const fallback = getFallbackTransferMeta(day, item.fromIndex);
  const mode = matched
    ? getRouteModeLabel(matched.tool || matched.mode || day.transport)
    : inferTransportModeFromActivities(item.transportItems, fallback.mode);
  const distance = matched?.distanceText || matched?.distance || fallback.distance;
  const duration = matched?.durationText || matched?.duration || fallback.duration;
  const icon = getFreeTransportIcon(mode);
  const targetLabel = `前往 ${cleanCanvasItemTitle(next.title) || next.title}`;
  const description = [mode, distance, duration, targetLabel].filter(Boolean).join("，");

  return `
    <button
      type="button"
      class="free-transfer-line"
      data-action="open-free-poi-detail"
      data-day="${escapeAttr(day.id)}"
      data-index="${Number(primaryTransport?.index ?? "")}"
      aria-label="${escapeAttr(description || "查看交通安排")}"
      title="${escapeAttr(description || "查看交通安排")}"
    >
      <span class="free-transfer-line__icon" aria-hidden="true">${icon}</span>
      <span class="free-transfer-line__content">
        <strong class="free-transfer-line__mode">${escapeHtml(mode || "交通")}</strong>
        <span class="free-transfer-line__metrics">
          <span>${escapeHtml(distance || "待确认")}</span>
          <span>${escapeHtml(duration || "待确认")}</span>
        </span>
        <em class="free-transfer-line__target">${escapeHtml(targetLabel)}</em>
      </span>
    </button>
  `;
}

function getFreeActivityType(activity, index) {
  const title = String(activity?.title || "");
  const detail = String(activity?.detail || "");
  const fallbackText = /^(新的安排|待定|自由活动|其他)$/.test(title.trim()) ? `${title} ${detail}` : title;

  if (/(入住|住宿|下榻|办理入住|酒店休息|民宿|客栈|度假村)/.test(fallbackText)
    && !/(前往|返回|离开|退房|接驳)/.test(title)) return "酒店";
  if (/(早餐|午餐|晚餐|餐厅|用餐|小吃|美食|咖啡|茶馆|酒楼|饭店|菜馆|夜市)/.test(fallbackText)) return "餐饮";
  if (/(抵达|出发|返回|返程|前往|高铁|航班|机场|车站|地铁|公交|打车|自驾|接驳|步行|骑行|码头)/.test(fallbackText)) return "交通";
  if (/(演出|表演|体验|课程|手作|温泉|漂流|游船|夜游|观景|日落|自由活动|购物)/.test(fallbackText)) return "体验";
  return index >= 0 ? "景点" : "其他";
}

function renderFreeDayColumn(day) {
  const displayItems = buildFreeDayDisplayItems(day);
  return `
    <section
      class="free-day-column"
      draggable="true"
      data-free-drop-day="${escapeAttr(day.id)}"
      data-day-order-card="${escapeAttr(day.id)}"
      data-day-order-drop="${escapeAttr(day.id)}"
      style="--city-color:${day.color};"
    >
      <header>
        <span>DAY ${day.day}</span>
        <strong>${escapeHtml(day.city)}</strong>
        <i class="day-drag-handle" aria-hidden="true" title="拖拽交换日期">⠿</i>
      </header>
      <div class="free-day-stack">
        ${displayItems.length
          ? displayItems.map((item) =>
              item.kind === "activity"
                ? renderFreeDayActivity(day, item.activity, item.index)
                : renderFreeTransportTransition(day, item)
            ).join("")
          : (day.schedule || []).length
            ? `<p class="free-day-empty">本段以交通衔接为主</p>`
            : `<p class="free-day-empty">拖拽放置</p>`}
      </div>
      <button type="button" class="free-add-button" data-action="free-add-activity" data-day="${escapeAttr(day.id)}">+</button>
    </section>
  `;
}

function renderFreeRecommendationCard(item, index) {
  return `
    <article
      class="free-rec-card"
      draggable="true"
      data-free-rec="${index}"
      data-action="open-free-inspiration-detail"
      data-rec-id="${escapeAttr(item.id)}"
      tabindex="0"
    >
      ${renderTravelImageMarkup({
        imageKey: item.imageKey,
        query: item.title,
        city: item.city,
        fallback: item.fallback,
        label: "",
        extraClass: "free-rec-card__image"
      })}
      <span>${escapeHtml(item.category)}</span>
      <strong>${escapeHtml(item.title)}</strong>
      <p>${escapeHtml(item.detail)}</p>
    </article>
  `;
}

function renderFreeRecommendations(days) {
  const allRecommendations = getFreeCanvasRecommendations(days);
  if (!allRecommendations.length) return "";
  const categories = ["全部", "景点", "餐饮", "体验", "住宿"]
    .filter((category) => category === "全部" || allRecommendations.some((item) => item.kind === category));
  if (!categories.includes(state.freeInspiration.category)) state.freeInspiration.category = "全部";
  const recommendations = allRecommendations
    .map((item, recIndex) => ({ ...item, recIndex }))
    .filter((item) => state.freeInspiration.category === "全部" || item.kind === state.freeInspiration.category);
  return `
    <section class="free-recommendation-dock" aria-label="灵感激发">
      <div class="free-recommendation-main">
        <div class="free-dock-head">
          <div>
            <strong>灵感激发</strong>
            <span>旅途中还可以去的地方</span>
          </div>
          <div class="free-inspiration-tabs" role="tablist" aria-label="灵感分类">
            ${categories.map((category) => `
              <button
                type="button"
                role="tab"
                aria-selected="${state.freeInspiration.category === category}"
                class="free-inspiration-tab ${state.freeInspiration.category === category ? "is-active" : ""}"
                data-action="set-free-inspiration-category"
                data-category="${escapeAttr(category)}"
              >${escapeHtml(category)}</button>
            `).join("")}
          </div>
        </div>
        <div class="free-rec-track">
          ${recommendations.map((item) => renderFreeRecommendationCard(item, item.recIndex)).join("")}
        </div>
      </div>
      ${renderFreeCanvasMemo(days)}
    </section>
  `;
}

function renderFreePoiDetail() {
  const detail = state.freePoiDetail;
  if (!detail) return "";
  const day = getPlanDays().find((item) => item.id === detail.dayId);
  const activity = day?.schedule?.[detail.index];
  if (!day || !activity) return "";
  const type = getFreeActivityType(activity, detail.index);
  const bookingTools = renderRoadbookBookingChips(day, activity, detail.index);

  return `
    <div class="free-inspiration-detail-layer" role="presentation">
      <button type="button" class="free-inspiration-detail-backdrop" data-action="close-free-poi-detail" aria-label="关闭点位详情"></button>
      <aside class="free-inspiration-detail free-poi-detail" role="dialog" aria-modal="true" aria-label="${escapeAttr(activity.title || "点位")}详情">
        <button type="button" class="free-inspiration-detail__close" data-action="close-free-poi-detail" aria-label="关闭">×</button>
        ${renderTravelImageMarkup({
          imageKey: `free-poi-detail-${day.id}-${detail.index}`,
          query: activity.title || day.city,
          city: day.city,
          fallback: getImageForStop(day.cityId, detail.index),
          extraClass: "free-inspiration-detail__image",
          preferredUrl: activity.booking?.imageUrl
        })}
        <div class="free-inspiration-detail__body">
          <span class="free-inspiration-detail__category" data-type="${escapeAttr(type)}">${escapeHtml(type)}</span>
          <h2>${escapeHtml(activity.title || "新的安排")}</h2>
          <p>${escapeHtml(activity.detail || "暂无更多说明，可在画布中继续补充。")}</p>
          <dl>
            <div><dt>行程日期</dt><dd>Day ${day.day}</dd></div>
            <div><dt>时间</dt><dd>${escapeHtml(activity.time || "待定")}</dd></div>
            <div><dt>地点</dt><dd>${escapeHtml(day.city || "当前目的地")}</dd></div>
            <div><dt>类型</dt><dd>${escapeHtml(type)}</dd></div>
          </dl>
          ${bookingTools ? `
            <section class="free-poi-bookings" aria-label="预订服务">
              <div class="free-poi-bookings__head">
                <span>预订服务</span>
                <small>实时查询可订方案</small>
              </div>
              ${bookingTools}
            </section>
          ` : ""}
          <div class="free-inspiration-detail__days">
            <button type="button" data-action="open-free-poi-day" data-day="${escapeAttr(day.id)}">在画布中查看 Day ${day.day}</button>
          </div>
        </div>
      </aside>
    </div>
  `;
}

function renderFreeInspirationDetail() {
  const activeId = state.freeInspiration.activeId;
  if (!activeId) return "";
  const days = getPlanDays();
  const recommendations = getFreeCanvasRecommendations(days);
  const recIndex = recommendations.findIndex((item) => item.id === activeId);
  const item = recommendations[recIndex];
  if (!item) return "";

  return `
    <div class="free-inspiration-detail-layer" role="presentation">
      <button type="button" class="free-inspiration-detail-backdrop" data-action="close-free-inspiration-detail" aria-label="关闭地点详情"></button>
      <aside class="free-inspiration-detail" role="dialog" aria-modal="true" aria-label="${escapeAttr(item.title)}详情">
        <button type="button" class="free-inspiration-detail__close" data-action="close-free-inspiration-detail" aria-label="关闭">×</button>
        ${renderTravelImageMarkup({
          imageKey: `${item.imageKey}-detail`,
          query: item.title,
          city: item.city,
          fallback: item.fallback,
          extraClass: "free-inspiration-detail__image"
        })}
        <div class="free-inspiration-detail__body">
          <span class="free-inspiration-detail__category">${escapeHtml(item.kind)}</span>
          <h2>${escapeHtml(item.title)}</h2>
          <p>${escapeHtml(item.detail)}</p>
          <dl>
            <div><dt>目的地</dt><dd>${escapeHtml(item.city || days[0]?.city || "当前行程")}</dd></div>
            <div><dt>适合安排</dt><dd>${escapeHtml(getFreeInspirationTimeHint(item.kind))}</dd></div>
          </dl>
          <div class="free-inspiration-detail__days" aria-label="加入某天">
            ${days.map((day) => `
              <button
                type="button"
                data-action="free-add-recommendation"
                data-day="${escapeAttr(day.id)}"
                data-rec-index="${recIndex}"
              >加入 Day ${day.day}</button>
            `).join("")}
          </div>
        </div>
      </aside>
    </div>
  `;
}

function getFreeInspirationTimeHint(kind) {
  if (kind === "餐饮") return "午餐或晚餐";
  if (kind === "住宿") return "当天行程末尾";
  if (kind === "体验") return "半日或晚间时段";
  return "上午或下午";
}

function renderFreeCanvasView(options = {}) {
  const days = getPlanDays();
  if (!days.length) return renderEmptyTripView();
  const includeMap = options.includeMap !== false;
  ensureValidMapPlannerState();

  return `
    <section class="view-panel free-canvas-view zoom-workspace" aria-label="自由视图" data-zoom-workspace="free">
      ${includeMap ? `
        <section class="free-canvas-map" aria-label="自由视图行程地图">
          <header class="free-canvas-map__head">
            <div>
              <span>行程地图</span>
              <small>按 Day 查看路线与点位</small>
            </div>
          </header>
          ${renderAmapMcpMapStage()}
        </section>
      ` : ""}
      ${renderWorkspaceZoomControls("free")}
      <div class="zoom-workspace__surface" style="--workspace-zoom:${getWorkspaceZoom("free")}">
        ${state.canvasPlanner.orderValidating ? `<div class="canvas-order-alert canvas-order-alert--pending" role="status">AI 正在检查日期顺序…</div>` : renderCanvasOrderAlert()}
        <div class="free-canvas-board">
          <main class="free-days-lane">
            ${days.map(renderFreeDayColumn).join("")}
            <button type="button" class="free-new-day" data-action="free-add-day"><span aria-hidden="true">＋</span>新增 Day</button>
          </main>
        </div>
        ${renderFreeRecommendations(days)}
      </div>
    </section>
  `;
}

function renderFreeCanvasWorkspaceView() {
  const days = getPlanDays();
  if (!days.length) return renderEmptyTripView();
  ensureValidMapPlannerState();

  return `
    <section class="free2-shell" aria-label="自由视图">
      <div class="free2-shell__workspace">
        ${renderChatPanel()}
        <section class="free2-shell__main">
          ${renderFreeCanvasView({ includeMap: false })}
        </section>
        ${renderFreeCanvasMapRail()}
        ${state.activeBooking ? `<div class="free2-booking-panel">${renderBookingRail()}</div>` : ""}
      </div>
    </section>
  `;
}

function renderFreeCanvasMapRail() {
  return `
    <aside class="free2-map-rail" aria-label="自由视图地图">
      <div class="free2-map-rail__inner">
        ${renderAmapMcpMapStage({ embedded: true })}
      </div>
    </aside>
  `;
}

function getCanvasTripHeadline(days) {
  const overview = getTripGuide(days)?.overview || {};
  if (overview.title) return overview.title;
  const city = state.route.map((item) => item.city).filter(Boolean).join("、") || days[0]?.city || "旅途";
  const style = getTravelStyle(days).label.replace(/游$/, "");
  return `${days.length}天${city}${style === "平衡节奏" ? "行程探秘" : style}`;
}

function getCanvasTripSubtitle(days) {
  const overview = getTripGuide(days)?.overview || {};
  if (overview.summary) return overview.summary;
  const destination = state.route.map((item) => item.city).filter(Boolean).join(" · ") || days[0]?.city || "目的地";
  return `${destination}之间 · 把路线、住宿、景点与提醒收进一张旅行画布`;
}

function getCanvasTripStats(days) {
  const cities = new Set(days.map((day) => day.city).filter(Boolean));
  let experiences = 0;
  const hotels = new Set();

  days.forEach((day) => {
    experiences += getCanvasCoreItems(day).length;
    const stay = String(day.stay || "").trim();
    if (stay && !/(返程|不住宿|待定)/.test(stay)) hotels.add(stay);
  });

  const guide = getTripGuide(days);
  const intercity = guide?.transport?.intercity?.length || 0;
  const segments = state.mapRoutes.map?.segments?.length || 0;
  const transport = Math.max(intercity, segments, state.route.length > 1 ? state.route.length - 1 : 0, 1);

  return {
    days: days.length,
    cities: cities.size || state.route.length || 1,
    experiences: experiences || days.reduce((sum, day) => sum + (day.stops?.length || 0), 0),
    hotels: hotels.size || 1,
    transport
  };
}

function inferTripOriginCity() {
  for (const message of [...state.chat].reverse()) {
    if (message.role !== "user") continue;
    const match = extractUserTripOrigin(message.text);
    if (match) return match[1];
  }
  return "";
}

function extractUserTripOrigin(value) {
  const text = String(value || "");
  return text.match(/从([\u4e00-\u9fa5]{2,10})(?:出发|前往|去|到|乘|坐|自驾|飞)/)
    || text.match(/([\u4e00-\u9fa5]{2,10})(?:出发|启程)(?:前往|去|至|到)?/)
    || text.match(/(?:出发地|始发地)\s*[:：]?\s*([\u4e00-\u9fa5]{2,10})/);
}

function hasUserSpecifiedTripOrigin() {
  return state.chat.some((message) => message.role === "user" && extractUserTripOrigin(message.text));
}

function getCanvasRouteStrip(days) {
  const overview = getTripGuide(days)?.overview || {};
  const destination = state.route[0]?.city || days[0]?.city || "目的地";
  const specifiedOrigin = inferTripOriginCity();
  const origin = specifiedOrigin || "行程起点";
  const dateRange = overview.dateRange || `D1 – D${days.length}`;
  return {
    origin,
    destination,
    returnCity: specifiedOrigin || "行程结束",
    dateRange
  };
}

function renderCanvasTripStatItem(icon, value, label) {
  return `
    <div class="canvas-trip-stat">
      <span class="canvas-trip-stat__icon" aria-hidden="true">${icon}</span>
      <strong>${escapeHtml(String(value))}</strong>
      <span>${escapeHtml(label)}</span>
    </div>
  `;
}

function renderCanvasRouteConnector() {
  return `
    <div class="canvas-route-connector" aria-hidden="true">
      <span class="canvas-route-connector__line"></span>
      <span class="canvas-route-connector__icon">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
          <rect x="4" y="8" width="16" height="8" rx="2"></rect>
          <path d="M4 12h16"></path>
          <circle cx="8" cy="17" r="1.5" fill="currentColor" stroke="none"></circle>
          <circle cx="16" cy="17" r="1.5" fill="currentColor" stroke="none"></circle>
        </svg>
      </span>
      <span class="canvas-route-connector__line"></span>
    </div>
  `;
}

function renderCanvasMapPreview(days) {
  if (!state.route.length) {
    return `
      <div class="canvas-map-preview">
        <div class="canvas-map-preview__stage" aria-label="行程地图">
          <div class="canvas-map-preview__empty">地图加载中…</div>
        </div>
      </div>
    `;
  }

  ensureValidMapPlannerState();
  return `
    <div class="canvas-map-preview">
      <div class="canvas-map-preview__stage" aria-label="行程地图">
        ${renderAmapMcpMapStage({ embedded: true, preview: true })}
      </div>
    </div>
  `;
}

function getCanvasFeaturedDay(days) {
  return days.find((day) => getCanvasCoreItems(day).length) || days[0];
}

function renderCanvasStickyNotes(days) {
  const guide = getTripGuide(days);
  const overview = guide?.overview || {};
  const firstDay = days[0];
  const checklist = getUserTripChecklist(days);
  const memo = overview.summary || firstDay?.summary || "把每天的景点、交通和住宿都收在这张画布里，适合先排顺序，再逐项细化。";

  return `
    <div class="canvas-sticker-label">行程备忘</div>
    <article class="canvas-note-card canvas-note-card--memo">
      <span>Note</span>
      <p>${escapeHtml(memo)}</p>
    </article>
    <article class="canvas-note-card canvas-note-card--checklist">
      <span>Checklist</span>
      <ul>
        ${checklist.map((item) => `<li contenteditable="true" data-placeholder="${escapeAttr(item.placeholder)}">${escapeHtml(item.text)}</li>`).join("")}
      </ul>
    </article>
  `;
}

function renderCanvasMapInspector(days) {
  const featuredDay = getCanvasFeaturedDay(days);
  const spots = getCanvasCoreItems(featuredDay).slice(0, 3);

  return `
    <div class="canvas-map-card">
      <div class="canvas-map-card__toolbar">
        <span>DAY ${featuredDay.day}</span>
      </div>
      ${renderCanvasMapPreview(days)}
    </div>
    <article class="canvas-spotlight">
      <p class="eyebrow">Selected place</p>
      <h3>${escapeHtml(spots[0]?.title || featuredDay.title)}</h3>
      <p>${escapeHtml(featuredDay.summary || featuredDay.schedule?.[0]?.detail || "当前行程的重点地点会在这里预览，方便从地图回到排期。")}</p>
      <div class="canvas-spotlight__photos">
        ${spots.map((spot, index) => renderTravelImageMarkup({
          imageKey: `spotlight-${featuredDay.id}-${index}`,
          query: spot.title,
          city: featuredDay.city,
          fallback: getImageForStop(featuredDay.cityId, index),
          label: "",
          extraClass: "canvas-spotlight__photo"
        })).join("")}
      </div>
      <div class="canvas-spotlight__facts">
        <span>${escapeHtml(featuredDay.transport || "交通待定")}</span>
        <span>${escapeHtml(featuredDay.pace || "节奏待定")}</span>
      </div>
    </article>
  `;
}

function renderCanvasPhotoDeck(days) {
  const cards = days.flatMap((day) =>
    getCanvasCoreItems(day).slice(0, 2).map((item, index) => ({ day, item, index }))
  ).slice(0, 7);

  if (!cards.length) return "";

  return `
    <section class="canvas-photo-deck" aria-label="照片空间">
      <div class="canvas-sticker-label">照片空间</div>
      <div class="canvas-photo-fan">
        ${cards.map(({ day, item, index }, cardIndex) => `
          <article class="canvas-photo-card" style="--card-index:${cardIndex}; --city-color:${day.color};">
            ${renderTravelImageMarkup({
              imageKey: `photo-deck-${day.id}-${index}`,
              query: item.title,
              city: day.city,
              fallback: getImageForStop(day.cityId, index),
              label: `D${day.day}`,
              extraClass: "canvas-photo-card__image"
            })}
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(day.city)}</span>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderCanvasBottomBoard(days) {
  return `
    <section class="canvas-bottom-board" aria-label="画布灵感区">
      <div class="canvas-bottom-board__notes">
        ${renderCanvasStickyNotes(days)}
      </div>
      ${renderCanvasPhotoDeck(days)}
    </section>
  `;
}

function renderCanvasTripHeader(days) {
  const stats = getCanvasTripStats(days);
  const route = getCanvasRouteStrip(days);

  return `
    <header class="canvas-trip-header" aria-label="行程概览">
      <h2 class="canvas-trip-header__title">${escapeHtml(getCanvasTripHeadline(days))}</h2>
      <p class="canvas-trip-header__subtitle">${escapeHtml(getCanvasTripSubtitle(days))}</p>

      <div class="canvas-trip-stats" aria-label="行程统计">
        ${renderCanvasTripStatItem(
          `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M8 3v4M16 3v4M3 10h18"></path></svg>`,
          stats.days,
          "天数"
        )}
        ${renderCanvasTripStatItem(
          `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"></path><circle cx="12" cy="10" r="2.2"></circle></svg>`,
          stats.cities,
          "城市"
        )}
        ${renderCanvasTripStatItem(
          `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.8 7.2 17.9l.9-5.4L4.2 8.7l5.4-.8L12 3Z"></path></svg>`,
          stats.experiences,
          "体验"
        )}
        ${renderCanvasTripStatItem(
          `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11h18v9H3z"></path><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
          stats.hotels,
          "酒店"
        )}
        ${renderCanvasTripStatItem(
          `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 16h16M6 16V8h12v8"></path><circle cx="7.5" cy="18" r="1.5"></circle><circle cx="16.5" cy="18" r="1.5"></circle></svg>`,
          stats.transport,
          "运输"
        )}
      </div>

      <div class="canvas-route-strip" aria-label="行程路线">
        <div class="canvas-route-node">
          <span class="canvas-route-node__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"></path><circle cx="12" cy="10" r="2.2"></circle></svg>
          </span>
          <span>${escapeHtml(route.origin)}</span>
        </div>
        ${renderCanvasRouteConnector()}
        <div class="canvas-route-destination">
          <strong>${escapeHtml(route.destination)}</strong>
          <span>${escapeHtml(route.dateRange)}</span>
        </div>
        ${renderCanvasRouteConnector()}
        <div class="canvas-route-node">
          <span class="canvas-route-node__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"></path><circle cx="12" cy="10" r="2.2"></circle></svg>
          </span>
          <span>${escapeHtml(route.returnCity)}</span>
        </div>
      </div>

      ${renderCanvasMapPreview(days)}
    </header>
  `;
}

function renderCanvasOrderAlert() {
  const alert = state.canvasPlanner.orderAlert;
  if (!alert) return "";

  return `
    <div class="canvas-order-alert canvas-order-alert--${escapeAttr(alert.status)}" role="alert">
      <div class="canvas-order-alert__copy">
        <strong>${escapeHtml(alert.title)}</strong>
        <p>${escapeHtml(alert.message)}</p>
        ${
          alert.issues?.length
            ? `<ul>${alert.issues.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
            : ""
        }
      </div>
      <div class="canvas-order-alert__actions">
        ${state.canvasPlanner.lastDayOrder ? `<button class="button button--ghost" type="button" data-action="undo-day-order">撤销调整</button>` : ""}
        <button class="button button--primary" type="button" data-action="dismiss-order-alert">知道了</button>
      </div>
    </div>
  `;
}

function renderCanvasDayCard(day) {
  const coreItems = getCanvasCoreItems(day);
  const coverImage = day.image || getImageForStop(day.cityId, Math.max(0, day.day - 1));
  const coverQuery = pickDayCoverImageQuery(day);
  return `
    <article
      class="day-card canvas-day-card"
      draggable="true"
      style="--city-color: ${day.color};"
      data-canvas-drop-day="${day.id}"
      data-canvas-day-card="${day.id}"
      data-day-order-card="${day.id}"
      data-day-order-drop="${day.id}"
    >
      <i class="day-drag-handle" aria-hidden="true" title="拖拽交换日期">⠿</i>
      <button class="day-card__open" type="button" data-action="open-day" data-day="${day.id}" aria-label="打开 D${day.day} ${day.city}">
        ${renderTravelImageMarkup({
          imageKey: `day-${day.id}`,
          query: coverQuery,
          city: day.city,
          fallback: coverImage,
          label: `D${day.day}`,
          extraClass: "day-card__image"
        })}
        <div class="day-card__body">
          <div class="day-card__head">
            <span>D${day.day} · ${escapeHtml(day.city)}</span>
            <em>${day.pace}</em>
          </div>
          <h3>${escapeHtml(day.title)}</h3>
        </div>
      </button>
      <div class="canvas-core-list" aria-label="核心元素">
        ${
          coreItems.length
            ? `
              <div class="canvas-core-list__head">
                <span>核心活动</span>
                <strong>${coreItems.length} 项</strong>
              </div>
              ${coreItems.map((item) => renderCanvasCoreItem(day, item)).join("")}
            `
            : `<p class="canvas-empty-drop">拖入景点、餐厅或体验</p>`
        }
      </div>
    </article>
  `;
}

function pickDayCoverImageQuery(day) {
  const schedule = Array.isArray(day?.schedule) ? day.schedule : [];
  const ranked = schedule
    .map((activity, index) => ({ activity, index, score: scoreDayCoverActivity(activity, index) }))
    .filter((item) => Number.isFinite(item.score))
    .sort((left, right) => right.score - left.score || left.index - right.index);
  const fallback = schedule.find((activity) => !isPureTransportActivity(activity) && !isGenericMapPoint(cleanMapPointName(activity?.title)))
    || schedule.find((activity) => !isPureTransportActivity(activity))
    || schedule[0];
  const selected = ranked[0]?.activity || fallback;
  return normalizeDayCoverImageQuery(selected?.title || day?.title || day?.city || getTripTitle(), day);
}

function isCoverImageWorthyActivity(activity) {
  const title = cleanMapPointName(activity?.title);
  const detail = String(activity?.detail || "");
  const text = `${title} ${detail}`;
  if (!title || isGenericMapPoint(title) || isPureTransportActivity(activity || {})) return false;
  if (/(景区|湖区|岛|湖|山|峰|观景台|码头|游船|古镇|古村|博物馆|广场|公园|街|寺|塔|骑行|日落)/.test(text)) return true;
  return false;
}

function scoreDayCoverActivity(activity, index = 0) {
  const title = cleanMapPointName(activity?.title);
  const detail = String(activity?.detail || "");
  const text = `${title} ${detail}`;
  if (!title || isGenericMapPoint(title) || isPureTransportActivity(activity || {})) return -Infinity;

  let score = isCoverImageWorthyActivity(activity) ? 24 : 0;
  if (/(日出|日落|观景台|山|峰|峡谷|湖|岛|海|滩|湾|瀑布|古镇|古村|博物馆|美术馆|公园|湿地|寺|庙|桥|塔|步道)/.test(text)) score += 32;
  if (/(观景|全景|湖景|山景|海景|夜景|航拍)/.test(text)) score += 14;
  if (/(骑行|徒步|漫步|游船|出海|索道|缆车|漂流|露营)/.test(text)) score += 8;
  if (/(湖区|街区|商圈|市区|城区|码头)/.test(text)) score -= 8;
  if (/^(环湖|骑行|徒步|漫步|自由活动|返程|休整)/.test(title)) score -= 18;
  if (/^(中心湖区|东南湖区|西南湖区|西北湖区|主城区|市区|城区)$/.test(title)) score -= 6;
  if (title.length >= 4 && !/^(中心湖区|东南湖区|西南湖区|西北湖区|环湖|市区|城区)$/.test(title)) score += 6;
  if (/(酒店|民宿|客栈|餐厅|美食|鱼头|咖啡|茶馆|早餐|午餐|晚餐)/.test(text)) score -= 20;
  score -= index * 0.6;
  return score;
}

function normalizeDayCoverImageQuery(value, day) {
  const cleaned = cleanTravelImageQuery(value || day?.title || day?.city || getTripTitle());
  const refined = cleaned
    .replace(/(?:或|\/|、)?\s*(?:自由活动|休整|待定|可选.*)$/g, "")
    .replace(/(?:观日落|看日落|日落观景|夜景|骑行|徒步|漫步|游船|出海|打卡|参观|游览|体验)$/g, "")
    .replace(/(?:酒店|民宿|客栈|旅馆|度假村|住宿区|住宿区域|酒店区|酒店片区|住处)$/g, "")
    .trim();
  const city = cleanTravelImageQuery(day?.city || "");
  if (!refined) return city || cleaned || getTripTitle();
  if (/^(?:环湖|市区|城区|主城区|核心城区|自由活动|返程|待定)$/.test(refined)) return city || refined;
  return refined;
}

function renderCanvasCoreItem(day, item) {
  return `
    <button
      type="button"
      class="canvas-core-item"
      draggable="true"
      data-canvas-item="${escapeAttr(item.title)}"
      data-day="${day.id}"
      data-index="${item.index}"
      title="拖拽到其他日期调整"
    >
      <span aria-label="${escapeAttr(item.category)}">${getActivityCategoryEmoji(item.category)}</span>
      <strong>${escapeHtml(item.title)}</strong>
    </button>
  `;
}

function getCanvasCoreItems(day) {
  return day.schedule
    .map((activity, index) => ({
      index,
      title: cleanCanvasItemTitle(activity.title),
      category: getActivityCategory(activity.title || "", index),
      detail: activity.detail || ""
    }))
    .filter((item) => item.title && !/^(自由活动|待定|新的安排)$/.test(item.title));
}

function cleanCanvasItemTitle(value) {
  return String(value || "")
    .replace(/^(游览|参观|打卡|前往|抵达|返回|入住|午餐[:：]?|晚餐[:：]?|早餐[:：]?)/, "")
    .trim();
}

function isCanvasAuxiliaryItem(item) {
  const text = `${item.title} ${item.detail}`;
  if (/(餐|咖啡|茶|小吃|美食|市场|夜市)/.test(text)) return false;
  if (/(入住|酒店|住宿|返程|出发|前往|抵达|打车|地铁|高铁|航班|机场|车站|休整)/.test(text)) return true;
  return /^(自由活动|待定|新的安排)$/.test(item.title);
}

function renderCanvasDayDetail(day) {
  return `
    <section class="view-panel canvas-view day-detail-view zoom-workspace" aria-label="单日详情" data-zoom-workspace="canvas">
      ${renderWorkspaceZoomControls("canvas")}
      <div class="zoom-workspace__surface" style="--workspace-zoom:${getWorkspaceZoom("canvas")}">
        <div class="day-detail-head">
          <button class="button button--ghost" type="button" data-action="close-day">返回画布</button>
          <div class="day-detail-head__copy">
            <strong>${day.day}. D${day.day} ${escapeHtml(day.city)}</strong>
            <em>${escapeHtml(day.title)}</em>
          </div>
        </div>
        <article class="day-section article-day outline-day is-expanded">
          ${renderDayItineraryBody(day)}
        </article>
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
            : `<p class="empty-state">暂无注释</p>`
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
      ${note.quote ? `<blockquote>${escapeHtml(note.quote)}</blockquote>` : ""}
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
        <div class="advisor-profile">
          <span class="advisor-avatar" aria-hidden="true">AI</span>
          <div>
            <p class="eyebrow">AI Advisor</p>
            <h2>Mira Travel Concierge</h2>
          </div>
        </div>
      </div>
      <div class="chat-messages">
        ${state.chat.map(renderChatMessage).join("")}
        ${state.isChatLoading ? `<article class="chat-message chat-message--assistant"><p>DeepSeek 正在思考...</p></article>` : ""}
      </div>
      ${renderSmartChatSuggestions()}
      <div class="chat-compose">
        <input class="chat-input" type="text" value="" />
        <button class="button button--primary" type="button" data-action="send-chat" ${state.isChatLoading ? "disabled" : ""}>发送</button>
      </div>
    </aside>
  `;
}

function renderChatMessage(message) {
  const paragraphs = String(message.text || "").split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const body = paragraphs.length > 1
    ? paragraphs.map((line) => `<p>${escapeHtml(line)}</p>`).join("")
    : `<p>${escapeHtml(message.text)}</p>`;

  return `
    <article class="chat-message chat-message--${message.role}">
      ${body}
    </article>
  `;
}

function renderSmartChatSuggestions() {
  const suggestions = getSmartChatSuggestions();
  if (!suggestions.length) return "";

  return `
    <div class="chat-shortcuts" aria-label="智能建议">
      ${suggestions
        .map(
          (suggestion) => `
            <button type="button" data-action="send-suggestion" data-prompt="${escapeAttr(suggestion.prompt)}">
              ${escapeHtml(suggestion.label)}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function getSmartChatSuggestions() {
  const hasUserMessage = state.chat.some((message) => message.role === "user");
  if (!hasUserMessage || state.isChatLoading) return [];

  if (isInspirationTrip()) {
    const anchor = getInspirationAnchor();
    if (anchor) {
      return [
        {
          label: "上海高铁出发",
          prompt: `从上海高铁出发去${anchor}，预算舒适，情侣同行，请生成三日详细行程路书。`
        },
        {
          label: "杭州自驾",
          prompt: `从杭州自驾去${anchor}，预算经济，朋友同行，请生成三日详细行程路书。`
        },
        {
          label: "亲子轻松游",
          prompt: `带小孩去${anchor}，希望节奏轻松、少赶路，请生成三日亲子向行程。`
        }
      ];
    }
    return [
      {
        label: "再推荐几个",
        prompt: "请再推荐 3 个风格不同的备选目的地，并说明各自适合什么旅行偏好。"
      },
      {
        label: "比较预算",
        prompt: "请比较这些备选目的地的预算区间、最佳季节和交通方式。"
      },
      {
        label: "亲子友好",
        prompt: "请从刚才的推荐里挑出更适合亲子或带父母出行的选项，并说明原因。"
      }
    ];
  }

  if (!state.route.length) return [];

  const days = getPlanDays();
  const suggestions = [];
  const pendingFlights = Object.values(state.bookings.flights || {}).some((booking) => !booking.booked);
  const pendingHotels = Object.values(state.bookings.hotels || {}).some((booking) => !booking.booked);
  const busyDays = days.filter((day) => day.schedule.length >= 4 || day.pace === "偏满");

  if (busyDays.length) {
    suggestions.push({
      label: "放慢节奏",
      prompt: "请只调整行程里过满的日期，减少赶路和排队压力，保留核心体验。"
    });
  }

  if (pendingHotels) {
    suggestions.push({
      label: "优化住宿",
      prompt: "请根据当前行程动线，只优化住宿区域和酒店预订建议，不改变景点安排。"
    });
  }

  if (pendingFlights) {
    suggestions.push({
      label: "检查交通",
      prompt: "请检查当前行程中的跨城交通和航班预订入口，只优化交通衔接，不重排行程。"
    });
  }

  suggestions.push({
    label: "补充美食",
    prompt: "请在不增加赶路的前提下，为当前行程补充当地美食和预约提醒，只做局部修改。"
  });

  suggestions.push({
    label: "增加避坑",
    prompt: "请为当前行程补充真实避坑提醒、预约注意事项和替代方案，只做局部增强。"
  });

  return suggestions.slice(0, 3);
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
        title: buildFallbackDayTitle(city, day, availableStops, template),
        summary: buildDaySummary(city, day, availableStops),
        stops: availableStops,
        schedule: template.schedule.map((activity) => ({ ...activity }))
      };
      days.push(applyDayEdit(baseDay));
      dayNumber += 1;
    }
  });

  return applyDayOrder(days);
}

function applyDayOrder(days) {
  if (!days.length) return days;

  const ids = days.map((day) => day.id);
  if (!state.canvasPlanner.dayOrder?.length || state.canvasPlanner.dayOrder.length !== days.length) {
    state.canvasPlanner.dayOrder = ids;
  } else {
    const known = new Set(ids);
    state.canvasPlanner.dayOrder = [
      ...state.canvasPlanner.dayOrder.filter((id) => known.has(id)),
      ...ids.filter((id) => !state.canvasPlanner.dayOrder.includes(id))
    ];
  }

  const dayMap = new Map(days.map((day) => [day.id, day]));
  return state.canvasPlanner.dayOrder
    .map((id) => dayMap.get(id))
    .filter(Boolean)
    .map((day, index) => ({ ...day, day: index + 1 }));
}

function reorderCanvasDay(sourceDayId, targetDayId) {
  if (!sourceDayId || !targetDayId || sourceDayId === targetDayId) return false;

  getPlanDays();
  if (!state.canvasPlanner.dayOrder?.length) return false;

  state.canvasPlanner.lastDayOrder = [...state.canvasPlanner.dayOrder];

  const fromIndex = state.canvasPlanner.dayOrder.indexOf(sourceDayId);
  const toIndex = state.canvasPlanner.dayOrder.indexOf(targetDayId);
  if (fromIndex < 0 || toIndex < 0) return false;

  const next = [...state.canvasPlanner.dayOrder];
  [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
  state.canvasPlanner.dayOrder = next;
  state.canvasPlanner.orderAlert = null;
  state.mapRoutes = { signature: "", loading: false, routesLoading: false, items: [], map: null, error: "" };
  showToast(`已交换 Day ${fromIndex + 1} 与 Day ${toIndex + 1}`);
  return true;
}

function undoCanvasDayOrder() {
  if (!state.canvasPlanner.lastDayOrder?.length) return;
  state.canvasPlanner.dayOrder = [...state.canvasPlanner.lastDayOrder];
  state.canvasPlanner.lastDayOrder = null;
  state.canvasPlanner.orderAlert = null;
  showToast("已撤销日期顺序调整");
}

function getDayContextText(day) {
  return [
    day.title,
    day.summary,
    day.transport,
    day.stay,
    ...(Array.isArray(day.schedule) ? day.schedule.flatMap((activity) => [activity.title, activity.detail]) : [])
  ].filter(Boolean).join(" ");
}

function getDayOrderSignals(day) {
  const title = String(day?.title || "").trim();
  const text = getDayContextText(day);
  const combined = `${title} ${text}`;

  return {
    isCheckout: /(退房|checkout|check-out|离店|退宿)/i.test(combined),
    isReturn: /(返程|回家|回程|送机|送站|离境|出境|结束行程)/.test(combined),
    isAirportLeave: /(前往机场|机场出发|机场快线|乘机返回|到机场|赶飞机)/.test(combined),
    isArrival: /(抵达|到达|入境|落地|飞往|高铁抵达|赶到|入住安顿|check-in)/i.test(combined),
    isStayNight: /(入住|住宿|酒店|民宿|过夜)/.test(combined) && !/(退房|checkout)/i.test(combined)
  };
}

function isEndingDay(day) {
  const signals = getDayOrderSignals(day);
  const title = String(day?.title || "").trim();
  return (
    signals.isCheckout ||
    signals.isReturn ||
    signals.isAirportLeave ||
    /^(午餐与退房|退房|返程|送机|送站|离开)/.test(title)
  );
}

function evaluateDayOrderLocally(days, previousOrder = state.canvasPlanner.lastDayOrder) {
  const issues = [];
  const suggestions = [];
  const lastIndex = days.length - 1;

  days.forEach((day, index) => {
    const signals = getDayOrderSignals(day);
    const label = `D${day.day}「${day.title || day.city}」`;
    const isLast = index === lastIndex;
    const isFirst = index === 0;
    const ending = isEndingDay(day);

    if (ending && !isLast) {
      issues.push(`${label} 含退房/返程/送机内容，不应放在行程中段或前段。`);
      suggestions.push(`建议把 ${label} 移回 D${days.length}（最后一天）。`);
    }

    if (isFirst && ending) {
      issues.push(`${label} 不应作为 D1，第一天通常是抵达、安顿或城市初访。`);
      suggestions.push("建议把抵达/安顿日放到第一天，把退房/返程日放到最后一天。");
    }

    if (/退房/.test(day.title || "") && !isLast) {
      issues.push(`${label} 标题含「退房」，通常应接近行程尾声。`);
    }

    if (isLast && signals.isArrival && !ending && days.length > 1) {
      issues.push(`${label} 仍像抵达/初到安排，放在最后一天会导致返程动线缺失。`);
    }

    if (!isFirst && signals.isArrival && !/(跨城|转场|前往|离开.*前往)/.test(getDayContextText(day))) {
      const prev = days[index - 1];
      if (prev && prev.city === day.city && !getDayOrderSignals(prev).isArrival) {
        issues.push(`${label} 再次出现「${day.city}」抵达安排，可能与 D${prev.day} 的游玩动线冲突。`);
      }
    }
  });

  if (Array.isArray(previousOrder) && previousOrder.length === days.length) {
    const prevLastId = previousOrder[previousOrder.length - 1];
    const movedLastDay = days.find((day) => day.id === prevLastId);
    const movedLastIndex = days.findIndex((day) => day.id === prevLastId);
    if (movedLastDay && isEndingDay(movedLastDay) && movedLastIndex !== lastIndex) {
      issues.push(`原行程最后一天的「${movedLastDay.title || movedLastDay.city}」被挪到了 D${movedLastDay.day}，这会打乱离开安排。`);
      suggestions.push("建议撤销调整，或把该日移回最后一天。");
    }

    const prevFirstId = previousOrder[0];
    const movedFirstDay = days.find((day) => day.id === prevFirstId);
    if (movedFirstDay && isEndingDay(movedFirstDay) && days[0]?.id === movedFirstDay.id) {
      issues.push(`「${movedFirstDay.title || movedFirstDay.city}」被挪到了 D1，与正常旅行节奏冲突。`);
    }
  }

  const uniqueIssues = [...new Set(issues)];
  const uniqueSuggestions = [...new Set(suggestions)];

  if (!uniqueIssues.length) {
    return {
      status: "ok",
      title: "顺序看起来合理",
      message: "当前日期顺序与抵达、游玩、退房/返程逻辑基本一致。",
      issues: [],
      suggestions: []
    };
  }

  return {
    status: "error",
    title: "日期顺序可能有问题",
    message: "这次调整可能破坏抵达、转场或返程逻辑，建议撤销或重新排列。",
    issues: uniqueIssues,
    suggestions: uniqueSuggestions
  };
}

function mergeOrderValidation(local, ai) {
  if (!ai || ai.status === "ok") return local;
  if (local.status === "ok") return ai;

  const issues = [...new Set([...(local.issues || []), ...(ai.issues || [])])];
  const suggestions = [...new Set([...(local.suggestions || []), ...(ai.suggestions || [])])];
  const status = local.status === "error" || ai.status === "error" ? "error" : "warn";

  return {
    status,
    title: local.status === "error" ? local.title : ai.title || local.title,
    message: local.issues?.length ? local.message : ai.message || local.message,
    issues,
    suggestions
  };
}

const CANVAS_DAY_LONG_PRESS_MS = 480;
const CANVAS_DAY_MOVE_CANCEL_PX = 10;

function clearCanvasDayDrag(root) {
  const drag = state.canvasPlanner.dayDrag;
  if (drag?.timer) clearTimeout(drag.timer);

  root.querySelectorAll("[data-day-order-card].is-day-dragging, [data-day-order-drop].is-drop-target, [data-day-order-card].is-long-press-armed")
    .forEach((element) => {
      element.classList.remove("is-day-dragging", "is-drop-target", "is-long-press-armed");
    });

  state.canvasPlanner.dayDrag = null;
}

function bindCanvasDayLongPress(root, render) {
  root.addEventListener("pointerdown", (event) => {
    if (!["canvas", "free", "ultimate"].includes(state.view) || state.activeCanvasDay || event.button !== 0) return;

    const card = event.target.closest("[data-day-order-card]");
    if (!card || event.target.closest(".canvas-core-item, .free-activity-card, .canvas-guide-grid, .canvas-guide-card, .guide-list, button, input, textarea, select, a")) return;

    clearCanvasDayDrag(root);

    const sourceDayId = card.dataset.dayOrderCard;
    const timer = window.setTimeout(() => {
      const drag = state.canvasPlanner.dayDrag;
      if (!drag || drag.sourceDayId !== sourceDayId) return;

      drag.active = true;
      card.classList.add("is-day-dragging");
      card.classList.remove("is-long-press-armed");
      if (card.setPointerCapture) card.setPointerCapture(drag.pointerId);
      showToast("拖动到目标日期后松开");
      if (navigator.vibrate) navigator.vibrate(15);
    }, CANVAS_DAY_LONG_PRESS_MS);

    card.classList.add("is-long-press-armed");
    state.canvasPlanner.dayDrag = {
      sourceDayId,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      timer,
      active: false,
      targetDayId: null
    };
  });

  root.addEventListener("pointermove", (event) => {
    const drag = state.canvasPlanner.dayDrag;
    if (!drag || event.pointerId !== drag.pointerId) return;

    if (!drag.active) {
      const moved = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
      if (moved > CANVAS_DAY_MOVE_CANCEL_PX) clearCanvasDayDrag(root);
      return;
    }

    event.preventDefault();

    root.querySelectorAll("[data-day-order-drop].is-drop-target").forEach((element) => {
      element.classList.remove("is-drop-target");
    });

    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-day-order-drop]");
    if (target && target.dataset.dayOrderDrop !== drag.sourceDayId) {
      target.classList.add("is-drop-target");
      drag.targetDayId = target.dataset.dayOrderDrop;
    } else {
      drag.targetDayId = null;
    }
  });

  const finishDayDrag = (event) => {
    const drag = state.canvasPlanner.dayDrag;
    if (!drag || event.pointerId !== drag.pointerId) return;

    if (drag.active && drag.targetDayId && drag.targetDayId !== drag.sourceDayId) {
      if (reorderCanvasDay(drag.sourceDayId, drag.targetDayId)) {
        void validateDayOrderAfterMove(render);
      } else {
        render();
      }
    }

    clearCanvasDayDrag(root);
  };

  root.addEventListener("pointerup", finishDayDrag);
  root.addEventListener("pointercancel", () => clearCanvasDayDrag(root));
  root.addEventListener("contextmenu", (event) => {
    if (event.target.closest("[data-day-order-card]")) event.preventDefault();
  });
}

async function validateDayOrderAfterMove(render) {
  const days = getPlanDays();
  const previousOrder = state.canvasPlanner.lastDayOrder;
  const local = evaluateDayOrderLocally(days, previousOrder);
  applyOrderValidation(local);
  state.canvasPlanner.orderValidating = true;
  render();

  try {
    const response = await fetch("/api/deepseek/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intent: "validate_day_order",
        dayOrder: days.map((day) => ({
          day: day.day,
          id: day.id,
          city: day.city,
          title: day.title,
          summary: day.summary,
          pace: day.pace,
          stay: day.stay,
          schedule: day.schedule
        })),
        context: buildAssistantContext()
      })
    });
    const data = await response.json().catch(() => ({}));
    const ai = normalizeOrderValidation(data.validation, data.message, local);
    applyOrderValidation(mergeOrderValidation(local, ai));
  } catch {
    applyOrderValidation(local);
  } finally {
    state.canvasPlanner.orderValidating = false;
    render();
  }
}

function normalizeOrderValidation(validation, message, fallback) {
  if (!validation || typeof validation !== "object") return fallback;
  const status = ["ok", "warn", "error"].includes(validation.status) ? validation.status : fallback.status;
  return {
    status,
    title: String(validation.title || fallback.title || "顺序检查结果").trim(),
    message: String(validation.message || message || fallback.message || "").trim(),
    issues: Array.isArray(validation.issues)
      ? validation.issues.map((item) => String(item).trim()).filter(Boolean).slice(0, 6)
      : [],
    suggestions: Array.isArray(validation.suggestions)
      ? validation.suggestions.map((item) => String(item).trim()).filter(Boolean).slice(0, 4)
      : []
  };
}

function applyOrderValidation(validation) {
  if (!validation || validation.status === "ok") {
    state.canvasPlanner.orderAlert = null;
    return;
  }

  state.canvasPlanner.orderAlert = validation;
  state.chat.push({
    role: "assistant",
    text: `${validation.title}\n${validation.message}${validation.issues?.length ? `\n\n问题：\n- ${validation.issues.join("\n- ")}` : ""}${validation.suggestions?.length ? `\n\n建议：\n- ${validation.suggestions.join("\n- ")}` : ""}`
  });
}

function getDayTemplate(cityId, dayIndex) {
  const templates = dayTemplates[cityId] || [
    {
      focus: "城市初访",
      pace: "适中",
      transport: "公共交通 + 步行",
      stay: "交通便利区域",
      image: "harbor",
      schedule: [
        { time: "09:30", title: "抵达与安顿", detail: "抵达后先处理行李和交通卡，确认当天动线。" },
        { time: "13:30", title: "核心街区探索", detail: "选择最有代表性的街区慢慢建立方向感。" },
        { time: "18:30", title: "晚餐与夜间散步", detail: "把晚餐安排在住宿附近，降低第一天疲劳。" }
      ]
    }
  ];
  return templates[dayIndex % templates.length];
}

function buildFallbackDayTitle(city, dayIndex, stops = [], template = {}) {
  const focus = String(template.focus || "").trim();
  if (focus && !isGenericDayTitle(focus)) return focus;

  const stopTitle = stops
    .map((stop) => cleanCanvasItemTitle(stop))
    .filter((stop) => stop && !isGenericMapPoint(stop))
    .slice(0, 2)
    .join(" · ");
  if (stopTitle) return stopTitle;

  const cityName = String(city?.city || "目的地").trim();
  return dayIndex === 0 ? `${cityName}抵达与街区探索` : `${cityName}自由安排`;
}

function isGenericDayTitle(value) {
  const title = String(value || "").trim();
  return /^(城市初访|核心街区探索|代表景点|核心景点|核心体验|当地美食|自由安排|第\d+天|目的地\s*\d*)$/.test(title);
}

function applyDayEdit(baseDay) {
  const edit = state.dayEdits[baseDay.id];
  const merged = edit ? {
    ...baseDay,
    ...edit,
    schedule: edit.schedule ? edit.schedule.map((activity) => ({ ...activity })) : baseDay.schedule
  } : baseDay;
  return {
    ...merged,
    schedule: sanitizeOriginDependentSchedule(merged.schedule, merged.day)
  };
}

function sanitizeOriginDependentSchedule(schedule, dayNumber) {
  const items = Array.isArray(schedule) ? schedule : [];
  if (Number(dayNumber) !== 1 || hasUserSpecifiedTripOrigin()) return items;
  return items.filter((activity, index) => index !== 0 || !isOriginDependentOpeningActivity(activity));
}

function isOriginDependentOpeningActivity(activity) {
  const title = String(activity?.title || "").trim();
  return /^(?:抵达与安顿|出发前往|出发至|从.+(?:出发|前往)|.+出发(?:前往|至|到)|乘坐(?:高铁|航班|飞机|火车|动车|大巴)|抵达(?:目的地|.+(?:站|机场)))/.test(title);
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

function openBooking(kind, cityId, context = {}) {
  ensureBooking(kind, cityId);
  state.activeBooking = {
    kind,
    cityId,
    dayId: String(context.dayId || ""),
    query: String(context.query || "").trim(),
    activityIndex: Number.isInteger(context.activityIndex) ? context.activityIndex : null
  };
}

async function fetchFlyAiOptions(active, render) {
  if (!active) return;
  const city = state.route.find((item) => item.id === active.cityId);
  if (!city) return;
  const key = getBookingSearchKey(active);
  const current = state.bookingSearches[key];
  if (current?.loading || current?.items?.length) return;

  state.bookingSearches[key] = {
    loading: true,
    items: [],
    error: "",
    systemMessage: ""
  };
  render();

  try {
    const day = getPlanDays().find((item) => item.id === active.dayId)
      || getPlanDays().find((item) => item.cityId === active.cityId);
    const date = getExplicitDateForDay(day?.day);
    const checkOutDate = active.kind === "hotels" && date ? addDaysToISODate(date, 1) : "";
    const response = await fetch("/api/flyai/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: active.kind,
        city: city.city,
        destination: city.city,
        origin: inferTripOriginCity(),
        query: getFlyAiSearchQuery(active, day),
        date,
        checkOutDate
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(sanitizeBookingDisplayText(data.error) || "实时查询失败。");

    state.bookingSearches[key] = {
      loading: false,
      items: normalizeFlyAiOptions(data.items),
      error: "",
      systemMessage: sanitizeBookingDisplayText(data.systemMessage)
    };
  } catch (error) {
    state.bookingSearches[key] = {
      loading: false,
      items: [],
      error: sanitizeBookingDisplayText(error.message) || "实时服务暂时不可用。",
      systemMessage: ""
    };
  } finally {
    render();
  }
}

function getBookingSearchKey(active) {
  return [active?.kind, active?.cityId, active?.dayId, active?.query].map((value) => String(value || "")).join("::");
}

function getBookingSearch(active) {
  return state.bookingSearches[getBookingSearchKey(active)] || null;
}

function getFlyAiSearchQuery(active, day) {
  if (active.kind === "hotels") {
    const stay = String(day?.stay || "").replace(/(?:附近|周边|酒店|民宿|客栈)/g, "").trim();
    if (stay && !/(待定|市区|中心区域|交通便利)/.test(stay)) return stay;
  }
  return String(active.query || "")
    .replace(/^(?:入住|游览|前往|抵达|早餐后前往|午餐[:：]?)/, "")
    .replace(/(?:酒店|游览)$/, "")
    .trim();
}

function getExplicitDateForDay(dayNumber) {
  let start = null;
  for (const message of state.chat) {
    if (message.role !== "user") continue;
    start = parseTripStartFromText(message.text) || start;
  }
  if (!start) return "";
  const date = new Date(start);
  date.setDate(date.getDate() + Math.max(0, Number(dayNumber || 1) - 1));
  return formatISODateLocal(date);
}

function addDaysToISODate(value, days) {
  const date = parseISODateLocal(value);
  if (!date) return "";
  date.setDate(date.getDate() + Number(days || 0));
  return formatISODateLocal(date);
}

function openFlyAiBooking(optionIndex) {
  const search = getBookingSearch(state.activeBooking);
  const option = search?.items?.[optionIndex];
  const url = String(option?.bookingUrl || "");
  if (!/^https:\/\//i.test(url)) {
    showToast("该方案暂未提供预订链接");
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

function applyBookingOption(optionIndex) {
  const active = state.activeBooking;
  const search = getBookingSearch(active);
  const option = search?.items?.[optionIndex];
  if (!active || !option) return null;

  const day = getPlanDays().find((item) => item.id === active.dayId)
    || getPlanDays().find((item) => item.cityId === active.cityId);
  if (!day) return null;

  const edit = ensureDayEdit(day.id);
  let activityIndex = Number.isInteger(active.activityIndex) ? active.activityIndex : -1;
  if (activityIndex < 0 || !edit.schedule[activityIndex]) {
    const queryIdentity = getFreeRecommendationIdentity(active.query);
    activityIndex = edit.schedule.findIndex((activity) =>
      getFreeRecommendationIdentity(activity.title) === queryIdentity
    );
  }

  const previous = activityIndex >= 0 ? edit.schedule[activityIndex] : null;
  const optionName = normalizeStayLabel(option.name, active.kind === "hotels" ? "酒店方案" : "可订方案");
  const detail = [option.meta, ...(option.tags || []), option.detail, option.price]
    .map((item) => String(item || "").trim())
    .filter(Boolean)
    .join(" · ");
  const nextTitle = active.kind === "hotels" ? `入住 ${optionName}` : optionName;
  const nextActivity = {
    ...(previous || { time: "待定" }),
    title: nextTitle,
    detail: detail || `${getBookingLabel(active.kind)}方案已选定。`,
    booking: {
      kind: active.kind,
      optionId: option.id,
      imageUrl: option.imageUrl || "",
      bookingUrl: option.bookingUrl || ""
    }
  };

  if (activityIndex >= 0) edit.schedule[activityIndex] = nextActivity;
  else edit.schedule.push(nextActivity);

  if (previous?.title && Array.isArray(edit.stops)) {
    const previousIdentity = getFreeRecommendationIdentity(previous.title);
    edit.stops = edit.stops.map((stop) =>
      getFreeRecommendationIdentity(stop) === previousIdentity ? optionName : stop
    );
  }
  if (active.kind === "hotels") edit.stay = optionName;

  const booking = ensureBooking(active.kind, active.cityId);
  booking.booked = true;
  booking.name = optionName;
  booking.detail = detail;
  booking.bookingUrl = option.bookingUrl || "";

  state.mapRoutes = { signature: "", loading: false, routesLoading: false, items: [], map: null, error: "" };
  state.activeBooking = null;
  state.chat.push({
    role: "assistant",
    text: `已将 D${day.day} 的“${previous?.title || active.query || getBookingLabel(active.kind)}”替换为“${optionName}”。`
  });
  return { kind: active.kind, day: day.day };
}

async function fetchAmapRoutes(render) {
  if (!state.route.length) return;

  const renderFn = typeof render === "function" ? render : requestHomeRender;
  const payload = buildAmapRoutePayload();
  const signature = JSON.stringify({
    days: payload.days.map((day) => ({
      id: day.id,
      city: day.city,
      stops: day.stops,
      schedule: day.schedule.map((item) => ({
        time: item.time,
        title: item.title,
        detail: item.detail
      }))
    }))
  });
  const draftMap = buildDraftAmapMap(payload.days);
  const unsupportedReason = getAmapUnsupportedReason(payload);
  const hadRealMap = shouldUseRealAmapMap(state.mapRoutes.map);

  if (
    state.mapRoutes.signature === signature
    && !state.mapRoutes.loading
    && !state.mapRoutes.routesLoading
    && (state.mapRoutes.map || state.mapRoutes.error)
  ) {
    return;
  }

  if (amapRoutesFetchPromise) return amapRoutesFetchPromise;

  amapRoutesFetchPromise = (async () => {
    const keepMap = () => state.mapRoutes.map || draftMap;

    try {
      if (!hadRealMap) {
    state.mapRoutes = {
      signature,
          loading: true,
          routesLoading: false,
          items: state.mapRoutes.items || [],
          map: keepMap(),
          error: ""
        };
        renderFn?.();
      } else if (!unsupportedReason) {
    state.mapRoutes = {
          ...state.mapRoutes,
      signature,
          routesLoading: true,
          error: ""
        };
        renderFn?.();
      }

      const markersResponse = await fetch("/api/amap/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, mapMode: "markers" })
      });
      const markersData = await markersResponse.json().catch(() => ({}));
      if (!markersResponse.ok) throw new Error(markersData.error || "高德点位解析失败。");

      const markersMap = markersData.map || null;
      const hasMarkerPoints = Array.isArray(markersMap?.points) && markersMap.points.length;
      const hasResolvedMarkerMap = shouldUseRealAmapMap(markersMap);
      const shouldLoadRoutes = Array.isArray(markersMap?.segments) && markersMap.segments.length > 0 && !unsupportedReason;

      state.mapRoutes = {
        signature,
        loading: false,
        routesLoading: shouldLoadRoutes,
        items: [],
        map: hasResolvedMarkerMap ? markersMap : draftMap,
        error: unsupportedReason || markersData.error || ""
      };
      renderFn?.();

      if (!shouldLoadRoutes) return;

      const fullResponse = await fetch("/api/amap/routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, mapMode: "full" })
      });
      const fullData = await fullResponse.json().catch(() => ({}));
      if (!fullResponse.ok) throw new Error(fullData.error || "高德路线查询失败。");

      const responseMap = fullData.map || null;
      const hasResolvedResponseMap = shouldUseRealAmapMap(responseMap);
      state.mapRoutes = {
        signature,
        loading: false,
        routesLoading: false,
        items: Array.isArray(fullData.routes) ? fullData.routes : [],
        map: hasResolvedResponseMap ? responseMap : (hasResolvedMarkerMap ? markersMap : draftMap),
        error: fullData.error || unsupportedReason || ""
      };
    } catch (error) {
      state.mapRoutes = {
        signature,
        loading: false,
        routesLoading: false,
        items: state.mapRoutes.items || [],
        map: keepMap(),
        error: error.message || "高德 MCP 暂时不可用。"
      };
    } finally {
      amapRoutesFetchPromise = null;
      renderFn?.();
    }
  })();

  return amapRoutesFetchPromise;
}

function hasMapPointCoverageForDays(map, days) {
  const requiredDays = (Array.isArray(days) ? days : [])
    .filter((day) => extractDraftMapPoiItems(day).length > 0)
    .map((day) => Number(day.day) || 1);
  if (!requiredDays.length) return true;

  const coveredDays = new Set(
    (Array.isArray(map?.points) ? map.points : [])
      .filter((point) => isValidGeoCoordinate(point.lng, point.lat))
      .map((point) => Number(point.day) || 1)
  );
  return requiredDays.every((day) => coveredDays.has(day));
}

function buildAmapRoutePayload() {
  return {
    route: state.route.map((city) => ({
      id: city.id,
      city: city.city,
      days: city.days,
      stops: city.stops
    })),
    days: getPlanDays().map((day) => ({
      id: day.id,
      day: day.day,
      city: day.city,
      cityId: day.cityId,
      transport: day.transport,
      stops: day.stops,
      schedule: day.schedule
    }))
  };
}

function buildDraftAmapMap(days) {
  const safeDays = Array.isArray(days) ? days : [];
  const rawPoints = safeDays.flatMap((day, dayIndex) => {
    const drawable = extractDraftMapPoiItems(day);
    const total = Math.max(1, drawable.length - 1);
    const rowY = safeDays.length > 1
      ? 18 + (dayIndex / Math.max(1, safeDays.length - 1)) * 64
      : 50;

    return drawable.map((item, index) => {
      const progress = drawable.length === 1 ? 0.5 : index / total;
      const wave = Math.sin(progress * Math.PI) * (dayIndex % 2 === 0 ? -8 : 8);
      return {
        id: `draft-d${Number(day.day) || dayIndex + 1}-p${item.sourceIndex}`,
        day: Number(day.day) || dayIndex + 1,
        city: String(day.city || ""),
        cityId: String(day.cityId || ""),
        order: index + 1,
        time: String(item.activity?.time || ""),
        name: item.name,
        detail: String(item.activity?.detail || ""),
        sourceType: item.sourceType,
        lng: 10 + progress * 80,
        lat: 100 - Math.max(10, Math.min(90, rowY + wave)),
        source: "行程草图"
      };
    });
  });
  const pointByName = new Map();
  rawPoints.forEach((point) => {
    const key = point.name.replace(/\s+/g, "");
    const current = pointByName.get(key);
    if (!current || (current.sourceType === "stop" && point.sourceType === "schedule")) {
      pointByName.set(key, point);
    }
  });
  const orderByDay = new Map();
  const points = [...pointByName.values()]
    .sort((a, b) => (a.day - b.day) || (a.order - b.order))
    .map((point) => {
      const order = (orderByDay.get(point.day) || 0) + 1;
      orderByDay.set(point.day, order);
      return { ...point, order };
    });
  const segments = [];
  groupMapPointsByDay(points).forEach((dayPoints, day) => {
    const sorted = [...dayPoints].sort((a, b) => a.order - b.order);
    for (let index = 0; index < sorted.length - 1; index += 1) {
      const from = sorted[index];
      const to = sorted[index + 1];
      segments.push({
        day: Number(day),
        from: from.name,
        to: to.name,
        status: "draft",
        path: [{ lng: from.lng, lat: from.lat }, { lng: to.lng, lat: to.lat }]
      });
    }
  });

  return {
    provider: "行程草图",
    renderMode: "draft",
    points,
    segments,
    bounds: createClientMapBounds(points, segments)
  };
}

function extractDraftMapPoiItems(day) {
  const schedule = Array.isArray(day?.schedule) ? day.schedule : [];
  const stops = Array.isArray(day?.stops) ? day.stops : [];
  const items = [];
  schedule.forEach((activity, sourceIndex) => {
    extractDraftMapPoiNames(activity?.title, day?.city).forEach((name, subIndex) => {
      items.push({ activity, sourceIndex: `${sourceIndex}-${subIndex}`, sourceType: "schedule", name });
    });
  });
  stops.forEach((stop, stopIndex) => {
    extractDraftMapPoiNames(stop, day?.city).forEach((name, subIndex) => {
      items.push({ activity: {}, sourceIndex: `s${stopIndex}-${subIndex}`, sourceType: "stop", name });
    });
  });
  const seen = new Set();
  return items.filter((item) => {
    const key = item.name.replace(/\s+/g, "");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 10);
}

function extractNarrativeMapPointName(value) {
  const parts = String(value || "")
    .split(
      /(?:返回(?:到)?(?:市区|城区|主城区|市中心)?|回到(?:市区|城区|主城区|市中心)?|前往|出发前往|入住|住在|住进|下榻|浅住|夜宿|宿在|落脚|安顿|回酒店|回民宿|回住处|赶往|去往|转往|再去|再到|到达后|抵达后)/
    )
    .map((item) => item.trim())
    .filter(Boolean);
  return parts.at(-1) || String(value || "").trim();
}

function stripMapPointContext(value) {
  return String(value || "")
    .replace(/^(?:市区|城区|主城区|市中心|核心城区)\s*/, "")
    .replace(/(?:酒店|民宿|客栈|旅馆|度假村|住宿区|住宿区域|酒店区|酒店片区|住宿片区|住处|落脚点|一带|附近|周边)+$/g, "")
    .trim();
}

function extractDraftMapPoiNames(value, city = "") {
  return String(value || "")
    .replace(/[（(].*?[）)]/g, "")
    .split(/[、,，&＋+\/]|(?:与|及|或)/)
    .map((part) => {
      let name = cleanMapPointName(part)
        .replace(/(?:深度游|半日游|一日游|环湖骑行|环湖|骑行|登顶|游船|乘船|夜景|拍照|漫步|参观|游览|打卡|休整)$/g, "")
        .trim();
      name = stripMapPointContext(extractNarrativeMapPointName(name));
      if (/喀什/.test(`${city} ${name}`)) {
        if (/开城仪式/.test(name)) name = "喀什古城东门";
        else if (/古城街巷|古城漫步|古城游览|古城内/.test(name)) name = "喀什古城";
      }
      if (/(千岛湖|淳安)/.test(`${city} ${name}`)) {
        if (/中心湖区/.test(name)) name = "千岛湖中心湖区旅游码头";
        else if (/东南湖区/.test(name)) name = "千岛湖东南湖区旅游码头";
        else if (/梅峰/.test(name)) name = "梅峰岛";
        else if (/天屿/.test(name)) name = "天屿山观景台";
      }
      return name;
    })
    .filter((name) => name && name.replace(/\s+/g, "") !== String(city || "").replace(/\s+/g, ""))
    .filter((name) => !isGenericMapPoint(name) && isConcreteDraftMapPoiName(name));
}

function isConcreteDraftMapPoiName(name) {
  return /(景区|湖区|码头|游客中心|岛|山|峰|谷|沟|湾|海|滩|港|桥|塔|宫|庙|寺|馆|博物馆|美术馆|公园|广场|古镇|古城|街|巷|路|观景台|乐园|故居|书院|教堂|大楼|大厦|步行街|半岛|沙滩)$/.test(name)
    || /^(豫园|外滩|西湖|故宫|长城)$/.test(name)
    || (name.length >= 3 && !/(环湖|游船|骑行|漫步|体验|观景|购物|逛街|打卡|自由活动|美食|餐饮|酒店|住宿|返程|浅住|夜宿|住在|下榻|落脚|安顿)/.test(name));
}

function groupMapPointsByDay(points) {
  const grouped = new Map();
  points.forEach((point) => {
    const key = Number(point.day) || 1;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(point);
  });
  return grouped;
}

function createClientMapBounds(points, segments) {
  const all = [
    ...(points || []),
    ...(segments || []).flatMap((segment) => segment.path || [])
  ].filter((point) => Number.isFinite(Number(point.lng)) && Number.isFinite(Number(point.lat)));
  if (!all.length) return null;
  const lngs = all.map((point) => Number(point.lng));
  const lats = all.map((point) => Number(point.lat));
  return {
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats)
  };
}

function getAmapUnsupportedReason(payload) {
  const text = `${payload.route.map((item) => item.city).join(" ")} ${payload.days.map((day) => `${day.city} ${day.transport}`).join(" ")}`;
  if (isAmapUnsupportedTripText(text)) {
    return "当前行程包含海外目的地，高德 MCP 对海外 POI 解析不稳定，已停止自动查询以避免错误路线。";
  }
  return "";
}

function isAmapUnsupportedTripText(text) {
  return /(日本|东京|大阪|京都|北海道|冲绳|韩国|济州|首尔|釜山|泰国|曼谷|清迈|普吉|新加坡|澳洲|澳大利亚|悉尼|墨尔本|欧洲|美国|英国|法国|意大利)/.test(text);
}

function cleanMapPointName(value) {
  return String(value || "")
    .replace(/^\d+[.、]\s*/, "")
    .replace(/^(抵达|到达|前往|出发前往|返回|入住|游览|参观|打卡|安排|推荐|午餐[:：]?|晚餐[:：]?|早餐[:：]?)/, "")
    .replace(/[（(].*?[）)]/g, "")
    .replace(/(深度游|半日游|一日游|骑行|环湖|观景|拍照|漫步|休整|自由活动)$/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isGenericMapPoint(name) {
  return /^(自由活动|新的安排|酒店休息|返程|无|待定)$/.test(name)
    || /^(核心景点|代表景点|代表体验|核心体验|当地美食|特色美食|美食体验|市区酒店|交通便利区域|住宿落点|与安顿|安顿|核心街区探索|夜间散步)$/.test(name)
    || /(安顿|散步|街区探索|酒店周边|自由逛|简单逛逛|浅住|夜宿|住在|下榻|落脚)$/.test(name)
    || /(午餐|晚餐|早餐|小吃|咖啡|下午茶|鱼头|鱼宴|餐厅|饭店|酒楼|农家|土菜|美食街|夜市)$/.test(name)
    || /(当地美食|特色餐饮|街区漫步|自由探索|酒店办理|办理入住|休息调整|整理行李|品尝|用餐|鱼头|鱼宴|餐厅|饭店|酒楼|农家|土菜|美食街|夜市)/.test(name)
    || /(入住|酒店|民宿|旅馆|Hotel)$/i.test(name);
}

function normalizeFlyAiOptions(items) {
  return (Array.isArray(items) ? items : [])
    .map((item) => ({
      id: String(item.id || item.name || Math.random()),
      name: sanitizeBookingDisplayText(item.name) || "可订方案",
      meta: sanitizeBookingDisplayText(item.meta) || "实时结果",
      tags: Array.isArray(item.tags) ? item.tags.map(sanitizeBookingDisplayText).filter(Boolean).slice(0, 5) : [],
      detail: sanitizeBookingDisplayText(item.detail),
      price: String(item.price || "实时查价"),
      imageUrl: String(item.imageUrl || ""),
      bookingUrl: String(item.bookingUrl || "")
    }))
    .slice(0, 8);
}

function sanitizeBookingDisplayText(value) {
  return sanitizeLooseDisplayText(value)
    .replace(/飞猪|FlyAI|fly\.ai|Fliggy/gi, "")
    .replace(/^[\s·|｜:：-]+|[\s·|｜:：-]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function buildBookingSearchContext(cityId) {
  return {
    ...buildAssistantContext(),
    days: getPlanDays().map((day) => ({
      id: day.id,
      cityId: day.cityId,
      day: day.day,
      city: day.city,
      title: day.title,
      pace: day.pace,
      transport: day.transport,
      stay: day.stay,
      stops: day.stops,
      summary: day.summary,
      schedule: day.schedule
    })),
    activeBooking: {
      kind: "hotels",
      cityId
    }
  };
}

function bookService(kind, cityId) {
  const booking = ensureBooking(kind, cityId);
  const city = state.route.find((item) => item.id === cityId);
  if (!booking || !city) return;
  booking.booked = true;
  state.activeBooking = { kind, cityId };
  state.chat.push({
    role: "assistant",
    text: `已为${city.city}标记${getBookingLabel(kind)}预订：${booking.name}。`
  });
}

function addHotelToRoadbook(cityId, hotelId) {
  const city = state.route.find((item) => item.id === cityId);
  if (!city) return;

  const booking = ensureBooking("hotels", cityId);
  const option = getHotelOptionsForCity(city, booking).find((item) => item.id === hotelId);
  if (!option) return;
  const optionName = normalizeStayLabel(option.name, "酒店方案");

  const cityDays = getPlanDays().filter((day) => day.cityId === cityId);
  const targetDay = cityDays[cityDays.length - 1];
  if (!targetDay) return;

  const edit = ensureDayEdit(targetDay.id);
  edit.stay = optionName;
  edit.schedule.push({
    time: "20:30",
    title: `入住 ${optionName}`,
    detail: [option.meta, option.tags.join("；"), option.detail].filter(Boolean).join("。")
  });

  booking.booked = true;
  booking.name = optionName;
  booking.detail = `${option.detail}${option.price ? ` ${option.price}` : ""}`;
  booking.bookingUrl = option.bookingUrl || "";
  state.activeBooking = { kind: "hotels", cityId };
  state.chat.push({
    role: "assistant",
    text: `已把“${optionName}”加入 ${targetDay.city} D${targetDay.day} 路书，并更新酒店订单状态。`
  });
  showToast("酒店已加入路书");
}

function ensureBooking(kind, cityId) {
  if (!state.bookings[kind]) state.bookings[kind] = {};
  if (state.bookings[kind][cityId]) return state.bookings[kind][cityId];
  const city = state.route.find((item) => item.id === cityId);
  const cityName = city?.city || "目的地";
  const label = getBookingLabel(kind);
  const fallback = bookingSeed[kind]?.[cityId];
  state.bookings[kind][cityId] = fallback
    ? { ...fallback }
    : {
        booked: false,
        name: `${cityName}${label}方案`,
        action: kind === "trains" ? "订火车票" : `订${cityName}${label}`,
        detail: `根据${cityName}行程动线选择合适的${label}。`
      };
  return state.bookings[kind][cityId];
}

function applyPreset(preset) {
  if (preset === "relax") {
    state.density = Math.max(3, state.density - 1);
    state.chat.push({ role: "assistant", text: "已降低景点密度，保留更多机动时间。" });
    return;
  }

  if (preset === "buffer") {
    state.density = Math.max(3, state.density - 1);
    state.chat.push({ role: "assistant", text: "已增加行程留白，减少连续赶路和高强度安排。" });
  }
}

function openPlanForm(dayId) {
  const day = getPlanDays().find((item) => item.id === dayId);
  if (!day) return;

  state.planForm = {
    dayId: day.id,
    day: day.day,
    city: day.city,
    category: "体验",
    title: "",
    remark: "",
    submitting: false
  };
}

async function submitPlanForm(render) {
  if (!state.planForm || state.planForm.submitting) return;

  const plan = {
    category: state.planForm.category,
    title: String(state.planForm.title || "").trim(),
    remark: String(state.planForm.remark || "").trim()
  };

  if (!plan.title) {
    showToast("请填写计划标题");
    return;
  }

  const day = getPlanDays().find((item) => item.id === state.planForm.dayId);
  if (!day) return;

  state.planForm.submitting = true;
  render();

  try {
    const response = await fetch("/api/deepseek/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        intent: "insert_plan",
        plan,
        targetDay: {
          day: day.day,
          city: day.city,
          title: day.title,
          pace: day.pace,
          transport: day.transport,
          stay: day.stay,
          summary: day.summary,
          schedule: day.schedule
        },
        context: buildAssistantContext()
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "AI 排期失败。");

    const applied = data.insert
      ? applyPlanInsert(data.insert, plan)
      : fallbackPlanInsert(day, plan);

    if (!applied) throw new Error("未能插入到当天行程。");

    state.chat.push({
      role: "assistant",
      text: data.message || `已将「${plan.title}」智能插入 D${day.day} ${day.city} 行程。`
    });
    state.planForm = null;
    showToast("计划已插入行程");
  } catch (error) {
    const applied = fallbackPlanInsert(day, plan);
    if (applied) {
      state.chat.push({
        role: "assistant",
        text: `已将「${plan.title}」加入 D${day.day} ${day.city} 行程（本地智能排期）。`
      });
      state.planForm = null;
      showToast("计划已插入行程");
    } else {
      state.planForm.submitting = false;
      showToast(error.message || "插入失败");
    }
  } finally {
    render();
  }
}

function applyPlanInsert(insert, planFallback) {
  const dayNum = Number(insert?.day);
  const day = getPlanDays().find((item) => item.day === dayNum);
  if (!day) return false;

  const edit = ensureDayEdit(day.id);
  const schedule = Array.isArray(edit.schedule) ? edit.schedule : [];
  let index = Number(insert?.index);
  if (!Number.isFinite(index)) index = inferPlanInsertIndex(schedule, planFallback.category);
  index = Math.min(Math.max(0, index), schedule.length);

  const activity = {
    time: String(insert?.activity?.time || inferPlanInsertTime(schedule, index, planFallback.category)).trim(),
    title: String(insert?.activity?.title || planFallback.title).trim(),
    detail: String(insert?.activity?.detail || planFallback.remark || buildPlanDetail(planFallback)).trim()
  };

  schedule.splice(index, 0, activity);
  edit.schedule = schedule;
  return true;
}

function fallbackPlanInsert(day, plan) {
  const edit = ensureDayEdit(day.id);
  const schedule = Array.isArray(edit.schedule) ? edit.schedule : [];
  const index = inferPlanInsertIndex(schedule, plan.category);
  schedule.splice(index, 0, {
    time: inferPlanInsertTime(schedule, index, plan.category),
    title: plan.title,
    detail: plan.remark || buildPlanDetail(plan)
  });
  edit.schedule = schedule;
  return true;
}

function inferPlanInsertIndex(schedule, category) {
  const length = schedule.length;
  if (category === "交通") return 0;
  if (category === "住宿") return length;
  if (category === "美食") return Math.min(1, length);
  if (category === "景点") return Math.min(1, length);
  if (length <= 1) return length;
  return Math.min(2, length);
}

function inferPlanInsertTime(schedule, index, category) {
  const defaults = {
    交通: "09:00",
    景点: "10:30",
    美食: "12:30",
    体验: "15:00",
    购物: "16:00",
    住宿: "20:00",
    其他: "14:00"
  };

  if (index > 0 && schedule[index - 1]?.time) {
    return addMinutes(schedule[index - 1].time, category === "美食" ? 120 : 90);
  }
  if (index < schedule.length && schedule[index]?.time) {
    return addMinutes(schedule[index].time, category === "美食" ? -120 : -90);
  }
  return defaults[category] || "14:00";
}

function buildPlanDetail(plan) {
  return `用户添加的${plan.category}计划：${plan.title}。`;
}

function addNote(target = "当前行程", text = "", quote = "") {
  state.notes.push({
    id: `note-${Date.now()}`,
    target,
    size: "medium",
    text,
    quote
  });
}

async function submitSelectionInstruction(value, render) {
  const instruction = String(value || "").trim();
  const quote = state.selection?.text;
  if (!instruction || !quote || state.isChatLoading) return;

  state.selection = null;
  await sendChatMessage(
    `请根据我选中的这段行程内容做定向修改。\n\n选中内容：${quote}\n\n修改/提问：${instruction}\n\n要求：只调整与选中内容直接相关的日期、段落或安排；保留其他行程结构不变，并在回复里说明你改了哪里。`,
    render
  );
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
          stops: [...day.stops],
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

function removeAttractionFromDay(dayId, name) {
  const day = getPlanDays().find((item) => item.id === dayId);
  if (!day) return;
  const edit = ensureDayEdit(dayId);
  edit.stops = (edit.stops || day.stops).filter((stop) => stop !== name);
  edit.schedule = edit.schedule.filter((activity) => activity.title !== name);
}

function moveCanvasActivity(sourceDayId, sourceIndex, targetDayId) {
  if (!sourceDayId || !targetDayId || !Number.isInteger(sourceIndex)) return false;
  const sourceDay = getPlanDays().find((day) => day.id === sourceDayId);
  const targetDay = getPlanDays().find((day) => day.id === targetDayId);
  if (!sourceDay || !targetDay) return false;

  const sourceEdit = ensureDayEdit(sourceDayId);
  const targetEdit = sourceDayId === targetDayId ? sourceEdit : ensureDayEdit(targetDayId);
  const [moved] = sourceEdit.schedule.splice(sourceIndex, 1);
  if (!moved) return false;

  targetEdit.schedule.push(moved);
  const movedName = cleanCanvasItemTitle(moved.title);
  if (movedName) {
    sourceEdit.stops = (sourceEdit.stops || sourceDay.stops).filter((stop) => stop !== movedName && stop !== moved.title);
    const targetStops = targetEdit.stops || targetDay.stops || [];
    targetEdit.stops = targetStops.includes(movedName) ? targetStops : [...targetStops, movedName];
  }

  state.mapRoutes = { signature: "", loading: false, routesLoading: false, items: [], map: null, error: "" };
  showToast(`已移动到 D${targetDay.day}`);
  return true;
}

function moveFreeActivity(sourceDayId, sourceIndex, targetDayId, targetIndex = null) {
  if (!sourceDayId || !targetDayId || !Number.isInteger(sourceIndex)) return false;
  const days = getPlanDays();
  const sourceDay = days.find((day) => day.id === sourceDayId);
  const targetDay = days.find((day) => day.id === targetDayId);
  if (!sourceDay || !targetDay) return false;

  const sourceEdit = ensureDayEdit(sourceDayId);
  const targetEdit = sourceDayId === targetDayId ? sourceEdit : ensureDayEdit(targetDayId);
  if (!sourceEdit.schedule[sourceIndex]) return false;

  if (sourceDayId === targetDayId && Number.isInteger(targetIndex)) {
    if (sourceIndex === targetIndex) return false;
    const [moved] = sourceEdit.schedule.splice(sourceIndex, 1);
    const insertIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
    sourceEdit.schedule.splice(Math.max(0, insertIndex), 0, moved);
    showToast(`已调整 D${sourceDay.day} 内的游玩顺序`);
  } else {
    const [moved] = sourceEdit.schedule.splice(sourceIndex, 1);
    const insertIndex = Number.isInteger(targetIndex)
      ? Math.max(0, Math.min(targetIndex, targetEdit.schedule.length))
      : targetEdit.schedule.length;
    targetEdit.schedule.splice(insertIndex, 0, moved);

    const movedName = cleanCanvasItemTitle(moved.title);
    if (sourceDayId !== targetDayId && movedName) {
      const stillInSource = sourceEdit.schedule.some((activity) => cleanCanvasItemTitle(activity.title) === movedName);
      if (!stillInSource) {
        sourceEdit.stops = (sourceEdit.stops || sourceDay.stops || [])
          .filter((stop) => stop !== movedName && stop !== moved.title);
      }
      const targetStops = targetEdit.stops || targetDay.stops || [];
      if (!targetStops.includes(movedName)) targetEdit.stops = [...targetStops, movedName];
    }
    showToast(`已移动到 D${targetDay.day}`);
  }

  state.mapRoutes = { signature: "", loading: false, routesLoading: false, items: [], map: null, error: "" };
  return true;
}

function parseJsonOrNull(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function normalizeAssistantDisplayText(value) {
  const text = String(value || "").trim();
  if (!text) return "";

  const parsed = parseJsonOrNull(text);
  if (parsed && typeof parsed === "object") {
    return normalizeAssistantDisplayText(parsed.reply || parsed.message || "");
  }

  const objectMatch = text.match(/^\s*\{[\s\S]*\"(?:reply|message)\"\s*:/);
  if (objectMatch) {
    const parsedObject = parseJsonOrNull(text.match(/\{[\s\S]*\}/)?.[0] || "");
    if (parsedObject && typeof parsedObject === "object") {
      return normalizeAssistantDisplayText(parsedObject.reply || parsedObject.message || "");
    }
  }

  return text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .replace(/\n?\s*"updates"\s*:\s*\{[\s\S]*$/i, "")
    .replace(/\n?\s*,?\s*"insert"\s*:\s*\{[\s\S]*$/i, "")
    .replace(/\n?\s*,?\s*"validation"\s*:\s*\{[\s\S]*$/i, "")
    .trim();
}

async function sendChatMessage(value, render) {
  const text = value.trim();
  if (!text || state.isChatLoading) return;
  const isEnteringWorkspace = !hasEnteredTripWorkspace() && !isInspirationTrip();

  state.chat.push({ role: "user", text });
  if (isConcreteTripRequest(text)) {
    state.inspiration.exploring = false;
    state.inspiration.anchor = "";
    state.inspiration.recommendedDestinations = [];
  } else if (shouldEnterInspirationFromUserText(text)) {
    state.inspiration.exploring = true;
    state.inspiration.recommendedDestinations = [];
  }
  state.isChatLoading = true;
  if (isEnteringWorkspace) {
    state.workspaceEntering = true;
    const commitWorkspaceEntry = () => {
      render();
      state.workspaceEntering = false;
    };
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (!reduceMotion && typeof document.startViewTransition === "function") {
      document.startViewTransition(commitWorkspaceEntry);
    } else {
      commitWorkspaceEntry();
    }
  } else {
    render();
  }

  let appliedCount = 0;
  try {
    const response = await fetch("/api/deepseek/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        chat: state.chat,
        context: buildAssistantContext()
      })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "DeepSeek 请求失败。");
    const assistantReply = normalizeAssistantDisplayText(data.message || "");
    const isClarifying = isAssistantClarifyingTripDetails(assistantReply);
    appliedCount = isClarifying ? 0 : applyAssistantUpdates(data.updates, text, assistantReply);
    if (!isClarifying && getPlanDays().length === 0 && isConcreteTripRequest(text)) {
      const fallbackApplied = ensureTripPlanForConcreteRequest(text, assistantReply);
      if (fallbackApplied > 0) {
        appliedCount = fallbackApplied;
        if (!hasIncomingTripPlan(data.updates, data.updates?.days || [])) {
          showToast("AI 未返回完整路书，已根据你的请求生成基础行程");
        }
      }
    }
    const assistantText = appliedCount > 0 && !isClarifying
      ? `${assistantReply || "已根据旅行攻略专家建议更新行程。"}\n\n已生成并展示 ${appliedCount} 天行程。`
      : assistantReply || "DeepSeek 暂时没有返回有效内容。";
    state.chat.push({
      role: "assistant",
      text: assistantText
    });
    if (isAssistantClarifyingTripDetails(assistantText)) {
      state.inspiration.exploring = true;
      syncInspirationPicks(text, state.tripGuide, assistantText);
    } else if (appliedCount > 0 && !isInspirationTrip()) {
      state.inspiration.exploring = false;
    } else if (!appliedCount && isInspirationTrip()) {
      syncInspirationPicks(text, state.tripGuide, assistantText);
    }
  } catch (error) {
    if (isConcreteTripRequest(text)) {
      const recovered = ensureTripPlanForConcreteRequest(text, "");
      if (recovered > 0) appliedCount = recovered;
    }
    state.chat.push({
      role: "assistant",
      text: appliedCount > 0
        ? "AI 服务暂时不稳定，已先根据你的请求生成基础行程。"
        : error.message || "DeepSeek 暂时不可用，请稍后再试。"
    });
  } finally {
    state.isChatLoading = false;
    const latestAssistantText = getLatestAssistantChatText();
    const hasGeneratedPlan = appliedCount > 0 || getPlanDays().length > 0;
    const shouldShowInspiration = !hasGeneratedPlan
      && !isConcreteTripRequest(text)
      && !shouldBypassInspirationFlow(text, latestAssistantText)
      && (shouldEnterInspirationFromUserText(text) || hasInspirationRecommendations(latestAssistantText, state.tripGuide));
    if (
      getPlanDays().length === 0
      && isConcreteTripRequest(text)
      && !isAssistantClarifyingTripDetails(latestAssistantText)
    ) {
      const recovered = ensureTripPlanForConcreteRequest(text, latestAssistantText);
      if (recovered > 0) appliedCount = recovered;
    }
    if (shouldShowInspiration) {
      state.inspiration.exploring = true;
      state.inspiration.anchor = "";
      syncInspirationPicks(text, state.tripGuide, latestAssistantText);
    } else if (hasConfirmedTripPlan()
      || (appliedCount > 0 && hasAppliedItineraryEdits())
      || getPlanDays().length > 0
      || shouldBypassInspirationFlow(text, latestAssistantText)) {
      state.inspiration.exploring = false;
      state.inspiration.anchor = "";
      state.inspiration.picks = [];
      if (getPlanDays().length > 0) state.view = "canvas";
    } else if (!hasConfirmedTripPlan() && !shouldBypassInspirationFlow(text, latestAssistantText)) {
      state.inspiration.exploring = true;
      syncInspirationPicks(text, state.tripGuide, latestAssistantText);
    }
    render();
    if (getPlanDays().length > 0) prefetchTripMapAssets(render);
  }
}

function clearProvisionalTripPlan() {
  state.route = [];
  state.dayEdits = {};
  state.tripGuide = null;
  state.mapRoutes = { signature: "", loading: false, routesLoading: false, items: [], map: null, error: "" };
  state.canvasPlanner.dayOrder = null;
  state.activeCanvasDay = null;
  state.freePoiDetail = null;
  state.calendar.monthOffset = 0;
  state.calendar.selectedDate = "";
  state.calendar.tripStartDate = "";
  state.ultimateActiveDay = null;
  state.ultimateExpandedDays = new Set();
}

function applyAssistantUpdates(updates, userText = "", assistantText = "") {
  const updateDays = Array.isArray(updates?.days) ? updates.days : [];

  if (isAssistantClarifyingTripDetails(assistantText)) {
    if (!hasUserSpecifiedTripDays()) {
      clearProvisionalTripPlan();
    }
    if (updates?.guide) {
      state.tripGuide = mergeTripGuide(state.tripGuide, updates.guide);
    }
    state.inspiration.exploring = true;
    syncInspirationPicks(userText, state.tripGuide, assistantText);
    return 0;
  }

  if (needsTripPlanningClarification() && !hasUserSpecifiedTripDays() && !hasIncomingTripPlan(updates, updateDays)) {
    clearProvisionalTripPlan();
    if (updates?.guide) {
      state.tripGuide = mergeTripGuide(state.tripGuide, updates.guide);
    }
    state.inspiration.exploring = true;
    syncInspirationPicks(userText, state.tripGuide, assistantText);
    return 0;
  }

  const mode = resolveAssistantUpdateMode(updates, updateDays, userText, assistantText);
  let applied = 0;

  if (mode === "none") {
    if (updates?.guide) {
      state.tripGuide = mergeTripGuide(state.tripGuide, updates.guide);
    }
    if (!isConcreteTripRequest(userText)) {
      state.inspiration.exploring = true;
      syncInspirationPicks(userText, state.tripGuide, assistantText);
    }
    return 0;
  }

  if (mode === "replace") {
    replaceRouteFromUpdates(updates);
    if (!hasConfirmedTripPlan() && !hasIncomingTripPlan(updates, updateDays)) {
      state.inspiration.exploring = true;
      if (updates?.guide) {
        state.tripGuide = mergeTripGuide(null, updates.guide);
      }
      syncInspirationPicks(userText, state.tripGuide, assistantText);
    } else if (getPlanDays().length > 0) {
      state.inspiration.exploring = false;
      state.inspiration.anchor = "";
    }
  }

  const days = getPlanDays();
  updateDays.forEach((update) => {
    const day = days.find((item) => item.day === Number(update.day));
    if (!day) return;

    const edit = ensureDayEdit(day.id);
    ["title", "summary", "pace", "transport", "stay"].forEach((field) => {
      if (typeof update[field] === "string" && update[field].trim()) {
        edit[field] = update[field].trim();
      }
    });

    if (Array.isArray(update.schedule) && update.schedule.length) {
      edit.schedule = update.schedule.map((item) => ({
        time: String(item.time || "待定").trim(),
        title: String(item.title || "新的安排").trim(),
        detail: String(item.detail || "根据旅行攻略专家建议补充。").trim()
      }));
    }

    if (Array.isArray(update.stops) && update.stops.length) {
      edit.stops = update.stops.map((stop) => String(stop).trim()).filter(Boolean);
    }

    applied += 1;
  });

  if (applied) {
    ensureDailyStays();
    state.inspiration.exploring = false;
    state.inspiration.anchor = "";
    state.view = "canvas";
    state.mapRoutes = { signature: "", loading: false, routesLoading: false, items: [], map: state.mapRoutes.map, error: "" };
    prefetchTripMapAssets();
  } else if (mode === "replace" && getPlanDays().length > 0) {
    state.inspiration.exploring = false;
    state.inspiration.anchor = "";
    state.view = "canvas";
    prefetchTripMapAssets();
  }
  if (updates?.guide) {
    state.tripGuide = mergeTripGuide(mode === "replace" ? null : state.tripGuide, updates.guide);
    if (!applied) showToast("已更新旅行文档");
  }
  if (isInspirationTrip()) {
    syncInspirationPicks(userText, updates?.guide || state.tripGuide, assistantText);
  }
  if (applied) showToast(`已更新 ${applied} 天行程`);
  return applied;
}

function ensureDailyStays() {
  const days = getPlanDays();
  days.forEach((day, index) => {
    if (isReturnOnlyDay(day, index, days.length)) return;

    const edit = ensureDayEdit(day.id);
    const stay = normalizeStayLabel(edit.stay || day.stay);
    const fallbackStay = normalizeStayLabel(inferStayFromDay(day), "交通便利区域酒店");
    edit.stay = stay || fallbackStay;

    const schedule = Array.isArray(edit.schedule) ? edit.schedule : [];
    const hasStayActivity = schedule.some((activity) => isStayText(`${activity.title || ""} ${activity.detail || ""}`));
    if (!hasStayActivity) {
      const stayLabel = normalizeStayLabel(edit.stay, fallbackStay) || fallbackStay;
      schedule.push({
        time: "20:00",
        title: `入住 ${stayLabel}`,
        detail: `选择${stayLabel}作为当晚住宿落点，方便第二天继续衔接行程。`
      });
      edit.schedule = schedule;
    }
  });
}

function isReturnOnlyDay(day, index, totalDays) {
  if (index !== totalDays - 1) return false;
  const text = [
    day.title,
    day.summary,
    day.transport,
    day.stay,
    ...(Array.isArray(day.schedule) ? day.schedule.flatMap((activity) => [activity.title, activity.detail]) : [])
  ].filter(Boolean).join(" ");
  return /(返程|回家|离开|机场|高铁站|火车站|送机|送站|返回出发地)/.test(text)
    && !isStayText(text);
}

function isStayText(text) {
  return /(入住|住宿|酒店|民宿|客栈|旅馆|过夜|住在|住到|Hotel|check[- ]?in|stay)/i.test(text || "");
}

function inferStayFromDay(day) {
  const explicit = String(day.stay || "").trim();
  if (explicit) return explicit;
  const city = String(day.city || "目的地").trim();
  const stop = (Array.isArray(day.stops) ? day.stops : []).find((item) => String(item || "").trim());
  const place = stop ? String(stop).trim() : city;
  if (/(区|镇|商圈|市区|古城|街区|中心)/.test(place)) return `${place}附近酒店`;
  return `${city}交通便利区域酒店`;
}

function resolveAssistantUpdateMode(updates, updateDays = [], userText = "", assistantText = "") {
  const hasIncomingRoute = Array.isArray(updates?.route) && updates.route.length > 0;
  const hasIncomingDays = updateDays.length > 0;
  const exploring = state.inspiration.exploring && !hasConfirmedTripPlan();
  const hasModelDestinations = Boolean(
    updates?.guide?.inspiration?.destinations?.length
    || extractCatalogDestinationsFromAssistantText(assistantText).length
  );

  const concreteTrip = isConcreteTripRequest(userText);
  const incomingPlan = hasIncomingTripPlan(updates, updateDays);
  const claimingItinerary = isAssistantClaimingGeneratedItinerary(assistantText);

  if (updates?.mode === "none" && !incomingPlan && !(concreteTrip && claimingItinerary)) return "none";
  if (concreteTrip && claimingItinerary && incomingPlan) return "replace";
  if (isAssistantClarifyingTripDetails(assistantText)) return "none";
  if (needsTripPlanningClarification() && !hasUserSpecifiedTripDays() && !incomingPlan) return "none";
  if (exploring && !concreteTrip && !incomingPlan && !claimingItinerary) return "none";
  if (exploring && !concreteTrip && hasModelDestinations && !incomingPlan) return "none";
  if (incomingPlan && (claimingItinerary || updates?.mode === "replace" || shouldReplaceTrip(updates, updateDays, userText))) {
    return "replace";
  }
  if (shouldReplaceTrip(updates, updateDays, userText)) return "replace";
  return updates?.mode || (state.route.length ? "patch" : "replace");
}

function shouldReplaceTrip(updates, updateDays, userText = "") {
  const hasIncomingRoute = Array.isArray(updates?.route) && updates.route.length > 0;
  const hasIncomingDays = updateDays.length > 0;

  if (!state.route.length) {
    if (state.inspiration.exploring && !isConcreteTripRequest(userText) && !hasIncomingRoute && !hasIncomingDays) {
      return false;
    }
    return hasIncomingRoute || hasIncomingDays;
  }
  if (updates?.mode === "replace") return true;
  if (Array.isArray(updates?.route) && updates.route.length) return true;
  if (/(改成|换成|变成|目的地|重新规划|全部重新|重做|换一个|不去)/.test(userText)) return true;

  return updateDays.some((update) => {
    if (!update.city) return false;
    const currentDay = getPlanDays().find((day) => day.day === Number(update.day));
    return currentDay && currentDay.city !== update.city;
  });
}

function replaceRouteFromUpdates(updates) {
  const route = Array.isArray(updates?.route) && updates.route.length
    ? updates.route
    : buildRouteFromUpdatedDays(updates?.days || []);

  state.calendar.monthOffset = 0;
  state.calendar.selectedDate = "";
  state.calendar.tripStartDate = "";

  state.route = route.map((city, index) => {
    const rawCity = String(city.city || "").trim();
    let cityName = isConcreteDestinationName(rawCity)
      ? rawCity
      : inferPrimaryDestinationFromText([...(city.stops || []), city.intent, getLatestUserChatText()].join(" "));
    if (!isConcreteDestinationName(cityName)) {
      cityName = `目的地 ${index + 1}`;
    }
    return {
      id: normalizeCityId(city.id || cityName, index),
      city: cityName,
      days: Math.max(1, Number(city.days) || 1),
      color: getCityColor(index),
      map: getCityMapPoint(index),
      stops: Array.isArray(city.stops) && city.stops.length
        ? city.stops.map((stop) => String(stop).trim()).filter(Boolean)
        : ["核心街区", "代表景点"],
      intent: String(city.intent || "旅行攻略专家生成路线").trim()
    };
  });

  state.dayEdits = {};
  if (!state.inspiration.exploring || hasConfirmedTripPlan()) {
    state.tripGuide = null;
  }
  state.collapsed = new Set();
  state.activeCanvasDay = null;
  state.freePoiDetail = null;
  state.activeBooking = null;
  state.ultimateActiveDay = null;
  state.ultimateExpandedDays = new Set();
  state.bookings = { flights: {}, hotels: {}, tickets: {}, trains: {} };
  state.hotelSearches = {};
  state.mapRoutes = { signature: "", loading: false, routesLoading: false, items: [], map: null, error: "" };
  state.mapPlanner = {
    currentDay: "ALL",
    hasManualDaySelection: false,
    isEditing: false,
    activePoiId: null,
    draggingPoiId: null
  };
  state.canvasPlanner.dayOrder = null;
  state.canvasPlanner.lastDayOrder = null;
  state.canvasPlanner.orderAlert = null;
  state.canvasPlanner.orderValidating = false;
  state.route.forEach((city) => {
    ensureBooking("flights", city.id);
    ensureBooking("hotels", city.id);
    ensureBooking("tickets", city.id);
    ensureBooking("trains", city.id);
  });
}

function inferCityFromDayUpdate(day) {
  const explicit = String(day.city || "").trim();
  if (!isPlaceholderDestination(explicit)) return explicit;
  return inferPrimaryDestinationFromText(getDayContextText(day)) || explicit || "目的地";
}

function buildRouteFromUpdatedDays(days) {
  const grouped = [];
  days.forEach((day) => {
    const city = inferCityFromDayUpdate(day);
    let group = grouped.find((item) => item.city === city);
    if (!group) {
      group = { city, days: 0, stops: [], intent: "旅行攻略专家生成路线" };
      grouped.push(group);
    }
    group.days += 1;
    (day.stops || []).forEach((stop) => {
      const name = cleanScenicSpotTitle(stop);
      if (name && !isGenericGuideSpotName(name) && !group.stops.includes(name)) group.stops.push(name);
    });
    (day.schedule || []).forEach((item) => {
      const entity = resolveScenicSpotEntity(item, { ...day, city });
      if (entity?.name && !group.stops.includes(entity.name)) group.stops.push(entity.name);
    });
  });
  return grouped.length ? grouped : [{ city: "目的地", days: 1, stops: ["核心体验"] }];
}

function normalizeCityId(value, index) {
  const normalized = String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return normalized || `city-${index + 1}`;
}

function getCityColor(index) {
  return ["#2d6cdf", "#d36b36", "#7a4bd8", "#139a91", "#2f7d63"][index % 5];
}

function getCityMapPoint(index) {
  const points = [
    { x: 42, y: 48 },
    { x: 58, y: 42 },
    { x: 64, y: 62 },
    { x: 38, y: 66 },
    { x: 52, y: 55 }
  ];
  return points[index % points.length];
}

function buildAssistantContext() {
  const latestUserQuery = getLatestUserChatText();
  const concreteTrip = isConcreteTripRequest(latestUserQuery);
  const exploringDestinations = hasActiveInspirationIntent(latestUserQuery, getLatestAssistantChatText());
  return {
    hasTrip: state.route.length > 0,
    isConcreteTripRequest: concreteTrip,
    exploringDestinations: Boolean(exploringDestinations && !concreteTrip),
    selectedDestination: state.inspiration.anchor || inferCasualDestinationPick(latestUserQuery) || getInspirationAnchor() || "",
    hasTripDays: hasUserSpecifiedTripDays(),
    hasTripOrigin: hasUserSpecifiedTripOrigin(),
    tripOrigin: inferTripOriginCity(),
    needsTripPlanningDetails: needsTripPlanningClarification(),
    latestUserQuery,
    route: state.route.map((city) => ({
      city: city.city,
      days: city.days,
      intent: city.intent,
      stops: city.stops
    })),
    days: getPlanDays().map((day) => ({
      id: day.id,
      day: day.day,
      city: day.city,
      title: day.title,
      pace: day.pace,
      transport: day.transport,
      stay: day.stay,
      summary: day.summary,
      schedule: day.schedule
    })),
    bookings: state.bookings,
    budget: budgetSeed,
    tripGuide: state.tripGuide,
    notes: state.notes
  };
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
    `主题：${getTripTitle()}草案`,
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

function showToast(message, tone = "") {
  const toast = document.querySelector(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.toggle("toast--success", tone === "success");
  toast.classList.add("is-visible");
  window.setTimeout(() => {
    toast.classList.remove("is-visible", "toast--success");
  }, 1800);
}

function buildSelectionToolbarState(text, rect) {
  const toolbarWidth = 390;
  const toolbarHeight = 48;
  const placement = rect.bottom + toolbarHeight + 8 > window.innerHeight ? "top" : "bottom";
  const x = Math.min(window.innerWidth - toolbarWidth - 16, Math.max(16, rect.left));
  const y = placement === "top"
    ? Math.max(16, rect.top - toolbarHeight - 8)
    : rect.bottom + 6;
  const arrowX = Math.min(toolbarWidth - 18, Math.max(18, rect.left + Math.min(rect.width / 2, 34) - x));
  return {
    text: text.slice(0, 240),
    x,
    y,
    arrowX,
    placement
  };
}

function getWorkspaceSelection(root) {
  const editorPane = root.querySelector(".editor-pane");
  if (!editorPane) return null;

  const active = document.activeElement;
  if (active?.matches?.(".document-view textarea, .document-view input")) {
    const start = active.selectionStart;
    const end = active.selectionEnd;
    if (start != null && end != null && end > start) {
      const text = active.value.slice(start, end).replace(/\s+/g, " ").trim();
      if (text.length >= 2) {
        return buildSelectionToolbarState(text, active.getBoundingClientRect());
      }
    }
  }

  const selection = window.getSelection?.();
  const text = selection?.toString().replace(/\s+/g, " ").trim();
  if (!selection || !text || text.length < 2 || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const container = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
    ? range.commonAncestorContainer
    : range.commonAncestorContainer.parentElement;
  if (!container || !editorPane.contains(container)) return null;
  if (container.closest(".selection-toolbar, .chat-pane")) return null;

  const inDocumentView = container.closest(".document-view");
  const inFormField = container.closest("input, textarea, select, [contenteditable='true']");
  if (inFormField && !inDocumentView) return null;

  const rect = [...range.getClientRects()].find((item) => item.width > 0 && item.height > 0) || range.getBoundingClientRect();
  if (!rect.width && !rect.height) return null;
  return buildSelectionToolbarState(text, rect);
}


// ========== 终极视图 (Ultimate View) ==========

function renderUltimateView() {
  const days = getPlanDays();
  if (!days.length) return renderEmptyTripView();

  const mode = "overview";
  const activeDay = state.ultimateActiveDay
    ? days.find((d) => d.id === state.ultimateActiveDay)
    : days[Math.min(2, days.length - 1)];

  return `
    <section class="ultimate-view ultimate-view--${escapeAttr(mode)} ${state.ultimateMapExpanded ? "ultimate-view--map-expanded" : ""}" aria-label="终极视图">
      <div class="ultimate-workspace ultimate-workspace--${escapeAttr(mode)}">
        ${renderUltimateChatPanel()}
        <section class="ultimate-canvas">
          ${renderUltimateCanvas(days, activeDay, mode)}
        </section>
        <aside class="ultimate-rail">${renderUltimateRail(activeDay, days)}</aside>
        ${state.activeBooking ? `<div class="ultimate-booking-panel">${renderBookingRail()}</div>` : ""}
      </div>
    </section>
  `;
}

function renderUltimateTopbar(days) {
  const totalDays = days.length;
  const cities = [...new Set(days.map((d) => d.city))];
  const pendingCount = getPendingConfirmCount(days);
  const totalBudget = getBudgetTotal();
  
  return `
    <header class="ultimate-topbar">
      <div class="ult-topbar__left">
        <div class="ult-topbar__logo">✈️</div>
        <span class="ult-topbar__title">AI 旅行工作台</span>
      </div>
      <div class="ult-topbar__center">
        <button class="ult-pill-btn" type="button" data-action="edit-trip-condition" data-key="destination">
          <span class="ult-pill-icon">📍</span>${cities.join(" → ")} ${totalDays}天${totalDays - 1}晚
        </button>
        <button class="ult-pill-btn" type="button" data-action="edit-trip-condition" data-key="people">
          <span class="ult-pill-icon">👥</span>2人出行
        </button>
        <button class="ult-pill-btn" type="button" data-action="edit-trip-condition" data-key="budget">
          <span class="ult-pill-icon">💰</span>预算 ${totalBudget}
        </button>
      </div>
      <div class="ult-topbar__right">
        <button class="ult-topbar-btn ult-topbar-btn--todo" type="button" data-action="ultimate-todo">
          待办
          ${pendingCount > 0 ? `<span class="ult-todo-badge">${pendingCount}</span>` : ""}
        </button>
        <button class="ult-topbar-btn" type="button" data-action="ultimate-share">分享</button>
        <button class="ult-topbar-btn" type="button" data-action="ultimate-export">导出</button>
        <button class="ult-topbar-btn ult-topbar-btn--primary" type="button" data-action="ultimate-save">保存</button>
      </div>
    </header>
  `;
}

function renderUltimateChatPanel() {
  return `
    <aside class="ultimate-chat chat-pane" aria-label="对话框">
      <div class="chat-head">
        <div class="advisor-profile">
          <span class="advisor-avatar" aria-hidden="true">AI</span>
          <div>
            <p class="eyebrow">AI Advisor</p>
            <h2>Mira Travel Concierge</h2>
          </div>
        </div>
      </div>
      <div class="chat-messages">
        ${state.chat.map(renderChatMessage).join("")}
        ${state.isChatLoading ? `<article class="chat-message chat-message--assistant"><p>DeepSeek 正在思考...</p></article>` : ""}
      </div>
      ${renderSmartChatSuggestions()}
      <div class="chat-compose">
        <input class="chat-input" type="text" value="" />
        <button class="button button--primary" type="button" data-action="send-chat" ${state.isChatLoading ? "disabled" : ""}>发送</button>
      </div>
    </aside>
  `;
}

function renderUltimateCanvas(days, activeDay) {
  const visibleDays = days;

  return `
    <div class="ultimate-canvas__inner zoom-workspace" data-zoom-workspace="ultimate">
      ${renderWorkspaceZoomControls("ultimate")}
      <div class="zoom-workspace__surface ultimate-canvas__surface ultimate-canvas__surface--overview" style="--workspace-zoom:${getWorkspaceZoom("ultimate")};">
        ${renderUltimateOverviewBoard(visibleDays, activeDay)}
      </div>
    </div>
  `;
}

function renderUltimateOverviewBoard(days, activeDay) {
  const expandedDays = state.ultimateExpandedDays instanceof Set
    ? state.ultimateExpandedDays
    : new Set();
  return `
    <div class="ultimate-day-cards" aria-label="终极行程总览">
      ${days.map((day) => renderUltimateDayCard(day, expandedDays.has(day.id))).join("")}
    </div>
  `;
}

function renderUltimateRoadbookBody(day) {
  const schedule = Array.isArray(day.schedule) ? day.schedule : [];
  return `
    <div class="ultimate-roadbook">
      ${schedule.length
        ? `<div class="ultimate-roadbook__timeline">${renderUltimateRoadbookSections(day)}</div>`
        : `<div class="ult-day-card__empty">暂无行程安排</div>`}
    </div>
  `;
}

function renderUltimateRoadbookSections(day) {
  const schedule = Array.isArray(day?.schedule) ? day.schedule : [];
  return `
    <div class="ultimate-itinerary-flow">
      ${schedule.map((activity, index) => renderUltimateItineraryItem(day, activity, index)).join("")}
    </div>
  `;
}

function renderUltimateItineraryItem(day, activity, index) {
  const fallback = index === 0 ? day.image : getImageForStop(day.cityId, index);
  const category = getActivityCategory(activity.title, index);
  const timeRange = getActivityTimeRange(activity.time, index);
  const connector = index < (day.schedule || []).length - 1 ? getTransportConnector(day, index) : "";
  const bookingChips = renderRoadbookBookingChips(day, activity, index);

  return `
    <div class="ultimate-itinerary-step">
      <article class="ultimate-itinerary-card">
        <figure class="ultimate-itinerary-card__media">
          ${renderTravelImageMarkup({
            imageKey: `ultimate-itinerary-${day.id}-${index}`,
            query: activity.title,
            city: day.city,
            fallback,
            label: "",
            extraClass: "ultimate-itinerary-card__image",
            preferredUrl: activity.booking?.imageUrl
          })}
          <span class="ultimate-itinerary-card__category">${escapeHtml(category)}</span>
          <i class="ultimate-itinerary-card__number">${index + 1}</i>
        </figure>
        <div class="ultimate-itinerary-card__body">
          <h4>${index + 1}. ${escapeHtml(activity.title || "新的安排")}</h4>
          <div class="ultimate-itinerary-card__time">
            <span aria-hidden="true">◷</span>
            <strong>${escapeHtml(timeRange)}</strong>
          </div>
          <p>${escapeHtml(activity.detail || "暂无更多说明，可继续补充这段安排。")}</p>
          ${bookingChips}
        </div>
      </article>
      ${connector ? `<div class="ultimate-itinerary-connector">${connector}</div>` : ""}
    </div>
  `;
}

function renderUltimateDayCard(day, isActive) {
  const schedule = day.schedule || [];
  const coverImage = day.image || getImageForStop(day.cityId, Math.max(0, day.day - 1));
  const dayBudget = getDayBudget(day);
  const activeTab = state.ultimateDayTab || "itinerary";
  const cardTitle = getUltimateDayCardTitle(day);
  const cardHeadline = getUltimateDayCardHeadline(day, cardTitle);
  const coreItems = getCanvasCoreItems(day).filter(isMeaningfulUltimateCoreItem).slice(0, 6);
  const coverRouteItems = coreItems.length
    ? coreItems.slice(0, 3)
    : schedule.map((item, index) => ({ title: item.title, category: item.category || "景点", index })).slice(0, 3);
  const coverQuery = pickDayCoverImageQuery(day);

  const dayColors = ["#2d6cdf", "#d36b36", "#7a4bd8", "#139a91", "#e85d75", "#f3b829"];
  const dayColor = dayColors[(day.day - 1) % dayColors.length];

  const activityLocations = schedule.map((s) => s.title).slice(0, 5);
  const dayIntro = String(day.summary || `${day.city || "当天"}围绕${activityLocations.slice(0, 2).join("、") || day.title || "核心行程"}展开，保留机动时间方便调整节奏。`).trim();
  const parseHour = (timeStr) => {
    if (!timeStr) return null;
    const match = String(timeStr).match(/(\d{1,2}):\d{2}/);
    if (!match) return null;
    const h = parseInt(match[1], 10);
    return Number.isFinite(h) ? h : null;
  };
  const morningItems = schedule.filter((s) => { const h = parseHour(s.time); return h !== null && h >= 6 && h < 12; });
  const afternoonItems = schedule.filter((s) => { const h = parseHour(s.time); return h !== null && h >= 12 && h < 18; });
  const eveningItems = schedule.filter((s) => { const h = parseHour(s.time); return h !== null && (h >= 18 || h < 6); });
  const unscheduledItems = schedule.filter((s) => parseHour(s.time) === null);

  // --- Timeline Item ---
  const renderTimelineItem = (item, idx, items) => {
    const isLast = idx === items.length - 1;
    return `
      <div class="ult-timeline-item ${isLast ? 'ult-timeline-item--last' : ''}">
        <div class="ult-timeline-item__time">${item.time || "--:--"}</div>
        <div class="ult-timeline-item__track">
          <div class="ult-timeline-item__dot" style="background:${dayColor}"></div>
          ${!isLast ? '<div class="ult-timeline-item__line"></div>' : ''}
        </div>
        <div class="ult-timeline-item__body">
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.detail || "")}</p>
        </div>
        <div class="ult-timeline-item__media">
          ${renderTravelImageMarkup({
            imageKey: "ult-act-" + day.id + "-" + idx,
            query: item.title || day.city,
            city: day.city,
            fallback: getImageForStop(day.cityId, idx),
            label: "",
            extraClass: "ult-timeline-img"
          })}
        </div>
      </div>
    `;
  };

  // --- Timeline Group ---
  const renderTimelineGroup = (items, label) => {
    if (!items.length) return "";
    return `
      <div class="ult-timeline-group">
        <div class="ult-timeline-group__label">${label}</div>
        <div class="ult-timeline-group__items">
          ${items.map((item, idx) => renderTimelineItem(item, idx, items)).join("")}
        </div>
      </div>
    `;
  };

  // --- Tabs ---
  const tabs = [
    { key: "itinerary", label: `行程 ${schedule.length}`, icon: "📍" },
    { key: "route", label: "路线", icon: "🗺️" },
    { key: "transport", label: "交通", icon: "🚇" },
    { key: "budget", label: "预算", icon: "💰" },
    { key: "todo", label: `待办 ${schedule.length}`, icon: "📋" }
  ];

  const renderTabs = () => tabs.map(t => `
    <button class="ult-day-tab ${activeTab === t.key ? 'is-active' : ''}"
            type="button"
            data-action="set-ultimate-day-tab"
            data-tab="${t.key}">
      <span>${t.icon}</span> ${t.label}
    </button>
  `).join("");

  // --- Tab Content ---
  const renderTabContent = () => {
    switch (activeTab) {
      case "itinerary":
        return renderUltimateRoadbookBody(day);
      case "route":
        return `
          <div class="ult-day-card__tab-body">
            <div class="ult-day-card__route-info">
              <div class="ult-day-card__route-city">${escapeHtml(day.city)}</div>
              <div class="ult-day-card__route-stops">
                ${(day.stops || []).map((s, i) => `
                  <div class="ult-day-card__route-stop">
                    <span class="ult-day-card__route-stop-num">${i + 1}</span>
                    <span>${escapeHtml(s)}</span>
                  </div>
                `).join("")}
              </div>
              <div class="ult-day-card__route-transport">
                <span>🚇</span> ${escapeHtml(day.transport || "步行 + 公共交通")}
              </div>
            </div>
          </div>
        `;
      case "transport":
        return `
          <div class="ult-day-card__tab-body">
            <div class="ult-day-card__info-row">
              <span class="ult-day-card__info-label">交通方式</span>
              <span class="ult-day-card__info-value">${escapeHtml(day.transport || "步行 + 公共交通")}</span>
            </div>
            <div class="ult-day-card__info-row">
              <span class="ult-day-card__info-label">节奏</span>
              <span class="ult-day-card__info-value">${escapeHtml(day.pace || "适中")}</span>
            </div>
            <div class="ult-day-card__info-row">
              <span class="ult-day-card__info-label">建议</span>
              <span class="ult-day-card__info-value">根据当天体力情况灵活调整，预留缓冲时间</span>
            </div>
          </div>
        `;
      case "budget":
        return `
          <div class="ult-day-card__tab-body">
            <div class="ult-day-card__info-row">
              <span class="ult-day-card__info-label">当日预算</span>
              <span class="ult-day-card__info-value ult-day-card__info-value--highlight">${dayBudget}</span>
            </div>
            <div class="ult-day-card__info-row">
              <span class="ult-day-card__info-label">住宿</span>
              <span class="ult-day-card__info-value">${escapeHtml(day.stay || "待定")}</span>
            </div>
            <div class="ult-day-card__info-row">
              <span class="ult-day-card__info-label">活动数</span>
              <span class="ult-day-card__info-value">${schedule.length} 个</span>
            </div>
          </div>
        `;
      case "todo":
        return `
          <div class="ult-day-card__tab-body">
            ${schedule.map((item, i) => `
              <div class="ult-day-card__todo-item">
                <span class="ult-day-card__todo-check">☐</span>
                <span class="ult-day-card__todo-text">${escapeHtml(item.title)}</span>
                <span class="ult-day-card__todo-time">${item.time || ""}</span>
              </div>
            `).join("")}
            ${!schedule.length ? '<div class="ult-day-card__empty">暂无待办</div>' : ""}
          </div>
        `;
      default:
        return '<div class="ult-day-card__empty">暂无内容</div>';
    }
  };

  // --- Expanded Content ---
  const hasSchedule = morningItems.length || afternoonItems.length || eveningItems.length || unscheduledItems.length;

  const expandedContent = isActive ? `
    <div class="ult-day-card__expanded-content">
      ${renderUltimateRoadbookBody(day)}
      <div class="ult-day-card__actions">
        <button class="ult-day-card__action-btn ult-day-card__action-btn--primary" type="button" data-action="ultimate-optimize-day" data-day="${day.id}">
          <span>✨</span> 优化当天
        </button>
        <button class="ult-day-card__action-btn" type="button" data-action="ultimate-add-stop" data-day="${day.id}">
          <span>+</span> 添加景点
        </button>
        <button class="ult-day-card__action-btn" type="button" data-action="ultimate-reorder-day" data-day="${day.id}">
          <span>↕</span> 调整顺序
        </button>
      </div>
    </div>
  ` : "";

  return `
    <article
      class="ult-day-card ${isActive ? 'ult-day-card--active ult-day-card--expanded' : ''}"
      draggable="true"
      style="--day-color: ${dayColor};"
      data-day="${escapeAttr(day.id)}"
      data-canvas-drop-day="${escapeAttr(day.id)}"
      data-day-order-card="${escapeAttr(day.id)}"
      data-day-order-drop="${escapeAttr(day.id)}"
    >
      <div class="ult-day-card__left-bar" style="background:${dayColor}"></div>
      <div class="ult-day-card__body">
        <div class="ult-day-card__cover" data-action="ultimate-select-day" data-day="${escapeAttr(day.id)}">
          ${renderTravelImageMarkup({
            imageKey: "ult-day-" + day.id,
            query: coverQuery,
            city: day.city,
            fallback: coverImage,
            label: "",
            extraClass: "ult-day-cover-img"
          })}
          <i class="day-drag-handle ult-day-card__drag-handle" aria-hidden="true" title="拖拽交换日期">⠿</i>
          <button
            class="ult-day-card__expand ${isActive ? 'ult-day-card__expand--collapse' : ''}"
            type="button"
            aria-label="${isActive ? '收起' : '展开'}"
            data-action="${isActive ? 'ultimate-collapse-day' : 'ultimate-select-day'}"
            data-day="${escapeAttr(day.id)}"
          >
            ${isActive ? '收起' : '展开'}
          </button>
        </div>
        <div class="ult-day-card__header" data-action="ultimate-select-day" data-day="${escapeAttr(day.id)}">
          <div class="ult-day-card__header-left">
            <div class="ult-day-card__day-num">D${day.day}</div>
            <div class="ult-day-card__meta">
              <span class="ult-day-card__meta-item">${escapeHtml(cardHeadline)}</span>
            </div>
            <h3 class="ult-day-card__title">${escapeHtml(cardTitle)}</h3>
          </div>
          <p class="ult-day-card__intro">${escapeHtml(dayIntro)}</p>
        </div>
        <div class="ult-day-card__core-list" aria-label="核心活动">
          <div class="ult-day-card__core-head">
            <span>核心活动</span>
            <strong>${coreItems.length} 项</strong>
          </div>
          <div class="ult-day-card__core-grid">
            ${coreItems.length
              ? coreItems.map((item) => renderUltimateCoreItem(day, item)).join("")
              : `<p class="ult-day-card__empty">暂无核心活动</p>`}
          </div>
        </div>
        ${expandedContent}
      </div>
    </article>
  `;
}

function getUltimateDayCardHeadline(day, cardTitle = getUltimateDayCardTitle(day)) {
  const city = String(day?.city || "").trim();
  const title = String(cardTitle || "").trim();
  if (!city) return title || "当天行程";
  if (!title || title === city) return city;
  const normalizedTitle = title.replace(new RegExp(`^${escapeRegExp(city)}[\\s·，,：:-]*`), "").trim();
  return `${city} · ${normalizedTitle || title}`;
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderUltimateCoverRoute(items) {
  if (!items.length) return "";
  return `
    <div class="ult-cover-route" aria-hidden="true">
      <span class="ult-cover-route__line"></span>
      ${items.map((item, index) => `
        <span class="ult-cover-route__point ult-cover-route__point--${index + 1}">
          <i>${getActivityCategoryEmoji(item.category)}</i>
          <strong>${escapeHtml(cleanCanvasItemTitle(item.title) || item.title || "目的地")}</strong>
        </span>
      `).join("")}
    </div>
  `;
}

function renderUltimateCoreItem(day, item) {
  return `
    <button
      type="button"
      class="ult-core-item canvas-core-item"
      draggable="true"
      data-canvas-item="${escapeAttr(item.title)}"
      data-day="${escapeAttr(day.id)}"
      data-index="${item.index}"
      title="拖拽到其他日期调整"
    >
      <span aria-label="${escapeAttr(item.category)}">${getActivityCategoryEmoji(item.category)}</span>
      <strong>${escapeHtml(item.title)}</strong>
    </button>
  `;
}

function isMeaningfulUltimateCoreItem(item) {
  const title = String(item?.title || "").trim();
  if (!title) return false;
  if (/^与/.test(title)) return false;
  if (/^(租车|取车|还车|换酒店|更换酒店|换住宿|办理入住|退房|返程|返回|回程)$/.test(title)) return false;
  if (/(午餐及返程|早餐及返程|晚餐及返程|返程及住宿|不住宿)$/.test(title)) return false;
  return true;
}

function getUltimateDayCardTitle(day) {
  const directTitle = String(day?.focus || day?.title || "").trim();
  if (directTitle && !isGenericDayTitle(directTitle)) return directTitle;

  const scheduleTitles = (Array.isArray(day?.schedule) ? day.schedule : [])
    .map((activity) => cleanCanvasItemTitle(activity?.title))
    .filter((title) => title && !isGenericDayTitle(title) && !isGenericMapPoint(title))
    .filter((title) => !/(抵达|到达|入住|酒店|返程|返回|回程|早餐|午餐|晚餐|用餐|休整|自由活动)/.test(title))
    .slice(0, 2);
  if (scheduleTitles.length) return scheduleTitles.join(" · ");

  const stops = (Array.isArray(day?.stops) ? day.stops : [])
    .map((stop) => cleanCanvasItemTitle(stop))
    .filter((stop) => stop && !isGenericMapPoint(stop))
    .slice(0, 2);
  if (stops.length) return stops.join(" · ");

  return `${day?.city || "目的地"} Day ${day?.day || ""}`.trim();
}

function renderUltimateRail(activeDay, days) {
  return `
    <div class="ultimate-rail__inner">
      <div class="ultimate-rail__map">
        <button class="ultimate-map-toggle" type="button" data-action="toggle-ultimate-map" aria-label="${state.ultimateMapExpanded ? "收起地图" : "展开地图"}">
          ${state.ultimateMapExpanded ? "收起地图" : "展开地图"}
        </button>
        ${renderAmapMcpMapStage({ embedded: true })}
      </div>
    </div>
  `;
}

// ========== 终极视图辅助函数 ==========

function isMorningActivity(activity) {
  const time = activity.time || "";
  const title = (activity.title || "").toLowerCase();
  if (/^0[6-9]:|^1[0-1]:/.test(time)) return true;
  if (/^(早餐|上午|早上|晨间|出发|抵达|前往)/.test(title)) return true;
  return false;
}

function isAfternoonActivity(activity) {
  const time = activity.time || "";
  const title = (activity.title || "").toLowerCase();
  if (/^1[2-5]:/.test(time)) return true;
  if (/^(午餐|下午|午后)/.test(title)) return true;
  return false;
}

function isEveningActivity(activity) {
  const time = activity.time || "";
  const title = (activity.title || "").toLowerCase();
  if (/^1[7-9]:|^2[0-3]:/.test(time)) return true;
  if (/^(晚餐|晚上|晚间|夜景|夜游|返回|返程)/.test(title)) return true;
  return false;
}

function getDayBudget(day) {
  if (day.budget) return "¥" + day.budget.toLocaleString();
  const amounts = (day.schedule || []).map((s) => s.budget).filter(Boolean);
  if (!amounts.length) return "¥0";
  const total = amounts.reduce((sum, v) => sum + Number(v), 0);
  return "¥" + total.toLocaleString();
}

function getUltimateActivityCategory(activity = {}) {
  const source = `${activity.category || ""} ${activity.title || ""} ${activity.detail || ""}`;
  if (/(机场|车站|交通|地铁|电车|巴士|公交|火车|航班|抵达|返程|前往)/.test(source)) {
    return { key: "transport", label: "交通" };
  }
  if (/(早餐|午餐|晚餐|餐|咖啡|美食|料理|烧肉|寿司|餐厅|酒屋)/.test(source)) {
    return { key: "food", label: "餐饮" };
  }
  if (/(体验|手作|温泉|游船|演出|表演|购物|市集|街区|漫步)/.test(source)) {
    return { key: "experience", label: "体验" };
  }
  if (/(酒店|入住|住宿|民宿|度假村)/.test(source)) {
    return { key: "hotel", label: "住宿" };
  }
  return { key: "spot", label: "景点" };
}

function getPendingConfirmCount(days) {
  return days.reduce((count, day) => {
    return count + (day.schedule || []).filter((s) => s.pending).length;
  }, 0);
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

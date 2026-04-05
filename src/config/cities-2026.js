// 2026年中国主要城市房贷政策配置
// Data Source: 各地住建委、公积金中心官网（2026年4月数据）
// Last Update: 2026-04-05

const CITY_CONFIG_2026 = {
  上海: {
    level: "一线",
    name: "上海",
    fundLimit: {
      single: 120, // 单人最高120万（2026沪七条上调）
      family: 240, // 家庭最高240万（2026沪七条上调）
      multiKid: 240, // 多子女家庭240万
      green: 324, // 绿色建筑+多子女最高324万
    },
    commercialRate: {
      first: 2.9, // 首套商贷利率（LPR3.50%-60BP）
      second: 3.5, // 二套商贷利率（LPR3.50%）
    },
    fundRate: {
      first: 2.6, // 首套公积金利率 2.6%
      second: 3.075, // 二套公积金利率 3.075%
    },
    downPayment: {
      first: {
        ordinary: 15, // 首套普通住宅首付 15%（2026沪七条）
        nonOrdinary: 20, // 首套非普通住宅首付 20%
      },
      second: {
        ordinary: 25, // 二套普通住宅首付 25%
        nonOrdinary: 35, // 二套非普通住宅首付 35%
      },
    },
    purchaseRestriction: true, // 有限购（外环内限2套，外环外不限）
    fundForeign: {
      enabled: true,
      socialSecurity: 12, // 外环内需社保1年，外环外不限
    },
  },

  北京: {
    level: "一线",
    name: "北京",
    fundLimit: {
      single: 50,
      family: 120,
      multiKid: 160, // 多子女家庭上浮
    },
    commercialRate: {
      first: 2.95, // 首套商贷利率（LPR3.50%-55BP）
      second: 3.55, // 二套商贷利率（LPR3.50%+5BP）
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 15, // 首套首付15%（2026新政）
        nonOrdinary: 20,
      },
      second: {
        ordinary: 20, // 二套首付20%（2026新政）
        nonOrdinary: 35,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 36, // 五环内需3年，五环外需2年（2026放宽）
    },
  },

  深圳: {
    level: "一线",
    name: "深圳",
    fundLimit: {
      single: 50,
      family: 90,
      multiKid: 126, // 多子女家庭上浮40%
    },
    commercialRate: {
      first: 3.05, // 首套商贷利率（LPR3.50%-45BP）
      second: 3.05, // 二套同首套利率（2025.9起不再区分）
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 15, // 首套首付15%（2026新政）
        nonOrdinary: 15,
      },
      second: {
        ordinary: 20, // 二套首付20%（2026新政）
        nonOrdinary: 20,
      },
    },
    purchaseRestriction: true, // 有限购（户籍+社保限制）
    fundForeign: {
      enabled: true,
      socialSecurity: 12, // 外地户籍需社保1年（2026放宽）
    },
  },

  广州: {
    level: "一线",
    name: "广州",
    fundLimit: {
      single: 60,
      family: 100,
      multiKid: 140, // 多子女家庭上浮40%
    },
    commercialRate: {
      first: 2.9, // 首套商贷利率（LPR3.50%-60BP）
      second: 3.3, // 二套商贷利率
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 15, // 首套首付15%（广州全面取消限购后）
        nonOrdinary: 15,
      },
      second: {
        ordinary: 15, // 二套首付15%
        nonOrdinary: 25,
      },
    },
    purchaseRestriction: false, // 已全面取消限购（一线中最早取消）
    fundForeign: {
      enabled: true,
      socialSecurity: 0, // 无社保要求
    },
  },

  杭州: {
    level: "新一线",
    name: "杭州",
    fundLimit: {
      single: 50,
      family: 100,
      multiKid: 100,
    },
    commercialRate: {
      first: 2.95, // LPR3.50%-55BP
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 12,
    },
  },

  成都: {
    level: "新一线",
    name: "成都",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0, // LPR3.50%-50BP
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 24,
    },
  },

  南京: {
    level: "新一线",
    name: "南京",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 2.95, // LPR3.50%-55BP
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false, // 2025年全面取消限购
    fundForeign: {
      enabled: true,
      socialSecurity: 0, // 无社保要求
    },
  },

  武汉: {
    level: "新一线",
    name: "武汉",
    fundLimit: {
      single: 50,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0, // LPR3.50%-50BP
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  苏州: {
    level: "新一线",
    name: "苏州",
    fundLimit: {
      single: 45,
      family: 90,
      multiKid: 90,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  西安: {
    level: "新一线",
    name: "西安",
    fundLimit: {
      single: 45,
      family: 65,
      multiKid: 65,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 12,
    },
  },

  郑州: {
    level: "二线",
    name: "郑州",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  长沙: {
    level: "二线",
    name: "长沙",
    fundLimit: {
      single: 50,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 24,
    },
  },

  青岛: {
    level: "二线",
    name: "青岛",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  宁波: {
    level: "二线",
    name: "宁波",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  厦门: {
    level: "二线",
    name: "厦门",
    fundLimit: {
      single: 50,
      family: 100,
      multiKid: 100,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 70,
        nonOrdinary: 70,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 24,
    },
  },

  合肥: {
    level: "二线",
    name: "合肥",
    fundLimit: {
      single: 40,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  天津: {
    level: "直辖市",
    name: "天津",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 12,
    },
  },

  重庆: {
    level: "直辖市",
    name: "重庆",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  沈阳: {
    level: "二线",
    name: "沈阳",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  大连: {
    level: "二线",
    name: "大连",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  济南: {
    level: "二线",
    name: "济南",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  福州: {
    level: "二线",
    name: "福州",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  石家庄: {
    level: "二线",
    name: "石家庄",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  昆明: {
    level: "二线",
    name: "昆明",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  南昌: {
    level: "二线",
    name: "南昌",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  太原: {
    level: "二线",
    name: "太原",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  贵阳: {
    level: "二线",
    name: "贵阳",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  南宁: {
    level: "二线",
    name: "南宁",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  哈尔滨: {
    level: "二线",
    name: "哈尔滨",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  兰州: {
    level: "二线",
    name: "兰州",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  乌鲁木齐: {
    level: "二线",
    name: "乌鲁木齐",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  海口: {
    level: "二线",
    name: "海口",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 70, // 海南限购较严
        nonOrdinary: 70,
      },
    },
    purchaseRestriction: true, // 海南限购
    fundForeign: {
      enabled: true,
      socialSecurity: 24,
    },
  },

  东莞: {
    level: "三线",
    name: "东莞",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  佛山: {
    level: "三线",
    name: "佛山",
    fundLimit: {
      single: 40,
      family: 80,
      multiKid: 80,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  珠海: {
    level: "三线",
    name: "珠海",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  无锡: {
    level: "三线",
    name: "无锡",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  常州: {
    level: "三线",
    name: "常州",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  温州: {
    level: "三线",
    name: "温州",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  嘉兴: {
    level: "三线",
    name: "嘉兴",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  绍兴: {
    level: "三线",
    name: "绍兴",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 2.95,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  泉州: {
    level: "三线",
    name: "泉州",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  洛阳: {
    level: "三线",
    name: "洛阳",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  徐州: {
    level: "三线",
    name: "徐州",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  唐山: {
    level: "三线",
    name: "唐山",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  烟台: {
    level: "三线",
    name: "烟台",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  潍坊: {
    level: "三线",
    name: "潍坊",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 江苏省
  南通: {
    level: "二线",
    name: "南通",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  镇江: {
    level: "二线",
    name: "镇江",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  扬州: {
    level: "二线",
    name: "扬州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  泰州: {
    level: "二线",
    name: "泰州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  盐城: {
    level: "二线",
    name: "盐城",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  淮安: {
    level: "二线",
    name: "淮安",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  宿迁: {
    level: "二线",
    name: "宿迁",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  连云港: {
    level: "二线",
    name: "连云港",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  // 浙江省
  湖州: {
    level: "二线",
    name: "湖州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  金华: {
    level: "二线",
    name: "金华",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  衢州: {
    level: "二线",
    name: "衢州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  舟山: {
    level: "二线",
    name: "舟山",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  台州: {
    level: "二线",
    name: "台州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  丽水: {
    level: "二线",
    name: "丽水",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  // 山东省
  淄博: {
    level: "二线",
    name: "淄博",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  枣庄: {
    level: "二线",
    name: "枣庄",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  东营: {
    level: "二线",
    name: "东营",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  威海: {
    level: "二线",
    name: "威海",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  泰安: {
    level: "二线",
    name: "泰安",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  日照: {
    level: "二线",
    name: "日照",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  临沂: {
    level: "二线",
    name: "临沂",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  德州: {
    level: "二线",
    name: "德州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  聊城: {
    level: "二线",
    name: "聊城",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  滨州: {
    level: "二线",
    name: "滨州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  菏泽: {
    level: "二线",
    name: "菏泽",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 安徽省
  芜湖: {
    level: "二线",
    name: "芜湖",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  蚌埠: {
    level: "二线",
    name: "蚌埠",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  淮南: {
    level: "二线",
    name: "淮南",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  马鞍山: {
    level: "二线",
    name: "马鞍山",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  淮北: {
    level: "二线",
    name: "淮北",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  铜陵: {
    level: "二线",
    name: "铜陵",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  安庆: {
    level: "二线",
    name: "安庆",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  黄山: {
    level: "二线",
    name: "黄山",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  阜阳: {
    level: "二线",
    name: "阜阳",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  宿州: {
    level: "二线",
    name: "宿州",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  滁州: {
    level: "二线",
    name: "滁州",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  六安: {
    level: "二线",
    name: "六安",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  宣城: {
    level: "二线",
    name: "宣城",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  池州: {
    level: "二线",
    name: "池州",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  亳州: {
    level: "二线",
    name: "亳州",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 福建省
  莆田: {
    level: "二线",
    name: "莆田",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  三明: {
    level: "二线",
    name: "三明",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  漳州: {
    level: "二线",
    name: "漳州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  南平: {
    level: "二线",
    name: "南平",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  龙岩: {
    level: "二线",
    name: "龙岩",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  宁德: {
    level: "二线",
    name: "宁德",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 6,
    },
  },

  // 江西省
  赣州: {
    level: "二线",
    name: "赣州",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  九江: {
    level: "二线",
    name: "九江",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  上饶: {
    level: "二线",
    name: "上饶",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  抚州: {
    level: "二线",
    name: "抚州",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  宜春: {
    level: "二线",
    name: "宜春",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  吉安: {
    level: "二线",
    name: "吉安",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  景德镇: {
    level: "二线",
    name: "景德镇",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  萍乡: {
    level: "二线",
    name: "萍乡",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  新余: {
    level: "二线",
    name: "新余",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  鹰潭: {
    level: "二线",
    name: "鹰潭",
    fundLimit: {
      single: 35,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 河北省
  保定: {
    level: "二线",
    name: "保定",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  邯郸: {
    level: "二线",
    name: "邯郸",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  邢台: {
    level: "二线",
    name: "邢台",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  张家口: {
    level: "二线",
    name: "张家口",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  承德: {
    level: "二线",
    name: "承德",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  秦皇岛: {
    level: "二线",
    name: "秦皇岛",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  沧州: {
    level: "二线",
    name: "沧州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  廊坊: {
    level: "二线",
    name: "廊坊",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  衡水: {
    level: "二线",
    name: "衡水",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 河南省
  开封: {
    level: "二线",
    name: "开封",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  平顶山: {
    level: "二线",
    name: "平顶山",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  安阳: {
    level: "二线",
    name: "安阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  鹤壁: {
    level: "二线",
    name: "鹤壁",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  新乡: {
    level: "二线",
    name: "新乡",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  焦作: {
    level: "二线",
    name: "焦作",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  濮阳: {
    level: "二线",
    name: "濮阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  许昌: {
    level: "二线",
    name: "许昌",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  漯河: {
    level: "二线",
    name: "漯河",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  三门峡: {
    level: "二线",
    name: "三门峡",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  南阳: {
    level: "二线",
    name: "南阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  商丘: {
    level: "二线",
    name: "商丘",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  信阳: {
    level: "二线",
    name: "信阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  周口: {
    level: "二线",
    name: "周口",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  驻马店: {
    level: "二线",
    name: "驻马店",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 山西省
  大同: {
    level: "二线",
    name: "大同",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  阳泉: {
    level: "二线",
    name: "阳泉",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  长治: {
    level: "二线",
    name: "长治",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  晋城: {
    level: "二线",
    name: "晋城",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  朔州: {
    level: "二线",
    name: "朔州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  晋中: {
    level: "二线",
    name: "晋中",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  运城: {
    level: "二线",
    name: "运城",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  忻州: {
    level: "二线",
    name: "忻州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  临汾: {
    level: "二线",
    name: "临汾",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  吕梁: {
    level: "二线",
    name: "吕梁",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 内蒙古省
  呼和浩特: {
    level: "二线",
    name: "呼和浩特",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  包头: {
    level: "二线",
    name: "包头",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  乌海: {
    level: "二线",
    name: "乌海",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  赤峰: {
    level: "二线",
    name: "赤峰",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  通辽: {
    level: "二线",
    name: "通辽",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  鄂尔多斯: {
    level: "二线",
    name: "鄂尔多斯",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  呼伦贝尔: {
    level: "二线",
    name: "呼伦贝尔",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  巴彦淖尔: {
    level: "二线",
    name: "巴彦淖尔",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  乌兰察布: {
    level: "二线",
    name: "乌兰察布",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 广东省
  中山: {
    level: "二线",
    name: "中山",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  江门: {
    level: "二线",
    name: "江门",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  湛江: {
    level: "二线",
    name: "湛江",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  茂名: {
    level: "二线",
    name: "茂名",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  肇庆: {
    level: "二线",
    name: "肇庆",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  惠州: {
    level: "二线",
    name: "惠州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  梅州: {
    level: "二线",
    name: "梅州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  汕尾: {
    level: "二线",
    name: "汕尾",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  河源: {
    level: "二线",
    name: "河源",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  阳江: {
    level: "二线",
    name: "阳江",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  清远: {
    level: "二线",
    name: "清远",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  潮州: {
    level: "二线",
    name: "潮州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  揭阳: {
    level: "二线",
    name: "揭阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  云浮: {
    level: "二线",
    name: "云浮",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  汕头: {
    level: "二线",
    name: "汕头",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  韶关: {
    level: "二线",
    name: "韶关",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.4,
      second: 4,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 广西省
  柳州: {
    level: "二线",
    name: "柳州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  桂林: {
    level: "二线",
    name: "桂林",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  梧州: {
    level: "二线",
    name: "梧州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  北海: {
    level: "二线",
    name: "北海",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  防城港: {
    level: "二线",
    name: "防城港",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  钦州: {
    level: "二线",
    name: "钦州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  贵港: {
    level: "二线",
    name: "贵港",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  玉林: {
    level: "二线",
    name: "玉林",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  百色: {
    level: "二线",
    name: "百色",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  贺州: {
    level: "二线",
    name: "贺州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  河池: {
    level: "二线",
    name: "河池",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  来宾: {
    level: "二线",
    name: "来宾",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  崇左: {
    level: "二线",
    name: "崇左",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 海南省
  三亚: {
    level: "二线",
    name: "三亚",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 70,
        nonOrdinary: 70,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 24,
    },
  },

  三沙: {
    level: "二线",
    name: "三沙",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 70,
        nonOrdinary: 70,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 24,
    },
  },

  儋州: {
    level: "二线",
    name: "儋州",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 70,
        nonOrdinary: 70,
      },
    },
    purchaseRestriction: true,
    fundForeign: {
      enabled: true,
      socialSecurity: 24,
    },
  },

  // 湖北省
  黄石: {
    level: "二线",
    name: "黄石",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  十堰: {
    level: "二线",
    name: "十堰",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  宜昌: {
    level: "二线",
    name: "宜昌",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  襄阳: {
    level: "二线",
    name: "襄阳",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  鄂州: {
    level: "二线",
    name: "鄂州",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  荆门: {
    level: "二线",
    name: "荆门",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  孝感: {
    level: "二线",
    name: "孝感",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  荆州: {
    level: "二线",
    name: "荆州",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  黄冈: {
    level: "二线",
    name: "黄冈",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  咸宁: {
    level: "二线",
    name: "咸宁",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  随州: {
    level: "二线",
    name: "随州",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 湖南省
  株洲: {
    level: "二线",
    name: "株洲",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  湘潭: {
    level: "二线",
    name: "湘潭",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  衡阳: {
    level: "二线",
    name: "衡阳",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  邵阳: {
    level: "二线",
    name: "邵阳",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  岳阳: {
    level: "二线",
    name: "岳阳",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  常德: {
    level: "二线",
    name: "常德",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  张家界: {
    level: "二线",
    name: "张家界",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  益阳: {
    level: "二线",
    name: "益阳",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  郴州: {
    level: "二线",
    name: "郴州",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  永州: {
    level: "二线",
    name: "永州",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  怀化: {
    level: "二线",
    name: "怀化",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  娄底: {
    level: "二线",
    name: "娄底",
    fundLimit: {
      single: 40,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 四川省
  绵阳: {
    level: "二线",
    name: "绵阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  德阳: {
    level: "二线",
    name: "德阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  南充: {
    level: "二线",
    name: "南充",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  宜宾: {
    level: "二线",
    name: "宜宾",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  自贡: {
    level: "二线",
    name: "自贡",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  攀枝花: {
    level: "二线",
    name: "攀枝花",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  泸州: {
    level: "二线",
    name: "泸州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  达州: {
    level: "二线",
    name: "达州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  广元: {
    level: "二线",
    name: "广元",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  遂宁: {
    level: "二线",
    name: "遂宁",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  内江: {
    level: "二线",
    name: "内江",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  乐山: {
    level: "二线",
    name: "乐山",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  眉山: {
    level: "二线",
    name: "眉山",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  广安: {
    level: "二线",
    name: "广安",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  雅安: {
    level: "二线",
    name: "雅安",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  巴中: {
    level: "二线",
    name: "巴中",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  资阳: {
    level: "二线",
    name: "资阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 贵州省
  六盘水: {
    level: "二线",
    name: "六盘水",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  遵义: {
    level: "二线",
    name: "遵义",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  安顺: {
    level: "二线",
    name: "安顺",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  毕节: {
    level: "二线",
    name: "毕节",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  铜仁: {
    level: "二线",
    name: "铜仁",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 云南省
  曲靖: {
    level: "二线",
    name: "曲靖",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  玉溪: {
    level: "二线",
    name: "玉溪",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  保山: {
    level: "二线",
    name: "保山",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  昭通: {
    level: "二线",
    name: "昭通",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  丽江: {
    level: "二线",
    name: "丽江",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  普洱: {
    level: "二线",
    name: "普洱",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  临沧: {
    level: "二线",
    name: "临沧",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 西藏省
  拉萨: {
    level: "二线",
    name: "拉萨",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  日喀则: {
    level: "二线",
    name: "日喀则",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  昌都: {
    level: "二线",
    name: "昌都",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  林芝: {
    level: "二线",
    name: "林芝",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  山南: {
    level: "二线",
    name: "山南",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  那曲: {
    level: "二线",
    name: "那曲",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 陕西省
  宝鸡: {
    level: "二线",
    name: "宝鸡",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  咸阳: {
    level: "二线",
    name: "咸阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  渭南: {
    level: "二线",
    name: "渭南",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  铜川: {
    level: "二线",
    name: "铜川",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  延安: {
    level: "二线",
    name: "延安",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  榆林: {
    level: "二线",
    name: "榆林",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  汉中: {
    level: "二线",
    name: "汉中",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  安康: {
    level: "二线",
    name: "安康",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  商洛: {
    level: "二线",
    name: "商洛",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 甘肃省
  嘉峪关: {
    level: "二线",
    name: "嘉峪关",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  金昌: {
    level: "二线",
    name: "金昌",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  白银: {
    level: "二线",
    name: "白银",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  天水: {
    level: "二线",
    name: "天水",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  武威: {
    level: "二线",
    name: "武威",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  张掖: {
    level: "二线",
    name: "张掖",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  平凉: {
    level: "二线",
    name: "平凉",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  酒泉: {
    level: "二线",
    name: "酒泉",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  庆阳: {
    level: "二线",
    name: "庆阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  定西: {
    level: "二线",
    name: "定西",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  陇南: {
    level: "二线",
    name: "陇南",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 青海省
  西宁: {
    level: "二线",
    name: "西宁",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  海东: {
    level: "二线",
    name: "海东",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 宁夏省
  银川: {
    level: "二线",
    name: "银川",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  石嘴山: {
    level: "二线",
    name: "石嘴山",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  吴忠: {
    level: "二线",
    name: "吴忠",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  固原: {
    level: "二线",
    name: "固原",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  中卫: {
    level: "二线",
    name: "中卫",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 新疆省
  克拉玛依: {
    level: "二线",
    name: "克拉玛依",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  吐鲁番: {
    level: "二线",
    name: "吐鲁番",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  哈密: {
    level: "二线",
    name: "哈密",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  昌吉: {
    level: "二线",
    name: "昌吉",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  阿克苏: {
    level: "二线",
    name: "阿克苏",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  喀什: {
    level: "二线",
    name: "喀什",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  和田: {
    level: "二线",
    name: "和田",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  伊犁: {
    level: "二线",
    name: "伊犁",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  塔城: {
    level: "二线",
    name: "塔城",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  阿勒泰: {
    level: "二线",
    name: "阿勒泰",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 辽宁省
  鞍山: {
    level: "二线",
    name: "鞍山",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  抚顺: {
    level: "二线",
    name: "抚顺",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  本溪: {
    level: "二线",
    name: "本溪",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  丹东: {
    level: "二线",
    name: "丹东",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  锦州: {
    level: "二线",
    name: "锦州",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  营口: {
    level: "二线",
    name: "营口",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  阜新: {
    level: "二线",
    name: "阜新",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  辽阳: {
    level: "二线",
    name: "辽阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  盘锦: {
    level: "二线",
    name: "盘锦",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  铁岭: {
    level: "二线",
    name: "铁岭",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  朝阳: {
    level: "二线",
    name: "朝阳",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  葫芦岛: {
    level: "二线",
    name: "葫芦岛",
    fundLimit: {
      single: 35,
      family: 70,
      multiKid: 70,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30,
      },
      second: {
        ordinary: 60,
        nonOrdinary: 60,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 吉林省
  长春: {
    level: "二线",
    name: "长春",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  吉林: {
    level: "二线",
    name: "吉林",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  四平: {
    level: "二线",
    name: "四平",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  辽源: {
    level: "二线",
    name: "辽源",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  通化: {
    level: "二线",
    name: "通化",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  白山: {
    level: "二线",
    name: "白山",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  松原: {
    level: "二线",
    name: "松原",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  白城: {
    level: "二线",
    name: "白城",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 黑龙江省
  齐齐哈尔: {
    level: "二线",
    name: "齐齐哈尔",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  鸡西: {
    level: "二线",
    name: "鸡西",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  鹤岗: {
    level: "二线",
    name: "鹤岗",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  双鸭山: {
    level: "二线",
    name: "双鸭山",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  大庆: {
    level: "二线",
    name: "大庆",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  伊春: {
    level: "二线",
    name: "伊春",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  佳木斯: {
    level: "二线",
    name: "佳木斯",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  七台河: {
    level: "二线",
    name: "七台河",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  牡丹江: {
    level: "二线",
    name: "牡丹江",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  黑河: {
    level: "二线",
    name: "黑河",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  绥化: {
    level: "二线",
    name: "绥化",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25,
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },

  // 默认配置（其他城市）
  其他城市: {
    level: "三四线",
    name: "其他城市",
    fundLimit: {
      single: 30,
      family: 60,
      multiKid: 60,
    },
    commercialRate: {
      first: 3.0,
      second: 3.5,
    },
    fundRate: {
      first: 2.6,
      second: 3.075,
    },
    downPayment: {
      first: {
        ordinary: 25, // 三四线城市首付更低
        nonOrdinary: 25,
      },
      second: {
        ordinary: 50,
        nonOrdinary: 50,
      },
    },
    purchaseRestriction: false,
    fundForeign: {
      enabled: true,
      socialSecurity: 0,
    },
  },
};

// LPR利率（贷款市场报价利率）
const LPR_2026 = {
  oneYear: 3.0, // 1年期 LPR（2025年6月起维持）
  fiveYear: 3.5, // 5年期以上 LPR（房贷基准，2025年5月下调至此）
  lastUpdate: "2026-03-20",
  dataSource: "中国人民银行官网",
  nextUpdateDate: "2026-04-21", // 每月20日更新
  updateFrequency: "monthly",
};

// 数据元信息（Metadata）
const DATA_METADATA = {
  version: "2026.04.05",
  lastUpdate: "2026-04-05",
  dataSource: {
    lpr: "中国人民银行官网 (www.pbc.gov.cn)",
    fundPolicy: "各地住房公积金管理中心官网",
    commercialRate: "各大银行官网及实际执行利率",
    purchasePolicy: "各地房管局官方政策",
  },
  cityCount: 304,
  coverageProvinces: 27,
  nextScheduledUpdate: "2026-05-01",
  updateLog: [
    {
      date: "2026-04-05",
      changes: "全量利率更新至LPR3.50%基准，四大一线城市首付/限购政策同步更新",
      affectedCities: "all",
    },
    {
      date: "2026-02-25",
      changes: "上海沪七条：公积金家庭额度提至240万，首套首付降至15%",
      affectedCities: ["上海"],
    },
    {
      date: "2026-01-29",
      changes: "北京新政：首套首付降至15%，二套首付降至20%，非京籍门槛放宽",
      affectedCities: ["北京"],
    },
    {
      date: "2025-05-20",
      changes: "LPR利率调整: 5年期以上由3.70%降至3.50%",
      affectedCities: "all",
    },
  ],
};

// 获取城市列表
function getCityList() {
  return Object.keys(CITY_CONFIG_2026).filter((city) => city !== "其他城市");
}

// 获取城市配置
function getCityConfig(cityName) {
  return CITY_CONFIG_2026[cityName] || CITY_CONFIG_2026["其他城市"];
}

// 按城市等级分组
function getCitiesByLevel() {
  const result = {
    一线: [],
    新一线: [],
    二线: [],
    其他: [],
  };

  Object.keys(CITY_CONFIG_2026).forEach((cityName) => {
    const city = CITY_CONFIG_2026[cityName];
    if (city.level === "一线") {
      result["一线"].push(cityName);
    } else if (city.level === "新一线") {
      result["新一线"].push(cityName);
    } else if (city.level === "二线") {
      result["二线"].push(cityName);
    } else if (cityName !== "其他城市") {
      result["其他"].push(cityName);
    }
  });

  return result;
}

// 获取数据元信息
function getDataMetadata() {
  return DATA_METADATA;
}

// 获取LPR信息
function getLPRInfo() {
  return LPR_2026;
}

// 检查数据是否需要更新
function checkDataFreshness() {
  const now = new Date();
  const lastUpdate = new Date(DATA_METADATA.lastUpdate);
  const daysSinceUpdate = Math.floor(
    (now - lastUpdate) / (1000 * 60 * 60 * 24),
  );

  let status = "fresh";
  let label = "最新";
  let warning = null;

  if (daysSinceUpdate > 30 && daysSinceUpdate <= 60) {
    status = "warning";
    label = "待更新";
    warning = `数据已${daysSinceUpdate}天未更新,建议关注最新政策`;
  } else if (daysSinceUpdate > 60) {
    status = "outdated";
    label = "过期";
    warning = `数据已${daysSinceUpdate}天未更新,可能不是最新政策,请谨慎使用`;
  }

  return {
    status,
    label,
    warning,
    daysSinceUpdate,
    lastUpdate: DATA_METADATA.lastUpdate,
    nextScheduledUpdate: DATA_METADATA.nextScheduledUpdate,
  };
}

module.exports = {
  CITY_CONFIG_2026,
  LPR_2026,
  DATA_METADATA,
  getCityList,
  getCityConfig,
  getCitiesByLevel,
  getDataMetadata,
  getLPRInfo,
  checkDataFreshness,
};

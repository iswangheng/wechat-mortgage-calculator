# 房贷计算器 - 中国实际情况需求

**最后更新**: 2026-03-24
**重要性**: ⭐⭐⭐⭐⭐

---

## 🎨 竞品分析 - 365淘房房贷计算器（必看）

### UI/UX 设计要点

#### ✅ 必须实现的设计

1. **城市选择器放在左上角**
   ```
   📍 上海 >  ← 最显眼位置,用户第一眼看到
   ```

2. **LPR数据必须标注更新时间**
   ```javascript
   LPR: 3.5%
   (2026年3月20日更新) ← 增强信任感
   ```

3. **利率智能计算,不要让用户手动输入**
   ```
   ❌ 错误: 让用户输入 3.3%
   ✅ 正确:
      利率方式: 按最新LPR >
      利率: 3.3% (LPR-20基点) ← 自动算好
   ```

4. **贷款期限双重显示**
   ```
   20年(240期) ← 用户更能理解"要还240个月"
   ```

5. **每个关键字段旁有帮助提示**
   ```
   还款方式 [?] ← 点击显示通俗解释
   ```

6. **支持两种计算模式**
   ```
   ⚪ 按贷款总额 (知道要贷多少钱)
   ⚪ 按单价 (看房时现场算首付)
   ```

#### 💡 页面布局结构

```
┌────────────────────────────┐
│ 📍上海  商业贷款 公积金 组合 │ ← Tab切换
├────────────────────────────┤
│ 还款方式: ⚪本息 ⚪本金      │
│ 计算方式: ⚪总额 ⚪单价      │
│ 贷款总额: [请输入 万元]     │
│ 贷款期限: 20年(240期) >     │
│ 利率方式: 按最新LPR >       │
│ LPR:    3.5% (3月20日更新)  │
│ 利率:    3.3% (LPR-20基点)  │
├────────────────────────────┤
│      [开始计算]             │ ← 大号蓝色按钮
├────────────────────────────┤
│ 贷款政策 >                  │
└────────────────────────────┘
```

#### 🎯 通俗化表达示例（来自竞品）

```
等额本息: 每月还一样多 💰💰💰
等额本金: 前期多,越还越少 💰💰💰 → 💰💰 → 💰
```

---

## 一、2026年中国房贷政策（必须准确）

### 1.1 贷款类型

#### 商业贷款
- **利率基准**: LPR（贷款市场报价利率）
- **2026年1月20日 LPR**: 5年期以上 **3.5%**（已连续9个月不变）
- **首套房**: 最低 LPR - 20基点 = **3.3%**
- **二套房**: 最低 LPR + 60基点 = **4.1%**
- **各城市略有差异**（上海、北京、深圳可能更低）

#### 公积金贷款
- **首套房**: **2.6%**（5年以上）
- **二套房**: **3.075%**
- **5年以下**: 2.1%
- **额度限制**（以上海为例）:
  - 个人最高 60万
  - 家庭最高 **120万**
  - 多子女家庭: 最高 **240万**
  - 叠加绿色建筑政策: 最高 **324万**

#### 组合贷款
- 商业贷款 + 公积金贷款
- 分别计算利息
- 常见比例: 公积金贷满额 + 商贷补足

### 1.2 首付比例（上海标准）

#### 首套房
- **普通住宅**: 最低 **30%**
- **非普通住宅**: 最低 **35%**

#### 二套房
- **普通住宅**: 最低 **50%**
- **非普通住宅**: 最低 **70%**

### 1.3 贷款年限
- **最长**: 30年
- **年龄限制**: 贷款人年龄 + 贷款年限 ≤ 70岁（部分银行65岁）
- **常见选择**: 20年、25年、30年

---

## 二、用户真实使用场景

### 场景1：首次购房（占70%）
**典型用户**：
- 年龄: 25-35岁
- 收入: 月入 1-3万
- 目标: 刚需房（80-120平）
- 总价: 300-600万（一线城市）

**需求**：
1. 快速计算"我能不能买得起"
2. 对比不同首付比例的月供
3. 对比商贷 vs 公积金 vs 组合贷
4. 计算月供占收入比（不超过40%是安全线）

**痛点**：
- 不懂等额本息和等额本金的区别
- 不知道LPR是什么
- 担心月供太高还不起

### 场景2：改善购房（占20%）
**典型用户**：
- 年龄: 35-45岁
- 已有一套房，想换大房
- 考虑二套房政策

**需求**：
1. 计算二套房首付和月供
2. 是否需要卖掉第一套
3. 税费计算（契税、个税）

### 场景3：提前还款（占10%）
**典型用户**：
- 已贷款3-5年
- 手上有余钱（年终奖、拆迁款等）
- 考虑提前还款省利息

**需求**：
1. 提前还多少最划算
2. 缩短年限 vs 减少月供，哪个省钱
3. 违约金计算（部分银行前3年提前还款收1%违约金）

---

## 三、必须实现的本地化功能

### 3.1 真实利率数据
```javascript
// 2026年真实利率
const RATES_2026 = {
  commercial: {
    base: 3.5,        // LPR基准
    first: 3.3,       // 首套最低（LPR-20基点）
    second: 4.1       // 二套最低（LPR+60基点）
  },
  fund: {
    first: 2.6,       // 公积金首套
    second: 3.075,    // 公积金二套
    below5y: 2.1      // 5年以下
  }
}
```

### 3.2 城市差异化（非常重要！）

#### 为什么必须区分城市？
1. **公积金额度不同**：北京120万 vs 三四线城市40-60万
2. **首付比例不同**：一线城市严格，三四线城市宽松
3. **利率优惠不同**：一线城市可能有额外折扣
4. **限购政策不同**：有的限购，有的不限购
5. **认房认贷标准不同**：有的认房又认贷，有的只认贷

#### 2026年主要城市房贷政策对比表

| 城市 | 公积金最高额度 | 首套首付 | 二套首付 | 商贷利率 | 限购 | 特殊政策 |
|------|--------------|---------|---------|---------|------|---------|
| **一线城市** |
| 上海 | 120万（多子女324万） | 30% | 50% | 3.3% | 是 | 2026年2月放宽限购 |
| 北京 | 120万 | 35% | 60% | 3.4% | 是 | 认房又认贷 |
| 深圳 | 90万 | 30% | 70% | 3.35% | 是 | 豪宅线调整 |
| 广州 | 100万 | 30% | 40% | 3.3% | 部分 | 越秀天河限购 |
| **新一线** |
| 杭州 | 100万 | 30% | 40% | 3.4% | 部分 | 部分区域限购 |
| 成都 | 80万 | 30% | 40% | 3.45% | 部分 | 天府新区限购 |
| 南京 | 50万 | 20% | 30% | 3.5% | 否 | 2025年全面取消限购 |
| 武汉 | 80万 | 20% | 30% | 3.5% | 否 | 人才购房优惠 |
| 苏州 | 80万 | 20% | 30% | 3.5% | 否 | 园区部分限购 |
| 西安 | 70万 | 20% | 30% | 3.5% | 否 | 全面取消限购 |
| **二线城市** |
| 郑州 | 80万 | 20% | 30% | 3.5% | 否 | 全面取消限购 |
| 长沙 | 60万 | 25% | 30% | 3.5% | 否 | - |
| 青岛 | 60万 | 20% | 30% | 3.5% | 否 | - |
| 宁波 | 60万 | 20% | 30% | 3.5% | 否 | - |
| 厦门 | 80万 | 30% | 40% | 3.4% | 是 | 岛内限购 |
| **三线城市** |
| 中山 | 50万 | 20% | 30% | 3.5% | 否 | - |
| 佛山 | 50万 | 20% | 30% | 3.5% | 否 | - |
| 东莞 | 50万 | 20% | 30% | 3.5% | 否 | - |
| 惠州 | 50万 | 20% | 30% | 3.5% | 否 | - |

#### 完整城市配置（代码实现）

```javascript
const CITY_CONFIG_2026 = {
  // === 一线城市 ===
  '上海': {
    level: '一线',
    fundLimit: {
      single: 60,           // 个人最高60万
      family: 120,          // 家庭最高120万
      multiKid: 240,        // 多子女家庭240万
      green: 324            // 叠加绿色建筑最高324万
    },
    commercialRate: {
      first: 3.3,           // 首套商贷利率
      second: 4.1           // 二套商贷利率
    },
    fundRate: {
      first: 2.6,           // 首套公积金利率
      second: 3.075         // 二套公积金利率
    },
    downPayment: {
      first: {
        ordinary: 30,       // 首套普通住宅最低30%
        nonOrdinary: 35     // 首套非普通住宅35%
      },
      second: {
        ordinary: 50,       // 二套普通住宅50%
        nonOrdinary: 70     // 二套非普通住宅70%
      }
    },
    restriction: {
      enabled: true,        // 是否限购
      rule: '外地户籍需缴纳社保或个税1年（外环内）'
    },
    specialPolicy: '2026年2月放宽限购，公积金额度最高324万'
  },

  '北京': {
    level: '一线',
    fundLimit: {
      single: 60,
      family: 120,
      multiKid: 120         // 北京暂无多子女额外优惠
    },
    commercialRate: {
      first: 3.4,
      second: 4.2
    },
    fundRate: {
      first: 2.6,
      second: 3.075
    },
    downPayment: {
      first: {
        ordinary: 35,       // 北京首套要求更高
        nonOrdinary: 40
      },
      second: {
        ordinary: 60,
        nonOrdinary: 80
      }
    },
    restriction: {
      enabled: true,
      rule: '认房又认贷，外地户籍需连续缴纳社保5年'
    },
    specialPolicy: '认房又认贷政策最严格'
  },

  '深圳': {
    level: '一线',
    fundLimit: {
      single: 50,
      family: 90,           // 深圳公积金额度较低
      multiKid: 90
    },
    commercialRate: {
      first: 3.35,
      second: 4.15
    },
    fundRate: {
      first: 2.6,
      second: 3.075
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30
      },
      second: {
        ordinary: 70,       // 深圳二套要求很高
        nonOrdinary: 70
      }
    },
    restriction: {
      enabled: true,
      rule: '外地户籍需缴纳社保5年'
    },
    specialPolicy: '豪宅线从750万调至1000万'
  },

  '广州': {
    level: '一线',
    fundLimit: {
      single: 60,
      family: 100,
      multiKid: 100
    },
    commercialRate: {
      first: 3.3,
      second: 4.0
    },
    fundRate: {
      first: 2.6,
      second: 3.075
    },
    downPayment: {
      first: {
        ordinary: 30,
        nonOrdinary: 30
      },
      second: {
        ordinary: 40,       // 广州二套相对宽松
        nonOrdinary: 40
      }
    },
    restriction: {
      enabled: true,
      rule: '仅越秀、天河、海珠部分区域限购'
    },
    specialPolicy: '限购政策最宽松的一线城市'
  },

  // === 新一线城市 ===
  '杭州': {
    level: '新一线',
    fundLimit: {
      single: 60,
      family: 100,
      multiKid: 100
    },
    commercialRate: {
      first: 3.4,
      second: 4.0
    },
    fundRate: {
      first: 2.6,
      second: 3.075
    },
    downPayment: {
      first: { ordinary: 30, nonOrdinary: 30 },
      second: { ordinary: 40, nonOrdinary: 40 }
    },
    restriction: {
      enabled: true,
      rule: '部分区域限购（上城、拱墅、西湖、滨江、萧山）'
    },
    specialPolicy: '2026年部分区域放宽限购'
  },

  '成都': {
    level: '新一线',
    fundLimit: {
      single: 60,
      family: 80,
      multiKid: 80
    },
    commercialRate: {
      first: 3.45,
      second: 4.05
    },
    fundRate: {
      first: 2.6,
      second: 3.075
    },
    downPayment: {
      first: { ordinary: 30, nonOrdinary: 30 },
      second: { ordinary: 40, nonOrdinary: 40 }
    },
    restriction: {
      enabled: true,
      rule: '仅天府新区、高新区限购'
    },
    specialPolicy: '人才购房优惠政策'
  },

  '南京': {
    level: '新一线',
    fundLimit: {
      single: 30,
      family: 50,           // 南京公积金额度较低
      multiKid: 50
    },
    commercialRate: {
      first: 3.5,
      second: 4.1
    },
    fundRate: {
      first: 2.6,
      second: 3.075
    },
    downPayment: {
      first: { ordinary: 20, nonOrdinary: 20 },
      second: { ordinary: 30, nonOrdinary: 30 }
    },
    restriction: {
      enabled: false,       // 2025年全面取消限购
      rule: '无限购'
    },
    specialPolicy: '2025年全面取消限购，首付低至20%'
  },

  '武汉': {
    level: '新一线',
    fundLimit: {
      single: 50,
      family: 80,
      multiKid: 80
    },
    commercialRate: {
      first: 3.5,
      second: 4.1
    },
    fundRate: {
      first: 2.6,
      second: 3.075
    },
    downPayment: {
      first: { ordinary: 20, nonOrdinary: 20 },
      second: { ordinary: 30, nonOrdinary: 30 }
    },
    restriction: {
      enabled: false,
      rule: '无限购'
    },
    specialPolicy: '大学生、人才购房可享额外优惠'
  },

  // === 二线城市（代表性城市） ===
  '郑州': {
    level: '二线',
    fundLimit: { single: 60, family: 80, multiKid: 80 },
    commercialRate: { first: 3.5, second: 4.1 },
    fundRate: { first: 2.6, second: 3.075 },
    downPayment: {
      first: { ordinary: 20, nonOrdinary: 20 },
      second: { ordinary: 30, nonOrdinary: 30 }
    },
    restriction: { enabled: false, rule: '无限购' },
    specialPolicy: '全面取消限购，鼓励购房'
  },

  '长沙': {
    level: '二线',
    fundLimit: { single: 60, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    fundRate: { first: 2.6, second: 3.075 },
    downPayment: {
      first: { ordinary: 25, nonOrdinary: 25 },
      second: { ordinary: 30, nonOrdinary: 30 }
    },
    restriction: { enabled: false, rule: '无限购' },
    specialPolicy: '房价收入比最低的省会城市'
  },

  // === 默认配置（其他城市） ===
  'default': {
    level: '其他',
    fundLimit: { single: 40, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    fundRate: { first: 2.6, second: 3.075 },
    downPayment: {
      first: { ordinary: 20, nonOrdinary: 20 },
      second: { ordinary: 30, nonOrdinary: 30 }
    },
    restriction: { enabled: false, rule: '无限购' },
    specialPolicy: '各地执行当地政策'
  }
};

// 获取城市配置（如果城市不在列表中，使用默认配置）
function getCityConfig(cityName) {
  return CITY_CONFIG_2026[cityName] || CITY_CONFIG_2026['default'];
}
```

#### 用户界面如何展示城市选择

```javascript
// 城市分组展示（更友好）
const CITY_GROUPS = [
  {
    title: '一线城市',
    cities: ['上海', '北京', '深圳', '广州']
  },
  {
    title: '新一线城市',
    cities: ['杭州', '成都', '南京', '武汉', '苏州', '西安']
  },
  {
    title: '二线城市',
    cities: ['郑州', '长沙', '青岛', '宁波', '厦门', '合肥']
  },
  {
    title: '其他城市',
    cities: ['其他']  // 用户选择后使用默认配置
  }
];
```

#### 根据城市智能提示

```javascript
// 示例：用户选择上海后
选择城市: 上海 ✅

💡 上海购房政策提示:
- 首套房最低首付 30%
- 公积金最高可贷 120万（多子女家庭最高 324万）
- 商贷利率最低 3.3%
- 外地户籍需缴纳社保/个税 1年（外环内）

📢 2026年最新政策:
上海 2月放宽限购，非沪籍购房门槛降低！
```

### 3.3 真实税费计算

#### 新房
- **契税**:
  - 首套90平以下: 1%
  - 首套90平以上: 1.5%
  - 二套: 2%
  - 非普通住宅: 3%
- **维修基金**: 约 100-200元/平

#### 二手房
- **契税**: 同新房
- **个人所得税**:
  - 满5年唯一: 免
  - 不满5年: 差额20% 或 总价1%
- **增值税**:
  - 满2年: 免
  - 不满2年: 差额5.6%

### 3.4 月供安全线提醒
**中国购房者的经验法则**：
- ✅ 月供 ≤ 家庭收入的 30%（舒适）
- ⚠️ 月供 = 家庭收入的 30-40%（可接受）
- ❌ 月供 > 家庭收入的 40%（压力大，不建议）

**必须在结果页显示**：
```
您的月供为 12,000元
建议您的家庭月收入至少: 30,000元
```

---

## 四、中国用户的语言习惯

### 4.1 术语本地化
| 标准术语 | 中国通俗说法 | 使用建议 |
|---------|------------|---------|
| 等额本息 | 每月还一样多 | 两种都显示 |
| 等额本金 | 前期还得多，越还越少 | 两种都显示 |
| LPR | 贷款利率 | 简化说明 |
| 基点 | 百分点 | 避免使用 |

### 4.2 友好的提示文案

**❌ 错误示例**（太专业）：
> "您的应还本息总额为 1,234,567元，其中利息支出 456,789元，占总还款额的37%。"

**✅ 正确示例**（通俗易懂）：
> "💰 您总共要还 123.5万元
> 其中利息 45.7万元（相当于白送银行一辆车🚗）"

### 4.3 常见问题（必须回答）
在计算器底部提供 FAQ：

1. **等额本息和等额本金选哪个？**
   - 等额本息: 每月还的一样多，适合工资稳定的上班族
   - 等额本金: 前期还得多，总利息更少，适合收入高或有余钱的人

2. **商贷好还是公积金好？**
   - 公积金利率低（2.6% vs 3.5%），能用公积金就用
   - 但公积金额度有限，不够就用组合贷

3. **要不要提前还款？**
   - 如果已还不到总年限的1/3，提前还比较划算
   - 如果已还超过一半，提前还意义不大（已还的主要是利息）

---

## 五、数据准确性要求

### 5.1 计算公式（必须精确）

#### 等额本息（中国标准）
```javascript
// 月供 = 贷款本金 × [月利率 × (1+月利率)^还款月数] / [(1+月利率)^还款月数 - 1]
function calculateEqualPayment(principal, yearRate, months) {
  const monthlyRate = yearRate / 12 / 100;  // 年利率转月利率
  const payment = principal *
    (monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(payment * 100) / 100;  // 保留2位小数
}

// 示例：贷款100万，利率3.5%，30年
// 月供 = 1000000 * [0.002917 * (1.002917)^360] / [(1.002917)^360 - 1]
//      ≈ 4490.15元
```

#### 等额本金（中国标准）
```javascript
// 每月应还本金 = 贷款本金 / 还款月数
// 每月应还利息 = 剩余本金 × 月利率
// 每月月供 = 每月应还本金 + 每月应还利息
function calculateEqualPrincipal(principal, yearRate, months) {
  const monthlyPrincipal = principal / months;
  const monthlyRate = yearRate / 12 / 100;

  let payments = [];
  for (let i = 1; i <= months; i++) {
    const remainingPrincipal = principal - (monthlyPrincipal * (i - 1));
    const monthlyInterest = remainingPrincipal * monthlyRate;
    const monthlyPayment = monthlyPrincipal + monthlyInterest;
    payments.push({
      month: i,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: monthlyPrincipal,
      interest: Math.round(monthlyInterest * 100) / 100
    });
  }
  return payments;
}
```

#### 组合贷款
```javascript
// 分别计算商贷和公积金贷款，然后相加
function calculateMixedLoan(totalLoan, fundLoan, commercialRate, fundRate, months) {
  const commercialLoan = totalLoan - fundLoan;

  const commercialPayment = calculateEqualPayment(commercialLoan, commercialRate, months);
  const fundPayment = calculateEqualPayment(fundLoan, fundRate, months);

  return {
    total: commercialPayment + fundPayment,
    commercial: commercialPayment,
    fund: fundPayment
  };
}
```

### 5.2 精度要求
- 月供金额: **保留2位小数**（精确到分）
- 利息总额: **保留2位小数**
- 还款总额: **保留2位小数**
- 显示时可以转换为"万元"单位，但计算必须精确

### 5.3 测试用例（必须通过）

**用例1: 等额本息**
```
输入:
- 房屋总价: 500万
- 首付: 30% (150万)
- 贷款: 350万
- 利率: 3.5%
- 年限: 30年

预期输出:
- 月供: 15,715.52元
- 总利息: 215.96万元
- 还款总额: 565.96万元
```

**用例2: 公积金贷款**
```
输入:
- 贷款: 120万
- 利率: 2.6%
- 年限: 30年

预期输出:
- 月供: 4,855.88元
- 总利息: 54.81万元
- 还款总额: 174.81万元
```

**用例3: 组合贷款**
```
输入:
- 总贷款: 350万
- 公积金: 120万
- 商贷: 230万
- 公积金利率: 2.6%
- 商贷利率: 3.5%
- 年限: 30年

预期输出:
- 月供: 15,176.65元
  - 公积金月供: 4,855.88元
  - 商贷月供: 10,320.77元
- 总利息: 166.76万元
- 还款总额: 516.76万元
```

---

## 六、必须避免的错误

### ❌ 错误1: 使用国外利率标准
- 不要用美国的 APR（年化利率）
- 不要用欧洲的浮动利率机制
- 中国用的是 LPR + 基点模式

### ❌ 错误2: 忽略中国特色政策
- 必须支持公积金贷款（这是中国特有的）
- 必须支持组合贷款
- 必须考虑首套房和二套房差异

### ❌ 错误3: 计算公式错误
- 不要用简化的等比数列公式
- 必须精确到小数点后2位
- 必须考虑浮点数精度问题（用 Math.round）

### ❌ 错误4: 忽略用户教育
- 不要假设用户懂金融术语
- 必须用通俗语言解释
- 必须提供"为什么"的说明

### ❌ 错误5: 数据过时
- 利率数据必须是2026年最新的
- 政策必须是最新的（如上海公积金324万政策）
- 税费标准必须准确

---

## 七、优先级排序

### P0（必须有）
- ✅ 商业贷款计算（LPR 3.5%）
- ✅ 公积金贷款计算（2.6%）
- ✅ 组合贷款计算
- ✅ 等额本息 vs 等额本金对比
- ✅ 月供安全线提醒
- ✅ 2026年最新利率

### P1（重要）
- ✅ 首套 vs 二套房差异
- ✅ 城市选择（影响公积金额度）
- ✅ 提前还款计算
- ✅ 税费计算

### P2（可选）
- ⭕ 购房能力评估
- ⭕ 房贷历史记录
- ⭕ 方案对比（保存多个方案）
- ⭕ 分享功能

---

## 八、上线前检查清单

### 计算准确性
- [ ] 等额本息公式验证（与银行计算器对比）
- [ ] 等额本金公式验证
- [ ] 组合贷款计算验证
- [ ] 提前还款计算验证
- [ ] 浮点数精度处理

### 政策合规性
- [ ] LPR利率正确（3.5%）
- [ ] 公积金利率正确（2.6%）
- [ ] 首付比例符合政策（首套30%，二套50%）
- [ ] 公积金额度正确（上海120万/324万）
- [ ] 贷款年限限制正确（最长30年）

### 用户体验
- [ ] 所有专业术语都有通俗解释
- [ ] 月供安全线有明确提示
- [ ] 计算结果清晰易懂
- [ ] 常见问题有解答
- [ ] 错误提示友好

### 本地化
- [ ] 语言表达符合中国习惯
- [ ] 金额单位使用"万元"
- [ ] 日期格式正确
- [ ] 城市数据准确

---

**这份文档是开发的金标准，必须严格遵守！**

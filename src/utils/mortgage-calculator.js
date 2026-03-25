// 房贷计算器核心算法
// 支持：商业贷款、公积金贷款、组合贷款
// 还款方式：等额本息、等额本金

/**
 * 等额本息计算
 * 每月还款金额相同
 * 公式：月供 = [贷款本金 × 月利率 × (1+月利率)^还款月数] / [(1+月利率)^还款月数 - 1]
 *
 * @param {number} principal - 贷款本金（万元）
 * @param {number} annualRate - 年利率（百分比，如3.5表示3.5%）
 * @param {number} years - 贷款年限
 * @returns {object} 计算结果
 */
function calculateEqualPayment(principal, annualRate, years) {
  const P = principal * 10000; // 转换为元
  const r = annualRate / 100 / 12; // 月利率
  const n = years * 12; // 还款月数

  // 月供计算（利率为0时直接平分本金）
  let monthlyPayment;
  if (r < 1e-10) {
    monthlyPayment = P / n;
  } else {
    monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  // 总还款额
  const totalPayment = monthlyPayment * n;

  // 总利息
  const totalInterest = totalPayment - P;

  // 生成每月还款明细
  const schedule = [];
  let remainingPrincipal = P;

  for (let month = 1; month <= n; month++) {
    const interestPayment = remainingPrincipal * r;
    const principalPayment = monthlyPayment - interestPayment;
    remainingPrincipal -= principalPayment;

    schedule.push({
      month,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      principalPayment: Math.round(principalPayment * 100) / 100,
      interestPayment: Math.round(interestPayment * 100) / 100,
      remainingPrincipal:
        Math.round(Math.max(0, remainingPrincipal) * 100) / 100,
    });
  }

  return {
    method: "等额本息",
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    principal: P,
    schedule,
  };
}

/**
 * 等额本金计算
 * 每月还款本金相同，利息递减
 * 公式：月供 = (贷款本金 / 还款月数) + (剩余本金 × 月利率)
 *
 * @param {number} principal - 贷款本金（万元）
 * @param {number} annualRate - 年利率（百分比）
 * @param {number} years - 贷款年限
 * @returns {object} 计算结果
 */
function calculateEqualPrincipal(principal, annualRate, years) {
  const P = principal * 10000;
  const r = annualRate / 100 / 12;
  const n = years * 12;

  // 每月固定还款本金
  const monthlyPrincipal = P / n;

  // 生成每月还款明细
  const schedule = [];
  let remainingPrincipal = P;
  let totalPayment = 0;

  for (let month = 1; month <= n; month++) {
    const interestPayment = remainingPrincipal * r;
    const monthlyPayment = monthlyPrincipal + interestPayment;
    remainingPrincipal -= monthlyPrincipal;
    totalPayment += monthlyPayment;

    schedule.push({
      month,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      principalPayment: Math.round(monthlyPrincipal * 100) / 100,
      interestPayment: Math.round(interestPayment * 100) / 100,
      remainingPrincipal:
        Math.round(Math.max(0, remainingPrincipal) * 100) / 100,
    });
  }

  const totalInterest = totalPayment - P;
  const firstMonthPayment = schedule[0].monthlyPayment;
  const lastMonthPayment = schedule[schedule.length - 1].monthlyPayment;

  return {
    method: "等额本金",
    firstMonthPayment: Math.round(firstMonthPayment * 100) / 100,
    lastMonthPayment: Math.round(lastMonthPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    principal: P,
    schedule,
  };
}

/**
 * 商业贷款计算
 * @param {object} params - 参数对象
 * @returns {object} 计算结果
 */
function calculateCommercialLoan(params) {
  const { principal, annualRate, years, method } = params;

  if (method === "等额本金") {
    return calculateEqualPrincipal(principal, annualRate, years);
  } else {
    return calculateEqualPayment(principal, annualRate, years);
  }
}

/**
 * 公积金贷款计算
 * @param {object} params - 参数对象
 * @returns {object} 计算结果
 */
function calculateFundLoan(params) {
  const { principal, annualRate, years, method } = params;

  if (method === "等额本金") {
    return calculateEqualPrincipal(principal, annualRate, years);
  } else {
    return calculateEqualPayment(principal, annualRate, years);
  }
}

/**
 * 组合贷款计算
 * @param {object} params - 参数对象
 * @returns {object} 计算结果
 */
function calculateCombinationLoan(params) {
  const {
    commercialPrincipal,
    commercialRate,
    fundPrincipal,
    fundRate,
    years,
    method,
  } = params;

  // 分别计算商贷和公积金
  const commercial = calculateCommercialLoan({
    principal: commercialPrincipal,
    annualRate: commercialRate,
    years,
    method,
  });

  const fund = calculateFundLoan({
    principal: fundPrincipal,
    annualRate: fundRate,
    years,
    method,
  });

  // 合并结果
  if (method === "等额本金") {
    return {
      method: "组合贷 - 等额本金",
      commercial,
      fund,
      firstMonthPayment: commercial.firstMonthPayment + fund.firstMonthPayment,
      lastMonthPayment: commercial.lastMonthPayment + fund.lastMonthPayment,
      totalPayment: commercial.totalPayment + fund.totalPayment,
      totalInterest: commercial.totalInterest + fund.totalInterest,
      totalPrincipal: commercial.principal + fund.principal,
    };
  } else {
    return {
      method: "组合贷 - 等额本息",
      commercial,
      fund,
      monthlyPayment: commercial.monthlyPayment + fund.monthlyPayment,
      totalPayment: commercial.totalPayment + fund.totalPayment,
      totalInterest: commercial.totalInterest + fund.totalInterest,
      totalPrincipal: commercial.principal + fund.principal,
    };
  }
}

/**
 * 提前还款计算
 * @param {object} params - 参数对象
 * @returns {object} 计算结果
 */
function calculateEarlyRepayment(params) {
  const {
    originalPrincipal, // 原始贷款总额（万元）
    annualRate, // 年利率
    years, // 原贷款年限
    method, // 还款方式
    paidMonths, // 已还月数
    earlyAmount, // 提前还款金额（万元）
    afterMethod, // 提前还款后处理方式：'reduceTerm'缩短年限 | 'reducePayment'减少月供
  } = params;

  // Input validation
  const totalMonths = years * 12;
  if (!paidMonths || paidMonths < 1 || paidMonths >= totalMonths) {
    throw new Error(`已还月数必须在 1 到 ${totalMonths - 1} 之间`);
  }

  // 先计算原贷款
  let original;
  if (method === "等额本金") {
    original = calculateEqualPrincipal(originalPrincipal, annualRate, years);
  } else {
    original = calculateEqualPayment(originalPrincipal, annualRate, years);
  }

  // 计算已还款后的剩余本金
  const remainingPrincipal =
    original.schedule[paidMonths - 1].remainingPrincipal;

  // Validate early repayment amount
  if (!earlyAmount || earlyAmount <= 0) {
    throw new Error("提前还款金额必须大于0");
  }
  if (earlyAmount * 10000 > remainingPrincipal) {
    throw new Error(
      `提前还款金额不能超过剩余本金 ${(remainingPrincipal / 10000).toFixed(2)}万元`,
    );
  }
  const newPrincipal = (remainingPrincipal - earlyAmount * 10000) / 10000; // 转回万元
  const remainingMonths = years * 12 - paidMonths;
  const remainingYears = remainingMonths / 12;

  let newLoan;
  if (afterMethod === "reduceTerm") {
    // 保持月供不变，缩短年限
    // 简化计算：使用原月供倒推新年限
    const r = annualRate / 100 / 12;
    const M =
      method === "等额本金"
        ? original.firstMonthPayment
        : original.monthlyPayment;
    const P = newPrincipal * 10000;

    // Calculate new term; handle zero-rate to avoid division by zero in log
    let newMonths;
    if (r < 1e-10) {
      newMonths = Math.ceil(P / M);
    } else {
      newMonths = Math.log(M / (M - P * r)) / Math.log(1 + r);
      newMonths = Math.ceil(newMonths);
    }
    const newYears = newMonths / 12;

    if (method === "等额本金") {
      newLoan = calculateEqualPrincipal(newPrincipal, annualRate, newYears);
    } else {
      newLoan = calculateEqualPayment(newPrincipal, annualRate, newYears);
    }

    return {
      type: "缩短年限",
      original: {
        principal: originalPrincipal,
        monthlyPayment:
          method === "等额本金"
            ? original.firstMonthPayment
            : original.monthlyPayment,
        totalPayment: original.totalPayment,
        totalInterest: original.totalInterest,
        years,
      },
      afterEarlyPayment: {
        earlyAmount: earlyAmount,
        newPrincipal,
        newYears: Math.round(newYears * 100) / 100,
        monthlyPayment:
          method === "等额本金"
            ? newLoan.firstMonthPayment
            : newLoan.monthlyPayment,
        newTotalPayment:
          newLoan.totalPayment +
          original.schedule
            .slice(0, paidMonths)
            .reduce((sum, m) => sum + m.monthlyPayment, 0),
        newTotalInterest: newLoan.totalInterest,
        savedMonths: remainingMonths - newMonths,
        savedInterest:
          original.totalInterest -
          newLoan.totalInterest -
          (paidMonths > 0
            ? original.schedule
                .slice(0, paidMonths)
                .reduce((sum, m) => sum + m.interestPayment, 0)
            : 0),
      },
    };
  } else {
    // 保持年限不变，减少月供
    if (method === "等额本金") {
      newLoan = calculateEqualPrincipal(
        newPrincipal,
        annualRate,
        remainingYears,
      );
    } else {
      newLoan = calculateEqualPayment(newPrincipal, annualRate, remainingYears);
    }

    const originalMonthly =
      method === "等额本金"
        ? original.firstMonthPayment
        : original.monthlyPayment;
    const newMonthly =
      method === "等额本金"
        ? newLoan.firstMonthPayment
        : newLoan.monthlyPayment;

    return {
      type: "减少月供",
      original: {
        principal: originalPrincipal,
        monthlyPayment: originalMonthly,
        totalPayment: original.totalPayment,
        totalInterest: original.totalInterest,
        years,
      },
      afterEarlyPayment: {
        earlyAmount: earlyAmount,
        newPrincipal,
        newYears: Math.round(remainingYears * 100) / 100,
        monthlyPayment: newMonthly,
        reducedMonthly: Math.round((originalMonthly - newMonthly) * 100) / 100,
        newTotalPayment:
          newLoan.totalPayment +
          original.schedule
            .slice(0, paidMonths)
            .reduce((sum, m) => sum + m.monthlyPayment, 0),
        savedInterest:
          original.totalInterest -
          newLoan.totalInterest -
          (paidMonths > 0
            ? original.schedule
                .slice(0, paidMonths)
                .reduce((sum, m) => sum + m.interestPayment, 0)
            : 0),
      },
    };
  }
}

/**
 * 计算月供安全线
 * @param {number} monthlyPayment - 月供金额
 * @returns {object} 安全建议
 */
function calculateSafetyLine(monthlyPayment, monthlyIncome) {
  const comfortable = monthlyPayment / 0.3; // 舒适：月供≤30%收入
  const acceptable = monthlyPayment / 0.4; // 可接受：月供≤40%收入

  let suggestion;
  if (monthlyIncome && monthlyIncome > 0) {
    const ratio = monthlyPayment / monthlyIncome;
    if (ratio <= 0.3) {
      suggestion = "✅ 舒适";
    } else if (ratio <= 0.4) {
      suggestion = "⚠️ 可接受";
    } else {
      suggestion = "❌ 压力大";
    }
  } else {
    suggestion = `月收入需 ${Math.ceil(comfortable).toLocaleString()} 元以上较舒适`;
  }

  return {
    monthlyPayment,
    comfortable: Math.ceil(comfortable),
    acceptable: Math.ceil(acceptable),
    suggestion,
  };
}

/**
 * 等额本息 vs 等额本金对比
 * @param {number} principal - 贷款本金（万元）
 * @param {number} annualRate - 年利率
 * @param {number} years - 贷款年限
 * @returns {object} 对比结果
 */
function comparePaymentMethods(principal, annualRate, years) {
  const equalPayment = calculateEqualPayment(principal, annualRate, years);
  const equalPrincipal = calculateEqualPrincipal(principal, annualRate, years);

  const savedInterest =
    equalPrincipal.totalInterest - equalPayment.totalInterest;
  const firstMonthDiff =
    equalPrincipal.firstMonthPayment - equalPayment.monthlyPayment;

  return {
    equalPayment: {
      name: "等额本息",
      monthlyPayment: equalPayment.monthlyPayment,
      totalInterest: equalPayment.totalInterest,
      totalPayment: equalPayment.totalPayment,
      description: "每月还一样多 💰💰💰",
      pros: ["月供固定，便于规划", "前期压力小", "适合收入稳定的上班族"],
      cons: ["总利息较多"],
    },
    equalPrincipal: {
      name: "等额本金",
      firstMonthPayment: equalPrincipal.firstMonthPayment,
      lastMonthPayment: equalPrincipal.lastMonthPayment,
      totalInterest: equalPrincipal.totalInterest,
      totalPayment: equalPrincipal.totalPayment,
      description: "前期还得多,越还越少 💰💰💰 → 💰💰 → 💰",
      pros: [
        "总利息更少",
        `能省 ${Math.round(savedInterest)}元`,
        "适合收入高或有余钱的人",
      ],
      cons: [`首月多还 ${Math.round(firstMonthDiff)}元`, "前期压力大"],
    },
    savedInterest: Math.round(savedInterest),
    firstMonthDiff: Math.round(firstMonthDiff),
    recommendation:
      firstMonthDiff / equalPayment.monthlyPayment < 0.2
        ? "建议选等额本金，能省钱且首月压力不大"
        : "建议选等额本息，首月压力太大不如稳定还款",
  };
}

module.exports = {
  calculateEqualPayment,
  calculateEqualPrincipal,
  calculateCommercialLoan,
  calculateFundLoan,
  calculateCombinationLoan,
  calculateEarlyRepayment,
  calculateSafetyLine,
  comparePaymentMethods,
};

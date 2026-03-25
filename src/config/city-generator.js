// 城市配置生成器 - 快速生成200+城市配置
// 按省份批量生成，保证数据合理性

// 省级配置模板（各省默认值）
const PROVINCE_TEMPLATES = {
  // 华东地区（经济发达）
  '江苏': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.4, second: 4.0 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 6
  },
  '浙江': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.4, second: 4.0 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 6
  },
  '山东': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '安徽': {
    fundLimit: { single: 35, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '福建': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 6
  },
  '江西': {
    fundLimit: { single: 35, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  // 华北地区
  '河北': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '河南': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '山西': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '内蒙古': {
    fundLimit: { single: 30, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 25, nonOrdinary: 25 }, second: { ordinary: 50, nonOrdinary: 50 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  // 华南地区
  '广东': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.4, second: 4.0 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '广西': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '海南': {
    fundLimit: { single: 30, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 70, nonOrdinary: 70 } },
    purchaseRestriction: true,
    socialSecurity: 24
  },
  // 华中地区
  '湖北': {
    fundLimit: { single: 40, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '湖南': {
    fundLimit: { single: 40, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  // 西南地区
  '四川': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '贵州': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '云南': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '西藏': {
    fundLimit: { single: 30, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 25, nonOrdinary: 25 }, second: { ordinary: 50, nonOrdinary: 50 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  // 西北地区
  '陕西': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '甘肃': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '青海': {
    fundLimit: { single: 30, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 25, nonOrdinary: 25 }, second: { ordinary: 50, nonOrdinary: 50 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '宁夏': {
    fundLimit: { single: 30, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 25, nonOrdinary: 25 }, second: { ordinary: 50, nonOrdinary: 50 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '新疆': {
    fundLimit: { single: 30, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 25, nonOrdinary: 25 }, second: { ordinary: 50, nonOrdinary: 50 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  // 东北地区
  '辽宁': {
    fundLimit: { single: 35, family: 70, multiKid: 70 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 30, nonOrdinary: 30 }, second: { ordinary: 60, nonOrdinary: 60 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '吉林': {
    fundLimit: { single: 30, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 25, nonOrdinary: 25 }, second: { ordinary: 50, nonOrdinary: 50 } },
    purchaseRestriction: false,
    socialSecurity: 0
  },
  '黑龙江': {
    fundLimit: { single: 30, family: 60, multiKid: 60 },
    commercialRate: { first: 3.5, second: 4.1 },
    downPayment: { first: { ordinary: 25, nonOrdinary: 25 }, second: { ordinary: 50, nonOrdinary: 50 } },
    purchaseRestriction: false,
    socialSecurity: 0
  }
};

// 全国地级市列表（按省份分组）
const ALL_CITIES = {
  '江苏': ['南通', '镇江', '扬州', '泰州', '盐城', '淮安', '宿迁', '连云港'],
  '浙江': ['湖州', '金华', '衢州', '舟山', '台州', '丽水'],
  '山东': ['淄博', '枣庄', '东营', '威海', '泰安', '日照', '临沂', '德州', '聊城', '滨州', '菏泽'],
  '安徽': ['芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '阜阳', '宿州', '滁州', '六安', '宣城', '池州', '亳州'],
  '福建': ['莆田', '三明', '漳州', '南平', '龙岩', '宁德'],
  '江西': ['赣州', '九江', '上饶', '抚州', '宜春', '吉安', '景德镇', '萍乡', '新余', '鹰潭'],
  '河北': ['保定', '邯郸', '邢台', '张家口', '承德', '秦皇岛', '沧州', '廊坊', '衡水'],
  '河南': ['开封', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
  '山西': ['大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
  '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布'],
  '广东': ['中山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '潮州', '揭阳', '云浮', '汕头', '韶关'],
  '广西': ['柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
  '海南': ['三亚', '三沙', '儋州'],
  '湖北': ['黄石', '十堰', '宜昌', '襄阳', '鄂州', '荆门', '孝感', '荆州', '黄冈', '咸宁', '随州'],
  '湖南': ['株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底'],
  '四川': ['绵阳', '德阳', '南充', '宜宾', '自贡', '攀枝花', '泸州', '达州', '广元', '遂宁', '内江', '乐山', '眉山', '广安', '雅安', '巴中', '资阳'],
  '贵州': ['六盘水', '遵义', '安顺', '毕节', '铜仁'],
  '云南': ['曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧'],
  '西藏': ['拉萨', '日喀则', '昌都', '林芝', '山南', '那曲'],
  '陕西': ['宝鸡', '咸阳', '渭南', '铜川', '延安', '榆林', '汉中', '安康', '商洛'],
  '甘肃': ['嘉峪关', '金昌', '白银', '天水', '武威', '张掖', '平凉', '酒泉', '庆阳', '定西', '陇南'],
  '青海': ['西宁', '海东'],
  '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
  '新疆': ['克拉玛依', '吐鲁番', '哈密', '昌吉', '阿克苏', '喀什', '和田', '伊犁', '塔城', '阿勒泰'],
  '辽宁': ['鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
  '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城'],
  '黑龙江': ['齐齐哈尔', '鸡西', '鹤岗', '双鸭山', '大庆', '伊春', '佳木斯', '七台河', '牡丹江', '黑河', '绥化']
};

// 生成城市配置
function generateCityConfig(cityName, province) {
  const template = PROVINCE_TEMPLATES[province];

  return {
    level: '二线',  // 默认都是二线城市
    name: cityName,
    fundLimit: template.fundLimit,
    commercialRate: template.commercialRate,
    fundRate: {
      first: 2.6,
      second: 3.075
    },
    downPayment: template.downPayment,
    purchaseRestriction: template.purchaseRestriction,
    fundForeign: {
      enabled: true,
      socialSecurity: template.socialSecurity
    }
  };
}

// 生成所有城市配置代码
function generateAllCitiesCode() {
  let code = '';

  for (const [province, cities] of Object.entries(ALL_CITIES)) {
    code += `\n  // ${province}省\n`;

    for (const city of cities) {
      const config = generateCityConfig(city, province);
      code += `  '${city}': {\n`;
      code += `    level: '${config.level}',\n`;
      code += `    name: '${config.name}',\n`;
      code += `    fundLimit: {\n`;
      code += `      single: ${config.fundLimit.single},\n`;
      code += `      family: ${config.fundLimit.family},\n`;
      code += `      multiKid: ${config.fundLimit.multiKid}\n`;
      code += `    },\n`;
      code += `    commercialRate: {\n`;
      code += `      first: ${config.commercialRate.first},\n`;
      code += `      second: ${config.commercialRate.second}\n`;
      code += `    },\n`;
      code += `    fundRate: {\n`;
      code += `      first: ${config.fundRate.first},\n`;
      code += `      second: ${config.fundRate.second}\n`;
      code += `    },\n`;
      code += `    downPayment: {\n`;
      code += `      first: {\n`;
      code += `        ordinary: ${config.downPayment.first.ordinary},\n`;
      code += `        nonOrdinary: ${config.downPayment.first.nonOrdinary}\n`;
      code += `      },\n`;
      code += `      second: {\n`;
      code += `        ordinary: ${config.downPayment.second.ordinary},\n`;
      code += `        nonOrdinary: ${config.downPayment.second.nonOrdinary}\n`;
      code += `      }\n`;
      code += `    },\n`;
      code += `    purchaseRestriction: ${config.purchaseRestriction},\n`;
      code += `    fundForeign: {\n`;
      code += `      enabled: true,\n`;
      code += `      socialSecurity: ${config.fundForeign.socialSecurity}\n`;
      code += `    }\n`;
      code += `  },\n\n`;
    }
  }

  return code;
}

// 计算总城市数
function countTotalCities() {
  let total = 0;
  for (const cities of Object.values(ALL_CITIES)) {
    total += cities.length;
  }
  return total;
}

// 如果直接运行这个文件，输出配置代码
if (require.main === module) {
  console.log('========================================');
  console.log('城市配置生成器');
  console.log('========================================');
  console.log(`待生成城市数: ${countTotalCities()}个`);
  console.log('覆盖省份数: ' + Object.keys(ALL_CITIES).length + '个');
  console.log('========================================\n');
  console.log('生成的配置代码:\n');
  console.log(generateAllCitiesCode());
  console.log('\n========================================');
  console.log('✅ 代码生成完成！');
  console.log('请将上述代码复制到 cities-2026.js 文件中');
  console.log('插入位置：在"其他城市"默认配置之前');
  console.log('========================================');
}

module.exports = {
  generateCityConfig,
  generateAllCitiesCode,
  countTotalCities,
  ALL_CITIES,
  PROVINCE_TEMPLATES
};

# 部署指南 - 房贷计算器小程序

## 一、注册小程序账号

1. 打开 [mp.weixin.qq.com](https://mp.weixin.qq.com)，点击"立即注册" → 选择"小程序"
2. 填写邮箱、密码，完成邮箱验证
3. 选择主体类型（个人即可）
4. 完成注册后进入后台

## 二、获取 AppID

1. 登录小程序后台 → "开发管理" → "开发设置"
2. 复制 **AppID**
3. 打开项目 `src/project.config.json`，将 `appid` 字段改为你的 AppID：
   ```json
   "appid": "你的AppID"
   ```

## 三、开通云开发

1. 打开**微信开发者工具**，导入本项目（选 `src/` 目录为小程序根目录）
2. 点击顶部工具栏的 **"云开发"** 按钮
3. 点击 "开通" → 创建环境，名称填 `mortgage-prod`（或其他名称）
4. 记下 **环境 ID**（如 `mortgage-prod-xxxxx`）
5. 打开 `src/app.js`，将环境 ID 填入：
   ```js
   globalData: {
     cloudEnvId: "mortgage-prod-xxxxx",  // ← 填你的环境 ID
   }
   ```

## 四、初始化数据库

### 4.1 创建集合

1. 在云开发控制台 → "数据库"
2. 点击 "+" 创建集合，名称填 `mortgage_config`

### 4.2 生成初始数据

在项目根目录执行：

```bash
node cloud/database/init-data.js
```

会生成 `cloud/database/mortgage_config.json`。

### 4.3 导入数据

1. 在云开发控制台 → 数据库 → `mortgage_config` 集合
2. 点击 "导入" → 选择 `cloud/database/mortgage_config.json`
3. 冲突模式选 "upsert"（有则更新，无则新增）
4. 确认导入

导入后应该能看到 300+ 条文档（城市配置 + LPR + 元信息）。

## 五、部署云函数

### 5.1 部署 getLatestData

1. 在微信开发者工具中，右键点击 `cloud/functions/getLatestData`
2. 选择 "上传并部署: 云端安装依赖"
3. 等待部署完成

### 5.2 部署 updateLprData

1. 右键点击 `cloud/functions/updateLprData`
2. 选择 "上传并部署: 云端安装依赖"
3. 等待部署完成

### 5.3 配置定时触发器

1. 部署 `updateLprData` 后，右键 → "上传触发器"
2. 触发器配置在 `config.json` 中，已设为每月 21 日 10:00 自动执行

也可以在云开发控制台手动测试：云函数 → updateLprData → "云端测试"

## 六、提交审核上线

1. 微信开发者工具 → 点击 "上传"
2. 填写版本号（如 1.0.0）和描述
3. 登录小程序后台 → "管理" → "版本管理"
4. 找到刚上传的开发版 → 提交审核
5. 审核通过后 → 点击 "发布"

## 七、日常数据更新

### 自动更新（LPR 利率）
- `updateLprData` 云函数每月 21 日自动执行
- 如果 LPR 有变化，会自动更新数据库
- 用户下次打开小程序会自动获取最新数据

### 手动更新（城市政策）
当某个城市出台新政策时：
1. 打开云开发控制台 → 数据库 → `mortgage_config`
2. 搜索 `city_上海`（或对应城市）
3. 直接编辑字段（如修改首付比例、利率等）
4. 保存即生效，无需重新发版

### 手动更新元信息
更新数据后记得更新 metadata：
1. 找到 `_id` 为 `metadata` 的文档
2. 更新 `lastUpdate`、`version` 字段

## 项目结构

```
├── src/                    # 小程序代码
│   ├── services/
│   │   └── data-service.js # 数据服务层（云端→缓存→本地）
│   ├── config/
│   │   └── cities-2026.js  # 本地兜底数据
│   └── ...
│
├── cloud/                  # 云开发
│   ├── functions/
│   │   ├── getLatestData/  # 获取最新数据的云函数
│   │   └── updateLprData/  # 自动更新LPR的云函数（定时触发）
│   └── database/
│       ├── init-data.js    # 初始化脚本
│       └── mortgage_config.json  # 生成的导入文件
```

## 常见问题

**Q: 云端拉取数据失败怎么办？**
A: DataService 会自动降级使用本地 `cities-2026.js` 的数据，功能不受影响。

**Q: 免费额度够用吗？**
A: 免费额度 5 万次/月读写，加上 24h 缓存策略，日活数千也够用。

**Q: 如何知道定时任务是否执行成功？**
A: 云开发控制台 → 云函数 → updateLprData → "日志"，可以看到每次执行结果。

# ⛰️ 富春居 (Fuchun) - Vercel 静态版

> **长久富足，安稳生活**

基于《富春山居图》意境的智能财务顾问系统 —— 纯前端静态版本。

---

## 🌟 特性

- ✅ **纯静态页面** - 无需后端服务器，Vercel/Netlify/GitHub Pages 完美支持
- ✅ **多智能体逻辑** - JavaScript 完整实现 4 位 AI 智者的分析逻辑
- ✅ **水墨山水 UI** - 富春山居图配色的优雅界面
- ✅ **响应式设计** - 适配桌面、平板、手机

---

## 🚀 部署到 Vercel

### 方式一：GitHub + Vercel（推荐）

#### 1. 创建 GitHub 仓库
1. 访问 https://github.com/new
2. 仓库名填写 `fuchun`
3. 选择 **Public**（公开）
4. 点击 **Create repository**

#### 2. 上传代码
在 `C:\Users\lenovo\Desktop\fuchun-vercel\` 文件夹中：

```bash
cd C:\Users\lenovo\Desktop\fuchun-vercel

# 初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 关联远程仓库（替换 your-username 为你的 GitHub 用户名）
git remote add origin https://github.com/your-username/fuchun.git

# 推送
git branch -M main
git push -u origin main
```

如果没有安装 git，可以：
1. 下载安装：https://git-scm.com/download/win
2. 或使用 GitHub Desktop 可视化操作

#### 3. 部署到 Vercel
1. 访问 https://vercel.com
2. 点击 **Sign Up**，用 GitHub 账号登录
3. 点击 **Add New Project**
4. 选择 `fuchun` 仓库
5. 点击 **Deploy**

等待约 1 分钟，即可获得 HTTPS 链接：
```
https://fuchun-yourusername.vercel.app
```

---

### 方式二：直接拖拽（最简单）

1. 访问 https://vercel.com
2. 注册/登录账号
3. 在 Dashboard 中点击 **Add New Project**
4. 选择 **Import Git Repository** 下方的 **Upload**
5. 将 `fuchun-vercel` 文件夹压缩成 zip
6. 拖拽上传 zip 文件
7. 点击 **Deploy**

---

## 📁 文件结构

```
fuchun-vercel/
├── index.html          # 首页入口
├── css/
│   └── style.css       # 富春山居主题样式
├── js/
│   └── app.js          # 多智能体分析逻辑
├── vercel.json         # Vercel 配置
└── README.md           # 使用说明
```

---

## 🎨 界面预览

| 区域 | 功能 |
|------|------|
| **Hero** | 品牌展示 + 开始按钮 |
| **案例选择** | 月光族小张 / 存钱达人小李 |
| **财务概览** | 总支出、储蓄率、健康等级、节省潜力 |
| **消费分析** | 分类占比 + 消费洞察 |
| **智者议事** | 4位AI专家的观点展示 |
| **预算方略** | 50/30/20法则 + 储蓄挑战 |
| **行动指南** | 按优先级排序的改进建议 |

---

## 🧠 技术说明

### 多智能体逻辑

```javascript
// 4位AI智者
const agents = {
  accountant:    // 记账先生 - 账单分析
  budgetOfficer: // 预算主事 - 预算规划
  savingsAdvisor:// 储蓄谋士 - 储蓄建议
  riskManager:   // 风控管家 - 风险评估
}
```

### 分析流程
1. **账单解析** - 统计消费分类、计算占比
2. **智能体分析** - 4位智者分别给出观点
3. **综合报告** - 整合生成最终建议

---

## 🔧 自定义修改

### 修改案例数据
编辑 `js/app.js` 中的 `mockData`：

```javascript
const mockData = {
    caseA: {
        name: "月光族小张",
        income: 8000,
        bills: [
            { category: "餐饮", amount: 3500, ... },
            // 添加/修改账单
        ]
    }
};
```

### 修改配色
编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --mountain-green: #5B7A5E;
    --water-blue: #7A9E8E;
    --cloud-white: #F7F3E9;
    --ink-brown: #6B5344;
    --ochre: #A67B5B;
}
```

---

## 🌐 绑定自定义域名

1. 在 Vercel Dashboard 中选择项目
2. 点击 **Settings** → **Domains**
3. 输入你的域名（如 `fuchun.com`）
4. 按照提示添加 DNS 记录
5. 等待 SSL 证书自动配置

---

## 📞 常见问题

### Q: 如何更新网站？
**A:** 修改代码后重新推送：
```bash
git add .
git commit -m "Update"
git push
```
Vercel 会自动重新部署。

### Q: 访问速度慢？
**A:** Vercel 有全球 CDN，国内访问可能稍慢。可以：
- 使用 Vercel 的 Edge Network
- 或者部署到国内平台（如腾讯云开发）

### Q: 可以添加后端吗？
**A:** 可以。Vercel 支持 Serverless Functions，但纯静态版本更适合展示和演示。

---

## 📜 许可证

MIT License

---

**富春居** · 愿您在富春山居之间，找到属于自己的财富之道 ⛰️

// ==================== 富春居 - 多智能体财务分析系统 ====================

// 模拟数据
const mockData = {
    caseA: {
        name: "月光族小张",
        income: 8000,
        bills: [
            { category: "餐饮", amount: 3500, date: "2024-01-01" },
            { category: "购物", amount: 2000, date: "2024-01-02" },
            { category: "娱乐", amount: 1500, date: "2024-01-03" },
            { category: "交通", amount: 500, date: "2024-01-04" },
            { category: "日用", amount: 300, date: "2024-01-05" },
            { category: "人情", amount: 200, date: "2024-01-06" }
        ]
    },
    caseB: {
        name: "存钱达人小李",
        income: 8000,
        bills: [
            { category: "餐饮", amount: 2000, date: "2024-01-01" },
            { category: "购物", amount: 800, date: "2024-01-02" },
            { category: "娱乐", amount: 500, date: "2024-01-03" },
            { category: "交通", amount: 400, date: "2024-01-04" },
            { category: "日用", amount: 300, date: "2024-01-05" },
            { category: "住房", amount: 1500, date: "2024-01-06" },
            { category: "储蓄", amount: 2500, date: "2024-01-07" }
        ]
    }
};

// 当前选中的案例
let currentCase = 'caseA';

// 智能体分析结果
let analysisResult = null;

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', () => {
    initCaseSelector();
    initTabs();
    initStartButton();
    initSmoothScroll();
});

// ==================== 案例选择 ====================
function initCaseSelector() {
    const caseButtons = document.querySelectorAll('.case-btn');

    caseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            caseButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCase = btn.dataset.case === 'a' ? 'caseA' : 'caseB';
        });
    });
}

// ==================== 标签页切换 ====================
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            // 切换按钮状态
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 切换内容
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${tabName}`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// ==================== 开始分析 ====================
function initStartButton() {
    const startBtn = document.getElementById('startAnalysis');
    startBtn.addEventListener('click', startAnalysis);
}

async function startAnalysis() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const resultsPanel = document.getElementById('resultsPanel');

    // 显示加载动画
    loadingOverlay.style.display = 'flex';

    // 模拟分析延迟
    await sleep(1500);

    // 执行多智能体分析
    const data = mockData[currentCase];
    analysisResult = conductTeamMeeting(data);

    // 隐藏加载动画
    loadingOverlay.style.display = 'none';

    // 显示结果
    resultsPanel.style.display = 'block';
    displayResults(analysisResult);

    // 滚动到结果区域
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================== 多智能体会议 ====================
function conductTeamMeeting(userData) {
    // 1. 记账员分析
    const billAnalysis = analyzeBills(userData.bills);

    // 2. 各智能体发表观点
    const context = {
        income: userData.income,
        period: '近3个月',
        bills: userData.bills,
        statistics: billAnalysis
    };

    const opinions = {
        accountant: accountantAgent.analyze(context),
        budgetOfficer: budgetOfficerAgent.analyze(context),
        savingsAdvisor: savingsAdvisorAgent.analyze(context),
        riskManager: riskManagerAgent.analyze(context)
    };

    // 3. 生成最终报告
    const finalReport = generateFinalReport(context, opinions);

    return {
        billAnalysis,
        opinions,
        finalReport,
        userData
    };
}

// 记账员分析
function analyzeBills(bills) {
    const categories = {};
    let total = 0;

    bills.forEach(bill => {
        if (!categories[bill.category]) {
            categories[bill.category] = 0;
        }
        categories[bill.category] += bill.amount;
        total += bill.amount;
    });

    // 计算百分比
    const percentages = {};
    for (const [cat, amount] of Object.entries(categories)) {
        percentages[cat] = (amount / total * 100).toFixed(1);
    }

    // 生成洞察
    const insights = [];
    const anomalies = [];

    // 检查高消费类别
    for (const [cat, pct] of Object.entries(percentages)) {
        if (parseFloat(pct) > 40) {
            insights.push(`${cat}占比较高(${pct}%)，建议适当控制`);
        }
    }

    // 检查是否有储蓄
    if (!categories['储蓄'] || categories['储蓄'] < total * 0.1) {
        insights.push('当前储蓄率偏低，建议增加储蓄规划');
    }

    return {
        total,
        categories,
        percentages,
        insights,
        anomalies
    };
}

// ==================== 智能体定义 ====================
const accountantAgent = {
    name: '记账先生',
    analyze(context) {
        const stats = context.statistics;
        return {
            agent_name: '记账先生',
            opinion: `经过详细核算，您的总支出为${stats.total}元。其中${Object.entries(stats.categories).sort((a, b) => b[1] - a[1])[0][0]}支出最高，建议重点关注。`,
            confidence: 0.95,
            key_points: ['支出结构清晰', '餐饮类占比较高', '需要优化消费习惯']
        };
    }
};

const budgetOfficerAgent = {
    name: '预算主事',
    analyze(context) {
        const income = context.income;
        return {
            agent_name: '预算主事',
            opinion: `根据您的月收入${income}元，建议采用50/30/20分配法则：必需支出不超过${income * 0.5}元，品质生活${income * 0.3}元，储蓄目标${income * 0.2}元。`,
            confidence: 0.88,
            key_points: ['50/30/20法则适用', '当前支出略超预算', '需要建立消费限额']
        };
    }
};

const savingsAdvisorAgent = {
    name: '储蓄谋士',
    analyze(context) {
        const stats = context.statistics;
        const potential = stats.total * 0.15;
        return {
            agent_name: '储蓄谋士',
            opinion: `通过优化消费结构，您每月有望节省${potential.toFixed(0)}元。建议采用「52周存钱法」，一年可积累${potential.toFixed(0) * 12}元储蓄。`,
            confidence: 0.82,
            key_points: ['节省潜力约15%', '建议52周存钱法', '可设立紧急基金']
        };
    }
};

const riskManagerAgent = {
    name: '风控管家',
    analyze(context) {
        const income = context.income;
        const stats = context.statistics;
        const savingsRate = ((income - stats.total) / income * 100);

        let level, conclusion;
        if (savingsRate >= 20) {
            level = 'A';
            conclusion = '财务状况健康，建议保持';
        } else if (savingsRate >= 10) {
            level = 'B';
            conclusion = '财务状况良好，有提升空间';
        } else if (savingsRate >= 0) {
            level = 'C';
            conclusion = '财务风险中等，需要优化';
        } else {
            level = 'D';
            conclusion = '财务风险较高，急需调整';
        }

        return {
            agent_name: '风控管家',
            opinion: `财务健康等级：${level}。${conclusion}。当前储蓄率${savingsRate.toFixed(1)}%，${savingsRate < 20 ? '低于' : '达到'}建议水平。`,
            confidence: 0.90,
            key_points: [`健康等级${level}`, '储蓄率需关注', '建议建立应急金']
        };
    }
};

// ==================== 生成最终报告 ====================
function generateFinalReport(context, opinions) {
    const income = context.income;
    const stats = context.statistics;
    const savingsRate = ((income - stats.total) / income * 100);

    let healthLevel;
    if (savingsRate >= 20) healthLevel = 'A';
    else if (savingsRate >= 10) healthLevel = 'B';
    else if (savingsRate >= 0) healthLevel = 'C';
    else healthLevel = 'D';

    // 生成行动清单
    const actionItems = [];

    if (healthLevel === 'C' || healthLevel === 'D') {
        actionItems.push({
            priority: '高',
            action: '立即削减非必要支出',
            expected_impact: `每月节省${(stats.total * 0.15).toFixed(0)}元`
        });
    }

    actionItems.push({
        priority: '中',
        action: '执行50/30/20预算法则',
        expected_impact: `建立${(income * 0.2).toFixed(0)}元月储蓄习惯`
    });

    if (stats.categories['餐饮'] && stats.categories['餐饮'] > income * 0.25) {
        actionItems.push({
            priority: '低',
            action: '减少外出就餐，增加自炊',
            expected_impact: `每月节省${(stats.categories['餐饮'] * 0.3).toFixed(0)}元`
        });
    }

    return {
        summary: {
            total_expense: stats.total,
            savings_rate: savingsRate,
            health_level: healthLevel,
            main_conclusion: `您的财务健康等级为${healthLevel}级，${healthLevel <= 'B' ? '建议继续保持' : '建议优先建立储蓄习惯'}。`
        },
        budget_plan: {
            income: income,
            essential: { limit: income * 0.5 },
            discretionary: { limit: income * 0.3 },
            savings: { target: income * 0.2 }
        },
        savings_plan: {
            total_monthly_potential: stats.total * 0.15,
            three_month_goal: stats.total * 0.15 * 3,
            recommended_challenge: '52周存钱法'
        },
        action_items: actionItems,
        next_month_goal: {
            target_savings: Math.max(income * 0.2, income - stats.total),
            reduced_categories: healthLevel >= 'C' ? ['娱乐', '购物'] : ['餐饮'],
            expected_balance: income - stats.total * 0.85
        }
    };
}

// ==================== 显示结果 ====================
function displayResults(result) {
    // 概览指标
    document.getElementById('totalExpense').textContent = `¥${result.billAnalysis.total.toFixed(0)}`;
    document.getElementById('savingsRate').textContent = `${result.finalReport.summary.savings_rate.toFixed(1)}%`;

    const gradeElement = document.getElementById('healthGrade');
    gradeElement.textContent = result.finalReport.summary.health_level;
    gradeElement.className = `metric-grade grade-${result.finalReport.summary.health_level.toLowerCase()}`;

    document.getElementById('savingsPotential').textContent = `¥${result.finalReport.savings_plan.total_monthly_potential.toFixed(0)}`;

    // 消费分析
    displayConsumptionAnalysis(result.billAnalysis);

    // 智者观点
    displayExpertOpinions(result.opinions);

    // 预算方略
    displayBudgetPlan(result.finalReport.budget_plan, result.finalReport.savings_plan);

    // 行动指南
    displayActionItems(result.finalReport.action_items);
}

function displayConsumptionAnalysis(billAnalysis) {
    const listContainer = document.getElementById('consumptionList');
    const insightsContainer = document.getElementById('insightsList');

    // 排序消费类别
    const sortedCats = Object.entries(billAnalysis.categories).sort((a, b) => b[1] - a[1]);

    listContainer.innerHTML = sortedCats.map(([cat, amount]) => {
        const pct = billAnalysis.percentages[cat];
        return `
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-label">${cat}</span>
                    <span class="progress-value">¥${amount} (${pct}%)</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${pct}%"></div>
                </div>
            </div>
        `;
    }).join('');

    // 洞察
    insightsContainer.innerHTML = billAnalysis.insights.map(insight => `
        <div class="insight-item">◆ ${insight}</div>
    `).join('');
}

function displayExpertOpinions(opinions) {
    document.getElementById('accountantOpinion').textContent = `「${opinions.accountant.opinion}」`;
    document.getElementById('budgetOpinion').textContent = `「${opinions.budgetOfficer.opinion}」`;
    document.getElementById('savingsOpinion').textContent = `「${opinions.savingsAdvisor.opinion}」`;
    document.getElementById('riskOpinion').textContent = `「${opinions.riskManager.opinion}」`;
}

function displayBudgetPlan(budgetPlan, savingsPlan) {
    document.getElementById('essentialBudget').textContent = `¥${budgetPlan.essential.limit.toFixed(0)}`;
    document.getElementById('discretionaryBudget').textContent = `¥${budgetPlan.discretionary.limit.toFixed(0)}`;
    document.getElementById('savingsBudget').textContent = `¥${budgetPlan.savings.target.toFixed(0)}`;

    document.getElementById('monthlyPotential').textContent = `¥${savingsPlan.total_monthly_potential.toFixed(0)}`;
    document.getElementById('threeMonthGoal').textContent = `¥${savingsPlan.three_month_goal.toFixed(0)}`;
    document.getElementById('recommendedChallenge').textContent = savingsPlan.recommended_challenge;
}

function displayActionItems(actionItems) {
    const container = document.getElementById('actionList');

    container.innerHTML = actionItems.map(item => {
        const priorityClass = item.priority === '高' ? 'high' : item.priority === '中' ? 'medium' : 'low';
        return `
            <div class="action-item ${priorityClass}">
                <div class="action-header">
                    <span class="action-title">${item.action}</span>
                    <span class="action-priority">${item.priority}优先级</span>
                </div>
                <div class="action-impact">💡 预期效果：${item.expected_impact}</div>
            </div>
        `;
    }).join('');
}

// ==================== 平滑滚动 ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 2px 30px rgba(91, 122, 94, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(91, 122, 94, 0.08)';
    }

    // 更新导航激活状态
    const sections = ['home', 'analysis', 'experts', 'about'];
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
        const element = document.getElementById(section);
        const link = document.querySelector(`a[href="#${section}"]`);

        if (element && link) {
            const top = element.offsetTop;
            const bottom = top + element.offsetHeight;

            if (scrollPos >= top && scrollPos < bottom) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

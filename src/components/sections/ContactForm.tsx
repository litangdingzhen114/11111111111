"use client";

export default function ContactForm() {
  const openMail = () => {
    window.location.href =
      "mailto:sunmoe.dev@gmail.com?subject=作品集项目沟通";
  };

  return (
    <div className="rounded-[8px] border border-white/[0.06] bg-white/[0.02] p-5 sm:rounded-2xl sm:p-8">
      <h2 className="text-xl font-bold text-[var(--site-text)] mb-6">快速留言</h2>
      <form className="space-y-5 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--site-muted)] mb-2">姓名</label>
          <input type="text" id="name" placeholder="你的名字"
            className="w-full rounded-xl border border-[var(--site-line)] bg-[var(--site-panel)] px-4 py-3 text-sm text-[var(--site-text)] placeholder:text-[var(--site-muted)] transition-all focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--site-muted)] mb-2">邮箱</label>
          <input type="email" id="email" placeholder="you@example.com"
            className="w-full rounded-xl border border-[var(--site-line)] bg-[var(--site-panel)] px-4 py-3 text-sm text-[var(--site-text)] placeholder:text-[var(--site-muted)] transition-all focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
        </div>
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-[var(--site-muted)] mb-2">项目类型</label>
          <select id="project"
            className="w-full rounded-xl border border-[var(--site-line)] bg-[var(--site-panel)] px-4 py-3 text-sm text-[var(--site-muted)] transition-all focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20">
            <option value="">选择项目类型</option>
            <option value="web-app">Web 应用</option>
            <option value="saas">SaaS 产品</option>
            <option value="ai">AI 功能集成</option>
            <option value="consulting">产品咨询</option>
            <option value="other">其他</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[var(--site-muted)] mb-2">项目说明</label>
          <textarea id="message" rows={5} placeholder="简单介绍一下你的项目..."
            className="w-full rounded-xl border border-[var(--site-line)] bg-[var(--site-panel)] px-4 py-3 text-sm text-[var(--site-text)] placeholder:text-[var(--site-muted)] transition-all resize-none focus:border-primary/30 focus:outline-none focus:ring-1 focus:ring-primary/20" />
        </div>
        <button type="button" onClick={openMail}
          className="site-primary-cta w-full rounded-xl py-3 text-sm font-semibold transition-all hover:scale-[1.01]">
          打开邮箱联系我
        </button>
        <p className="text-center text-xs text-[var(--site-muted-strong)]">当前表单用于整理沟通信息，实际发送会打开邮箱。</p>
      </form>
    </div>
  );
}

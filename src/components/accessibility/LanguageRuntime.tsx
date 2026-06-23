"use client";

import { useEffect } from "react";

type Language = "zh" | "en";

const storageKey = "sunmaosun-accessibility";

const phrasePairs = [
  ["你好，我是 Nuss👋", "Hello,I'm Nuss👋"],
  ["作品", "Work"],
  ["关于", "About"],
  ["流程", "Process"],
  ["联系", "Contact"],
  ["联系我", "Contact Me"],
  ["切换菜单", "Toggle menu"],
  ["核心能力", "Capabilities"],
  ["代表项目", "Selected Work"],
  ["关于我", "About"],
  ["方法流程", "Process"],
  ["技术栈", "Stack"],
  ["项目笔记", "Notes"],
  ["复盘", "Reflection"],
  ["实践经历", "Experience"],
  ["下一次合作", "Next Project"],
  ["角色", "Role"],
  ["年份", "Year"],
  ["重点", "Focus"],
  ["指标", "Metric"],
  ["运行中", "Live"],
  ["概览", "Overview"],
  ["数据", "Data"],
  ["导出", "Export"],
  ["消费者对话", "Consumer Chat"],
  ["商家后台", "Merchant Console"],
  ["节点画布", "Node Canvas"],
  ["素材时间线", "Asset Timeline"],
  ["患者档案", "Patient Profile"],
  ["随访报告", "Follow-up Report"],
  ["品牌画册", "Lookbook"],
  ["结算流程", "Checkout Flow"],
  ["社团首页", "Club Home"],
  ["活动归档", "Activity Archive"],
  ["体验地图", "Experience Map"],
  ["界面研究", "Interface Study"],
  ["返回作品列表", "Back to Work"],
  ["上一个", "Previous"],
  ["下一个", "Next"],
  ["场景拆解、流程设计、可演示原型与复盘沉淀", "Scenario mapping, flow design, demo prototypes, and case reflection"],
  ["技术栈与产品能力", "Tool Stack and Product Capabilities"],
  ["技术选择服务于原型验证：前端负责交互表达，后端负责能力接入，数据结构负责让流程可追踪、可复盘。", "The stack serves prototype validation: frontend expresses interaction, backend connects capabilities, and data structures keep flows traceable and reviewable."],
  ["从问题到原型", "From Problem to Prototype"],
  ["先明确场景和边界，再落到交互、数据、AI 能力接入和验证指标。", "Define the scenario and boundaries first, then move into interaction, data, AI integration, and validation metrics."],

  ["AI 产品 / 小程序 / Web 原型", "AI Product / Mini Program / Web Prototypes"],
  ["这里放着我最近做过的一些项目：客服 Agent、短剧创作工具、康复小程序，也有几个 Web 和小程序练习。我尽量把“为什么做、怎么做、做到哪一步”讲清楚。", "Here are some recent projects: a support Agent, a short drama creation tool, a rehab mini program, plus a few web and mini program experiments. I try to explain why I made them, how I made them, and how far each one got."],
  ["最近在看：客服 Agent / AIGC 创作流程 / 医疗与电商小程序", "Recently exploring: support Agents / AIGC creation flows / healthcare and commerce mini programs"],
  ["会做一点产品，也会把原型写出来。", "I think through products, and I can build the prototype too."],
  ["我更习惯先把问题讲明白，再动手做一个能点、能跑、能继续改的小版本。", "I like making the problem clear first, then building a small version people can click, run, and keep improving."],
  ["产品拆解", "Product Breakdown"],
  ["先把用户、任务和限制条件讲清楚，再决定 AI 应该出现在哪一步。", "Clarify the user, task, and constraints first, then decide where AI should appear."],
  ["用 React、Next.js、Vite 和微信小程序把想法做成能点开的页面。", "Use React, Next.js, Vite, and WeChat Mini Programs to turn ideas into clickable screens."],
  ["后端与接口", "Backend and APIs"],
  ["需要接口、数据库或流式回复时，会先用 FastAPI、Express 和 SQLite 搭出能跑的版本。", "When a project needs APIs, data, or streaming responses, I use FastAPI, Express, and SQLite to build a working version first."],
  ["反馈观察", "Reading Feedback"],
  ["会看对话记录、播放量、打卡数据这些反馈，判断哪里真的有用，哪里只是看起来完整。", "I look at chat logs, views, and check-in data to see what is actually useful and what only looks complete."],
  ["先看项目，", "Start with the projects,"],
  ["再看我是怎么想的。", "then how I thought about them."],
  ["我把几个比较能代表方向的项目放在前面：电商 Agent、AIGC 短剧工具和康复小程序。比起只放截图，我更想讲清楚当时的问题和我的处理方式。", "I put the most representative projects first: an e-commerce Agent, an AIGC short drama tool, and a rehab mini program. Instead of only showing screenshots, I want to explain the problem and how I handled it."],
  ["我喜欢把想法做成能点开的原型。", "I like turning ideas into clickable prototypes."],
  ["有些项目从需求开始，有些从一个页面开始。我会先把任务拆清楚，再用前端、小程序或简单后端把它跑起来，方便继续讨论和修改。", "Some projects start from a requirement, others from a single page. I break down the task first, then use frontend, mini programs, or a simple backend to make it run so it can be discussed and improved."],
  ["流程整理", "Flow Cleanup"],
  ["内容表达", "Content Expression"],
  ["一个想法要先变具体，", "An idea has to become concrete,"],
  ["才能写成页面。", "before it can become a page."],
  ["我通常先问：谁会用、卡在哪里、哪些事不能让 AI 乱做。答案清楚以后，再开始画页面和写原型。", "I usually ask: who will use it, where they get stuck, and what AI must not do carelessly. Once that is clear, I start drawing screens and building the prototype."],
  ["看问题", "Look at the Problem"],
  ["先确认谁会用、想完成什么、现在卡在哪里，而不是一上来就想功能。", "First understand who will use it, what they want to do, and where they are stuck instead of jumping straight to features."],
  ["划红线", "Draw the Lines"],
  ["想清楚哪些事 AI 可以做，哪些必须转人工，哪些回答不能让模型随便编。", "Decide what AI can handle, what must go to a human, and what the model must not make up."],
  ["拆页面", "Break into Screens"],
  ["把需求拆成页面、状态、输入输出和异常情况，先让结构能被看懂。", "Break requirements into screens, states, inputs, outputs, and edge cases so the structure is easy to understand."],
  ["做出来", "Build It"],
  ["用前端、小程序、后端代理和 API 接入做一个小版本，先看到真实交互。", "Use frontend, mini programs, backend proxies, and APIs to build a small version and see the interaction."],
  ["回头改", "Revise"],
  ["根据日志、内容数据和实际体验继续改，不把第一次做出来的东西当最终答案。", "Keep improving based on logs, content data, and actual use instead of treating the first version as final."],
  ["这些工具让我", "These tools help me"],
  ["少停在 PPT 里。", "spend less time stuck in slides."],
  ["前端负责把体验做出来，后端负责接接口和数据。先跑通一个小版本，再慢慢补细节。", "Frontend makes the experience visible, backend connects APIs and data. I run a small version first, then fill in the details."],
  ["做 DTC Agent 时我最有感的是：聊天框不难，难的是它什么时候该查订单、什么时候该停下来交给人工。", "What stood out to me while building the DTC Agent: the chat box is easy; the hard part is knowing when to check an order and when to stop and hand it to a human."],
  ["做 Frieren 时我发现，AIGC 麻烦的地方不是生成一次，而是角色、分镜和素材要能接着用。", "While building Frieren, I found that the hard part of AIGC is not one generation, but keeping characters, storyboards, and assets reusable."],
  ["AI 产品方向 / 应用搭建", "AI Product Direction / Prototype Development"],
  ["用代码把项目和想法慢慢整理出来", "Using code to organize projects and ideas over time"],
  ["把短剧创作拆成一步步能接上的节点", "Break short drama creation into connected steps"],
  ["页面里的截图来自本地原型：画布负责摆放流程，节点记录每一步输入和结果，任务状态告诉创作者现在生成到哪里、失败了要怎么继续。", "The screenshots come from the local prototype: the canvas lays out the flow, nodes record each input and result, and task states show what is generating and how to continue after failures."],
  ["节点拆分", "Node Breakdown"],
  ["把创意、剧本、角色、分镜和视频生成拆成独立节点，让每一步的输入输出更清楚。", "Break ideas, scripts, characters, storyboards, and video generation into separate nodes so each step is clearer."],
  ["生成调度", "Generation Scheduling"],
  ["围绕 Gemini、Sora 2、Seedance 2.0 规划模型选择、排队、失败重试和降级方案。", "Plan model choice, queues, retries, and fallbacks around Gemini, Sora 2, and Seedance 2.0."],
  ["素材复用", "Asset Reuse"],
  ["让角色设定、参考图、分镜图和视频片段可以继续使用，而不是散落在聊天记录里。", "Keep character settings, references, storyboards, and clips reusable instead of scattered in chats."],
  ["让客服 Agent 知道什么时候该查、什么时候该停", "Teach the support Agent when to check and when to stop"],
  ["这个项目不是单纯做一个聊天框。用户问政策、查订单、要优惠券、投诉升级时，Agent 需要先判断意图，再决定调用哪个工具；如果信息不够或风险太高，就停下来交给人工。", "This project is not just a chat box. When users ask about policies, orders, coupons, or escalation, the Agent first reads intent, then chooses a tool. If information is missing or risk is high, it stops and hands off to a human."],
  ["意图和工具分开", "Separate Intent and Tools"],
  ["政策问答、订单查询、商品推荐、优惠券和升级记录都走不同工具，减少模型乱编动作。", "Policy Q&A, order lookup, product recommendations, coupons, and escalation records each use separate tools to reduce made-up actions."],
  ["敏感问题停一下", "Pause on Sensitive Cases"],
  ["订单查询要同时有订单号和邮箱；退款、医疗反应、低置信度问题都进入人工复核。", "Order lookup needs both order number and email; refunds, medical reactions, and low-confidence cases go to human review."],
  ["商家能看到结果", "Make Results Visible to Merchants"],
  ["mock 看板会显示意图分布、升级率、优惠券触发、热门问题和推荐商品，方便判断哪里最常被问。", "The mock dashboard shows intent distribution, escalation rate, coupons, popular questions, and recommended products so merchants can see what comes up most."],
  ["把康复记录、初筛和随访放到一个小程序里", "Put rehab records, pre-checks, and follow-up into one mini program"],
  ["康复不是问完一次就结束。这个原型让患者先补充资料，再做 AI 初筛和训练打卡；系统根据疼痛、训练时长和异常情况提醒风险，并生成 7 天周报给医生复核。", "Rehab does not end after one question. This prototype lets patients fill in records, complete an AI pre-check, and log training. The system reminds risks based on pain, training time, and abnormal signals, then generates a 7-day report for doctors."],
  ["AI 初筛结果", "AI Pre-check Results"],
  ["资料袋与分诊材料", "Records and Triage Materials"],
  ["先把起病时间、症状、功能受限、既往治疗和康复目标整理好，医生复核时不用到处找信息。", "Organize onset time, symptoms, functional limits, prior treatment, and rehab goals so doctors do not have to search for context."],
  ["在微信里做一个更像品牌店的小程序", "Build a mini program that feels more like a brand store"],
  ["LEMANISM 的重点不是堆一个复杂商城，而是在微信里做一个更轻的购物体验：", "LEMANISM is not about building a complex mall, but a lighter shopping experience inside WeChat:"],
  ["Lookbook、活动和会员中心负责把内容、预约和浏览记录留住。", "Lookbook, events, and the member center keep content, bookings, and browsing history in place."],
  ["品牌感觉", "Brand Feeling"],
  ["记录留住", "Keep Records"],
  ["收藏、最近浏览和活动预约写入本地记录，为会员中心、推荐和 AI 试穿扩展留下位置。", "Favorites, recent views, and event bookings are saved locally, leaving room for member pages, recommendations, and AI try-on."],
  ["需求拆解、页面原型、接口接入和后续修改", "Requirement breakdown, page prototype, API connection, and later revision"],
  ["这版原型用了什么", "What this prototype uses"],
  ["技术不单独炫技，只服务于这个原型能不能跑起来。", "Technology is not there to show off; it serves whether the prototype can actually run."],
  ["先弄清楚谁会用、要解决什么，再落到页面、数据、接口和必要的 AI 能力。", "Clarify who uses it and what problem it solves, then move into screens, data, APIs, and the AI pieces that are actually needed."],

  ["AI 产品经理方向 / 项目作品集", "AI Product Manager / Project Portfolio"],
  ["AI 产品经理 &", "AI Product Manager &"],
  ["应用开发者", "Prototype Builder"],
  ["我把 Agent、AIGC 工作流、小程序和 Web 项目整理在这里，记录从场景拆解、产品流程到可演示原型的完整过程。", "I collect Agent, AIGC workflow, mini program, and web projects here, showing the full path from scenario mapping and product flow to demo-ready prototypes."],
  ["查看作品", "View Work"],
  ["看我的方法", "My Process"],
  ["当前重点：AI Agent / AIGC 工作流 / 垂直行业 AI 助手", "Current focus: AI Agent / AIGC Workflow / Vertical AI Assistants"],

  ["不是单点技能，而是一套从产品判断到原型交付的能力组合。", "Not a single skill, but a capability set from product judgment to prototype delivery."],
  ["我把重点放在 AI 产品的流程设计、边界控制和可演示实现之间的连接，让想法尽快变成能被体验和验证的东西。", "I focus on the connection between AI product flow design, boundary control, and demoable implementation, so ideas can be experienced and validated quickly."],
  ["AI 产品设计", "AI Product Design"],
  ["围绕 Agent、RAG、AIGC 工作流和垂直行业助手，拆解用户场景、MVP 范围、流程和风险边界。", "Break down user scenarios, MVP scope, flows, and risk boundaries around Agents, RAG, AIGC workflows, and vertical AI assistants."],
  ["交互原型", "Interactive Prototypes"],
  ["使用 React、Next.js、TypeScript、Vite、Tailwind CSS 和微信小程序快速做出可演示的产品原型。", "Use React, Next.js, TypeScript, Vite, Tailwind CSS, and WeChat Mini Programs to build demoable product prototypes quickly."],
  ["全栈落地", "Full-stack Delivery"],
  ["用 FastAPI、Express、SQLite、JSON 数据服务和流式接口，把 AI 能力接到真实页面和业务流程里。", "Connect AI capabilities into real pages and business flows with FastAPI, Express, SQLite, JSON data services, and streaming APIs."],
  ["内容与数据验证", "Content and Data Validation"],
  ["通过对话日志、意图分布、打卡指标、内容播放数据等反馈，判断原型是否真的解决问题。", "Use chat logs, intent distribution, check-in metrics, and content data to judge whether a prototype actually solves the problem."],

  ["先看真实项目，", "Start with real projects,"],
  ["再看产品判断。", "then look at product judgment."],
  ["这些项目覆盖 AI Agent、AIGC 工作流、医疗健康小程序、电商小程序和内容站点。每个案例都保留了角色、技术栈和业务语境。", "These projects cover AI Agents, AIGC workflows, healthcare mini programs, e-commerce mini programs, and content sites. Each case keeps the role, stack, and business context."],
  ["查看全部项目", "View All Projects"],

  ["一个能把 AI 想法做成可演示产品的人。", "Someone who can turn AI ideas into demoable products."],
  ["我关注的不只是把页面做出来，而是把业务场景、模型能力、用户流程和风险边界连起来。每个项目我都会尽量做成可演示、可复盘、能继续迭代的原型。", "I care about more than making pages. I connect business scenarios, model capabilities, user flows, and risk boundaries. I try to make every project demoable, reviewable, and ready to iterate."],
  ["了解更多", "Learn More"],
  ["3 个 AI 原型", "3 AI Prototypes"],
  ["7 个项目案例", "7 Project Cases"],
  ["20+ AIGC 作品", "20+ AIGC Works"],
  ["25w 单条播放", "250k Top Single View"],
  ["AI 产品", "AI Product"],
  ["应用搭建", "Prototype Development"],
  ["工作流设计", "Workflow Design"],
  ["内容运营", "Content Operations"],

  ["从场景到 Demo，", "From scenario to demo,"],
  ["每一步都能被验证。", "every step can be validated."],
  ["对我来说，AI 产品不是先堆模型，而是先确认场景，再定义边界，然后用原型把流程跑通。", "For me, AI products do not start by piling on models. They start by confirming the scenario, defining boundaries, and using prototypes to run the flow."],
  ["拆场景", "Map Scenarios"],
  ["先确认用户是谁、任务是什么、失败点在哪里，再决定 AI 应该进入哪一段流程。", "First identify the user, task, and failure points, then decide where AI should enter the flow."],
  ["定边界", "Set Boundaries"],
  ["明确 MVP 范围、模型职责、人工兜底、风险提示和可验证指标，避免功能无限扩散。", "Clarify MVP scope, model responsibility, human fallback, risk prompts, and validation metrics to prevent scope creep."],
  ["画流程", "Design Flows"],
  ["把需求写成页面、状态、节点、输入输出和异常分支，让产品逻辑可以被讨论和实现。", "Turn requirements into pages, states, nodes, inputs, outputs, and edge cases so product logic can be discussed and built."],
  ["做原型", "Build Prototype"],
  ["用前端、小程序、后端代理和 API 接入做出可演示版本，尽快看到真实交互效果。", "Use frontend, mini programs, backend proxies, and APIs to create demo versions and see real interactions quickly."],
  ["看反馈", "Read Feedback"],
  ["根据日志、内容数据、任务完成情况和用户反馈调整流程，而不是只停留在想法层面。", "Adjust flows based on logs, content data, task completion, and user feedback instead of staying at the idea level."],

  ["技术栈不是清单，", "A tech stack is not a list,"],
  ["是原型验证的基础设施。", "it is infrastructure for prototype validation."],
  ["从前端、小程序到后端代理和模型 API，用熟悉的工具组合快速跑通 AI 产品流程。", "From frontend and mini programs to backend proxies and model APIs, I combine familiar tools to quickly run AI product flows."],
  ["框架", "Framework"],
  ["库", "Library"],
  ["语言", "Language"],
  ["样式", "Styles"],
  ["构建", "Build"],
  ["平台", "Platform"],
  ["后端", "Backend"],
  ["模型", "Model"],
  ["数据库", "Database"],
  ["版本控制", "Version Control"],

  ["项目整理", "Projects Organized"],
  ["AI 产品原型", "AI Product Prototypes"],
  ["AIGC 作品产出", "AIGC Works Produced"],
  ["单条最高播放", "Top Single View"],
  ["项目案例", "Project Cases"],
  ["AI 原型", "AI Prototypes"],
  ["AIGC 作品", "AIGC Works"],
  ["单条最高播放", "Top Single View"],

  ["DTC 电商 AI Agent 客服与导购原型", "DTC E-commerce AI Agent for Support and Shopping Guidance"],
  ["给 DTC 商家做的客服/导购原型，能回答政策、查订单、发优惠券，也会在高风险问题上转人工。", "A support and shopping assistant prototype for DTC merchants. It answers policies, checks orders, issues coupons, and escalates risky cases to a human."],
  ["面向 DTC 商家的 AI 客服与导购 MVP，覆盖商品推荐、订单查询、优惠券、政策问答和人工升级等核心链路。", "An AI support and shopping guidance MVP for DTC merchants, covering product recommendations, order lookup, coupons, policy Q&A, and human escalation."],
  ["AI 产品设计 / Agent 应用搭建", "AI Product Design / Agent Prototype Development"],
  ["Frieren AI 短剧/漫剧生产平台", "Frieren AI Short Drama / Comic Drama Production Platform"],
  ["给短剧/漫剧创作者做的节点式工具，把剧本、角色、分镜、生图、视频和音频放在同一条创作流程里。", "A node-based tool for short drama and comic-drama creators, placing scripts, characters, storyboards, images, video, and audio in one creation flow."],
  ["节点式 AIGC 内容生产工具，打通创意、剧本、角色、分镜、图片、视频、音频到剪辑导出的工作流。", "A node-based AIGC production tool connecting ideation, scripts, characters, storyboards, images, video, audio, and editing export."],
  ["AIGC 产品设计 / 工作流应用搭建", "AIGC Product Design / Workflow Prototype Development"],
  ["AI 康复分诊与随访管理小程序", "AI Rehabilitation Triage and Follow-up Mini Program"],
  ["康复小程序原型，用户可以补充资料、做 AI 初筛、记录训练，系统会生成风险提醒和 7 天周报。", "A rehab mini program prototype where users fill in records, do an AI pre-check, log training, and receive risk reminders plus a 7-day report."],
  ["康复医疗场景下的 AI 初筛与随访小程序原型，串联患者档案、问诊资料袋、康复打卡、风险提醒和 AI 周报。", "An AI triage and follow-up mini program prototype for rehabilitation care, connecting patient files, consultation packets, check-ins, risk reminders, and AI weekly reports."],
  ["AI 医疗健康产品原型 / 小程序开发", "AI Healthcare Product Prototype / Mini Program Development"],
  ["LEMANISM 时尚电商小程序", "LEMANISM Fashion E-commerce Mini Program"],
  ["为时尚零售场景做的小程序，包含商品浏览、购物袋、收藏、活动预约、Lookbook 和 AI 试穿入口。", "A mini program for fashion retail, with product browsing, cart, favorites, event booking, Lookbook, and an AI try-on entry."],
  ["围绕时尚品牌展示与转化设计的小程序，包含商品、购物车、收藏、活动、Lookbook 和 AI 试穿入口等模块。", "A mini program designed for fashion brand presentation and conversion, with products, cart, favorites, events, Lookbook, and an AI try-on entry."],
  ["小程序产品设计 / 前端开发", "Mini Program Product Design / Frontend Development"],
  ["影评社官方网页", "Film Club Official Site"],
  ["我给影评社做的官方网页，用来发布活动、收集影评、展示精选内容，并在活动后继续归档。", "The official site I made for the film club, used to publish events, collect reviews, show selected content, and archive activities afterward."],
  ["为校内影评社搭建的官方网页，用于展示社团介绍、活动信息和影评征集内容，并配合线下观影活动持续更新。", "An official site for the campus film club, showing club information, events, and film review collection content while supporting offline screenings."],
  ["网页开发 / 社团运营", "Web Development / Club Operations"],
  ["个人作品集站", "Personal Project Site"],
  ["这个站本身也是一个练习：把项目截图、说明、技术栈和动效组织成一个能继续更新的作品集。", "This site is also a practice project: organizing screenshots, notes, tech stack, and motion into a portfolio that can keep growing."],
  ["用于整理项目案例、技术栈和个人经历的网站，重点验证项目展示结构、动效节奏和多项目内容组织方式。", "A site for organizing project cases, tech stack, and personal experience, focused on project structure, motion rhythm, and multi-project content organization."],
  ["产品规划 / 前端开发", "Product Planning / Frontend Development"],
  ["生日快乐沉浸式互动网站", "Immersive Birthday Interaction Site"],
  ["一个偏情绪化的生日互动页，用礼物开场、音乐、记忆走廊、玻璃票根和信件串起浏览体验。", "An emotional birthday interaction page built around a gift opening, music, memory corridor, glass ticket, and final letter."],
  ["创意互动专题页", "Creative Interactive Feature Page"],
  ["围绕特定人物/主题制作的沉浸式互动页面，侧重视觉表达、动效节奏和移动端浏览体验。", "An immersive interactive page around a specific person or theme, focused on visual expression, motion rhythm, and mobile browsing."],
  ["前端开发 / 交互设计", "Frontend Development / Interaction Design"],

  ["AI 应用", "AI Application"],
  ["工作流产品", "Workflow Product"],
  ["电商产品", "E-commerce Product"],
  ["内容工具", "Content Tool"],
  ["内容社区", "Content Community"],
  ["医疗健康", "Healthcare"],
  ["小程序", "Mini Program"],
  ["Web 应用", "Web App"],
  ["作品集", "Portfolio"],
  ["创意互动", "Creative Interaction"],
  ["前端", "Frontend"],
  ["全栈", "Full-stack"],
  ["全部", "All"],
  ["微信小程序", "WeChat Mini Program"],
  ["JSON 数据服务", "JSON Data Service"],
  ["本地缓存", "Local Cache"],
  ["组件化开发", "Componentized Development"],
  ["内容维护", "Content Maintenance"],

  ["我的项目", "My Projects"],
  ["这里放了我这段时间做过的几个项目。每个案例都会尽量写清楚：为什么做、我负责什么、最后做成了什么，而不只是贴几张图。", "Here are the projects I have worked on recently. Each case tries to explain why it was made, what I did, and what it became instead of only showing screenshots."],
  ["这里整理了我从 0 到 1 推进过的 AI 产品、小程序和 Web 项目。每个案例都尽量记录场景、流程、边界和原型实现，而不是只放最终截图。", "Here I organize AI product, mini program, and web projects I pushed from 0 to 1. Each case records scenario, flow, boundaries, and prototype implementation instead of only final screenshots."],

  ["走向 AI 产品的", "Moving toward AI product as a"],
  ["AI 产品经理方向，会做原型，也会写代码把想法跑起来。", "AI product direction, with prototype and coding practice."],
  ["我是电子商务专业在读，求职方向是 AI 产品经理 / AI 应用产品。最近主要在做 Agent、AIGC 创作工具和小程序原型。", "I am studying e-commerce and aiming for AI product roles. Recently I have been building Agents, AIGC creation tools, and mini program prototypes."],
  ["我喜欢把一个想法先拆成页面和状态，再用代码跑起来。比起写一大段概念说明，我更想先做出一个能被打开、能被挑毛病的版本。", "I like breaking an idea into screens and states, then making it run with code. Instead of writing long concept notes, I prefer building something people can open and critique."],
  ["我是电子商务专业在读，求职方向是 AI 产品经理 / AI 应用产品。现在主要关注 LLM Agent、RAG、AIGC 工作流和垂直行业 AI 助手。", "I am studying e-commerce and targeting AI Product Manager / AI Application Product roles. I currently focus on LLM Agents, RAG, AIGC workflows, and vertical AI assistants."],
  ["我喜欢把想法拆成具体流程，再用代码做成可演示原型。相比停留在概念上，我更在意需求、状态、边界、指标和下一轮迭代怎么落地。", "I like breaking ideas into concrete flows and using code to turn them into demoable prototypes. Rather than staying at the concept level, I care more about requirements, states, boundaries, metrics, and how the next iteration lands."],
  ["我能做什么", "What I Can Do"],
  ["我能带来的价值", "What I Bring"],
  ["AI 产品思维", "AI Product Thinking"],
  ["先弄清楚用户要做什么、现在卡在哪里，再决定 AI 应该帮哪一段。", "Understand what the user wants to do and where they get stuck, then decide where AI should help."],
  ["先回到用户场景和业务目标，再判断模型应该做什么、不该做什么，以及需要怎样的人工作业边界。", "Start from user scenarios and business goals, then decide what the model should do, what it should not do, and where human boundaries are needed."],
  ["用 React、Next.js、Vite 和微信小程序，把想法尽快做成可以点开的版本。", "Use React, Next.js, Vite, and WeChat Mini Programs to make ideas clickable quickly."],
  ["流程编排", "Flow Orchestration"],
  ["会把 Agent 调工具、AIGC 节点、失败重试和状态变化这些东西整理到页面里。", "I organize Agent tool calls, AIGC nodes, retries, and state changes into clear screens."],
  ["关注 Agent 工具调用、AIGC 节点工作流、结构化输出、风险校验、失败重试和状态流转。", "Focus on Agent tool use, AIGC node workflows, structured outputs, risk checks, failure retries, and state transitions."],
  ["内容与运营理解", "Content and Operations Understanding"],
  ["做过影评社网页、观影活动和短剧内容账号，更能理解内容为什么要这样呈现。", "I have built the film club site, organized screenings, and run short-drama content experiments, so I think about why content should be presented a certain way."],
  ["有影评社网页维护、活动组织和 Frieren 内容数据验证经历，能把内容表达和产品体验放在一起看。", "With experience maintaining the film club site, organizing events, and validating Frieren content data, I can view content expression and product experience together."],
  ["经历", "Experience"],
  ["AI 产品原型实践", "AI Product Prototype Practice"],
  ["Agent / AIGC / 医疗健康", "Agent / AIGC / Healthcare"],
  ["做了 DTC AI Agent、Frieren 短剧工具和康复分诊小程序，把想法尽量做成可以打开体验的版本。", "Built the DTC AI Agent, Frieren short drama tool, and rehab triage mini program, turning ideas into versions people can open and try."],
  ["完成 DTC 电商 AI Agent、Frieren AIGC 工作流和 AI 康复分诊小程序等项目原型。", "Completed prototypes including the DTC e-commerce AI Agent, Frieren AIGC workflow, and AI rehabilitation triage mini program."],
  ["Web 与小程序项目", "Web and Mini Program Projects"],
  ["电商 / 社团 / 作品集", "E-commerce / Club / Project Site"],
  ["开发 LEMANISM 时尚电商小程序、影评社官方网页、生日互动页和这个作品集站，练习页面体验和内容组织。", "Built the LEMANISM fashion mini program, film club site, birthday interaction page, and this portfolio, practicing interface experience and content organization."],
  ["开发 LEMANISM 时尚电商小程序、影评社官方网页、创意互动专题页和个人作品集站。", "Developed the LEMANISM fashion e-commerce mini program, film club official site, creative interactive feature page, and personal project site."],
  ["电子商务专业在读", "E-commerce Student"],
  ["门头沟学院", "Mentougou College"],
  ["学习数据分析、市场营销、网店美工和电商运营，并担任影评社社长。", "Studying data analysis, marketing, shop visual design, and e-commerce operations while serving as film club president."],
  ["想进一步了解项目吗？", "Want to explore the projects further?"],
  ["可以找我聊项目细节、原型思路、小程序，或者实习机会。", "Feel free to talk to me about project details, prototype ideas, mini programs, or internship opportunities."],
  ["可以联系我聊 AI 产品、前端原型、小程序项目或实习机会。", "You can contact me to discuss AI products, frontend prototypes, mini program projects, or internship opportunities."],
  ["下载简历", "Download Resume"],

  ["一起把", "Let's turn"],
  ["好想法做出来。", "good ideas into products."],
  ["欢迎联系我，聊项目、原型、小程序或实习机会。", "Feel free to contact me about projects, prototypes, mini programs, or internship opportunities."],
  ["如果你想了解某个项目，或者有产品、前端、小程序相关机会，可以发消息给我。", "If you want to learn about a project, or have product, frontend, or mini program opportunities, you can message me."],
  ["如果你想了解我的项目细节，或者有 AI 产品、前端原型、小程序相关机会，欢迎发消息给我。", "If you want to learn more about my projects, or have AI product, frontend prototype, or mini program opportunities, feel free to message me."],
  ["杭州 / 可远程沟通", "Hangzhou / Remote-friendly"],
  ["所在城市", "Location"],
  ["邮箱", "Email"],
  ["快速留言", "Quick Message"],
  ["姓名", "Name"],
  ["你的名字", "Your name"],
  ["项目类型", "Project Type"],
  ["选择项目类型", "Select a project type"],
  ["SaaS 产品", "SaaS Product"],
  ["AI 功能集成", "AI Feature Integration"],
  ["产品咨询", "Product Consulting"],
  ["其他", "Other"],
  ["项目说明", "Project Notes"],
  ["简单介绍一下你的项目...", "Briefly describe your project..."],
  ["打开邮箱联系我", "Open Email to Contact Me"],
  ["当前表单用于整理沟通信息，实际发送会打开邮箱。", "This form helps organize context; sending will open your email client."],
  ["作品集项目沟通", "Portfolio project discussion"],

  ["想聊项目、", "Want to talk about a project,"],
  ["想聊 AI 产品、", "Want to talk about AI products,"],
  ["原型或实习机会？", "prototypes, or internships?"],
  ["如果你对某个项目感兴趣，或者有产品、前端、小程序相关机会，可以直接发我消息。", "If you are interested in a project, or have product, frontend, or mini program opportunities, you can message me directly."],
  ["如果你想了解这些项目的细节，或者有 AI 产品、前端原型、小程序相关机会，欢迎直接联系我。", "If you want project details, or have opportunities around AI products, frontend prototypes, or mini programs, feel free to contact me directly."],
  ["发起联系", "Start Contact"],
  ["邮箱和 GitHub 都可以找到我", "Email and GitHub both work"],
  ["邮箱 / GitHub / 作品集均可联系", "Email / GitHub / site links are all fine"],

  ["项目背景", "Project Background"],
  ["产品设计", "Product Design"],
  ["原型实现", "Prototype Implementation"],
  ["AI 能力接入", "AI Capability Integration"],
  ["结果与复盘", "Results and Reflection"],
  ["功能结构", "Feature Structure"],
  ["实现方式", "Implementation"],
  ["核心模块", "Core Modules"],
  ["设计思路", "Design Thinking"],
  ["实现重点", "Implementation Focus"],
  ["我负责的内容", "My Responsibilities"],
] as const;

const zhToEn = [...phrasePairs].sort((a, b) => b[0].length - a[0].length);
const enToZh = phrasePairs
  .map(([zh, en]) => [en, zh] as const)
  .sort((a, b) => b[0].length - a[0].length);

const textOriginals = new WeakMap<Text, string>();
const translatedAttributes = ["placeholder", "aria-label", "title"] as const;

function hasTranslatablePhrase(value: string) {
  return phrasePairs.some(([zh, en]) => value.includes(zh) || value.includes(en));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replacePhrase(value: string, from: string, to: string) {
  const isEnglishToken = /^[A-Za-z0-9][A-Za-z0-9 /&+.,'-]*$/.test(from);

  if (!isEnglishToken) {
    return value.split(from).join(to);
  }

  const suffixGuard = from === "Next" ? "(?!\\.js)" : "";
  const pattern = new RegExp(
    `(^|[^A-Za-z0-9])(${escapeRegExp(from)})${suffixGuard}(?=$|[^A-Za-z0-9])`,
    "g"
  );
  return value.replace(pattern, (_, prefix: string) => `${prefix}${to}`);
}

function replacePhrases(value: string, language: Language) {
  const replacements = language === "en" ? zhToEn : enToZh;
  let next = value;

  for (const [from, to] of replacements) {
    if (next.includes(from)) {
      next = replacePhrase(next, from, to);
    }
  }

  return next;
}

function readLanguage(): Language {
  if (document.documentElement.dataset.language === "en") return "en";

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return "zh";
    const saved = JSON.parse(raw) as { language?: Language };
    return saved.language === "en" ? "en" : "zh";
  } catch {
    return "zh";
  }
}

function shouldSkipNode(node: Node) {
  const element =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as Element)
      : node.parentElement;

  return Boolean(
    element?.closest("script, style, noscript, template, code, pre, [data-i18n-skip]")
  );
}

function translateTextNode(node: Text, language: Language) {
  if (shouldSkipNode(node)) return;

  const current = node.nodeValue ?? "";
  if (current.trim().length === 0) return;

  const storedOriginal = textOriginals.get(node);
  const currentHasPhrase = hasTranslatablePhrase(current);

  if (!storedOriginal && !currentHasPhrase) return;

  if (storedOriginal && !currentHasPhrase) {
    textOriginals.delete(node);
    return;
  }

  let original = storedOriginal ?? current;
  if (
    storedOriginal &&
    current !== replacePhrases(storedOriginal, language) &&
    current !== replacePhrases(storedOriginal, language === "en" ? "zh" : "en")
  ) {
    original = current;
  }

  textOriginals.set(node, original);

  const next = replacePhrases(original, language);
  if (current !== next) {
    node.nodeValue = next;
  }
}

function originalAttributeName(attribute: string) {
  return `data-i18n-original-${attribute.replace(/[^a-z-]/gi, "-")}`;
}

function translateElementAttributes(element: Element, language: Language) {
  if (shouldSkipNode(element)) return;

  for (const attribute of translatedAttributes) {
    const current = element.getAttribute(attribute);
    if (!current) continue;
    if (!hasTranslatablePhrase(current)) continue;

    const originalName = originalAttributeName(attribute);
    const original = element.getAttribute(originalName) ?? current;

    if (!element.hasAttribute(originalName)) {
      element.setAttribute(originalName, original);
    }

    const next = replacePhrases(original, language);
    if (current !== next) {
      element.setAttribute(attribute, next);
    }
  }
}

function translateTree(root: Node & ParentNode, language: Language) {
  if (root instanceof Element) {
    translateElementAttributes(root, language);
  }

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        return shouldSkipNode(node)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  let node = walker.nextNode();
  while (node) {
    translateTextNode(node as Text, language);
    node = walker.nextNode();
  }

  if ("querySelectorAll" in root) {
    root
      .querySelectorAll("*")
      .forEach((element) => translateElementAttributes(element, language));
  }
}

function setDocumentLanguage(language: Language) {
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  translateTree(document.body, language);
}

function isInsideTranslationIgnore(node: Node) {
  const element =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as Element)
      : node.parentElement;

  return Boolean(
    element?.closest(".site-preloader,[data-translation-ignore='true']")
  );
}

export default function LanguageRuntime() {
  useEffect(() => {
    let language = readLanguage();
    let frame = 0;
    let timer: number | null = null;
    let isTranslating = false;
    let hasTranslatedDom = false;

    const applyLanguage = (nextLanguage = language) => {
      language = nextLanguage;

      if (language === "zh" && !hasTranslatedDom) {
        document.documentElement.dataset.language = "zh";
        document.documentElement.lang = "zh-CN";
        return;
      }

      isTranslating = true;
      setDocumentLanguage(language);
      hasTranslatedDom = true;
      window.requestAnimationFrame(() => {
        isTranslating = false;
      });
    };

    const scheduleApply = () => {
      if (isTranslating || language === "zh") return;
      window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        frame = window.requestAnimationFrame(() => applyLanguage(language));
      }, 96);
    };

    const observer = new MutationObserver((mutations) => {
      if (isTranslating) return;
      if (
        mutations.some(
          (mutation) =>
            mutation.type === "childList" &&
            !isInsideTranslationIgnore(mutation.target)
        )
      ) {
        scheduleApply();
      }
    });

    const handleAccessibilityChange = (event: Event) => {
      const detail = (event as CustomEvent<{ language?: Language }>).detail;
      applyLanguage(detail?.language === "en" ? "en" : "zh");
    };

    applyLanguage(language);
    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    window.addEventListener(
      "portfolio-accessibility-change",
      handleAccessibilityChange
    );

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
      window.removeEventListener(
        "portfolio-accessibility-change",
        handleAccessibilityChange
      );
    };
  }, []);

  return null;
}

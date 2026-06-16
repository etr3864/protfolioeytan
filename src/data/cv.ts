export type Locale = "en" | "he";

export interface CVContent {
  meta: {
    name: string;
    title: string;
    linkedin: string;
    email: string;
    phone: string;
  };
  nav: {
    about: string;
    experience: string;
    education: string;
    skills: string;
    contact: string;
    downloadCv: string;
  };
  hero: {
    ctaContact: string;
    ctaDownload: string;
    highlights: string[];
  };
  about: {
    title: string;
    text: string;
    pills: { label: string; icon: string }[];
  };
  experience: {
    title: string;
    items: {
      id: string;
      role: string;
      company: string;
      url?: string;
      period: string;
      logo: string;
      bullets: string[];
    }[];
  };
  education: {
    title: string;
    items: {
      id: string;
      degree: string;
      institution: string;
      institutionUrl?: string;
      institutionLogo?: string;
      period: string;
      grade?: string;
      certImage: string;
    }[];
  };
  skills: {
    title: string;
    categories: {
      id: string;
      label: string;
      items: string[];
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    linkedin: string;
    downloadEn: string;
    downloadHe: string;
  };
}

export const cvContent: Record<Locale, CVContent> = {
  en: {
    meta: {
      name: "Eytan David Turgeman",
      title: "AI Solutions Developer | Marketing Strategist",
      linkedin: "https://www.linkedin.com/in/eytan-turgeman-269b5220b/",
      email: "etantur@gmail.com",
      phone: "0523006544",
    },
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      contact: "Contact",
      downloadCv: "Download CV",
    },
    hero: {
      ctaContact: "Get in Touch",
      ctaDownload: "Download CV",
      highlights: ["AI Systems Builder", "Marketing ROI", "Team Leadership"],
    },
    about: {
      title: "About Me",
      text: "I'm Eytan David Turgeman, 23, married to Noa and father to Rafael.\n\nAI Solutions Developer with deep understanding of system architecture, cloud infrastructure, and production-grade deployments. I design and build end-to-end solutions, from real-time voice AI systems on GKE to multi-tenant WhatsApp platforms with RAG, LLM orchestration, and WebSocket integrations.\n\nAs CTO & Co-Founder at Optive, I built two full AI platforms from scratch serving dozens of paying customers, and owned the entire stack: infrastructure, architecture, product, and go-to-market.\n\nMy foundation is in marketing strategy with emphasis on paid media, managing six-figure ad budgets, building conversion funnels, and delivering measurable business growth.",
      pills: [
        { label: "AI Solutions Design & Implementation", icon: "cpu" },
        { label: "Digital Marketing Strategy & Tactics", icon: "chart" },
        { label: "Team Leadership & Product Management", icon: "users" },
      ],
    },
    experience: {
      title: "Experience",
      items: [
        {
          id: "optive",
          role: "CEO, CTO & Co-Founder",
          company: "Optive LTD",
          url: "https://www.0ptive.com/",
          period: "Jul 2025 — May 2026 · Full-time",
          logo: "/images/logos/optive.png",
          bullets: [
            "End-to-end architectural design, infrastructure selection, development and deployment of two production AI platforms serving dozens of paying customers and tens of thousands of AI-managed conversations: (1) Voice AI, a real-time calling system with Telnyx WebSocket bidirectional audio, Gemini Live API (Vertex AI), Deepgram transcription, and GKE with horizontal scaling. (2) WhatsApp AI, a multi-tenant agent platform designed for scale and security with FastAPI, pgvector RAG, and multi-provider LLM orchestration. Both passed Google OAuth Verification.",
            "Voice platform: TypeScript monorepo (pnpm), Express + BullMQ workers (outbound calls, recordings, summaries, reminders, webhooks), Redis Pub/Sub for real-time SSE events, Prisma ORM, GCS for recordings, and Gemini function-calling with auto-reconnect for long sessions.",
            "WhatsApp platform: async Python (FastAPI), PostgreSQL + pgvector (cosine-distance retrieval, 1536-dim embeddings), Celery background tasks, multi-provider LLM (Anthropic/OpenAI/Gemini) with key pooling and round-robin, Docker Compose orchestration, JWT + RBAC, Google Calendar OAuth, and Cloudflare R2 storage.",
            "Managed a team of 8 developers: sprint planning, task breakdown and delegation, CRM-based workflow management, deadline enforcement, code reviews, and performance tracking. Owned a six-figure operational budget with full P&L responsibility, optimizing resource allocation to maximize output against business priorities.",
          ],
        },
        {
          id: "vegeta",
          role: "Marketing Consultant",
          company: "Vegeta Marketing",
          url: "https://vegeta.co.il/",
          period: "May 2025 — Dec 2025 · Full-time",
          logo: "/images/logos/vegeta.png",
          bullets: [
            "Provided strategic marketing consultations to hundreds of businesses across diverse verticals, developing tailored growth strategies including platform selection, funnel architecture, budget allocation, and campaign planning based on industry dynamics, audience segmentation, and business model.",
            "Managed end-to-end client engagements: strategic business cracking (identifying the right angle and offer), marketing cracking (matching channels, messaging, and funnels to the business), market analysis, competitive positioning, media mix modeling, and ad spend advisory. Closed customized packages ranging from 15K to 80K NIS per client.",
            "Specialized in diagnosing underperforming acquisition channels, restructuring funnel flows, and implementing data-driven optimization frameworks that delivered measurable ROAS improvements across paid search, social, and programmatic.",
          ],
        },
        {
          id: "digim",
          role: "Paid Media Manager",
          company: "Digim",
          url: "https://digim.co.il/",
          period: "Jan 2025 — Jun 2025 · Full-time",
          logo: "/images/logos/digim.jpg",
          bullets: [
            "Built and launched Google & Meta campaigns from scratch for multiple e-commerce and lead-gen clients simultaneously, managing six-figure monthly budgets with full ownership of strategy, execution, and optimization.",
            "Implemented full tracking infrastructure: Meta Pixel integration, Google Tag Manager event setup, server-side conversions, UTM architecture, and GA4 configuration for precise attribution and ROAS measurement.",
            "Led end-to-end creative production: writing strategic briefs, directing a graphic design team, designing UX/UI for landing pages, managing A/B testing workflows, and delivering performance reports to clients.",
          ],
        },
        {
          id: "idf",
          role: "Combat Commander",
          company: "IDF · Combat Engineering Corps",
          period: "Nov 2021 — Dec 2024 · Full-time",
          logo: "/images/logos/idf.png",
          bullets: [
            "Led soldiers in active combat during wartime operations (Iron Swords), responsible for real-time tactical decisions, team coordination, and mission execution under life-or-death conditions.",
            "Developed practical leadership skills directly applicable to business: managing high-pressure deadlines, rapid prioritization with incomplete data, leading cross-functional teams, and maintaining composure under chaos.",
            "Built a zero-tolerance mindset for execution gaps: every decision has consequences, every detail matters, every team member needs to be aligned and accountable.",
          ],
        },
      ],
    },
    education: {
      title: "Education",
      items: [
        {
          id: "ai-cert",
          degree: "AI & Machine Learning",
          institution: "Success College · 450+ Academic Hours",
          institutionUrl: "https://successcollege.co.il/",
          institutionLogo: "/images/logos/success.png",
          period: "Mar 2025",
          certImage: "/images/cert-marketing.jpg",
        },
        {
          id: "marketing-cert",
          degree: "Digital Marketing PRO",
          institution: "Success College · 450+ Academic Hours",
          institutionUrl: "https://successcollege.co.il/",
          institutionLogo: "/images/logos/success.png",
          period: "Jan 2025",
          grade: "95",
          certImage: "/images/cert-marketing.jpg",
        },
      ],
    },
    skills: {
      title: "Skills",
      categories: [
        {
          id: "ai",
          label: "AI & Development",
          items: [
            "Python (FastAPI, Celery)",
            "TypeScript (Node.js, Express)",
            "React / Next.js",
            "LLM APIs (Anthropic, OpenAI, Gemini)",
            "RAG / Embeddings / Vector Search",
            "Voice AI (Telnyx, Deepgram)",
          ],
        },
        {
          id: "infra",
          label: "Infrastructure",
          items: [
            "GCP / GKE / Vertex AI",
            "PostgreSQL / pgvector / Prisma",
            "Redis / BullMQ",
            "Docker / Docker Compose",
            "WebSocket / Real-time",
            "CI/CD / GitHub Actions",
          ],
        },
        {
          id: "marketing",
          label: "Marketing & Growth",
          items: [
            "Marketing Strategy",
            "Google Ads / Meta Ads",
            "PPC & Budget Management",
            "Sales Funnels & CRO",
            "Copywriting & Creative",
            "Analytics & Attribution",
          ],
        },
        {
          id: "management",
          label: "Management",
          items: [
            "Team Leadership",
            "Product Management",
            "Business Operations",
            "Client Consulting",
            "Revenue Generation",
          ],
        },
      ],
    },
    contact: {
      title: "Let's Connect",
      subtitle: "Open to AI, marketing, and leadership roles.",
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      downloadEn: "Download CV (English)",
      downloadHe: "Download CV (Hebrew)",
    },
  },
  he: {
    meta: {
      name: "איתן דוד טורג׳מן",
      title: "AI Solutions Developer | Marketing Strategist",
      linkedin: "https://www.linkedin.com/in/eytan-turgeman-269b5220b/",
      email: "etantur@gmail.com",
      phone: "0523006544",
    },
    nav: {
      about: "אודות",
      experience: "ניסיון",
      education: "השכלה",
      skills: "כישורים",
      contact: "יצירת קשר",
      downloadCv: "הורד קו\"ח",
    },
    hero: {
      ctaContact: "צור קשר",
      ctaDownload: "הורד קו\"ח",
      highlights: ["בניית מערכות AI", "ROI שיווקי", "מנהיגות צוות"],
    },
    about: {
      title: "אודותיי",
      text: "אני איתן דוד טורג׳מן, בן 23, נשוי לנועה ואבא לרפאל.\n\nמפתח פתרונות AI עם הבנה עמוקה של ארכיטקטורת מערכות, תשתיות ענן ופריסות production-grade. אני מתכנן ובונה פתרונות end-to-end, ממערכות Voice AI בזמן אמת על GKE ועד פלטפורמות WhatsApp multi-tenant עם RAG, אורקסטרציית LLM ואינטגרציות WebSocket.\n\nכ-CTO ומייסד שותף ב-Optive, בניתי שתי פלטפורמות AI מלאות מאפס שמשרתות עשרות לקוחות משלמים, וניהלתי את כל הסטאק: תשתיות, ארכיטקטורה, מוצר ושיווק.\n\nהבסיס שלי הוא אסטרטגיות שיווק בדגש על ממומן, ניהול תקציבי פרסום של מאות אלפי שקלים, בניית משפכי המרה והשגת צמיחה עסקית מדידה.",
      pills: [
        { label: "תכנון ופיתוח מערכות בינה מלאכותית", icon: "cpu" },
        { label: "מומחה אסטרטגיות וטקטיקות שיווק דיגיטלי", icon: "chart" },
        { label: "הובלת צוותים וניהול מוצר", icon: "users" },
      ],
    },
    experience: {
      title: "ניסיון תעסוקתי",
      items: [
        {
          id: "optive",
          role: "מנכ\"ל, CTO ומייסד שותף",
          company: "Optive LTD",
          url: "https://www.0ptive.com/",
          period: "יולי 2025 — מאי 2026 · משרה מלאה",
          logo: "/images/logos/optive.png",
          bullets: [
            "תכנון ארכיטקטוני בהתאם לצרכי סקייל ואבטחה, בחירת תשתיות, פיתוח ופריסה מקצה לקצה של שתי פלטפורמות AI בפרודקשן שמשרתות עשרות לקוחות משלמים ועשרות אלפי שיחות מנוהלות-AI: (1) Voice AI, מערכת שיחות real-time עם Telnyx WebSocket דו-כיווני, Gemini Live API (Vertex AI), תמלול Deepgram, ו-GKE עם סקייל אופקי. (2) WhatsApp AI, פלטפורמת סוכנים multi-tenant עם FastAPI, pgvector RAG, ואורקסטרציית LLM מרובת-ספקים. שתיהן עברו Google OAuth Verification.",
            "פלטפורמת Voice: מונורפו TypeScript (pnpm), Express + BullMQ workers (שיחות יוצאות, הקלטות, סיכומים, תזכורות, webhooks), Redis Pub/Sub לאירועי SSE בזמן אמת, Prisma ORM, GCS להקלטות, ו-Gemini function-calling עם auto-reconnect לשיחות ארוכות.",
            "פלטפורמת WhatsApp: Python אסינכרוני (FastAPI), PostgreSQL + pgvector (אחזור cosine-distance, embeddings 1536-dim), Celery למשימות רקע, LLM מרובת-ספקים (Anthropic/OpenAI/Gemini) עם key pooling ורוטציית round-robin, אורקסטרציית Docker Compose, JWT + RBAC, Google Calendar OAuth, ואחסון Cloudflare R2.",
            "ניהול צוות של 8 מפתחים: תכנון ספרינטים, פירוק משימות וחלוקת תפקידים, ניהול workflow בCRM, עמידה בדדליינים, code reviews ומעקב ביצועים. אחריות מלאה על תקציב תפעולי של מאות אלפי שקלים, כולל אופטימיזציית הקצאת משאבים להוצאת המקסימום לפי צרכים עסקיים.",
          ],
        },
        {
          id: "vegeta",
          role: "יועץ שיווק",
          company: "Vegeta Marketing",
          url: "https://vegeta.co.il/",
          period: "מאי 2025 — דצמבר 2025 · משרה מלאה",
          logo: "/images/logos/vegeta.png",
          bullets: [
            "ייעוץ שיווקי אסטרטגי למאות עסקים במגוון ורטיקלים, כולל פיתוח אסטרטגיות צמיחה מותאמות: בחירת פלטפורמות, ארכיטקטורת משפכי שיווק, הקצאת תקציב ותכנון קמפיינים לפי דינמיקת שוק, סגמנטציית קהלים ומודל עסקי.",
            "ניהול מחזור לקוח מקצה לקצה: פיצוח עסקי אסטרטגי (זיהוי הזווית והצעת הערך הנכונה), פיצוח שיווקי (התאמת ערוצים, מסרים ומשפכים לעסק), ניתוח שוק, מיצוב תחרותי, מודלינג תמהיל מדיה וייעוץ תקציבי פרסום. סגירת חבילות מותאמות בטווח 15K עד 80K ₪ ללקוח.",
            "התמחות באבחון ערוצי רכישה מתפקדים מתחת לפוטנציאל, ארגון מחדש של משפכי המרה, והטמעת frameworks אופטימיזציה מבוססי-דאטה שהניבו שיפור מדיד ב-ROAS לאורך paid search, social ו-programmatic.",
          ],
        },
        {
          id: "digim",
          role: "מנהל פרסום ממומן",
          company: "Digim",
          url: "https://digim.co.il/",
          period: "ינואר 2025 — יוני 2025 · משרה מלאה",
          logo: "/images/logos/digim.jpg",
          bullets: [
            "הקמה מאפס וניהול של קמפיינים בגוגל ומטא עבור מספר לקוחות בו-זמנית בתחומי e-commerce ו-lead-gen, עם תקציבים חודשיים של מאות אלפי שקלים ואחריות מלאה על אסטרטגיה, ביצוע ואופטימיזציה.",
            "הטמעת תשתית tracking מלאה: אינטגרציית Meta Pixel, הגדרת אירועים ב-Google Tag Manager, המרות server-side, ארכיטקטורת UTM וקונפיגורציית GA4 לייחוס מדויק ומדידת ROAS.",
            "הובלת תהליך creative מקצה לקצה: כתיבת בריפים אסטרטגיים, ניהול צוות מעצבים גרפיים, עיצוב UX/UI לדפי נחיתה, ניהול תהליכי A/B testing ודיווח ביצועים ללקוחות.",
          ],
        },
        {
          id: "idf",
          role: "מפקד לוחמים",
          company: "חיל ההנדסה הקרבית, צה\"ל",
          period: "נובמבר 2021 — דצמבר 2024 · שירות מלא",
          logo: "/images/logos/idf.png",
          bullets: [
            "פיקוד על לוחמים בלחימה פעילה בתקופת מלחמה (חרבות ברזל), עם אחריות על החלטות טקטיות בזמן אמת, תיאום צוותים וביצוע משימות בתנאי חיים או מוות.",
            "פיתוח יכולות מנהיגות פרקטיות שמתרגמות ישירות לעסקים: ניהול דדליינים תחת לחץ קיצוני, תעדוף מהיר עם מידע חלקי, הובלת צוותים רב-תחומיים, ושמירה על קור רוח בתנאי כאוס.",
            "בניית תפיסה של אפס-סובלנות לפערי ביצוע: כל החלטה נושאת השלכות, כל פרט חשוב, כל חבר צוות צריך להיות מיושר ואחראי.",
          ],
        },
      ],
    },
    education: {
      title: "השכלה",
      items: [
        {
          id: "ai-cert",
          degree: "AI & Machine Learning",
          institution: "מכללת Success · 450+ שעות אקדמיות",
          institutionUrl: "https://successcollege.co.il/",
          institutionLogo: "/images/logos/success.png",
          period: "מרץ 2025",
          certImage: "/images/cert-marketing.jpg",
        },
        {
          id: "marketing-cert",
          degree: "Digital Marketing PRO",
          institution: "מכללת Success · 450+ שעות אקדמיות",
          institutionUrl: "https://successcollege.co.il/",
          institutionLogo: "/images/logos/success.png",
          period: "ינואר 2025",
          grade: "95",
          certImage: "/images/cert-marketing.jpg",
        },
      ],
    },
    skills: {
      title: "כישורים",
      categories: [
        {
          id: "ai",
          label: "AI ופיתוח",
          items: [
            "Python (FastAPI, Celery)",
            "TypeScript (Node.js, Express)",
            "React / Next.js",
            "LLM APIs (Anthropic, OpenAI, Gemini)",
            "RAG / Embeddings / Vector Search",
            "Voice AI (Telnyx, Deepgram)",
          ],
        },
        {
          id: "infra",
          label: "תשתיות",
          items: [
            "GCP / GKE / Vertex AI",
            "PostgreSQL / pgvector / Prisma",
            "Redis / BullMQ",
            "Docker / Docker Compose",
            "WebSocket / Real-time",
            "CI/CD / GitHub Actions",
          ],
        },
        {
          id: "marketing",
          label: "שיווק וצמיחה",
          items: [
            "Marketing Strategy",
            "Google Ads / Meta Ads",
            "PPC & Budget Management",
            "Sales Funnels & CRO",
            "Copywriting & Creative",
            "Analytics & Attribution",
          ],
        },
        {
          id: "management",
          label: "ניהול",
          items: [
            "Team Leadership",
            "Product Management",
            "Business Operations",
            "Client Consulting",
            "Revenue Generation",
          ],
        },
      ],
    },
    contact: {
      title: "בואו נדבר",
      subtitle: "פתוח לתפקידים ב-AI, שיווק והנהלה.",
      email: "אימייל",
      phone: "טלפון",
      linkedin: "LinkedIn",
      downloadEn: "הורד קו\"ח (אנגלית)",
      downloadHe: "הורד קו\"ח (עברית)",
    },
  },
};

export const cvDownloads = {
  en: "/cv/Eytan_Turgeman_CV_English.docx",
  he: "/cv/Eytan_Turgeman_CV_Hebrew.docx",
};

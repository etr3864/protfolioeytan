export type Locale = "he" | "en";

export type ExperienceItem = {
  role: string;
  org: string;
  logo: string;
  url?: string;
  time: string;
  place: string;
  summary: string;
  points: string[];
};

export type ProjectItem = {
  name: string;
  kind: string;
  year: string;
  link: string;
  linkLabel: string;
  link2?: string;
  link2Label?: string;
  shots: string[];
  desc: string;
  highlights: string[];
  strategy: string;
  model: string;
  lesson: string;
  stack: string[];
};

export type CvCopy = {
  dir: "rtl" | "ltr";
  first: string;
  last: string;
  full: string;
  role: string;
  location: string;
  available: string;
  heroKicker: string;
  heroTitle: string;
  expertiseLabel: string;
  expertise: { label: string; to: string }[];
  nav: { id: string; label: string }[];
  aboutLabel: string;
  statement: string;
  aboutLead: string;
  aboutBody: string[];
  facts: { k: string; v: string }[];
  commandStat: { k: string; v: string };
  expLabel: string;
  experience: ExperienceItem[];
  projLabel: string;
  projIntro: string;
  highlightsLabel: string;
  lessonLabel: string;
  strategyLabel: string;
  modelLabel: string;
  stackLabel: string;
  projects: ProjectItem[];
  eduLabel: string;
  enlarge: string;
  education: {
    name: string;
    org: string;
    time: string;
    note: string;
    grade?: string;
    cert: string;
  }[];
  skillsLabel: string;
  skills: { group: string; items: string[] }[];
  contactLabel: string;
  contactTitle: string;
  contact: { k: string; v: string; href: string }[];
  footer: string;
  credit: string;
  botCredit: string;
  pdf: string;
  pdfBusy: string;
  hedName: string;
  hedMark: string;
  hedPlaceholder: string;
  hedSend: string;
  hedClose: string;
  hedReset: string;
  hedSuggestions: string[];
  hedGreeting: string;
  hedThinking: string;
  hedError: string;
  hedBusy: string;
  hedMissing: string;
  hedLimit: string;
};

const linkedin = "https://www.linkedin.com/in/eytan-turgeman-269b5220b/";

const shots = {
  optive: ["/media/optive-agents.webp", "/media/optive-chat.webp", "/media/optive-prompt.webp"],
  hatraa: ["/media/hatraa-home.webp", "/media/hatraa-story.webp", "/media/hatraa-letter.webp"],
  hood: ["/media/podcast-home.webp"],
};

export const cv: Record<Locale, CvCopy> = {
  he: {
    dir: "rtl",
    first: "איתן",
    last: "טורג׳מן",
    full: "איתן דוד טורג׳מן",
    role: "ראש תפעול · מערכות AI · אסטרטגיה עסקית",
    location: "פתח תקווה, ישראל",
    available: "פתוח לתפקידי הנהלה",
    heroKicker: "מעבר למערכת",
    heroTitle: "טכנולוגיה. שיווק. הבנה עסקית.",
    expertiseLabel: "תחומי מומחיות:",
    expertise: [
      { label: "תפעול והנהלה", to: "experience" },
      { label: "מערכות AI", to: "projects" },
      { label: "אסטרטגיה ושיווק", to: "about" },
    ],
    nav: [
      { id: "about", label: "אודות" },
      { id: "experience", label: "ניסיון" },
      { id: "projects", label: "פרויקטים" },
      { id: "education", label: "השכלה" },
      { id: "contact", label: "קשר" },
    ],
    aboutLabel: "אודות",
    statement: "אני יודע לזהות מה באמת מקדם חברה, ולבנות סביב זה את כל השאר.",
    aboutLead:
      "בכל חברה יש כמה דברים בודדים שקובעים את רוב התוצאות. קודם כול אני מאתר אותם, אחר כך מגדיר לכל אחד מדד ויעד, ורק אז בונה סביבם מערכות וצוות.",
    aboutBody: [
      "הייתי שותף מייסד ו־CTO בחברה שפיתחה סוכני AI לקול ולטקסט. המערכת רצה אצל עשרות לקוחות בפרודקשן. מאז אני מתמקד בניהול, בהשפעה, בארכיטקטורה ובפיתוח, כי AI כבר יכול לכתוב את הקוד בשבילי.",
      "הרקע שלי טכני, בעיקר ארכיטקטורה ותשתיות, אבל ניהלתי גם תקציבי שיווק ובניתי מודלים עסקיים. לכן אני מדבר באותה קלות עם המפתחים ועם מי שמחזיק את התקציב.",
    ],
    facts: [
      { k: "שנות ניהול", v: "5+" },
      { k: "לקוחות בפרודקשן", v: "40+" },
      { k: "SOPs שנכתבו", v: "24" },
    ],
    commandStat: { k: "שנות צבא בפיקוד", v: "3" },
    expLabel: "ניסיון",
    experience: [
      {
        role: "ראש מחלקת תפעול",
        org: "Kliento",
        logo: "/media/logos/kliento.webp",
        url: "https://kliento.tech/",
        time: "יוני 2026 עד היום",
        place: "פתח תקווה · היברידי",
        summary:
          "הקמת חטיבת התפעול מאפס: יחידות Implementation ו־Customer Success, בעלות על קו האוטומציות, ומודל קיבולת ומרווח ללקוח.",
        points: [
          "הקמת חטיבת התפעול מאפס: יחידות Implementation ו-Customer Success, בעלות על קו האוטומציות, ומודל קיבולת ומרווח לכל לקוח.",
          "כתיבת מסגרת תפעול בת 17 פרקים ו-24 נהלי עבודה, ומבנה KPI שכולל SLA, Churn, Time-to-Live ו-Health Score.",
          "ניהול צוות מהנדסים לאורך פייפליין לקוח של 10 שלבים, מהאפיון ועד עלייה לאוויר.",
          "אפיון והטמעה מקצה לקצה של אייג'נטים, מערכות BI ומרכזיות, בסקייל גבוה, עם חיסכון של אלפי שקלים.",
        ],
      },
      {
        role: "מייסד ושותף טכנולוגי",
        org: "Optive LTD",
        logo: "/media/logos/optive.webp",
        url: "https://www.0ptive.com/",
        time: "יולי 2025 עד מאי 2026",
        place: "ישראל",
        summary: "תכנון ובניית פלטפורמת AI לסוכני קול וטקסט עבור עסקים, מהארכיטקטורה ועד השיווק.",
        points: [
          "תכנון ארכיטקטוני בהתאם לצרכי סקייל ואבטחה, בחירת תשתיות, פיתוח ופריסה מקצה לקצה של שתי פלטפורמות AI בפרודקשן שמשרתות עשרות לקוחות משלמים ועשרות אלפי שיחות מנוהלות-AI: (1) Voice AI, מערכת שיחות בזמן אמת עם Telnyx WebSocket דו-כיווני, Gemini Live API (Vertex AI), תמלול Deepgram, ו-GKE עם סקייל אופקי. (2) WhatsApp AI, פלטפורמת סוכנים multi-tenant עם FastAPI, pgvector RAG, ואורקסטרציית LLM מרובת ספקים. שתיהן עברו Google OAuth Verification.",
          "פלטפורמת Voice: מונורפו TypeScript (pnpm), Express + BullMQ workers (שיחות יוצאות, הקלטות, סיכומים, תזכורות, webhooks), Redis Pub/Sub לאירועי SSE בזמן אמת, Prisma ORM, GCS להקלטות, ו-Gemini function-calling עם auto-reconnect לשיחות ארוכות.",
          "פלטפורמת WhatsApp: Python אסינכרוני (FastAPI), PostgreSQL + pgvector (אחזור cosine-distance, embeddings 1536-dim), Celery למשימות רקע, LLM מרובת ספקים (Anthropic/OpenAI/Gemini) עם key pooling ורוטציית round-robin, אורקסטרציית Docker Compose, JWT + RBAC, Google Calendar OAuth, ואחסון Cloudflare R2.",
          "ניהול צוות של 8 מפתחים: תכנון ספרינטים, פירוק משימות וחלוקת תפקידים, ניהול workflow ב-CRM, עמידה בדדליינים, code reviews ומעקב ביצועים. אחריות מלאה על תקציב תפעולי של מאות אלפי שקלים, כולל אופטימיזציית הקצאת משאבים להוצאת המקסימום לפי צרכים עסקיים.",
        ],
      },
      {
        role: "יועץ שיווק",
        org: "Vegeta Marketing",
        logo: "/media/logos/vegeta.webp",
        url: "https://vegeta.co.il/",
        time: "מאי 2025 עד דצמבר 2025",
        place: "פתח תקווה",
        summary: "ייעוץ אסטרטגי למאות עסקים: בחירת פלטפורמות, משפכים, תקציב ותכנון קמפיינים.",
        points: [
          "ייעוץ שיווקי אסטרטגי למאות עסקים במגוון ורטיקלים, כולל פיתוח אסטרטגיות צמיחה מותאמות: בחירת פלטפורמות, ארכיטקטורת משפכי שיווק, הקצאת תקציב ותכנון קמפיינים לפי דינמיקת שוק, סגמנטציית קהלים ומודל עסקי.",
          "ניהול מחזור לקוח מקצה לקצה: פיצוח עסקי אסטרטגי (זיהוי הזווית והצעת הערך הנכונה), פיצוח שיווקי (התאמת ערוצים, מסרים ומשפכים לעסק), ניתוח שוק, מיצוב תחרותי, מודלינג תמהיל מדיה וייעוץ תקציבי פרסום. סגירת חבילות מותאמות בטווח 15K עד 80K ש״ח ללקוח.",
          "התמחות באבחון ערוצי רכישה שמתפקדים מתחת לפוטנציאל, ארגון מחדש של משפכי המרה, והטמעת מסגרות אופטימיזציה מבוססות דאטה שהניבו שיפור מדיד ב-ROAS לאורך paid search, social ו-programmatic.",
        ],
      },
      {
        role: "מנהל פרסום ממומן",
        org: "Digim",
        logo: "/media/logos/digim.webp",
        url: "https://digim.co.il/",
        time: "ינואר 2025 עד יוני 2025",
        place: "מחוז צפון",
        summary: "ניהול קמפיינים ב-Google ו-Meta בתקציבים חודשיים של מאות אלפי שקלים.",
        points: [
          "הקמה מאפס וניהול של קמפיינים בגוגל ומטא עבור מספר לקוחות בו-זמנית בתחומי e-commerce ו-lead-gen, עם תקציבים חודשיים של מאות אלפי שקלים ואחריות מלאה על אסטרטגיה, ביצוע ואופטימיזציה.",
          "הטמעת תשתית מדידה מלאה: אינטגרציית Meta Pixel, הגדרת אירועים ב-Google Tag Manager, המרות server-side, ארכיטקטורת UTM וקונפיגורציית GA4 לייחוס מדויק ומדידת ROAS.",
          "הובלת תהליך קריאייטיב מקצה לקצה: כתיבת בריפים אסטרטגיים, ניהול צוות מעצבים גרפיים, עיצוב UX/UI לדפי נחיתה, ניהול תהליכי A/B testing ודיווח ביצועים ללקוחות.",
        ],
      },
      {
        role: "מפקד כוח, הנדסה קרבית",
        org: "צה״ל",
        logo: "/media/logos/idf.webp",
        time: "נובמבר 2021 עד דצמבר 2024",
        place: "ישראל",
        summary: "פיקוד על כוחות משימתיים בפעילות מבצעית, קבלת החלטות בזמן אמת ותיאום בין תפקידים וכלים.",
        points: [
          "פיקוד על לוחמים בלחימה פעילה בתקופת מלחמה (חרבות ברזל), עם אחריות על החלטות טקטיות בזמן אמת, תיאום צוותים וביצוע משימות בתנאי לחץ קיצוני.",
          "יכולות מנהיגות שעוברות לעסק: ניהול דדליינים תחת לחץ, תעדוף מהיר עם מידע חלקי, הובלת צוותים רב-תחומיים, ושמירה על קור רוח בתנאי כאוס.",
          "תפיסה של אפס סובלנות לפערי ביצוע: כל החלטה נושאת השלכות, כל פרט חשוב, וכל חבר צוות צריך להיות מיושר ואחראי.",
        ],
      },
    ],
    projLabel: "פרויקטים",
    projIntro:
      "שלושה מוצרים, שלושה שווקים, שיטה אחת. אני בונה בנקודה שבה טכנולוגיה פוגשת כסף אמיתי: מערכות שמשרתות לקוחות משלמים, לא דמו שנשאר במגירה.",
    highlightsLabel: "יכולות מרכזיות",
    lessonLabel: "מה למדתי",
    strategyLabel: "אסטרטגיה עסקית",
    modelLabel: "מודל עסקי",
    stackLabel: "Stack טכנולוגי",
    projects: [
      {
        name: "Optive",
        kind: "פלטפורמת SaaS · CTO ומייסד שותף",
        year: "2025-2026",
        link: "https://app.0ptive.com/",
        linkLabel: "למערכת",
        shots: shots.optive,
        desc: "פלטפורמה מרובת לקוחות שמפעילה סוכני AI בעברית, בכתב ובקול, עבור עסקים קטנים ובינוניים: סינון לידים, מענה ללקוחות, תיאום פגישות והחזרת לקוחות שנעלמו.",
        highlights: [
          "שרת MCP שפיתחתי עם כ־50 כלים, שמאפשר להקים, לבדוק ולכייל סוכן שלם בשיחה בלי לגעת בממשק",
          "סוכני WhatsApp שמבצעים פעולות אמיתיות באמצע שיחה: בדיקת זמינות ביומן, שליפת מחיר, רישום ב־CRM ושליחת תמונות, סרטונים ומחירונים",
          "סוכנים קוליים בזמן אמת עם streaming מקצה לקצה, כולל שיחות נכנסות וקמפיינים של חיוג יוצא",
          "בחירת מודל לכל סוכן (Claude, Gemini, GPT) כדי לאזן בין עלות, מהירות ואיכות",
          "טריגרים, follow-ups אוטומטיים, העברה לנציג אנושי וסיכומי שיחה שנשלחים למערכות הלקוח",
        ],
        strategy:
          "מיפיתי את השוק בישראל ומיצבתי את Optive בפער שבין בתי תוכנה שבונים פרויקטים יקרים לבין כלים שעובדים רק ב־WhatsApp: קול וכתב בפלטפורמה אחת, במהירות ובמחיר של SaaS.",
        model:
          "דמי הקמה ומנוי חודשי לפי נפח לידים, לא לפי דקות, כי בעל עסק חושב בלידים ובעסקאות. דקת שיחה עלתה 8-11 אגורות, והמרווח הגולמי ללקוח היה גבוה.",
        lesson:
          "ניתחתי את המשפך לפני הסגירה: 28% סגירה ממי שקיבל הצעה, אבל רוב שיחות המכירה לא הגיעו להצעה. מאז אני מודד כל SaaS לפי הכנסה חוזרת ויחס CAC, ולא לפי מספר הלקוחות.",
        stack: ["GCP · GKE", "Next.js", "PostgreSQL + pgvector", "Redis · BullMQ", "Vertex AI RAG", "MCP", "Telnyx", "Deepgram", "Gemini Live", "ElevenLabs", "n8n"],
      },
      {
        name: "התראה בקליק",
        kind: "Legal-tech · מוצר",
        year: "2026",
        link: "https://hatraabeclick.com/",
        linkLabel: "לאתר",
        shots: shots.hatraa,
        desc: "מחולל מכתבי התראה משפטיים שבניתי עם עורך דין. המשתמש מספר מה קרה, בטקסט או בקול, ותוך כשלוש דקות מקבל מכתב רשמי מוכן לשליחה. בלי הרשמה ובלי שפה משפטית.",
        highlights: [
          "ארכיטקטורה שמונעת הזיות משפטיות: מאגר חוק סגור שאומת על ידי עורך דין, וסעיף שלא נמצא במאגר לא נכנס למכתב",
          "חלוקת עבודה בין מודלים: Gemini Flash מחלץ עובדות במהירות, Claude Sonnet מנסח ברמת כתיבה גבוהה",
          "חמש קטגוריות: צרכנות, שכירות, עבודה, שכנים ובנקים",
          "בסיס קוד שממוחזר בכ־80% למוצר הבא, החזר מס בקליק",
        ],
        strategy:
          "בדקתי את הביקוש לפני שהשקעתי בפרסום. נפח החיפוש בירידה והכוונה ברובה אינפורמטיבית, ולכן הכיוון הוא תוכן שתופס את שלב המחקר וממיר בתוך האתר.",
        model:
          "משפך ולא מנוי: מכתב חינמי שמסיר חיכוך, חתימת עורך דין ב־250 ₪ כשדרוג, ומשתמשים עם סכסוך אמיתי כלידים איכותיים למשרדי עורכי דין.",
        lesson: "במסמך משפטי אמינות קודמת ליכולת. ניסוח עובדתי עדיף על סעיף שנשמע נכון.",
        stack: ["Next.js", "PostgreSQL · Prisma", "Gemini Flash", "Claude Sonnet", "PayPlus", "Vercel"],
      },
      {
        name: "מתחת למכסה המנוע",
        kind: "פודקאסט · מגיש שותף",
        year: "2026",
        link: "https://mitachat-lamichse.vercel.app/",
        linkLabel: "לאתר",
        link2: "https://www.youtube.com/@UTH-Official",
        link2Label: "YouTube",
        shots: shots.hood,
        desc: "פודקאסט בעברית על AI וטכנולוגיה שאני מגיש עם דורון סויסה, CTO קליינטו. לאנשים סקרנים שנמאס להם מתוכן שטחי ומלא הייפ. פרק חדש כל שבועיים.",
        highlights: [
          "שיטת חמש שכבות עומק: מהרעש, דרך הטכנולוגיה, ועד מה שקורה באמת מתחת למכסה המנוע",
          "נושאים כמו טוקניזציה, embeddings, חלון הקשר, RAG, קוונטיזציה ועלות אסימונים",
          "שילוב של מפתח וחוקר עם מי שמיישם מערכות AI בעסקים אמיתיים, כדי לבדוק טענות מול מה שעובד בפועל",
        ],
        strategy: "הפודקאסט הוא נכס סמכות. הוא בונה מותג ואמון מול בונים ומקבלי החלטות ומזין את הצנרת העסקית.",
        model: "לא מוכר ישירות. טופס \"על מה תרצו שנדבר\" באתר משמש גם כמחקר קהל.",
        lesson: "",
        stack: ["Next.js", "Vercel", "Cloudflare R2", "YouTube"],
      },
    ],
    eduLabel: "השכלה",
    enlarge: "הגדלה",
    education: [
      {
        name: "AI & Machine Learning",
        org: "Success College · 450 שעות",
        time: "2025",
        note: "Python, OOP, SQL, Machine Learning, Deep Learning (CNN, RNN, LSTM), Reinforcement Learning",
        cert: "/media/cert-ai.webp",
      },
      {
        name: "Digital Marketing PRO",
        org: "Success College · 450 שעות",
        time: "2025",
        note: "אסטרטגיה, משפכי המרה, Google Ads, Meta Ads, TikTok Ads, GA4, GTM ומדידת המרות",
        grade: "ציון 95",
        cert: "/media/cert-marketing.webp",
      },
    ],
    skillsLabel: "כישורים",
    skills: [
      { group: "ניהול", items: ["Business Operations", "Team Leadership", "Product Management", "Revenue Generation"] },
      { group: "AI ופיתוח", items: ["Python", "TypeScript", "RAG / Embeddings", "LLM APIs", "Voice AI"] },
      { group: "תשתיות", items: ["GCP / GKE", "PostgreSQL", "Redis", "Docker", "CI/CD"] },
      { group: "שיווק", items: ["Marketing Strategy", "Google / Meta Ads", "Analytics", "Funnels & CRO"] },
    ],
    contactLabel: "קשר",
    contactTitle: "בואו נדבר.",
    contact: [
      { k: "אימייל", v: "etantur@gmail.com", href: "mailto:etantur@gmail.com" },
      { k: "טלפון", v: "052-300-6544", href: "tel:+972523006544" },
      { k: "LinkedIn", v: "in/eytan-turgeman", href: linkedin },
    ],
    footer: "© 2026 איתן טורג׳מן",
    credit: "תוכנן, עוצב ונבנה על ידי איתן דוד טורג׳מן",
    botCredit: "נבנה ותוכנן על ידי איתן דוד טורג׳מן",
    pdf: "הורדת קו״ח",
    pdfBusy: "מכין את הקובץ",
    hedName: "שי",
    hedMark: "סוכן שפיתחתי לנוחיותכם",
    hedPlaceholder: "שאלה על הניסיון, על פרויקט, על תפקיד",
    hedSend: "שליחה",
    hedClose: "סגירה",
    hedReset: "איפוס",
    hedSuggestions: [
      "מה הוא בנה בקליינטו בארבעה חודשים?",
      "איך Optive מרוויחה, ולמה לא לפי דקות?",
      "מה מונע הזיות במכתב של התראה בקליק?",
    ],
    hedGreeting: "אני שי. אני מכיר את העבודה של איתן. מה תרצה לדעת?",
    hedThinking: "רגע.",
    hedError: "התשובה נעצרה באמצע. אפשר לנסות שוב.",
    hedBusy: "שי עמוס לרגע. אפשר לנסות שוב בעוד דקה.",
    hedMissing: "המפתח עדיין לא בשרת. שים GEMINI_API_KEY ב־.env.local.",
    hedLimit: "השיחה מלאה. השאלה הבאה תזיז את הראשונה החוצה.",
  },
  en: {
    dir: "ltr",
    first: "Eytan",
    last: "Turgeman",
    full: "Eytan David Turgeman",
    role: "Head of Operations · AI Systems · Business Strategy",
    location: "Petah Tikva, Israel",
    available: "Open to leadership roles",
    heroKicker: "Beyond the system",
    heroTitle: "Technology. Marketing. Business sense.",
    expertiseLabel: "Areas of expertise:",
    expertise: [
      { label: "Operations & leadership", to: "experience" },
      { label: "AI systems", to: "projects" },
      { label: "Strategy & marketing", to: "about" },
    ],
    nav: [
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "education", label: "Education" },
      { id: "contact", label: "Contact" },
    ],
    aboutLabel: "About",
    statement: "I know how to spot what actually moves a company forward, and build everything else around it.",
    aboutLead:
      "In every company, a handful of things drive most of the results. First I find them, then I give each one a metric and a target, and only then do I build the systems and the team around them.",
    aboutBody: [
      "I was a co-founder and CTO of a company building voice and text AI agents, running in production for dozens of clients. Since then I've focused on management, influence, architecture and development, because AI can already write the code for me.",
      "My background is technical, mostly architecture and infrastructure, but I've also managed marketing budgets and built business models. So I'm just as comfortable talking to the developers as to whoever holds the budget.",
    ],
    facts: [
      { k: "Years leading", v: "5+" },
      { k: "Clients in production", v: "40+" },
      { k: "SOPs written", v: "24" },
    ],
    commandStat: { k: "Years in command", v: "3" },
    expLabel: "Experience",
    experience: [
      {
        role: "Head of Operations",
        org: "Kliento",
        logo: "/media/logos/kliento.webp",
        url: "https://kliento.tech/",
        time: "Jun 2026 to present",
        place: "Petah Tikva · Hybrid",
        summary:
          "Built the Operations division from scratch: Implementation and Customer Success units, the automations line, and a per-client capacity and margin model.",
        points: [
          "Built the Operations division from scratch: Implementation and Customer Success units, ownership of the automation line, and a capacity and margin model per client.",
          "Wrote a 17-chapter operations framework and 24 SOPs, plus a KPI structure covering SLA, churn, Time-to-Live and Health Score.",
          "Managed an engineering team across a 10-stage client pipeline, from spec to go-live.",
          "End-to-end specs and rollout of agents, BI systems and switchboards at scale, saving thousands of shekels.",
        ],
      },
      {
        role: "CTO & Co-Founder",
        org: "Optive LTD",
        logo: "/media/logos/optive.webp",
        url: "https://www.0ptive.com/",
        time: "Jul 2025 to May 2026",
        place: "Israel",
        summary: "Designed and built an AI platform of voice and text agents for SMBs, from architecture to go-to-market.",
        points: [
          "End-to-end architectural design, infrastructure selection, development and deployment of two production AI platforms serving dozens of paying customers and tens of thousands of AI-managed conversations: (1) Voice AI, a real-time calling system with Telnyx WebSocket bidirectional audio, Gemini Live API (Vertex AI), Deepgram transcription, and GKE with horizontal scaling. (2) WhatsApp AI, a multi-tenant agent platform designed for scale and security with FastAPI, pgvector RAG, and multi-provider LLM orchestration. Both passed Google OAuth Verification.",
          "Voice platform: TypeScript monorepo (pnpm), Express + BullMQ workers (outbound calls, recordings, summaries, reminders, webhooks), Redis Pub/Sub for real-time SSE events, Prisma ORM, GCS for recordings, and Gemini function-calling with auto-reconnect for long sessions.",
          "WhatsApp platform: async Python (FastAPI), PostgreSQL + pgvector (cosine-distance retrieval, 1536-dim embeddings), Celery background tasks, multi-provider LLM (Anthropic/OpenAI/Gemini) with key pooling and round-robin, Docker Compose orchestration, JWT + RBAC, Google Calendar OAuth, and Cloudflare R2 storage.",
          "Managed a team of 8 developers: sprint planning, task breakdown and delegation, CRM-based workflow management, deadline enforcement, code reviews, and performance tracking. Owned a six-figure operational budget with full P&L responsibility, optimizing resource allocation to maximize output against business priorities.",
        ],
      },
      {
        role: "Marketing Consultant",
        org: "Vegeta Marketing",
        logo: "/media/logos/vegeta.webp",
        url: "https://vegeta.co.il/",
        time: "May 2025 to Dec 2025",
        place: "Petah Tikva",
        summary: "Strategic consulting for hundreds of businesses: platform selection, funnels, budget and campaign planning.",
        points: [
          "Provided strategic marketing consultations to hundreds of businesses across diverse verticals, developing tailored growth strategies including platform selection, funnel architecture, budget allocation, and campaign planning based on industry dynamics, audience segmentation, and business model.",
          "Managed end-to-end client engagements: strategic business cracking (identifying the right angle and offer), marketing cracking (matching channels, messaging, and funnels to the business), market analysis, competitive positioning, media mix modeling, and ad spend advisory. Closed customized packages ranging from 15K to 80K NIS per client.",
          "Specialized in diagnosing underperforming acquisition channels, restructuring funnel flows, and implementing data-driven optimization frameworks that delivered measurable ROAS improvements across paid search, social, and programmatic.",
        ],
      },
      {
        role: "Paid Media Manager",
        org: "Digim",
        logo: "/media/logos/digim.webp",
        url: "https://digim.co.il/",
        time: "Jan 2025 to Jun 2025",
        place: "North District",
        summary: "Managed Google and Meta campaigns with six-figure monthly budgets.",
        points: [
          "Built and launched Google and Meta campaigns from scratch for multiple e-commerce and lead-gen clients simultaneously, managing six-figure monthly budgets with full ownership of strategy, execution, and optimization.",
          "Implemented full tracking infrastructure: Meta Pixel integration, Google Tag Manager event setup, server-side conversions, UTM architecture, and GA4 configuration for precise attribution and ROAS measurement.",
          "Led end-to-end creative production: writing strategic briefs, directing a graphic design team, designing UX/UI for landing pages, managing A/B testing workflows, and delivering performance reports to clients.",
        ],
      },
      {
        role: "Combat Engineering Force Commander",
        org: "IDF",
        logo: "/media/logos/idf.webp",
        time: "Nov 2021 to Dec 2024",
        place: "Israel",
        summary: "Commanded task-based forces in operational activity, with real-time decisions and coordination across roles and equipment.",
        points: [
          "Led soldiers in active combat during wartime operations (Iron Swords), responsible for real-time tactical decisions, team coordination, and mission execution under extreme pressure.",
          "Built leadership habits that carry into business: managing deadlines under pressure, rapid prioritization with incomplete data, leading cross-functional teams, and staying steady in chaos.",
          "A zero-tolerance stance on execution gaps: every decision has consequences, every detail matters, and every team member needs to be aligned and accountable.",
        ],
      },
    ],
    projLabel: "Projects",
    projIntro:
      "Three products, three markets, one method. I build where technology meets real money: systems serving paying customers, not demos left in a drawer.",
    highlightsLabel: "Key capabilities",
    lessonLabel: "What I learned",
    strategyLabel: "Business strategy",
    modelLabel: "Business model",
    stackLabel: "Tech stack",
    projects: [
      {
        name: "Optive",
        kind: "SaaS platform · CTO & Co-founder",
        year: "2025-2026",
        link: "https://app.0ptive.com/",
        linkLabel: "Open app",
        shots: shots.optive,
        desc: "A multi-tenant platform running Hebrew-speaking AI agents, over text and voice, for small and mid-sized businesses: lead qualification, customer replies, scheduling and win-back.",
        highlights: [
          "An MCP server I built with ~50 tools, so a complete agent can be created, tested and tuned in conversation, without touching the UI",
          "WhatsApp agents that take real actions mid-conversation: calendar checks, pricing, CRM entries, and sending images, videos and price lists",
          "Real-time voice agents with end-to-end streaming, inbound calls and outbound dialing campaigns",
          "Per-agent model choice (Claude, Gemini, GPT) to balance cost, speed and quality",
          "Triggers, automated follow-ups, human hand-off and conversation summaries pushed to client systems",
        ],
        strategy:
          "I mapped the Israeli market and positioned Optive in the gap between custom-build agencies and WhatsApp-only tools: voice and text in one platform, at SaaS speed and price.",
        model:
          "Setup fee plus a monthly plan priced by lead volume, not minutes, because owners think in leads and deals. A voice minute cost 8-11 agorot, leaving a high gross margin per client.",
        lesson:
          "I analyzed the funnel before closing: 28% close rate once a quote was sent, but most sales calls never reached a quote. Since then I measure every SaaS by recurring revenue and CAC, not client count.",
        stack: ["GCP · GKE", "Next.js", "PostgreSQL + pgvector", "Redis · BullMQ", "Vertex AI RAG", "MCP", "Telnyx", "Deepgram", "Gemini Live", "ElevenLabs", "n8n"],
      },
      {
        name: "Hatraa BeClick",
        kind: "Legal-tech · Product",
        year: "2026",
        link: "https://hatraabeclick.com/",
        linkLabel: "Visit site",
        shots: shots.hatraa,
        desc: "A legal demand-letter generator built with an attorney. Users describe what happened, in text or voice, and get a formal letter ready to send in about three minutes. No sign-up, no legal jargon.",
        highlights: [
          "Architecture that prevents legal hallucinations: a closed, attorney-verified law base, and any clause not in it stays out of the letter",
          "Model split: Gemini Flash extracts facts fast, Claude Sonnet drafts at high writing quality",
          "Five categories: consumer, rental, employment, neighbors and banking",
          "About 80% of the codebase is reused for the next product, a tax-refund generator",
        ],
        strategy:
          "I validated demand before spending on ads. Search volume is declining and intent is mostly informational, so the plan is content that captures research intent and converts on-site.",
        model:
          "A funnel, not a subscription: a free letter that removes friction, an attorney signature for 250 NIS as the upsell, and users with real disputes as qualified leads for law firms.",
        lesson: "In a legal document, reliability comes before capability. A factual phrasing beats a clause that only sounds right.",
        stack: ["Next.js", "PostgreSQL · Prisma", "Gemini Flash", "Claude Sonnet", "PayPlus", "Vercel"],
      },
      {
        name: "Under the Hood",
        kind: "Podcast · Co-host",
        year: "2026",
        link: "https://mitachat-lamichse.vercel.app/",
        linkLabel: "Visit site",
        link2: "https://www.youtube.com/@UTH-Official",
        link2Label: "YouTube",
        shots: shots.hood,
        desc: "A Hebrew podcast on AI and technology, co-hosted with Doron Swissa, CTO of Kliento. For curious people tired of shallow, hype-driven AI content. A new episode every two weeks.",
        highlights: [
          "A five-layer method: from the noise, through the technology, to what really happens under the hood",
          "Topics like tokenization, embeddings, context windows, RAG, quantization and token economics",
          "A developer-researcher paired with someone deploying AI in real businesses, testing claims against what works",
        ],
        strategy: "The podcast is an authority asset. It builds brand and trust with builders and decision-makers and feeds the business pipeline.",
        model: "Not sold directly. The on-site topic request form doubles as audience research.",
        lesson: "",
        stack: ["Next.js", "Vercel", "Cloudflare R2", "YouTube"],
      },
    ],
    eduLabel: "Education",
    enlarge: "Enlarge",
    education: [
      {
        name: "AI & Machine Learning",
        org: "Success College · 450 hrs",
        time: "2025",
        note: "Python, OOP, SQL, Machine Learning, Deep Learning (CNN, RNN, LSTM), Reinforcement Learning",
        cert: "/media/cert-ai.webp",
      },
      {
        name: "Digital Marketing PRO",
        org: "Success College · 450 hrs",
        time: "2025",
        note: "Strategy, conversion funnels, Google Ads, Meta Ads, TikTok Ads, GA4, GTM and conversion tracking",
        grade: "Grade 95",
        cert: "/media/cert-marketing.webp",
      },
    ],
    skillsLabel: "Skills",
    skills: [
      { group: "Leadership", items: ["Business Operations", "Team Leadership", "Product Management", "Revenue Generation"] },
      { group: "AI & Dev", items: ["Python", "TypeScript", "RAG / Embeddings", "LLM APIs", "Voice AI"] },
      { group: "Infrastructure", items: ["GCP / GKE", "PostgreSQL", "Redis", "Docker", "CI/CD"] },
      { group: "Marketing", items: ["Marketing Strategy", "Google / Meta Ads", "Analytics", "Funnels & CRO"] },
    ],
    contactLabel: "Contact",
    contactTitle: "Let's talk.",
    contact: [
      { k: "Email", v: "etantur@gmail.com", href: "mailto:etantur@gmail.com" },
      { k: "Phone", v: "+972 52 300 6544", href: "tel:+972523006544" },
      { k: "LinkedIn", v: "in/eytan-turgeman", href: linkedin },
    ],
    footer: "© 2026 Eytan Turgeman",
    credit: "Designed and built by Eytan David Turgeman",
    botCredit: "Designed and built by Eytan David Turgeman",
    pdf: "Download CV",
    pdfBusy: "Preparing",
    hedName: "Shai",
    hedMark: "An agent I built for you",
    hedPlaceholder: "A question about the experience, a project, a role",
    hedSend: "Send",
    hedClose: "Close",
    hedReset: "Reset",
    hedSuggestions: [
      "What did he build at Kliento in four months?",
      "How does Optive charge, and why not by the minute?",
      "What stops legal hallucinations in Hatraa BeClick?",
    ],
    hedGreeting: "I'm Shai. I know Eytan's work. What do you want to know?",
    hedThinking: "One moment.",
    hedError: "That answer stopped halfway. Try again.",
    hedBusy: "Shai is busy for a moment. Try again in a minute.",
    hedMissing: "The key is not on the server yet. Put GEMINI_API_KEY in .env.local.",
    hedLimit: "This conversation is full. The next question drops the first one.",
  },
};

export const sectionIds = ["top", "about", "experience", "projects", "education", "contact"] as const;

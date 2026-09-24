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
  expertise: { label: string; to: string }[];
  nav: { id: string; label: string }[];
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
  hedThinking: string;
  hedError: string;
  hedBusy: string;
  hedMissing: string;
  hedLimit: string;
  hedGateTitle: string;
  hedGateLine: string;
  hedGateName: string;
  hedGatePhone: string;
  hedGateRole: string;
  hedGateSend: string;
  hedGateBack: string;
  hedGateError: string;
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
    heroKicker: "מֵעֵבר למערכת",
    heroTitle: "טכנולוגיה. שיווק. הבנה עסקית.",
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
    statement: "אני יודע לזהות מה באמת מקדם חברה, ולבנות סביב זה את כל השאר.",
    aboutLead:
      "בכל חברה יש כמה דברים בודדים שקובעים את רוב התוצאות. קודם כול אני מאתר אותם, אחר כך מגדיר לכל אחד מדד ויעד, ורק אז בונה סביבם מערכות וצוות.",
    aboutBody: [
      "הייתי שותף מייסד ו־CTO בחברה שפיתחה סוכני AI לקול ולטקסט. המערכת רצה אצל עשרות לקוחות בפרודקשן. מאז אני מתמקד בניהול, בהשפעה, בארכיטקטורה ובפיתוח, כי AI כבר יכול לכתוב את הקוד בשבילי.",
      "הרקע שלי התחיל בשיווק, משם עברתי לפיתוח תוכנה ב-Python וב-JS, ואחר כך לארכיטקטורה. לכן אני מדבר באותה קלות עם המפתחים ועם מי שמחזיק את התקציב.",
    ],
    facts: [
      { k: "שנות ניהול ומנהיגות", v: "5+" },
      { k: "לקוחות בפרודקשן", v: "40+" },
      { k: "מפתחים בצוותים שניהלתי", v: "8" },
    ],
    commandStat: { k: "SOPs שכתבתי", v: "23+" },
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
          "הובלתי את חטיבת התפעול בקליינטו, חברת AI ישראלית שמספקת סוכנים קוליים וכתובים, מערכות CRM ומרכזיות לעסקים קטנים ובינוניים. עבדתי בשיתוף פעולה צמוד עם המנכ״ל וה-CTO.",
        points: [
          "הקמתי את החטיבה מאפס בתוך ארבעה חודשים: יחידת הטמעה, שליוותה את הלקוח מחתימת החוזה ועד העלייה לאוויר, ויחידת Customer\u00A0Success. בנוסף הייתי אחראי על קו האוטומציות.",
          "תכננתי את מערכת ההפעלה של החטיבה: מסגרת תפעול בת 17 פרקים, יותר מ-24 נהלי עבודה, ומבנה מדדים שכלל עמידה ב-SLA, נטישה, זמן עלייה לאוויר ומדד בריאות לקוח.",
          "בניתי מודל קיבולת ורווחיות לכל לקוח, עם תחזיות פיננסיות שעליהן נשענו החלטות הגיוס והתקינה.",
          "ניהלתי צוות מהנדסים לאורך תהליך לקוח בן 10 שלבים. תרגמתי צרכים עסקיים לאפיון טכני, והייתי אחראי על הביצוע עד הפרודקשן ואחריו.",
          "תכננתי מערכת אסקלציה וניתוב משימות, כדי לשמור על הפוקוס של הנהלת הפיתוח.",
        ],
      },
      {
        role: "CTO ומייסד שותף",
        org: "Optive LTD",
        logo: "/media/logos/optive.webp",
        url: "https://www.0ptive.com/",
        time: "יולי 2025 עד מאי 2026",
        place: "ישראל",
        summary:
          "הקמתי את Optive יחד עם שותף ושימשתי בה גם כ-CTO וגם כמנהל השיווק. הייתי אחראי על המוצר מהארכיטקטורה ועד היציאה לשוק. הסוכנים הקוליים והכתובים של Optive ניהלו שיחות אמיתיות עם לקוחות של עסקים קטנים ובינוניים בישראל.",
        points: [
          "תכננתי ובניתי פלטפורמת סוכנים קוליים בזמן אמת: אודיו דו-כיווני ב-Telnyx, Gemini\u00A0Live, תמלול ב-Deepgram וסקייל אופקי על GKE. הפלטפורמה טיפלה בשיחות נכנסות ובקמפיינים של חיוג יוצא.",
          "תכננתי ובניתי פלטפורמת סוכני WhatsApp מרובת לקוחות על FastAPI, עם RAG מבוסס pgvector ותזמור של כמה ספקי LLM. הסוכנים הפעילו פונקציות באמצע שיחה ושלחו מדיה בהתאם להקשר.",
          "ניהלתי צוות של 8 מפתחים: תכנון ספרינטים, חלוקת משימות, סקירות קוד ועמידה בלוחות זמנים.",
          "הובלתי את היציאה לשוק: מיצוב, מודל תמחור, קמפיינים ממומנים ומשפכי לידים.",
          "ניהלתי את כל מחזור החיים של הלקוח, מבירור הצרכים והקליטה, דרך ההטמעה והאופטימיזציה ועד התמיכה השוטפת.",
          "ניהלתי תקציב תפעולי של מאות אלפי שקלים והקציתי משאבים לפי סדרי העדיפויות העסקיים.",
        ],
      },
      {
        role: "יועץ שיווק",
        org: "Vegeta Marketing",
        logo: "/media/logos/vegeta.webp",
        url: "https://vegeta.co.il/",
        time: "מאי 2025 עד דצמבר 2025",
        place: "פתח תקווה",
        summary: "ייעצתי לבעלי עסקים בנושאי צמיחה. לכל עסק בניתי תוכנית שיווק מעשית, שנגזרה מהמודל העסקי, מהקהל ומהשוק שלו.",
        points: [
          "ייעצתי למאות עסקים ממגוון תחומים בבחירת פלטפורמות, בבניית משפכים, בהקצאת תקציב ובתכנון קמפיינים.",
          "אבחנתי ערוצי רכישה שלא מיצו את הפוטנציאל שלהם, ובניתי מחדש משפכים סביב ההצעה והקהל של כל עסק.",
          "מכרתי חבילות שיווק מותאמות בהיקף של 15 עד 80 אלף ₪ ללקוח, וליוויתי כל התקשרות מהשיחה הראשונה ועד הסגירה.",
        ],
      },
      {
        role: "מנהל פרסום ממומן",
        org: "Digim",
        logo: "/media/logos/digim.webp",
        url: "https://digim.co.il/",
        time: "ינואר 2025 עד יוני 2025",
        place: "מחוז דרום",
        summary: "הייתי אחראי על הרכישה הממומנת של כמה לקוחות במקביל, בתחומי המסחר המקוון ויצירת הלידים. ניהלתי תקציבים חודשיים של מאות אלפי שקלים בגוגל, במטא ובפלטפורמות נוספות.",
        points: [
          "ניהלתי את מחזור החיים המלא של הקמפיינים: אסטרטגיה, קופירייטינג, הכוונת קריאייטיב, תכנון דפי נחיתה, ניהול תקציב ודיווח.",
          "הקמתי תשתית מדידה שכללה הטמעת פיקסלים, מבנה UTM ומעקב המרות, לייחוס מדויק של התוצאות.",
          "ניתחתי נתונים עסקיים ונתוני קמפיינים כדי לשפר את הביצועים ואת ההחזר על ההשקעה של הלקוחות.",
          "שימשתי איש הקשר המרכזי של הלקוחות וניהלתי את התיקים שלהם מקצה לקצה.",
        ],
      },
      {
        role: "מפקד כוח, הנדסה קרבית",
        org: "צה״ל",
        logo: "/media/logos/idf.webp",
        time: "נובמבר 2021 עד דצמבר 2024",
        place: "ישראל",
        summary: "פיקדתי על כוחות הנדסה קרבית בפעילות מבצעית, כולל לחימה במלחמת חרבות ברזל.",
        points: [
          "הובלתי כוחות משימתיים שהורכבו לכל משימה מחדש ולא בחוליה קבועה, ותיאמתי בין בעלי תפקידים וכלים הנדסיים שונים.",
          "קיבלתי החלטות טקטיות בזמן אמת ותחת לחץ, מתכנון המשימה ועד הביצוע.",
          "הוסמכתי כרובאי 08 וכחבלן 09, עם הסמכה נוספת להפעלת כלים הנדסיים וציוד כבד.",
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
    hedThinking: "רגע.",
    hedError: "התשובה נעצרה באמצע. אפשר לנסות שוב.",
    hedBusy: "שי עמוס לרגע. אפשר לנסות שוב בעוד דקה.",
    hedMissing: "המפתח עדיין לא בשרת. שים GEMINI_API_KEY ב־.env.local.",
    hedLimit: "השיחה מלאה. השאלה הבאה תזיז את הראשונה החוצה.",
    hedGateTitle: "רגע לפני התשובה",
    hedGateLine: "כמה פרטים, ואיתן יוכל לחזור אליך בהמשך.",
    hedGateName: "שם",
    hedGatePhone: "טלפון",
    hedGateRole: "תפקיד",
    hedGateSend: "לתשובה",
    hedGateBack: "חזרה לשאלה",
    hedGateError: "צריך שם, טלפון ותפקיד.",
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
    statement: "I know how to spot what actually moves a company forward, and build everything else around it.",
    aboutLead:
      "In every company, a handful of things drive most of the results. First I find them, then I give each one a metric and a target, and only then do I build the systems and the team around them.",
    aboutBody: [
      "I was a co-founder and CTO of a company building voice and text AI agents, running in production for dozens of clients. Since then I've focused on management, influence, architecture and development, because AI can already write the code for me.",
      "My background started in marketing, then moved into software development in Python and JS, and then into architecture. So I'm just as comfortable talking to the developers as to whoever holds the budget.",
    ],
    facts: [
      { k: "Years managing and leading", v: "5+" },
      { k: "Clients in production", v: "40+" },
      { k: "Developers across teams I managed", v: "8" },
    ],
    commandStat: { k: "SOPs I wrote", v: "23+" },
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
          "Led the Operations division at Kliento, an Israeli AI company delivering voice and text agents, CRM and switchboard systems to SMB and mid-market clients. Worked in close partnership with the CEO and CTO.",
        points: [
          "Built the division from zero within four months: two units, Implementation (contract to go-live) and Customer\u00A0Success, plus ownership of the automations line.",
          "Designed the operating system the division ran on: a 17-chapter operations framework, 24+ SOPs and a KPI structure covering SLA compliance, churn, Time-to-Live and Health\u00A0Score.",
          "Built a per-client capacity and margin model with financial projections that drove headcount and hiring decisions.",
          "Led a team of engineers across a 10-stage client pipeline. Translated business needs into technical specs and owned execution through production and post-launch.",
          "Designed an escalation and task-routing system that kept engineering leadership focused on the roadmap.",
        ],
      },
      {
        role: "CTO & Co-Founder",
        org: "Optive LTD",
        logo: "/media/logos/optive.webp",
        url: "https://www.0ptive.com/",
        time: "Jul 2025 to May 2026",
        place: "Israel",
        summary:
          "Co-founded Optive and served as both CTO and Head of Marketing, owning the product from architecture to go-to-market. Optive's voice and text AI agents handled real customer conversations for Israeli SMBs.",
        points: [
          "Architected and shipped a real-time Voice AI platform: bidirectional Telnyx audio, Gemini\u00A0Live, Deepgram transcription and horizontally scaled GKE. It handled inbound calls and outbound campaigns.",
          "Architected and shipped a multi-tenant WhatsApp agent platform: FastAPI, pgvector RAG and multi-provider LLM orchestration. Agents ran functions mid-conversation and sent media in context.",
          "Led a team of 8 developers: sprint planning, delegation, code reviews and delivery against deadlines.",
          "Owned go-to-market: positioning, pricing model, paid campaigns and lead-generation funnels.",
          "Ran the full client lifecycle, from discovery and onboarding through deployment, optimization and ongoing support.",
          "Managed a six-figure operating budget and allocated resources against business priorities.",
        ],
      },
      {
        role: "Marketing Consultant",
        org: "Vegeta Marketing",
        logo: "/media/logos/vegeta.webp",
        url: "https://vegeta.co.il/",
        time: "May 2025 to Dec 2025",
        place: "Petah Tikva",
        summary: "Advised business owners on growth, turning each business's model, audience and market into a concrete marketing plan.",
        points: [
          "Consulted hundreds of businesses across diverse verticals on platform selection, funnel architecture, budget allocation and campaign planning.",
          "Diagnosed underperforming acquisition channels and rebuilt funnels around each business's offer and audience.",
          "Sold customized marketing packages from ₪15K to ₪80K per client, and owned each engagement from first call to close.",
        ],
      },
      {
        role: "Paid Media Manager",
        org: "Digim",
        logo: "/media/logos/digim.webp",
        url: "https://digim.co.il/",
        time: "Jan 2025 to Jun 2025",
        place: "South District",
        summary: "Owned paid acquisition for multiple e-commerce and lead-gen clients, managing six-figure monthly budgets across Google, Meta and other platforms.",
        points: [
          "Ran the full campaign lifecycle: strategy, copywriting, creative direction, landing-page planning, budget management and reporting.",
          "Built tracking infrastructure, including pixel integration, UTM architecture and conversion tracking, for accurate attribution.",
          "Analyzed business and campaign data to optimize performance and client ROI.",
          "Managed client accounts end-to-end as the primary point of contact.",
        ],
      },
      {
        role: "Combat Engineering Force Commander",
        org: "IDF",
        logo: "/media/logos/idf.webp",
        time: "Nov 2021 to Dec 2024",
        place: "Israel",
        summary: "Commanded combat engineering forces in operational missions, including wartime operations during Swords of Iron.",
        points: [
          "Led task-based forces assembled per mission rather than a fixed squad, coordinating multiple roles and equipment types.",
          "Made real-time tactical decisions under pressure, from mission planning through execution.",
          "Qualified as Combat Engineer (08) and Demolitions Specialist (09), with certification in engineering vehicles and heavy equipment.",
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
    hedThinking: "One moment.",
    hedError: "That answer stopped halfway. Try again.",
    hedBusy: "Shai is busy for a moment. Try again in a minute.",
    hedMissing: "The key is not on the server yet. Put GEMINI_API_KEY in .env.local.",
    hedLimit: "This conversation is full. The next question drops the first one.",
    hedGateTitle: "One moment before the answer",
    hedGateLine: "A few details, so Eytan can follow up with you.",
    hedGateName: "Name",
    hedGatePhone: "Phone",
    hedGateRole: "Role",
    hedGateSend: "Get the answer",
    hedGateBack: "Back to the question",
    hedGateError: "Name, phone and role are needed.",
  },
};

export const sectionIds = ["top", "about", "experience", "projects", "education", "contact"] as const;

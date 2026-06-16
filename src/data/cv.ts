export type Locale = "en" | "he";

export interface CVContent {
  meta: {
    name: string;
    title: string;
    location: string;
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
      name: "Eytan Turgeman",
      title: "AI Solutions Developer | Marketing & Strategist",
      location: "Beer Sheva, Israel",
      linkedin: "https://linkedin.com/in/eytan-turgeman",
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
      highlights: ["AI Systems", "Marketing ROI", "Team Leadership"],
    },
    about: {
      title: "About",
      text: "AI Solutions Developer with a marketing strategy background. I build and implement AI systems for businesses — from agents to full automation pipelines — and connect them to real business outcomes like sales, leads, and customer retention. Hands-on experience with Python and JavaScript for building AI-driven solutions.",
      pills: [
        { label: "AI & Engineering", icon: "cpu" },
        { label: "Growth & Marketing", icon: "chart" },
        { label: "Leadership", icon: "users" },
      ],
    },
    experience: {
      title: "Experience",
      items: [
        {
          id: "optive",
          role: "CTO & Co-Founder",
          company: "Optive LTD",
          period: "Jul 2025 – May 2026",
          logo: "/images/logos/optive.svg",
          bullets: [
            "Built Optive's AI platform from scratch — voice & text agents for SMB customer interactions.",
            "Managed technical architecture (GCP, GKE, voice AI, RAG) and marketing strategy (paid campaigns, funnels, lead gen).",
            "Led development team through full product lifecycle: consulting, deployment, fine-tuning, and maintenance.",
          ],
        },
        {
          id: "vegeta",
          role: "Marketing Consultant",
          company: "Vegeta Marketing",
          period: "May 2025 – Dec 2025",
          logo: "/images/logos/vegeta.svg",
          bullets: [
            "Strategic marketing consultations for hundreds of businesses.",
            "Tailored strategies: platform selection, funnel planning, budget allocation, campaign planning.",
            "Sold customized marketing packages ranging from 15K to 80K NIS per client.",
          ],
        },
        {
          id: "digim",
          role: "Paid Media Manager",
          company: "Digim",
          period: "Jan 2025 – Jun 2025",
          logo: "/images/logos/digim.svg",
          bullets: [
            "Managed paid campaigns on Google & Meta with six-figure monthly budgets.",
            "Full campaign lifecycle: strategy, copywriting, creative direction, landing pages, reporting.",
            "Implemented tracking infrastructure: pixels, UTM, conversion tracking for e-commerce & lead-gen.",
          ],
        },
        {
          id: "idf",
          role: "Combat Engineering Squad Commander",
          company: "IDF Combat Engineering Corps",
          period: "Nov 2021 – Dec 2024",
          logo: "/images/logos/idf.svg",
          bullets: [
            "Commanded up to 40 combat soldiers in operational missions.",
            "Combat engineer (08) and explosives specialist (09).",
            "High-pressure tactical operations requiring real-time decisions and team coordination.",
          ],
        },
      ],
    },
    education: {
      title: "Education",
      items: [
        {
          id: "ai-cert",
          degree: "Certificate in AI Development & Python",
          institution: "Success College",
          period: "Mar 2025",
          certImage: "/images/cert-ai.svg",
        },
        {
          id: "marketing-cert",
          degree: "Certificate in Digital Marketing",
          institution: "Success College",
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
          id: "tech",
          label: "Technology",
          items: [
            "AI Development",
            "Python",
            "JavaScript",
            "Google Cloud Platform",
            "Kubernetes",
            "Docker",
            "Software Architecture",
            "UX/UI Design",
          ],
        },
        {
          id: "marketing",
          label: "Marketing",
          items: [
            "Marketing Strategy",
            "PPC",
            "Google Ads",
            "Meta Ads",
            "Copywriting",
            "Landing Page Optimization",
            "Data Analysis",
            "Sales Funnels",
            "AI Consulting",
          ],
        },
        {
          id: "leadership",
          label: "Leadership",
          items: ["Product Management", "Team Leadership"],
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
      name: "איתן תורגמן",
      title: "AI Solutions Developer | Marketing & Strategist",
      location: "באר שבע, ישראל",
      linkedin: "https://linkedin.com/in/eytan-turgeman",
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
      highlights: ["מערכות AI", "ROI שיווקי", "מנהיגות צוות"],
    },
    about: {
      title: "אודות",
      text: "מפתח פתרונות AI עם רקע באסטרטגיית שיווק. בונה ומטמיע מערכות AI לעסקים — מסוכנים קוליים וואטסאפ ועד צינורות אוטומציה מלאות — עם חיבור לתוצאות עסקיות אמיתיות כמו מכירות, לידים ושימור לקוחות. ניסיון מעשי ב-Python ו-JavaScript.",
      pills: [
        { label: "AI והנדסה", icon: "cpu" },
        { label: "צמיחה ושיווק", icon: "chart" },
        { label: "מנהיגות", icon: "users" },
      ],
    },
    experience: {
      title: "ניסיון תעסוקתי",
      items: [
        {
          id: "optive",
          role: "CTO & מייסד שותף",
          company: "Optive LTD",
          period: "יולי 2025 – מאי 2026",
          logo: "/images/logos/optive.svg",
          bullets: [
            "בניית פלטפורמת ה-AI של Optive מאפס — סוכנים קוליים וטקסטואליים לעסקים קטנים ובינוניים.",
            "ניהול ארכיטקטורה טכנית (GCP, GKE, voice AI, RAG) ואסטרטגיית שיווק (קמפיינים, משפכים, לידים).",
            "הובלת צוות פיתוח במחזור חיים מלא: ייעוץ, פריסה, כיוונון עדין ותחזוקה.",
          ],
        },
        {
          id: "vegeta",
          role: "יועץ שיווק",
          company: "Vegeta Marketing",
          period: "מאי 2025 – דצמבר 2025",
          logo: "/images/logos/vegeta.svg",
          bullets: [
            "ייעוץ שיווקי אסטרטגי למאות עסקים.",
            "אסטרטגיות מותאמות: בחירת פלטפורמה, משפכים, הקצאת תקציב ותכנון קמפיינים.",
            "מכירת חבילות שיווק מותאמות בטווח 15,000–80,000 ₪ ללקוח.",
          ],
        },
        {
          id: "digim",
          role: "מנהל פרסום ממומן",
          company: "Digim",
          period: "ינואר 2025 – יוני 2025",
          logo: "/images/logos/digim.svg",
          bullets: [
            "ניהול קמפיינים ממומנים בגוגל ומטא עם תקציבים של מאות אלפי ₪ בחודש.",
            "מחזור חיים מלא: אסטרטגיה, קופירייטינג, קריאייטיב, דפי נחיתה ודיווח.",
            "הטמעת תשתית מעקב: פיקסלים, UTM ומעקב המרות.",
          ],
        },
        {
          id: "idf",
          role: "מפקד לוחמים, חיל הנדסה קרבית",
          company: "צה\"ל",
          period: "נובמבר 2021 – דצמבר 2024",
          logo: "/images/logos/idf.svg",
          bullets: [
            "פיקוד וניהול של עד 40 לוחמים בפעילויות מבצעיות.",
            "לוחם הנדסה קרבית, רובאי 08 וחבלן 09.",
            "פעולות טקטיות בלחץ גבוה — קבלת החלטות בזמן אמת ותיאום צוותי.",
          ],
        },
      ],
    },
    education: {
      title: "השכלה",
      items: [
        {
          id: "ai-cert",
          degree: "תעודה בפיתוח AI ו-Python",
          institution: "Success College",
          period: "מרץ 2025",
          certImage: "/images/cert-ai.svg",
        },
        {
          id: "marketing-cert",
          degree: "תעודה בשיווק דיגיטלי",
          institution: "Success College",
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
          id: "tech",
          label: "טכנולוגיה",
          items: [
            "AI Development",
            "Python",
            "JavaScript",
            "Google Cloud Platform",
            "Kubernetes",
            "Docker",
            "Software Architecture",
            "UX/UI Design",
          ],
        },
        {
          id: "marketing",
          label: "שיווק",
          items: [
            "Marketing Strategy",
            "PPC",
            "Google Ads",
            "Meta Ads",
            "Copywriting",
            "Landing Page Optimization",
            "Data Analysis",
            "Sales Funnels",
            "AI Consulting",
          ],
        },
        {
          id: "leadership",
          label: "מנהיגות",
          items: ["Product Management", "Team Leadership"],
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

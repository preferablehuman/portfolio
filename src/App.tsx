import { createElement, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  BriefcaseBusiness,
  BrainCircuit,
  Building2,
  Check,
  ChevronDown,
  ChartNoAxesCombined,
  CloudCog,
  Code2,
  Copy,
  Database,
  DatabaseZap,
  ExternalLink,
  FileText,
  GraduationCap,
  Layers3,
  Mail,
  Menu,
  Moon,
  Network,
  Phone,
  ScanSearch,
  Search,
  ServerCog,
  ShieldCheck,
  SquareTerminal,
  Sun,
  UserRoundSearch,
  WalletCards,
  Workflow,
  X,
} from "lucide-react";
import {
  certifications,
  contacts,
  education,
  experiences,
  featuredProjects,
  profile,
  skillGroups,
  skillProfiles,
  type ContactItem,
  type Experience,
  type Project,
  type SkillProfile,
} from "./data/profile";

type PageId = "home" | "about" | "experience" | "projects" | "skills" | "education" | "contact";
type ProjectTab = "overview" | "architecture" | "technical" | "evidence" | "stack";
type ThemeMode = "light" | "dark";
type NavigateOptions = { skill?: string };
type NavigateHandler = (page: PageId, options?: NavigateOptions) => void;
type SkillSearchOption = { name: string; slug: string; category: string; aliases: string[]; priority: number };
type SkillEvidenceApplication = SkillProfile["applications"][number] & { targetPage: PageId };
type SkillEvidenceProfile = Omit<SkillProfile, "applications"> & {
  applications: SkillEvidenceApplication[];
  source: "curated" | "derived";
};

const pagePaths: Record<PageId, string> = {
  home: "/",
  about: "/about",
  experience: "/experience",
  projects: "/projects",
  skills: "/skills",
  education: "/education",
  contact: "/contact",
};

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function withBasePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

function withoutBasePath(pathname: string) {
  if (!basePath) {
    return pathname;
  }

  if (pathname === basePath) {
    return "/";
  }

  return pathname.startsWith(`${basePath}/`) ? pathname.slice(basePath.length) : pathname;
}

const navItems: Array<{ label: string; page: PageId; icon: typeof Mail }> = [
  { label: "Overview", page: "home", icon: ChartNoAxesCombined },
  { label: "About", page: "about", icon: UserRoundSearch },
  { label: "Experience", page: "experience", icon: BriefcaseBusiness },
  { label: "Projects", page: "projects", icon: Database },
  { label: "Skills", page: "skills", icon: Layers3 },
  { label: "Education", page: "education", icon: GraduationCap },
  { label: "Contact", page: "contact", icon: Mail },
];

const projectTabs: Array<{ id: ProjectTab; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "technical", label: "Technical Work" },
  { id: "evidence", label: "Evidence" },
  { id: "stack", label: "Stack" },
];

const contactIcons: Record<string, typeof Mail> = {
  Email: Mail,
  Phone: Phone,
  LinkedIn: Network,
  GitHub: Code2,
};

const contactItems: ContactItem[] = contacts;

const resumePages = [`${import.meta.env.BASE_URL}resume-pages/resume-page-1.png`];

const categoryIcons: Record<string, typeof Mail> = {
  "Languages & Backend": SquareTerminal,
  "Cloud & DevOps": CloudCog,
  "Data & Tools": DatabaseZap,
  "ML & Practices": BrainCircuit,
};

const projectIcons: Record<string, typeof Mail> = {
  "ai-email-client": BrainCircuit,
  "interactive-portfolio": Code2,
  "nyu-taxi": DatabaseZap,
  lamprey: ScanSearch,
  "election-eda": ChartNoAxesCombined,
  "online-wallet": WalletCards,
  bookstore: BookOpenCheck,
};

const companyMarks: Record<string, { label: string; colorClass: string }> = {
  "NTT DATA": { label: "NTT", colorClass: "bg-sky-700 text-white" },
  Capgemini: { label: "CG", colorClass: "bg-indigo-700 text-white" },
};

const proofCards: Array<{
  page: PageId;
  label: string;
  title: string;
  detail: string;
  icon: typeof BriefcaseBusiness;
}> = [
  {
    page: "experience",
    label: "Work overview",
    title: "Enterprise Java delivery across healthcare and automotive systems",
    detail: "See the NTT DATA and Capgemini timelines, role summaries, and implementation details.",
    icon: BriefcaseBusiness,
  },
  {
    page: "projects",
    label: "Project evidence",
    title: "AI, Spark analytics, computer vision, EDA, and full-stack apps",
    detail: "Review tabbed case studies with architecture, technical work, evidence, and stack.",
    icon: Database,
  },
  {
    page: "education",
    label: "Graduate focus",
    title: "MS Computer Science at Central Michigan University",
    detail: "Includes GPA, degree history, Azure credentials, Linux, ethical hacking, and Agile learning.",
    icon: GraduationCap,
  },
  {
    page: "skills",
    label: "Technical toolkit",
    title: "Java, Spring, REST/SOAP, SQL, cloud, data, and AI model serving",
    detail: "Search and filter the ATS-readable skill bank by category.",
    icon: Layers3,
  },
];

const topSkillSlugs = ["core-java", "spring-framework", "rest-apis", "sql", "azure", "aws"];

const skillSearchOptions: SkillSearchOption[] = buildSkillSearchOptions();
const preferredSkillOptions = topSkillSlugs
  .map((slug) => skillSearchOptions.find((option) => option.slug === slug))
  .filter((option): option is SkillSearchOption => Boolean(option));

function buildPagePath(page: PageId, options?: NavigateOptions) {
  const params = new URLSearchParams();
  if (page === "skills" && options?.skill) {
    params.set("skill", options.skill);
  }

  const query = params.toString();
  return `${withBasePath(pagePaths[page])}${query ? `?${query}` : ""}`;
}

function searchFromPath(path: string) {
  const queryIndex = path.indexOf("?");
  return queryIndex >= 0 ? path.slice(queryIndex) : "";
}

function pageFromPath(pathname: string): PageId {
  const appPath = withoutBasePath(pathname);
  const normalizedPath = appPath.length > 1 ? appPath.replace(/\/$/, "") : appPath;
  const match = (Object.entries(pagePaths) as Array<[PageId, string]>).find(([, path]) => path === normalizedPath);
  return match?.[0] ?? "home";
}

function slugifySkill(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeSkillText(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildSkillSearchOptions() {
  const optionMap = new Map<string, SkillSearchOption>();

  skillProfiles.forEach((skill, index) => {
    optionMap.set(skill.slug, {
      name: skill.name,
      slug: skill.slug,
      category: skill.category,
      aliases: skill.aliases,
      priority: index,
    });
  });

  skillGroups.forEach((group, groupIndex) => {
    group.skills.forEach((skill, skillIndex) => {
      const slug = slugifySkill(skill);
      const existing = optionMap.get(slug);
      if (existing) {
        existing.category = existing.category || group.name;
        return;
      }

      optionMap.set(slug, {
        name: skill,
        slug,
        category: group.name,
        aliases: [],
        priority: 1000 + groupIndex * 100 + skillIndex,
      });
    });
  });

  return Array.from(optionMap.values()).sort((first, second) => first.priority - second.priority || first.name.localeCompare(second.name));
}

function findSkillOption(slug: string) {
  const normalizedSlug = slugifySkill(slug);
  return skillSearchOptions.find((option) => option.slug === normalizedSlug || option.aliases.some((alias) => slugifySkill(alias) === normalizedSlug));
}

function findSkillProfile(slug: string) {
  const normalizedSlug = slugifySkill(slug);
  return skillProfiles.find((skill) => skill.slug === normalizedSlug || skill.aliases.some((alias) => slugifySkill(alias) === normalizedSlug));
}

function skillMatchesText(text: string, terms: string[]) {
  const normalizedText = normalizeSkillText(text);
  return terms.some((term) => {
    const normalizedTerm = normalizeSkillText(term);
    return normalizedTerm.length > 1 && normalizedText.includes(normalizedTerm);
  });
}

function matchingStackItems(stack: string[], terms: string[]) {
  const matches = stack.filter((item) => skillMatchesText(item, terms) || terms.some((term) => skillMatchesText(term, [item])));
  return matches.length ? matches : terms.slice(0, 3);
}

function targetPageForApplication(application: SkillProfile["applications"][number]): PageId {
  return application.type === "Project" ? "projects" : "experience";
}

function estimateDerivedSkillYears(applications: SkillEvidenceApplication[]) {
  const hasNtt = applications.some((application) => application.title.includes("NTT DATA"));
  const hasCapgemini = applications.some((application) => application.title.includes("Capgemini"));
  const hasProject = applications.some((application) => application.type === "Project");

  if (hasNtt && hasCapgemini) {
    return "4+ years professional";
  }
  if (hasNtt) {
    return "2 years professional";
  }
  if (hasCapgemini) {
    return hasProject ? "2+ years professional and project-based" : "2+ years professional";
  }
  if (hasProject) {
    return "1+ year project-based";
  }

  return "Relevant exposure";
}

function deriveSkillApplications(skill: SkillSearchOption) {
  const terms = [skill.name, ...skill.aliases];
  const roleApplications: SkillEvidenceApplication[] = experiences
    .filter((role) => skillMatchesText([role.role, role.company, role.summary, role.highlights.join(" "), role.stack.join(" ")].join(" "), terms))
    .map((role) => ({
      type: "Work Experience" as const,
      targetPage: "experience" as const,
      title: `${role.company} - ${role.role}`,
      context: role.period,
      detail: role.summary,
      skills: matchingStackItems(role.stack, terms),
    }));

  const projectApplications: SkillEvidenceApplication[] = featuredProjects
    .filter((project) => skillMatchesText([project.title, project.summary, project.stack.join(" "), ...Object.values(project.tabs).flat()].join(" "), terms))
    .map((project) => ({
      type: "Project" as const,
      targetPage: "projects" as const,
      title: project.title,
      context: project.eyebrow,
      detail: project.summary,
      skills: matchingStackItems(project.stack, terms),
    }));

  return [...roleApplications, ...projectApplications].slice(0, 6);
}

function resolveSkillProfile(slug?: string | null): SkillEvidenceProfile | null {
  if (!slug) {
    return null;
  }

  const curatedProfile = findSkillProfile(slug);
  if (curatedProfile) {
    return {
      ...curatedProfile,
      source: "curated",
      applications: curatedProfile.applications.map((application) => ({
        ...application,
        targetPage: targetPageForApplication(application),
      })),
    };
  }

  const option = findSkillOption(slug);
  if (!option) {
    return null;
  }

  const applications = deriveSkillApplications(option);
  return {
    slug: option.slug,
    name: option.name,
    category: option.category,
    years: estimateDerivedSkillYears(applications),
    summary: applications.length
      ? `${option.name} appears across the matching work and project evidence below.`
      : `${option.name} belongs to the ${option.category} toolkit. Review the related evidence anchors below to see the adjacent systems, tools, and delivery context behind this skill cluster.`,
    aliases: option.aliases,
    applications,
    source: "derived",
  };
}

function skillSearchMatches(option: SkillSearchOption, query: string) {
  const normalizedQuery = normalizeSkillText(query);
  if (!normalizedQuery) {
    return true;
  }

  return [option.name, option.category, ...option.aliases].some((item) => normalizeSkillText(item).includes(normalizedQuery));
}

function fallbackSkillApplications(skill: SkillEvidenceProfile): SkillEvidenceApplication[] {
  const categoryFallbacks: Record<string, SkillEvidenceApplication[]> = {
    "Languages & Backend": [
      {
        type: "Work Experience",
        targetPage: "experience",
        title: "Backend engineering foundation",
        context: "Capgemini + NTT DATA",
        detail: "Related backend evidence includes Java/Spring services, REST and SOAP integrations, production debugging, and enterprise release support.",
        skills: ["Java", "Spring", "REST APIs", "SOAP APIs", "SQL"],
      },
      {
        type: "Project",
        targetPage: "projects",
        title: "Full-stack and API projects",
        context: "Portfolio case studies",
        detail: "Project evidence shows API-oriented systems across the AI email client, wallet app, bookstore app, and cloud data services.",
        skills: ["FastAPI", "React", "Angular", "Spring MVC"],
      },
    ],
    "Cloud & DevOps": [
      {
        type: "Work Experience",
        targetPage: "experience",
        title: "Hybrid cloud release delivery",
        context: "NTT DATA",
        detail: "Related cloud and DevOps evidence includes Azure Relay, Azure Service Bus, Azure Functions, Maven, Jenkins, UrbanCode, and Azure DevOps release workflows.",
        skills: ["Azure", "Jenkins", "CI/CD", "UrbanCode"],
      },
      {
        type: "Project",
        targetPage: "projects",
        title: "AWS Spark infrastructure",
        context: "NYU Taxi Data Analysis Platform",
        detail: "The AWS data platform demonstrates Terraform-defined cloud resources, containerized services, serverless triggers, and managed database/storage components.",
        skills: ["AWS", "Terraform", "Docker", "ECS", "Lambda"],
      },
    ],
    "Data & Tools": [
      {
        type: "Work Experience",
        targetPage: "experience",
        title: "SQL and database performance",
        context: "Capgemini",
        detail: "Related evidence includes SQL query optimization, database tuning, transaction-focused backend work, and data-integrity improvements in enterprise systems.",
        skills: ["SQL", "Oracle SQL", "JDBC", "Database Tuning"],
      },
      {
        type: "Project",
        targetPage: "projects",
        title: "Data pipeline projects",
        context: "Spark + PostgreSQL + Cloud SQL",
        detail: "Project evidence includes Spark streaming, PostgreSQL analytics persistence, Cloud SQL storage, Pandas processing, and visualization-backed analysis.",
        skills: ["Apache Spark", "PostgreSQL", "Cloud SQL", "Pandas"],
      },
    ],
    "ML & Practices": [
      {
        type: "Project",
        targetPage: "projects",
        title: "Applied AI model service",
        context: "Privacy-Preserving AI Email Client",
        detail: "Related evidence includes T5 sequence-to-sequence modeling, LoRA adapters, ROUGE evaluation, FastAPI model serving, and structured AI actions.",
        skills: ["PyTorch", "T5", "PEFT/LoRA", "ROUGE"],
      },
      {
        type: "Work Experience",
        targetPage: "experience",
        title: "Engineering practices",
        context: "Enterprise delivery",
        detail: "Related practice evidence includes Agile delivery, code reviews, debugging, documentation, testing, release discipline, and production support.",
        skills: ["Agile/Scrum", "CI/CD", "JUnit", "System Design"],
      },
    ],
  };

  return categoryFallbacks[skill.category] ?? [];
}

function iconForSkill(skill: string, category?: string) {
  const normalizedSkill = normalizeSkillText(skill);

  if (/java|spring|j2ee|ejb|jsf|hibernate|jpa|jdbc|type.?script|angular|react|fastapi|python/.test(normalizedSkill)) {
    return SquareTerminal;
  }
  if (/aws|azure|cloud|docker|kubernetes|terraform|jenkins|gitlab|devops|ecs|lambda|rds|s3|efs|relay|service bus|gitops|urbancode/.test(normalizedSkill)) {
    return CloudCog;
  }
  if (/sql|spark|etl|postgres|oracle|db2|redis|jms|kafka|json|xml|yaml|prometheus|log4j|gateway|imap|gmail|minio/.test(normalizedSkill)) {
    return DatabaseZap;
  }
  if (/torch|hugging|t5|peft|lora|rouge|model|ai|inference|quantization|sequence/.test(normalizedSkill)) {
    return BrainCircuit;
  }
  if (/rest|soap|api|microservice|soa|oauth|jwt/.test(normalizedSkill)) {
    return Network;
  }
  if (/agile|scrum|ci cd|test|design|object/.test(normalizedSkill)) {
    return Workflow;
  }

  return category ? categoryIcons[category] ?? Layers3 : Layers3;
}

function iconForProject(projectId: string) {
  return projectIcons[projectId] ?? Database;
}

function IconGlyph({ icon, size, className }: { icon: typeof Mail; size: number; className?: string }) {
  return createElement(icon, { className, size, "aria-hidden": true });
}

function iconForCertification(certification: string) {
  const normalizedCertification = normalizeSkillText(certification);

  if (normalizedCertification.includes("azure")) {
    return CloudCog;
  }
  if (normalizedCertification.includes("database") || normalizedCertification.includes("data engineering") || normalizedCertification.includes("big data")) {
    return DatabaseZap;
  }
  if (normalizedCertification.includes("cloud")) {
    return CloudCog;
  }
  if (normalizedCertification.includes("pattern recognition") || normalizedCertification.includes("data mining")) {
    return BrainCircuit;
  }
  if (normalizedCertification.includes("software") || normalizedCertification.includes("algorithm")) {
    return Workflow;
  }
  if (normalizedCertification.includes("ethical") || normalizedCertification.includes("hacking")) {
    return ShieldCheck;
  }
  if (normalizedCertification.includes("linux")) {
    return SquareTerminal;
  }
  if (normalizedCertification.includes("agile")) {
    return Workflow;
  }

  return Award;
}

function roleKey(role: Experience) {
  return `${role.company}-${role.role}-${role.period}`;
}

function experienceSignals(role: Experience) {
  return role.highlights
    .filter((highlight) => /\d|SLA|performance|availability|daily|resolution|upgrade|delivery|coverage|uptime/i.test(highlight))
    .slice(0, 3);
}

function projectLinks(project: Project) {
  return project.repo ? [{ label: "Repository", href: project.repo }] : [];
}

function opensNewTab(href: string) {
  return href.startsWith("http");
}

function useMobileDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const update = () => setIsMobileDevice(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobileDevice;
}

function App() {
  const [page, setPage] = useState<PageId>(() => pageFromPath(window.location.pathname));
  const [locationSearch, setLocationSearch] = useState(window.location.search);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    const handlePopState = () => {
      setPage(pageFromPath(window.location.pathname));
      setLocationSearch(window.location.search);
      setIsMenuOpen(false);
      window.scrollTo({ top: 0 });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const selectedSkillSlug = useMemo(() => new URLSearchParams(locationSearch).get("skill"), [locationSearch]);

  function navigateTo(nextPage: PageId, options?: NavigateOptions) {
    const nextPath = buildPagePath(nextPage, options);
    if (`${window.location.pathname}${window.location.search}` !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setPage(nextPage);
    setLocationSearch(searchFromPath(nextPath));
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-[#f7f9f6] text-neutral-950">
      <ShellNav
        activePage={page}
        isOpen={isMenuOpen}
        isResumeOpen={isResumeOpen}
        theme={theme}
        onMenuToggle={() => setIsMenuOpen((value) => !value)}
        onNavigate={navigateTo}
        onResumeOpen={() => setIsResumeOpen(true)}
        onThemeToggle={() => setTheme((value) => (value === "light" ? "dark" : "light"))}
      />
      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.18 }}>
          {renderPage(page, navigateTo, () => setIsResumeOpen(true), selectedSkillSlug)}
        </motion.div>
      </AnimatePresence>
      {page === "projects" ? null : <Footer onNavigate={navigateTo} />}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </main>
  );
}

function renderPage(page: PageId, onNavigate: NavigateHandler, onResumeOpen: () => void, selectedSkillSlug: string | null) {
  switch (page) {
    case "about":
      return <AboutPage onNavigate={onNavigate} />;
    case "experience":
      return <ExperiencePage />;
    case "projects":
      return <ProjectsPage />;
    case "skills":
      return <SkillsPage selectedSkillSlug={selectedSkillSlug} onNavigate={onNavigate} />;
    case "education":
      return <EducationPage />;
    case "contact":
      return <ContactPage />;
    case "home":
    default:
      return <HomePage onNavigate={onNavigate} onResumeOpen={onResumeOpen} />;
  }
}

function RoutedLink({
  page,
  onNavigate,
  className,
  children,
}: {
  page: PageId;
  onNavigate: NavigateHandler;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={buildPagePath(page)}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(page);
      }}
    >
      {children}
    </a>
  );
}

function ShellNav({
  activePage,
  isOpen,
  isResumeOpen,
  theme,
  onMenuToggle,
  onNavigate,
  onResumeOpen,
  onThemeToggle,
}: {
  activePage: PageId;
  isOpen: boolean;
  isResumeOpen: boolean;
  theme: ThemeMode;
  onMenuToggle: () => void;
  onNavigate: NavigateHandler;
  onResumeOpen: () => void;
  onThemeToggle: () => void;
}) {
  const ThemeIcon = theme === "light" ? Moon : Sun;
  const nextThemeLabel = theme === "light" ? "Dark" : "Light";

  return (
    <header className={`sticky top-0 z-50 border-b border-neutral-200 bg-[#f7f9f6]/90 backdrop-blur transition-opacity duration-150 ${isResumeOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <RoutedLink page="home" onNavigate={onNavigate} className="flex items-center gap-3 font-semibold tracking-tight text-neutral-950">
          <span className="grid size-10 place-items-center rounded-lg border border-neutral-900 bg-neutral-950 text-sm font-bold text-white">KM</span>
          <span className="hidden sm:block">Kunal Maheshwari</span>
        </RoutedLink>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const ItemIcon = item.icon;
            return (
              <RoutedLink
                key={item.page}
                page={item.page}
                onNavigate={onNavigate}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium transition ${
                  activePage === item.page ? "bg-white text-neutral-950 shadow-sm" : "text-neutral-600 hover:bg-white hover:text-neutral-950"
                }`}
              >
                <ItemIcon size={15} />
                {item.label}
              </RoutedLink>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm transition hover:border-neutral-950"
            type="button"
            aria-label={`Switch to ${nextThemeLabel.toLowerCase()} mode`}
            onClick={onThemeToggle}
          >
            <ThemeIcon size={16} />
            {nextThemeLabel}
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm transition hover:border-neutral-950"
            type="button"
            onClick={onResumeOpen}
          >
            <FileText size={16} />
            Resume
          </button>
        </div>

        <button className="rounded-md border border-neutral-300 bg-white p-2 lg:hidden" type="button" aria-label="Toggle navigation menu" onClick={onMenuToggle}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-neutral-200 bg-white lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4">
              <button
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
                type="button"
                aria-label={`Switch to ${nextThemeLabel.toLowerCase()} mode`}
                onClick={onThemeToggle}
              >
                <ThemeIcon size={17} />
                {nextThemeLabel} mode
              </button>
              <button
                className="flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
                type="button"
                onClick={onResumeOpen}
              >
                <FileText size={17} />
                Resume
              </button>
              {navItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <RoutedLink
                    key={item.page}
                    page={item.page}
                    onNavigate={onNavigate}
                    className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
                      activePage === item.page ? "bg-neutral-100 text-neutral-950" : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <ItemIcon size={17} />
                    {item.label}
                  </RoutedLink>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function HomePage({ onNavigate, onResumeOpen }: { onNavigate: NavigateHandler; onResumeOpen: () => void }) {
  return (
    <section className="section-shell grid min-h-[calc(100vh-68px)] items-center gap-10 py-16 lg:grid-cols-[1.04fr_0.96fr] lg:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <p className="eyebrow">Backend Software Engineer / Software Developer</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight text-neutral-950 md:text-7xl">{profile.name}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-650 md:text-xl">{profile.summary}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <RoutedLink page="projects" onNavigate={onNavigate} className="action-primary">
            Explore Projects
            <ArrowRight size={18} />
          </RoutedLink>
          <button className="action-secondary" type="button" onClick={onResumeOpen}>
            <FileText size={18} />
            View Resume
          </button>
          <RoutedLink page="contact" onNavigate={onNavigate} className="action-secondary">
            <Mail size={18} />
            Contact
          </RoutedLink>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {proofCards.map((card) => {
            const Icon = card.icon;
            return (
              <RoutedLink key={card.label} page={card.page} onNavigate={onNavigate} className="group rounded-lg border border-neutral-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-teal-700 hover:shadow-md">
                <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
                  <Icon size={17} />
                  {card.label}
                </span>
                <span className="mt-3 block text-base font-semibold text-neutral-950">{card.title}</span>
                <span className="mt-2 block text-sm leading-6 text-neutral-600">{card.detail}</span>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 group-hover:text-teal-950">
                  View supporting page
                  <ArrowRight size={15} />
                </span>
              </RoutedLink>
            );
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.08 }}>
        <ProjectSystemVisual onNavigate={onNavigate} />
      </motion.div>
    </section>
  );
}

function ProjectSystemVisual({ onNavigate }: { onNavigate: NavigateHandler }) {
  const mapItems: Array<{
    page: PageId;
    label: string;
    value: string;
    detail: string;
    icon: typeof BriefcaseBusiness;
  }> = [
    {
      page: "experience",
      label: "Experience",
      value: `${experiences.length} roles`,
      detail: "Healthcare integrations, automotive systems, release delivery, SQL tuning.",
      icon: BriefcaseBusiness,
    },
    {
      page: "projects",
      label: "Projects",
      value: `${featuredProjects.length} case studies`,
      detail: "AI email assistant, portfolio system, Spark analytics, computer vision, EDA, wallet, bookstore.",
      icon: Database,
    },
    {
      page: "skills",
      label: "Skills",
      value: `${skillGroups.length} groups`,
      detail: "Searchable Java, Spring, cloud, data, tooling, and applied AI keywords.",
      icon: Layers3,
    },
    {
      page: "education",
      label: "Education",
      value: "MS + certs",
      detail: "Graduate degree, bachelor degree, Azure credentials, Linux, Agile, security.",
      icon: GraduationCap,
    },
  ];

  const reviewPath: Array<{ page: PageId; label: string; detail: string }> = [
    { page: "experience", label: "1. Start with work", detail: "Read the company timeline and role summaries." },
    { page: "projects", label: "2. Check proof", detail: "Open case studies with architecture and evidence." },
    { page: "contact", label: "3. Continue the conversation", detail: "Use email, phone, LinkedIn, GitHub, or resume." },
  ];

  return (
    <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-950 p-5 text-white shadow-2xl">
      <div className="absolute inset-0 system-grid opacity-30" aria-hidden="true" />
      <div className="relative">
        <div className="border-b border-white/10 pb-4">
          <p className="text-sm font-semibold text-teal-200">Portfolio map</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {mapItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                className="group rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur transition hover:-translate-y-0.5 hover:border-teal-200/60 hover:bg-white/[0.07]"
                onClick={() => onNavigate(item.page)}
              >
                <span className="flex items-center justify-between gap-3">
                  <Icon className="text-teal-200" size={21} />
                  <ArrowRight className="text-neutral-500 transition group-hover:translate-x-0.5 group-hover:text-teal-100" size={16} />
                </span>
                <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">{item.label}</span>
                <span className="mt-1 block text-lg font-semibold text-white">{item.value}</span>
                <span className="mt-2 block text-sm leading-5 text-neutral-300">{item.detail}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">Suggested 90-second review</p>
          <div className="mt-4 grid gap-3">
            {reviewPath.map((step) => (
              <button
                key={step.label}
                type="button"
                className="rounded-md border border-white/10 px-3 py-2 text-left transition hover:border-teal-200/60 hover:bg-white/[0.05]"
                onClick={() => onNavigate(step.page)}
              >
                <span className="block text-sm font-semibold text-white">{step.label}</span>
                <span className="mt-1 block text-xs leading-5 text-neutral-400">{step.detail}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {featuredProjects.slice(0, 3).map((project) => (
              <button
                key={project.id}
                type="button"
                className="rounded-md border border-white/10 px-2 py-1 text-left text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400 transition hover:border-teal-200/60 hover:text-teal-100"
                onClick={() => onNavigate("projects")}
              >
                {project.eyebrow}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PageIntro({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="pt-14 md:pt-16">
      <h1 className="section-title">{title}</h1>
      {description ? <p className="mt-5 max-w-3xl text-base leading-7 text-neutral-650 md:text-lg">{description}</p> : null}
    </div>
  );
}

function SkillSearchPanel({ onNavigate }: { onNavigate: NavigateHandler }) {
  const [query, setQuery] = useState("");

  const visibleOptions = useMemo(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return preferredSkillOptions;
    }

    return skillSearchOptions.filter((option) => skillSearchMatches(option, trimmedQuery)).slice(0, 7);
  }, [query]);

  function openSkill(option: SkillSearchOption) {
    onNavigate("skills", { skill: option.slug });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const firstMatch = visibleOptions[0];
    if (firstMatch) {
      openSkill(firstMatch);
    }
  }

  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-950 p-5 text-white shadow-xl">
      <div className="grid gap-5 lg:grid-cols-[0.45fr_0.55fr] lg:items-center">
        <div className="flex items-center gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-teal-200 text-neutral-950">
            <UserRoundSearch size={22} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-200">Skill lookup</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Search a skill to see its relevant experience</h2>
            {/* <p className="mt-2 text-sm leading-6 text-neutral-300">Open a focused skill page with experience years, matching roles, projects, and supporting evidence.</p> */}
          </div>
        </div>

        <form className="grid gap-3" onSubmit={handleSubmit}>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input
              className="min-h-12 w-full rounded-md border border-white/15 bg-white px-10 text-sm font-medium text-neutral-950 outline-none transition focus:border-teal-200 focus:ring-2 focus:ring-teal-200/25"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Java, Azure, Spark, PyTorch"
              type="search"
            />
            <button
              className="absolute right-1.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 rounded-md bg-teal-300 px-3 py-2 text-xs font-black text-neutral-950 transition hover:bg-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
              type="submit"
              disabled={!visibleOptions.length}
            >
              View
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {visibleOptions.length ? (
              visibleOptions.map((option) => {
                const Icon = iconForSkill(option.name, option.category);
                return (
                  <button
                    key={option.slug}
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-xs font-semibold text-neutral-200 transition hover:border-teal-200/70 hover:text-teal-100"
                    onClick={() => openSkill(option)}
                  >
                    <Icon size={14} />
                    {option.name}
                  </button>
                );
              })
            ) : (
              <span className="text-xs font-medium text-neutral-400">No exact match yet. Try a broader term like cloud, API, or Java.</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function AboutPage({ onNavigate }: { onNavigate: NavigateHandler }) {
  const timeline = [
    {
      label: "Capgemini foundation",
      detail: "Started with full-stack training and moved into automotive enterprise applications, Java/J2EE services, SQL performance work, CI/CD, code reviews, and Agile delivery.",
      icon: Building2,
    },
    {
      label: "NTT DATA scale",
      detail: "Shifted into healthcare insurance integrations with Java 8/11, SOAP APIs, IBM WebSphere, Azure Relay, Service Bus, JMS queues, production release delivery, and observability improvements.",
      icon: ServerCog,
    },
    {
      label: "Graduate expansion",
      detail: "At Central Michigan University, expanded the same engineering base into cloud systems, Spark analytics, computer vision pipelines, and privacy-oriented NLP model serving.",
      icon: GraduationCap,
    },
  ];

  return (
    <section className="section-shell pb-16">
      <PageIntro
        title="About Kunal"
      />
      <SkillSearchPanel onNavigate={onNavigate} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-neutral-950">What I offer</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-neutral-650">
            {[
              "Backend delivery with Java, Spring, REST/SOAP APIs, SQL, and service integration.",
              "Cloud integration experience across Azure services, AWS project infrastructure, and Google Cloud data workflows.",
              "Data and AI project depth across Spark analytics, OpenCV pipelines, and T5/LoRA model-serving research.",
              "Production-minded habits: debugging, release discipline, observability, testing, documentation, and clear ownership boundaries.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 shrink-0 text-teal-700" size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <RoutedLink page="experience" onNavigate={onNavigate} className="action-primary">
              View Experience
              <ArrowRight size={17} />
            </RoutedLink>
            <RoutedLink page="projects" onNavigate={onNavigate} className="action-secondary">
              View Projects
            </RoutedLink>
          </div>
        </div>

        <div className="grid gap-4">
          {profile.positioning.map((paragraph) => (
            <p key={paragraph} className="rounded-lg border border-neutral-200 bg-white p-5 text-base leading-8 text-neutral-700 shadow-sm">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {timeline.map((item) => {
          const TimelineIcon = item.icon;
          return (
            <article key={item.label} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <span className="grid size-10 place-items-center rounded-md bg-neutral-950 text-teal-200">
                <TimelineIcon size={19} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-neutral-950">{item.label}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-650">{item.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function CompanyMark({ company }: { company: string }) {
  const mark = companyMarks[company] ?? { label: company.slice(0, 2).toUpperCase(), colorClass: "bg-neutral-950 text-white" };

  return (
    <span className={`grid size-12 shrink-0 place-items-center rounded-lg text-sm font-black tracking-tight shadow-sm ${mark.colorClass}`} aria-label={`${company} mark`}>
      {mark.label}
    </span>
  );
}

function ExperiencePage() {
  const [expandedRole, setExpandedRole] = useState(experiences[0] ? roleKey(experiences[0]) : "");

  return (
    <section className="section-shell pb-16">
      <PageIntro
        title="Experience"
      />

      <div className="scroll-fade-y mt-8 max-h-[calc(100vh-12rem)] overflow-y-auto overscroll-contain px-1 py-8">
        <div className="space-y-4">
        {experiences.map((role) => {
          const key = roleKey(role);
          const signals = experienceSignals(role);
          const isExpanded = expandedRole === key;
          return (
            <article key={key} className="rounded-lg border border-neutral-200 bg-white shadow-sm">
              <button
                type="button"
                className="flex w-full flex-col gap-4 p-5 text-left md:flex-row md:items-start md:justify-between"
                onClick={() => setExpandedRole(isExpanded ? "" : key)}
                aria-expanded={isExpanded}
              >
                <div className="flex gap-4">
                  <CompanyMark company={role.company} />
                  <span>
                    <span className="block text-lg font-semibold text-neutral-950">{role.role}</span>
                    <span className="mt-1 block text-sm font-medium text-neutral-600">
                      {role.company} - {role.location}
                    </span>
                    <span className="mt-3 block max-w-3xl text-sm leading-6 text-neutral-650">{role.summary}</span>
                  </span>
                </div>
                <span className="flex items-center gap-3 text-sm font-semibold text-neutral-500">
                  {role.period}
                  <ChevronDown className={`transition ${isExpanded ? "rotate-180" : ""}`} size={19} />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="border-t border-neutral-200 p-5 pt-0 md:pl-20">
                      <div className="mt-5 rounded-lg border border-neutral-200 bg-[#f7f9f6] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Work overview</p>
                        <p className="mt-2 text-sm leading-6 text-neutral-650">{role.summary}</p>
                      </div>
                      {signals.length ? (
                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                          {signals.map((metric) => (
                            <div key={metric} className="rounded-md border border-neutral-200 bg-[#f7f9f6] p-3 text-sm font-semibold text-neutral-800">
                              {metric}
                            </div>
                          ))}
                        </div>
                      ) : null}
                      <ul className="mt-5 grid gap-3 text-sm leading-6 text-neutral-650 lg:grid-cols-2">
                        {role.highlights.map((bullet) => (
                          <li key={bullet} className="flex gap-3">
                            <Check className="mt-0.5 shrink-0 text-teal-700" size={17} />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {role.stack.map((item) => (
                          <TechPill key={item} icon={iconForSkill(item)}>
                            {item}
                          </TechPill>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
        </div>
      </div>
    </section>
  );
}

function ProjectSummaryButton({
  project,
  isActive,
  onSelect,
  buttonRef,
}: {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
  buttonRef?: (element: HTMLButtonElement | null) => void;
}) {
  return (
    <motion.button
      type="button"
      ref={buttonRef}
      layout
      animate={{ opacity: isActive ? 1 : 0.74, scale: isActive ? 1 : 0.97 }}
      whileHover={{ opacity: 1, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`relative h-[218px] w-full snap-center overflow-hidden rounded-lg border p-5 text-left transition ${
        isActive ? "border-teal-700 bg-white shadow-md ring-2 ring-teal-700/10" : "border-neutral-200 bg-white/80 hover:border-neutral-400"
      }`}
      onClick={onSelect}
      aria-expanded={isActive}
    >
      <span className={`absolute inset-y-4 left-0 w-1 rounded-r-full transition ${isActive ? "bg-teal-700 opacity-100" : "bg-transparent opacity-0"}`} aria-hidden="true" />
      <span className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-teal-700/10 text-teal-800">
          <IconGlyph icon={iconForProject(project.id)} size={19} />
        </span>
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{project.eyebrow}</span>
          <span className="mt-2 block overflow-hidden text-base font-semibold leading-6 text-neutral-950 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">{project.title}</span>
        </span>
      </span>
      <span className="mt-4 block overflow-hidden text-sm leading-6 text-neutral-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]">{project.summary}</span>
    </motion.button>
  );
}

function ProjectsPage() {
  const [activeProjectId, setActiveProjectId] = useState(featuredProjects[0]?.id ?? "");
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ProjectTab>("overview");
  const projectButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const projectRailRef = useRef<HTMLDivElement | null>(null);
  const activeProject = featuredProjects.find((project) => project.id === activeProjectId) ?? featuredProjects[0];

  useEffect(() => {
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }

    const rail = projectRailRef.current;
    const selectedButton = projectButtonRefs.current[activeProjectId];

    if (!rail || !selectedButton) {
      return;
    }

    const centeredTop = selectedButton.offsetTop - (rail.clientHeight - selectedButton.clientHeight) / 2;
    rail.scrollTo({
      top: Math.max(centeredTop, 0),
      behavior: "smooth",
    });
  }, [activeProjectId]);

  function selectDesktopProject(projectId: string) {
    setActiveProjectId(projectId);
    setActiveTab("overview");
  }

  function selectMobileProject(projectId: string) {
    setActiveProjectId(projectId);
    setActiveTab("overview");
    setExpandedProjectId((currentProjectId) => (currentProjectId === projectId ? null : projectId));
  }

  return (
    <section className="section-shell pb-16 lg:flex lg:h-[calc(100vh-68px)] lg:flex-col lg:overflow-hidden lg:py-6">
      <PageIntro
        title="Projects"
      />

      <div className="mt-6 hidden min-h-0 flex-1 gap-6 lg:grid lg:grid-cols-[0.36fr_minmax(0,0.64fr)]">
        <div className="min-h-0">
          <div ref={projectRailRef} className="project-carousel h-full snap-y snap-mandatory overflow-y-auto overscroll-contain scroll-smooth pr-1">
            <div className="space-y-3 py-8">
              {featuredProjects.map((project) => (
                <ProjectSummaryButton
                  key={project.id}
                  project={project}
                  isActive={activeProject.id === project.id}
                  onSelect={() => selectDesktopProject(project.id)}
                  buttonRef={(element) => {
                    projectButtonRefs.current[project.id] = element;
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="project-detail-scroll min-h-0 overflow-y-auto overscroll-contain px-1 py-6">
          <ProjectCaseStudy project={activeProject} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>

      <div className="mt-8 space-y-4 lg:hidden">
        {featuredProjects.map((project) => {
          const isExpanded = expandedProjectId === project.id;
          return (
            <div key={project.id}>
              <ProjectSummaryButton project={project} isActive={isExpanded} onSelect={() => selectMobileProject(project.id)} />
              <AnimatePresence initial={false}>
                {isExpanded ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3">
                      <ProjectCaseStudy project={project} activeTab={activeTab} onTabChange={setActiveTab} />
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ProjectCaseStudy({
  project,
  activeTab,
  onTabChange,
}: {
  project: Project;
  activeTab: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
}) {
  return (
    <article className="min-h-full rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-neutral-950 text-teal-200">
              <IconGlyph icon={iconForProject(project.id)} size={23} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">{project.eyebrow}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">{project.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-650">{project.summary}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {projectLinks(project).map((link) => (
              <a key={link.label} className="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-950" href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <ExternalLink size={15} />
              </a>
            ))}
          </div>
        </div>

        <div className="scroll-fade-x -mx-8 mt-5 flex gap-2 overflow-x-auto px-8 py-1">
          {projectTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`shrink-0 rounded-md px-3 py-2 text-sm font-semibold transition ${
                activeTab === tab.id ? "bg-neutral-950 text-white" : "border border-neutral-200 text-neutral-600 hover:border-neutral-400"
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[390px] p-5">
        <AnimatePresence mode="wait">
          <motion.div key={`${project.id}-${activeTab}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
            {activeTab === "overview" ? <OverviewTab project={project} /> : null}
            {activeTab === "architecture" ? <ArchitectureTab project={project} /> : null}
            {activeTab === "technical" ? <TechnicalTab project={project} /> : null}
            {activeTab === "evidence" ? <EvidenceTab project={project} /> : null}
            {activeTab === "stack" ? <StackTab project={project} /> : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </article>
  );
}

function OverviewTab({ project }: { project: Project }) {
  return (
    <div className="grid gap-5">
      <p className="text-base leading-7 text-neutral-700">{project.summary}</p>
      <div className="grid gap-4 md:grid-cols-2">
        <DetailList title="Project Focus" items={project.tabs.overview} />
        <DetailList
          title="Signals"
          items={[
            ...project.stack.slice(0, 5).map((item) => `Stack: ${item}`),
            ...project.tabs.evidence.slice(0, 2),
          ]}
        />
      </div>
    </div>
  );
}

function ArchitectureTab({ project }: { project: Project }) {
  return (
    <div className="grid gap-5">
      <ArchitectureFlow steps={project.tabs.architecture} />
      <DetailList title="Architecture Notes" items={project.tabs.architecture} />
    </div>
  );
}

function TechnicalTab({ project }: { project: Project }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <DetailList title="Technical Work" items={project.tabs.technical} />
      <DetailList title="Evidence-Aware Boundaries" items={project.tabs.evidence} />
    </div>
  );
}

function EvidenceTab({ project }: { project: Project }) {
  const metrics = project.metrics ?? [];

  return (
    <div className="grid gap-5">
      {metrics.length ? (
        <div className="grid gap-3 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-teal-200 bg-teal-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-800">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold text-neutral-950">{metric.value}</p>
              <p className="mt-2 text-sm text-neutral-650">{metric.detail}</p>
            </div>
          ))}
        </div>
      ) : null}
      <DetailList title="Evidence and Artifacts" items={project.tabs.evidence} />
    </div>
  );
}

function StackTab({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <TechPill key={item} icon={iconForSkill(item)}>
            {item}
          </TechPill>
        ))}
      </div>
    </div>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-[#f7f9f6] p-5">
      <h3 className="font-semibold text-neutral-950">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-neutral-650">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className="mt-0.5 shrink-0 text-teal-700" size={17} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArchitectureFlow({ steps }: { steps: string[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {steps.slice(0, 4).map((step, index) => (
        <div key={step} className="relative rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
          <span className="grid size-8 place-items-center rounded-md bg-neutral-950 text-xs font-bold text-white">{index + 1}</span>
          <p className="mt-4 text-sm leading-6 text-neutral-650">{step}</p>
          {index < Math.min(steps.length, 4) - 1 ? <span className="diagram-link hidden md:block" aria-hidden="true" /> : null}
        </div>
      ))}
    </div>
  );
}

function SkillEvidencePanel({ skill, onNavigate }: { skill: SkillEvidenceProfile; onNavigate: NavigateHandler }) {
  const hasDirectApplications = skill.applications.length > 0;
  const displayedApplications = hasDirectApplications ? skill.applications : fallbackSkillApplications(skill);

  return (
    <article className="relative mt-8 rounded-lg border border-teal-700 bg-white p-5 pr-16 shadow-md">
      <button
        className="absolute right-4 top-4 grid size-9 place-items-center rounded-md border border-neutral-200 bg-white text-neutral-600 transition hover:border-teal-700 hover:text-teal-800"
        type="button"
        aria-label="Clear selected skill"
        onClick={() => onNavigate("skills")}
      >
        <X size={18} />
      </button>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div className="flex max-w-3xl gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-neutral-950 text-teal-200">
            <IconGlyph icon={iconForSkill(skill.name, skill.category)} size={23} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">Selected skill</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">{skill.name}</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-650">{skill.summary}</p>
          </div>
        </div>
        <div className="grid min-w-[220px] gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-lg border border-neutral-200 bg-[#f7f9f6] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Experience</p>
            <p className="mt-2 text-lg font-semibold text-neutral-950">{skill.years}</p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-[#f7f9f6] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500">Category</p>
            <p className="mt-2 text-lg font-semibold text-neutral-950">{skill.category}</p>
          </div>
        </div>
      </div>

      {skill.aliases.length ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {skill.aliases.slice(0, 8).map((alias) => (
            <TechPill key={alias} icon={iconForSkill(alias, skill.category)}>
              {alias}
            </TechPill>
          ))}
        </div>
      ) : null}

      {!hasDirectApplications ? (
        <p className="mt-5 text-sm font-semibold text-teal-800">Related work where this skill connects:</p>
      ) : null}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {displayedApplications.length ? (
          displayedApplications.map((application) => {
            const ApplicationIcon = application.type === "Project" ? Workflow : Building2;
            return (
              <div key={`${application.title}-${application.context}`} className="rounded-lg border border-neutral-200 bg-[#f7f9f6] p-4">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white text-teal-800">
                      <ApplicationIcon size={19} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">{application.type}</p>
                      <h3 className="mt-2 text-base font-semibold text-neutral-950">{application.title}</h3>
                      <p className="mt-1 text-xs font-semibold text-neutral-500">{application.context}</p>
                    </div>
                  </div>
                  <button
                    className="inline-flex shrink-0 items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs font-bold text-neutral-700 transition hover:border-teal-700 hover:text-teal-800"
                    type="button"
                    onClick={() => onNavigate(application.targetPage)}
                  >
                    Open {application.targetPage === "projects" ? "Project" : "Experience"}
                    <ArrowRight size={14} />
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-neutral-650">{application.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {application.skills.map((item) => (
                    <TechPill key={`${application.title}-${item}`} icon={iconForSkill(item, skill.category)}>
                      {item}
                    </TechPill>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className="rounded-lg border border-neutral-200 bg-[#f7f9f6] p-4 text-sm leading-6 text-neutral-650">
            This keyword appears in the skill index. Use the category filters below, then review Experience and Projects for the closest verified delivery evidence.
          </p>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button className="action-secondary" type="button" onClick={() => onNavigate("experience")}>
          View Experience
        </button>
        <button className="action-secondary" type="button" onClick={() => onNavigate("projects")}>
          View Projects
        </button>
      </div>
    </article>
  );
}

function SkillsPage({ selectedSkillSlug, onNavigate }: { selectedSkillSlug: string | null; onNavigate: NavigateHandler }) {
  const categories = ["All", ...skillGroups.map((group) => group.name)];
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const selectedSkill = useMemo(() => resolveSkillProfile(selectedSkillSlug), [selectedSkillSlug]);

  const filteredGroups = useMemo(() => {
    return skillGroups
      .filter((group) => activeCategory === "All" || group.name === activeCategory)
      .map((group) => ({
        ...group,
        skills: group.skills.filter((skill) => skill.toLowerCase().includes(query.trim().toLowerCase())),
      }))
      .filter((group) => group.skills.length > 0);
  }, [activeCategory, query]);

  return (
    <section className="section-shell pb-16">
      <PageIntro
        title="Skills"
      />

      {selectedSkill ? <SkillEvidencePanel skill={selectedSkill} onNavigate={onNavigate} /> : null}

      <div className="mt-8">
        <div className="relative w-full">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            className="w-full rounded-md border border-neutral-300 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search all skills"
            type="search"
          />
        </div>
      </div>

      <div className="scroll-fade-x -mx-8 mt-6 flex gap-2 overflow-x-auto px-8 py-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`shrink-0 rounded-md px-3 py-2 text-sm font-semibold transition ${
              activeCategory === category ? "bg-neutral-950 text-white" : "border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredGroups.map((group) => {
          const GroupIcon = categoryIcons[group.name] ?? Layers3;
          return (
            <div key={group.name} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-teal-700/10 text-teal-800">
                  <GroupIcon size={19} />
                </span>
                <h2 className="font-semibold text-neutral-950">{group.name}</h2>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <TechPill key={`${group.name}-${skill}`} icon={iconForSkill(skill, group.name)} onClick={() => onNavigate("skills", { skill: slugifySkill(skill) })}>
                    {skill}
                  </TechPill>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {!filteredGroups.length ? <p className="mt-6 rounded-lg border border-neutral-200 bg-white p-5 text-sm text-neutral-600">No matching skill found. Try a broader search term.</p> : null}
    </section>
  );
}

function EducationPage() {
  return (
    <section className="section-shell pb-16">
      <PageIntro
        title="Education"
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.85fr]">
        <div className="space-y-4">
          {education.map((item) => (
            <article key={`${item.school}-${item.degree}`} className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-neutral-950 text-white">
                    <GraduationCap size={21} />
                  </span>
                  <div>
                    <h2 className="text-lg font-semibold text-neutral-950">{item.school}</h2>
                    <p className="mt-1 text-sm font-medium text-neutral-600">{item.degree}</p>
                    <p className="mt-2 text-sm font-semibold text-teal-800">{item.detail}</p>
                    <p className="mt-1 text-sm text-neutral-500">{item.location}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-neutral-500">{item.period}</p>
              </div>
              {item.coursework?.length ? (
                <div className="mt-5 rounded-lg border border-neutral-200 bg-[#f7f9f6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">Relevant coursework</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.coursework.map((course) => (
                      <span key={course} className="rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-700 shadow-sm">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-neutral-950">Certifications</h2>
          <div className="scroll-fade-bottom mt-5 grid max-h-[440px] gap-3 overflow-y-auto pb-28 pt-2 pr-1">
            {certifications.map((certification) => {
              const CertificationIcon = iconForCertification(certification);
              return (
                <div key={certification} className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-amber-500/10 text-amber-700">
                    <CertificationIcon size={19} />
                  </span>
                  <span className="text-sm font-semibold text-neutral-800">{certification}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            className="resume-modal-backdrop scroll-fade-y fixed inset-0 z-[100] overflow-y-auto px-3 py-10 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
            onMouseDown={onClose}
          >
            <div className="mx-auto flex min-h-full w-full max-w-5xl items-center justify-center">
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className="mx-auto max-w-[850px]">
                  {resumePages.map((pageSrc, index) => (
                    <img
                      key={pageSrc}
                      className="mx-auto block h-auto w-full bg-white shadow-2xl"
                      src={pageSrc}
                      alt={`Kunal Maheshwari resume page ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="pointer-events-none fixed right-3 top-3 z-[101] flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2 sm:right-5 sm:top-5"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.18 }}
          >
            <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-2 rounded-lg bg-neutral-950/90 p-2 text-white shadow-2xl backdrop-blur">
              <a className="theme-inverse-cta inline-flex items-center gap-2 rounded-md border border-teal-100 bg-teal-200 px-3 py-2 text-xs font-black shadow-[0_0_0_3px_rgba(45,212,191,0.28)] ring-2 ring-white/20 transition hover:bg-teal-100 sm:px-4 sm:py-3 sm:text-sm" href={profile.resume} download="Kunal_Maheshwari_Resume.pdf">
                <FileText size={18} />
                <span>
                  Download<span className="hidden sm:inline"> Resume</span>
                </span>
              </a>
              <a className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-white transition hover:border-white/40 sm:px-4 sm:py-3 sm:text-sm" href={profile.resume} target="_blank" rel="noreferrer">
                Open PDF
                <ExternalLink size={16} />
              </a>
              <button
                className="grid size-9 place-items-center rounded-md border border-white/15 text-white transition hover:border-white/40 hover:bg-white/10 sm:size-10"
                type="button"
                aria-label="Close resume preview"
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const isMobileDevice = useMobileDevice();

  async function copyContact(contact: ContactItem) {
    try {
      await navigator.clipboard.writeText(contact.copy ?? contact.value);
      setCopied(contact.label);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  return (
    <section className="section-shell pb-16">
      <PageIntro
        title="Contact"
      />

      <div className="mt-8 rounded-lg border border-neutral-200 bg-neutral-950 p-6 text-white shadow-2xl md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">Direct contact</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">Let's make the next conversation easy.</h2>
            <p className="mt-5 text-sm leading-6 text-neutral-300">
              I am open to roles where backend engineering, cloud integrations, data systems, and AI platform work overlap.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="theme-inverse-cta inline-flex items-center gap-2 rounded-md border border-teal-100 bg-teal-200 px-4 py-3 text-sm font-black shadow-[0_0_0_3px_rgba(45,212,191,0.18)] transition hover:bg-teal-100" href={`mailto:${profile.email}`}>
                <Mail size={18} />
                Send Email
              </a>
              {isMobileDevice ? (
                <a className="inline-flex items-center gap-2 rounded-md border border-teal-200/50 px-4 py-3 text-sm font-bold text-teal-100 transition hover:border-teal-100 hover:bg-white/[0.06]" href={`tel:${profile.phone}`}>
                  <Phone size={18} />
                  Call
                </a>
              ) : null}
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {contactItems.map((contact) => {
              const Icon = contactIcons[contact.label] ?? Mail;
              return (
                <div key={contact.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-teal-300/10 text-teal-200">
                      <Icon size={19} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{contact.label}</p>
                      {contact.href ? (
                        <a className="mt-1 block truncate text-sm text-neutral-300 transition hover:text-white" href={contact.href} target={opensNewTab(contact.href) ? "_blank" : undefined} rel={opensNewTab(contact.href) ? "noreferrer" : undefined}>
                          {contact.value}
                        </a>
                      ) : (
                        <p className="mt-1 truncate text-sm text-neutral-300">{contact.value}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm font-semibold text-neutral-200 transition hover:border-white/30 hover:text-white"
                    onClick={() => void copyContact(contact)}
                  >
                    {copied === contact.label ? <Check size={16} /> : <Copy size={16} />}
                    {copied === contact.label ? "Copied" : "Copy"}
                  </button>
                </div>
              );
            })}
            <a className="rounded-lg border border-white/10 bg-teal-300/10 p-4 text-sm font-semibold text-teal-100 transition hover:border-teal-200/60" href={profile.resume} download="Kunal_Maheshwari_Resume.pdf">
              <FileText className="mb-4" size={22} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }: { onNavigate: NavigateHandler }) {
  return (
    <footer className="border-t border-neutral-200 px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
        <p>{profile.name}</p>
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <RoutedLink key={item.page} page={item.page} onNavigate={onNavigate} className="font-semibold text-neutral-600 hover:text-neutral-950">
              {item.label}
            </RoutedLink>
          ))}
        </div>
      </div>
    </footer>
  );
}

function TechPill({ children, icon: Icon, onClick }: { children: string; icon?: typeof Mail; onClick?: () => void }) {
  const className = "inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-650";
  const content = (
    <>
      {Icon ? <Icon className="shrink-0" size={13} /> : null}
      {children}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={`${className} transition hover:border-teal-700 hover:text-teal-800`} onClick={onClick}>
        {content}
      </button>
    );
  }

  return <span className={className}>{content}</span>;
}

export default App;

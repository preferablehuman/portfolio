export type ContactItem = {
  label: string
  value: string
  href: string
  copy?: string
}

export type Experience = {
  company: string
  role: string
  location: string
  period: string
  summary: string
  highlights: string[]
  stack: string[]
}

export type Project = {
  id: string
  title: string
  eyebrow: string
  period?: string
  repo?: string
  summary: string
  metrics?: { label: string; value: string; detail: string }[]
  tabs: {
    overview: string[]
    architecture: string[]
    technical: string[]
    evidence: string[]
  }
  stack: string[]
}

export type MoreProject = {
  title: string
  type: 'Data & Cloud' | 'Full-stack' | 'Practice'
  description: string
  stack: string[]
  href: string
}

export type SkillApplication = {
  type: 'Work Experience' | 'Project'
  title: string
  context: string
  detail: string
  skills: string[]
}

export type SkillProfile = {
  slug: string
  name: string
  category: string
  years: string
  summary: string
  aliases: string[]
  applications: SkillApplication[]
}

export const profile = {
  name: 'Kunal Maheshwari',
  title: 'Backend Software Engineer / Software Developer',
  location: 'Haldwani, Uttarakhand, India',
  phone: '9897446350',
  email: 'kunal.maheshwari.work@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kunalmaheshwari26',
  github: 'https://github.com/preferablehuman',
  resume: `${import.meta.env.BASE_URL}Kunal_Maheshwari_Resume.pdf`,
  summary:
    'Backend Software Engineer with 4.6+ years of experience building Java/Spring backend systems, REST/SOAP APIs, cloud-native integrations, distributed data pipelines, and privacy-oriented AI platforms across healthcare, automotive, AWS, and Azure environments.',
  positioning: [
    'My professional path starts with enterprise Java delivery at Capgemini, where I worked across automotive applications, REST integrations, SQL tuning, CI/CD pipelines, and code quality practices in Agile teams.',
    'At NTT DATA, the work moved deeper into healthcare insurance integrations: Java 8/11 services, SOAP APIs, IBM WebSphere, CAQH-aligned workflows, Azure Relay, Azure Service Bus, JMS, release delivery, production support, and observability improvements.',
    'My graduate work at Central Michigan University extends that backend foundation into cloud, data, and AI systems. The projects here are written to show what I built, what evidence supports it, and how my experience can translate into backend, cloud integration, data platform, or applied AI engineering roles.',
  ],
  stats: [
    { label: 'Work overview', value: 'Capgemini + NTT DATA' },
    { label: 'Graduate focus', value: 'MS Computer Science' },
    { label: 'Project range', value: 'Backend, cloud, data, AI' },
    { label: 'Core stack', value: 'Java, Spring, SQL, APIs' },
  ],
}

export const contacts: ContactItem[] = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    copy: profile.email,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phone}`,
    copy: profile.phone,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/kunalmaheshwari26',
    href: profile.linkedin,
    copy: profile.linkedin,
  },
  {
    label: 'GitHub',
    value: 'github.com/preferablehuman',
    href: profile.github,
    copy: profile.github,
  },
]

export const experiences: Experience[] = [
  {
    company: 'NTT DATA',
    role: 'Software Developer',
    location: 'Bengaluru, India',
    period: 'Aug 2022 - Aug 2024',
    summary:
      'Built and operated SOA-based healthcare insurance services and hybrid cloud integrations across Java, IBM WebSphere, Azure, and enterprise release pipelines.',
    highlights: [
      'Engineered SOA-based healthcare insurance services using Java 8/11, Spring Framework, SOAP APIs, IBM WebSphere, and CAQH v2/v4 standards.',
      'Sustained 50K+ daily API requests and 99.99% SLA availability through service-orchestration optimization and production debugging.',
      'Designed hybrid integration pipelines using Azure Relay, Azure Service Bus, Azure Functions, API Gateway certificate-based authentication, and JMS queues.',
      'Led Maven, Jenkins, Azure DevOps, IBM UrbanCode Deploy, Git/SVN, JUnit, and CI/CD release delivery across DEV/SIT/PROD.',
      'Migrated services to Log4j 2.x, reduced issue-resolution time by 20%, and accelerated EDX platform upgrade delivery by 50%.',
    ],
    stack: ['Java 8/11', 'Spring Framework', 'SOAP APIs', 'IBM WebSphere', 'Azure Relay', 'Azure Service Bus', 'JMS', 'Jenkins', 'UrbanCode'],
  },
  {
    company: 'Capgemini',
    role: 'Senior Analyst / Analyst',
    location: 'Mumbai, India',
    period: 'Jul 2020 - Aug 2022',
    summary:
      'Delivered enterprise automotive applications, RESTful integrations, SQL performance work, CI/CD automation, and mentoring support across Java/J2EE systems.',
    highlights: [
      'Developed Java 8, Spring MVC, J2EE, EJB, JSF, RESTful microservices, JDBC, and Oracle SQL applications for high-volume transactional workflows.',
      'Implemented vehicle-configuration modules integrating a Python decision-tree service through REST APIs for option availability, pricing, and business rules.',
      'Improved production performance by approximately 90% through SQL optimization, Oracle tuning, query refactoring, and legacy Java modernization.',
      'Improved delivery consistency through Jenkins, GitLab CI/CD, Maven, JUnit4, automated testing, and quality gates.',
      'Mentored junior Java developers through onboarding, pair programming, code reviews, debugging, documentation, and modular object-oriented design guidance.',
    ],
    stack: ['Java 8', 'Spring MVC', 'J2EE', 'EJB', 'JSF', 'REST APIs', 'Oracle SQL', 'Jenkins', 'GitLab CI/CD'],
  },
  {
    company: 'Capgemini',
    role: 'Analyst Trainee',
    location: 'Mumbai, India',
    period: 'Jan 2020 - Jun 2020',
    summary:
      'Built training-program full-stack modules for fitness-club and digital-wallet applications in a 30-member Agile program.',
    highlights: [
      'Delivered object-oriented full-stack fitness-club and digital-wallet applications using Java Spring Framework, Spring MVC, Angular, PostgreSQL, and MVC architecture.',
      'Implemented authentication, email/OTP login, profile-image upload, CRUD operations, account balances, transactions, and UI enhancements.',
      'Participated in Agile delivery, code reviews, feature testing, and sprint-based implementation cycles.',
    ],
    stack: ['Java', 'Spring MVC', 'Angular', 'PostgreSQL', 'MVC', 'Agile'],
  },
]

export const featuredProjects: Project[] = [
  {
    id: 'ai-email-client',
    title: 'Privacy-Preserving AI Email Client',
    eyebrow: 'Graduate capstone | NLP + model serving',
    summary:
      'A privacy-oriented intelligent email client with Gmail integration and a dedicated T5/LoRA model service for thread summarization, categorization, and reply suggestions.',
    metrics: [
      { label: 'Test ROUGE-1 F', value: '53.04', detail: 'Local evaluation artifact' },
      { label: 'Test ROUGE-2 F', value: '44.90', detail: 'Local evaluation artifact' },
      { label: 'Test ROUGE-L F', value: '45.90', detail: 'Local evaluation artifact' },
    ],
    tabs: {
      overview: [
        'Focused personal contribution on the research and model layer, with selected React controls for summarize, categorize, apply-label, and suggest actions.',
        'Converted email threads into EmailSum-style sequence-to-sequence examples using chronological thread serialization and weak target generation.',
        'Positioned the system around privacy-oriented service separation rather than unsupported claims of formal privacy guarantees or production deployment.',
      ],
      architecture: [
        'React/TypeScript mailbox UI connects to an authenticated FastAPI application backend.',
        'A separate FastAPI model service exposes summarize, categorize, suggest, onload, offload, and refresh workflows.',
        'Per-user PEFT/LoRA adapters are loaded from local or S3-compatible object storage and managed with LRU and idle eviction.',
      ],
      technical: [
        'Implemented T5-compatible training and inference flows using PyTorch, Hugging Face Transformers, PEFT, LoRA, checkpoint recovery, and ROUGE evaluation.',
        'Built structured prompt and post-processing patterns for summaries, categories, rationales, and draft replies.',
        'Prepared Docker/MinIO model-service deployment artifacts with Prometheus metrics and CPU/GPU memory diagnostics.',
      ],
      evidence: [
        'Local training files include evaluation JSON with test ROUGE-1 F 53.04, ROUGE-2 F 44.90, and ROUGE-L F 45.90.',
        'Project context confirms claims should avoid production-ready, zero-leakage, compliance, or real-user scale wording.',
        'Source archive verified FastAPI routes, model manager, storage layer, LRU tests, Docker/MinIO configuration, and React AI action controls.',
      ],
    },
    stack: ['Python', 'FastAPI', 'PyTorch', 'Hugging Face', 'T5', 'PEFT/LoRA', 'ROUGE', 'Docker', 'MinIO', 'React'],
  },
  {
    id: 'interactive-portfolio',
    title: 'Interactive Portfolio System',
    eyebrow: 'AI-assisted product build | React + TypeScript',
    summary:
      'A recruiter-facing interactive portfolio built as a local-first React/Vite application with dedicated pages, project case studies, skill evidence search, resume preview, dark/light themes, and deployment-ready static output.',
    metrics: [
      { label: 'Pages', value: '7', detail: 'Overview, About, Experience, Projects, Skills, Education, Contact' },
      { label: 'Case studies', value: '7', detail: 'Project cards with overview, architecture, technical work, evidence, and stack tabs' },
      { label: 'Checks', value: 'Build + lint', detail: 'Verified through Vite production build and ESLint' },
    ],
    tabs: {
      overview: [
        'Defined the product requirements, content scope, visual direction, and recruiter workflows for an interactive portfolio rather than a static resume page.',
        'Used AI coding assistance to accelerate implementation while personally directing content decisions, factual boundaries, project ownership wording, and iterative UI refinements.',
        'Designed the site around recruiter actions: scan the overview, search a skill, inspect project evidence, open the resume modal, and contact directly.',
      ],
      architecture: [
        'React + Vite + TypeScript single-page application with custom History API navigation for dedicated routes such as About, Experience, Projects, Skills, Education, and Contact.',
        'A typed profile data layer drives project case studies, work experience, education, certifications, contact cards, skill groups, and selected skill evidence panels.',
        'Static public assets include the resume PDF, rendered resume page image for modal viewing, and a local SVG favicon so the app remains deployment-friendly.',
      ],
      technical: [
        'Implemented responsive layouts, dark/light theme persistence, animated page transitions, project tabs, expandable work experience, clickable skill pills, and query-string skill deep links.',
        'Built a skill evidence resolver that maps selected skills to direct work/project evidence when available and related evidence anchors when a keyword is broader.',
        'Created a same-page resume modal with blurred background, click-outside close, fixed action controls, direct download, and PDF open fallback.',
      ],
      evidence: [
        'Local app has been repeatedly verified with npm.cmd run build and npm.cmd run lint during implementation.',
        'Portfolio content was curated from the root resume, LinkedIn PDF, local project archives, GitHub repositories, and user-provided project context.',
        'Claims intentionally avoid unsupported production-user, formal compliance, or sole-authorship language for team or AI-assisted work.',
      ],
    },
    stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Motion for React', 'Lucide React', 'Custom SPA Routing', 'AI-assisted Development', 'Static Deployment'],
  },
  {
    id: 'nyu-taxi',
    title: 'NYU Taxi Data Analysis Platform',
    eyebrow: 'Big data | AWS + Spark pipeline',
    repo: 'https://github.com/preferablehuman/AWS-automated-spark-pipeline',
    summary:
      'An event-driven big data pipeline that ingests NYC taxi CSV files, processes them with Spark Structured Streaming, persists analytics data to PostgreSQL, and visualizes results through Flask/Plotly.',
    metrics: [
      { label: 'Dataset scale', value: '8GB+', detail: 'NYC taxi data' },
      { label: 'Runtime gain', value: '40%', detail: 'Spark tuning and async pipeline' },
      { label: 'Infra style', value: 'IaC', detail: 'Terraform-defined AWS stack' },
    ],
    tabs: {
      overview: [
        'Built the platform in two useful modes: a local Docker Compose analytics loop and an AWS event-driven infrastructure version.',
        'Used Spark Structured Streaming to continuously process CSV drops and write transformed records into PostgreSQL.',
        'Exposed analytical views through Flask endpoints backed by SQL and Plotly visualizations.',
      ],
      architecture: [
        'AWS path: S3 ObjectCreated events trigger Lambda, Lambda stages files atomically into EFS, Spark runs on ECS, and results land in RDS PostgreSQL.',
        'Local path: Docker Compose runs Spark, PostgreSQL, and Flask on a shared private network for reproducible demos.',
        'Terraform defines VPC, subnets, NAT, IAM, S3 notifications, Lambda, EFS access points, ECS services, RDS, and CloudWatch.',
      ],
      technical: [
        'Used EFS checkpoints to preserve streaming continuity and avoid reprocessing ambiguity.',
        'Tuned Spark memory, partitioning, micro-batches, and asynchronous processing to reduce end-to-end runtime.',
        'Containerized Spark and Flask components so code could be updated independently during local development.',
      ],
      evidence: [
        'Resume and GitHub README both support the 8GB+ dataset, 40% processing-time reduction, Spark, Terraform, AWS, Docker, PostgreSQL, Flask, and Plotly claims.',
        'GitHub repository includes Terraform, Spark job, Dockerfile, Lambda/ECS/EFS/RDS/S3 modules, and Docker Compose.',
      ],
    },
    stack: ['Apache Spark', 'PySpark', 'AWS', 'Terraform', 'Docker', 'PostgreSQL', 'Flask', 'Plotly', 'ECS', 'Lambda', 'EFS', 'RDS'],
  },
  {
    id: 'lamprey',
    title: 'Lamprey Ecological Tracking Pipeline',
    eyebrow: 'Computer vision | Google Cloud data pipeline',
    repo: 'https://github.com/preferablehuman/lamprey-locator',
    summary:
      'A cloud-connected ecological tracking workflow that detects lamprey movement in video, extracts timestamps and coordinates, cleans detections, and persists results to PostgreSQL through Cloud SQL.',
    tabs: {
      overview: [
        'Built a Flask-triggered video processing service for ecological tracking footage stored in Google Cloud Storage.',
        'Used OpenCV background subtraction and region-of-interest logic to detect movement events in left/right camera alignments.',
        'Paired video detections with a separate CSV processor that cleans PIT/tag detection data by antenna, tag ID, and timestamp.',
      ],
      architecture: [
        'Flask receives a file-location payload, downloads the video blob from Google Cloud Storage, runs OpenCV processing, and writes cleaned detections to PostgreSQL.',
        'Cloud SQL connection uses the Google Cloud SQL connector, pg8000, and SQLAlchemy.',
        'The companion CSV processor runs as an HTTP function, loads tag data from Cloud Storage, deduplicates and sorts events, then writes PIT detections.',
      ],
      technical: [
        'Calculated ROI per camera alignment and timestamp offsets per stream.',
        'Filtered contours by area range, deduplicated timestamp-level events, and required repeated detections to reduce noise.',
        'Persisted enriched fields such as timestamp, frame number, coordinates, detection count, video number, camera, and source location.',
      ],
      evidence: [
        'Local/GitHub source verifies Flask routes, OpenCV, Google Cloud Storage, Cloud SQL connector, PostgreSQL persistence, and CSV cleaning flow.',
        'Portfolio should describe this as an academic/cloud data project, not as a production wildlife monitoring product.',
      ],
    },
    stack: ['Python', 'Flask', 'OpenCV', 'Pandas', 'Google Cloud Storage', 'Cloud SQL', 'PostgreSQL', 'SQLAlchemy', 'Docker'],
  },
  {
    id: 'election-eda',
    title: 'U.S. Election Outcomes EDA',
    eyebrow: 'Exploratory data analysis | political datasets',
    summary:
      'A hypothesis-driven analysis of 2016 and 2020 U.S. election outcomes using electoral votes, vote counts, turnout, demographic data, and campaign-related factors.',
    tabs: {
      overview: [
        'Analyzed whether factors such as funding, turnout, demographics, vote counts, and electoral votes influenced election results.',
        'Focused on exploratory analysis across 2016 and 2020 datasets, including state/county results and voter-age demographics.',
        'Produced notebooks and charts for electoral-vote distribution, voter-turnout patterns, party changes, and demographic comparisons.',
      ],
      architecture: [
        'Data sources included National Archives electoral vote allocation, Kaggle 2016 U.S. election data, Kaggle 2020 U.S. election data, and age/demographic tables.',
        'Notebook workflow cleaned, standardized, merged, and summarized datasets before building hypotheses and visualizations.',
        'Report organized findings around datasets, analysis goals, and exploratory evidence.',
      ],
      technical: [
        'Used Pandas to scrape HTML electoral-vote tables, parse state/vote columns, filter parties, standardize party labels, and merge demographic frames.',
        'Built hypothesis notebooks for turnout, electoral vote distribution, party patterns, age groups, county-level majority analysis, and vote changes.',
        'Generated distribution charts, boxplots, and party-turnout visualizations.',
      ],
      evidence: [
        'Local project report is titled "Analysing Influential Factors in the U.S. Election Outcomes."',
        'Local notebooks include electionvotes, us_elections_age, project, and Hypothesis 1 through Hypothesis 7-8 notebooks.',
        'Use as an academic EDA project; do not overstate as a deployed analytics product.',
      ],
    },
    stack: ['Python', 'Pandas', 'Jupyter', 'Matplotlib', 'EDA', 'Kaggle datasets', 'National Archives data'],
  },
  {
    id: 'online-wallet',
    title: 'OnlineWallet Full-Stack Application',
    eyebrow: 'Full-stack training project | Java + Angular',
    repo: 'https://github.com/preferablehuman/OnlineWallet-repo',
    summary:
      'A digital-wallet training application covering account workflows, authentication, profile management, transaction flows, balances, and CRUD-backed user actions.',
    tabs: {
      overview: [
        'Built as part of early full-stack Java training, with backend and frontend work tied to wallet-account workflows.',
        'Focused on practical application behavior: account balances, transactions, login flows, profile updates, and user-facing CRUD operations.',
        'Useful as a portfolio reference for the foundation behind later enterprise Java, Spring, Angular, PostgreSQL, and MVC work.',
      ],
      architecture: [
        'Angular UI communicates with Java Spring MVC backend modules through application endpoints.',
        'Backend service/controller structure handles wallet entities, account state, transaction records, and authentication-related actions.',
        'PostgreSQL persistence supports user, balance, transaction, and profile data used by the application workflows.',
      ],
      technical: [
        'Implemented wallet operations, transaction views, account-balance handling, and CRUD-style user flows.',
        'Added authentication-related features including email/OTP login and profile-image upload during training project work.',
        'Practiced MVC separation, object-oriented design, database-backed forms, and frontend-backend integration.',
      ],
      evidence: [
        'Resume and LinkedIn experience both reference training full-stack wallet work with Java, Spring MVC, Angular, PostgreSQL, and MVC architecture.',
        'GitHub repository is retained as the primary source link for review.',
      ],
    },
    stack: ['Java', 'Spring MVC', 'Angular', 'PostgreSQL', 'MVC', 'CRUD', 'Authentication'],
  },
  {
    id: 'bookstore',
    title: 'BookStore Full-Stack Application',
    eyebrow: 'Full-stack practice project | Java + Angular',
    repo: 'https://github.com/preferablehuman/BookStore',
    summary:
      'A bookstore application used to practice Java backend structure, Angular UI workflows, REST-style integration, and full-stack application organization.',
    tabs: {
      overview: [
        'Built as a focused full-stack practice project for connecting Java backend logic with an Angular frontend.',
        'Highlights early application-development practice around structured modules, user actions, and UI/API coordination.',
        'Included to show the progression from training projects into enterprise backend engineering roles.',
      ],
      architecture: [
        'Java backend organizes application behavior for bookstore-style operations.',
        'Angular frontend provides the browser-facing interface and component-driven workflow structure.',
        'Repository structure separates frontend and backend concerns so the project can be reviewed as a full-stack learning artifact.',
      ],
      technical: [
        'Practiced REST-style communication between frontend views and backend application logic.',
        'Worked with object-oriented Java structure, Angular components, forms, and application routing patterns.',
        'Used the project as a learning base for later Spring MVC, REST API, and enterprise Java work.',
      ],
      evidence: [
        'GitHub repository is retained as the primary source link for review.',
        'Presented as a practice project and not overstated as a production e-commerce system.',
      ],
    },
    stack: ['Java', 'Angular', 'REST-style APIs', 'Full-stack Development', 'Object-Oriented Programming'],
  },
]

export const skillGroups = [
  {
    name: 'Languages & Backend',
    skills: ['Core Java', 'Python', 'SQL', 'TypeScript', 'Spring Boot', 'Spring MVC', 'Spring Framework', 'FastAPI', 'J2EE', 'EJB', 'JSF', 'Hibernate', 'JPA', 'JDBC', 'REST APIs', 'SOAP APIs', 'Microservices', 'SOA', 'MVC Architecture', 'Angular', 'React'],
  },
  {
    name: 'Cloud & DevOps',
    skills: ['AWS ECS', 'AWS EC2', 'AWS Lambda', 'AWS RDS', 'AWS S3', 'AWS EFS', 'EventBridge', 'QuickSight', 'Azure Functions', 'Azure Service Bus', 'Azure Relay', 'Azure DevOps', 'Docker', 'Kubernetes', 'Terraform', 'GitOps', 'Jenkins', 'GitLab CI/CD', 'Maven', 'IBM UrbanCode Deploy', 'Git', 'SVN'],
  },
  {
    name: 'Data & Tools',
    skills: ['Apache Spark', 'PySpark', 'ETL Pipelines', 'PostgreSQL', 'Oracle DB', 'IBM DB2', 'Redis', 'Celery', 'MinIO', 'IBM WebSphere', 'JMS', 'Apache Kafka', 'API Gateway', 'Gmail API', 'IMAP', 'OAuth/JWT', 'JUnit/JUnit4', 'SoapUI', 'Prometheus', 'Log4j 2.x', 'JIRA', 'Confluence', 'Postman', 'JSON', 'XML', 'YAML'],
  },
  {
    name: 'ML & Practices',
    skills: ['PyTorch', 'Hugging Face Transformers', 'T5', 'PEFT', 'LoRA', 'ROUGE', 'Sequence-to-Sequence Models', 'Quantitative Models', 'Model Quantization', 'Inference Optimization', 'AI-powered Workflow Automation', 'AI-assisted Development', 'Object-Oriented Programming', 'Agile/Scrum', 'CI/CD', 'Test-Driven Development', 'System Design'],
  },
]

export const skillProfiles: SkillProfile[] = [
  {
    slug: 'core-java',
    name: 'Core Java',
    category: 'Languages & Backend',
    years: '4+ years professional',
    summary:
      'Primary backend language across enterprise healthcare, automotive, and training applications, with work spanning services, integration logic, debugging, testing, and release delivery.',
    aliases: ['Java', 'Java 8', 'Java 11', 'J2EE'],
    applications: [
      {
        type: 'Work Experience',
        title: 'NTT DATA - Software Developer',
        context: 'Healthcare insurance integrations',
        detail: 'Built and supported Java 8/11 services, SOAP integrations, WebSphere deployments, production debugging, and CI/CD release work.',
        skills: ['Java 8/11', 'Spring Framework', 'SOAP APIs', 'IBM WebSphere', 'Jenkins'],
      },
      {
        type: 'Work Experience',
        title: 'Capgemini - Senior Analyst / Analyst',
        context: 'Automotive enterprise applications',
        detail: 'Developed Java 8, J2EE, Spring MVC, RESTful services, JDBC, Oracle SQL workflows, and legacy modernization improvements.',
        skills: ['Java 8', 'J2EE', 'Spring MVC', 'REST APIs', 'Oracle SQL'],
      },
      {
        type: 'Project',
        title: 'OnlineWallet Full-Stack Application',
        context: 'Full-stack training application',
        detail: 'Applied Java and Spring MVC to wallet account workflows, authentication-related features, CRUD flows, and transaction handling.',
        skills: ['Java', 'Spring MVC', 'Angular', 'PostgreSQL'],
      },
    ],
  },
  {
    slug: 'spring-framework',
    name: 'Spring Framework',
    category: 'Languages & Backend',
    years: '4+ years professional',
    summary:
      'Used Spring and Spring MVC for service-layer development, MVC application structure, integration endpoints, and full-stack Java application delivery.',
    aliases: ['Spring', 'Spring Boot', 'Spring MVC'],
    applications: [
      {
        type: 'Work Experience',
        title: 'NTT DATA - Software Developer',
        context: 'SOA healthcare services',
        detail: 'Worked with Java/Spring service implementations supporting healthcare integration workflows and enterprise release pipelines.',
        skills: ['Spring Framework', 'Java 8/11', 'SOAP APIs', 'IBM WebSphere'],
      },
      {
        type: 'Work Experience',
        title: 'Capgemini - Senior Analyst / Analyst',
        context: 'Automotive backend services',
        detail: 'Delivered Spring MVC and J2EE application work with REST APIs, SQL tuning, CI/CD, and test support.',
        skills: ['Spring MVC', 'J2EE', 'REST APIs', 'JDBC'],
      },
      {
        type: 'Project',
        title: 'OnlineWallet Full-Stack Application',
        context: 'Training project',
        detail: 'Used Spring MVC patterns for controller, service, persistence, and user-flow implementation.',
        skills: ['Spring MVC', 'MVC Architecture', 'PostgreSQL'],
      },
    ],
  },
  {
    slug: 'rest-apis',
    name: 'REST APIs',
    category: 'Languages & Backend',
    years: '4+ years professional',
    summary:
      'Designed and consumed REST endpoints across enterprise backend workflows and project systems, with attention to integration boundaries and data contracts.',
    aliases: ['REST', 'RESTful APIs', 'API Integration', 'Microservices'],
    applications: [
      {
        type: 'Work Experience',
        title: 'Capgemini - Senior Analyst / Analyst',
        context: 'Automotive integrations',
        detail: 'Built RESTful microservices and integrated a Python decision-tree service for vehicle configuration, option availability, pricing, and business rules.',
        skills: ['REST APIs', 'Java 8', 'Spring MVC', 'Microservices'],
      },
      {
        type: 'Project',
        title: 'Privacy-Preserving AI Email Client',
        context: 'AI model-service integration',
        detail: 'Connected React AI controls to FastAPI routes for summarize, categorize, apply-label, suggest, onload, offload, and refresh workflows.',
        skills: ['FastAPI', 'React', 'REST APIs', 'T5'],
      },
      {
        type: 'Project',
        title: 'Lamprey Ecological Tracking Pipeline',
        context: 'Cloud-triggered processing service',
        detail: 'Used Flask endpoints to trigger video and CSV processing workflows backed by Google Cloud Storage and PostgreSQL persistence.',
        skills: ['Flask', 'REST-style endpoint', 'Google Cloud Storage'],
      },
    ],
  },
  {
    slug: 'soap-apis',
    name: 'SOAP APIs',
    category: 'Languages & Backend',
    years: '2 years professional',
    summary:
      'Applied in enterprise healthcare insurance integrations where stable service contracts, WebSphere deployment, and production reliability mattered.',
    aliases: ['SOAP', 'SOA'],
    applications: [
      {
        type: 'Work Experience',
        title: 'NTT DATA - Software Developer',
        context: 'Healthcare insurance services',
        detail: 'Engineered SOA-based services using SOAP APIs, Java 8/11, IBM WebSphere, CAQH v2/v4 standards, and enterprise release workflows.',
        skills: ['SOAP APIs', 'SOA', 'Java 8/11', 'IBM WebSphere'],
      },
    ],
  },
  {
    slug: 'sql',
    name: 'SQL',
    category: 'Data & Tools',
    years: '4+ years professional and project-based',
    summary:
      'Used for Oracle tuning, PostgreSQL-backed full-stack projects, cloud analytics persistence, and data-cleaning workflows.',
    aliases: ['Oracle SQL', 'PostgreSQL', 'IBM DB2', 'JDBC'],
    applications: [
      {
        type: 'Work Experience',
        title: 'Capgemini - Senior Analyst / Analyst',
        context: 'Performance-sensitive Oracle workflows',
        detail: 'Improved production performance through SQL optimization, Oracle tuning, query refactoring, and Java modernization.',
        skills: ['Oracle SQL', 'JDBC', 'Java', 'Performance Tuning'],
      },
      {
        type: 'Project',
        title: 'NYU Taxi Data Analysis Platform',
        context: 'Spark analytics persistence',
        detail: 'Persisted streaming analytics data into PostgreSQL and exposed query-backed Flask/Plotly analytical views.',
        skills: ['PostgreSQL', 'PySpark', 'Flask', 'Plotly'],
      },
      {
        type: 'Project',
        title: 'Lamprey Ecological Tracking Pipeline',
        context: 'Detection data storage',
        detail: 'Stored cleaned movement and tag-detection records in PostgreSQL through Cloud SQL and SQLAlchemy.',
        skills: ['PostgreSQL', 'Cloud SQL', 'SQLAlchemy', 'Pandas'],
      },
    ],
  },
  {
    slug: 'azure',
    name: 'Azure',
    category: 'Cloud & DevOps',
    years: '2 years professional',
    summary:
      'Used in hybrid enterprise integrations and release workflows, supported by Azure Fundamentals, Azure Developer Associate, and Azure Data Engineer Associate certifications.',
    aliases: ['Azure Functions', 'Azure Service Bus', 'Azure Relay', 'Azure DevOps'],
    applications: [
      {
        type: 'Work Experience',
        title: 'NTT DATA - Software Developer',
        context: 'Hybrid healthcare integrations',
        detail: 'Designed integration pipelines using Azure Relay, Azure Service Bus, Azure Functions, certificate-based API Gateway authentication, and JMS queues.',
        skills: ['Azure Relay', 'Azure Service Bus', 'Azure Functions', 'Azure DevOps'],
      },
      {
        type: 'Work Experience',
        title: 'NTT DATA - Software Developer',
        context: 'Release delivery',
        detail: 'Used Azure DevOps with Maven, Jenkins, IBM UrbanCode Deploy, Git/SVN, and environment-based release delivery.',
        skills: ['Azure DevOps', 'CI/CD', 'Jenkins', 'UrbanCode'],
      },
    ],
  },
  {
    slug: 'aws',
    name: 'AWS',
    category: 'Cloud & DevOps',
    years: '1+ year project-based',
    summary:
      'Applied in graduate cloud and data projects using Terraform-defined services, containerized workloads, object storage, serverless triggers, and managed databases.',
    aliases: ['AWS ECS', 'AWS EC2', 'AWS Lambda', 'AWS RDS', 'AWS S3', 'AWS EFS'],
    applications: [
      {
        type: 'Project',
        title: 'NYU Taxi Data Analysis Platform',
        context: 'Event-driven Spark pipeline',
        detail: 'Built Terraform-defined infrastructure using S3, Lambda, EFS, ECS, RDS PostgreSQL, IAM, VPC networking, and CloudWatch.',
        skills: ['AWS S3', 'AWS Lambda', 'AWS EFS', 'AWS ECS', 'AWS RDS', 'Terraform'],
      },
    ],
  },
  {
    slug: 'apache-spark',
    name: 'Apache Spark',
    category: 'Data & Tools',
    years: '1+ year project-based',
    summary:
      'Used for big-data processing and streaming analytics in a containerized and AWS-backed graduate data platform.',
    aliases: ['Spark', 'PySpark', 'Spark Structured Streaming'],
    applications: [
      {
        type: 'Project',
        title: 'NYU Taxi Data Analysis Platform',
        context: 'Big data pipeline',
        detail: 'Processed NYC taxi CSV files with Spark Structured Streaming, EFS checkpoints, PostgreSQL persistence, and Flask/Plotly dashboards.',
        skills: ['Apache Spark', 'PySpark', 'Structured Streaming', 'PostgreSQL'],
      },
    ],
  },
  {
    slug: 'python',
    name: 'Python',
    category: 'Languages & Backend',
    years: '2+ years combined professional and project use',
    summary:
      'Used for backend service integration, data pipelines, model training/inference workflows, exploratory analysis, and computer vision processing.',
    aliases: ['Pandas', 'Flask', 'FastAPI', 'PySpark'],
    applications: [
      {
        type: 'Work Experience',
        title: 'Capgemini - Senior Analyst / Analyst',
        context: 'Decision-tree service integration',
        detail: 'Integrated a Python decision-tree service with Java REST APIs for vehicle configuration and business-rule workflows.',
        skills: ['Python', 'REST APIs', 'Java', 'Decision Trees'],
      },
      {
        type: 'Project',
        title: 'Privacy-Preserving AI Email Client',
        context: 'NLP model service',
        detail: 'Built model training and inference flows using Python, PyTorch, Hugging Face Transformers, PEFT/LoRA, and FastAPI.',
        skills: ['Python', 'FastAPI', 'PyTorch', 'Hugging Face'],
      },
      {
        type: 'Project',
        title: 'U.S. Election Outcomes EDA',
        context: 'Academic exploratory analysis',
        detail: 'Used Python notebooks, Pandas, and charting workflows for hypothesis-driven election dataset analysis.',
        skills: ['Python', 'Pandas', 'Jupyter', 'EDA'],
      },
    ],
  },
  {
    slug: 'fastapi',
    name: 'FastAPI',
    category: 'Languages & Backend',
    years: '1+ year project-based',
    summary:
      'Applied to model-serving APIs for summarization, categorization, reply suggestion, adapter lifecycle operations, and service diagnostics.',
    aliases: ['Python API', 'Model Service'],
    applications: [
      {
        type: 'Project',
        title: 'Privacy-Preserving AI Email Client',
        context: 'Dedicated AI model service',
        detail: 'Exposed summarize, categorize, suggest, onload, offload, refresh, and diagnostics routes around T5/LoRA model workflows.',
        skills: ['FastAPI', 'T5', 'PEFT/LoRA', 'Docker', 'Prometheus'],
      },
    ],
  },
  {
    slug: 'react',
    name: 'React',
    category: 'Languages & Backend',
    years: '1+ year project-based',
    summary:
      'Used for interactive project UIs, including selected AI action controls in the capstone and this portfolio interface.',
    aliases: ['React.js', 'TypeScript'],
    applications: [
      {
        type: 'Project',
        title: 'Privacy-Preserving AI Email Client',
        context: 'Selected mailbox AI controls',
        detail: 'Added React buttons and workflows for summarize, categorize, apply-label, and suggestion actions connected to backend/model routes.',
        skills: ['React', 'TypeScript', 'FastAPI', 'Gmail API'],
      },
    ],
  },
  {
    slug: 'angular',
    name: 'Angular',
    category: 'Languages & Backend',
    years: 'Training and project-based use',
    summary:
      'Used in early full-stack Java training projects to connect browser workflows with Spring MVC backend services.',
    aliases: ['TypeScript Angular'],
    applications: [
      {
        type: 'Work Experience',
        title: 'Capgemini - Analyst Trainee',
        context: 'Full-stack training program',
        detail: 'Built UI flows for fitness-club and digital-wallet applications alongside Java Spring MVC and PostgreSQL modules.',
        skills: ['Angular', 'Spring MVC', 'PostgreSQL', 'MVC'],
      },
      {
        type: 'Project',
        title: 'OnlineWallet Full-Stack Application',
        context: 'Wallet UI workflows',
        detail: 'Connected Angular views to wallet account, profile, transaction, and CRUD-backed user flows.',
        skills: ['Angular', 'Java', 'Spring MVC', 'PostgreSQL'],
      },
      {
        type: 'Project',
        title: 'BookStore Full-Stack Application',
        context: 'Practice application',
        detail: 'Practiced Angular frontend structure, forms, routing patterns, and API coordination with a Java backend.',
        skills: ['Angular', 'Java', 'REST-style APIs'],
      },
    ],
  },
  {
    slug: 'pytorch-hugging-face',
    name: 'PyTorch and Hugging Face',
    category: 'ML & Practices',
    years: '1+ year project-based',
    summary:
      'Used for graduate NLP research and model-serving work around T5 sequence-to-sequence summarization, PEFT/LoRA adapters, and ROUGE evaluation.',
    aliases: ['PyTorch', 'Hugging Face Transformers', 'T5', 'PEFT', 'LoRA', 'ROUGE'],
    applications: [
      {
        type: 'Project',
        title: 'Privacy-Preserving AI Email Client',
        context: 'Research and model layer ownership',
        detail: 'Implemented T5-compatible training and inference flows with checkpoint recovery, PEFT/LoRA adapters, ROUGE evaluation, and structured outputs.',
        skills: ['PyTorch', 'Hugging Face', 'T5', 'PEFT/LoRA', 'ROUGE'],
      },
    ],
  },
  {
    slug: 'docker',
    name: 'Docker',
    category: 'Cloud & DevOps',
    years: '1+ year project-based',
    summary:
      'Used to package local analytics, model-serving, and cloud-processing components into repeatable development and demo environments.',
    aliases: ['Containerization', 'Docker Compose'],
    applications: [
      {
        type: 'Project',
        title: 'NYU Taxi Data Analysis Platform',
        context: 'Local and AWS analytics environment',
        detail: 'Containerized Spark, Flask, and PostgreSQL components for local reproducibility and cloud-oriented deployment work.',
        skills: ['Docker', 'Spark', 'Flask', 'PostgreSQL'],
      },
      {
        type: 'Project',
        title: 'Privacy-Preserving AI Email Client',
        context: 'Model-service packaging',
        detail: 'Prepared Docker and MinIO model-service artifacts with metrics and memory diagnostics.',
        skills: ['Docker', 'MinIO', 'FastAPI', 'Prometheus'],
      },
    ],
  },
  {
    slug: 'terraform',
    name: 'Terraform',
    category: 'Cloud & DevOps',
    years: '1+ year project-based',
    summary:
      'Applied as infrastructure-as-code for graduate AWS data engineering work across networking, storage, compute, serverless triggers, and managed databases.',
    aliases: ['Infrastructure as Code', 'IaC'],
    applications: [
      {
        type: 'Project',
        title: 'NYU Taxi Data Analysis Platform',
        context: 'AWS infrastructure',
        detail: 'Defined VPC, subnets, IAM, S3 notifications, Lambda, EFS access points, ECS services, RDS, and CloudWatch resources.',
        skills: ['Terraform', 'AWS', 'ECS', 'Lambda', 'RDS'],
      },
    ],
  },
  {
    slug: 'opencv',
    name: 'OpenCV',
    category: 'Data & Tools',
    years: '1+ year project-based',
    summary:
      'Used for video-based movement detection, region-of-interest processing, contour filtering, timestamp extraction, and ecological tracking data preparation.',
    aliases: ['Computer Vision'],
    applications: [
      {
        type: 'Project',
        title: 'Lamprey Ecological Tracking Pipeline',
        context: 'Video detection workflow',
        detail: 'Detected lamprey movement from video using background subtraction, camera-specific ROI handling, contour filtering, and timestamp cleanup.',
        skills: ['OpenCV', 'Python', 'Flask', 'Google Cloud Storage'],
      },
    ],
  },
]

export const education = [
  {
    school: 'Central Michigan University',
    degree: 'Master of Science in Computer Science',
    location: 'Mount Pleasant, MI, USA',
    period: 'Aug 2024 - Dec 2025',
    detail: 'GPA: 3.87 / 4.0',
    coursework: [
      'Modern Databases',
      'Pattern Recognition and Data Mining',
      'Software and Data Modeling',
      'Applied Data Engineering',
      'Big Data Analytics',
      'Cloud Computing',
      'Analysis and Design of Algorithms',
    ],
  },
  {
    school: 'Lovely Professional University',
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    location: 'Punjab, India',
    period: 'Aug 2016 - May 2020',
    detail: 'CGPA: 8.02 / 10',
  },
]

export const certifications = [
  'Microsoft Certified: Azure Fundamentals',
  'Microsoft Certified: Azure Developer Associate',
  'Microsoft Certified: Azure Data Engineer Associate',
  'Workshop on Ethical Hacking',
  'Introduction to Linux',
  'Agile Software Development',
]

export const moreProjects: MoreProject[] = [
  {
    title: 'BookStore',
    type: 'Full-stack',
    description: 'Java/Angular learning project from early full-stack backend and frontend practice.',
    stack: ['Java', 'Angular', 'REST'],
    href: 'https://github.com/preferablehuman/BookStore',
  },
  {
    title: 'bookstore-angular',
    type: 'Full-stack',
    description: 'Angular frontend companion repository for bookstore UI workflows.',
    stack: ['Angular', 'TypeScript'],
    href: 'https://github.com/preferablehuman/bookstore-angular',
  },
  {
    title: 'OnlineWallet',
    type: 'Full-stack',
    description: 'Digital wallet training application covering account flows, transactions, balances, and CRUD operations.',
    stack: ['Java', 'Spring', 'Angular', 'PostgreSQL'],
    href: 'https://github.com/preferablehuman/OnlineWallet-repo',
  },
  {
    title: 'OnlineWallet Angular',
    type: 'Full-stack',
    description: 'Frontend repository for the wallet training application.',
    stack: ['Angular', 'TypeScript'],
    href: 'https://github.com/preferablehuman/OnlineWallet_Angular',
  },
  {
    title: 'E-commerce',
    type: 'Full-stack',
    description: 'Full-stack e-commerce practice repository for application structure and UI/API learning.',
    stack: ['Java', 'Web app'],
    href: 'https://github.com/preferablehuman/ecomm',
  },
  {
    title: 'OAuth Demo',
    type: 'Practice',
    description: 'Small authentication-focused repository for OAuth flow exploration.',
    stack: ['OAuth', 'Auth flows'],
    href: 'https://github.com/preferablehuman/OAuth-demo',
  },
  {
    title: 'Party Game',
    type: 'Full-stack',
    description: 'React/Vite app scaffold used for interactive UI experimentation.',
    stack: ['React', 'Vite'],
    href: 'https://github.com/preferablehuman/party-game',
  },
  {
    title: 'Java Coding Practice',
    type: 'Practice',
    description: 'Java practice repository for core language and problem-solving exercises.',
    stack: ['Java'],
    href: 'https://github.com/preferablehuman/Javacoding',
  },
  {
    title: 'Masters Coursework',
    type: 'Data & Cloud',
    description: 'Coursework repository spanning modern databases, data mining, and software/data modeling.',
    stack: ['SQL', 'Pandas', 'Jupyter', 'Databases'],
    href: 'https://github.com/preferablehuman/masterscourses',
  },
]

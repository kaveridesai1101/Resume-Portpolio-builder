/**
 * Mock AI Layer — simulates GPT-4o / Claude 3.5 Sonnet responses.
 * In production, replace these functions with real SSE streaming calls to /api/v1/ai/...
 */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Retries a function up to `maxAttempts` times with exponential back-off */
async function withRetry(fn, maxAttempts = 3, baseDelay = 500) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxAttempts - 1) throw err;
      await sleep(baseDelay * Math.pow(2, attempt));
    }
  }
}

// ── Task A: Career Objective ──────────────────────────────────────────────────
async function generateCareerObjective({ jobRole, experienceLevel, skills }) {
  await sleep(600 + Math.random() * 400);
  const topSkills = (skills || []).slice(0, 4).join(', ') || 'modern technologies';
  const objectives = {
    Fresher: `Highly motivated and detail-oriented ${jobRole} with hands-on experience in ${topSkills}, eager to contribute innovative solutions to a forward-thinking organization. Passionate about leveraging cutting-edge technologies to deliver scalable, high-impact software products. Seeking a challenging ${jobRole} role where I can grow professionally while making meaningful contributions to team goals and business objectives.`,
    Junior: `Results-driven ${jobRole} with proven expertise in ${topSkills} and a track record of delivering production-ready solutions. Skilled at collaborating cross-functionally to architect elegant, maintainable code that meets demanding business requirements. Seeking a ${jobRole} opportunity to deepen technical leadership skills and drive measurable improvements in product quality and performance.`,
    Mid: `Accomplished ${jobRole} with 3-5 years of hands-on experience designing and shipping high-availability systems using ${topSkills}. Demonstrated ability to reduce system latency by 30% and increase deployment frequency by mentoring junior engineers and establishing best practices. Targeting a senior ${jobRole} position to own end-to-end feature delivery and influence architectural decisions at scale.`,
    Senior: `Visionary Senior ${jobRole} with 7+ years leading cross-functional engineering teams and delivering enterprise-grade platforms powered by ${topSkills}. Consistently drives 40%+ improvements in system reliability and team velocity through strategic technical leadership, scalable architecture design, and data-driven decision-making. Seeking a principal-level role to shape organizational engineering culture and deliver transformative product outcomes.`,
  };
  return objectives[experienceLevel] || objectives['Mid'];
}

// ── Task B: Enhanced Project Descriptions ─────────────────────────────────────
async function enhanceProjectDescriptions({ projects, jobRole }) {
  await sleep(800 + Math.random() * 500);
  return (projects || []).map((proj) => {
    const tech = proj.techStack || 'modern tech stack';
    const name = proj.name || 'Project';
    return {
      ...proj,
      enhancedBullets: [
        `Architected and deployed ${name} using ${tech}, resulting in a 40% reduction in API response time and supporting 10,000+ concurrent users.`,
        `Implemented automated CI/CD pipelines and comprehensive test coverage (95%+), reducing release cycle time by 3 days and eliminating production incidents.`,
        `Collaborated with cross-functional stakeholders to define technical requirements, delivering the MVP 2 weeks ahead of schedule and under budget by 15%.`,
      ],
    };
  });
}

// ── Task C: Enhanced Experience Bullets ──────────────────────────────────────
async function enhanceExperienceBullets({ experience, jobRole, experienceLevel }) {
  await sleep(700 + Math.random() * 400);
  return (experience || []).map((exp) => {
    const role = exp.role || 'Engineer';
    const company = exp.company || 'Company';
    return {
      ...exp,
      enhancedBullets: [
        `Spearheaded migration of legacy monolith to microservices architecture at ${company}, improving system uptime to 99.9% and cutting infrastructure costs by 22%.`,
        `Led a team of 5 engineers to deliver 3 major product features per quarter, increasing user engagement by 28% and reducing churn by 12%.`,
        `Optimized critical database queries and implemented Redis caching, achieving a 60% reduction in page load time and improving Core Web Vitals scores to 95+.`,
        `Championed code quality initiatives including automated linting, pair programming, and design reviews, reducing bug escape rate by 35% quarter-over-quarter.`,
        `Drove adoption of agile methodologies and sprint ceremonies, increasing team velocity by 40% and improving on-time delivery rate to 94%.`,
      ],
    };
  });
}

// ── Task D: Skill Recommendations ────────────────────────────────────────────
async function recommendSkills({ jobRole, experienceLevel, skills }) {
  await sleep(500 + Math.random() * 300);
  const roleSkills = {
    'Frontend Developer':    ['WebAssembly', 'Micro-Frontends', 'Storybook', 'Cypress', 'Web Components', 'PWA', 'GraphQL', 'Accessibility (WCAG)'],
    'Backend Developer':     ['gRPC', 'Apache Kafka', 'Redis', 'Kubernetes', 'Terraform', 'OpenTelemetry', 'GraphQL', 'Service Mesh'],
    'Full Stack Developer':  ['Docker', 'GraphQL', 'Redis', 'CI/CD', 'Kubernetes', 'WebSockets', 'Microservices', 'System Design'],
    'Data Scientist':        ['MLflow', 'Apache Spark', 'Feature Engineering', 'A/B Testing', 'Hugging Face', 'dbt', 'Tableau', 'SQL Optimization'],
    'ML Engineer':           ['Kubeflow', 'MLOps', 'ONNX', 'TensorRT', 'LoRA Fine-tuning', 'Vector Databases', 'LangChain', 'Ray'],
    'DevOps Engineer':       ['ArgoCD', 'Helm Charts', 'Prometheus', 'Grafana', 'Istio', 'Vault', 'GitOps', 'SRE Practices'],
    'Product Manager':       ['OKR Framework', 'Roadmapping', 'SQL Analytics', 'A/B Testing', 'Customer Journey Mapping', 'Figma', 'Jira', 'Amplitude'],
    'UI/UX Designer':        ['Figma Advanced', 'Design Tokens', 'Motion Design', 'Usability Testing', 'Accessibility', 'Design Systems', 'Prototyping', 'User Research'],
    'Mobile Developer':      ['SwiftUI', 'Jetpack Compose', 'React Native', 'Flutter', 'App Performance Profiling', 'Deep Linking', 'Push Notifications', 'Mobile CI/CD'],
    'Cloud Architect':       ['Well-Architected Framework', 'FinOps', 'Multi-Region Design', 'CDN Optimization', 'IAM Best Practices', 'Disaster Recovery', 'Serverless', 'Edge Computing'],
  };
  const defaults = ['System Design', 'Communication', 'Problem Solving', 'Agile/Scrum', 'Code Review', 'Documentation', 'Testing', 'Performance Optimization'];
  const pool = roleSkills[jobRole] || defaults;
  const existing = new Set((skills || []).map((s) => s.toLowerCase()));
  return pool.filter((s) => !existing.has(s.toLowerCase())).slice(0, 8);
}

// ── ATS Score ─────────────────────────────────────────────────────────────────
export async function scoreResume({ formData, aiContent }) {
  await sleep(1200 + Math.random() * 500);
  const fd = formData || {};
  const ai = aiContent || {};
  
  let score = 0;
  const feedback = [];
  const keywordsMissing = [];
  const strengths = [];

  // 1. Contact Info (15 points)
  if (fd.fullName) score += 5; else feedback.push('Full name is missing.');
  if (fd.email) score += 5; else feedback.push('Professional email is required.');
  if (fd.phone || fd.linkedin) score += 5; else feedback.push('Add a phone number or LinkedIn for contact.');

  // 2. Summary/Objective (15 points)
  if (ai.careerObjective) {
    score += 15;
    strengths.push('ATS-optimized professional summary detected.');
  } else {
    feedback.push('Add a career objective to capture immediate attention.');
  }

  // 3. Experience & Quantified Impact (30 points)
  const expCount = (fd.experience || []).filter(e => e.company && e.role).length;
  if (expCount > 0) {
    score += 10;
    const hasAIExp = ai.enhancedExperience && ai.enhancedExperience.length > 0;
    if (hasAIExp) {
      score += 20;
      strengths.push('Strong quantified bullet points using action verbs.');
    } else {
      feedback.push('Use action verbs and metrics (%, $) to quantify your impact.');
    }
  } else {
    feedback.push('Professional experience section is missing or too brief.');
  }

  // 4. Skills & Keyword Density (20 points)
  const skillCount = (fd.skills || []).length;
  if (skillCount >= 8) {
    score += 20;
    strengths.push('Excellent technical skill coverage.');
  } else {
    score += (skillCount * 2);
    feedback.push('Include at least 8-10 industry-specific keywords for ATS parsing.');
  }

  // 5. Projects & Education (20 points)
  if ((fd.projects || []).length > 0) score += 10;
  if ((fd.education || []).length > 0) score += 10;

  // Keyword Analysis (Mocked but following standard patterns)
  const jobRole = fd.jobRole || 'Professional';
  const roleKeywords = {
    'Frontend Developer': ['React', 'TypeScript', 'Responsive Design', 'Web Performance', 'Accessibility'],
    'Backend Developer': ['Microservices', 'API Design', 'PostgreSQL', 'System Design', 'Cloud Computing'],
    'Data Scientist': ['Machine Learning', 'Statistical Modeling', 'Python', 'Data Visualization', 'SQL'],
  };
  
  const targetKeywords = roleKeywords[jobRole] || ['Communication', 'Leadership', 'Problem Solving', 'Agile'];
  const userSkills = (fd.skills || []).map(s => s.toLowerCase());
  
  targetKeywords.forEach(k => {
    if (!userSkills.includes(k.toLowerCase())) {
      keywordsMissing.push(k);
    }
  });

  if (keywordsMissing.length === 0) strengths.push(`Highly relevant keywords for ${jobRole} roles.`);

  return {
    score: Math.min(score, 100),
    feedback: feedback.slice(0, 4),
    keywordsMissing: keywordsMissing,
    strengths: strengths.slice(0, 4),
  };
}

// ── Main orchestration (runs all 4 tasks in parallel) ────────────────────────
export async function generateAllAIContent({ formData }, onProgress) {
  onProgress?.({ phase: 'starting', message: 'Initializing AI generation…' });

  const results = await Promise.allSettled([
    withRetry(() => generateCareerObjective(formData), 2),
    withRetry(() => enhanceProjectDescriptions(formData), 2),
    withRetry(() => enhanceExperienceBullets(formData), 2),
    withRetry(() => recommendSkills(formData), 2),
  ]);

  const [objResult, projResult, expResult, skillResult] = results;

  onProgress?.({ phase: 'complete', message: 'AI generation complete!' });

  return {
    careerObjective:    objResult.status  === 'fulfilled' ? objResult.value  : '⚠ Generation failed — retry.',
    enhancedProjects:   projResult.status === 'fulfilled' ? projResult.value : [],
    enhancedExperience: expResult.status  === 'fulfilled' ? expResult.value  : [],
    recommendedSkills:  skillResult.status === 'fulfilled' ? skillResult.value : [],
  };
}

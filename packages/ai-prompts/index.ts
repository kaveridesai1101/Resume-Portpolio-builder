export const RESUME_PROMPTS = {
  OBJECTIVE: `You are a professional resume writer. Generate a compelling 3-sentence career objective for a {experienceLevel} {jobRole}. The candidate has skills in {topSkills}. Make it specific, achievement-oriented, and ATS-optimized. Return ONLY the objective text.`,
  
  PROJECTS: `Rewrite this project description for a {jobRole} resume using the STAR method. Include quantified impact. Original: {description}. Tech: {techStack}. Return 3 bullet points with strong action verbs. No markdown.`,
  
  EXPERIENCE: `Transform these responsibilities into powerful resume bullets for a {jobRole} at {experienceLevel} level. Use strong action verbs and realistic metrics. Input: {responsibilities}. Return max 5 bullets. No markdown.`,
  
  SKILLS: `For a {jobRole} at {experienceLevel} level with skills: {skills}, suggest 8-10 additional skills to highlight. Return JSON array of strings only.`,
  
  ATS_SCORE: `Analyze this resume for ATS compatibility for a {jobRole}. Score 0-100. Return JSON only: { score, feedback, keywordsMissing, strengths }.`
};

export const PORTFOLIO_PROMPTS = {
  BIO: `Generate a short, punchy 2-sentence bio for a personal portfolio site based on this career objective: {objective}. Tone: Professional but approachable.`,
};

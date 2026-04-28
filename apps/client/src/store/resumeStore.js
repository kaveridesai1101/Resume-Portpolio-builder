import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_FORM_DATA = {
  // Step 1 – Personal Info
  fullName: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  portfolio: '',
  // Step 2 – Education
  education: [{ id: 1, degree: '', institution: '', year: '', gpa: '', relevant: '' }],
  // Step 3 – Skills
  skills: [],
  certifications: '',
  // Step 4 – Projects
  projects: [{ id: 1, name: '', description: '', techStack: '', link: '' }],
  // Step 5 – Experience
  experience: [{ id: 1, company: '', role: '', duration: '', responsibilities: '' }],
  // Step 6 – Role Selection
  jobRole: '',
  experienceLevel: '',
  targetCompanyType: '',
};

const INITIAL_AI_CONTENT = {
  careerObjective: '',
  enhancedProjects: [],
  enhancedExperience: [],
  recommendedSkills: [],
  atsScore: null,
  atsFeedback: [],
  atsKeywordsMissing: [],
  atsStrengths: [],
};

let saveTimer = null;

const useResumeStore = create(
  persist(
    (set, get) => ({
      // ── Form state ──────────────────────────────────────
      currentStep: 1,
      formData: INITIAL_FORM_DATA,
      aiContent: INITIAL_AI_CONTENT,
      selectedTemplate: 'classic',      // classic | modern | creative
      selectedPortfolio: 'developer-dark', // developer-dark | creative-light | executive-minimal
      isGenerating: false,
      isSaving: false,
      resumeId: null,
      portfolioUrl: null,
      pdfUrl: null,
      lastSaved: null,

      // ── Navigation ──────────────────────────────────────
      setStep: (step) => set({ currentStep: step }),
      nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 6) })),
      prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),

      // ── Form updates (with debounced auto-save) ─────────
      updateFormData: (partial) => {
        set((s) => ({ formData: { ...s.formData, ...partial } }));
        // 30-second debounce auto-save
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
          set({ lastSaved: new Date().toISOString(), isSaving: false });
        }, 30000);
        set({ isSaving: true });
      },

      setFormData: (data) => set({ formData: { ...INITIAL_FORM_DATA, ...data } }),

      // ── AI Content ──────────────────────────────────────
      setAIContent: (partial) => set((s) => ({ aiContent: { ...s.aiContent, ...partial } })),
      setIsGenerating: (v) => set({ isGenerating: v }),

      // ── Template selection ───────────────────────────────
      setTemplate: (t) => set({ selectedTemplate: t }),
      setPortfolioTemplate: (t) => set({ selectedPortfolio: t }),

      // ── URLs ─────────────────────────────────────────────
      setPdfUrl: (url) => set({ pdfUrl: url }),
      setPortfolioUrl: (url) => set({ portfolioUrl: url }),
      setResumeId: (id) => set({ resumeId: id }),

      // ── Reset ─────────────────────────────────────────────
      resetAll: () =>
        set({
          currentStep: 1,
          formData: INITIAL_FORM_DATA,
          aiContent: INITIAL_AI_CONTENT,
          selectedTemplate: 'classic',
          selectedPortfolio: 'developer-dark',
          isGenerating: false,
          isSaving: false,
          resumeId: null,
          portfolioUrl: null,
          pdfUrl: null,
          lastSaved: null,
        }),

      // ── ATS Score ────────────────────────────────────────
      setAtsScore: (score, feedback, keywordsMissing, strengths) =>
        set((s) => ({
          aiContent: {
            ...s.aiContent,
            atsScore: score,
            atsFeedback: feedback,
            atsKeywordsMissing: keywordsMissing,
            atsStrengths: strengths,
          },
        })),
    }),
    {
      name: 'resumeforge-data',
      partialize: (state) => ({
        formData: state.formData,
        aiContent: state.aiContent,
        currentStep: state.currentStep,
        selectedTemplate: state.selectedTemplate,
        selectedPortfolio: state.selectedPortfolio,
        lastSaved: state.lastSaved,
      }),
    }
  )
);

export default useResumeStore;

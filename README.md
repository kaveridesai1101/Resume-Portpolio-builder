# AI Resume & Portfolio Generator 🚀

A production-ready full-stack application built with the MERN stack, GPT-4o, and Puppeteer.

## ✨ Features
- **Multi-step Form Wizard**: 6-step professional onboarding with auto-save.
- **Parallel AI Content Generation**: Objective, Projects, and Experience enhancement via SSE.
- **ATS Intelligence**: Real-time scoring and keyword optimization feedback.
- **Dual Preview Dashboard**: Side-by-side Resume and Portfolio preview.
- **Professional Templates**: 3 Resume templates and 3 Portfolio templates.
- **PDF Export**: Server-side rendering via Puppeteer.
- **Self-hosted Portfolios**: Instant portfolio URL generation.

## 🛠 Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Zustand, React Hook Form.
- **Backend**: Node.js, Express, MongoDB Atlas, OpenAI GPT-4o.
- **Infrastructure**: Docker, docker-compose, Puppeteer, AWS S3.

## 🚀 Quick Start (Docker)
Ensure you have Docker and an `.env` file with your `OPENAI_API_KEY`.

```bash
docker-compose up --build
```
Access the app at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 📂 Project Structure
- `/apps/client`: React frontend.
- `/apps/server`: Express backend.
- `/packages/shared`: Shared Zod schemas and Types.
- `/packages/ai-prompts`: Centralized AI prompt management.

## 📄 License
MIT

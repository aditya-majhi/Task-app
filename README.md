# Task Management App with Embedded AI Copilot

This project is a lightweight task management application with an **embedded, context-aware AI copilot**.  
The copilot helps users understand and manage their tasks by summarizing active work, suggesting priorities, and breaking down vague tasks into actionable steps.

The emphasis of this project is on **thoughtful interaction design**, **frontend-first architecture**, and **responsible AI usage**, rather than complex backend agent orchestration.

---

## Features

### Core Task Management

- Create, update, and delete tasks
- Simple and clear task schema
- Persistent storage using Supabase

### AI Copilot

- Embedded chat UI (not a floating button)
- Context-aware (receives current tasks as readable context)
- Can:
  - Summarize active tasks
  - Suggest priorities
  - Break vague tasks into actionable subtasks (reasoning only)
- Optional task creation through conversation
- Human-in-the-loop data collection for missing fields

---

## Tech Stack

**Frontend**

- Next.js (App Router)
- TypeScript
- CopilotKit
- Axios

**Backend**

- Next.js API routes
- Supabase (PostgreSQL)

**AI**

- Google Gemini (via CopilotKit adapter)

## Setup Instructions

Follow the steps below to set up the project locally.

---

### Clone the Repository

```bash
git clone <repository-url>
cd task-management-copilot
```

### Install Dependencies

```bash
npm i
```

### Supabase Setup

- Create a Supabase Project
- Go to https://supabase.com
- Sign in or create an account
- Click “New Project”
- Choose a project name and region
- Set a database password and create the project

- Create Tasks Table
- After successful Project creation run

```sql
create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null,
  priority text not null,
  created_at timestamp with time zone default now()
);
```

- Then go to supabase Project Setting select Data API, and set like below

```bash
SUPABASE_URL=YOUR SUPABASE URL
```

- Then select API Keys in Project settings, and select the tab "Legacy anon, service_role API keys" and copy the service role api key and set like below

```bash
SUPABASE_SERVICE_ROLE_KEY=YOUR SUPABASE SERVICE ROLE KEY
```

### Google Gemini API key

- Visit https://aistudio.google.com
- Sign in with a Google account
- Click “Get API key”
- Create a new API key
- Copy the generated key
- And set as below

```bash
GOOGLE_GENERATIVE_AI_API_KEY=YOUR GOOGLE GEMINI API KEY
```

### Start the project

Now run

```bash
npm run dev
```

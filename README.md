# **EasyLearn — Intelligent Quiz Generation & Student Performance Analytics**

[Presentation Link](./screenshots/banner.png)
![EasyLearn Banner](./screenshots/banner.png)

EasyLearn is an AI-powered learning assistant that helps teachers automatically generate quizzes from PDFs and analyze student performance in real-time. With AI-generated quizzes, intelligent dashboards, and automated insights, EasyLearn helps teachers understand each student’s strengths and weaknesses—something traditional classrooms often struggle to provide.

Developed for the **Provincial Phase Rupandehi — CodeFest 2025**, organized by **Code for Change Rupandehi** on **November 21–22, 2025**.

---

## **Badges**

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-Next.js-blue)
![Backend](https://img.shields.io/badge/backend-Express-green)
![Mobile](https://img.shields.io/badge/mobile-Expo-orange)
![AI](https://img.shields.io/badge/AI-LangChain%20%2B%20Gemini-purple)
![License](https://img.shields.io/badge/license-Open-blue)

---

## 🚀 **Features**

- **AI-Powered Quiz Generation** from PDFs using LangChain + Gemini.
- **Student Quiz Portal** for seamless quiz attempts.
- **Automated Performance Analytics** with insights & weakness detection.
- **Teacher Dashboard** for class monitoring and student progress tracking.
- **Cross-Platform Support** via Web (Next.js) + Mobile (Expo).
- **Secure & Scalable Backend** powered by Express + MongoDB.

---

## 🏗️ **Project Structure**

```
TeamLCCElite
│
├── App (Expo App)
│   ├── app
│   ├── assets/images
│   ├── components
│   ├── constants
│   ├── data
│   ├── hooks
│   └── scripts
│
├── Backend
│   └── src
│       ├── controllers
│       ├── middleware
│       ├── lib
│       ├── model
│       ├── routes
│       ├── utils
│       ├── env.ts
│       ├── server.ts
│       └── test.ts
│
└── frontend
    ├── app
    │   ├── admin
    │   ├── auth
    │   ├── student
    │   │   ├── classes
    │   │   ├── dashboard
    │   │   ├── progress
    │   │   ├── quizzes
    │   │   └── layout.tsx
    │   ├── teacher
    │   │   ├── analytics
    │   │   ├── classes
    │   │   ├── dashboard
    │   │   ├── quizzes
    │   │   └── layout.tsx
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    │
    ├── components
    ├── hooks
    ├── lib
    ├── public
    ├── styles
    ├── next-env.d.ts
    ├── next.config.mjs
    ├── package.json
    ├── package-lock.json
    ├── postcss.config.mjs
    ├── tsconfig.json
    └── components.json

```

---

## 📸 **Screenshots**

> Add your screenshots inside the `/screenshots` folder.

| Feature             | Image                                    |
| ------------------- | ---------------------------------------- |
| Landing Page        | ![](./screenshots/landing.png)           |
| Teacher Dashboard   | ![](./screenshots/teacher-dashboard.png) |
| Quiz Generator      | ![](./screenshots/quiz-generator.png)    |
| Student Quiz        | ![](./screenshots/student-quiz.png)      |
| Student Performance | ![](./screenshots/performance.png)       |

---

## 🎥 **Demo**

### **🔗 Live Demo (Frontend)**

**https://your-demo-link.com**

---

## 🧠 **Tech Stack**

### **Frontend**

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript

### **Backend**

- Node.js
- Express
- MongoDB / Mongoose

### **AI & NLP**

- LangChain for PDF parsing
- Gemini AI Model for quiz generation

### **Mobile App**

- Expo React Native

---

## 🔍 **How It Works**

1. **Teacher uploads a PDF** (notes, chapters, assignments, textbooks, etc.).
2. PDF content is extracted using **LangChain**.
3. **Gemini AI** generates:
   - Multiple-choice questions
   - True/False
   - Short-answer questions
4. Students take quizzes on the web app or mobile app.
5. System analyzes:
   - Accuracy
   - Topic-wise understanding
   - Response patterns
6. Teachers get an AI-powered dashboard showing:
   - Individual progress
   - Class-wise insights
   - Weak topics
   - Recommendations

---

## 👨‍💻 **Team Members**

| Name                 | Role               |
| -------------------- | ------------------ |
| **Bijay Dhakal**     | Frontend Developer |
| **Bibek Bhusal**     | Backend Developer  |
| **Aabishkar Dhenga** | Product Manager    |
| **Supriya Shrestha** | UI/UX Designer     |

---

## 🏆 **Event**

This project was created for:

### **Provincial Phase Rupandehi — CodeFest 2025**

Organized by **Code for Change Rupandehi**  
📅 **November 21–22, 2025**

---

## 📦 **Getting Started**

### **1. Clone the Repository**

```bash
git clone https://github.com/TeamLCCElite/EasyLearn.git
cd TeamLCCElite

```

### **2. Install Dependencies**

Frontend

```bash
cd frontend
npm install
npm run dev

```

Backend

```bash
cd backend
npm install
npm run dev

```

Expo App

```bash
cd App
npm install
npx expo start

```

### 📄 License

This project was developed for competition and educational purposes during CodeFest 2025.

import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import StudentLogin from "./pages/student/Login"
import StudentChapters from "./pages/student/Chapters"
import StudentQuiz from "./pages/student/Quiz"
import StudentResults from "./pages/student/Results"
import StudentProgress from "./pages/student/ProgressDashboard"
import TeacherLogin from "./pages/teacher/Login"
import TeacherHome from "./pages/teacher/HomeDashboard"
import TeacherUpload from "./pages/teacher/UploadPDF"
import TeacherQuizPreview from "./pages/teacher/QuizPreview"
import TeacherAnalytics from "./pages/teacher/StudentAnalytics"
import AdminLogin from "./pages/admin/Login"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminManage from "./pages/admin/ManageAccounts"
import { ModeToggle } from "./components/mode-toggle"
import Landing from "./pages/landing/Landing"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <header className="p-4 border-b bg-white">
          <div className="container mx-auto flex items-center justify-between">
            <div className="text-lg font-bold text-slate-900">EasyLearn</div>
            <div className="flex items-center gap-4">
              <nav className="space-x-3 hidden sm:block">
                <Link
                  to="/student/login"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Student
                </Link>
                <Link
                  to="/teacher/login"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Teacher
                </Link>
                <Link
                  to="/admin/login"
                  className="text-sm text-slate-600 hover:text-slate-900"
                >
                  Admin
                </Link>
              </nav>
              <ModeToggle />
            </div>
          </div>
        </header>

        <main>
          <Routes>
            {/* Student */}
            <Route path="/student/login" element={<StudentLogin />} />
            <Route path="/student/chapters" element={<StudentChapters />} />
            <Route path="/student/quiz" element={<StudentQuiz />} />
            <Route path="/student/results" element={<StudentResults />} />
            <Route path="/student/progress" element={<StudentProgress />} />

            {/* Teacher */}
            <Route path="/teacher/login" element={<TeacherLogin />} />
            <Route path="/teacher/home" element={<TeacherHome />} />
            <Route path="/teacher/upload" element={<TeacherUpload />} />
            <Route path="/teacher/preview" element={<TeacherQuizPreview />} />
            <Route path="/teacher/analytics" element={<TeacherAnalytics />} />

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/manage" element={<AdminManage />} />

            {/* Default */}
            <Route path="/" element={<Landing />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

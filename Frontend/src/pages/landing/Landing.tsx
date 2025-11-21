import React from 'react'
import { Button } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Avatar from '@/components/ui/avatar'
import ProgressChart from '@/components/shared/ProgressChart'
import { chartData } from '@/lib/mockData'

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Hero */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Stop guessing student performance. Start seeing the truth.</h1>
          <p className="mt-4 text-lg text-slate-700">EasyLearn turns chapter PDFs into AI quizzes, analyzes results, and shows teachers exactly where students are weak — instantly.</p>

          <div className="mt-6 flex gap-3">
            <Button>Get Started Free</Button>
            <Button variant="outline">Book a Demo</Button>
          </div>

          <div className="mt-6 space-y-2 text-sm text-slate-600">
            <div>⭐ Used by schools to improve learning outcomes</div>
            <div>✔ Saves teachers hours every week</div>
            <div>✔ Improves student performance with real-time feedback</div>
          </div>
        </div>

        <div>
          <Card>
            <h3 className="text-lg font-semibold mb-3">Live Preview</h3>
            <ProgressChart data={chartData.progressOverTime} />
            <div className="mt-3">
              <div className="text-sm text-slate-600">Avg. class progress</div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <h4 className="text-lg font-medium">AI Quiz Generation</h4>
            <p className="mt-2 text-sm text-slate-600">Upload chapter PDF → AI creates MCQs, fill-ups, and short answers within seconds.</p>
          </Card>
          <Card>
            <h4 className="text-lg font-medium">Instant Weakness Detection</h4>
            <p className="mt-2 text-sm text-slate-600">Teachers see exactly which student is struggling with which topic — without asking.</p>
          </Card>
          <Card>
            <h4 className="text-lg font-medium">Personalized Student Feedback</h4>
            <p className="mt-2 text-sm text-slate-600">Every student gets improvement suggestions, not just marks.</p>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <h4 className="text-lg font-medium">Teacher Dashboard</h4>
            <p className="mt-2 text-sm text-slate-600">School-level and class-level progress, analytics, and weak-topic trends.</p>
          </Card>
          <Card>
            <h4 className="text-lg font-medium">School Admin Control</h4>
            <p className="mt-2 text-sm text-slate-600">Admin can manage accounts, classrooms, and track overall academic performance.</p>
          </Card>
          <Card>
            <h4 className="text-lg font-medium">Auto-grading</h4>
            <p className="mt-2 text-sm text-slate-600">Automatically grade quizzes and surface students who need help.</p>
          </Card>
        </div>
      </section>

      {/* Why EasyLearn */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">Why EasyLearn</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-700">
          <li>• No guessing — see real learning gaps immediately</li>
          <li>• Teachers save hours of checking and preparation</li>
          <li>• Students get personalized improvement tips</li>
          <li>• Schools get data-driven academic insights</li>
          <li>• Helps shy or silent students get support</li>
        </ul>
      </section>

      {/* Role specific */}
      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-medium">For Teachers</h3>
          <ul className="mt-3 text-sm text-slate-600 space-y-1">
            <li>• Upload PDF lessons</li>
            <li>• Auto-generated homework</li>
            <li>• Auto-grading</li>
            <li>• Student & class reports</li>
          </ul>
        </Card>
        <Card>
          <h3 className="text-lg font-medium">For Students</h3>
          <ul className="mt-3 text-sm text-slate-600 space-y-1">
            <li>• Interactive AI quizzes</li>
            <li>• Instant results</li>
            <li>• Know where to improve next</li>
          </ul>
        </Card>
        <Card>
          <h3 className="text-lg font-medium">For Schools</h3>
          <ul className="mt-3 text-sm text-slate-600 space-y-1">
            <li>• Central monitoring</li>
            <li>• Performance tracking</li>
            <li>• Scalable and automated</li>
          </ul>
        </Card>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-slate-900">How It Works</h2>
        <ol className="mt-4 list-decimal list-inside text-sm text-slate-700 space-y-2">
          <li>Teacher uploads chapter PDF</li>
          <li>AI creates quiz</li>
          <li>Students take quiz</li>
          <li>System auto-grades</li>
          <li>Teacher sees real-time insights</li>
        </ol>
      </section>

      {/* Pricing + CTA */}
      <section className="max-w-4xl mx-auto mt-12 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">Pricing</h2>
        <p className="mt-2 text-sm text-slate-600">Per-student pricing. Affordable for schools with flexible plans.</p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button>Get Started Free</Button>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </section>

      {/* Testimonials + Footer CTA */}
      <section className="max-w-6xl mx-auto mt-12">
        <h3 className="text-xl font-semibold">Trusted By</h3>
        <div className="mt-4 flex gap-4 items-center">
          <Avatar name="St. Mary School" size={48} />
          <Avatar name="Bright Future Academy" size={48} />
          <Avatar name="Greenfield High" size={48} />
        </div>

        <div className="mt-8 bg-white border rounded-md p-6">
          <h4 className="text-lg font-medium">Start improving learning today</h4>
          <p className="mt-2 text-sm text-slate-600">Book a demo or start a free trial and see how EasyLearn surfaces real learning gaps.</p>
          <div className="mt-4">
            <Button>Start Free</Button>
            <Button variant="outline" className="ml-2">Book Demo</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { LoadingPanel } from '../components/Feedback'
import { ProtectedRoute } from '../features/auth/ProtectedRoute'
const HomePage = lazy(() => import('../pages/HomePage'))
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('../pages/ProjectDetailPage'))
const AboutPage = lazy(() => import('../pages/AboutPage'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const LoginPage = lazy(() => import('../features/auth/LoginPage'))
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
export default function App() {
  return (
    <Suspense
      fallback={
        <main className="container page-space">
          <LoadingPanel title="Preparando a página..." />
        </main>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="projetos" element={<ProjectsPage />} />
          <Route path="projetos/:name" element={<ProjectDetailPage />} />
          <Route path="sobre" element={<AboutPage />} />
          <Route path="contato" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

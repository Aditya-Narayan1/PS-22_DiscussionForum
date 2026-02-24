import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ForumProvider } from './context/ForumContext.jsx';
import Navigation from './components/Navigation/Navigation.jsx';
import NotificationContainer from './components/UI/Notifications.jsx';
import { LoadingState } from './components/UI/LoadingSpinner.jsx';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const CategoryPage = lazy(() => import('./pages/CategoryPage.jsx'));
const ThreadPage = lazy(() => import('./pages/ThreadPage.jsx'));
const NewThreadPage = lazy(() => import('./pages/NewThreadPage.jsx'));
const SearchPage = lazy(() => import('./pages/SearchPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function AppLayout() {
  return (
    <div className="min-h-screen flex bg-[var(--slytherin-dark)]">

      {/* Left Archive Rail */}
      <aside className="w-72 border-r border-white/5 bg-[rgba(10,20,15,0.9)] backdrop-blur-xl">
        <Navigation />
      </aside>

      {/* Main Content Chamber */}
      <div className="flex-1 flex flex-col">

        {/* Top Archive Header */}
        <header className="px-10 py-6 border-b border-white/5">
          <h1 className="text-2xl tracking-wide font-semibold text-accent">
            The Archive Network
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1 tracking-widest uppercase">
            Internal Engineering Order
          </p>
        </header>

        {/* Routed Content */}
        <main className="flex-1 px-10 py-10">
          <Suspense fallback={<LoadingState message="Accessing Archives…" />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/thread/:threadId" element={<ThreadPage />} />
              <Route path="/new" element={<NewThreadPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

      </div>

      <NotificationContainer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ForumProvider>
        <AppLayout />
      </ForumProvider>
    </BrowserRouter>
  );
}
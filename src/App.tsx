import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { Layout } from "@/components/layout";
import { ScrollManager } from "@/components/scroll-manager";
import { RouteErrorBoundary } from "@/components/route-error-boundary";

const Home = lazy(() => import("@/pages/home"));
const Roadmap = lazy(() => import("@/pages/roadmap"));
const StageDetail = lazy(() => import("@/pages/stage-detail"));
const InnerScience = lazy(() => import("@/pages/inner-science"));
const Practice = lazy(() => import("@/pages/practice"));
const Glossary = lazy(() => import("@/pages/glossary"));
const Experience = lazy(() => import("@/pages/experience"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoading() {
  return (
    <main className="mx-auto flex min-h-[55vh] w-full max-w-6xl items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-amber-200/20 bg-stone-950/70 px-6 py-5 shadow-2xl shadow-black/30 backdrop-blur">
        <p className="text-xs uppercase tracking-[0.32em] text-amber-300/80">Sadhana OS</p>
        <p className="mt-3 text-sm text-stone-300">Preparing the next chamber…</p>
      </div>
    </main>
  );
}

function Router() {
  return (
    <Layout>
      <ScrollManager />
      <RouteErrorBoundary>
        <Suspense fallback={<PageLoading />}>
          <Switch>
          <Route path="/" component={Home} />
          <Route path="/roadmap" component={Roadmap} />
          <Route path="/stage/:num" component={StageDetail} />
          <Route path="/inner-science" component={InnerScience} />
          <Route path="/practice" component={Practice} />
          <Route path="/glossary" component={Glossary} />
          <Route path="/experience" component={Experience} />
          <Route component={NotFound} />
          </Switch>
        </Suspense>
      </RouteErrorBoundary>
    </Layout>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

import { Component, ErrorInfo, ReactNode } from "react";

interface RouteErrorBoundaryState {
  hasError: boolean;
}

export class RouteErrorBoundary extends Component<{ children: ReactNode }, RouteErrorBoundaryState> {
  state: RouteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): RouteErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Sadhana OS route failed to render", error, info);
  }

  componentDidUpdate(prevProps: { children: ReactNode }) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="mx-auto flex min-h-[55vh] w-full max-w-4xl items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="temple-glass safe-card rounded-[2rem] border border-primary/20 p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/70">Sadhana OS</p>
          <h1 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">This chamber did not open cleanly.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Refresh the page once. If the issue remains, run <code className="rounded bg-white/5 px-1.5 py-0.5 text-primary">npm run check</code> locally to verify the build and route chunks.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-background transition-colors hover:bg-primary/90 safe-tap-target"
          >
            Refresh chamber
          </button>
        </div>
      </main>
    );
  }
}

import { Link } from "react-router-dom"

import { Button } from "../components/ui/Button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="text-xl font-bold">MyApp</div>
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[980px] gap-6 text-center">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Welcome to MyApp
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Join our community to access exclusive content and connect with others.
            </p>
            <div className="mx-auto flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/signup">
                <Button size="lg" className="gap-2">
                  Get Started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
										<title>Arrow Right</title>
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Already have an account?
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="container py-12 md:py-24 lg:py-32 bg-muted">
          <div className="mx-auto grid max-w-[980px] gap-6 text-center">
            <h2 className="text-2xl font-bold leading-tight tracking-tighter md:text-4xl">Why Join Us?</h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Create your profile, connect with others, and access exclusive content.
            </p>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">1</div>
                <h3 className="text-xl font-bold">Create Your Profile</h3>
                <p className="text-muted-foreground">Personalize your experience with a custom profile.</p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">2</div>
                <h3 className="text-xl font-bold">Connect with Others</h3>
                <p className="text-muted-foreground">Build your network and make meaningful connections.</p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border bg-background p-6">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">3</div>
                <h3 className="text-xl font-bold">Access Content</h3>
                <p className="text-muted-foreground">Unlock exclusive content available only to members.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

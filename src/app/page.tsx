

import LoginButton from "@/components/auth/LoginButton/LoginButton.component"

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      <section className="hidden md:flex md:w-1/2 p-8 flex-col items-center justify-center text-center">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4">
          Welcome Back!
        </h1>
        <p className="text-base lg:text-lg text-muted-foreground max-w-md">
          Please login to your account to continue.
        </p>
      </section>
      <section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-8 bg-slate-100">
        <LoginButton />
      </section>

    </div>

  )
}

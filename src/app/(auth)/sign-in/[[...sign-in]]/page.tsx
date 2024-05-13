import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <SignIn
      path="/sign-in"
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
        },
        elements: {
          formButtonPrimary:
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-primary hover:bg-secondary/60",
          card: "bg-background border-border",
          socialButtons:
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/60",
          formFieldLabel: "text-primary",
          headerTitle: "text-primary leading-tight",
          headerSubtitle: "text-muted-foreground",
          dividerText: "text-muted-foreground",
          dividerLine: "bg-muted-foreground",
          footerActionText: "text-muted-foreground",
          footerActionLink: "text-primary font-bold",
          formFieldInput: "bg-background border-border text-accent-foreground",
          socialButtonsBlockButtonText: "text-secondary-foreground",
        },
      }}
    />
  )
}

"use client"
import * as Clerk from "@clerk/elements/common"
import * as SignUp from "@clerk/elements/sign-up"
import Link from "next/link"
import React from "react"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { ROUTES } from "~/lib/const"
import { cn } from "~/lib/utils"

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md sm:justify-center">
      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignUp.Step name="start">
                <Card className="border-2 border-secondary bg-[#FFFFFF] shadow-none">
                  <CardHeader>
                    <CardTitle className="mx-auto text-lg text-primary">
                      Zarejestruj się
                    </CardTitle>
                    <CardDescription className="mx-auto text-sm font-thin ">
                      Witaj! Wypełnij pola, aby rozpocząć.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <div className="grid grid-cols-2 gap-x-4">
                      <Clerk.Connection name="facebook" asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isGlobalLoading}
                          className="bg-[#fff] shadow-none"
                        >
                          <Clerk.Loading scope="provider:facebook">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Icons.facebook className="mr-2 size-5" />
                                  Facebook
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                      <Clerk.Connection name="google" asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          type="button"
                          disabled={isGlobalLoading}
                          className="bg-[#fff] shadow-none"
                        >
                          <Clerk.Loading scope="provider:google">
                            {(isLoading) =>
                              isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                <>
                                  <Icons.google className="mr-2 size-5" />
                                  Google
                                </>
                              )
                            }
                          </Clerk.Loading>
                        </Button>
                      </Clerk.Connection>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-x-3 text-sm before:h-px before:flex-1 before:bg-secondary after:h-px after:flex-1 after:bg-secondary">
                      lub
                    </p>
                    <Clerk.Field name="emailAddress" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label className="text-sm ">E-mail</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input className="bg-slate-100 rounded-xl border-[0.1px] border-secondary" />
                      </Clerk.Input>
                      <Clerk.FieldError className="text-destructive block text-sm" />
                    </Clerk.Field>
                    <Clerk.Field name="password" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label className="text-sm ">Hasło</Label>
                      </Clerk.Label>
                      <Clerk.Input type="password" required asChild>
                        <Input className="bg-slate-100 rounded-xl border-[0.1px] border-secondary" />
                      </Clerk.Input>
                      <Clerk.FieldError className="text-destructive block text-sm" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
                        <Button
                          className="w-full shadow-none"
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Kontynnuj"
                              )
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                      <Button
                        variant="link"
                        size="sm"
                        className="shadow-none"
                        asChild
                      >
                        <Link prefetch={true} href={ROUTES.ROOT.SIGN_IN}>
                          Masz już konto? Zaloguj się
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name="continue">
                <Card className="border-secondary bg-[#FFFFFF] shadow-none">
                  <CardHeader>
                    <CardTitle className="mx-auto text-lg text-primary">
                      Kontynnuj rejestrację
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Clerk.Field name="username" className="space-y-2">
                      <Clerk.Label>
                        <Label>Imię</Label>
                      </Clerk.Label>
                      <Clerk.Input type="text" required asChild>
                        <Input />
                      </Clerk.Input>
                      <Clerk.FieldError className="text-destructive block text-sm" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignUp.Action submit asChild>
                        <Button
                          disabled={isGlobalLoading}
                          className="shadow-none"
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Kontynnuj"
                              )
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignUp.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignUp.Step>

              <SignUp.Step name="verifications">
                <SignUp.Strategy name="email_code">
                  <Card className="border-secondary bg-[#FFFFFF] shadow-none">
                    <CardHeader>
                      <CardTitle className="mx-auto text-lg text-primary">
                        Zweryfikuj swój adres E-mail
                      </CardTitle>
                      <CardDescription className="mx-auto text-sm font-thin ">
                        Użyj kod weryfikacyjny wysłany na adres E-mail{" "}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <div className="grid items-center justify-center gap-y-2">
                        <Clerk.Field name="code" className="space-y-2">
                          <Clerk.Label className="sr-only">E-mail</Clerk.Label>
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              className="flex justify-center has-[:disabled]:opacity-50"
                              autoSubmit
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className={cn(
                                      "border-input relative flex size-10 items-center justify-center border-y border-r border-[#D5DADD] text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                      {
                                        "ring-ring ring-offset-background z-10 ring-2":
                                          status === "cursor" ||
                                          status === "selected",
                                      }
                                    )}
                                  >
                                    {value}
                                    {status === "cursor" && (
                                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                        <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
                                      </div>
                                    )}
                                  </div>
                                )
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="text-destructive block text-center text-sm" />
                        </Clerk.Field>
                        <SignUp.Action
                          asChild
                          resend
                          className="text-muted-foreground"
                          fallback={({ resendableAfter }) => (
                            <Button
                              variant="link"
                              size="sm"
                              disabled
                              className="shadow-none"
                            >
                              Nie otrzymałeś kodu? Wyślij ponownie (
                              <span className="tabular-nums">
                                {resendableAfter}
                              </span>
                              )
                            </Button>
                          )}
                        >
                          <Button
                            type="button"
                            variant="link"
                            size="sm"
                            className="shadow-none"
                          >
                            Nie otrzymałeś kodu? Wyślij ponownie
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignUp.Action submit asChild>
                          <Button
                            className="w-full shadow-none"
                            disabled={isGlobalLoading}
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  "Kontynnuj"
                                )
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Strategy>
              </SignUp.Step>
            </>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  )
}

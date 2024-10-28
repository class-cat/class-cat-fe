"use client"
import * as Clerk from "@clerk/elements/common"
import * as SignIn from "@clerk/elements/sign-in"
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

export default function SignInPage() {
  return (
    <div className="w-full max-w-md sm:justify-center">
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading: boolean) => (
            <>
              <SignIn.Step name="start">
                <Card className="border-secondary bg-[#FFFFFF] shadow-none">
                  <CardHeader>
                    <CardTitle className="mx-auto text-lg text-primary">
                      Zaloguj się do ClassCat
                    </CardTitle>
                    <CardDescription className="mx-auto text-sm font-thin ">
                      Witaj ponownie! Zaloguj się, aby kontynuować.
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
                            {(isLoading: boolean) =>
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
                            {(isLoading: boolean) =>
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
                    <p className="text-muted-foreground flex items-center gap-x-3 text-sm before:h-px before:flex-1 before:bg-[#D5DADD] after:h-px after:flex-1 after:bg-[#D5DADD]">
                      lub
                    </p>
                    <Clerk.Field name="identifier" className="space-y-2">
                      <Clerk.Label asChild>
                        <Label className="text-sm ">E-mail</Label>
                      </Clerk.Label>
                      <Clerk.Input type="email" required asChild>
                        <Input className="bg-slate-100 rounded-xl border-[0.1px] border-secondary" />
                      </Clerk.Input>
                      <Clerk.FieldError className="text-destructive block text-sm" />
                    </Clerk.Field>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action submit asChild>
                        <Button
                          className="w-full shadow-none"
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Kontynuuj"
                              )
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>

                      <Button
                        variant="link"
                        size="sm"
                        asChild
                        className="rounded-xl bg-white shadow-none"
                      >
                        <Link href={ROUTES.ROOT.SIGN_UP}>
                          Nie masz konta? Zarejestruj się
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="choose-strategy">
                <Card className="border-secondary bg-[#FFFFFF] shadow-none">
                  <CardHeader>
                    <CardTitle className="mx-auto text-lg text-primary">
                      Użyj innej metody logowania
                    </CardTitle>
                    <CardDescription className="mx-auto text-sm font-thin ">
                      Wystąpił błąd? Możesz użyć innej metody w celu
                      weryfikacji.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <SignIn.SupportedStrategy name="email_code" asChild>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isGlobalLoading}
                        className="shadow-none"
                      >
                        Kod E-mail
                      </Button>
                    </SignIn.SupportedStrategy>
                    <SignIn.SupportedStrategy name="password" asChild>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isGlobalLoading}
                        className="shadow-none"
                      >
                        Hasło
                      </Button>
                    </SignIn.SupportedStrategy>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action navigate="previous" asChild>
                        <Button
                          className="w-full shadow-none"
                          disabled={isGlobalLoading}
                        >
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Wróć"
                              )
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="verifications">
                <SignIn.Strategy name="password">
                  <Card className="border-secondary bg-[#FFFFFF] shadow-none">
                    <CardHeader>
                      <CardTitle className="mx-auto text-lg text-primary">
                        Sprawdź E-mail
                      </CardTitle>
                      <CardDescription className="mx-auto text-sm font-thin ">
                        Wprowadź kod weryfikacyjny wysłany na twój adres e-mail.
                      </CardDescription>
                      <p className="text-muted-foreground text-sm">
                        Witaj ponownie <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label className="text-sm ">Hasło</Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" asChild>
                          <Input className="text-sm " />
                        </Clerk.Input>
                        <Clerk.FieldError className="text-destructive block text-sm" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="shadow-none"
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                )
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button
                            type="button"
                            size="sm"
                            variant="link"
                            className="shadow-none"
                          >
                            Wybierz inną metodę
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>

                <SignIn.Strategy name="email_code">
                  <Card className="border-secondary bg-[#FFFFFF] shadow-none">
                    <CardHeader className="mx-auto text-sm font-thin ">
                      <CardTitle className="mx-auto text-lg text-primary">
                        Sprawdź swój E-mail
                      </CardTitle>
                      <CardDescription>
                        Wprowadź kod weryfikacyjny wysłany na twój adres e-mail.
                      </CardDescription>
                      <p className="text-muted-foreground text-sm">
                        Witaj ponownie <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <Clerk.Field name="code">
                        <Clerk.Label className="sr-only">
                          Kod weryfikacyjny
                        </Clerk.Label>
                        <div className="grid items-center justify-center gap-y-2">
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              autoSubmit
                              className="flex justify-center has-[:disabled]:opacity-50"
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className="border-input data-[status=selected]:ring-ring data-[status=cursor]:ring-ring relative flex size-9 items-center justify-center border-y border-r border-[#D5DADD] text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=cursor]:ring-1 data-[status=selected]:ring-1"
                                  >
                                    {value}
                                  </div>
                                )
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="text-destructive block text-center text-sm" />
                          <SignIn.Action
                            asChild
                            resend
                            className="text-muted-foreground"
                            fallback={({ resendableAfter }) => (
                              <Button
                                variant="link"
                                size="sm"
                                className="shadow-none"
                                disabled
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
                              variant="link"
                              size="sm"
                              className="shadow-none"
                            >
                              Nie otrzymałeś kodu? Wyślij ponownie
                            </Button>
                          </SignIn.Action>
                        </div>
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
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
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button
                            size="sm"
                            variant="link"
                            className="shadow-none"
                          >
                            Użyj innej metody
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  )
}

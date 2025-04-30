"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar } from "~/components/ui/calendar"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Input } from "~/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "~/lib/utils"
import { useUser } from "@clerk/nextjs"
import { Skeleton } from "~/components/ui/skeleton"
import { FormSchema, type FormSchemaType } from "../_schema/form-schema.zod"

export const ProfileForm = () => {
  const { user, isLoaded } = useUser()
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast("Form submitted")
  }

  return (
    <>
      {!isLoaded ? (
        <Skeleton className="card min-h-[500px] rounded-3xl lg:w-1/3" />
      ) : (
        <section className="cardSmall lg:w-1/3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex min-w-[240px] flex-col gap-4">
                <Avatar className="mx-auto size-48">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <FormField
                  control={form.control}
                  name="firstName"
                  defaultValue={user?.firstName || ""}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Imie</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Imie"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  defaultValue={user?.lastName || ""}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nazwisko</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nazwisko"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailAddress"
                  defaultValue={user?.primaryEmailAddress?.emailAddress || ""}
                  disabled={
                    user?.primaryEmailAddress?.emailAddress ? true : false
                  }
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data urodzenia</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full border-0 pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Wybierz datę</span>
                              )}
                              <CalendarIcon className="ml-auto size-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto rounded-md bg-white p-0 shadow-xl"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            captionLayout="dropdown-buttons"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            fromYear={1960}
                            toYear={2030}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Adres zamieszkania</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Adres zamieszkania"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormLabel>Płeć</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-xl bg-white shadow-md">
                            <SelectValue placeholder="Wybierz płeć" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="female">Kobieta</SelectItem>
                          <SelectItem value="male">Mężczyzna</SelectItem>
                          <SelectItem value="unknown">Nie wiem</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="h-8" />
              <Button type="submit" className="w-full">
                Zapisz
              </Button>
            </form>
          </Form>
        </section>
      )}
    </>
  )
}

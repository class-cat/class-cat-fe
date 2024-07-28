"use client"

import { Container } from "~/components/ui/container"
import { Input } from "~/components/ui/input"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover"

import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "~/components/ui/calendar"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Checkbox } from "~/components/ui/checkbox"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { useUser } from "@clerk/nextjs"
import { Skeleton } from "~/components/ui/skeleton"
import { LessonCard } from "./_components/lessonCard"

const tabsTriggers = [
  {
    id: 1,
    title: "Zajęcia",
    value: "lessons",
  },
  {
    id: 2,
    title: "Opinie",
    value: "reviews",
  },
  // {
  //   id: 3,
  //   title: "Szkoła",
  //   value: "school",
  // },
  {
    id: 4,
    title: "Ustawienia",
    value: "settings",
  },
]

const lessons = [
  {
    id: 1,
    title: "Piłka nożna dla dzieci",
    providerName: "Sp. nr 8 im. Przyjaciół Ziemi w Gdańsku",
    phoneNumber: "+48 111 222 333",
    address: "Gdańsk, Dragana 2",
    day: "monday",
    hour: "12:00",
    avatar: "/stock.jpeg",
  },
  {
    id: 2,
    title: "Siatkówka dla klas 1-3",
    providerName: "Sp. nr 8 im. Przyjaciół Ziemi w Gdańsku",
    phoneNumber: "+48 111 222 333",
    address: "Gdańsk, Dragana 2",
    day: "tuesday",
    hour: "12:00",
    avatar: "/stock.jpeg",
  },
] as const

const FormNotificationsSchema = z.object({
  email: z.boolean().optional(),
  sms: z.boolean().optional(),
})
type FormNotificationsSchemaType = z.infer<typeof FormNotificationsSchema>

const ProfileTabsContent = () => {
  const form = useForm<FormNotificationsSchemaType>({
    resolver: zodResolver(FormNotificationsSchema),
  })

  function onSubmit(data: z.infer<typeof FormNotificationsSchema>) {
    console.log(data)
    toast("Form submitted")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TabsContent value="lessons" className="card">
          <div className="flex flex-col gap-4">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="card">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">test</div>
        </TabsContent>
        <TabsContent value="school" className="card">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">test</div>
        </TabsContent>
        <TabsContent value="settings" className="card">
          <div className="flex flex-col gap-8">
            <div className="flex min-w-[240px] flex-col justify-between">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-bold">Powiadomienia</h2>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>E-mail</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>SMS</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit">Zapisz</Button>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Polityka Prywatności</h2>
              <Button className="w-full bg-white" variant={"link"}>
                Umowy o poufności
              </Button>
              <Button className="w-full bg-white" variant={"link"}>
                Prawa wnioski/RODO
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Konto</h2>
              <Button className="bg-outline" variant={"combobox"} disabled>
                Usuń konto
              </Button>
            </div>
          </div>
        </TabsContent>
      </form>
    </Form>
  )
}

const FormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  dob: z.date().optional(),
  address: z.string().min(2).max(50).optional(),
  sex: z.enum(["male", "female", "unknown"]).optional(),
  emailAddress: z.string().email("This is not a valid email."),
})
type FormSchemaType = z.infer<typeof FormSchema>

export default function ProfilePage() {
  const { user, isLoaded } = useUser()

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    toast("Form submitted")
  }

  return (
    <Container className="min-h-screen">
      <div className="flex flex-col gap-8 pt-6 lg:flex-row lg:justify-center">
        <section className="gap-0 sm:gap-4 lg:w-2/3">
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="flex justify-between">
              {tabsTriggers.map((tab, index) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.value}
                  className={`${
                    index === 1
                      ? "border-x-2"
                      : index !== tabsTriggers.length - 1
                        ? "border-r-2"
                        : "hidden border-0 sm:block"
                  }`}
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="h-6" />
            <ProfileTabsContent />
          </Tabs>
        </section>
        {!isLoaded ? (
          <Skeleton className="card min-h-[500px] rounded-3xl lg:w-1/3" />
        ) : (
          <section className="cardSmall lg:w-1/3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex min-w-[240px] flex-col gap-4">
                  <Avatar className="mx-auto h-48 w-48">
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
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
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
      </div>
      <div className="h-16" />
    </Container>
  )
}

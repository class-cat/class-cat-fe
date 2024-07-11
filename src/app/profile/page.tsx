"use client"

import { Container } from "~/components/ui/container"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { toast } from "~/components/ui/use-toast"
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
type TabsTriggers = "lessons" | "reviews" | "school" | "settings"
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
  {
    id: 3,
    title: "Szkoła",
    value: "school",
  },
  {
    id: 4,
    title: "Ustawienia",
    value: "settings",
  },
]

const FormSchema = z.object({
  dob: z.date(),
})
type FormSchemaType = z.infer<typeof FormSchema>

const ProfileTabsContent = () => {
  const form = useForm<FormSchemaType>({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="bg-slate-950 mt-2 w-[340px] rounded-md p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TabsContent value="lessons" className="card">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">test</div>
        </TabsContent>
        <TabsContent value="reviews" className="card">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">test</div>
        </TabsContent>
        <TabsContent value="school" className="card">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">test</div>
        </TabsContent>
        <TabsContent value="settings" className="card">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Dodatkowe Informacje</h2>
              {/* <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="bday">Data urodzenia</Label>
                <Input type="date" id="bday" placeholder="Data urodzenia" />
              </div> */}
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
                              "w-[240px] pl-3 text-left font-normal",
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
            </div>
            <div>
              <h2 className="text-xl font-bold">Powiadomienia</h2>
            </div>
          </div>
        </TabsContent>
      </form>
    </Form>
  )
}
export default function ProfilePage() {
  return (
    <Container className="min-h-screen">
      <div className="flex flex-col gap-8 pt-6 md:flex-row md:justify-center">
        <section className="gap-0 sm:gap-4 md:w-2/3">
          <Tabs defaultValue="settings" className="w-full">
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
        <section className="card md:w-1/3"></section>
      </div>
      <div className="h-16" />
    </Container>
  )
}

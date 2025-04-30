import { zodResolver } from "@hookform/resolvers/zod"

import { TabsContent } from "~/components/ui/tabs"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form"
import { LessonCard } from "./lesson-card"
import { UserReviewContent } from "./review-content"
import { Checkbox } from "~/components/ui/checkbox"
import { lessons } from "./constants"
import { Button } from "~/components/ui/button"
import {
  FormNotificationsSchema,
  type FormNotificationsSchemaType,
} from "./schema/formNotificationsSchema.zod"

export const ProfileTabsContent = () => {
  const form = useForm<FormNotificationsSchemaType>({
    resolver: zodResolver(FormNotificationsSchema),
  })

  function onSubmit(data: z.infer<typeof FormNotificationsSchema>) {
    console.log(data)
    toast("Form submitted")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-h-dvh space-y-8 overflow-y-auto"
      >
        <TabsContent value="lessons">
          <div className="flex flex-col gap-4">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <UserReviewContent />
        </TabsContent>
        <TabsContent value="settings">
          <div className="flex flex-col gap-8">
            <div className="flex min-w-[240px] flex-col justify-between">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-[500]">Powiadomienia</h2>
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
              <h2 className="text-xl font-[500]">Polityka Prywatności</h2>
              <Button className="w-full " variant={"outline"}>
                Umowy o poufności
              </Button>
              <Button className="w-full " variant={"outline"}>
                Prawa wnioski/RODO
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-[500]">Konto</h2>
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

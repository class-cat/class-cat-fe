export const tabsTriggers = [
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
    id: 4,
    title: "Ustawienia",
    value: "settings",
  },
]

export const lessons = [
  {
    id: 1,
    title: "Piłka nożna dla dzieci",
    providerName: "Sp. nr 8 im. Przyjaciół Ziemi w Gdańsku",
    phoneNumber: "+48 111 222 333",
    address: "Gdańsk, Dragana 2",
    day: "monday",
    hour: "12:00",
    avatar: "/tennis.svg",
  },
  {
    id: 2,
    title: "Siatkówka dla klas 1-3",
    providerName: "Sp. nr 8 im. Przyjaciół Ziemi w Gdańsku",
    phoneNumber: "+48 111 222 333",
    address: "Gdańsk, Dragana 2",
    day: "tuesday",
    hour: "12:00",
    avatar: "/handball.svg",
  },
] as const

export const dayTranslations = {
  monday: "poniedziałek",
  tuesday: "wtorek",
  wednesday: "środa",
  thursday: "czwartek",
  friday: "piątek",
  saturday: "sobota",
  sunday: "niedziela",
}

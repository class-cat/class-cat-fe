import { contactArray } from "./constants"

export const FooterContact = () => {
  return (
    <div className="space-y-6">
      <h3 className="relative inline-block text-lg font-[500] text-white">
        <span className="after:bg-primary after:mt-1 after:block after:h-1 after:w-full after:rounded-full after:content-['']">
          Kontakt
        </span>
      </h3>
      <div className="flex flex-col space-y-4">
        {contactArray.map((contact, index) => (
          <div key={index} className="group flex items-center gap-4">
            <div className="group-hover:bg-primary rounded-lg bg-gray-800 p-2 transition-all duration-300 group-hover:scale-110">
              <contact.icon size={16} />
            </div>
            <span className="text-gray-300 transition-colors duration-300 group-hover:text-white">
              {contact.content}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

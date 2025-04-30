import { contactArray } from "./footer-constants"

export const FooterContact = () => {
  return (
    <div className="space-y-6">
      <h3 className="relative inline-block text-lg font-[500] text-white">
        <span className="after:mt-1 after:block after:h-1 after:w-full after:rounded-full after:bg-primary after:content-['']">
          Kontakt
        </span>
      </h3>
      <div className="flex flex-col space-y-4">
        {contactArray.map((contact, index) => (
          <div key={index} className="group flex items-center gap-4">
            <div className="bg-gray-800 rounded-lg p-2 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
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

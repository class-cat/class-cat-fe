import { generatePercentPaws } from "./utils"
import { PawItem } from "./paw-item"

export const PawsBackground = () => {
  const configs = [
    { className: "block sm:hidden", cols: 5, rows: 4 }, // xs
    { className: "hidden sm:block lg:hidden", cols: 8, rows: 6 }, // sm-md
    { className: "hidden lg:block", cols: 12, rows: 7 }, // lg+
  ] as const

  return (
    <>
      {configs.map((cfg, idx) => {
        const paws = generatePercentPaws(cfg.cols, cfg.rows)
        return (
          <div
            key={idx}
            className={
              "z-1 pointer-events-none absolute inset-0 overflow-hidden " + cfg.className
            }
          >
            {paws.map((paw) => (
              <PawItem key={paw.id} {...paw} unit="%" />
            ))}
          </div>
        )
      })}
    </>
  )
} 
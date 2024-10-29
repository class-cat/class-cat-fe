import React, { useEffect, useState, useRef, useLayoutEffect, useMemo } from "react";
import { Icons } from "~/components/icons";

const PawsBackground = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  const spacing = 96;

  const paws = useMemo(() => {
    const columns = Math.ceil(dimensions.width / spacing);
    const rows = Math.ceil(dimensions.height / spacing);
    const newPaws = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * spacing + 10;
        const y = row * spacing + 10;

        const centerX = dimensions.width / 2;
        const bottomY = dimensions.height;
        const dx = x - centerX;
        const dy = y - bottomY;
        const distance = Math.sqrt(Math.pow(dx * 1.5, 2) + Math.pow(dy, 2));

        const maxDistance = Math.sqrt(
          Math.pow(Math.max(dimensions.width / 2, dimensions.width - centerX) * 1.5, 2) +
          Math.pow(dimensions.height, 2)
        );

        const normalizedDistance = distance / maxDistance;
        const opacity = Math.max(0.2, 1.6 * Math.pow(1 - normalizedDistance, 2));

        newPaws.push({ id: `${row}-${col}`, x, y, opacity });
      }
    }

    return newPaws;
  }, [dimensions.width, dimensions.height]);

  return (
    <div
      ref={containerRef as any}
      className="z-1 pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
    >
      {paws.map((paw) => (
        <Icons.paw
          key={paw.id}
          className="absolute size-16"
          color="#ecdec8"
          fill="#ecdec8"
          style={{
            left: `${paw.x}px`,
            top: `${paw.y}px`,
            opacity: paw.opacity,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      ))}
    </div>
  );
};

export default PawsBackground;

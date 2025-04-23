"use client";

import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadLinksPreset } from "@tsparticles/preset-links";
import type { Container, Engine } from "@tsparticles/engine";
import { MoveDirection, OutMode } from "@tsparticles/engine";

export function HeroBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadLinksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      // Optional: console.log when particles are loaded
      // await console.log("Particles container loaded", container);
    },
    []
  );

  const options = {
    preset: "links",
    background: {
      color: {
        value: "transparent", // Make background transparent
      },
    },
    particles: {
      color: {
        value: "#8B5CF6", // Use primary color (adjust if needed)
      },
      links: {
        color: "#A78BFA", // Lighter purple for links (adjust if needed)
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: MoveDirection.none, // Fixed: Use enum instead of string
        enable: true,
        outModes: {
          default: OutMode.bounce, // Fixed: Use enum instead of string
        },
        random: false,
        speed: 1, // Slow down the particle movement
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50, // Reduce particle count for subtlety
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 }, // Smaller particles
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab", // Grab effect on hover
        },
        onClick: {
          enable: true,
          mode: "push", // Push particles on click
        },
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1,
          },
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 -z-10"
      />
    );
  }

  return null;
}

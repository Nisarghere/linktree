"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

import { createHandle } from "./actions";

const PARTICLE_COUNT = 100;

const Handle = ({ userid }) => {
  const [handle, setHandle] = useState("");
  const [isDisintegrating, setIsDisintegrating] = useState(false);

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,

    // Random starting position across the component
    left: Math.random() * 100,
    top: Math.random() * 100,

    // Particles mostly travel upward and outward
    x: (Math.random() - 0.5) * 500,
    y: -(Math.random() * 350 + 50),

    // Slight rotation for a more natural effect
    rotate: Math.random() * 720 - 360,

    // Different particle sizes
    size: Math.random() * 4 + 1,

    // Random animation duration
    duration: Math.random() * 1.5 + 1,
  }));

  const handleClick = async () => {
    if (!handle.trim() || isDisintegrating) return;

    try {
      // Only start the effect if the handle
      // was successfully created.
      await createHandle(handle, userid);

      setIsDisintegrating(true);
    } catch (error) {
      console.error("Failed to claim handle:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={
        isDisintegrating
          ? {
              opacity: 0,
              scale: 0.97,
              transition: {
                duration: 2.2,
                delay: 0.4,
                ease: "easeOut",
              },
            }
          : {
              opacity: 1,
              scale: 1,
            }
      }
      className="relative overflow-visible"
    >
      {/* Main Content */}
      <motion.div
        animate={
          isDisintegrating
            ? {
                opacity: 0,
                filter: "blur(8px)",
                transition: {
                  duration: 1.5,
                  ease: "easeOut",
                },
              }
            : {}
        }
        className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
      >
        {/* Left Side */}{" "}
        <div>
          {" "}
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#19352B]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#19352B]">
            {" "}
            <span className="h-1.5 w-1.5 rounded-full bg-[#78927F]" />
            Your profile{" "}
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-[#19352B]">
            Claim your handle
          </h2>
          <p className="mt-1.5 text-sm leading-6 text-[#647168]">
            Choose the username people will use to find your profile.
          </p>
        </div>
        {/* Handle Input */}
        <div className="flex w-full max-w-xl flex-col gap-2 sm:flex-row">
          <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-[#C9D3CA] bg-[#FDFCFA] shadow-sm focus-within:border-[#19352B] focus-within:ring-4 focus-within:ring-[#19352B]/5">
            <span className="whitespace-nowrap pl-4 text-sm font-medium text-[#89958C]">
              linktree.com/
            </span>

            <input
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              type="text"
              placeholder="yourhandle"
              disabled={isDisintegrating}
              className="min-w-0 flex-1 bg-transparent px-2 py-3.5 text-sm font-medium text-[#19352B] outline-none placeholder:text-[#A7B0A9]"
            />
          </div>

          <button
            onClick={handleClick}
            disabled={isDisintegrating}
            className="rounded-xl bg-[#19352B] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#27483A] active:translate-y-0 disabled:pointer-events-none"
          >
            Claim handle
          </button>
        </div>
      </motion.div>

      {/* ✨ Disintegration Particles */}
      {isDisintegrating && (
        <div className="pointer-events-none absolute inset-0 overflow-visible">
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1.5, 1, 0],
                x: particle.x,
                y: particle.y,
                rotate: particle.rotate,
              }}
              transition={{
                duration: particle.duration,
                delay: Math.random() * 0.5,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                width: particle.size,
                height: particle.size,
                borderRadius: "9999px",

                // Soft glowing particle
                background: "#DCE9DF",

                boxShadow:
                  "0 0 4px #FFFFFF, 0 0 10px #A9C5B0, 0 0 18px #78927F",
              }}
            />
          ))}
        </div>
      )}

      {/* ✨ Central Glow */}
      {isDisintegrating && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.4, 2],
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DCE9DF] blur-3xl"
        />
      )}
    </motion.div>
  );
};

export default Handle;

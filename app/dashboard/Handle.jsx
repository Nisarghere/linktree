 "use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

import { createHandle } from "./actions";

const PARTICLE_COUNT = 140;

const Handle = ({ userid }) => {
  const router = useRouter();

  const [handle, setHandle] = useState("");
  const [isDisintegrating, setIsDisintegrating] = useState(false);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const isSparkle = Math.random() > 0.82;
      const isStreak = Math.random() > 0.88;

      return {
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        x: (Math.random() - 0.5) * 600,
        y: -(Math.random() * 420 + 60),
        rotate: Math.random() * 900 - 450,
        size: isSparkle ? Math.random() * 4 + 3 : Math.random() * 2.5 + 1,
        isSparkle,
        isStreak,
        duration: Math.random() * 1.8 + 2.4,
        delay: Math.random() * 0.8,
      };
    });
  }, []);

  const handleClick = async () => {
    if (!handle.trim() || isDisintegrating) return;

    try {
      await createHandle(handle, userid);

      setIsDisintegrating(true);

      setTimeout(() => {
        router.refresh();
      }, 3900);
    } catch (error) {
      console.error("Failed to claim handle:", error);
    }
  };

  return (
    <section className="mb-6 mt-6 overflow-hidden rounded-3xl border border-[#D9DED6] bg-[#E9EFE8] p-6 shadow-sm sm:p-7">
      <motion.div
        initial={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        animate={
          isDisintegrating
            ? {
                opacity: 0,
                scale: 0.985,
                filter: "blur(10px)",
              }
            : {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }
        }
        transition={{
          duration: 2.8,
          delay: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        <motion.div
          animate={
            isDisintegrating
              ? {
                  opacity: 0,
                  filter: "blur(7px)",
                  y: -8,
                }
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                }
          }
          transition={{
            duration: 1.8,
            delay: 0.35,
            ease: "easeOut",
          }}
          className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#19352B]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#19352B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#78927F]" />
              Your profile
            </div>

            <h2 className="text-xl font-semibold tracking-tight text-[#19352B]">
              Claim your handle
            </h2>

            <p className="mt-1.5 text-sm leading-6 text-[#647168]">
              Choose the username people will use to find your profile.
            </p>
          </div>

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

        {/* SHIMMER WAVE */}

        {isDisintegrating && (
          <motion.div
            initial={{
              left: "-30%",
              opacity: 0,
            }}
            animate={{
              left: "130%",
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.1,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute top-0 z-30 h-full w-24 -skew-x-12 bg-white/70 blur-xl"
          />
        )}

        {/* CARD FLASH */}

        {isDisintegrating && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.4,
              delay: 0.45,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-0 z-20 rounded-3xl bg-[#F4FFF7] blur-2xl"
          />
        )}

        {/* PARTICLE FIELD */}

        {isDisintegrating && (
          <div className="pointer-events-none absolute inset-0 z-40 overflow-visible">
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
                  opacity: particle.isSparkle
                    ? [0, 1, 1, 0.7, 0]
                    : [0, 1, 0.9, 0],

                  scale: particle.isSparkle
                    ? [0, 1.8, 1.3, 1, 0]
                    : [0, 1.3, 1, 0],

                  x: particle.x,
                  y: particle.y,

                  rotate: particle.rotate,
                }}
                transition={{
                  duration: particle.duration,
                  delay: 0.45 + particle.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: "absolute",

                  left: `${particle.left}%`,
                  top: `${particle.top}%`,

                  width: particle.isStreak
                    ? particle.size * 4
                    : particle.size,

                  height: particle.isStreak
                    ? particle.size * 0.7
                    : particle.size,

                  borderRadius: "9999px",

                  background:
                    "radial-gradient(circle, #FFFFFF 0%, #F1FFF5 35%, #CDE5D3 75%, transparent 100%)",

                  boxShadow: particle.isSparkle
                    ? "0 0 5px #FFFFFF, 0 0 12px #FFFFFF, 0 0 22px #B7D8C0, 0 0 40px #78927F"
                    : "0 0 3px #FFFFFF, 0 0 8px #FFFFFF, 0 0 16px #A9C5B0",

                  transformOrigin: "center",
                }}
              />
            ))}
          </div>
        )}

        {/* COLLAPSE WAVE */}

        {isDisintegrating && (
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.2,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.2, 1, 2.8],
              }}
              transition={{
                duration: 1.5,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#F1FFF5]/80 shadow-[0_0_30px_#CDE5D3] blur-[1px]"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 1.4,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                scale: [1.4, 0.4, 0],
              }}
              transition={{
                duration: 1.4,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F1FFF5]/40 blur-3xl"
            />

            <motion.div
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scaleX: [0, 1, 1.8],
              }}
              transition={{
                duration: 1.2,
                delay: 0.35,
                ease: "easeOut",
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-px w-[70%] -translate-x-1/2 -translate-y-1/2 bg-white shadow-[0_0_15px_#FFFFFF,0_0_35px_#B7D8C0] blur-[1px]"
            />
          </>
        )}
      </motion.div>
    </section>
  );
};

export default Handle;

One thing to note: I kept your **140 particles**, shimmer, flash, and the new wave. So this is a visual enhancement, not a change to your handle/database logic.

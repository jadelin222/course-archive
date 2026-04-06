"use client";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: "#000000", // black background
                },
                fpsLimit: 30, 
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "repulse", // repulse effect
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#ff00ff", "#00ffff", "#ffff00", "#00ff00"] // white particles
                    },
                    opacity: {
                        value: 0.3, // low opacity
                        random: true,
                        anim: {
                            enable: true,
                            speed: 1,
                            opacity_min: 0.01,
                        }
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#66ccff", // white connection line
                        opacity: 0.5, 
                        width: 1.5, // thin line
                    },
                    move: {
                        enable: true,
                        speed: 1, // moving slowly
                        direction: "none",
                        random: true,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: 150, // decrease the number of particals
                    },
                    shape: {
                        type: "circle", // shape
                    },
                    size: {
                        value: 46, // small size
                        random: false,
                    },
                },
                detectRetina: true,
            }}
        />
    );
}

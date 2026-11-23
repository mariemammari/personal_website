import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    SiReact, SiAngular, SiTypescript, SiNestjs, SiNodedotjs, SiSpring,
    SiDjango, SiFastapi, SiPython, SiScikitlearn, SiPandas,
    SiPostgresql, SiMongodb, SiMysql, SiDocker, SiKubernetes,
    SiJenkins, SiGit, SiJira, SiFigma, SiPrometheus, SiGrafana,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import {
    Cloud, Server, Box, Layers, Binary,
} from "lucide-react";

/* ── Skill data — 4 bento cards mirroring hero pillars ── */
const appStack = [
    { label: "React",       icon: <SiReact />       },
    { label: "Angular",     icon: <SiAngular />     },
    { label: "TypeScript",  icon: <SiTypescript />  },
    { label: "NestJS",      icon: <SiNestjs />      },
    { label: "Node.js",     icon: <SiNodedotjs />   },
    { label: "Spring Boot", icon: <SiSpring />      },
    { label: "Django",      icon: <SiDjango />      },
    { label: "FastAPI",     icon: <SiFastapi />     },
    { label: "REST APIs",   icon: <TbApi />         },
];

const dataML = [
    { label: "Python",       icon: <SiPython />      },
    { label: "Scikit-learn", icon: <SiScikitlearn /> },
    { label: "XGBoost",      icon: <Binary />        },
    { label: "Pandas",       icon: <SiPandas />      },
    { label: "PostgreSQL",   icon: <SiPostgresql />  },
    { label: "MongoDB",      icon: <SiMongodb />     },
    { label: "MySQL",        icon: <SiMysql />       },
];

const infra = [
    { label: "Docker",         icon: <SiDocker />     },
    { label: "Kubernetes",     icon: <SiKubernetes /> },
    { label: "Jenkins",        icon: <SiJenkins />    },
    { label: "SonarQube",      icon: <Server size={12} /> },
    { label: "Microservices",  icon: <Layers size={12} /> },
    { label: "Git",            icon: <SiGit />        },
    { label: "Jira",           icon: <SiJira />       },
    { label: "Figma",          icon: <SiFigma />      },
];

const exploring = [
    { label: "AWS Cloud Foundations", icon: <Cloud size={12} />     },
    { label: "Prometheus",            icon: <SiPrometheus />        },
    { label: "Grafana",               icon: <SiGrafana />           },
    { label: "Blockchain",            icon: <Box size={12} />       },
];

/* ── Uniform pill — single dark-glass style, no rainbow ── */
function Pill({
    label,
    icon,
    dashed = false,
}: {
    label: string;
    icon?: React.ReactNode | null;
    dashed?: boolean;
}) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/80 transition-all duration-200 hover:-translate-y-0.5 hover:text-white ${
                dashed
                    ? "border border-dashed border-white/20 bg-white/5"
                    : "border border-white/20 bg-white/10 backdrop-blur-sm"
            }`}
        >
            {icon && (
                <span className="shrink-0 opacity-55 text-[12px] leading-none">{icon}</span>
            )}
            {label}
        </span>
    );
}

/* ── Bento card with numbered editorial label ── */
function BentoCard({
    num,
    label,
    skills,
    delay = 0,
    className = "",
    dashed = false,
}: {
    num: string;
    label: string;
    skills: { label: string; icon?: React.ReactNode | null }[];
    delay?: number;
    className?: string;
    dashed?: boolean;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay }}
            className={`glass rounded-2xl p-5 sm:p-6 ${className}`}
        >
            {/* Numbered label — no emoji, editorial style */}
            <p className="mb-5 font-mono text-[10px] font-semibold tracking-[0.28em] text-white/35">
                <span className="text-secondary/60">{num}</span>
                <span className="mx-2 text-white/15">/</span>
                <span className="uppercase">{label}</span>
            </p>

            <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                    <Pill key={s.label} label={s.label} icon={s.icon} dashed={dashed} />
                ))}
            </div>
        </motion.div>
    );
}

/* ── Section ── */
export function Skills() {
    const { t } = useTranslation();

    return (
        <section id="skills" className="mx-auto w-11/12 max-w-[1600px] py-16 md:py-20 xl:w-10/12">

            {/* Header — font-sans only, no serif clash */}
            <div className="mb-10 max-w-2xl">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-secondary">
                    {t("skills.title")}
                </p>
                <h2 className="mt-3 font-sans text-3xl font-bold text-white md:text-4xl">
                    {t("skills.heading")}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/50">
                    Core technologies across full-stack engineering, DevOps, and applied ML.
                </p>
            </div>

            {/* Bento Grid — 3 cols, 2 rows */}
            <div className="grid gap-4 lg:grid-cols-3">

                {/* 01 — Frontend & Backend (wide, 2 cols) */}
                <BentoCard
                    num="01"
                    label="Application"
                    skills={appStack}
                    delay={0}
                    className="lg:col-span-2"
                />

                {/* 02 — Data & Machine Learning */}
                <BentoCard
                    num="02"
                    label="Data & ML"
                    skills={dataML}
                    delay={0.07}
                    className="lg:col-span-1"
                />

                {/* 03 — DevOps & Engineering */}
                <BentoCard
                    num="03"
                    label="Infrastructure"
                    skills={infra}
                    delay={0.12}
                    className="lg:col-span-1"
                />

                {/* 04 — Currently Exploring (slim strip, wide, dashed border pills) */}
                <BentoCard
                    num="04"
                    label="Currently Exploring"
                    skills={exploring}
                    delay={0.17}
                    className="lg:col-span-2"
                    dashed
                />
            </div>
        </section>
    );
}

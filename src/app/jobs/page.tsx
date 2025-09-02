"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

// Types
interface Job {
  id: string;
  date: string;
  title: string;
  payType: "Fixed Project" | "Hourly";
  price: string;
  summary: string;
  skills: string[];
  tags: string[];
  location: string;
  client: string;
  featured?: boolean;
}

// Dummy job data
const JOBS: Job[] = [
  {
    id: "1",
    date: "Apr 26, 2024",
    title: "Website Design and Front-End Development",
    payType: "Fixed Project",
    price: "$2,000–$3,000",
    summary:
      "In this role, you will be responsible for conducting comprehensive SEO audits and implementing on-page improvements.",
    skills: ["WordPress", "SEO", "Frontend", "Figma"],
    tags: ["App Design", "Art Generation", "Illustration"],
    location: "Remote, USA",
    client: "Evermore Co",
  },
  {
    id: "2",
    date: "Apr 25, 2024",
    title: "Website Design and Front-End Development",
    payType: "Fixed Project",
    price: "$2,500–$4,000",
    summary:
      "In this role, you will be responsible for conducting competitive SEO audits and re-architecting components.",
    skills: ["React", "Next.js", "Tailwind", "Performance"],
    tags: ["App Design", "Art Generation", "Illustration"],
    location: "Remote",
    client: "Evermore Co",
    featured: true,
  },
  {
    id: "3",
    date: "Apr 24, 2024",
    title: "Website Design and Front-End Development",
    payType: "Fixed Project",
    price: "$3,000–$5,000",
    summary:
      "In this role, you will be responsible for conducting design reviews, UI optimization, and unit testing.",
    skills: ["TypeScript", "Accessibility", "Animations", "Testing"],
    tags: ["App Design", "Art Generation", "Illustration"],
    location: "Remote",
    client: "Evermore Co",
  },
];

// 🔹 POST Method (Job Add)
async function addJob(newJob: Job) {
  try {
    const res = await fetch("http://localhost:3000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    if (!res.ok) throw new Error("Failed to post job");

    const data = await res.json();
    console.log("✅ Job posted:", data);
  } catch (error) {
    console.error("❌ Error posting job:", error);
  }
}

function JobCard({ job }: { job: Job }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-lg ${
        job.featured ? "ring-1 ring-slate-900/10" : ""
      }`}
    >
      <div className="text-xs text-slate-500">{job.date}</div>
      <h3 className="mt-2 text-base font-semibold text-slate-900 md:text-lg">{job.title}</h3>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <Badge className="border-slate-200 bg-slate-50 text-slate-700">{job.payType}</Badge>
        <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">{job.price}</Badge>
        <Badge className="border-violet-200 bg-violet-50 text-violet-700">Verified</Badge>
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{job.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {job.skills.map((s) => (
          <Badge key={s} className="border-slate-200 bg-white text-slate-700">
            {s}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <Badge key={t} className="border-slate-200 bg-gray-50 text-slate-700">
            {t}
          </Badge>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-500">
          <span className="font-medium text-slate-700">{job.location}</span>
          <span className="mx-2 opacity-40">•</span>
          {job.client}
        </div>
        <button
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          type="button"
          onClick={() => addJob(job)}
        >
          Apply Now
        </button>
      </div>
      {job.featured && (
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-b from-slate-900/[0.02] to-transparent" />
      )}
    </div>
  );
}

export default function JobSearchResults() {
  const [jobs] = useState<Job[]>(JOBS);

  return (
    <div className="bg-white">
      {/* Job Header */}

      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-sm font-medium text-slate-700 md:text-base">
            <span className="font-semibold text-slate-900">{jobs.length}</span> search result(s) found
          </h2>
          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
              Most Relevant
            </button>
            <button className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50">
              Newest
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProjectGrid() {
  const techs = useMemo(() => {
    const set = new Set<string>();
    for (const project of projects) for (const tech of project.technologies) set.add(tech);
    return ["Todas", ...[...set].sort()];
  }, []);
  const [tech, setTech] = useState("Todas");
  const visible = projects.filter((project) => tech === "Todas" || project.technologies.includes(tech));

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tecnología">
        {techs.map((name) => (
          <Button
            key={name}
            type="button"
            size="sm"
            variant={tech === name ? "default" : "outline"}
            className="rounded-full"
            onClick={() => setTech(name)}
            aria-pressed={tech === name}
          >
            {name}
          </Button>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {visible.map((project) => (
          <article id={project.id} key={project.id} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <Image
              src={project.image}
              alt=""
              width={800}
              height={420}
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <p className="text-xs text-primary">{project.type}</p>
              <h2 className="font-display mt-1 text-xl font-semibold">{project.name}</h2>
              <p className="text-muted-foreground mt-2 text-sm">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {project.technologies.map((item) => (
                  <Badge key={item} variant="outline">
                    {item}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                {project.href ? (
                  <Button asChild size="sm">
                    <a href={project.href}>Ver</a>
                  </Button>
                ) : null}
                {project.github ? (
                  <Button asChild size="sm" variant="outline">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

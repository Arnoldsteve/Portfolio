import { Badge } from "@/components/ui/badge";

export const Skills = () => {
  const skills = [
    "JavaScript", "TypeScript", "PHP", "React", "Next.js", "Node.js",
    "NestJS", "Express.js", "Laravel", "PostgreSQL", "MySQL", "MongoDB",
    "Docker", "AWS", "Git", "Prisma", "Tailwind CSS"
  ];

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <h2 className="text-3xl font-bold text-center">My Technical Skills</h2>
      <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-4xl mx-auto">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="px-4 py-2 text-base">
            {skill}
          </Badge>
        ))}
      </div>
    </section>
  );
};
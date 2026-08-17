import { notFound } from "next/navigation";

import { SkillTestRunner } from "@/components/skill-tests/skill-test-runner";
import { SectionHeading } from "@/components/layout/section-heading";
import { demoSkillTests } from "@/lib/demo-data";

export default function SkillTestDetailPage({
  params,
}: {
  params: { skill: string };
}) {
  const test = demoSkillTests.find((item) => item.slug === params.skill);

  if (!test) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Skill Test"
        title={test.title}
        description="Finish the full test in one sitting and see your score instantly."
      />
      <SkillTestRunner test={test} />
    </div>
  );
}

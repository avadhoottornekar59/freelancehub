import { DemoEstimatorForm } from "@/components/estimator/demo-estimator-form";
import { SectionHeading } from "@/components/layout/section-heading";

export default function EstimatorPage() {
  return (
    <div className="space-y-8">
      <div className="surface border-amber-300/25 bg-amber-300/10 px-5 py-4 text-sm text-amber-50">
        Demo mode: this uses a local estimation engine today. We can swap in a real AI API later without changing the user flow.
      </div>

      <SectionHeading
        eyebrow="AI Scope Estimator"
        title="Draft project scope and a suggested budget before you post"
        description="This front-end demo mirrors the final product flow without calling a payment provider or a database-backed API."
      />

      <DemoEstimatorForm />
    </div>
  );
}

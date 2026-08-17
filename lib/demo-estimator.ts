export interface EstimatorInput {
  projectType: string;
  features: string;
  deadline: string;
  collaborationMode: string;
}

export interface EstimatorOutput {
  complexity: "Lean" | "Balanced" | "Ambitious";
  scopeSummary: string;
  timeline: string;
  suggestedBudget: string;
  recommendedTeam: string[];
  deliveryNotes: string[];
}

const projectBaseBudget: Record<string, number> = {
  website: 35000,
  "web-app": 65000,
  "mobile-app": 85000,
  branding: 25000,
  marketing: 30000,
  writing: 18000,
};

const deadlineMultiplier: Record<string, number> = {
  "1-2 weeks": 1.35,
  "3-4 weeks": 1.15,
  "1-2 months": 1,
  flexible: 0.9,
};

export function estimateProjectScope(input: EstimatorInput): EstimatorOutput {
  const featureList = input.features
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

  const baseBudget = projectBaseBudget[input.projectType] ?? 28000;
  const featureFactor = Math.max(featureList.length, 1) * 6500;
  const timelineFactor = deadlineMultiplier[input.deadline] ?? 1;
  const collaborationFactor = input.collaborationMode === "full-service" ? 1.15 : 1;

  const rawBudget = Math.round(baseBudget + featureFactor);
  const adjustedBudget = Math.round(rawBudget * timelineFactor * collaborationFactor);
  const minBudget = Math.max(12000, Math.round(adjustedBudget * 0.85));
  const maxBudget = Math.round(adjustedBudget * 1.2);

  const complexityScore = featureList.length + (input.deadline === "1-2 weeks" ? 2 : 0);

  const complexity: EstimatorOutput["complexity"] =
    complexityScore <= 3 ? "Lean" : complexityScore <= 6 ? "Balanced" : "Ambitious";

  const timeline =
    complexity === "Lean"
      ? "2 to 3 weeks"
      : complexity === "Balanced"
        ? "4 to 6 weeks"
        : "6 to 10 weeks";

  const recommendedTeam =
    input.projectType === "branding"
      ? ["Brand Designer", "Copywriter"]
      : input.projectType === "marketing"
        ? ["Performance Marketer", "Designer", "Analyst"]
        : input.projectType === "writing"
          ? ["Writer", "Editor"]
          : complexity === "Lean"
            ? ["Freelancer", "Client Reviewer"]
            : ["Product Designer", "Developer", "QA Reviewer"];

  const deliveryNotes = [
    "Break the project into milestone-based deliveries to reduce rework.",
    "Lock the must-have feature list before visual polish and edge-case requests.",
    input.deadline === "1-2 weeks"
      ? "The current deadline is aggressive, so expect higher pricing and narrower scope."
      : "A realistic timeline will usually create better quality and smoother feedback cycles.",
  ];

  return {
    complexity,
    scopeSummary:
      featureList.length > 0
        ? `This looks like a ${complexity.toLowerCase()} project with ${featureList.length} primary deliverable${
            featureList.length > 1 ? "s" : ""
          }: ${featureList.slice(0, 4).join(", ")}${featureList.length > 4 ? ", and more." : "."}`
        : "This looks like a focused engagement with room to shape the scope further.",
    timeline,
    suggestedBudget: `INR ${minBudget.toLocaleString("en-IN")} to INR ${maxBudget.toLocaleString("en-IN")}`,
    recommendedTeam,
    deliveryNotes,
  };
}

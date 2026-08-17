import { FreelancerGigManager } from "@/components/dashboard/freelancer-gig-manager";
import { SectionHeading } from "@/components/layout/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { requireUser } from "@/lib/access";
import { getFreelancerGigs } from "@/lib/services/gig-service";

export const dynamic = "force-dynamic";

export default async function FreelancerDashboardPage() {
  const user = await requireUser(["freelancer"]);

  if (!user) {
    return null;
  }

  const gigs = await getFreelancerGigs(String(user._id));

  return (
    <div className="space-y-8">
      <section className="surface space-y-4 p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Freelancer dashboard</p>
        <h1 className="font-heading text-4xl font-semibold text-white">
          Build your storefront, {user.name.split(" ")[0]}.
        </h1>
        <p className="max-w-3xl text-slate-300">
          Publish and refine your offers from one workspace. The next build batch can layer in availability, verification, orders, and messaging.
        </p>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/dashboard/freelancer/edit-gig" variant="secondary">
            Demo video upload
          </ButtonLink>
          <ButtonLink href="/availability" variant="secondary">
            Try availability demo
          </ButtonLink>
          <ButtonLink href="/skill-test" variant="secondary">
            Try skill test
          </ButtonLink>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Gig Management"
          title="Create, edit, and remove your gigs"
          description="Each gig supports title, category, pricing, delivery time, description, and multiple images."
        />
        <FreelancerGigManager gigs={gigs} />
      </section>
    </div>
  );
}

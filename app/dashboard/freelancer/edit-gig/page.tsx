import { DemoVideoUploadForm } from "@/components/dashboard/demo-video-upload-form";
import { SectionHeading } from "@/components/layout/section-heading";

export default function FreelancerEditGigPage() {
  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Edit Gig"
        title="Demo upload UI for freelancer intro videos"
        description="This page is intentionally front-end only. It previews how a freelancer would attach a short intro video to a gig."
      />
      <DemoVideoUploadForm />
    </div>
  );
}

import { Clock3 } from "lucide-react";
import TimelineStep from "./TimelineStep";

export default function PendingTimeline() {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-slate-200
        bg-white
        p-10
        shadow-[0_20px_60px_rgba(15,23,42,.08)]
      "
    >

      {/* Badge */}

      <div className="flex justify-end">

        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-[#E7F7F3]
            px-5
            py-2
            text-[#006B5F]
            font-semibold
          "
        >
          <Clock3 size={18} />

          Est. Review: 24–48 Hours

        </div>

      </div>

      {/* Timeline */}

      <div className="relative mt-12">

        {/* Line */}

        <div className="absolute left-12 right-12 top-7 h-[3px] bg-slate-200">

          <div className="h-full w-[66%] bg-green-500 rounded-full" />

        </div>

        <div className="relative flex justify-between">

          <TimelineStep
            title="Registration"
            subtitle="Completed"
            status="completed"
          />

          <TimelineStep
            title="Documents"
            subtitle="Completed"
            status="completed"
          />

          <TimelineStep
            title="Under Review"
            subtitle="Processing"
            status="active"
          />

          <TimelineStep
            title="Activation"
            subtitle="Waiting"
            status="pending"
          />

        </div>

      </div>

    </section>
  );
}
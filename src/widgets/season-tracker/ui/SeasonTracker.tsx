import { useState } from "react";

import { Accordion } from "@/shared/ui/accordion";

import type { SeasonSummary } from "../model/types";
import { SeasonAccordion } from "./SeasonAccordion";

interface SeasonTrackerProps {
  tvId: number;
  seasons: SeasonSummary[];
}

export function SeasonTracker({ tvId, seasons }: SeasonTrackerProps) {
  const [openSeason, setOpenSeason] = useState<string | undefined>(undefined);

  if (seasons.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 font-heading text-[1.375rem] font-bold text-foreground">Seasons</h2>
      <Accordion
        type="single"
        collapsible
        value={openSeason}
        onValueChange={setOpenSeason}
        className="flex flex-col gap-3"
      >
        {seasons.map((season) => (
          <SeasonAccordion
            key={season.seasonNumber}
            tvId={tvId}
            season={season}
            isOpen={openSeason === String(season.seasonNumber)}
          />
        ))}
      </Accordion>
    </div>
  );
}

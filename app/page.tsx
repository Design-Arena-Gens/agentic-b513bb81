import { Scoreboard } from "@/app/components/Scoreboard";
import { PromptPanel } from "@/app/components/PromptPanel";
import { GenerationCard } from "@/app/components/GenerationCard";
import { loadTournament } from "@/app/lib/tournament";

const TOURNAMENT_ID = "17b204cb-a38f-4e57-a56a-aca2873c6191";

export default async function Page() {
  const { tournament, generations } = await loadTournament(TOURNAMENT_ID);

  const battles = generations.reduce((total, entry) => total + entry.wins + entry.losses, 0) / 2;
  const dominant = generations[0];
  const challengers = generations.slice(1);

  return (
    <main>
      <Scoreboard tournament={tournament} generations={generations} />

      <PromptPanel prompt={tournament.promptText} />

      <section>
        <h2>Key Tournament Signals</h2>
        <p className="section-intro">
          Pull out the core insights before diving into each code submission. Track where the winning bot pulled ahead,
          how often intent detection triggered, and why the smaller prompt still covers the full automation surface.
        </p>
        <div className="card-grid" style={{ marginTop: "20px" }}>
          <article className="card">
            <h3>Battle Volume</h3>
            <p>
              {battles.toFixed(0)} head-to-head duels were recorded across the bracket, yielding {generations.length} distinct
              automation blueprints.
            </p>
          </article>
          <article className="card">
            <h3>Champion Blueprint</h3>
            <p>
              {dominant.displayName} captured the crown with a {Math.round(dominant.winRate * 100)}% win rate, blending
              intent classification, sales enablement, and multi-channel reply logic into a concise FastAPI surface.
            </p>
          </article>
          <article className="card">
            <h3>Runner Pressure</h3>
            <p>
              The chasing pack kept the arena tight: {challengers.filter((c) => c.winRate >= 0.5).length} contenders
              finished above 50% win rate, keeping the champion honest in every round.
            </p>
          </article>
          <article className="card">
            <h3>Feature Completeness</h3>
            <p>
              Every finalist maintained support for sales, support, payment, and call automations—proof the brief could be
              compressed without sacrificing capability.
            </p>
          </article>
        </div>
      </section>

      <section>
        <h2>Submission Gallery</h2>
        <p className="section-intro">
          Review the distilled FastAPI agents. Each card summarises ranking metrics and surfaces the raw code so you can
          drop the champion straight into your stack or remix a challenger into a niche flow.
        </p>

        <div className="card-grid" style={{ marginTop: "24px" }}>
          {generations.map((generation) => (
            <GenerationCard key={generation.id} generation={generation} />
          ))}
        </div>
      </section>
    </main>
  );
}

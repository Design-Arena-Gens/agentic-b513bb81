import { format } from "date-fns";
import type { EnrichedGeneration, Tournament } from "@/app/lib/tournament";
import { formatProviderName, formatWinRate } from "@/app/lib/tournament";

type ScoreboardProps = {
  tournament: Tournament;
  generations: EnrichedGeneration[];
};

function providerClass(provider: string): string {
  const normalized = provider.toLowerCase();
  if (normalized.includes("anthropic")) return "anthropic";
  if (normalized.includes("openai") || normalized.includes("gpt")) return "openai";
  if (normalized.includes("zhipu") || normalized.includes("glm")) return "zhipu";
  return "";
}

export function Scoreboard({ tournament, generations }: ScoreboardProps) {
  return (
    <section>
      <div className="badge">Tournament #{tournament.id.slice(0, 8)}</div>
      <h1>Design Arena Deep Dive</h1>
      <p className="section-intro">
        We reverse engineered the Design Arena battle for the NextPlay AI automation prompt. Explore the original
        brief, benchmark every model submission, and skim the winning code without leaving this dashboard.
      </p>

      <div className="tournament-meta">
        <span className="status-pill">{tournament.status.toUpperCase()}</span>
        <span className="metric">
          <strong>{tournament.generations.length}</strong>
          submissions
        </span>
        {tournament.createdAt && (
          <span className="metric">
            {format(new Date(tournament.createdAt), "d MMM yyyy HH:mm 'UTC'")}
          </span>
        )}
        <span className="metric">
          Arena <strong style={{ textTransform: "capitalize" }}>{tournament.arena}</strong>
        </span>
        <span className="metric">
          Category <strong style={{ textTransform: "capitalize" }}>{tournament.category}</strong>
        </span>
      </div>

      <div className="scoreboard" aria-live="polite">
        <table>
          <thead>
            <tr>
              <th style={{ width: "70px" }}>Rank</th>
              <th>Model</th>
              <th>Provider</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {generations.map((generation) => (
              <tr key={generation.id}>
                <td className="rank">#{generation.rank}</td>
                <td>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <span style={{ fontWeight: 600 }}>{generation.displayName}</span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{generation.modelId}</span>
                  </div>
                </td>
                <td>
                  <span className={`model-chip ${providerClass(generation.provider)}`}>
                    {formatProviderName(generation.provider)}
                  </span>
                </td>
                <td>{generation.wins}</td>
                <td>{generation.losses}</td>
                <td>{formatWinRate(generation.winRate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

import type { EnrichedGeneration } from "@/app/lib/tournament";
import { formatWinRate, formatProviderName } from "@/app/lib/tournament";

function cleanCode(code: string | null): string {
  if (!code) return "No code snippet was published for this submission.";
  if (!code.startsWith("```")) return code.trim();
  const withoutFence = code.replace(/^```[a-zA-Z0-9+-]*\n?/, "").replace(/```$/, "");
  return withoutFence.trim();
}

function heading(rank: number): string {
  if (rank === 1) return "Champion";
  if (rank === 2) return "Runner-up";
  if (rank === 3) return "Third Place";
  return `Wildcard #${rank}`;
}

function providerClass(provider: string): string {
  const normalized = provider.toLowerCase();
  if (normalized.includes("anthropic")) return "anthropic";
  if (normalized.includes("openai") || normalized.includes("gpt")) return "openai";
  if (normalized.includes("zhipu") || normalized.includes("glm")) return "zhipu";
  return "";
}

export function GenerationCard({ generation }: { generation: EnrichedGeneration }) {
  const description = cleanCode(generation.code);

  return (
    <article className="card" aria-labelledby={`generation-${generation.id}`}>
      <div className="generation-header">
        <div>
          <h3 id={`generation-${generation.id}`}>{heading(generation.rank)}</h3>
          <p className="generation-subtitle">
            #{generation.rank} · {generation.displayName} ({formatProviderName(generation.provider)})
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="metric positive">
            <strong>{formatWinRate(generation.winRate)}</strong>
            win rate
          </div>
          <div className="metric" style={{ justifyContent: "flex-end" }}>
            {generation.wins} wins · {generation.losses} losses
          </div>
        </div>
      </div>

      <div className={`model-chip ${providerClass(generation.provider)}`} style={{ marginTop: "18px" }}>
        {generation.displayName}
      </div>

      <div className="tag-row" aria-label="Submission assets">
        {generation.previewUrl && <span className="tag">Preview</span>}
        {generation.imageUrl && <span className="tag">Image</span>}
        {generation.videoUrl && <span className="tag">Video</span>}
        {generation.slidesUrl && <span className="tag">Slides</span>}
        {generation.audioUrl && <span className="tag">Audio</span>}
      </div>

      <pre className="scroll-fade">
        <code>{description}</code>
      </pre>
    </article>
  );
}

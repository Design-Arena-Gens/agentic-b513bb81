import { shortenPrompt } from "@/app/lib/tournament";

export function PromptPanel({ prompt }: { prompt: string }) {
  const compactPrompt = shortenPrompt(prompt, 1600);

  return (
    <section>
      <h2>The Unified Automation Brief</h2>
      <p className="section-intro">
        The tournament asked each contender to condense a sprawling FastAPI automation template into a sharper, more
        reusable artifact—without losing intent detection, multi-channel support, or payment and call flows.
      </p>
      <div className="prompt-block">
        {compactPrompt}
      </div>
    </section>
  );
}

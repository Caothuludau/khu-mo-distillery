import { getDictionary, type Locale } from "@/lib/i18n";

type ProcessStepsProps = {
  locale: Locale;
};

export function ProcessSteps({ locale }: ProcessStepsProps) {
  const t = getDictionary(locale);
  return (
    <ol className="grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
      {t.story.steps.map((step, index) => (
        <li key={step.title} className="bg-surface p-6">
          <p className="text-sm font-semibold tabular-nums text-highlight">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-3 text-xl font-semibold text-heading">{step.title}</h3>
          <p className="mt-2 text-[15px] leading-6 text-muted">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}

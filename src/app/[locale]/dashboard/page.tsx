import { useTranslations } from "next-intl";

export default function DashboardPage() {
  const t = useTranslations();

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">{t("Navigation.dashboard")}</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Your existing dashboard cards/widgets */}
      </div>
    </div>
  );
}

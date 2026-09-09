const TONE_CLASSES = {
  primary: {
    text: "text-[#235eac]",
    icon: "text-[#235eac]",
    bg: "bg-[#f1f3ff]",
  },

  secondary: {
    text: "text-[#006d40]",
    icon: "text-[#006d40]",
    bg: "bg-[#9cf6bc]/40",
  },

  neutral: {
    text: "text-slate-900",
    icon: "text-[#235eac]",
    bg: "bg-[#f1f3ff]",
  },

  muted: {
    text: "text-slate-700",
    icon: "text-slate-600",
    bg: "bg-[#f1f3ff]",
  },
};

const ICONS = {
  sensors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="2" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4" />
      <path d="M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" />
    </svg>
  ),

  cellTower: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v18" />
      <path d="M8 21h8" />
      <path d="M9 17l3-14 3 14" />
      <path d="M5 8a10 10 0 0 1 14 0" />
    </svg>
  ),

  coldChain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v18M7 6l10 12M17 6L7 18" />
      <path d="M5 12h14" />
    </svg>
  ),

  hourglass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 4h12M6 20h12M8 4v4l4 4 4-4V4M8 20v-4l4-4 4 4v4" />
    </svg>
  ),
};

const NotificationsStats = ({ stats = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const tone =
          TONE_CLASSES[stat.tone] ??
          TONE_CLASSES.primary;

        return (
          <div
            key={stat.id}
            className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
          >
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase tracking-wider">
                {stat.label}
              </span>

              <span
                className={`text-2xl font-bold ${tone.text}`}
              >
                {stat.value}
              </span>
            </div>

            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${tone.bg} ${tone.icon}`}
            >
              <span className="w-[22px] h-[22px]">
                {ICONS[stat.icon]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificationsStats;
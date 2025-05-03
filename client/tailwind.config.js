module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  safelist: [
    // Reds
    "bg-red-400",
    "bg-red-500",
    "bg-red-600",
    // Oranges
    "bg-orange-400",
    "bg-orange-500",
    "bg-orange-600",
    // Ambers
    "bg-amber-400",
    "bg-amber-500",
    "bg-amber-600",
    // Yellows
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-yellow-600",
    // Limes
    "bg-lime-400",
    "bg-lime-500",
    "bg-lime-600",
    // Greens
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    // Emeralds
    "bg-emerald-400",
    "bg-emerald-500",
    "bg-emerald-600",
    // Teals
    "bg-teal-400",
    "bg-teal-500",
    "bg-teal-600",
    // Cyans
    "bg-cyan-400",
    "bg-cyan-500",
    "bg-cyan-600",
    // Skies
    "bg-sky-400",
    "bg-sky-500",
    "bg-sky-600",
    // Blues
    "bg-blue-400",
    "bg-blue-500",
    "bg-blue-600",
    // Indigos
    "bg-indigo-400",
    "bg-indigo-500",
    "bg-indigo-600",
    // Violets
    "bg-violet-400",
    "bg-violet-500",
    "bg-violet-600",
    // Purples
    "bg-purple-400",
    "bg-purple-500",
    "bg-purple-600",
    // Fuchsias
    "bg-fuchsia-400",
    "bg-fuchsia-500",
    "bg-fuchsia-600",
    // Pinks
    "bg-pink-400",
    "bg-pink-500",
    "bg-pink-600",
    // Roses
    "bg-rose-400",
    "bg-rose-500",
    "bg-rose-600",
    // Slates
    "bg-slate-400",
    "bg-slate-500",
    "bg-slate-600",
    // Grays
    "bg-gray-400",
    "bg-gray-500",
    "bg-gray-600",
    // Zinces
    "bg-zinc-400",
    "bg-zinc-500",
    "bg-zinc-600",
    // Neutrals
    "bg-neutral-400",
    "bg-neutral-500",
    "bg-neutral-600",
    // Stones
    "bg-stone-400",
    "bg-stone-500",
    "bg-stone-600",
    // Reds
    "border-l-red-600",
    // Oranges
    "border-l-orange-600",
    // Ambers
    "border-l-amber-600",
    // Yellows
    "border-l-yellow-600",
    // Limes
    "border-l-lime-600",
    // Greens
    "border-l-green-600",
    // Emeralds
    "border-l-emerald-600",
    // Teals
    "border-l-teal-600",
    // Cyans
    "border-l-cyan-600",
    // Skies
    "border-l-sky-600",
    // Blues
    "border-l-blue-600",
    // Indigos
    "border-l-indigo-600",
    // Violets
    "border-l-violet-600",
    // Purples
    "border-l-purple-600",
    // Fuchsias
    "border-l-fuchsia-600",
    // Pinks
    "border-l-pink-600",
    // Roses
    "border-l-rose-600",
    // Slates
    "border-l-slate-600",
    // Grays
    "border-l-gray-600",
    // Zinces
    "border-l-zinc-600",
    // Neutrals
    "border-l-neutral-600",
    // Stones
    "border-l-stone-600",

    "from-gray-500",
    "from-red-500",
    "from-yellow-500",
    "from-green-500",
    "from-blue-500",
    "from-indigo-500",
    "from-purple-500",
    "from-pink-500",
    "from-teal-500",
    "from-cyan-500",
    "from-lime-500",
    "from-orange-500",
    "from-emerald-500",
    "from-fuchsia-500",
    "from-rose-500",

    "from-gray-600",
    "from-red-600",
    "from-yellow-600",
    "from-green-600",
    "from-blue-600",
    "from-indigo-600",
    "from-purple-600",
    "from-pink-600",
    "from-teal-600",
    "from-cyan-600",
    "from-lime-600",
    "from-orange-600",
    "from-emerald-600",
    "from-fuchsia-600",
    "from-rose-600",
  ],
  theme: {
    extend: {
      screens: {
        110: "1600px", // Custom breakpoint for 110% zoom
      },
      fontFamily: {
        "encode-sans": ["Encode Sans Semi Expanded", "sans-serif"],
        "nuosu-sil": ["Nuosu SIL", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        "albert-sans": ["Albert sans", "sans-serif"],
        futura: ["Futura", "sans-serif"],
      },
      colors: {
        midnight: "#4961aa", // Add custom color to the existing palette
      },
    },
  },
  plugins: [],
};

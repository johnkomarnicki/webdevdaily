export default defineAppConfig({
  ui: {
    primary: "primary-blue",
    notifications: {
      position: "top-0 bottom-[unset] font-Exo",
    },
    formGroup: {
      default: {
        size: "md",
      },
    },
    input: {
      default: {
        size: "md",
      },
    },
    avatar: {
      size: {
        "3xl": "h-28 w-28 text-3xl",
      },
      chip: {
        base: "rounded-md ring-0 shadow-md absolute ring-white dark:ring-gray-900 flex items-center justify-center text-white dark:text-gray-900 font-medium",
        position: {
          "bottom-right": "-bottom-1 -right-1",
        },
        size: {
          sm: "h-4 w-5 p-2 text-[7px]",
          md: "h-5 w-6 p-2 text-[9px]",
          "3xl": "h-7 w-11 p-3 text-[16px]",
        },
      },
    },
  },
});

const Enum = {
  RIGTH_LOGO_FIXED: "RIGTH_LOGO_FIXED",
  RIGTH_LOGO_RANDOM: "RIGTH_LOGO_RANDOM",
  BODY_FULL_FIXED: "BODY_FULL_FIXED",
  BODY_FULL_RANDOM: "BODY_FULL_RANDOM",
  RIGTH_LIST_EVENT_FIXED: "RIGTH_LIST_EVENT_FIXED",
  RIGTH_LIST_EVENT_RANDOM: "RIGTH_LIST_EVENT_RANDOM",
  SLIDE_FULL_EVENTS: "SLIDE_FULL_EVENTS",
  SLIDE_FULL_EVENTS_RANDOM: "SLIDE_FULL_EVENTS_RANDOM",
  SLIDE_FOOTER: "SLIDE_FOOTER",
} as const;

type ReverseMap<T> = T[keyof T];

export type EmunsType = ReverseMap<typeof Enum>;

export type Advertisement = {
  id: string;
  description: null;
  priority_level: "LOW";
  link: string;
  target: string;
  level_of_locations: EmunsType;
  cover_image: string[];
};

export const fetchAdvertisement = async (
  level_of_locations: EmunsType,
): Promise<Advertisement[]> => {
  const result: Advertisement[] = await fetch(
    `${process.env.NEXT_API_URL}/api/advertisements`,
  ).then((res) => res.json());

  return result.filter(
    (item) => item.level_of_locations === level_of_locations,
  );
};

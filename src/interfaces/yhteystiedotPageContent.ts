export type YhteystiedotPageContent = {
  slug: string;
  title: string;
  content: string;
  mapCoordinates: string;
  contacts: {
    title: string;
    name: string;
    phone: string;
  }[];
  committeeMembers: string[];
};

export type Metadata = {
  title: string;
  description: string;
  keywords: string;
  logo: string;
  logo_mobile: string;
  favicon: string;
  code_postal: string;
  address: string;
  state: string;
  city: string;
  emails: string[];
  phones: {
    name: string;
    phone: string;
  }[];
  color_schema: {
    buttons: {
      success: {
        background: string;
        text_color: string;
        font_type: string;
      };
      info: {
        background: string;
        text_color: string;
        font_type: string;
      };
      warning: {
        background: string;
        text_color: string;
        font_type: string;
      };
      danger: {
        background: string;
        text_color: string;
        font_type: string;
      };
    };
    header: {
      background: string;
      text_color: string;
      font_type: string;
    };
    footer: {
      background: string;
      text_color: string;
      font_type: string;
    };
  };
};

export const fetchMetadata = async (): Promise<Metadata> => {
  return await fetch(`${process.env.NEXT_API_URL}`).then((res) => res.json());
};

import {
  XLogoIcon,
  LinkedinLogoIcon,
  MediumLogoIcon,
  GlobeIcon,
} from "@phosphor-icons/react";

export const socialLinks = [
  {
    _id: 1,
    name: "Twitter",
    icon: <XLogoIcon size={32} weight="bold" />,
    url: "https://x.com/swarnaa_k",
  },
  {
    _id: 2,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/swarna-kadagadkai/",
    icon: <LinkedinLogoIcon size={32} weight="bold" />,
  },
  {
    _id: 3,
    name: "Medium",
    url: "https://medium.com/@swarnak",
    icon: <MediumLogoIcon size={32} weight="bold" />,
  },
  {
    _id: 4,
    name: "Resume",
    url: "https://drive.google.com/file/d/19t2Ydk-noAOPMKNtOpbmKnReZN1EzG4A/view?usp=sharing",
    icon: <GlobeIcon size={32} weight="bold" />,
  },
];

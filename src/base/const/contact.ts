import { IcGithub, IcHackerRank, IcLeetcode, IcLinkedin } from "@assets/icons";

export const TopmateBaseURL = "https://topmate.io/amitjoshi956";

export const TopmateServices = [
  {
    titleKey: "discovery",
    descriptionKey: "discoveryDesc",
    buttonLabelKey: "viewProfile",
    serviceId: "1106780",
  },
  {
    titleKey: "career",
    descriptionKey: "careerDesc",
    buttonLabelKey: "viewProfile",
    serviceId: "1106776",
  },
  {
    titleKey: "priorityDM",
    descriptionKey: "priorityDesc",
    buttonLabelKey: "viewProfile",
    serviceId: "1106779/pay",
  },
];

export const Socials = [
  {
    labelKey: "linkedin",
    url: "https://www.linkedin.com/in/amitjoshi956",
    iconSrc: IcLinkedin,
  },
  {
    labelKey: "github",
    url: "https://github.com/amitjoshi956",
    iconSrc: IcGithub,
  },
  {
    labelKey: "leetcode",
    url: "https://leetcode.com/u/amitjoshi956",
    iconSrc: IcLeetcode,
  },
  {
    labelKey: "hackerrank",
    url: "https://www.hackerrank.com/profile/amitjoshi956",
    iconSrc: IcHackerRank,
  },
];
export const AllowNewRequestTime = 60000;
export const ResetErrorTime = 5000;

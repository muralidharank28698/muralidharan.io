import { IEditorTools, ILibrariesAndFramework } from "./types";
import {
  AkarIconsCssFill,
  AkarIconsHtmlFill,
  AkarIconsJavascriptFill,
  DeviconAzure,
  DeviconBootstrap,
  DeviconReact,
  FluentFluent24Regular,
  LogosTypescriptIcon,
  MdiMicrosoftSharepoint,
  LucideFileJson2,
  SimpleIconsLibrariesdotio,
  SkillIconsGit,
  SkillIconsMaterialuiLight,
  SkillIconsRedux,
  SkillIconsTailwindcssLight,
  TablerBrandReactNative,
  VscodeIconsFileTypeStorybook,
  SkillIconsBitbucket,
  SimpleIconsMicrosoftpowerautomate,
  Postman,
  Jira,
  Prettier,
} from "../assets/icons";

export const links = [
  { name: "Intro", hash: "#home" },
  { name: "Story", hash: "#about" },
  { name: "Skills", hash: "#skills" },
  { name: "Education", hash: "#education" },
  { name: "Journey", hash: "#experience" },
  { name: "Work", hash: "#projects" },
  { name: "Connect", hash: "#contact" },
] as const;

export const TechnologyStack: ILibrariesAndFramework[] = [
  {
    name: "HTML",
    icon: <AkarIconsHtmlFill width={28} height={28} />,
  },
  {
    name: "CSS",
    icon: <AkarIconsCssFill width={28} height={28} />,
  },
  {
    name: "Javascript (ES6+)",
    icon: <AkarIconsJavascriptFill width={28} height={28} />,
  },
  {
    name: "React",
    icon: <DeviconReact width={28} height={28} />,
  },
  {
    name: "React Storybook",
    icon: <VscodeIconsFileTypeStorybook width={28} height={28} />,
  },
  {
    name: "TypeScript",
    icon: <LogosTypescriptIcon width={28} height={28} />,
  },
  {
    name: "Redux",
    icon: <SkillIconsRedux width={28} height={28} />,
  },
  {
    name: "React Native",
    icon: <TablerBrandReactNative width={28} height={28} />,
  },
  {
    name: "Material UI",
    icon: <SkillIconsMaterialuiLight width={28} height={28} />,
  },
  {
    name: "Fluent UI",
    icon: <FluentFluent24Regular width={28} height={28} />,
  },
  {
    name: "Tailwind CSS",
    icon: <SkillIconsTailwindcssLight width={28} height={28} />,
  },
  {
    name: "Bootstrap",
    icon: <DeviconBootstrap width={28} height={28} />,
  },
  {
    name: "PNP JS",
    icon: <LucideFileJson2 width={28} height={28} />,
  },
];

export const MicrosoftSharePointSPFXTechnologyStack: ILibrariesAndFramework[] =
  [
    {
      name: "SPFX List & Libraries",
      icon: <SimpleIconsLibrariesdotio width={28} height={28} />,
    },
    {
      name: "SPFX Webpart",
      icon: <LucideFileJson2 width={28} height={28} />,
    },
    // {
    //   name: "SPFX Libraries",
    //   icon: <SimpleIconsLibrariesdotio />,
    // },
    {
      name: "Power Automate",
      icon: <SimpleIconsMicrosoftpowerautomate width={28} height={28} />,
    },
    {
      name: "Azure AI services",
      icon: <DeviconAzure width={28} height={28} />,
    },
  ];

export const EditorTools: IEditorTools[] = [
  {
    name: "Visual Studio Code",
    icon: <MdiMicrosoftSharepoint width={28} height={28} />,
  },
  {
    name: "VS Code",
    icon: <AkarIconsCssFill width={28} height={28} />,
  },
];

export const versionControlTools: IEditorTools[] = [
  {
    name: "Git",
    icon: <SkillIconsGit width={28} height={28} />,
  },
  {
    name: "Postman",
    icon: <Postman width={28} height={28} />,
  },
  {
    name: "Bitbucket",
    icon: <SkillIconsBitbucket width={28} height={28} />,
  },
  {
    name: "Jira",
    icon: <Jira width={28} height={28} />,
  },
  {
    name: "Prettier",
    icon: <Prettier width={28} height={28} />,
  },
];


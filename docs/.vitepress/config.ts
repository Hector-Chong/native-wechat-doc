import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Native Wechat",
  description: "A TurboModule for supporting native APIs on Android and iOS.",
  themeConfig: {
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2022-present Hector Chong",
    },
    sidebar: {
      "/guide/": sidebarConfig(),
    },
  },
});

function sidebarConfig() {
  return [
    {
      text: "Introduction",
      items: [
        {
          text: "Native Wechat",
          link: "/guide/native-wechat",
          activeMatch: "/guide/",
        },
        {
          text: "Installation",
          link: "/guide/installation",
          activeMatch: "/guide/installation",
        },
        {
          text: "Configuration",
          link: "/guide/configuration",
          activeMatch: "/guide/configuration",
        },
        {
          text: "Getting Started",
          link: "/guide/getting-started",
          activeMatch: "/guide/getting-started",
        },
      ],
    },
    {
      text: "Prequisites",
      items: [
        {
          text: "Registration (Required)",
          link: "/guide/registration",
          activeMatch: "/guide/registration",
        },
        {
          text: "Universal Link Checking",
          link: "/guide/universal-link-checking.md",
          activeMatch: "/guide/universal-link-checking.md",
        },
      ],
    },
    {
      text: "APIs",
      items: [
        {
          text: "Authorization",
          link: "/guide/authorization",
          activeMatch: "/guide/authorization",
        },
        {
          text: "Payment",
          link: "/guide/payment",
          activeMatch: "/guide/payment",
        },
        {
          text: "Share",
          items: [
            {
              text: "Text",
              link: "/guide/share-text",
              activeMatch: "/guide/share/text",
            },
            {
              text: "Image",
              link: "/guide/share-image",
              activeMatch: "/guide/share/image",
            },
            {
              text: "Video",
              link: "/guide/share-video",
              activeMatch: "/guide/share/video",
            },
            {
              text: "Webpage",
              link: "/guide/share-webpage",
              activeMatch: "/guide/share/webpage",
            },
            {
              text: "Miniprogram",
              link: "/guide/share-miniprogram",
              activeMatch: "/guide/share/miniprogram",
            },
          ],
        },
        {
          text: "Subscribe Message",
          link: "/guide/subscribe-message",
          activeMatch: "/guide/subscribe-message",
        },
        {
          text: "Launch Miniprogram",
          link: "/guide/launch-miniprogram",
          activeMatch: "/guide/launch-miniprogram",
        },
        {
          text: "Customer Service",
          link: "/guide/customer-service",
          activeMatch: "/guide/customer-service",
        },
      ],
    },
  ];
}

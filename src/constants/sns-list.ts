import { Feather, Github, Mail, Send } from "lucide-react";
import {
  MY_BLOG_URL,
  MY_EMAIL,
  MY_GITHUB_HOMEPAGE_URL,
  MY_TELEGRAM_INVITE_URL,
} from "./external-link";

export const snsList = [
  {
    name: "BLOG",
    icon: Feather,
    link: MY_BLOG_URL,
  },
  {
    name: "GITHUB",
    icon: Github,
    link: MY_GITHUB_HOMEPAGE_URL,
  },
  {
    name: "TELEGRAM",
    icon: Send,
    link: MY_TELEGRAM_INVITE_URL,
  },
  {
    name: "EMAIL",
    icon: Mail,
    link: `mailto:${MY_EMAIL}`,
  },
];

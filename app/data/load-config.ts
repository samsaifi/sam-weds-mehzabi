import fs from "node:fs";
import path from "node:path";
import { withBasePath, type InvitationConfig } from "./invitation-data";

/** Reads all informative variables from root config.json on the server. */
export function loadInvitationConfig(): InvitationConfig {
  const configPath = path.join(process.cwd(), "config.json");
  const raw = fs.readFileSync(configPath, "utf-8");
  const config = JSON.parse(raw) as InvitationConfig;

  return {
    ...config,
    media: {
      ...config.media,
      heroVideo: withBasePath(config.media.heroVideo),
      welcomeBackground: withBasePath(config.media.welcomeBackground),
      generalBackground: withBasePath(config.media.generalBackground),
      endBackground: withBasePath(config.media.endBackground),
      logo: withBasePath(config.media.logo),
    },
  };
}

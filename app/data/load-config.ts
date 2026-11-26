import fs from "node:fs";
import path from "node:path";
import type { InvitationConfig } from "./invitation-data";

/** Reads all informative variables from root config.json on the server. */
export function loadInvitationConfig(): InvitationConfig {
  const configPath = path.join(process.cwd(), "config.json");
  const raw = fs.readFileSync(configPath, "utf-8");
  return JSON.parse(raw) as InvitationConfig;
}

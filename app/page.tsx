import { RoyalGraceTemplate } from "./components/RoyalGraceTemplate";
import { loadInvitationConfig } from "./data/load-config";

export default function Home() {
  const config = loadInvitationConfig();
  return <RoyalGraceTemplate config={config} />;
}

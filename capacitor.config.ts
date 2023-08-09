import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "gocart.v2",
  appName: "gocart.v2",
  webDir: "dist",
  server: {
    androidScheme: "https",
    cleartext: true,
    url: "http://localhost:8100",
  },
  plugins: {
    CapacitorCookies: { enabled: true },
  },
};

export default config;

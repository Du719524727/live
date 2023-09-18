import React, { StrictMode }  from 'react';

import { createRoot } from "react-dom/client";

import AgoraRTC from "agora-rtc-sdk-ng";
import { AgoraRTCProvider } from "agora-rtc-react";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

root.render(
    <AgoraRTCProvider client={client}>
      <App />
    </AgoraRTCProvider>
); 

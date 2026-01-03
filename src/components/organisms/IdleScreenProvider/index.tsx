"use client";

import dynamic from "next/dynamic";

const IdleScreenOverlay = dynamic(() => import("../IdleScreenOverlay"), {
    ssr: false,
});

export default function IdleScreenProvider() {
    return <IdleScreenOverlay />;
}

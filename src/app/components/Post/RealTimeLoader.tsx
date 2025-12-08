"use client"

import { usePostStore } from "@/app/store/usePostStore";
import { useUserStore } from "@/app/store/useUserStore";
import { useEffect } from "react";

export default function RealTimeLoader() {
    const user = useUserStore((s) => s.user);
    const initPostChannel = usePostStore((s) => s.initPostChannel);
    useEffect(() => {
        if (user?.id) {
            console.log(user.id);

            initPostChannel(user.id);
        }
    }, [user, initPostChannel]);
    return null;
}

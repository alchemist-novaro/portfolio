import { useQuery } from "@tanstack/react-query";
import { Lock, /* Network, CloudLightning, */ Zap } from "lucide-react";
import type { DemoPacket } from "@/types/packets";
import type { DemoItem, TierConfig } from "@/types/constants";
import { apiRequest } from "@/lib/query-client";
import { useAuth } from "./use-auth";

const DEMOS_KEY = 'demos';

const mockDemos: DemoPacket[] = [
    {
        id: "550e8400-e29b-41d4-a716-116655440000",
        title: "AI Chatbot Assistant",
        description: "Interactive conversational AI with natural language understanding and context awareness.",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        tier: "free",
        category: "Large Language Model",
        inputs: [],
        outputs: [],
        machine_type: "CPU",
        price: "$0.0",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "550e8400-e29b-41d4-a716-226655440000",
        title: "Image Generation Studio",
        description: "Advanced AI-powered image creation with custom prompts, styles, and artistic controls.",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        tier: "pro",
        category: "Image Generation",
        inputs: [],
        outputs: [],
        machine_type: "GPU",
        vram_usage: "10G",
        price: "$0.02",
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
        id: "550e8400-e29b-41d4-a716-336655440000",
        title: "ML Training Platform",
        description: "Enterprise-grade machine learning model training and deployment with real-time monitoring.",
        image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        tier: "pro+",
        category: "3D Generation",
        inputs: [],
        outputs: [],
        machine_type: "GPU",
        vram_usage: "15G",
        price: "$0.04",
        created_at: new Date(),
        updated_at: new Date(),
    },
];

async function fetchDemos() {
    try {
        const response = await apiRequest("GET", "/demos", {
            useToken: false
        });
        if (response.status === 200) {
            return await response.json();
        }
    }
    catch {
        return mockDemos;
    }
}

export const useDemos = () => {
    const { data: demoPackets, isLoading, error } = useQuery<DemoPacket[]>({
        queryKey: [DEMOS_KEY],
        queryFn: fetchDemos,
        retry: false,
        staleTime: Infinity
    });

    const { user } = useAuth();

    const tierConfig = {
        free: {
            label: "FREE",
            color: "bg-green-500",
            buttons: user ? [
                {
                    icon: Zap,
                    label: "Try Now",
                    variant: "default",
                    // type: "centralized"
                },
                // {
                //     icon: Network,
                //     label: "Try with DeAI",
                //     variant: "secondary",
                //     type: "decentralized",
                //     disabled: true
                // }
            ] : [
                {
                    icon: Lock,
                    label: "Login to Access",
                    variant: "secondary",
                    disabled: true
                }
            ]
        } as TierConfig,
        pro: {
            label: "PRO",
            color: "bg-yellow-500",
            buttons: user?.tier === "pro" || user?.tier === "pro+" ? [
                {
                    icon: Zap,
                    label: "Try Now",
                    variant: "default",
                    // type: "centralized"
                },
                // {
                //     icon: Network,
                //     label: "Try with DeAI",
                //     variant: "outline",
                //     type: "decentralized"
                // }
            ] : [
                {
                    icon: Lock,
                    label: user ? "Upgrade to Access" : "Login to Access",
                    variant: "secondary",
                    disabled: true
                }
            ]
        } as TierConfig,
        "pro+": {
            label: "PRO+",
            color: "bg-purple-500",
            buttons: user?.tier === "pro+" ? [
                {
                    icon: Zap,
                    label: "Try Now",
                    variant: "default",
                    // type: "centralized"
                },
                // {
                //     icon: Network,
                //     label: "Try with DeAI",
                //     variant: "outline",
                //     type: "decentralized"
                // }
            ] : [
                {
                    icon: Lock,
                    label: user ? "Upgrade to Access" : "Login to Access",
                    variant: "secondary",
                    disabled: true
                }
            ]
        } as TierConfig,
    };

    const demos: DemoItem[] | undefined = demoPackets?.map((demo) => ({
        ...demo,
        config: tierConfig[demo.tier as keyof typeof tierConfig],
        url: `/demo?id=${demo.id}`
    }));

    return {
        demos,
        isLoading,
        error
    };
}
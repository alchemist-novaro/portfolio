import { useQuery } from "@tanstack/react-query";
import type { TestimonialItem } from "@/types/packets";
import { apiRequest } from "@/lib/query-client";

const TESTIMONIALS_KEY = 'testimonials';

const mockTestimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "John Smith",
    role: "CEO",
    company: "TechCorp",
    content: "Exceptional AI solutions that transformed our business processes. Rostyslav's expertise in machine learning is unmatched.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    featured: true,
    created_at: new Date(),
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "CTO",
    company: "AI Innovations",
    content: "Outstanding work on our computer vision project. Delivered ahead of schedule with incredible attention to detail.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b886?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    featured: true,
    created_at: new Date(),
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Director",
    company: "DataFlow Inc",
    content: "The custom AI solution increased our efficiency by 300%. Rostyslav's approach to problem-solving is remarkable.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
    featured: true,
    created_at: new Date(),
  },
];

async function fetchTestimonials() {
  try {
    const response = await apiRequest("GET", "/testimonials", {
      useToken: false
    });
    if (response.status === 200) {
      return await response.json();
    }
  }
  catch {
    return mockTestimonials;
  }
}

export const useTestimonials = () => {
  const { data: testimonials, isLoading, error } = useQuery<TestimonialItem[]>({
    queryKey: [TESTIMONIALS_KEY],
    queryFn: fetchTestimonials,
    retry: false,
    staleTime: Infinity
  });

  return {
    testimonials,
    isLoading,
    error
  };
}
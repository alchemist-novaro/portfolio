import { useQuery } from "@tanstack/react-query";
import { type PortfolioData } from "@/types/packets";
import { apiRequest } from "@/lib/query-client";

const PORTFOLIO_DATA_KEY = 'portfolio-data';

async function fetchPortfolioData() {
  const domain = window.location.host.split(":")[0]
  const response = await apiRequest("GET", `https://admin.api.portfolio-app.online/data?domain=${domain}`, {
    useToken: false
  });
  if (response.status === 200) {
    return await response.json();
  }
  else return null;
}

export const usePortfolioData = () => {
  const { data: portfolioData, isLoading, error } = useQuery<PortfolioData>({
    queryKey: [PORTFOLIO_DATA_KEY],
    queryFn: fetchPortfolioData,
    retry: false,
    staleTime: Infinity
  });

  return {
    portfolioData,
    isLoading,
    error
  };
}
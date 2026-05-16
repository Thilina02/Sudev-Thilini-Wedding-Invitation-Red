import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import WeddingStats from "./pages/WeddingStats.tsx";
import { apiUrl } from "./lib/apiBase.ts";

const queryClient = new QueryClient();

const keepAlive = async () => {
  try {
    await fetch(apiUrl("/api/keep-alive"));
    console.log("Keep-alive ping sent.");
  } catch (err) {
    console.warn("Keep-alive ping failed:", err);
  }
};

const App = () => {

  useEffect(() => {
    keepAlive(); // ping on load

    // Ping every 4 minutes while tab is open
    const interval = setInterval(keepAlive, 4 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/wedding-stats" element={<WeddingStats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
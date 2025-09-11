import { useState } from "react";
import { Landing } from "./Landing";
import { Dashboard } from "./Dashboard";
import { Jobs } from "./Jobs";
import { Candidates } from "./Candidates";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard" | "jobs" | "candidates">("landing");

  // Simple routing for demo purposes
  if (currentView === "dashboard") {
    return <Dashboard />;
  }
  
  if (currentView === "jobs") {
    return <Jobs />;
  }
  
  if (currentView === "candidates") {
    return <Candidates />;
  }

  return <Landing />;
};

export default Index;

// src/types/index.ts
import React from "react";

// This is now the single, centralized definition for a 'Service'
export type Service = {
  serviceId: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  detailedDescription: string;
  keyPoints: string[];
};
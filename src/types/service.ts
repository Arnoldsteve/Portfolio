import React from "react";

export type Service = {
  serviceId: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  detailedDescription: string;
  keyPoints: string[];
};
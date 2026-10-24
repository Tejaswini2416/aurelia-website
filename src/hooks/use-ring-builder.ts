"use client";

import { useState } from "react";

export function useRingBuilder() {
  const [step, setStep] = useState(0);
  const [setting, setSetting] = useState(0);
  const [stone, setStone] = useState(0);
  const [metal, setMetal] = useState("18K Yellow Gold");
  const [size, setSize] = useState("6");

  return { step, setStep, setting, setSetting, stone, setStone, metal, setMetal, size, setSize };
}

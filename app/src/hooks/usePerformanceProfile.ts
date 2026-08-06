import { useEffect, useState } from "react";

export interface PerformanceProfile { lowPower: boolean; devicePixelRatio: [number, number]; }

function getLowPowerProfile() {
  const browserNavigator = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string }; deviceMemory?: number };
  const connection = browserNavigator.connection;
  const memory = browserNavigator.deviceMemory ?? 8;
  const cores = navigator.hardwareConcurrency ?? 8;
  return memory <= 4 || cores <= 4 || connection?.saveData === true || connection?.effectiveType === "2g" || connection?.effectiveType === "3g";
}

export function usePerformanceProfile(): PerformanceProfile {
  const [lowPower, setLowPower] = useState(false);
  useEffect(() => { setLowPower(getLowPowerProfile()); }, []);
  return { lowPower, devicePixelRatio: lowPower ? [1, 1.2] : [1, 1.6] };
}
import { useState, useEffect, useCallback } from "react";

export type StageStatus = "none" | "studying" | "integrating" | "complete";

export interface StageProgress {
  [stageNum: number]: StageStatus;
}

const STORAGE_KEY = "sadhana_os_progress";

function loadProgress(): StageProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StageProgress;
  } catch {
    return {};
  }
}

function saveProgress(progress: StageProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // silent
  }
}

export function useStageProgress() {
  const [progress, setProgress] = useState<StageProgress>(() => loadProgress());

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const setStageStatus = useCallback((stageNum: number, status: StageStatus) => {
    setProgress((prev) => {
      const next = { ...prev };
      if (status === "none") {
        delete next[stageNum];
      } else {
        next[stageNum] = status;
      }
      return next;
    });
  }, []);

  const getStageStatus = useCallback(
    (stageNum: number): StageStatus => {
      return progress[stageNum] ?? "none";
    },
    [progress]
  );

  const clearAll = useCallback(() => {
    setProgress({});
  }, []);

  const summary = {
    total: 18,
    studying: Object.values(progress).filter((s) => s === "studying").length,
    integrating: Object.values(progress).filter((s) => s === "integrating").length,
    complete: Object.values(progress).filter((s) => s === "complete").length,
    touched: Object.keys(progress).length,
  };

  return { progress, setStageStatus, getStageStatus, clearAll, summary };
}

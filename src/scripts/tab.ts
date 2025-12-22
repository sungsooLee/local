/**
 * 내부 공통 탭 활성화 처리
 */
function applyTabState(root: HTMLElement, activeTab: HTMLButtonElement) {
  const tabs = root.querySelectorAll<HTMLButtonElement>('[role="tab"]');
  const panels = root.querySelectorAll<HTMLElement>('[role="tabpanel"]');

  tabs.forEach((tab) => {
    const isActive = tab === activeTab;
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });

  panels.forEach((panel) => {
    panel.hidden = panel.id !== activeTab.getAttribute("aria-controls");
  });
}

/**
 * 🔹 외부에서 사용하는 단일 API
 * 사용법: setActiveTab(0 | 1 | 2 ...)
 */
export function setActiveTab(index: number): void {
  const run = () => {
    const root = document.querySelector<HTMLElement>(".tabs");
    if (!root) return;

    const tabs = root.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    const tab = tabs[index];
    if (!tab) return;

    applyTabState(root, tab);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
}

// 👇 개발용 노출
if (import.meta.env?.DEV ?? true) {
  (window as any).setActiveTab = setActiveTab;
}

/**
 * 🔹 이벤트 초기화 (1번만)
 */
function initTabs() {
  // 클릭 이벤트
  document.addEventListener("click", (e) => {
    const tab = (e.target as HTMLElement).closest(
      '[role="tab"]'
    ) as HTMLButtonElement | null;
    if (!tab) return;

    const root = tab.closest(".tabs") as HTMLElement | null;
    if (!root) return;

    applyTabState(root, tab);
  });

  // URL 파라미터 초기 탭
  const params = new URLSearchParams(window.location.search);
  const index = Number(params.get("tab"));

  if (!Number.isNaN(index)) {
    setActiveTab(index);
  }
}

// 초기화 실행
initTabs();

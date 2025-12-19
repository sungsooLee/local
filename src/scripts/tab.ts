document.addEventListener("click", (e) => {
  // 클릭한 요소가 [role="tab"]인지 확인
  const tab = (e.target as HTMLElement).closest(
    '[role="tab"]'
  ) as HTMLButtonElement | null;
  if (!tab) return;

  // 해당 탭이 속한 .tabs 컨테이너 찾기
  const root = tab.closest(".tabs") as HTMLElement | null;
  if (!root) return;

  const tabs = Array.from(
    root.querySelectorAll('[role="tab"]')
  ) as HTMLButtonElement[];
  const panels = Array.from(
    root.querySelectorAll('[role="tabpanel"]')
  ) as HTMLElement[];

  // aria-selected 업데이트
  tabs.forEach((t) => {
    t.setAttribute("aria-selected", String(t === tab));
    t.tabIndex = t === tab ? 0 : -1; // 이제 안전하게 사용 가능
  });

  // 패널 표시/숨김
  panels.forEach((panel) => {
    panel.hidden = panel.id !== tab.getAttribute("aria-controls"); // 안전하게 사용 가능
  });
});

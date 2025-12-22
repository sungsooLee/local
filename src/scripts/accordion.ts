class Accordion {
  static init() {
    // 초기 열림 상태 처리
    document
      .querySelectorAll<HTMLElement>(".accordion-item")
      .forEach((item) => {
        if (item.dataset.open === "true") item.classList.add("is-open");
      });

    // 이벤트 위임
    document.addEventListener("click", Accordion.handleClick);
  }

  private static handleClick(e: MouseEvent) {
    const target = e.target as HTMLElement;

    // accordion-header가 아니면 무시
    const header = target.closest(".accordion-header");
    if (!header) return;

    const item = header.closest(".accordion-item") as HTMLElement | null;
    const accordion = header.closest(".accordion") as HTMLElement | null;

    if (!item || !accordion) return;

    const singleOpen = accordion.dataset.singleOpen === "true";
    const isOpen = item.classList.contains("is-open");

    if (singleOpen) {
      // 하나만 열림
      accordion
        .querySelectorAll(".accordion-item")
        .forEach((el) => el.classList.remove("is-open"));

      if (!isOpen) {
        item.classList.add("is-open");
      }
    } else {
      // 각각 토글
      item.classList.toggle("is-open");
    }
  }
}

// 초기화
Accordion.init();

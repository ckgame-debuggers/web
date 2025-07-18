// 콘솔 스타일링 유틸리티

type ConsoleStyle = {
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  padding?: string;
  borderRadius?: string;
  textShadow?: string;
  border?: string;
  background?: string;
};

export const prettyConsole = {
  log: (message: string, style: ConsoleStyle = {}) => {
    const css = Object.entries(style)
      .map(
        ([key, value]) =>
          `${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`
      )
      .join("; ");

    console.log(`%c${message}`, css);
  },

  success: (message: string) => {
    console.log(
      `%c✅ ${message}`,
      "color: #10b981; font-size: 16px; font-weight: bold;"
    );
  },

  error: (message: string) => {
    console.log(
      `%c❌ ${message}`,
      "color: #ef4444; font-size: 16px; font-weight: bold;"
    );
  },

  warning: (message: string) => {
    console.log(
      `%c⚠️ ${message}`,
      "color: #f59e0b; font-size: 16px; font-weight: bold;"
    );
  },

  info: (message: string) => {
    console.log(
      `%cℹ️ ${message}`,
      "color: #3b82f6; font-size: 16px; font-weight: bold;"
    );
  },

  // 디버거즈 브랜딩
  brand: (message: string) => {
    console.log(
      `%c🎮 ${message}`,
      "background: linear-gradient(45deg, oklch(0.7092 0.1954 46.01) 0%, #ff3512 100%); color: white; padding: 10px 20px; border-radius: 10px; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);"
    );
  },

  // Discord 관련
  discord: (message: string) => {
    console.log(
      `%c💬 ${message}`,
      "background: #5865f2; color: white; padding: 8px 16px; border-radius: 8px; font-size: 16px; font-weight: bold;"
    );
  },

  // 게임스쿨 브랜딩
  gameschool: (message: string) => {
    console.log(
      `%c${message}`,
      "background: linear-gradient(45deg, oklch(0.7092 0.1954 46.01), #ff3512); color: white; padding: 10px 20px; border-radius: 10px; font-size: 18px; font-weight: bold;"
    );
  },

  // 테이블 형태로 출력
  table: (data: any[], title?: string) => {
    if (title) {
      console.log(
        `%c${title}`,
        "color: #8b5cf6; font-size: 18px; font-weight: bold; margin-bottom: 10px;"
      );
    }
    console.table(data);
  },

  // 그룹으로 출력
  group: (label: string, callback: () => void) => {
    console.group(
      `%c${label}`,
      "color: #8b5cf6; font-size: 16px; font-weight: bold;"
    );
    callback();
    console.groupEnd();
  },

  // 시간 측정
  time: (label: string, callback: () => void) => {
    console.time(label);
    callback();
    console.timeEnd(label);
  },
};

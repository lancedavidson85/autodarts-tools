export function waitForElement(selector: string | string[], timeout = 3000): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      if (Array.isArray(selector)) {
        for (const sel of selector) {
          const element = document.querySelector(sel);
          if (element) {
            clearInterval(timer);
            // @ts-expect-error
            resolve(element);
            return;
          }
        }
      } else {
        const element = document.querySelector(selector);
        if (element) {
          clearInterval(timer);
          // @ts-expect-error
          resolve(element);
          return;
        }
      }

      if (Date.now() - startTime >= timeout) {
        clearInterval(timer);
        reject(new Error(`Timeout waiting for element ${selector}`));
      }
    }, 100);
  });
}

export function waitForElementWithTextContent(selector: string | string[], textContent: string, timeout = 3000): Promise<HTMLElement> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      if (Array.isArray(selector)) {
        for (const sel of selector) {
          const elements = document.querySelectorAll(sel);
          for (const element of elements) {
            if (element.textContent === textContent) {
              clearInterval(timer);
              resolve(element as HTMLElement);
              return;
            }
          }
        }
      } else {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          if (element.textContent === textContent) {
            clearInterval(timer);
            resolve(element as HTMLElement);
            return;
          }
        }
      }

      if (Date.now() - startTime >= timeout) {
        clearInterval(timer);
        reject(new Error(`Timeout waiting for element ${selector} with text content ${textContent}`));
      }
    }, 100);
  });
}

export function addStyles(css: string) {
  const style = document.createElement("style");
  style.innerHTML = css;
  document.getElementsByTagName("head")[0].appendChild(style);
}

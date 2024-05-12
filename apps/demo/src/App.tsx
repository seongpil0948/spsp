// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import './App.css';
import { Button } from '@spsp/buttons';
import {
  onLCP,
  onFID,
  onCLS,
  type Metric,
  onFCP,
  onINP,
  onTTFB,
} from 'web-vitals';
// for detail diagnostic information
// import { onLCP, onFID, onCLS, CLSReportCallbackWithAttribution } from 'web-vitals/attribution';

// https://github.com/puppeteer/puppeteer
// https://github.com/GoogleChrome/web-vitals
// https://web.dev/articles/vitals
// https://web.dev/articles/how-to-measure-speed
// https://blog.logrocket.com/how-to-practically-use-performance-api-to-measure-performance/
// https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
// https://developer.chrome.com/blog/performance-observer?hl=
// https://vuejs.org/guide/best-practices/performance.html
// https://medium.com/%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98%ED%92%88%EA%B2%A9/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%9D%98-%EB%A0%8C%EB%8D%94%EB%A7%81-%EA%B3%BC%EC%A0%95-5c01c4158ce
// https://oliviakim.tistory.com/80
function logDelta({ name, id, delta }: Metric) {
  console.log(`${name} matching ID ${id} changed by ${delta}`);
}

class PerformanceMetrics {
  private observer: PerformanceObserver;

  constructor() {
    this.observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('entry ===> ', entry);
      }
    });
  }

  startMeasuring() {
    this.observer.observe({ type: 'paint', buffered: true });
    this.observer.observe({ type: 'largest-contentful-paint', buffered: true });
    this.observer.observe({ type: 'first-input', buffered: true });
    this.observer.observe({ type: 'layout-shift', buffered: true });
  }

  stopMeasuring() {
    this.observer.disconnect();
  }
}

function App() {
  const metrics = new PerformanceMetrics();
  metrics.startMeasuring();
  // useEffect(() => {});
  onCLS(logDelta);
  onFID(logDelta);
  onLCP(logDelta);
  onFCP(logDelta);
  onINP(logDelta);
  onTTFB(logDelta);
  return (
    <>
      <h1>Speed Inspector</h1>
      <div className="card">
        <Button />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <img src="/images/5MB.png"></img>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

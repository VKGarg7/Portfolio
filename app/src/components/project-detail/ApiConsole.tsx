import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { ApiEndpoint, CaseStudy } from "../../data/content";

const METHOD_TONE: Record<ApiEndpoint["method"], string> = {
  GET: "method-get",
  POST: "method-post",
  PUT: "method-put",
  PATCH: "method-patch",
  DELETE: "method-delete",
};

export function ApiConsole({ cs }: { cs: CaseStudy }) {
  const [active, setActive] = useState(0);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ latency: number } | null>(null);
  const endpoint = cs.apiEndpoints[active];

  function send() {
    setSending(true);
    setResult(null);
    const latency = 80 + Math.round(Math.random() * 140);
    window.setTimeout(() => {
      setSending(false);
      setResult({ latency });
    }, 650);
  }

  return (
    <section id="api" className="detail-section">
      <motion.div
        className="detail-section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="mono-label">API LAYER</span>
        <h2>A live console over the real endpoint contracts.</h2>
      </motion.div>

      <div className="api-console">
        <div className="api-endpoint-list">
          {cs.apiEndpoints.map((ep, i) => (
            <button
              key={ep.path + ep.method}
              className={`api-endpoint-row ${i === active ? "is-active" : ""}`}
              onClick={() => { setActive(i); setResult(null); }}
            >
              <span className={`api-method ${METHOD_TONE[ep.method]}`}>{ep.method}</span>
              <span className="api-path">{ep.path}</span>
              {ep.auth && <i className="fas fa-lock api-auth-icon" title="Requires authentication" />}
            </button>
          ))}
        </div>

        <div className="api-console-panel">
          <div className="api-console-header">
            <span className={`api-method ${METHOD_TONE[endpoint.method]}`}>{endpoint.method}</span>
            <code className="api-path-full">{endpoint.path}</code>
            {endpoint.auth && <span className="api-auth-badge"><i className="fas fa-lock" /> Bearer token</span>}
          </div>
          <p className="api-summary">{endpoint.summary}</p>

          <button className="api-send-btn" onClick={send} disabled={sending}>
            <i className={`fas ${sending ? "fa-spinner fa-spin" : "fa-play"}`} />
            {sending ? "Sending…" : "Send request"}
          </button>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={active + "-result"}
                className="api-response"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="api-response-status">
                  <span className="api-status-ok"><i className="fas fa-circle-check" /> 200 OK</span>
                  <span className="api-latency">{result.latency}ms</span>
                </div>
                <pre className="api-response-body"><code>{endpoint.sampleResponse}</code></pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

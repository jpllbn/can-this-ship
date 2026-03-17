import { useState } from "react";

const sections = [
  {
    title: "Error Handling",
    items: [
      "Every external call has a timeout",
      "Database failures don't crash the app",
      "API responses are validated before use",
      "User inputs are sanitized and validated",
      "All errors have a recoverable path or clear fallback",
    ],
  },
  {
    title: "Deployment",
    items: [
      "Deployment is documented and repeatable",
      "No tribal knowledge required to ship",
      "Environment variables are documented",
      "Build process is automated (CI/CD)",
      "Rollback procedure exists and is tested",
    ],
  },
  {
    title: "Security",
    items: [
      "No secrets or credentials in the codebase",
      "All secrets are in environment variables or a secrets manager",
      "Dependencies are audited for known vulnerabilities",
      "Auth tokens expire and rotate",
      "Inputs are protected against injection attacks",
    ],
  },
  {
    title: "Observability",
    items: [
      "Structured logs exist (not console.log debris)",
      "Logs capture what, when, and why — not just that something happened",
      "Errors are tracked in a monitoring tool",
      "Alerts fire before users notice outages",
      "Dashboards show real-time service health",
    ],
  },
  {
    title: "Performance",
    items: [
      "Load tested under realistic traffic",
      "Bottlenecks identified and documented",
      "Database queries are indexed appropriately",
      "Response times measured at p95 and p99",
      "Rate limiting is in place",
    ],
  },
  {
    title: "Resilience",
    items: [
      "Failure scenarios have been tested (kill the DB, flood the API)",
      "Service degrades gracefully under load",
      "Retries exist with backoff — not hammer loops",
      "Circuit breakers protect downstream services",
      "Data backups exist and restore has been tested",
    ],
  },
  {
    title: "Operability",
    items: [
      "Someone who didn't write it can diagnose a 2am outage",
      "Runbooks exist for common failure modes",
      "On-call rotation is defined",
      "Incident response process is documented",
      "Post-mortems are written after significant failures",
    ],
  },
  {
    title: "Compliance & Legal",
    items: [
      "Applicable regulations identified (GDPR, HIPAA, PCI-DSS, SOC 2, etc.)",
      "Personal data handling documented and lawful basis established",
      "Data retention and deletion policies defined",
      "Privacy policy and terms of service are current",
      "Third-party data processors have signed DPAs where required",
    ],
  },
  {
    title: "Data Integrity",
    items: [
      "Database migrations run without downtime",
      "Schema changes don't corrupt existing records",
      "Backup restore tested against realistic data volume",
      "Data consistency verified across services",
      "Soft deletes or audit history preserved where needed",
    ],
  },
  {
    title: "High Availability",
    items: [
      "Single points of failure identified and addressed",
      "Failover tested — not just configured",
      "DNS routing behaves correctly under failure",
      "Multi-region or redundancy requirements are met",
      "SLA targets are defined and achievable with current architecture",
    ],
  },
  {
    title: "Third-Party Dependencies",
    items: [
      "Critical external services have fallback behavior",
      "App degrades gracefully when a vendor is down",
      "Vendor SLAs reviewed and acceptable",
      "Dependency versions pinned and reviewed for breaking changes",
      "Outage communication plan exists for vendor failures",
    ],
  },
  {
    title: "Access Control & Audit",
    items: [
      "Principle of least privilege applied to all roles",
      "Admin access is logged and auditable",
      "Sensitive actions produce an audit trail",
      "Offboarding removes access immediately",
      "Service accounts have scoped permissions — not superuser",
    ],
  },
  {
    title: "Capacity Planning",
    items: [
      "Current headroom under peak load is known",
      "Scaling strategy defined (vertical, horizontal, auto-scaling)",
      "Scaling tested — not just theorized",
      "Cost at 10x current traffic is estimated",
      "Alerts exist for capacity thresholds, not just outages",
    ],
  },
  {
    title: "User-Facing Documentation",
    items: [
      "Error messages are human-readable and actionable",
      "Edge cases are documented for users",
      "Support path exists when things go wrong",
      "Onboarding covers likely points of confusion",
      "Status page or communication channel exists for incidents",
    ],
  },
];

export default function App() {
  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0);
  const [checked, setChecked] = useState({});

  const toggle = (key) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const getStatusLabel = () => {
    if (progress === 100) return "Ship it.";
    if (progress >= 75) return "Almost there.";
    if (progress >= 40) return "In progress.";
    return "Not ready.";
  };

  const getStatusColor = () => {
    if (progress === 100) return "#22c55e";
    if (progress >= 75) return "#f59e0b";
    if (progress >= 40) return "#f97316";
    return "#ef4444";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0c0c0f",
      color: "#e8e6e1",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      padding: "48px 24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1a1a1f; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        .check-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          cursor: pointer;
          border-bottom: 1px solid #1e1e24;
          transition: background 0.1s;
          user-select: none;
        }
        .check-item:last-child { border-bottom: none; }
        .check-item:hover .label { color: #fff; }
        .checkbox {
          width: 16px;
          height: 16px;
          border: 1px solid #444;
          border-radius: 2px;
          flex-shrink: 0;
          margin-top: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .checkbox.done {
          background: #22c55e;
          border-color: #22c55e;
        }
        .label {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 14px;
          line-height: 1.5;
          color: #b0ad a6;
          transition: color 0.15s;
        }
        .label.done {
          color: #555;
          text-decoration: line-through;
          text-decoration-color: #444;
        }
        .section-card {
          background: #13131a;
          border: 1px solid #1e1e28;
          border-radius: 6px;
          padding: 20px 24px;
          margin-bottom: 16px;
        }
        .section-title {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #666;
          margin-bottom: 12px;
        }
        .progress-bar-outer {
          width: 100%;
          height: 3px;
          background: #1e1e28;
          border-radius: 2px;
          overflow: hidden;
          margin-top: 8px;
        }
        .progress-bar-inner {
          height: 100%;
          border-radius: 2px;
          transition: width 0.4s cubic-bezier(0.4,0,0.2,1), background 0.4s;
        }
        .reset-btn {
          background: none;
          border: 1px solid #2a2a35;
          color: #555;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          padding: 6px 14px;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 0.05em;
          transition: all 0.15s;
        }
        .reset-btn:hover { border-color: #444; color: #888; }
      `}</style>

      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#444",
            marginBottom: 12,
          }}>
            Production Readiness
          </div>
          <h1 style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 28,
            fontWeight: 300,
            color: "#f0ede8",
            letterSpacing: "-0.01em",
            marginBottom: 24,
          }}>
            Can this ship?
          </h1>

          {/* Progress */}
          <div style={{
            background: "#13131a",
            border: "1px solid #1e1e28",
            borderRadius: 6,
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div>
              <div style={{
                fontSize: 32,
                fontWeight: 600,
                color: getStatusColor(),
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}>
                {progress}%
              </div>
              <div style={{
                fontSize: 12,
                color: "#555",
                marginTop: 4,
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}>
                {checkedCount} of {totalItems} — {getStatusLabel()}
              </div>
            </div>
            <button className="reset-btn" onClick={() => setChecked({})}>
              Reset
            </button>
          </div>

          <div className="progress-bar-outer" style={{ marginTop: 12 }}>
            <div
              className="progress-bar-inner"
              style={{
                width: `${progress}%`,
                background: getStatusColor(),
              }}
            />
          </div>
        </div>

        {/* Sections */}
        {sections.map((section) => {
          const sectionChecked = section.items.filter(
            (item) => checked[`${section.title}:${item}`]
          ).length;

          return (
            <div key={section.title} className="section-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="section-title">{section.title}</div>
                <div style={{
                  fontSize: 11,
                  color: sectionChecked === section.items.length ? "#22c55e" : "#444",
                  fontVariantNumeric: "tabular-nums",
                  transition: "color 0.2s",
                }}>
                  {sectionChecked}/{section.items.length}
                </div>
              </div>
              {section.items.map((item) => {
                const key = `${section.title}:${item}`;
                const isDone = !!checked[key];
                return (
                  <div
                    key={item}
                    className="check-item"
                    onClick={() => toggle(key)}
                  >
                    <div className={`checkbox${isDone ? " done" : ""}`}>
                      {isDone && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#0c0c0f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className={`label${isDone ? " done" : ""}`}>{item}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
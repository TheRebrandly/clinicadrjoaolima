"use client";

import {
  Activity,
  BarChart3,
  Bot,
  CalendarDays,
  ChevronRight,
  ClipboardCheck,
  DollarSign,
  Download,
  FileText,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  Search,
  Send,
  Settings,
  Sparkles,
  Users,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  analytics,
  appointments,
  automations,
  clinic,
  compliance,
  conversations,
  dashboard,
  finance,
  modules,
  patients
} from "@/lib/data";

const icons = {
  dashboard: LayoutDashboard,
  patients: Users,
  schedule: CalendarDays,
  inbox: MessageCircle,
  automations: Bot,
  social: Send,
  finance: DollarSign,
  analytics: BarChart3,
  compliance: LockKeyhole
};

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function Panel({ children, className = "" }) {
  return <section className={`panel ${className}`}>{children}</section>;
}

function SectionTitle({ label, title, action }) {
  return (
    <div className="section-title">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Progress({ value, tone = "gold" }) {
  return (
    <div className="progress">
      <span className={`progress__bar progress__bar--${tone}`} style={{ width: `${value}%` }} />
    </div>
  );
}

function Sidebar({ activeView, onChangeView, isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? "is-open" : ""}`}>
      <div className="brand-row">
        <div className="brand-logo">
          <img src="/brand/dr-joao-lima-logo.svg" alt="Dr. Joao Lima Clinica Cirurgia Plastica" />
        </div>
        <button className="icon-button mobile-only" onClick={onClose} aria-label="Fechar menu">
          <X size={18} />
        </button>
      </div>

      <nav className="nav-list">
        {modules.map((item) => {
          const Icon = icons[item.id] ?? Settings;
          return (
            <button
              className={`nav-button ${activeView === item.id ? "is-active" : ""}`}
              key={item.id}
              onClick={() => onChangeView(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="integration-box">
        <p className="eyebrow">Integracoes</p>
        <ul>
          <li>Google Calendar</li>
          <li>WhatsApp Business API</li>
          <li>Stripe</li>
          <li>Meta Graph API</li>
        </ul>
      </div>
    </aside>
  );
}

function Topbar({ activeView, onOpenMenu }) {
  const title = modules.find((item) => item.id === activeView)?.label ?? "Dashboard";

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button className="icon-button mobile-only" onClick={onOpenMenu} aria-label="Abrir menu">
          <Menu size={18} />
        </button>
        <div>
          <p className="eyebrow">CRM omnichannel para clinica estetica</p>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="topbar__actions">
        <label className="search">
          <Search size={16} />
          <input aria-label="Buscar" placeholder="Buscar paciente, lead ou conversa" />
        </label>
        <button className="button button--secondary">
          <Download size={16} />
          Exportar
        </button>
        <button className="button">
          <Sparkles size={16} />
          Nova acao
        </button>
      </div>
    </header>
  );
}

function DashboardView() {
  const maxRevenue = Math.max(...dashboard.revenueByMonth);
  const maxFunnel = Math.max(...dashboard.funnels.map((item) => item.value));

  return (
    <div className="view-stack">
      <div className="metric-grid">
        {dashboard.kpis.map((kpi) => (
          <Panel className="metric-card" key={kpi.label}>
            <span>{kpi.label}</span>
            <strong>{kpi.value}</strong>
            <small>{kpi.change}</small>
          </Panel>
        ))}
      </div>

      <div className="grid grid--2">
        <Panel>
          <SectionTitle label="Receita" title="Evolucao mensal" action={<span className="badge">Forecast +5.8%</span>} />
          <div className="bar-chart">
            {dashboard.revenueByMonth.map((value, index) => (
              <div className="bar" key={`${value}-${index}`}>
                <span style={{ height: `${(value / maxRevenue) * 100}%` }} />
                <small>{months[index]}</small>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionTitle label="Funil" title="Lead ate fechamento" action={<span className="badge">IA scoring</span>} />
          <div className="rows">
            {dashboard.funnels.map((item) => (
              <div className="data-row" key={item.stage}>
                <div>
                  <strong>{item.stage}</strong>
                  <span>{item.value}</span>
                </div>
                <Progress value={(item.value / maxFunnel) * 100} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid--3">
        <Panel>
          <SectionTitle label="Assistente" title="Prioridades" />
          <ul className="plain-list">
            {dashboard.alerts.map((alert) => (
              <li key={alert}>{alert}</li>
            ))}
          </ul>
        </Panel>
        <Panel>
          <SectionTitle label="Receita" title="Servicos" />
          <div className="rows">
            {finance.services.map((service) => (
              <div className="data-row" key={service.name}>
                <div>
                  <strong>{service.name}</strong>
                  <span>R$ {service.revenue} mil</span>
                </div>
                <Progress value={service.margin} tone="green" />
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="highlight-panel">
          <p className="eyebrow">Proxima melhor acao</p>
          <h2>Escalar campanha de rejuvenescimento com concierge automatizado.</h2>
          <p>Leads com score acima de 80 estao convertendo melhor em uma janela de 72 horas.</p>
          <button className="button">
            <ChevronRight size={16} />
            Aplicar sugestao
          </button>
        </Panel>
      </div>
    </div>
  );
}

function PatientsView() {
  const [selectedId, setSelectedId] = useState(patients[0].id);
  const selected = patients.find((patient) => patient.id === selectedId) ?? patients[0];

  return (
    <div className="grid grid--patient">
      <Panel>
        <SectionTitle label="CRM clinico" title="Pacientes" action={<span className="badge">3 ativos</span>} />
        <div className="rows">
          {patients.map((patient) => (
            <button
              className={`patient-row ${selected.id === patient.id ? "is-active" : ""}`}
              key={patient.id}
              onClick={() => setSelectedId(patient.id)}
            >
              <span className="avatar">{patient.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
              <span>
                <strong>{patient.name}</strong>
                <small>{patient.segment} · {patient.treatment}</small>
              </span>
              <em>{patient.score}</em>
            </button>
          ))}
        </div>
      </Panel>

      <Panel>
        <SectionTitle
          label={`${selected.id} · ${selected.segment}`}
          title={selected.name}
          action={<span className="badge">{selected.consent}</span>}
        />
        <div className="detail-grid">
          <div><span>Status</span><strong>{selected.status}</strong></div>
          <div><span>Tratamento</span><strong>{selected.treatment}</strong></div>
          <div><span>Valor</span><strong>{selected.value}</strong></div>
          <div><span>Proxima etapa</span><strong>{selected.next}</strong></div>
          <div><span>Risco</span><strong>{selected.risk}</strong></div>
          <div><span>Canais</span><strong>{selected.channels.join(", ")}</strong></div>
        </div>
        <div className="split">
          <div>
            <p className="eyebrow">Timeline</p>
            <ul className="plain-list">
              {selected.timeline.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="note-box">
            <p className="eyebrow">AI treatment suggestion</p>
            <p>Priorizar conteudo educativo, prova social clinica e agendamento com concierge.</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function ScheduleView() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const visibleAppointments = calendarEvents.length ? calendarEvents : appointments;

  useEffect(() => {
    let ignore = false;

    async function loadCalendar() {
      try {
        const response = await fetch("/api/calendar");
        const data = await response.json();

        if (!ignore && Array.isArray(data.events)) {
          setCalendarEvents(data.events);
        }
      } catch {
        if (!ignore) setCalendarEvents([]);
      }
    }

    loadCalendar();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Panel>
      <SectionTitle
        label="Agenda multi-provedor"
        title="Hoje, 29 de abril"
        action={<span className="badge">{calendarEvents.length ? "Google conectado" : "Google Calendar"}</span>}
      />
      <div className="table">
        {visibleAppointments.map((item) => (
          <div className="table-row" key={`${item.time}-${item.patient}`}>
            <strong>{item.time}</strong>
            <span>{item.patient}</span>
            <span>{item.type}</span>
            <span>{item.provider}</span>
            <em>{item.status}</em>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function InboxView() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const current = conversations[selectedIndex];

  return (
    <div className="grid grid--inbox">
      <Panel>
        <SectionTitle label="Omnichannel" title="Conversas" action={<span className="badge">32 abertas</span>} />
        <div className="rows">
          {conversations.map((conversation, index) => (
            <button
              className={`conversation-row ${selectedIndex === index ? "is-active" : ""}`}
              key={conversation.name}
              onClick={() => setSelectedIndex(index)}
            >
              <span>
                <strong>{conversation.name}</strong>
                <small>{conversation.channel} · {conversation.owner}</small>
              </span>
              <em>{conversation.tag}</em>
            </button>
          ))}
        </div>
      </Panel>
      <Panel className="thread">
        <SectionTitle label={current.channel} title={current.name} action={<span className="badge">{current.owner}</span>} />
        <div className="messages">
          {current.messages.map((message, index) => (
            <p className={index % 2 ? "message message--team" : "message"} key={message}>{message}</p>
          ))}
        </div>
        <div className="composer">
          <Mail size={16} />
          <span>Resposta assistida por IA pronta para revisao</span>
          <button className="button">
            <Send size={16} />
            Enviar
          </button>
        </div>
      </Panel>
    </div>
  );
}

function AutomationsView() {
  return (
    <div className="grid grid--3">
      {automations.map((flow) => (
        <Panel key={flow.name}>
          <p className="eyebrow">{flow.trigger}</p>
          <h2>{flow.name}</h2>
          <div className="automation-meta">
            <span className="badge">{flow.status}</span>
            <strong>{flow.conversion}</strong>
          </div>
          <Progress value={Number(flow.conversion.replace("%", "")) * 2} />
        </Panel>
      ))}
    </div>
  );
}

function SocialView() {
  return (
    <div className="grid grid--2">
      <Panel>
        <SectionTitle label="Social" title="Contas conectadas" />
        <div className="detail-grid">
          <div><span>Instagram</span><strong>@drjoaolima</strong></div>
          <div><span>Seguidores</span><strong>84.2k</strong></div>
          <div><span>Engajamento</span><strong>4.8%</strong></div>
          <div><span>Leads gerados</span><strong>146</strong></div>
        </div>
      </Panel>
      <Panel>
        <SectionTitle label="Calendario" title="Conteudo planejado" />
        <div className="table">
          {["Antes e depois aprovado", "FAQ blefaroplastia em revisao", "Bastidores cirurgia agendado"].map((item) => (
            <div className="table-row table-row--simple" key={item}>
              <FileText size={16} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function FinanceView() {
  return (
    <div className="view-stack">
      <div className="metric-grid">
        {finance.summary.map((item) => (
          <Panel className="metric-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </Panel>
        ))}
      </div>
      <Panel>
        <SectionTitle label="Financeiro" title="Receita por servico" action={<span className="badge">Stripe conectado</span>} />
        <div className="rows">
          {finance.services.map((service) => (
            <div className="data-row" key={service.name}>
              <div>
                <strong>{service.name}</strong>
                <span>R$ {service.revenue} mil · margem {service.margin}%</span>
              </div>
              <Progress value={service.margin} tone="blue" />
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function AnalyticsView() {
  return (
    <Panel>
      <SectionTitle label="Performance" title="Canais, ROI e satisfacao" action={<span className="badge">Exportavel</span>} />
      <div className="rows">
        {analytics.map((item) => (
          <div className="data-row data-row--analytics" key={item.channel}>
            <strong>{item.channel}</strong>
            <span>Conversao {item.conversion}%</span>
            <Progress value={item.conversion * 2} tone="gold" />
            <span>Satisfacao {item.satisfaction}%</span>
            <Progress value={item.satisfaction} tone="green" />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function ComplianceView() {
  return (
    <div className="grid grid--2">
      <Panel>
        <SectionTitle label="Seguranca" title="Governanca de dados" action={<span className="badge">GDPR/LGPD</span>} />
        <ul className="plain-list">
          {compliance.map((item) => (
            <li key={item.item}><strong>{item.item}:</strong> {item.status}</li>
          ))}
        </ul>
      </Panel>
      <Panel>
        <SectionTitle label="Acesso" title="Perfis operacionais" />
        <div className="detail-grid">
          <div><span>Admin</span><strong>Acesso completo</strong></div>
          <div><span>Recepcao</span><strong>Leads, agenda, inbox</strong></div>
          <div><span>Medico</span><strong>Prontuario e consentimento</strong></div>
          <div><span>Auditoria</span><strong>Logs sincronizados</strong></div>
        </div>
      </Panel>
    </div>
  );
}

function ActiveView({ view }) {
  const viewMap = {
    dashboard: <DashboardView />,
    patients: <PatientsView />,
    schedule: <ScheduleView />,
    inbox: <InboxView />,
    automations: <AutomationsView />,
    social: <SocialView />,
    finance: <FinanceView />,
    analytics: <AnalyticsView />,
    compliance: <ComplianceView />
  };

  return viewMap[view] ?? viewMap.dashboard;
}

export default function Home() {
  const [activeView, setActiveView] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  function changeView(view) {
    setActiveView(view);
    setMenuOpen(false);
  }

  return (
    <main className="app-shell">
      <Sidebar
        activeView={activeView}
        isOpen={menuOpen}
        onChangeView={changeView}
        onClose={() => setMenuOpen(false)}
      />
      <div className="workspace">
        <Topbar activeView={activeView} onOpenMenu={() => setMenuOpen(true)} />
        <ActiveView view={activeView} />
      </div>
    </main>
  );
}

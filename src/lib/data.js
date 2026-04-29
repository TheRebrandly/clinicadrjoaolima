export const clinic = {
  name: "Atelier CRM",
  subtitle: "Dr. Joao Lima",
  descriptor: "Cirurgia Plastica e Medicina Estetica"
};

export const modules = [
  { id: "dashboard", label: "Dashboard" },
  { id: "patients", label: "Pacientes" },
  { id: "schedule", label: "Agenda" },
  { id: "inbox", label: "Inbox" },
  { id: "automations", label: "Automacoes" },
  { id: "social", label: "Social" },
  { id: "finance", label: "Financeiro" },
  { id: "analytics", label: "Analytics" },
  { id: "compliance", label: "Compliance" }
];

export const dashboard = {
  kpis: [
    { label: "Receita mensal", value: "R$ 482 mil", change: "+12.4%" },
    { label: "Conversao", value: "38%", change: "+4.1%" },
    { label: "No-show", value: "6.8%", change: "-1.2%" },
    { label: "Pacientes VIP", value: "126", change: "+9" }
  ],
  revenueByMonth: [220, 260, 245, 310, 348, 402, 384, 430, 456, 482, 468, 510],
  funnels: [
    { stage: "Leads captados", value: 420 },
    { stage: "Qualificados por IA", value: 312 },
    { stage: "Consultas agendadas", value: 196 },
    { stage: "Procedimentos fechados", value: 82 }
  ],
  alerts: [
    "17 pacientes precisam de follow-up pos-procedimento nas proximas 24h.",
    "3 fluxos de reativacao tiveram CTR acima da meta.",
    "1 conflito do Google Calendar exige revisao."
  ]
};

export const patients = [
  {
    id: "P-1048",
    name: "Marina Carvalho",
    segment: "VIP",
    age: 42,
    city: "Sao Paulo",
    status: "Pre-op",
    treatment: "Blefaroplastia + bioestimulador",
    value: "R$ 48 mil",
    next: "02 Mai, 09:30",
    consent: "Assinado",
    score: 92,
    risk: "Baixo",
    channels: ["WhatsApp", "Instagram"],
    timeline: [
      "Consulta aprovada e plano cirurgico revisado.",
      "Pagamento de entrada confirmado via Stripe.",
      "Mensagem sobre recuperacao respondida pela IA."
    ]
  },
  {
    id: "P-1057",
    name: "Helena Prado",
    segment: "Ativa",
    age: 36,
    city: "Campinas",
    status: "Pos-procedimento",
    treatment: "Rinomodelacao + skin booster",
    value: "R$ 16 mil",
    next: "05 Mai, 14:15",
    consent: "Assinado",
    score: 74,
    risk: "Moderado",
    channels: ["Email", "WhatsApp"],
    timeline: [
      "Questionario de satisfacao respondido.",
      "Fotos de acompanhamento anexadas.",
      "Sessao concluida sem intercorrencias."
    ]
  },
  {
    id: "P-1069",
    name: "Patricia Nogueira",
    segment: "Novo lead",
    age: 49,
    city: "Rio de Janeiro",
    status: "Qualificacao",
    treatment: "Lifting facial",
    value: "R$ 0",
    next: "Aguardando",
    consent: "Pendente",
    score: 88,
    risk: "Baixo",
    channels: ["Instagram", "WhatsApp"],
    timeline: [
      "Entrou pelo Instagram apos campanha de rejuvenescimento.",
      "Chatbot qualificou interesse e faixa de investimento."
    ]
  }
];

export const appointments = [
  { time: "08:30", provider: "Dr. Joao Lima", patient: "Marina Carvalho", type: "Consulta pre-op", status: "Confirmada" },
  { time: "09:45", provider: "Dra. Fernanda", patient: "Helena Prado", type: "Follow-up facial", status: "Confirmada" },
  { time: "11:00", provider: "Consultora Ana", patient: "Patricia Nogueira", type: "Qualificacao premium", status: "Pendente" },
  { time: "15:00", provider: "Dr. Joao Lima", patient: "Renata Viana", type: "Avaliacao cirurgica", status: "No-show risco" }
];

export const conversations = [
  {
    name: "Patricia Nogueira",
    channel: "Instagram DM",
    tag: "Lead quente",
    owner: "Ana",
    messages: [
      "Ola, vi o antes e depois no Instagram.",
      "Gostaria de entender tempo de recuperacao do lifting facial."
    ]
  },
  {
    name: "Helena Prado",
    channel: "WhatsApp",
    tag: "Pos-procedimento",
    owner: "Enf. Carla",
    messages: ["Enviei as fotos de hoje para avaliacao.", "Recebemos. A equipe vai revisar em breve."]
  },
  {
    name: "Marina Carvalho",
    channel: "Email",
    tag: "VIP",
    owner: "Dr. Joao Lima",
    messages: ["Enviamos o plano pre-operatorio revisado.", "Aprovado. Podemos seguir com a data sugerida."]
  }
];

export const automations = [
  { name: "Lead facial premium", trigger: "Instagram DM ou WhatsApp", status: "Ativo", conversion: "31%" },
  { name: "Pos-consulta cirurgica", trigger: "Consulta concluida", status: "Ativo", conversion: "22%" },
  { name: "Reativacao 120 dias", trigger: "Pacientes inativos", status: "Teste A/B", conversion: "14%" }
];

export const finance = {
  summary: [
    { label: "Receita recorrente", value: "R$ 181 mil" },
    { label: "Ticket medio", value: "R$ 12.480" },
    { label: "Comissoes", value: "R$ 38 mil" },
    { label: "Custos", value: "R$ 124 mil" }
  ],
  services: [
    { name: "Cirurgia facial", revenue: 188, margin: 62 },
    { name: "Injetaveis", revenue: 104, margin: 48 },
    { name: "Skin quality", revenue: 76, margin: 51 },
    { name: "Pos-procedimento", revenue: 44, margin: 38 }
  ]
};

export const analytics = [
  { channel: "Instagram", conversion: 21, satisfaction: 93 },
  { channel: "WhatsApp", conversion: 28, satisfaction: 96 },
  { channel: "Google", conversion: 19, satisfaction: 89 },
  { channel: "Indicacao", conversion: 42, satisfaction: 98 }
];

export const compliance = [
  { item: "Consentimento LGPD", status: "94%" },
  { item: "Autorizacao de imagem", status: "88%" },
  { item: "Controle de acesso por funcao", status: "Ativo" },
  { item: "Logs de auditoria", status: "Sincronizados" }
];

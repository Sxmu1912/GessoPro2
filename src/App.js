import React, { useState, useMemo, useEffect } from "react";
import {
  Maximize,
  Download,
  Ruler,
  Layers,
  Settings,
  Calculator,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Users,
  History,
  Trash2,
  Edit3,
  Copy,
  Search,
  Plus,
  Phone,
  Mail,
  MapPin,
  Save,
  FolderOpen,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ============================================
// COSTANTI - TIPI DI LASTRA
// ============================================
const TIPI_LASTRA = {
  standard: { label: "Standard", emoji: "📄", nome: "Standard" },
  habito: { label: "Habito Forte", emoji: "💪", nome: "Habito Forte" },
  duragyp: { label: "Duragyp", emoji: "🛡️", nome: "Duragyp" },
  hydro: { label: "Hydro (Idrofuga)", emoji: "💧", nome: "Hydro" },
  fireline: { label: "Fireline (Antincendio)", emoji: "🔥", nome: "Fireline" },
  glassroc: { label: "Glassroc (Esterno)", emoji: "🌧️", nome: "Glassroc" },
};

const OMEGA_DIMENSIONI = [
  { value: "1", label: "Omega 1 cm", key: "omega_1" },
  { value: "1.5", label: "Omega 1.5 cm", key: "omega_15" },
  { value: "2", label: "Omega 2 cm", key: "omega_2" },
  { value: "2.7", label: "Omega 2.7 cm", key: "omega_27" },
];

// ============================================
// LOGO GESSO PRO
// ============================================
const LogoGessoPro = ({ size = 40, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M50 2 L90 25 L90 75 L50 98 L10 75 L10 25 Z"
      fill="#0f172a"
      stroke="#fbbf24"
      strokeWidth="3"
    />
    <rect
      x="28"
      y="30"
      width="44"
      height="40"
      fill="#1e293b"
      stroke="#fbbf24"
      strokeWidth="2"
      rx="2"
    />
    <line
      x1="38"
      y1="32"
      x2="38"
      y2="68"
      stroke="#fbbf24"
      strokeWidth="1.5"
      opacity="0.6"
    />
    <line
      x1="50"
      y1="32"
      x2="50"
      y2="68"
      stroke="#fbbf24"
      strokeWidth="1.5"
      opacity="0.6"
    />
    <line
      x1="62"
      y1="32"
      x2="62"
      y2="68"
      stroke="#fbbf24"
      strokeWidth="1.5"
      opacity="0.6"
    />
    <circle cx="32" cy="35" r="1.5" fill="#fbbf24" />
    <circle cx="32" cy="65" r="1.5" fill="#fbbf24" />
    <circle cx="68" cy="35" r="1.5" fill="#fbbf24" />
    <circle cx="68" cy="65" r="1.5" fill="#fbbf24" />
    <text
      x="50"
      y="58"
      textAnchor="middle"
      fill="#fbbf24"
      fontSize="22"
      fontWeight="900"
      fontFamily="Arial, sans-serif"
      fontStyle="italic"
    >
      G
    </text>
  </svg>
);

const LogoHeader = ({ size = 32 }) => (
  <div className="flex items-center gap-2">
    <LogoGessoPro size={size} />
    <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-white">
      GESSO
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
        PRO
      </span>
    </h1>
  </div>
);

// ============================================
// COMPONENTE PREZZI
// ============================================
const PrezziTab = React.memo(({ listini, updateListino }) => {
  const InputField = ({ label, value, onChange }) => (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 p-3 md:p-4 rounded-xl md:rounded-2xl">
      <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1 md:mb-2 block tracking-wider">
        {label}
      </label>
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={onChange}
        className="w-full p-2 md:p-3 bg-slate-900/70 border border-slate-700 rounded-lg md:rounded-xl font-bold text-white text-sm md:text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
      />
    </div>
  );

  const SectionTitle = ({ children }) => (
    <h3 className="text-sm md:text-lg font-black text-white mb-3 md:mb-4 flex items-center gap-2">
      <span className="w-1 h-5 md:h-6 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></span>
      {children}
    </h3>
  );

  return (
    <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden mt-4 md:mt-6 max-h-[75vh] overflow-y-auto">
      <div className="p-4 md:p-6 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-amber-500/30 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/20 p-2 rounded-xl">
            <Settings size={16} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-xs md:text-sm font-black uppercase tracking-widest text-white">
              Listino Prezzi
            </h3>
            <p className="text-[9px] md:text-[10px] text-amber-400/70 font-mono">
              Configura i tuoi prezzi
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {/* LASTRE STANDARD */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>📄 Lastre Standard</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <InputField
              label="2.0m (€)"
              value={listini.lastra_standard_2 || 8.5}
              onChange={(e) =>
                updateListino("lastra_standard_2", e.target.value)
              }
            />
            <InputField
              label="2.5m (€)"
              value={listini.lastra_standard_25 || 9.5}
              onChange={(e) =>
                updateListino("lastra_standard_25", e.target.value)
              }
            />
            <InputField
              label="2.8m (€)"
              value={listini.lastra_standard_28 || 10.0}
              onChange={(e) =>
                updateListino("lastra_standard_28", e.target.value)
              }
            />
            <InputField
              label="3.0m (€)"
              value={listini.lastra_standard_3 || 10.5}
              onChange={(e) =>
                updateListino("lastra_standard_3", e.target.value)
              }
            />
          </div>
        </div>

        {/* HABITO FORTE */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>💪 Habito Forte</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <InputField
              label="2.0m (€)"
              value={listini.lastra_habito_2 || 18.0}
              onChange={(e) => updateListino("lastra_habito_2", e.target.value)}
            />
            <InputField
              label="2.5m (€)"
              value={listini.lastra_habito_25 || 20.0}
              onChange={(e) =>
                updateListino("lastra_habito_25", e.target.value)
              }
            />
            <InputField
              label="2.8m (€)"
              value={listini.lastra_habito_28 || 22.0}
              onChange={(e) =>
                updateListino("lastra_habito_28", e.target.value)
              }
            />
            <InputField
              label="3.0m (€)"
              value={listini.lastra_habito_3 || 24.0}
              onChange={(e) => updateListino("lastra_habito_3", e.target.value)}
            />
          </div>
        </div>

        {/* DURAGYP */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>🛡️ Duragyp</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <InputField
              label="2.0m (€)"
              value={listini.lastra_duragyp_2 || 15.0}
              onChange={(e) =>
                updateListino("lastra_duragyp_2", e.target.value)
              }
            />
            <InputField
              label="2.5m (€)"
              value={listini.lastra_duragyp_25 || 16.5}
              onChange={(e) =>
                updateListino("lastra_duragyp_25", e.target.value)
              }
            />
            <InputField
              label="2.8m (€)"
              value={listini.lastra_duragyp_28 || 18.0}
              onChange={(e) =>
                updateListino("lastra_duragyp_28", e.target.value)
              }
            />
            <InputField
              label="3.0m (€)"
              value={listini.lastra_duragyp_3 || 20.0}
              onChange={(e) =>
                updateListino("lastra_duragyp_3", e.target.value)
              }
            />
          </div>
        </div>

        {/* HYDRO */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>💧 Hydro (Idrofuga)</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <InputField
              label="2.0m (€)"
              value={listini.lastra_hydro_2 || 12.0}
              onChange={(e) => updateListino("lastra_hydro_2", e.target.value)}
            />
            <InputField
              label="2.5m (€)"
              value={listini.lastra_hydro_25 || 13.5}
              onChange={(e) => updateListino("lastra_hydro_25", e.target.value)}
            />
            <InputField
              label="2.8m (€)"
              value={listini.lastra_hydro_28 || 14.5}
              onChange={(e) => updateListino("lastra_hydro_28", e.target.value)}
            />
            <InputField
              label="3.0m (€)"
              value={listini.lastra_hydro_3 || 15.5}
              onChange={(e) => updateListino("lastra_hydro_3", e.target.value)}
            />
          </div>
        </div>

        {/* FIRELINE */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>🔥 Fireline (Antincendio)</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <InputField
              label="2.0m (€)"
              value={listini.lastra_fireline_2 || 15.0}
              onChange={(e) =>
                updateListino("lastra_fireline_2", e.target.value)
              }
            />
            <InputField
              label="2.5m (€)"
              value={listini.lastra_fireline_25 || 16.5}
              onChange={(e) =>
                updateListino("lastra_fireline_25", e.target.value)
              }
            />
            <InputField
              label="2.8m (€)"
              value={listini.lastra_fireline_28 || 18.0}
              onChange={(e) =>
                updateListino("lastra_fireline_28", e.target.value)
              }
            />
            <InputField
              label="3.0m (€)"
              value={listini.lastra_fireline_3 || 19.5}
              onChange={(e) =>
                updateListino("lastra_fireline_3", e.target.value)
              }
            />
          </div>
        </div>

        {/* GLASSROC */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>🌧️ Glassroc (Esterno)</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <InputField
              label="2.0m (€)"
              value={listini.lastra_glassroc_2 || 22.0}
              onChange={(e) =>
                updateListino("lastra_glassroc_2", e.target.value)
              }
            />
            <InputField
              label="2.5m (€)"
              value={listini.lastra_glassroc_25 || 24.0}
              onChange={(e) =>
                updateListino("lastra_glassroc_25", e.target.value)
              }
            />
            <InputField
              label="2.8m (€)"
              value={listini.lastra_glassroc_28 || 26.0}
              onChange={(e) =>
                updateListino("lastra_glassroc_28", e.target.value)
              }
            />
            <InputField
              label="3.0m (€)"
              value={listini.lastra_glassroc_3 || 28.0}
              onChange={(e) =>
                updateListino("lastra_glassroc_3", e.target.value)
              }
            />
          </div>
        </div>

        {/* PROFILI OMEGA */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>➰ Profili Omega (Contropareti)</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <InputField
              label="Omega 1 cm (€/pz)"
              value={listini.omega_1 || 1.8}
              onChange={(e) => updateListino("omega_1", e.target.value)}
            />
            <InputField
              label="Omega 1.5 cm (€/pz)"
              value={listini.omega_15 || 2.2}
              onChange={(e) => updateListino("omega_15", e.target.value)}
            />
            <InputField
              label="Omega 2 cm (€/pz)"
              value={listini.omega_2 || 2.8}
              onChange={(e) => updateListino("omega_2", e.target.value)}
            />
            <InputField
              label="Omega 2.7 cm (€/pz)"
              value={listini.omega_27 || 3.5}
              onChange={(e) => updateListino("omega_27", e.target.value)}
            />
          </div>
        </div>

        {/* GUIDE */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>Guide (3m)</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <InputField
              label="Guida U28 (€)"
              value={listini.guida_u28 || 2.4}
              onChange={(e) => updateListino("guida_u28", e.target.value)}
            />
            <InputField
              label="Guida 50mm (€)"
              value={listini.guida_50 || 3.2}
              onChange={(e) => updateListino("guida_50", e.target.value)}
            />
            <InputField
              label="Guida 75mm (€)"
              value={listini.guida_75 || 4.0}
              onChange={(e) => updateListino("guida_75", e.target.value)}
            />
            <InputField
              label="Guida 100mm (€)"
              value={listini.guida_100 || 5.5}
              onChange={(e) => updateListino("guida_100", e.target.value)}
            />
          </div>
        </div>

        {/* MONTANTI C27 */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>Montanti C27 (Soffitto)</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <InputField
              label="C27 3m (€)"
              value={listini.montante_c27_3 || 2.6}
              onChange={(e) => updateListino("montante_c27_3", e.target.value)}
            />
            <InputField
              label="C27 4m (€)"
              value={listini.montante_c27_4 || 3.5}
              onChange={(e) => updateListino("montante_c27_4", e.target.value)}
            />
            <InputField
              label="C27 5m (€)"
              value={listini.montante_c27_5 || 4.4}
              onChange={(e) => updateListino("montante_c27_5", e.target.value)}
            />
            <InputField
              label="C27 6m (€)"
              value={listini.montante_c27_6 || 5.3}
              onChange={(e) => updateListino("montante_c27_6", e.target.value)}
            />
          </div>
        </div>

        {/* MONTANTI 50/75/100 */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>Montanti 50/75/100mm</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <InputField
              label="50 3m (€)"
              value={listini.montante_50_3 || 3.0}
              onChange={(e) => updateListino("montante_50_3", e.target.value)}
            />
            <InputField
              label="50 3.5m (€)"
              value={listini.montante_50_35 || 3.5}
              onChange={(e) => updateListino("montante_50_35", e.target.value)}
            />
            <InputField
              label="75 3m (€)"
              value={listini.montante_75_3 || 4.2}
              onChange={(e) => updateListino("montante_75_3", e.target.value)}
            />
            <InputField
              label="75 3.5m (€)"
              value={listini.montante_75_35 || 4.9}
              onChange={(e) => updateListino("montante_75_35", e.target.value)}
            />
            <InputField
              label="75 4m (€)"
              value={listini.montante_75_4 || 5.6}
              onChange={(e) => updateListino("montante_75_4", e.target.value)}
            />
            <InputField
              label="100 3m (€)"
              value={listini.montante_100_3 || 6.0}
              onChange={(e) => updateListino("montante_100_3", e.target.value)}
            />
            <InputField
              label="100 4m (€)"
              value={listini.montante_100_4 || 8.0}
              onChange={(e) => updateListino("montante_100_4", e.target.value)}
            />
          </div>
        </div>

        {/* VITI */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>Viti</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <InputField
              label="Sfuse (€/pz)"
              value={listini.viti_sfuse || 0.12}
              onChange={(e) => updateListino("viti_sfuse", e.target.value)}
            />
            <InputField
              label="Pacco 200 (€)"
              value={listini.viti_pacco_200 || 15.0}
              onChange={(e) => updateListino("viti_pacco_200", e.target.value)}
            />
            <InputField
              label="Pacco 1000 (€)"
              value={listini.viti_pacco_1000 || 65.0}
              onChange={(e) => updateListino("viti_pacco_1000", e.target.value)}
            />
          </div>
        </div>

        {/* ALTRI */}
        <div className="mb-6 md:mb-8">
          <SectionTitle>Altri Materiali</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <InputField
              label="Ganci (€/pz)"
              value={listini.ganci || 0.5}
              onChange={(e) => updateListino("ganci", e.target.value)}
            />
            <InputField
              label="Pendini (€/pz)"
              value={listini.pendini || 0.8}
              onChange={(e) => updateListino("pendini", e.target.value)}
            />
            <InputField
              label="Lana (€/m²)"
              value={listini.lana || 7.0}
              onChange={(e) => updateListino("lana", e.target.value)}
            />
            <InputField
              label="Stucco (€/kg)"
              value={listini.stucco || 1.2}
              onChange={(e) => updateListino("stucco", e.target.value)}
            />
            <InputField
              label="Nastro (€/m)"
              value={listini.nastro || 0.15}
              onChange={(e) => updateListino("nastro", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

// ============================================
// GESTIONE CLIENTI
// ============================================
const ClientiTab = ({ onSelectCliente }) => {
  const [clienti, setClienti] = useState(() => {
    const saved = localStorage.getItem("gessopro_clienti");
    return saved ? JSON.parse(saved) : [];
  });
  const [ricerca, setRicerca] = useState("");
  const [mostraForm, setMostraForm] = useState(false);
  const [clienteInModifica, setClienteInModifica] = useState(null);
  const [formCliente, setFormCliente] = useState({
    nome: "",
    telefono: "",
    email: "",
    indirizzo: "",
    note: "",
  });

  useEffect(() => {
    localStorage.setItem("gessopro_clienti", JSON.stringify(clienti));
  }, [clienti]);

  const salvaCliente = () => {
    if (!formCliente.nome.trim()) {
      alert("Inserisci almeno il nome");
      return;
    }
    if (clienteInModifica) {
      setClienti((prev) =>
        prev.map((c) =>
          c.id === clienteInModifica
            ? { ...formCliente, id: c.id, created_at: c.created_at }
            : c
        )
      );
    } else {
      setClienti((prev) => [
        ...prev,
        {
          ...formCliente,
          id: Date.now(),
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setFormCliente({
      nome: "",
      telefono: "",
      email: "",
      indirizzo: "",
      note: "",
    });
    setClienteInModifica(null);
    setMostraForm(false);
  };

  const modificaCliente = (cliente) => {
    setFormCliente(cliente);
    setClienteInModifica(cliente.id);
    setMostraForm(true);
  };

  const eliminaCliente = (id) => {
    if (confirm("Eliminare questo cliente?")) {
      setClienti((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const clientiFiltrati = clienti.filter(
    (c) =>
      c.nome.toLowerCase().includes(ricerca.toLowerCase()) ||
      (c.telefono && c.telefono.includes(ricerca)) ||
      (c.email && c.email.toLowerCase().includes(ricerca.toLowerCase()))
  );

  return (
    <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden mt-4 md:mt-6">
      <div className="p-4 md:p-6 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-amber-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30">
              <Users size={18} className="text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-black uppercase tracking-widest text-white">
                Rubrica Clienti
              </h3>
              <p className="text-[10px] md:text-xs text-amber-400/70 font-mono">
                {clienti.length} {clienti.length === 1 ? "cliente" : "clienti"}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setFormCliente({
                nome: "",
                telefono: "",
                email: "",
                indirizzo: "",
                note: "",
              });
              setClienteInModifica(null);
              setMostraForm(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 md:px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/30"
          >
            <Plus size={14} /> Nuovo
          </button>
        </div>
      </div>

      {mostraForm && (
        <div className="p-4 md:p-6 bg-slate-800/50 border-b border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              {clienteInModifica ? "Modifica Cliente" : "Nuovo Cliente"}
            </h4>
            <button
              onClick={() => setMostraForm(false)}
              className="text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1 block tracking-wider">
                Nome *
              </label>
              <input
                type="text"
                value={formCliente.nome}
                onChange={(e) =>
                  setFormCliente({ ...formCliente, nome: e.target.value })
                }
                placeholder="Mario Rossi"
                className="w-full p-2.5 md:p-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1 block tracking-wider">
                Telefono
              </label>
              <input
                type="tel"
                value={formCliente.telefono}
                onChange={(e) =>
                  setFormCliente({ ...formCliente, telefono: e.target.value })
                }
                placeholder="+39 333 1234567"
                className="w-full p-2.5 md:p-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1 block tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={formCliente.email}
                onChange={(e) =>
                  setFormCliente({ ...formCliente, email: e.target.value })
                }
                placeholder="mario@esempio.it"
                className="w-full p-2.5 md:p-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1 block tracking-wider">
                Indirizzo
              </label>
              <input
                type="text"
                value={formCliente.indirizzo}
                onChange={(e) =>
                  setFormCliente({ ...formCliente, indirizzo: e.target.value })
                }
                placeholder="Via Roma 1, Milano"
                className="w-full p-2.5 md:p-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1 block tracking-wider">
                Note
              </label>
              <textarea
                value={formCliente.note}
                onChange={(e) =>
                  setFormCliente({ ...formCliente, note: e.target.value })
                }
                rows={2}
                className="w-full p-2.5 md:p-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none transition-all resize-none"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={salvaCliente}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 py-2.5 md:py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg"
            >
              <Save size={14} className="inline mr-1" /> Salva
            </button>
            <button
              onClick={() => setMostraForm(false)}
              className="px-4 bg-slate-800 text-slate-300 py-2.5 md:py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-700 transition-all"
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      <div className="p-4 md:p-6 border-b border-slate-800">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            value={ricerca}
            onChange={(e) => setRicerca(e.target.value)}
            placeholder="Cerca cliente..."
            className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:border-amber-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="p-4 md:p-6 max-h-[55vh] overflow-y-auto">
        {clientiFiltrati.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Users size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">
              {ricerca ? "Nessun cliente trovato" : "Nessun cliente salvato"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {clientiFiltrati.map((cliente) => (
              <div
                key={cliente.id}
                className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-3 md:p-4 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-white text-sm md:text-base mb-1 truncate">
                      {cliente.nome}
                    </h4>
                    <div className="space-y-1">
                      {cliente.telefono && (
                        <p className="text-xs text-slate-400 flex items-center gap-1.5">
                          <Phone size={12} className="text-amber-400" />
                          {cliente.telefono}
                        </p>
                      )}
                      {cliente.email && (
                        <p className="text-xs text-slate-400 flex items-center gap-1.5">
                          <Mail size={12} className="text-amber-400" />
                          {cliente.email}
                        </p>
                      )}
                      {cliente.indirizzo && (
                        <p className="text-xs text-slate-400 flex items-center gap-1.5">
                          <MapPin size={12} className="text-amber-400" />
                          {cliente.indirizzo}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onSelectCliente(cliente)}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all"
                    >
                      Usa
                    </button>
                    <button
                      onClick={() => modificaCliente(cliente)}
                      className="text-slate-400 hover:text-amber-400 transition-all"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => eliminaCliente(cliente.id)}
                      className="text-slate-400 hover:text-red-400 transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// STORICO PREVENTIVI
// ============================================
const StoricoTab = ({ onCaricaPreventivo }) => {
  const [preventivi, setPreventivi] = useState(() => {
    const saved = localStorage.getItem("gessopro_storico");
    return saved ? JSON.parse(saved) : [];
  });
  const [ricerca, setRicerca] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("tutti");
  const [ordinaPer, setOrdinaPer] = useState("data");

  useEffect(() => {
    localStorage.setItem("gessopro_storico", JSON.stringify(preventivi));
  }, [preventivi]);

  const eliminaPreventivo = (id) => {
    if (confirm("Eliminare questo preventivo?")) {
      setPreventivi((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const duplicaPreventivo = (prev) => {
    const nuovo = {
      ...prev,
      id: Date.now(),
      data: new Date().toISOString(),
      cliente: `${prev.cliente} (copia)`,
    };
    setPreventivi((p) => [nuovo, ...p]);
    alert("✅ Preventivo duplicato!");
  };

  let filtrati = preventivi.filter((p) => {
    const matchRicerca =
      !ricerca ||
      p.cliente.toLowerCase().includes(ricerca.toLowerCase()) ||
      p.tipo.toLowerCase().includes(ricerca.toLowerCase());
    const matchTipo = filtroTipo === "tutti" || p.tipo === filtroTipo;
    return matchRicerca && matchTipo;
  });

  if (ordinaPer === "data")
    filtrati.sort((a, b) => new Date(b.data) - new Date(a.data));
  else if (ordinaPer === "importo_alto")
    filtrati.sort((a, b) => b.totale - a.totale);
  else if (ordinaPer === "importo_basso")
    filtrati.sort((a, b) => a.totale - b.totale);
  else if (ordinaPer === "cliente")
    filtrati.sort((a, b) => a.cliente.localeCompare(b.cliente));

  const totFatturato = preventivi.reduce((sum, p) => sum + p.totale, 0);

  return (
    <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden mt-4 md:mt-6">
      <div className="p-4 md:p-6 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-amber-500/30">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/20 p-2 rounded-xl border border-amber-500/30">
            <History size={18} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-black uppercase tracking-widest text-white">
              Storico Preventivi
            </h3>
            <p className="text-[10px] md:text-xs text-amber-400/70 font-mono">
              {preventivi.length} preventivi · Totale €{" "}
              {totFatturato.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {preventivi.length > 0 && (
        <div className="p-4 md:p-6 bg-slate-800/30 border-b border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={ricerca}
                onChange={(e) => setRicerca(e.target.value)}
                placeholder="Cerca cliente o tipo..."
                className="w-full pl-10 pr-3 py-2.5 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm placeholder:text-slate-500 focus:border-amber-500 outline-none transition-all"
              />
            </div>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none transition-all"
            >
              <option value="tutti">Tutti i tipi</option>
              <option value="soffitto">Controsoffitto</option>
              <option value="parete">Parete Divisoria</option>
              <option value="controparete">Controparete</option>
            </select>
            <select
              value={ordinaPer}
              onChange={(e) => setOrdinaPer(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-950/70 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none transition-all"
            >
              <option value="data">Ordina per data</option>
              <option value="cliente">Ordina per cliente</option>
              <option value="importo_alto">Importo (alto → basso)</option>
              <option value="importo_basso">Importo (basso → alto)</option>
            </select>
          </div>
        </div>
      )}

      <div className="p-4 md:p-6 max-h-[55vh] overflow-y-auto">
        {filtrati.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <History size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">
              {preventivi.length === 0
                ? "Nessun preventivo salvato"
                : "Nessun risultato"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtrati.map((prev) => (
              <div
                key={prev.id}
                className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-3 md:p-4 hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-bold text-white text-sm md:text-base truncate">
                        {prev.cliente}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(prev.data).toLocaleDateString("it-IT")}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="text-slate-400">
                        {prev.tipo === "soffitto"
                          ? "Controsoffitto"
                          : prev.tipo === "parete"
                          ? "Parete Divisoria"
                          : "Controparete"}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400">{prev.dimensioni}</span>
                      <span className="text-slate-600">·</span>
                      <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                        € {prev.totale.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => onCaricaPreventivo(prev.config)}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-1"
                    >
                      <FolderOpen size={12} /> Apri
                    </button>
                    <button
                      onClick={() => duplicaPreventivo(prev)}
                      className="text-slate-400 hover:text-amber-400 transition-all flex items-center justify-center gap-1 text-[10px] font-bold"
                    >
                      <Copy size={12} /> Duplica
                    </button>
                    <button
                      onClick={() => eliminaPreventivo(prev.id)}
                      className="text-slate-400 hover:text-red-400 transition-all flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// SCHERMATA BENVENUTO
// ============================================
const WelcomeScreen = ({ onEnter }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-72 h-72 md:w-96 md:h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-20 w-72 h-72 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fbbf24 1px, transparent 1px), linear-gradient(90deg, #fbbf24 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div
        className={`relative z-10 text-center transition-all duration-1000 px-2 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur border border-amber-500/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-6 md:mb-8">
          <Sparkles size={12} className="text-amber-400 md:w-3.5 md:h-3.5" />
          <span className="text-[8px] md:text-xs font-bold text-amber-400 uppercase tracking-widest">
            Professional Drywall Software
          </span>
        </div>

        <div className="flex flex-col items-center mb-6">
          <LogoGessoPro size={100} className="md:hidden mb-4" />
          <LogoGessoPro size={140} className="hidden md:block mb-6" />
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-none">
            GESSO
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              PRO
            </span>
          </h1>
          <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-3 md:mt-4"></div>
        </div>

        <p className="text-slate-400 text-xs md:text-base mb-1 md:mb-2 font-mono">
          Il software per chi lavora il cartongesso
        </p>
        <p className="text-amber-400/80 text-[10px] md:text-sm mb-8 md:mb-12 font-bold tracking-widest uppercase">
          By Samuel Bandiera
        </p>

        <button
          onClick={onEnter}
          className="group relative inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-6 py-3.5 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-wider text-xs md:text-base hover:from-amber-400 hover:to-amber-500 transition-all shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 active:scale-95"
        >
          <Calculator size={18} className="md:w-5 md:h-5" />
          Inizia i tuoi calcoli
          <ArrowRight
            size={16}
            className="md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
          />
        </button>

        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-10 md:mt-16 text-[9px] md:text-xs text-slate-500">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-amber-400"></div>
            <span>Preventivi Professionali</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-amber-400"></div>
            <span>Calcoli Automatici</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-amber-400"></div>
            <span>Export PDF</span>
          </div>
        </div>

        <p className="text-[9px] md:text-[10px] text-slate-600 mt-10 md:mt-16 font-mono">
          © 2025 GessoPro · Tutti i diritti riservati
        </p>
      </div>
    </div>
  );
};

// ============================================
// COMPONENTE PRINCIPALE
// ============================================
export default function GessoPro() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState("calcolo");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const defaultConfig = {
    tipo: "soffitto",
    L: 4,
    W: 8,
    H: 2.7,
    altezzaLastra: "3",
    tipoLastra: "standard",
    tipoControparete: "montanti", // "omega" o "montanti"
    omegaDimensione: "2", // 1, 1.5, 2, 2.7
    interasse: "50",
    interasseParete: "50",
    interasseOmega: "50",
    doppia: false,
    doppiaStruttura: true,
    isolante: true,
    dimensioneMontante: "50",
    nomeCliente: "",
  };

  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem("gessopro_ultimo");
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  const [listini, setListini] = useState(() => {
    const saved = localStorage.getItem("gessopro_listini");
    return saved
      ? JSON.parse(saved)
      : {
          // Lastre
          lastra_standard_2: 8.5,
          lastra_standard_25: 9.5,
          lastra_standard_28: 10.0,
          lastra_standard_3: 10.5,
          lastra_habito_2: 18.0,
          lastra_habito_25: 20.0,
          lastra_habito_28: 22.0,
          lastra_habito_3: 24.0,
          lastra_duragyp_2: 15.0,
          lastra_duragyp_25: 16.5,
          lastra_duragyp_28: 18.0,
          lastra_duragyp_3: 20.0,
          lastra_hydro_2: 12.0,
          lastra_hydro_25: 13.5,
          lastra_hydro_28: 14.5,
          lastra_hydro_3: 15.5,
          lastra_fireline_2: 15.0,
          lastra_fireline_25: 16.5,
          lastra_fireline_28: 18.0,
          lastra_fireline_3: 19.5,
          lastra_glassroc_2: 22.0,
          lastra_glassroc_25: 24.0,
          lastra_glassroc_28: 26.0,
          lastra_glassroc_3: 28.0,
          // Omega
          omega_1: 1.8,
          omega_15: 2.2,
          omega_2: 2.8,
          omega_27: 3.5,
          // Guide
          guida_u28: 2.4,
          guida_50: 3.2,
          guida_75: 4.0,
          guida_100: 5.5,
          // Montanti
          montante_c27_3: 2.6,
          montante_c27_4: 3.5,
          montante_c27_5: 4.4,
          montante_c27_6: 5.3,
          montante_50_3: 3.0,
          montante_50_35: 3.5,
          montante_75_3: 4.2,
          montante_75_35: 4.9,
          montante_75_4: 5.6,
          montante_100_3: 6.0,
          montante_100_4: 8.0,
          // Altri
          ganci: 0.5,
          pendini: 0.8,
          lana: 7.0,
          stucco: 1.2,
          nastro: 0.15,
          viti_sfuse: 0.12,
          viti_pacco_200: 15.0,
          viti_pacco_1000: 65.0,
          scontoPercentuale: 0,
        };
  });

  const [noteUtente, setNoteUtente] = useState("");

  useEffect(() => {
    localStorage.setItem("gessopro_ultimo", JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem("gessopro_listini", JSON.stringify(listini));
  }, [listini]);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;
    if (name === "tipo" && value === "soffitto") {
      setConfig((prev) => ({ ...prev, [name]: value, interasse: "50" }));
    } else {
      setConfig((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const updateListino = (key, value) => {
    setListini((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const getPrezzoLastra = (tipo, altezza) => {
    const altezzaKey = altezza
      .replace(".", "")
      .replace("2.0", "2")
      .replace("2.5", "25")
      .replace("2.8", "28")
      .replace("3.0", "3");
    const chiave = `lastra_${tipo}_${altezzaKey}`;
    return (
      listini[chiave] ||
      listini[`lastra_${tipo}_3`] ||
      listini.lastra_standard_3 ||
      10.5
    );
  };

  const getPrezzoOmega = (dimensione) => {
    const chiavi = {
      1: "omega_1",
      1.5: "omega_15",
      2: "omega_2",
      2.7: "omega_27",
    };
    return listini[chiavi[dimensione]] || 2.8;
  };

  const getPrezzoGuida = (dimensione) => {
    const prezziGuide = {
      u28: listini.guida_u28,
      50: listini.guida_50,
      75: listini.guida_75,
      100: listini.guida_100,
    };
    return prezziGuide[dimensione] || listini.guida_u28;
  };

  const getPrezzoMontante = (tipo, dimensione, lunghezza) => {
    if (tipo === "soffitto") {
      const chiave = `montante_c27_${lunghezza}`;
      return listini[chiave] || listini.montante_c27_3;
    } else {
      const lunghezzaKey = lunghezza.toString().replace(".", "");
      const chiave = `montante_${dimensione}_${lunghezzaKey}`;
      if (listini[chiave]) return listini[chiave];
      return listini[`montante_${dimensione}_3`] || 3.0;
    }
  };

  const getPrezzoViti = (quantita) => {
    if (quantita <= 150) return quantita * listini.viti_sfuse;
    else if (quantita <= 550)
      return Math.ceil(quantita / 200) * listini.viti_pacco_200;
    else return Math.ceil(quantita / 1000) * listini.viti_pacco_1000;
  };

  const getDimensioneGuida = () => {
    if (config.tipo === "soffitto") return "u28";
    return config.dimensioneMontante || "50";
  };

  const getLunghezzaMontanteAutomatica = (altezza) => {
    const lunghezzeDisponibili = [3, 3.5, 4, 5, 6];
    return lunghezzeDisponibili.find((l) => l >= altezza) || 6;
  };

  const report = useMemo(() => {
    let L = parseFloat(config.L) || 0;
    let W = parseFloat(config.W) || 0;
    let H = parseFloat(config.H) || 2.7;
    const hL = parseFloat(config.altezzaLastra) || 3;
    const interasse = parseFloat(config.interasse) || 50;
    const interasseParete = parseFloat(config.interasseParete) || 50;
    const interasseOmega = parseFloat(config.interasseOmega) || 50;

    let area = 0,
      perimetro = 0;
    if (config.tipo === "soffitto") {
      area = L * W;
      perimetro = (L + W) * 2;
    } else {
      area = H * L;
      perimetro = (L + H) * 2;
    }

    const mqLastra = 1.2 * hL;
    const strati = config.doppia ? 2 : 1;
    let materiali = [];

    const calcolaPrezzo = (prezzoUnitarioBase, quantita) => {
      const lordo = (prezzoUnitarioBase || 0) * quantita;
      return lordo * (1 - (listini.scontoPercentuale || 0) / 100);
    };

    const prezzoLastra = getPrezzoLastra(
      config.tipoLastra,
      config.altezzaLastra
    );
    const nomeLastra = `Lastre ${
      TIPI_LASTRA[config.tipoLastra]?.nome || "Standard"
    } (1.2x${hL}m)`;

    if (config.tipo === "soffitto") {
      const nLastre = Math.ceil((area * strati) / mqLastra);
      materiali.push({
        nome: nomeLastra,
        qta: nLastre,
        unit: "PZ",
        prezzo: calcolaPrezzo(prezzoLastra, nLastre),
      });

      const qtaGuide = Math.ceil((perimetro * 1) / 3);
      materiali.push({
        nome: "Guide Perimetrali U28 (3m)",
        qta: qtaGuide,
        unit: "AS",
        prezzo: calcolaPrezzo(getPrezzoGuida("u28"), qtaGuide),
      });

      const latoLungo = L >= W ? L : W;
      const latoCorto = L < W ? L : W;
      const barreDisp = [3, 3.5, 4, 5, 6];
      const passo = interasse / 100;

      const ottimizzaBarra = (misura) => {
        const barraSecca = barreDisp.find((b) => b >= misura);
        if (barraSecca) return { lunghezza: barraSecca, pezziPerFila: 1 };
        const barraIncastro = barreDisp.find((b) => b >= misura / 2);
        return { lunghezza: barraIncastro || 6, pezziPerFila: 2 };
      };

      if (config.doppiaStruttura) {
        const nFileP = Math.max(0, Math.floor(latoCorto / 0.9) - 1);
        const optP = ottimizzaBarra(latoLungo);
        const qtaP = nFileP * optP.pezziPerFila;
        materiali.push({
          nome: `Montanti C27 Primari (${optP.lunghezza}m)`,
          qta: qtaP,
          unit: "AS",
          prezzo: calcolaPrezzo(
            getPrezzoMontante("soffitto", null, optP.lunghezza),
            qtaP
          ),
        });

        const nFileS = Math.max(0, Math.floor(latoLungo / 0.5) - 1);
        const optS = ottimizzaBarra(latoCorto);
        const qtaS = nFileS * optS.pezziPerFila;
        materiali.push({
          nome: `Montanti C27 Secondari (${optS.lunghezza}m)`,
          qta: qtaS,
          unit: "AS",
          prezzo: calcolaPrezzo(
            getPrezzoMontante("soffitto", null, optS.lunghezza),
            qtaS
          ),
        });

        const qtaGanci = nFileS * nFileP * 2;
        materiali.push({
          nome: "Ganci Ottagonali",
          qta: qtaGanci,
          unit: "PZ",
          prezzo: calcolaPrezzo(listini.ganci, qtaGanci),
        });

        const nPendiniPerFila = Math.max(0, Math.floor(latoLungo / 0.9) - 1);
        const totaleAppoggi = nFileP * nPendiniPerFila;
        materiali.push({
          nome: "Pendini e Ganci",
          qta: totaleAppoggi,
          unit: "PZ",
          prezzo: calcolaPrezzo(listini.pendini, totaleAppoggi),
        });
      } else {
        const nFileSingole = Math.ceil(latoLungo / passo) + 1;
        const optSingola = ottimizzaBarra(latoCorto);
        const qtaSingola = nFileSingole * optSingola.pezziPerFila;
        materiali.push({
          nome: `Montanti C27 (${optSingola.lunghezza}m)`,
          qta: qtaSingola,
          unit: "AS",
          prezzo: calcolaPrezzo(
            getPrezzoMontante("soffitto", null, optSingola.lunghezza),
            qtaSingola
          ),
        });
      }
    }

    if (config.tipo === "parete") {
      const facce = 2;
      const nLastre = Math.ceil((area * facce * strati) / mqLastra);
      materiali.push({
        nome: nomeLastra,
        qta: nLastre,
        unit: "PZ",
        prezzo: calcolaPrezzo(prezzoLastra, nLastre),
      });

      const qtaGuide = Math.ceil((L * 2) / 3);
      const dimensioneGuida = getDimensioneGuida();
      materiali.push({
        nome: `Guide ${dimensioneGuida}mm (3m)`,
        qta: qtaGuide,
        unit: "AS",
        prezzo: calcolaPrezzo(getPrezzoGuida(dimensioneGuida), qtaGuide),
      });

      const passoParete = interasseParete / 100;
      const qtaMontanti = Math.ceil(L / passoParete);
      const lunghezzaMontante = getLunghezzaMontanteAutomatica(H);
      const dimensioneMontante = config.dimensioneMontante || "50";
      materiali.push({
        nome: `Montanti ${dimensioneMontante}mm (${lunghezzaMontante}m)`,
        qta: qtaMontanti,
        unit: "AS",
        prezzo: calcolaPrezzo(
          getPrezzoMontante("parete", dimensioneMontante, lunghezzaMontante),
          qtaMontanti
        ),
      });
    }

    if (config.tipo === "controparete") {
      const nLastre = Math.ceil((area * strati) / mqLastra);
      materiali.push({
        nome: nomeLastra,
        qta: nLastre,
        unit: "PZ",
        prezzo: calcolaPrezzo(prezzoLastra, nLastre),
      });

      if (config.tipoControparete === "omega") {
        // CONTROPARETE CON PROFILI OMEGA
        const dimensioneOmega = config.omegaDimensione || "2";
        const prezzoOmega = getPrezzoOmega(dimensioneOmega);
        const passoOmega = interasseOmega / 100;
        const qtaOmegaVerticali = Math.ceil(L / passoOmega);

        // Omega verticali (altezza parete)
        materiali.push({
          nome: `Profili Omega ${dimensioneOmega}cm (${H}m)`,
          qta: qtaOmegaVerticali,
          unit: "PZ",
          consiglio: `Controparete con omega ${dimensioneOmega}cm - interasse ${interasseOmega}cm`,
          prezzo: calcolaPrezzo(prezzoOmega * H, qtaOmegaVerticali), // Prezzo al metro × altezza
        });

        // Guide a terra e soffitto (U28)
        const qtaGuideOmega = Math.ceil((L * 2) / 3);
        materiali.push({
          nome: "Guide U28 perimetrali (3m)",
          qta: qtaGuideOmega,
          unit: "AS",
          consiglio: "Fissaggio omega a terra e soffitto",
          prezzo: calcolaPrezzo(getPrezzoGuida("u28"), qtaGuideOmega),
        });
      } else {
        // CONTROPARETE CON MONTANTI + GUIDE
        const qtaGuide = Math.ceil((L * 2) / 3);
        const dimensioneGuida = getDimensioneGuida();
        materiali.push({
          nome: `Guide ${dimensioneGuida}mm (3m)`,
          qta: qtaGuide,
          unit: "AS",
          prezzo: calcolaPrezzo(getPrezzoGuida(dimensioneGuida), qtaGuide),
        });

        const passoParete = interasseParete / 100;
        const qtaMontanti = Math.ceil(L / passoParete);
        const lunghezzaMontante = getLunghezzaMontanteAutomatica(H);
        const dimensioneMontante = config.dimensioneMontante || "50";
        materiali.push({
          nome: `Montanti ${dimensioneMontante}mm (${lunghezzaMontante}m)`,
          qta: qtaMontanti,
          unit: "AS",
          prezzo: calcolaPrezzo(
            getPrezzoMontante("parete", dimensioneMontante, lunghezzaMontante),
            qtaMontanti
          ),
        });
      }
    }

    if (config.isolante) {
      const qtaLana = Math.ceil(area);
      materiali.push({
        nome: "Lana di Roccia",
        qta: qtaLana,
        unit: "M²",
        prezzo: calcolaPrezzo(listini.lana, qtaLana),
      });
    }

    let coeffViti;
    if (config.tipo === "soffitto") coeffViti = 18;
    else {
      const interasseUsato =
        config.tipo === "controparete" && config.tipoControparete === "omega"
          ? interasseOmega
          : interasseParete;
      coeffViti = interasseUsato === 40 ? 24 : interasseUsato === 60 ? 18 : 22;
    }
    const qtaTotaleViti = Math.ceil(area * coeffViti * strati);

    let formatoScatola = "",
      qtaScatole = 0;
    const prezzoVitiTotali = getPrezzoViti(qtaTotaleViti);

    if (qtaTotaleViti <= 150) {
      formatoScatola = `Viti ${config.doppia ? "3,5x35" : "3,5x25"} (sfuse)`;
      qtaScatole = qtaTotaleViti;
    } else if (qtaTotaleViti <= 550) {
      qtaScatole = Math.ceil(qtaTotaleViti / 200);
      formatoScatola = `Viti ${
        config.doppia ? "3,5x35" : "3,5x25"
      } (Pacco 200)`;
    } else {
      qtaScatole = Math.ceil(qtaTotaleViti / 1000);
      formatoScatola = `Viti ${
        config.doppia ? "3,5x35" : "3,5x25"
      } (Pacco 1000)`;
    }
    materiali.push({
      nome: formatoScatola,
      qta: qtaScatole,
      unit: qtaTotaleViti <= 150 ? "PZ" : "CF",
      prezzo: calcolaPrezzo(prezzoVitiTotali / qtaScatole, qtaScatole),
    });

    const qtaStucco = Math.ceil(area * (config.doppia ? 0.9 : 0.5));
    materiali.push({
      nome: "Stucco",
      qta: qtaStucco,
      unit: "KG",
      prezzo: calcolaPrezzo(listini.stucco, qtaStucco),
    });

    const qtaNastro = Math.ceil(area * 1.5);
    materiali.push({
      nome: "Nastro",
      qta: qtaNastro,
      unit: "MT",
      prezzo: calcolaPrezzo(listini.nastro, qtaNastro),
    });

    const totaleFinale = materiali.reduce((acc, m) => acc + (m.prezzo || 0), 0);
    return { area, perimetro, materiali, totaleFinale };
  }, [config, listini]);

  const VisualizerStruttura = ({
    L,
    W,
    doppiaStruttura,
    tipo,
    hLastra,
    tipoControparete,
  }) => {
    const BOX_SIZE = 260;
    const padding = 30;
    const maxDim = Math.max(L, W) || 1;
    const scale = (BOX_SIZE - padding * 2) / maxDim;
    const viewWidth = Math.max(L * scale, 80);
    const viewHeight = Math.max(W * scale, 80);

    const lineeP = [];
    if (tipo === "soffitto" && doppiaStruttura) {
      for (let x = 0.9; x < L; x += 0.9) lineeP.push(x * scale);
    }
    const lineeS = [];
    for (let y = 0.5; y < W; y += 0.5) lineeS.push(y * scale);

    const omegaLinee = [];
    if (tipo === "controparete" && tipoControparete === "omega") {
      for (let x = 0.5; x < L; x += 0.5) omegaLinee.push(x * scale);
    }

    const lastreDraw = [];
    if (tipo === "soffitto") {
      const wLastra = 1.2;
      const hL = hLastra || 3;
      for (let x = 0; x < L; x += wLastra) {
        const sfalsamento = Math.round(x / wLastra) % 2 !== 0 ? hL / 2 : 0;
        for (let y = -sfalsamento; y < W; y += hL) {
          lastreDraw.push({
            x: x * scale,
            y: y * scale,
            w: Math.min(wLastra, L - x) * scale,
            h: Math.min(hL, W - y) * scale,
            ogY: y,
            ogH: hL,
          });
        }
      }
    }

    return (
      <div className="bg-slate-900/80 backdrop-blur border border-slate-700/50 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl h-full flex flex-col justify-center">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
            <span className="text-[9px] md:text-[10px] font-black text-amber-400 uppercase tracking-widest">
              Anteprima Progetto
            </span>
          </div>
        </div>

        <div
          className="relative flex items-center justify-center bg-slate-950/50 rounded-xl md:rounded-2xl border border-dashed border-slate-700 overflow-hidden p-3"
          style={{ minHeight: 220 }}
        >
          <svg
            width={viewWidth}
            height={viewHeight}
            className="overflow-visible max-w-full"
            style={{ maxWidth: "100%", height: "auto" }}
          >
            <rect
              width={viewWidth}
              height={viewHeight}
              fill="#0f172a"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            {tipo === "soffitto" &&
              lastreDraw.map((lastra, i) => {
                const drawY = Math.max(0, lastra.ogY * scale);
                const drawH =
                  lastra.ogY < 0
                    ? (lastra.ogH + lastra.ogY) * scale
                    : Math.min(lastra.ogH, W - lastra.ogY) * scale;
                if (drawH <= 0) return null;
                return (
                  <rect
                    key={`l-${i}`}
                    x={lastra.x}
                    y={drawY}
                    width={lastra.w}
                    height={drawH}
                    fill="#334155"
                    stroke="#475569"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                );
              })}
            {lineeS.map((y, i) => (
              <line
                key={`s-${i}`}
                x1="0"
                y1={y}
                x2={viewWidth}
                y2={y}
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
            ))}
            {lineeP.map((x, i) => (
              <line
                key={`p-${i}`}
                x1={x}
                y1="0"
                x2={x}
                y2={viewHeight}
                stroke="#fbbf24"
                strokeWidth="1.5"
              />
            ))}
            {omegaLinee.map((x, i) => (
              <line
                key={`o-${i}`}
                x1={x}
                y1="0"
                x2={x}
                y2={viewHeight}
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="5 3"
              />
            ))}
            <text
              x={viewWidth / 2}
              y="-12"
              fill="#fbbf24"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
            >
              {L} m
            </text>
            <text
              x="-12"
              y={viewHeight / 2}
              fill="#fbbf24"
              fontSize="10"
              fontWeight="bold"
              textAnchor="middle"
              transform={`rotate(-90, -12, ${viewHeight / 2})`}
            >
              {W} m
            </text>
          </svg>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-6 border-t border-slate-800 pt-3 md:pt-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-amber-400 rounded-sm"></span>
            <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase">
              Primari
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-0.5 border-t border-dashed border-slate-500"></span>
            <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase">
              Secondari
            </span>
          </div>
          {tipo === "controparete" && tipoControparete === "omega" && (
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-0.5 border-t border-dashed border-emerald-500"></span>
              <span className="text-[8px] md:text-[9px] font-bold text-emerald-400 uppercase">
                Omega
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const salvaPreventivo = () => {
    if (!config.nomeCliente.trim()) {
      alert("Inserisci il nome del cliente prima di salvare");
      return;
    }
    const storico = JSON.parse(
      localStorage.getItem("gessopro_storico") || "[]"
    );
    const clienti = JSON.parse(
      localStorage.getItem("gessopro_clienti") || "[]"
    );
    const clienteEsistente = clienti.find(
      (c) => c.nome.toLowerCase() === config.nomeCliente.toLowerCase()
    );
    if (!clienteEsistente) {
      const nuovoCliente = {
        id: Date.now(),
        nome: config.nomeCliente,
        telefono: "",
        email: "",
        indirizzo: "",
        note: "Aggiunto automaticamente da preventivo",
        created_at: new Date().toISOString(),
      };
      localStorage.setItem(
        "gessopro_clienti",
        JSON.stringify([...clienti, nuovoCliente])
      );
    }
    const nuovoPreventivo = {
      id: Date.now(),
      data: new Date().toISOString(),
      cliente: config.nomeCliente || "Cliente non specificato",
      tipo: config.tipo,
      dimensioni:
        config.tipo === "soffitto"
          ? `${config.L}m x ${config.W}m`
          : `H=${config.H}m x L=${config.L}m`,
      totale: report.totaleFinale,
      config: JSON.parse(JSON.stringify(config)),
    };
    storico.unshift(nuovoPreventivo);
    if (storico.length > 100) storico.pop();
    localStorage.setItem("gessopro_storico", JSON.stringify(storico));
    alert("✅ Preventivo salvato con successo!");
  };

  const caricaPreventivo = (configSalvato) => {
    setConfig(configSalvato);
    setActiveTab("calcolo");
    setMobileMenuOpen(false);
    alert("✅ Preventivo caricato!");
  };

  const selezionaCliente = (cliente) => {
    setConfig((prev) => ({ ...prev, nomeCliente: cliente.nome }));
    setActiveTab("calcolo");
    setMobileMenuOpen(false);
    alert(`✅ Cliente "${cliente.nome}" selezionato!`);
  };

  const generaPDF = () => {
    const doc = new jsPDF();
    const data = new Date().toLocaleDateString("it-IT");
    const ora = new Date().toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const nero = [15, 23, 42];
    const neroScuro = [2, 6, 23];
    const grigioScuro = [30, 41, 59];
    const grigioMedio = [71, 85, 105];
    const grigioChiaro = [148, 163, 184];
    const bianco = [255, 255, 255];
    const oro = [251, 191, 36];

    doc.setFillColor(...nero);
    doc.rect(0, 0, 210, 297, "F");
    doc.setFillColor(...neroScuro);
    doc.rect(0, 0, 210, 42, "F");
    doc.setFillColor(...oro);
    doc.rect(0, 40, 210, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(...bianco);
    doc.text("GESSO", 14, 24);
    const larghezzaGesso = doc.getTextWidth("GESSO");
    doc.setTextColor(...oro);
    doc.text("PRO", 14 + larghezzaGesso, 24);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...grigioChiaro);
    doc.text("SAMUEL BANDIERA", 14, 33);
    doc.setTextColor(...grigioMedio);
    doc.text("Software Professionale di Calcolo Materiali", 14, 38);

    doc.setFontSize(8);
    doc.setTextColor(...grigioChiaro);
    doc.text("PREVENTIVO", 196, 15, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...oro);
    doc.text(data, 196, 22, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...grigioMedio);
    doc.text(`ore ${ora}`, 196, 28, { align: "right" });

    let startY = 52;
    if (config.nomeCliente) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(...oro);
      doc.text("CLIENTE", 196, startY, { align: "right" });
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(...bianco);
      doc.text(config.nomeCliente, 196, startY + 7, { align: "right" });
      startY += 14;
    }

    const tipoTesto =
      config.tipo === "soffitto"
        ? "Controsoffitto"
        : config.tipo === "parete"
        ? "Parete Divisoria"
        : "Controparete";
    const dimTesto =
      config.tipo === "soffitto"
        ? `${config.L} m × ${config.W} m`
        : `H ${config.H} m × L ${config.L} m`;
    const riga1 = `${tipoTesto} · ${dimTesto}`;
    const riga2 = `Superficie: ${report.area.toFixed(
      2
    )} m² · Perimetro: ${report.perimetro.toFixed(2)} ml`;

    let opzioni = [];
    opzioni.push(
      `Lastra: ${TIPI_LASTRA[config.tipoLastra]?.nome || "Standard"}`
    );
    if (config.doppia) opzioni.push("Doppia lastra");
    if (config.isolante) opzioni.push("Lana di roccia");
    if (config.tipo === "soffitto" && config.doppiaStruttura)
      opzioni.push("Doppia struttura");
    if (config.tipo === "controparete") {
      if (config.tipoControparete === "omega") {
        opzioni.push(
          `Omega ${config.omegaDimensione}cm · Int. ${config.interasseOmega}cm`
        );
      } else {
        opzioni.push(
          `Montanti ${config.dimensioneMontante}mm · Int. ${config.interasseParete}cm`
        );
      }
    } else if (config.tipo === "parete") {
      opzioni.push(
        `Montanti ${config.dimensioneMontante}mm · Int. ${config.interasseParete}cm`
      );
    }

    // Gestione righe multiple con split automatico
    const testoCompleto = [riga1, riga2, ...opzioni].join(" · ");
    const testoWrapped = doc.splitTextToSize(testoCompleto, 175);
    const altezzaBox = 8 + testoWrapped.length * 5;

    doc.setFillColor(...grigioScuro);
    doc.roundedRect(14, startY, 182, altezzaBox, 2, 2, "F");

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(220, 220, 220);
    doc.text(testoWrapped, 20, startY + 6);

    startY += altezzaBox + 6;

    const bodyData = report.materiali.map((m) => {
      const pUnit = m.qta > 0 ? (m.prezzo / m.qta).toFixed(2) : "0.00";
      return [
        m.nome.toUpperCase(),
        `${m.qta} ${m.unit}`,
        `€ ${pUnit}`,
        `€ ${m.prezzo.toFixed(2)}`,
      ];
    });

    autoTable(doc, {
      startY: startY,
      head: [["DESCRIZIONE MATERIALE", "QUANTITÀ", "PREZZO UNIT.", "TOTALE"]],
      body: bodyData,
      theme: "plain",
      headStyles: {
        fillColor: oro,
        textColor: nero,
        fontSize: 8.5,
        fontStyle: "bold",
        halign: "center",
        cellPadding: { top: 3, bottom: 3, left: 3, right: 3 },
      },
      bodyStyles: {
        fillColor: nero,
        textColor: bianco,
        fontSize: 8,
        cellPadding: { top: 3, bottom: 3, left: 3, right: 3 },
      },
      alternateRowStyles: { fillColor: grigioScuro },
      columnStyles: {
        0: { cellWidth: 90, halign: "left" },
        1: {
          cellWidth: 30,
          halign: "center",
          fontStyle: "bold",
          textColor: oro,
        },
        2: { cellWidth: 30, halign: "right", textColor: grigioChiaro },
        3: {
          cellWidth: 32,
          halign: "right",
          fontStyle: "bold",
          textColor: bianco,
        },
      },
      margin: { left: 14, right: 14 },
      tableWidth: 182,
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    const iva = report.totaleFinale * 0.22;
    const totaleConIva = report.totaleFinale + iva;

    const boxAltezza = 45;
    doc.setFillColor(...grigioScuro);
    doc.roundedRect(14, finalY, 182, boxAltezza, 3, 3, "F");
    doc.setFillColor(...oro);
    doc.roundedRect(14, finalY, 2, boxAltezza, 1, 1, "F");

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grigioChiaro);
    doc.text("Totale netto", 24, finalY + 10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...bianco);
    doc.text(`€ ${report.totaleFinale.toFixed(2)}`, 190, finalY + 10, {
      align: "right",
    });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grigioChiaro);
    doc.text("IVA 22%", 24, finalY + 18);
    doc.setTextColor(...bianco);
    doc.text(`€ ${iva.toFixed(2)}`, 190, finalY + 18, { align: "right" });

    doc.setDrawColor(...oro);
    doc.setLineWidth(0.5);
    doc.line(24, finalY + 23, 190, finalY + 23);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...oro);
    doc.text("TOTALE IVA INCLUSA", 24, finalY + 33);
    doc.setFontSize(18);
    doc.text(`€ ${totaleConIva.toFixed(2)}`, 190, finalY + 33, {
      align: "right",
    });

    if (listini.scontoPercentuale > 0) {
      doc.setFontSize(7);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(...grigioChiaro);
      doc.text(
        `* Sconto del ${listini.scontoPercentuale}% già applicato`,
        24,
        finalY + 41
      );
    }

    const noteY = finalY + boxAltezza + 10;
    if (noteY < 270 && noteUtente) {
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...oro);
      doc.text("NOTE:", 14, noteY);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(220, 220, 220);
      const noteSplit = doc.splitTextToSize(noteUtente, 182);
      doc.text(noteSplit, 14, noteY + 5);
    }

    doc.setFillColor(...neroScuro);
    doc.rect(0, 285, 210, 12, "F");
    doc.setDrawColor(...oro);
    doc.setLineWidth(0.3);
    doc.line(0, 285, 210, 285);

    doc.setFontSize(6.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...grigioChiaro);
    doc.text(
      "GESSO PRO · By Samuel Bandiera · Preventivo generato digitalmente",
      105,
      292,
      { align: "center" }
    );

    const nomeFile = config.nomeCliente
      ? `Preventivo_${config.nomeCliente.replace(/\s+/g, "_")}_${data.replace(
          /\//g,
          "-"
        )}.pdf`
      : `Preventivo_${data.replace(/\//g, "-")}.pdf`;
    doc.save(nomeFile);
  };

  if (showWelcome) {
    return <WelcomeScreen onEnter={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 p-3 md:p-8 font-sans text-white">
      <div className="max-w-6xl mx-auto">
        <header className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 md:p-6 rounded-2xl md:rounded-t-3xl shadow-2xl flex items-center justify-between border-b-4 border-amber-500">
          <LogoHeader size={32} />

          <div className="hidden md:flex gap-2">
            <button
              onClick={() => setActiveTab("calcolo")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "calcolo"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700"
              }`}
            >
              <Calculator size={16} className="inline mr-1" /> Calcolo
            </button>
            <button
              onClick={() => setActiveTab("clienti")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "clienti"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700"
              }`}
            >
              <Users size={16} className="inline mr-1" /> Clienti
            </button>
            <button
              onClick={() => setActiveTab("storico")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "storico"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700"
              }`}
            >
              <History size={16} className="inline mr-1" /> Storico
            </button>
            <button
              onClick={() => setActiveTab("impostazioni")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === "impostazioni"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/30"
                  : "bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700"
              }`}
            >
              <Settings size={16} className="inline mr-1" /> Prezzi
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-slate-800 p-2 rounded-full border border-amber-500/30"
          >
            {mobileMenuOpen ? (
              <X size={18} className="text-amber-400" />
            ) : (
              <Menu size={18} className="text-amber-400" />
            )}
          </button>
        </header>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur rounded-b-2xl p-3 flex flex-col gap-2 border-x border-b border-amber-500/20">
            <button
              onClick={() => {
                setActiveTab("calcolo");
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-center ${
                activeTab === "calcolo"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              <Calculator size={14} className="inline mr-1" /> Calcolo
            </button>
            <button
              onClick={() => {
                setActiveTab("clienti");
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-center ${
                activeTab === "clienti"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              <Users size={14} className="inline mr-1" /> Clienti
            </button>
            <button
              onClick={() => {
                setActiveTab("storico");
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-center ${
                activeTab === "storico"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              <History size={14} className="inline mr-1" /> Storico
            </button>
            <button
              onClick={() => {
                setActiveTab("impostazioni");
                setMobileMenuOpen(false);
              }}
              className={`px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all text-center ${
                activeTab === "impostazioni"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              <Settings size={14} className="inline mr-1" /> Prezzi
            </button>
          </div>
        )}

        <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 md:px-6 py-3 rounded-b-xl md:rounded-b-2xl shadow-lg border-l border-r border-b border-amber-500/20">
          <div className="flex flex-wrap items-center justify-between gap-2 md:gap-3">
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              <div className="bg-amber-500/20 p-1.5 md:p-2 rounded-lg md:rounded-xl border border-amber-500/30 flex-shrink-0">
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <label className="text-amber-400/80 text-[8px] md:text-[9px] font-black uppercase tracking-wider block">
                  Cliente
                </label>
                <input
                  type="text"
                  name="nomeCliente"
                  value={config.nomeCliente}
                  onChange={update}
                  placeholder="Nome cliente..."
                  className="w-full text-xs md:text-sm p-1.5 rounded-lg bg-slate-950/50 border border-amber-500/30 text-white placeholder:text-slate-500 font-medium outline-none focus:border-amber-500 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <div className="bg-amber-500/20 p-1.5 md:p-2 rounded-lg md:rounded-xl border border-amber-500/30">
                <svg
                  className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <label className="text-amber-400/80 text-[8px] md:text-[9px] font-black uppercase tracking-wider block">
                  Sconto
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={listini.scontoPercentuale}
                    onChange={(e) =>
                      updateListino("scontoPercentuale", e.target.value)
                    }
                    className="w-14 md:w-20 p-1.5 rounded-lg bg-slate-950/50 border border-amber-500/30 text-white font-bold text-center text-xs md:text-sm outline-none focus:border-amber-500 transition-all"
                  />
                  <span className="text-amber-400 font-bold text-xs md:text-sm">
                    %
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={salvaPreventivo}
              className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:from-green-400 hover:to-green-500 transition-all shadow-lg"
            >
              <Save size={14} className="md:w-4 md:h-4" /> Salva
            </button>
          </div>
        </div>

        {activeTab === "calcolo" ? (
          <div className="animate-in fade-in duration-300 mt-4 md:mt-6">
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl mb-4 md:mb-6 border border-amber-500/20">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-10">
                <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                  <div className="bg-amber-500/20 p-2.5 md:p-4 rounded-2xl border border-amber-500/30 flex-shrink-0">
                    <Maximize className="text-amber-400 w-6 h-6 md:w-9 md:h-9" />
                  </div>
                  <div className="flex-1">
                    <p className="text-amber-400/80 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-0.5 md:mb-1">
                      Superficie Totale
                    </p>
                    <h2 className="text-white text-2xl md:text-5xl font-black leading-none">
                      {report.area.toFixed(2)}{" "}
                      <span className="text-sm md:text-xl font-light opacity-60">
                        m²
                      </span>
                    </h2>
                  </div>
                </div>
                <div className="hidden sm:block h-10 md:h-12 w-px bg-amber-500/20"></div>
                <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                  <div className="bg-amber-500/20 p-2.5 md:p-4 rounded-2xl border border-amber-500/30 flex-shrink-0">
                    <Ruler className="text-amber-400 w-6 h-6 md:w-9 md:h-9" />
                  </div>
                  <div className="flex-1">
                    <p className="text-amber-400/80 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-0.5 md:mb-1">
                      Perimetro Totale
                    </p>
                    <h2 className="text-white text-2xl md:text-5xl font-black leading-none">
                      {report.perimetro.toFixed(2)}{" "}
                      <span className="text-sm md:text-xl font-light opacity-60">
                        ml
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
              <div className="lg:col-span-8">
                <section className="bg-slate-900/80 backdrop-blur p-4 md:p-6 rounded-2xl shadow-xl border border-slate-700/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1.5 md:mb-2 block tracking-wider">
                        Tipologia
                      </label>
                      <select
                        name="tipo"
                        value={config.tipo}
                        onChange={update}
                        className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-sm md:text-base outline-none border border-slate-700 focus:border-amber-500 transition-all"
                      >
                        <option value="soffitto">Controsoffitto</option>
                        <option value="parete">Parete Divisoria</option>
                        <option value="controparete">Controparete</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1.5 md:mb-2 block tracking-wider">
                        Tipo Lastra
                      </label>
                      <select
                        name="tipoLastra"
                        value={config.tipoLastra}
                        onChange={update}
                        className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-sm md:text-base outline-none border border-slate-700 focus:border-amber-500 transition-all"
                      >
                        {Object.entries(TIPI_LASTRA).map(
                          ([key, { label, emoji }]) => (
                            <option key={key} value={key}>
                              {emoji} {label}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                    <div>
                      <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1.5 md:mb-2 block text-center tracking-wider">
                        Altezza Lastra (m)
                      </label>
                      <select
                        name="altezzaLastra"
                        value={config.altezzaLastra}
                        onChange={update}
                        className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-sm md:text-base outline-none border border-slate-700 focus:border-amber-500 transition-all text-center"
                      >
                        <option value="2">2.00</option>
                        <option value="2.5">2.50</option>
                        <option value="2.8">2.80</option>
                        <option value="3">3.00</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                    {config.tipo === "soffitto" ? (
                      <>
                        <div>
                          <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1.5 md:mb-2 block text-center tracking-wider">
                            L (m)
                          </label>
                          <input
                            type="number"
                            name="L"
                            value={config.L}
                            onChange={update}
                            className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-center text-sm md:text-base border border-slate-700 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1.5 md:mb-2 block text-center tracking-wider">
                            W (m)
                          </label>
                          <input
                            type="number"
                            name="W"
                            value={config.W}
                            onChange={update}
                            className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-center text-sm md:text-base border border-slate-700 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1.5 md:mb-2 block text-center tracking-wider">
                            H (m)
                          </label>
                          <input
                            type="number"
                            name="H"
                            value={config.H}
                            onChange={update}
                            step="0.1"
                            className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-center text-sm md:text-base border border-slate-700 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1.5 md:mb-2 block text-center tracking-wider">
                            L (m)
                          </label>
                          <input
                            type="number"
                            name="L"
                            value={config.L}
                            onChange={update}
                            className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-center text-sm md:text-base border border-slate-700 focus:border-amber-500 outline-none transition-all"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* SELEZIONE TIPO CONTROPARETE */}
                  {config.tipo === "controparete" && (
                    <div className="mt-4 p-3 md:p-4 bg-slate-950/50 rounded-xl border border-emerald-500/30">
                      <label className="text-[9px] md:text-[10px] font-black text-emerald-400 uppercase mb-2 block tracking-wider">
                        Sistema di fissaggio
                      </label>
                      <div className="grid grid-cols-2 gap-2 md:gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setConfig((prev) => ({
                              ...prev,
                              tipoControparete: "omega",
                            }))
                          }
                          className={`p-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                            config.tipoControparete === "omega"
                              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                          }`}
                        >
                          ➰ Omega
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setConfig((prev) => ({
                              ...prev,
                              tipoControparete: "montanti",
                            }))
                          }
                          className={`p-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                            config.tipoControparete === "montanti"
                              ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg"
                              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                          }`}
                        >
                          🔩 Montanti+Guide
                        </button>
                      </div>

                      {config.tipoControparete === "omega" && (
                        <div className="mt-3">
                          <label className="text-[9px] md:text-[10px] font-black text-emerald-400 uppercase mb-1.5 block tracking-wider">
                            Spessore Omega
                          </label>
                          <select
                            name="omegaDimensione"
                            value={config.omegaDimensione}
                            onChange={update}
                            className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-sm md:text-base outline-none border border-slate-700 focus:border-emerald-500 transition-all"
                          >
                            {OMEGA_DIMENSIONI.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>
                  )}

                  {/* OPZIONI MONTANTI (parete/controparete con montanti) */}
                  {(config.tipo === "parete" ||
                    (config.tipo === "controparete" &&
                      config.tipoControparete === "montanti")) && (
                    <div className="grid grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                      <div>
                        <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1.5 md:mb-2 block text-center tracking-wider">
                          Montante
                        </label>
                        <select
                          name="dimensioneMontante"
                          value={config.dimensioneMontante}
                          onChange={update}
                          className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-sm md:text-base outline-none border border-slate-700 focus:border-amber-500 transition-all text-center"
                        >
                          <option value="50">50mm</option>
                          <option value="75">75mm</option>
                          <option value="100">100mm</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] md:text-[10px] font-black text-amber-400/80 uppercase mb-1.5 md:mb-2 block text-center tracking-wider">
                          Interasse
                        </label>
                        <select
                          name="interasseParete"
                          value={config.interasseParete}
                          onChange={update}
                          className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-sm md:text-base outline-none border border-slate-700 focus:border-amber-500 transition-all text-center"
                        >
                          <option value="40">40 cm</option>
                          <option value="50">50 cm</option>
                          <option value="60">60 cm</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* INTERASSE OMEGA */}
                  {config.tipo === "controparete" &&
                    config.tipoControparete === "omega" && (
                      <div className="mt-3 md:mt-4">
                        <label className="text-[9px] md:text-[10px] font-black text-emerald-400 uppercase mb-1.5 md:mb-2 block text-center tracking-wider">
                          Interasse Omega
                        </label>
                        <select
                          name="interasseOmega"
                          value={config.interasseOmega}
                          onChange={update}
                          className="w-full p-3 md:p-4 bg-slate-950/70 rounded-xl font-bold text-white text-sm md:text-base outline-none border border-slate-700 focus:border-emerald-500 transition-all text-center"
                        >
                          <option value="30">30 cm</option>
                          <option value="40">40 cm</option>
                          <option value="50">50 cm</option>
                          <option value="60">60 cm</option>
                        </select>
                      </div>
                    )}

                  <div className="flex flex-wrap justify-center gap-3 md:gap-6 py-3 md:py-4 border-t border-slate-800 mt-3 md:mt-4">
                    <label className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-black text-slate-400 uppercase cursor-pointer active:text-amber-400 transition-all">
                      <input
                        type="checkbox"
                        name="doppia"
                        checked={config.doppia}
                        onChange={update}
                        className="w-3.5 h-3.5 md:w-4 md:h-4 accent-amber-500"
                      />
                      <span>Doppia Lastra</span>
                    </label>
                    {config.tipo === "soffitto" && (
                      <label className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-black text-slate-400 uppercase cursor-pointer active:text-amber-400 transition-all">
                        <input
                          type="checkbox"
                          name="doppiaStruttura"
                          checked={config.doppiaStruttura}
                          onChange={update}
                          className="w-3.5 h-3.5 md:w-4 md:h-4 accent-amber-500"
                        />
                        <span>Doppia Struttura</span>
                      </label>
                    )}
                    <label className="flex items-center gap-1.5 md:gap-2 text-[9px] md:text-[10px] font-black text-slate-400 uppercase cursor-pointer active:text-amber-400 transition-all">
                      <input
                        type="checkbox"
                        name="isolante"
                        checked={config.isolante}
                        onChange={update}
                        className="w-3.5 h-3.5 md:w-4 md:h-4 accent-amber-500"
                      />
                      <span>Lana</span>
                    </label>
                  </div>
                </section>
                <textarea
                  className="w-full p-3 md:p-4 bg-slate-900/80 backdrop-blur rounded-2xl shadow-sm border border-slate-700/50 text-xs md:text-sm text-white outline-none mt-3 md:mt-4 focus:border-amber-500 placeholder:text-slate-500 transition-all"
                  placeholder="Note aggiuntive..."
                  value={noteUtente}
                  onChange={(e) => setNoteUtente(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="lg:col-span-4">
                <VisualizerStruttura
                  L={
                    config.tipo === "soffitto"
                      ? parseFloat(config.L)
                      : parseFloat(config.L)
                  }
                  W={
                    config.tipo === "soffitto"
                      ? parseFloat(config.W)
                      : parseFloat(config.H)
                  }
                  doppiaStruttura={config.doppiaStruttura}
                  tipo={config.tipo}
                  hLastra={parseFloat(config.altezzaLastra)}
                  tipoControparete={config.tipoControparete}
                />
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 mt-4 md:mt-6">
              <div className="p-4 md:p-6 bg-gradient-to-r from-slate-950 to-slate-900 border-b border-amber-500/20 flex flex-col sm:flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <Layers
                    size={16}
                    className="md:w-[18px] md:h-[18px] text-amber-400"
                  />
                  <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-amber-400 font-mono italic">
                    Materiali
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                    Totale Netto
                  </span>
                  <span className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                    € {report.totaleFinale.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm min-w-[500px]">
                  <thead className="bg-slate-950/50 border-b border-slate-800">
                    <tr>
                      <th className="py-2 md:py-3 px-3 md:px-6 text-[8px] md:text-[10px] font-black text-amber-400/70 uppercase">
                        Materiale
                      </th>
                      <th className="py-2 md:py-3 px-3 md:px-6 text-[8px] md:text-[10px] font-black text-amber-400/70 uppercase text-center">
                        Qtà
                      </th>
                      <th className="py-2 md:py-3 px-3 md:px-6 text-[8px] md:text-[10px] font-black text-amber-400/70 uppercase text-right">
                        Prezzo
                      </th>
                      <th className="py-2 md:py-3 px-3 md:px-6 text-[8px] md:text-[10px] font-black text-amber-400/70 uppercase text-right">
                        Totale
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {report.materiali.map((m, i) => (
                      <tr
                        key={i}
                        className="hover:bg-amber-500/5 transition-colors"
                      >
                        <td className="py-2 md:py-4 px-3 md:px-6 font-bold text-white">
                          <span className="text-xs md:text-sm">{m.nome}</span>
                          {m.consiglio && (
                            <>
                              <br />
                              <span className="text-[9px] md:text-[10px] text-amber-400/70 font-normal">
                                {m.consiglio}
                              </span>
                            </>
                          )}
                        </td>
                        <td className="py-2 md:py-4 px-3 md:px-6 text-center">
                          <span className="bg-slate-800 text-white px-2 md:px-4 py-1 md:py-1.5 rounded-lg font-black text-xs md:text-base border border-slate-700 inline-block min-w-[50px] md:min-w-[60px]">
                            {m.qta}{" "}
                            <span className="text-[9px] md:text-[10px] font-normal text-slate-400 ml-0.5 md:ml-1">
                              {m.unit}
                            </span>
                          </span>
                        </td>
                        <td className="py-2 md:py-4 px-3 md:px-6 text-right font-medium text-slate-400 text-xs md:text-sm">
                          € {m.qta > 0 ? (m.prezzo / m.qta).toFixed(2) : "0.00"}
                        </td>
                        <td className="py-2 md:py-4 px-3 md:px-6 text-right font-black text-amber-400 text-xs md:text-sm">
                          € {m.prezzo.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center p-4 md:p-6 bg-slate-950/50 border-t border-slate-800">
                <button
                  onClick={generaPDF}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-6 md:px-10 py-3 md:py-4 rounded-xl font-black flex items-center gap-2 md:gap-3 hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/30 active:scale-95 text-xs md:text-sm uppercase tracking-wider w-full sm:w-auto justify-center"
                >
                  <Download size={16} className="md:w-5 md:h-5" /> Genera PDF
                </button>
              </div>
            </div>
          </div>
        ) : activeTab === "clienti" ? (
          <ClientiTab onSelectCliente={selezionaCliente} />
        ) : activeTab === "storico" ? (
          <StoricoTab onCaricaPreventivo={caricaPreventivo} />
        ) : (
          <PrezziTab listini={listini} updateListino={updateListino} />
        )}
      </div>
    </div>
  );
}

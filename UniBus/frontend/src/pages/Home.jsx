import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

function IlustracaoOnibus() {
    return (
        <svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg">
            {/* brilho decorativo atrás do ônibus */}
            <circle cx="170" cy="140" r="130" fill="#FFFFFF" opacity="0.35" />

            {/* sombra no chão */}
            <ellipse cx="170" cy="270" rx="110" ry="14" fill="#1C1A16" opacity="0.12" />

            {/* corpo do ônibus */}
            <rect x="55" y="90" width="230" height="120" rx="26" fill="#FFC633" stroke="#1C1A16" strokeWidth="4" />

            {/* faixa preta do teto */}
            <rect x="55" y="90" width="230" height="18" rx="9" fill="#1C1A16" />

            {/* faixa vermelha decorativa */}
            <rect x="55" y="150" width="230" height="14" fill="#E63946" />

            {/* janelas */}
            <rect x="75" y="118" width="42" height="28" rx="6" fill="#FFFFFF" stroke="#1C1A16" strokeWidth="3" />
            <rect x="127" y="118" width="42" height="28" rx="6" fill="#FFFFFF" stroke="#1C1A16" strokeWidth="3" />
            <rect x="179" y="118" width="42" height="28" rx="6" fill="#FFFFFF" stroke="#1C1A16" strokeWidth="3" />
            <rect x="231" y="118" width="34" height="28" rx="6" fill="#FFFFFF" stroke="#1C1A16" strokeWidth="3" />

            {/* porta */}
            <rect x="90" y="172" width="30" height="38" rx="4" fill="#FFFFFF" stroke="#1C1A16" strokeWidth="3" />

            {/* farol */}
            <circle cx="270" cy="190" r="8" fill="#FFFFFF" stroke="#1C1A16" strokeWidth="2" />

            {/* para-choque verde (detalhe vivo) */}
            <rect x="55" y="205" width="230" height="10" rx="5" fill="#16A34A" />

            {/* rodas */}
            <circle cx="105" cy="222" r="24" fill="#1C1A16" />
            <circle cx="105" cy="222" r="9" fill="#FFFFFF" />
            <circle cx="235" cy="222" r="24" fill="#1C1A16" />
            <circle cx="235" cy="222" r="9" fill="#FFFFFF" />
        </svg>
    );
}

function Home() {
    const navigate = useNavigate();

    return (
        <div className="page">
            <Header />

            <div className="container">

                <div className="hero-panel">
                    <div className="hero-conteudo">
                        <div>
                            <h1 className="titulo">UniBus 🚍</h1>

                            <p className="subtitulo">
                                Transporte universitário inteligente conectando estudantes,
                                motoristas e universidades.
                            </p>

                            <button className="btn-verde" onClick={() => navigate("/login")}>
                                Começar agora
                            </button>
                        </div>

                        <div className="hero-ilustracao">
                            <IlustracaoOnibus />
                        </div>
                    </div>

                    <div className="hero-nuvens"></div>
                </div>

                <div className="grid secao">
                    <div className="card card-destaque" style={{ "--cor-acento": "var(--amarelo-vivo)" }}>
                        <h2 className="titulo-card">🚌 Viagens</h2>
                        <p>Acompanhe seus trajetos.</p>
                    </div>

                    <div className="card card-destaque" style={{ "--cor-acento": "var(--verde)" }}>
                        <h2 className="titulo-card">📍 Localização</h2>
                        <p>GPS dos ônibus.</p>
                    </div>

                    <div className="card card-destaque" style={{ "--cor-acento": "var(--vermelho)" }}>
                        <h2 className="titulo-card">💬 Comunicação</h2>
                        <p>Converse com motoristas.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;
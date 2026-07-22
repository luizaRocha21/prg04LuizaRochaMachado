import Botao from "./Botao";

function classeStatus(status) {
    if (status === "Respondido") return "badge-verde";
    if (status === "Pendente") return "badge-ambar";
    return "badge-vermelho";
}

function Chamados({ chamados, abrirChat }) {
    return (
        <div className="card">
            <h2 className="titulo-card">🔔 Notificações</h2>

            {chamados.length === 0 && (
                <p>Nenhum chamado no momento.</p>
            )}

            {chamados.map(c => (
                <div key={c.id} style={{ marginBottom: "18px" }}>
                    <p><strong>{c.estudante || "Motorista"}</strong></p>
                    <p>{c.mensagem}</p>
                    <span className={`badge ${classeStatus(c.status)}`}>
                        {c.status}
                    </span>
                    <div style={{ marginTop: "10px" }}>
                        <Botao
                            texto="Abrir chat"
                            acao={() => abrirChat(c)}
                            tipo="amarelo"
                        />
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Chamados;
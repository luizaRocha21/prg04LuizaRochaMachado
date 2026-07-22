import Botao from "./Botao";

function ControleEmbarque({
    ida,
    volta,
    confirmarIda,
    confirmarVolta
}) {
    return (
        <div className="card">
            <h3 className="titulo-card">🚌 Embarque</h3>

            <Botao
                texto={ida ? "✅ Ida confirmada" : "Confirmar ida"}
                acao={confirmarIda}
                tipo={ida ? "verde" : "amarelo"}
                disabled={ida}
            />

            <Botao
                texto={volta ? "✅ Volta confirmada" : "Confirmar volta"}
                acao={confirmarVolta}
                tipo={volta ? "verde" : "amarelo"}
                disabled={volta}
            />
        </div>
    );
}

export default ControleEmbarque;
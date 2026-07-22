import Botao from "./Botao";

function Chat({ chat, mensagem, setMensagem, enviarMensagem }) {
    if (!chat) return null;

    return (
        <div className="card">
            <h2 className="titulo-card">💬 Chat</h2>

            <p>{chat.mensagem}</p>

            <input
                placeholder="Responder"
                value={mensagem}
                onChange={e => setMensagem(e.target.value)}
            />

            <Botao
                texto="Enviar"
                acao={enviarMensagem}
                tipo="verde"
            />
        </div>
    );
}

export default Chat;
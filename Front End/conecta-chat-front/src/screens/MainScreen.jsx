import Background from "../components/Background";
import { FotoExemplo } from "../assets/assets";
import useMain from "../hooks/useMain";
import ContactDiv from "../components/ContactDiv";
import LoadingScreen from "../components/LoadingScreen";
import Cookies from "js-cookie";

function MainScreen() {
  const {
    conversas,
    loading,
    user,
    conversaSelecionada,
    setConversaSelecionada,
    selecionarConversa,
    mensagem,
    setMensagem,
    enviarMensagem,
  } = useMain();

  const id_usuario = Number(Cookies.get("id_usuario"));

  if (!user) {
    return <LoadingScreen />;
  }

  console.log(conversaSelecionada);

  return (
    <Background>
      {loading && <LoadingScreen />}

      <div className="w-[70%] h-[90%] px-10 flex flex-col gap-5 items-center min-h-0">
        <h2 className="text-blue-800 text-5xl font-bold">Conecta Chat</h2>
        <div className="flex w-full bg-white h-20 rounded-xl shadow-2xl items-center justify-end pr-10">
          <div className="flex gap-3 items-center">
            <div className="h-14 w-14 overflow-hidden rounded-full">
              {user.foto ? (
                <img
                  className="h-full w-full object-cover"
                  src={user.foto}
                  alt={user.nome}
                />
              ) : (
                <div className="h-14 w-14 rounded-full border-3 border-blue-500 flex items-center justify-center">
                  <span className="font-bold text-2xl text-blue-500">
                    {user.nome.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <p className="font-medium text-[18px]">{user.nome}</p>
          </div>
        </div>
        <div className="w-full flex-1 min-h-0 flex items-center bg-white rounded-xl shadow-2xl">
          <div className="flex flex-col w-[30%] h-full">
            <div className="flex items-center pl-5 w-full h-25 border-r border-b border-gray-400">
              <h2 className="text-blue-800 text-4xl font-bold">Conversas</h2>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto w-full border-r border-gray-400 items-start">
              <ContactDiv
                conversas={conversas}
                conversaSelecionada={conversaSelecionada}
                selecionarConversa={selecionarConversa}
              />
            </div>
          </div>
          <div className="w-[70%] h-full min-h-0 flex flex-col">
            <div className="flex items-center justify-between px-5 h-25 w-full border-b border-gray-400"></div>

            <div className="flex-1 min-h-0 overflow-y-auto p-5 flex flex-col gap-3">
              {conversaSelecionada ? (
                conversaSelecionada.response.length > 0 ? (
                  conversaSelecionada.response.map((mensagem) =>
                    mensagem.id_usuario === id_usuario ? (
                      <div
                        key={mensagem.id}
                        className="flex flex-col mb-4 bg-blue-dark text-white p-3 rounded-md rounded-br-none max-w-[50%] self-end"
                      >
                        <p>{mensagem.conteudo}</p>
                        <span className="text-xs text-gray-500">
                          {mensagem.hora}
                        </span>
                      </div>
                    ) : (
                      <div
                        key={mensagem.id}
                        className="flex flex-col mb-4 bg-white text-gray-800 border border-black p-3 rounded-md rounded-bl-none max-w-[50%] self-start"
                      >
                        <p className="font-medium text-[16px]">
                          {mensagem.conteudo}
                        </p>
                        <span className="text-xs text-gray-500">
                          {mensagem.hora}
                        </span>
                      </div>
                    ),
                  )
                ) : (
                  <p className="text-gray-500">Nenhuma mensagem encontrada.</p>
                )
              ) : (
                <p className="text-gray-500">
                  Selecione uma conversa para ver as mensagens.
                </p>
              )}
            </div>

            <div className="h-25 w-full flex items-center border-t border-gray-400 gap-3 px-5">
              <input
                className="flex flex-1 border-2 border-gray-700 rounded-2xl h-12 appearance-none bg-transparent outline-none focus:outline-none focus:ring-0 pl-3"
                type="text"
                placeholder="Digite sua mensagem..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />

              <button
                onClick={enviarMensagem}
                className="rounded-2xl font-semibold px-6 py-3 bg-blue-dark text-white"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default MainScreen;

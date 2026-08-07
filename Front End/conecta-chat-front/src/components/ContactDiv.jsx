function ContactDiv({ conversas, conversaSelecionada, selecionarConversa }) {
  if (!conversas || conversas.length === 0) {
    return (
      <p className="text-gray-500 w-full text-2xl text-center mt-15">
        Você ainda não possui conversas!
      </p>
    );
  }

  return (
    <>
      {conversas.map((conversa) => {
        const visual =
          conversaSelecionada?.idConversa === conversa.id_conversa
            ? "before:scale-x-100"
            : "before:scale-x-0";

        return (
          <div
            onClick={() => selecionarConversa(conversa.id_conversa)}
            key={conversa.id_usuario}
            className={`
        relative w-full flex items-center gap-3 px-5 py-6
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:bg-gray-200

        before:absolute
        before:left-0
        before:top-0
        before:h-full
        before:w-1
        before:bg-blue-500
        before:origin-left
        before:transition-transform
        before:duration-300
        before:ease-in-out

        ${visual}
      `}
          >
            {conversa.foto ? (
              <img
                className="h-14 w-14 overflow-hidden rounded-full border-3 border-blue-500"
                src={conversa.foto}
                alt={conversa.nome}
              />
            ) : (
              <div className="h-14 w-14 rounded-full border-3 border-blue-500 flex items-center justify-center">
                <span className="font-bold text-2xl text-blue-500">
                  {conversa.nome.charAt(0)}
                </span>
              </div>
            )}

            <p className="font-medium text-[18px]">{conversa.nome}</p>
          </div>
        );
      })}
    </>
  );
}

export default ContactDiv;

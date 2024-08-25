document.addEventListener('DOMContentLoaded', () => {
    const criptografarBtn = document.getElementById('btn-cripto');
    const descriptografarBtn = document.getElementById('btn-descripto');
    const inputTexto = document.getElementById('input-texto');
    const sectionOutput = document.querySelector('.section-output');

   
    const substituicoes = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    const substituicoesInvertidas = Object.fromEntries(
        Object.entries(substituicoes).map(([chave, valor]) => [valor, chave])
    );

    
    function criptografar(texto) {
        return texto.split('').map(char => substituicoes[char] || char).join('');
    }

        function descriptografar(texto) {
        let resultado = texto;
        for (let [chave, valor] of Object.entries(substituicoesInvertidas)) {
            resultado = resultado.split(chave).join(valor);
        }
        return resultado;
    }

    function atualizarSaida(mensagem) {
        sectionOutput.innerHTML = `
            <div>
                <h2 class="output-h2">Resultado:</h2>
                <p class="output-paragrafo">${mensagem}</p>
                <button id="btn-copiar">Copiar</button>
            </div>
        `;

        // Mostrar o botão de copiar apenas quando houver um resultado
        const copiarBtn = document.getElementById('btn-copiar');
        if (copiarBtn) {
            copiarBtn.style.display = mensagem ? 'block' : 'none';
            copiarBtn.addEventListener('click', () => {
                const texto = document.querySelector('.output-paragrafo').textContent;
                if (texto) {
                    navigator.clipboard.writeText(texto)
                        .then(() => {
                            alert('Texto copiado para a área de transferência!');
                        })
                        .catch(err => {
                            console.error('Erro ao copiar texto: ', err);
                        });
                } else {
                    alert('Nenhum texto para copiar.');
                }
            });
        }
    }

    criptografarBtn.addEventListener('click', () => {
        const textoOriginal = inputTexto.value.toLowerCase(); 
        const textoCriptografado = criptografar(textoOriginal);
        atualizarSaida(textoCriptografado);
    });

    descriptografarBtn.addEventListener('click', () => {
        const textoCriptografado = document.querySelector('.output-paragrafo').textContent;
        const textoDescriptografado = descriptografar(textoCriptografado);
        atualizarSaida(textoDescriptografado);
    });
});

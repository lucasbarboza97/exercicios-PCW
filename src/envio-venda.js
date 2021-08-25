/**
 * Simula o envio de uma venda para um servidor fictício.
 * Por simplificação, não usa Promises.
 * Pode lançar exceção.
 *
 * @param {Venda} venda
 * @throws Error
 */
export function enviarVenda( venda ) {
    console.log( 'Enviando venda ', venda );
    if ( Math.random() % 2 == 0 ) {
        throw new Error( 'Houve algum erro no processamento do servidor.' );
    }
}
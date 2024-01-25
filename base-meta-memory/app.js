//Para usar variables de entorno
require("dotenv").config();

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const MetaProvider = require('@bot-whatsapp/provider/meta')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowMedidas=addKeyword(['']).addAnswer('Cual es el d')

const flowVentanaCorrediza=addKeyword(['1']).addAnswer(['Has elegido una ventana Corrediza. De cuantas hojas la quieres?','1 : de 2 Hojas','2 : de 3 Hojas','3 : de 4 Hojas'],null,null,[flowMedidas])

const flowVentanas=addKeyword(['1']).addAnswer(['Has elegido Ventana, Que tipo de ventana es de tu interés?:','1 : Ventanas Corredizas','2 : Ventanas de abrir','1 : Ventanas Proyectantes','1 : Ventanas Pivotantes','1 : Ventanas Oscilobatientes','1 : Ventanas Guillotinas'],null,null,[flowVentanaCorrediza])

const flowProducto=addKeyword(['']).addAnswer(['Selecciona la opción de tu interés:','1 : Para Ventanas','2 : Para Ventiluces','3 : Para Paños Fijos','4 : Para Puertas'],null,null,[flowVentanas/* flowVentiluces,flowPañosFijos,flowPuertas */])

const flowPrincipal = addKeyword(['producto', 'pepe'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
        ],
        null,
        null,
        [flowProducto]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])

    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: process.env.META_KEY,
        numberId: 212247548640285,
        verifyToken: 'ARANDA',
        version: 'v16.0',
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
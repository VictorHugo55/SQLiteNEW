import axios from "axios"


//Tipando a resposta vindo da requisição
interface TranslationRequest{
    responseData:{
        translatedText:string //Texto Traduzido
    }
}


// Configurações constantes da APi
const API_CONFIG ={
    url:"https://api.memory.translated.net/get", //url da api
    retries:3, //numero maximo de tentativa em caso de erro
    delay: 1000, //Delay de 1 segundo por tentativa
    timeout:10000, //Tempo maximo esperando um resposta
} as const;

async function makeTranslationRequest(text:string):Promise<string> {
    //Configuração da requisição GET
    const requestConfig = {
        params:{q:text,langpair:'pt|en'},
        headers:{
            'Accept':'*/*', //Aceita qualquer tipo de resposta
            'Accept-Encoding':'gzip,deflet,br', //Compactado
            'Connection':'keep-alive' //Mantém a conexão aberta
        },
        timeout:API_CONFIG.timeout
    }

    //Chama a API usando axios e tipa a resposta
    const response = await axios.get<TranslationRequest>(API_CONFIG.url,requestConfig)
    
    // retorna o texto traduzido
    return response.data.responseData.translatedText
}

export async function translateToEnglish(text:string):Promise<string>{
    //Validação simples que se o texto estiver vazio, retorna uma string vazia
    if(!text.trim()) return ""

    for (let attempt = 1; attempt <= API_CONFIG.retries; attempt++){
        try{
            //TEnta realizar a requisição de tradução
            return await makeTranslationRequest(text)
        }catch(error){
            console.log(`Tentativa:${attempt}/3 falhou`, error)
        }
    }
    //Se todas as tentativas falharem, retorna uma string vazia 
    return ""
}
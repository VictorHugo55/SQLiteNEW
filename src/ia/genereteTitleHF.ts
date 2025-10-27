import axios from "axios"

const HF_API_KEY = process.env.EXPO_PUBLIC_HF_API_KEY

//Função para gerar um título a partir do conteúdo da nota

// O conteudo (descrição da nota para ser usado como base para gerar o título)
// A Função deverá retornar um dado do tipo string

export async function generateTitleFromContentHF(content:string) {
    //Se o Conteudo estiver vazio retorna uma string vazia
    if(!content.trim()) return "";

    try{
        //Requisição POST para API de inferência da Hugging Face
        const response = await
        axios.post("https://api-inference.huggingface.co/models/facebook/bart-large-cnn",//url da API
            {
                //input é o texto que será processado
                inputs:content,
                //Parameters são configurações adicionais do modelo
                parameters:{
                    max_length:10,      //Tamanho máximo do ítulo
                    min_length: 3,      //Tamanho minimo
                    do_sample:false,    //caso True, gera variações aleatórias
                    early_stopping:true //Encerra geração assim que o modelo achar adequada
                }
            },
            {
                //Cabeçalho da requisição
                headers:{
                    Authorization:`Bearer ${HF_API_KEY}`, //Autenticação
                    "Content-Type":"application/json", //Tipo do conteudo
                }
            }
        )

        //O modelo vai retornar um array de resultado
        //Algunst modelos usam "sumary_text", outros usam 'generated_text
        const generatedText = response.data?.[0]?.summary_text || response.data?.[0]?.generated_text|| ""
        
        //Retorna p titulo gerado
        return generatedText.trim() // Sem espaço no começo e no fim
    }catch(error){
        //Se der erro, mostra no console e retorna uma  string
        console.log("Erro na geração do titulo", error)
        return ""
    }
}
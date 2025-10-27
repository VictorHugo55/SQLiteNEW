import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, TextInput, View,Alert } from "react-native";
import { addNote } from "@/src/db/notes";
import { MotiView } from "moti";
import { generateTitleFromContentHF } from "@/src/ia/genereteTitleHF";

export default function AddNoteScreen(){
    const[title,setTitle]=useState('')
    const[content,setContent]=useState('')
    const[loading,setLoading]=useState(false)
    const router = useRouter()//Hook de navegação

    //Função chamada quando pressionado o botão salvar
    function handleSave(){
        if(!title.trim()){
            Alert.alert("Atenção","Digite um título para a nota.")
            return
        }

        addNote(title,content)//Adiciona no banco de dados
        
        router.back()//Retorna para a tela inicial

    }

    //Função para gerar o titulo
    async function handleGenerateTitle() {
        if(!content.trim()){
            Alert.alert("Atenção","Digite i, título para nota.")
            return
        }

        setLoading(true)
        const generated = await generateTitleFromContentHF(content)
        if(generated){
            setTitle(generated)
            setLoading(false)
        }
    }
    return(
        <View style={{flex:1,padding:20}}>
            <MotiView
                from={{opacity:0, translateX:-30}}
                animate={{opacity:1, translateX:0}}
                transition={{delay:1000}}
            >
                <TextInput
                    placeholder="Título"
                    value={title}
                    onChangeText={(value)=>setTitle(value)}
                    style={{
                        borderWidth:1,
                        padding:10,marginBottom:10,
                        borderRadius:6
                    }}
                />
            </MotiView>
           
            <MotiView
                from={{opacity:0, translateX: 30}}
                animate={{opacity:1, translateX:0}}
                transition={{delay:1000}}
            >
                {/* TextInput do Conteúdo */}
             <TextInput
                placeholder="Conteúdo"
                value={content}
                onChangeText={(value)=>setContent(value)}
                multiline
                style={{
                    borderWidth:1,height:120,
                    padding:10,marginBottom:10,
                    borderRadius:6
                }}
            />
            </MotiView>

            <MotiView
                from={{opacity:0.8,scale:1}}
                animate={{opacity:1,scale:1.05}}
                transition={{
                    loop:true,
                    type:'timing',
                    duration:1000
                }}
            >
                
             <Button title="Gerar Título com IA"/>
            </MotiView>        
            
            <MotiView
                from={{opacity:0.50,scale:0.95}}
                animate={{opacity:1,scale:1}}
                transition={{
                    loop:true,
                    type:'timing',
                    duration:1000
                }}
            >
                <Button title="Salvar" onPress={handleSave} />
            </MotiView>
            
        </View>
    )
}
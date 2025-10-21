import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, Button, TextInput } from 'react-native'
//Importanto fuções do banco de dados
import { getNotes, updateNote } from '@/src/db/notes'
import { MotiView } from 'moti'

interface Note {
    id: number,
    title: string,
    content: string,
    createdAt: string
}
export default function EditNoteScreen() {
    //Pega o parâmetro da rota
    const params = useLocalSearchParams<{ id: string }>()
    const router = useRouter()//Hook de navegação

    //Estados para armazenar título e conteúdo da nota
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        if (!params.id) return //Se não tiver ID, não faz nada

        const note = (getNotes() as Note[])
            .find(n => n.id === Number(params.id))

        //Se encontrou a nota, preenche os estados
        if (note) {
            setTitle(note.title)
            setContent(note.content)
        }
    }, [params.id])

    //Função que quando clicada em atualizar, será chamada.
    function handleUpdate() {
        if (!title.trim()) {//Validação simples: título não pode estar vazio
            Alert.alert("Atenção", "Digite um título.")
            return
        }

        //Atualiza a nota no banco de dados
        updateNote(Number(params.id), title, content)

        //Voltar para a tela de index
        router.back()
    }
    return (
        <MotiView
            from={{opacity:0, translateY:300}}
            animate={{opacity:1, translateY:0}}
            transition={{type:"timing", duration:4000}}
            style={{ flex: 1, padding: 20 }}
        >
            <MotiView
                from={{opacity:0, translateX:-30}}
                animate={{opacity:1, translateX:0}}
                transition={{delay:1000}}
            >
                <TextInput
                placeholder="Título"
                value={title}
                onChangeText={(value) => setTitle(value)}
                style={{
                    borderWidth: 1,
                    padding: 10, marginBottom: 10,
                    borderRadius: 6
                }}
            />
            </MotiView>
            
            <MotiView
                from={{opacity:0, translateX:30}}
                animate={{opacity:1, translateX:0}}
                transition={{delay:2000}}
            >
                {/* TextInput do Conteúdo */}
                <TextInput
                    placeholder="Conteúdo"
                    value={content}
                    onChangeText={(value) => setContent(value)}
                    multiline
                    style={{
                        borderWidth: 1, height: 120,
                        padding: 10, marginBottom: 10,
                        borderRadius: 6
                    }}
                />
            </MotiView>
            
            <MotiView
                from={{opacity:0.50,scale:0.95}}
                animate={{opacity:1,scale:1}}
                transition={{
                    loop:true,
                    type:'timing',
                    duration:500
                }}
            >
                <Button title="Atualizar" onPress={handleUpdate} />
            </MotiView>
            
        </MotiView>
    )
}
import { deleteNote, getNotes } from "@/src/db/notes";
import { useFocusEffect, useRouter } from "expo-router";
import { MotiView, MotiText} from "moti";
import { useCallback, useState } from "react";
import { View,FlatList, Text, Button} from "react-native";


export default function HomeScreen() {
  const [notes, setNotes] = useState<any[]>([])//Estado para armazenar as notas
  const router = useRouter()//hook de navegação

  //Sempre executa quando a tela volta a ser foco
  useFocusEffect(
    useCallback(() => {
      setNotes(getNotes())//Carregar todas as notas salvas no banco
    }, [])
  )

  //Função para deletar a note
  function handleDelete(id:number){
    deleteNote(id)//Deleta do banco
    setNotes(getNotes())//Atualiza a lista
  }

  return (
    <View>
      <Button title="Adicionar nota" onPress={() => router.push("/add")} />
      <FlatList
        data={notes}
        keyExtractor={item=>item.id.toString()}
        renderItem={({ item, index }) => (
          <MotiView 
            from={{opacity:0, translateY:20}}
            animate={{opacity:1, translateY:0}}
            transition={{delay:index*100}}
            style={{borderBottomWidth:1, padding:10,marginBottom:5}}
          >
            <MotiText 
              from={{scale:0.95}}
              animate={{scale:1}}
              transition={{type:"timing", duration:2000}}
              style={{fontSize:16,fontWeight:'bold'}}
            >
              {item.title}
            </MotiText>
            <Text>{item.content} - ID:{item.id}</Text>
            <View style={{flexDirection:'row',gap:5}}>
              {/* Botão de editar a nota*/}              
                <Button 
                  title="Editar" 
                  onPress={()=>router.push(`./edit/${item.id}`)}
                />              

              {/* Botão para deletar a nota */}              
                <Button 
                  title="Deletar" 
                  color='red' 
                  onPress={()=>handleDelete(item.id)}/>              
            </View>
          </MotiView>
        )}
      />
    </View>
  );
}

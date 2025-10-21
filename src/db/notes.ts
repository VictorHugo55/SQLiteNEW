import * as SQLite from "expo-sqlite"

//Abre ou cria o banco de dados local chamado 'notas.db'
const db = SQLite.openDatabaseSync('notas.db')

//Cria tabela 'notes' caso não exista
db.execSync(`
    CREATE TABLE IF NOT EXISTS notes2(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT,
        createdAt TEXT NOT NULL
    )
`)

//Função para ler as notas do banco
export function getNotes(){
    return db.getAllSync('SELECT * FROM notes2 ORDER BY id DESC')
}

//Função para adiconar uma nota
export function addNote(title:string,content:string){
    const createdAt = new Date().toISOString()//pega a data/hora atual
    db.runSync(
        'INSERT INTO notes2 (title,content,createdAt) VALUES (?,?,?)',
        [title,content,createdAt]
    )
}

//Função para atualizar uma nota existente
export function updateNote(id:number,title:string,content:string){
    db.runSync(
        'UPDATE notes2 SET title=?,content=? WHERE id=?',[title,content,id]
    )
}

//Função para deletar uma nota
export function deleteNote(id:number){
    db.runSync('DELETE FROM notes2 WHERE id=?',[id])
}
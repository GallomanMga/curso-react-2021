import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/rooms.scss'

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighligthted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string
    isAnswered: boolean;
    isHighligthted: boolean;
}

type RoomParams = {
    id: string;
}

export function Rooms() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const [ newQuestion, setNewQuestion ] = useState('');
    const [ questions, setQuestions ] = useState<Question[]>([]);
    const [ title, setTitle ] = useState('');
   

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
          
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestion: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
              return {
                 id: key,
                 content: value.content,
                 author: value.author,
                 isHighligthted: value.isHighligthted,
                 isAnswered: value.isAnswered,
              }
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions)
        })
    }, [roomId]);

    async function handleSendQuestions(event: FormEvent) {
       event.preventDefault()

       if (newQuestion.trim() == '') {
           return;
       }

       if (!user) {
           throw new Error('You must be logged in')
       }
       const question = {
           content: newQuestion,
           author: { 
              name: user.name,
              avatar: user.avatar
           },
           isHighligthted : false,
           isAnswered: false
       };

       await database.ref(`rooms/${roomId}/questions`).push(question)

       setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className='content'>
                    <img src={logoImg} alt="LetmeAsk" />
                    <RoomCode code={roomId}/>
                </div>
            </header>

            <main className="content">
                <div className='room-title'>
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} perguntas</span> }
                </div>

                <form onSubmit={handleSendQuestions}>
                    <textarea 
                        placeholder="O que voc?? quer perguntar ?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />
                    <div className="form-footer">
                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                        <span>Para enviar uma pergunta, <button>fa??a seu login</button></span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar Pergunta</Button>
                    </div>
                </form>

                
            </main>


        </div>
    )
}
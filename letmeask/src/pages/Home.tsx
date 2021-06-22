
import { useHistory } from 'react-router-dom'

import { auth, firebase } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'



import '..//styles/auth.scss';

import { useAuth } from '../hooks/useAuth'

//webpack module bunddler

export function Home() {
    const history = useHistory(); //hook
    const { user, signInWithGoogle } = useAuth()
    

    async function handleCreateRoom() {
        if (!user) {
           await signInWithGoogle();
        }

        history.push('/rooms/new')
    }

    return (
        <div id="page-auth">
            <aside>
              <img src={illustrationImg} alt="Imagem simbolizando perguntas e respostas"/>
              <strong>Crie salas de Q&amp;A</strong>
              <p>Tire as dúvidas de sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room"> 
                        <img src={googleIconImg} alt="Logo do Google" /> 
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}
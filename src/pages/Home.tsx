import { IonButton, IonContent, isPlatform } from '@ionic/react';

import { pdfbase64 } from './pdf'

import './Home.css';
import { saveAndOpenPdf } from '../components/Functions';



export default function Home() {

  return (
    <IonContent>
      <div className='div-center'>
        <IonButton onClick={() => saveAndOpenPdf(pdfbase64, 'file.pdf')} />
      </div>
    </IonContent>
  )
}
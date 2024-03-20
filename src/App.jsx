import { useEffect, useState } from 'react'
import './App.css'
import { Boxes } from './components/ui/BackgroundBoxes'
import { BackgroundGradient } from './components/ui/BackgroundGradient'
import { CardBody, CardContainer, CardItem } from './components/ui/Card'
import { getStoredFileLink } from './utils/DbConfig'
import { getDatabase, ref, onValue } from "firebase/database";

function App() {
  const [userData, setUserData] = useState()
  const [imagesMap, setImagesMap] = useState({})

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, 'users/')
    onValue(dbRef, (ss) => {
      const data = ss.val()
      setUserData(data)
    });
  }, [])

  useEffect(() => {
    userData && Object.keys(userData).forEach(async key => {
      const link = await getStoredFileLink(userData[key].fileName)
      setImagesMap((prev) => { return { ...prev, [key]: link } })
    });

  }, [userData])
  return (
    <>
      <Boxes />
      <div >
        <BackgroundGradient className="rounded-[22px] sm:p-2 bg-white dark:bg-zinc-900">
          <h3 className='font-bold text-2xl text-neutral-700 dark:text-white text-center'>Defaulter's Realtime List</h3>
        </BackgroundGradient>
        <div className='flex items-center justify-center flex-wrap gap-2 h-full mt-2'>

          {userData && Object.keys(userData).map((key, i) => {
            const data = userData[key]
            return <CardContainer className="inter-var" key={key}>
              <CardBody key={key} className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  Computer Name - <i>
                    {data.machineName}
                  </i>
                </CardItem>
                <CardItem as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  Profane word typed - <i >
                    {data.word}
                  </i>
                </CardItem>
                <CardItem as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  Date - <i >
                    {data.createdAt.replace(",", " at")}
                  </i>
                </CardItem>
                <CardItem as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  Screenshot -
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  {imagesMap && <a href={imagesMap[key]} target='_blank'>
                    <img src={imagesMap[key]} />
                  </a>
                  }
                </CardItem>
                <CardItem as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                  Original File Path - <i >
                    {data?.filePath}
                  </i>
                </CardItem>
              </CardBody>
            </CardContainer>
          })}
        </div>
      </div>
    </>
  )
}

export default App

 import { useState } from 'react'
import AppDownload from '../../components/AppDownload/AppDownload'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import Header from '../../components/Header/Header'
import './Home.css'
import ShowFoods from '../../components/ShowFoods/ShowFoods'

const Home = () => {
  const [category,setCategory]=useState('all')
  return (
    <div className='home'>
       <Header/>
       <ExploreMenu category={category||'all'} setCategory={setCategory}/>
       <ShowFoods category={category}/>
       <AppDownload/>
    </div>
  )
}

export default Home

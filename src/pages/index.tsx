import type { NextPage } from 'next'
import Head from 'next/head'
import { RootState } from '../redux-store/store'
import { useSelector, useDispatch } from 'react-redux' 
import { increment, decrement } from '../redux-store/reducers/counter'

const Home: NextPage = () => {

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <Head>
        <title>SVG Editing Tool</title>
        <meta name="description" content="Tool for creating and editting svg files" />
      </Head>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </div>
  )
}

export default Home

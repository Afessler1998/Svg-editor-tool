import type { NextPage } from 'next';
import Head from 'next/head';
import SvgContainer from '../components/svg/SvgContainer';

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>SVG Editing Tool</title>
        <meta name="description" content="Tool for creating and editting svg files" />
      </Head>
      <SvgContainer />
    </div>
  );
}

export default Home;

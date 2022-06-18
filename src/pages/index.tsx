import type { NextPage } from 'next';
import Head from 'next/head';
import style from "../styles/layout.module.css";
import Toolbar from '../components/toolbar/Toolbar';
import SvgContainer from '../components/svg/SvgContainer';
import ElementListSidebar from '../components/elementListSidebar/elementListSidebar';
import ElementControlSidebar from '../components/elementControlSidebar/elementControlSidebar';

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>SVG Editing Tool</title>
        <meta name="description" content="Tool for creating and editting svg files" />
      </Head>
      <div className={style.layout}>
        <Toolbar />
        <div className={style.rowLayout}>
          <ElementListSidebar />
          <div className={style.svgWrapper}>
            <SvgContainer width={500} height={500}/>
          </div>
          <ElementControlSidebar />
        </div>
      </div>
    </div>
  );
}

export default Home;

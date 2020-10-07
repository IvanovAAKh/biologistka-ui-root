import React from 'react';

import Footer from 'components/Footer/index';
import PageContainer from 'components/PageContainer/index';
import PageHeader from 'components/PageHeader/index';
import MainPage from 'pages/Main';

const Main = () => {
  return (
    <>
      <PageHeader />
      <PageContainer>
        <MainPage />
      </PageContainer>
      <Footer />
    </>
  )
};

export default Main;
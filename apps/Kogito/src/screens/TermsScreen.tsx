import React, {useEffect} from 'react';
import {BackHandler, Image, ScrollView} from 'react-native';
import HTML from 'react-native-render-html';

import Logo from '~assets/logo.png';
import type {AppScreen} from '~modules/navigation';

import MainContainer from '../components/container/MainContainer';
import MainContainerWrapper from '../components/container/MainContainerWrapper';
import Button from '../components/primitives/Button';
import ColoredSafeAreaView from '../components/primitives/ColoredSafeAreaView';
import terms from '../user/data/terms';
import {useTerms} from '../user/useTerms';

const TermsScreen: AppScreen<'Terms'> = ({navigation: {replace}}) => {
  const {setSeenTerms, haveSeenTerms} = useTerms();

  useEffect(() => {
    if (haveSeenTerms) {
      replace('Login');
    }
  }, [haveSeenTerms]);

  const handleAgreePress = async () => {
    await setSeenTerms();
    replace('Login');
  };

  const handleDeclinePress = () => {
    BackHandler.exitApp();
  };

  return (
    <ColoredSafeAreaView>
      <MainContainerWrapper>
        <ScrollView>
          <MainContainer align="center">
            <Image source={Logo} />
            <HTML source={{html: terms}} />
            <Button
              style={{marginTop: -50}}
              title="Souhlasím"
              onPress={handleAgreePress}
            />
            <Button
              colorVariant="transparent"
              title="Ne"
              type="small"
              onPress={handleDeclinePress}
            />
          </MainContainer>
        </ScrollView>
      </MainContainerWrapper>
    </ColoredSafeAreaView>
  );
};

export default TermsScreen;

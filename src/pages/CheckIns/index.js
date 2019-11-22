import React, {useState, useEffect} from 'react';
import {Alert, FlatList} from 'react-native';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';
import {useSelector} from 'react-redux';

import Header from '~/components/Header';

import {Container, NewCheckInButton, Item, Identifier, Time} from './styles';

import api from '~/services/api';

export default function CheckIns() {
  const studentId = useSelector(state => state.auth.id);
  const [checkins, setCheckIns] = useState([]);

  async function loadCheckIns() {
    const response = await api.get(`students/${studentId}/checkins`);

    const formatedCheckin = response.data
      .map((checkIn, index) => ({
        ...checkIn,
        index: index + 1,
        parsedDate: formatRelative(parseISO(checkIn.createdAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
      }))
      .reverse();

    setCheckIns(formatedCheckin);
  }

  useEffect(() => {
    loadCheckIns();
  }, []); // eslint-disable-line

  async function handleOnPress() {
    try {
      await api.post(`students/${studentId}/checkins`);
      loadCheckIns();
    } catch (err) {
      Alert.alert('Limite de check-ins por semana estourado!');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <NewCheckInButton onPress={handleOnPress}>
          Novo check-in
        </NewCheckInButton>

        <FlatList
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Item>
              <Identifier>Check-in #{item.index}</Identifier>
              <Time>{item.parsedDate}</Time>
            </Item>
          )}
        />
      </Container>
    </>
  );
}

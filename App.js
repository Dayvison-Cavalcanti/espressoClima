

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';




export default function App() {

  const [city, setCity] = useState('Moreno');
  const [weatherData, setWeatherData] = useState();


  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (hora) => {
    setSelectedCard(hora);
  };

  const Card = ({ temperatura, hora }) => {
    const isSelected = selectedCard === hora;
    const cardStyle = isSelected ? styles.clickedCard : styles.card;

    return (
      <Pressable style={cardStyle} onPress={() => handleCardClick(hora)}>
        <Text style={[styles.text]}>{temperatura}</Text>
        <Image source={{ uri: `https://assets.hgbrasil.com/weather/icons/conditions/${weatherData?.results?.condition_slug}.svg` }} style={styles.weatherIcon2} />
        <Text style={[styles.text]}>{hora}</Text>
      </Pressable>
    );
  };


  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.hgbrasil.com/weather?format=json-cors&key=d5df87dc&city_name=${city}`);

      setWeatherData(response.data);
      console.log(weatherData)
      setCity('');
    } catch (error) {
      console.error(error);
      console.log('Cidade não Localizada', error)
      
    }
  };

  const ForecastItem = ({ forecast }) => {
    return (
      <View style={[styles.contentBox1, { backgroundColor: boxGradienteColor() }]}>
        <Text style={[styles.textTemp2]}>{forecast.weekday}</Text>
        <Image source={{ uri: `https://assets.hgbrasil.com/weather/icons/conditions/${forecast.condition}.svg` }} style={styles.weatherIcon2} />
        <Text style={[styles.textTemp2]}>Max: {forecast.max}°</Text>
        <Text style={[styles.textTemp2]}>Min: {forecast.min}°</Text>
      </View>
    );
  };

  const gradienteColors = () => {
    if (weatherData && weatherData.results.currently === 'noite') {
      return ["#020C56", "#3468D1"];
    } else {
      return ["#1B92D6", "#3FAED3"];
    }
};

  const boxGradienteColor = () => {
    if (weatherData && weatherData.results.currently === 'noite') {
      return "#020C56";
    } else {
      return "#3468D1";
    }
  };

  return (
    <LinearGradient
      // Array de cores para o gradiente

      colors={gradienteColors()} style={styles.container}>

      <View style={{flex:1}}>
        <View style={[styles.searchConatiner]}>
        <MaterialIcons name="search" size={40} color="white" style={styles.icon2} />
          <TextInput
            style={styles.searchBox}
            value={city}
            onChangeText={text => setCity(text)}
            onSubmitEditing={fetchWeatherData}
            
            
          />
        </View>

        <View>
          {weatherData && (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>

              <View style={[styles.cityContainer]}>

                <Text style={[styles.textCity]}>{weatherData?.results?.city}</Text>
                <Image source={{ uri: `https://assets.hgbrasil.com/weather/icons/conditions/${weatherData?.results?.condition_slug}.svg` }} style={styles.weatherIcon} />

                <Text style={[styles.textTemp1]}>{weatherData?.results?.temp}°</Text>
                <Text style={[styles.textDesc]}>{weatherData?.results?.description}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.textTemp2]}>Max.: {weatherData?.results?.forecast[0]?.max}°</Text>
                  <Text style={[styles.textTemp2]}>Min.: {weatherData?.results?.forecast[0]?.min}°</Text>
                </View>
              </View>
              <View style={[styles.contentBox, styles.box1, { backgroundColor: boxGradienteColor() }]}>
                <View style={[styles.contentBox1]}>
                  <MaterialIcons name="grain" size={16} color="white" style={styles.icon} />
                  <Text style={styles.box1Text}>{weatherData?.results?.forecast[0]?.rain_probability}</Text>
                </View>
                <View style={[styles.contentBox1]}>
                  <FontAwesome name="thermometer-0" size={16} color="white" style={styles.icon} />
                  <Text style={styles.box1Text}> {weatherData?.results?.humidity}</Text>
                </View>
                <View style={[styles.contentBox1]}>
                  <FontAwesome5 name="wind" size={16} color="white" style={styles.icon} />
                  <Text style={styles.box1Text}>{weatherData?.results?.wind_speedy}</Text>
                </View>
              </View>
            </View>

          )}
          <View style={[styles.contentBox2, { backgroundColor: boxGradienteColor() }, {style:{flex:1}}]}>
            {weatherData && (
              <View >
                <View style={styles.box2Line1}>
                  <Text style={styles.boxTextBold}>Hoje</Text>
                  <Text style={styles.box2Text}>{weatherData.date}</Text>
                </View>
                <View style={styles.box2Line2}>
                  <Card
                    temperatura="28º"
                    hora="11:00"
                    selected={selectedCard === '11:00'}
                    onClick={() => handleCardClick('11:00')}
                    style={{color:'#F2F2F2'}}
                  />
                  <Card
                    temperatura="30º"
                    hora="12:00"
                    selected={selectedCard === '12:00'}
                    onClick={() => handleCardClick('12:00')}
                  />
                  <Card
                    temperatura="31º"
                    hora="13:00"
                    selected={selectedCard === '13:00'}
                    onClick={() => handleCardClick('13:00')}
                  />
                  <Card
                    temperatura="32º"
                    hora="14:00"
                    selected={selectedCard === '14:00'}
                    onClick={() => handleCardClick('14:00')}
                  />
                </View>
              </View>
            )}
          </View>
          <View style={[styles.scrolContainerView, { backgroundColor: boxGradienteColor() }]}>
            <ScrollView style={[styles.scrolContainer, { backgroundColor: boxGradienteColor() }]}>
              {weatherData?.results?.forecast?.slice(1,8)?.map((forecast, index) => (
                <ForecastItem key={index} forecast={forecast} />
              ))}
            </ScrollView>
          </View>

        </View>

      </View>
    </LinearGradient >
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
  },

  searchBox: {
    width: 500,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:15,
    marginBottom: 20,
    color:'#F2F2F2',
    fontSize: 25,
    padding:15

  },
  searchConatiner: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  weatherIcon1: {
    width: 100,
    height: 100,
  },
  weatherIcon2: {
    width: 50,
    height: 50,
  },

  cityContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textCity: {
    color: '#F2F2F2',
    fontSize: 20,
    alignItems: 'center'

  },

  textTemp1: {
    color: '#F2F2F2',
    fontSize: 50,
    marginTop: -20
  },

  textTemp2: {
    color: '#F2F2F2',
    fontSize: 15,
    margin: 5

  },

  textDesc: {
    fontSize: 16,
    color: '#F2F2F2',
  },

  scrolContainer: {
    width: 300,
    height: 300,
    margin: 30,
    alignSelf: 'center',



  },
  scrolContainerView: {
    width: 400,
    height: 300,
    marginTop: 20,
    borderRadius: 25,
    borderBlockColor: '#F2F2F2',
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    
    //backgroundColor: '#2A98CF'
  },
  contentBox1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
  },

  contentBox: {
    //width: '100%',
    marginBottom: 20,
    borderRadius: 15,
    width: 400,
    height: 40,
    marginTop: 20,
    //backgroundColor: '#2A98CF',
    borderBlockColor: '#F2F2F2',
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  contentBox2: {
    //width: '100%',
    marginBottom: 20,
    borderRadius: 25,
    width: 400,
    height: 200,
    marginTop: 20,
    //backgroundColor: '#2A98CF',
    borderBlockColor: '#F2F2F2',
    borderWidth: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  box1: {

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 5,
  },
  icon2: {
    marginRight: 10,
    marginTop: -15
  },
  box1Text: {
    color: '#F2F2F2',
    fontSize: 16,
    fontWeight: '600',
  },
  box: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 25,
  },
  box2: {
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 15,
  },
  box2Line1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 25,
  },
  boxTextBold: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  box2Text: {
    color: '#fff',
    fontSize: 16,
  },
  box2Line2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
    width: '100%',
  },
  card: {
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 6,
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 5,
    alignItems:'center'
    
  },
  clickedCard: {
    backgroundColor: 'rgba(29, 105, 222, 0.3)',
    borderWidth: 1,
    borderColor: '#F2F2F2',
    borderRadius: 10,
    alignItems:'center'
  },
  text: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 5,
  },
});

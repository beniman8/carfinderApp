import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Picker,
  SafeAreaView,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import MapView from 'react-native-maps';
import {Icon} from 'react-native-elements';

const {height, width} = Dimensions.get('screen');
const {Marker} = MapView;

const parkings = [
  // This is how you receive an array of data
  {
    id: 1,
    key: 1,
    title: 'Parking 1',
    price: 5,
    rating: 4.2,
    spots: 10,
    free: 10,
    coordinate: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
  },
  {
    id: 2,
    key: 2,
    title: 'Parking 2',
    price: 7,
    rating: 3.2,
    spots: 20,
    free: 20,
    coordinate: {
      latitude: 37.76,
      longitude: -122.4324,
    },
  },
  {
    id: 3,
    key: 3,
    title: 'Parking 3',
    price: 10,
    rating: 4.9,
    spots: 50,
    free: 20,
    coordinate: {
      latitude: 37.781,
      longitude: -122.4324,
    },
  },
];

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: [1, 1, 1, 1],
      active: null,
    };
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text>header</Text>
      </View>
    );
  }

  renderParking(item) {
    const {hours} = this.state; //need to find logic for populating the amount of hour the car is parked

    return (
      <TouchableWithoutFeedback
        key={`parkings-${item.id}`}
        onPress={() => this.setState({active: item.id})}>
        <View style={[styles.parking, styles.shadow]}>
          <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
            <Text style={{fontSize: 16}}>
              x {item.spots} {item.title}
            </Text>

            <View
              style={{
                width: 100,
                borderRadius: 8,
                borderColor: 'grey',
                borderWidth: 0.5,
                padding: 1,
              }}>
              <Picker
                selectedValue={this.state.hours[item.id]}
                style={{height: 50, width: 100}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({
                    hours: {...this.state.hours, [item.id]: itemValue},
                  })
                }>
                <Picker.Item label="1:00" value="1" />
                <Picker.Item label="2:00" value="2" />
                <Picker.Item label="3:00" value="3" />
                <Picker.Item label="4:00" value="4" />
                <Picker.Item label="5:00" value="5" />
                <Picker.Item label="6:00" value="6" />
              </Picker>
              {/* <Text style={{fontSize: 16}}>05:00</Text> */}
            </View>
          </View>

          <View style={{flex: 1.5, flexDirection: 'row'}}>
            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                marginHorizontal: 15,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Icon name="ios-pricetag" type="ionicon" color="#517fa4" />
                <Text style={{paddingLeft: 5, color: '#7D818A'}}>
                  ${item.price}
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Icon name="ios-star" type="ionicon" color="#517fa4" />
                <Text style={{paddingLeft: 5, color: '#7D818A'}}>
                  {item.rating}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.buy}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontSize: 25, color: 'white'}}>
                  ${item.price * hours[item.id]}
                </Text>
                <Text style={{color: 'white'}}>
                  {item.price}x{hours[item.id]} hrs
                </Text>
              </View>
              <View
                style={{
                  flex: 0.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 21, color: 'white'}}>></Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderParkings() {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        centerContent
        showsHorizontalScrollIndicator={false}
        style={[styles.parkings, styles.shadow]}
        data={parkings}
        keyExtractor={item => item.key.toString()}
        renderItem={({item}) => this.renderParking(item)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          initialRegion={{
            latitude: 37.78845,
            longitude: -122.4335,
            latitudeDelta: 0.0822,
            longitudeDelta: 0.0521,
          }}
          style={styles.map}>
          {parkings.map(parking => (
            <Marker
              key={`marker-${parking.id}`}
              coordinate={parking.coordinate}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({active: parking.id})}>
                <View
                  style={[
                    styles.marker,
                    styles.shadow,
                    this.state.active === parking.id ? styles.active : null,
                  ]}>
                  <Text style={{color: '#B40015', fontWeight: 'bold'}}>
                    ${parking.price}{' '}
                  </Text>
                  <Text style={{color: '#7D818A'}}>
                    ({parking.free}/{parking.spots})
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Marker>
          ))}
        </MapView>

        {this.renderParkings()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 0.5,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  map: {
    flex: 3,
  },
  parkings: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: 24,
  },
  parking: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    marginHorizontal: 12,
    width: width - 12 * 2,
  },
  buy: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    borderRadius: 9,
    backgroundColor: '#D25260',
  },
  marker: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: 'white',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  active: {
    flex: 0.5,
    borderColor: '#B40015',
  },
});

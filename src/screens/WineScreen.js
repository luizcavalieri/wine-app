import React from 'react';
import { compose, graphql } from 'react-apollo';
import { ScrollView, StyleSheet, View, Image, Text } from 'react-native';
import { MonoText } from '../components/StyledText';
import { GET_WINES } from '../graphql/resolvers/wine';
import Carousel from 'react-native-snap-carousel';

class WineScreen extends React.Component {
  static navigationOptions = {
    title: 'Wines',
  };

  renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <MonoText style={{textAlign: 'center'}}>
          {item.product.name}
        </MonoText>
        <MonoText style={{textAlign: 'center'}}>
          {item.year}
        </MonoText>
        <MonoText style={{textAlign: 'center'}}>
          {item.country.name}
        </MonoText>
        <MonoText style={{textAlign: 'center'}}>
          {item.id}
        </MonoText>
        <Image
          source={require('../assets/images/default-bottle-photo.png')}
        />
      </View>
    )
  };

  render() {
    const { allWinesQuery } = this.props;
    const wines = allWinesQuery;

    if (wines && wines.loading) return (
      <MonoText>
        Loading...
      </MonoText>
    );
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
        <MonoText>Wonderful Wines at your fingerprints</MonoText>

        {
          wines && wines.allWines ? (
            <Carousel
              ref={(c) => {
                this._carousel = c;
              }}
              layout={'default'}
              data={wines.allWines}
              renderItem={this.renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />
          )
            :
            <MonoText>No wines yet</MonoText>
        }
      </ScrollView>
    );
  }
}

export default compose(
  graphql(GET_WINES, { name: 'allWinesQuery' })
)(WineScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    color: '#000'
  },
  slide: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#505050',
    borderStyle: 'solid',
    color: '#fff',
    height: 350
  }
});

const sliderWidth = 450;
const itemWidth = 150;

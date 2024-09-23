import React from 'react';
import { FlatList } from 'react-native';
import CarItem from '../components/CarItem';

const CarList = ({ cars, isForSale, onFavoriteToggle }) => {
  return (
    <FlatList
      data={cars}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CarItem 
          car={item} 
          onFavoriteToggle={() => onFavoriteToggle(item.id)} 
          isForSale={isForSale} 
        />
      )}
      // initialNumToRender={10}// Giới hạn số lượng item render ban đầu
    />
  );
};

export default CarList;

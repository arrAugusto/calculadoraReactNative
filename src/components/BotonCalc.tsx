import React from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../theme/appTheme';

interface Props {
    texto: string;
    color?: string;
    ancho?: boolean;
    action: ( numeroAction: string ) => void;
    
}
export const BotonCalc = ({texto, color='#2D2D2D', ancho = false, action}: Props) => {
  return (
    <TouchableOpacity
      onPress={ () => action (texto) }
    >
    <View style={{
        ...styles.button,
        backgroundColor: color,
        width: ( ancho ) ? 180 : 80
        }}>
      <Text style={ 
          styles.buttonTexto }>{texto}</Text>
    </View>
    </TouchableOpacity>
  );
};


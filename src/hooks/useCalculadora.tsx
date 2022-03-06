import React, {useRef, useState} from 'react';
import {View} from 'react-native';

enum Operadores {
  sumar,
  restar,
  multiplicar,
  dividir,
}

export const useCalculadora = () => {
  const [numero, setNumero] = useState('0');

  const [numeroAnterior, setNumeroAnterior] = useState('0');

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const ultimaOperacion = useRef<Operadores>();

  const armarNumero = (numeroTexto: string) => {
    //No aceptar doble punto
    if (numero.includes('.') && numeroTexto === '.') return;
    if (numero.startsWith('0') || numero.startsWith('-0')) {
      //Primer punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);
        //evaluar si es otro cero y hay otro punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);
        //Evaluar si es numero diferente de cero y no tiene un punto
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);
        //Evitar el 0000.0
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };
  const btnDelete = () => {
    let negativo = '';
    let numerotTemp = numero;

    if (numero.includes('-')) {
      negativo = '-';
      numerotTemp = numero.substr(1);
    }
    if (numerotTemp.length > 1) {
      setNumero(negativo + numerotTemp.slice(0, -1));
    } else {
      setNumero('0');
    }
  };
  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero.replace('-', ''));
    }
  };

  const cambiarNumeroPorAnterior = () => {
    setNumeroAnterior(numero);

    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDivir = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.dividir;
  };
  const btnMultiplicar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.multiplicar;
  };
  const btnRestar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.restar;
  };

  const btnSumar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacion.current = Operadores.sumar;
  };

  const calcular = () => {
    const numero1 = Number(numero);
    const numero2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case Operadores.sumar:
        setNumero(`${numero1 + numero2}`);

        break;
      case Operadores.restar:
        setNumero(`${numero2 - numero1}`);

        break;
      case Operadores.multiplicar:
        setNumero(`${numero1 * numero2}`);

        break;
      case Operadores.dividir:
        let result = numero2 / numero1;
        if (!isNaN(result)) {
          setNumero(`${numero2 / numero1}`);
          break;
        } else {
          setNumero('No divisible entre cero...');
          setNumero('0');
        }
    }
    setNumeroAnterior('0');
  };
  return {
    numeroAnterior,
    numero,
    limpiar,
    positivoNegativo,
    btnDelete,
    btnDivir,
    armarNumero,
    btnMultiplicar,
    btnRestar,
    btnSumar,
    calcular,
  };
};

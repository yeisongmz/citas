import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Cita from './componentes/Citas';


const App = () => {
  // definir el state
  const [citas, setCitas] = useState([
    {id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No Come'},
    {id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No Duerme'},
    {id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No Canta'},
  ]);

  return (
    
    <View style={styles.contenedor}>
      <Text style={styles.titulo}> Aministrador de citas </Text>

      <FlatList
        data={citas}
        renderItem={ ({item}) => <Cita item={item}/> }
        keyExtractor={ cita => cita.id }
      />

    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1,
  },

  titulo: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;

